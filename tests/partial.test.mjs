import { test } from "node:test";
import { createRequire } from "node:module";
const dependency = createRequire(import.meta.url);
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(path, overrides = {}) {
  const source = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const exports = {};
  const sandbox = {
    exports,
    require: (name) =>
      name === "@/lib/leads" ? load("lib/leads.ts") : dependency(name),
    Response,
    Request,
    AbortSignal,
    console: { error() {} },
    process: { env: {} },
    ...overrides,
  };
  vm.runInNewContext(source, sandbox, { filename: path });
  return exports;
}

const partial = {
  email: "qa@example.com",
  name: "QA",
  broken: "A client portal",
  projectType: "web-apps",
  stage: "email-entered",
  attribution: "utm_source: test",
};

function request(body, ip = "127.0.0.1") {
  return new Request("http://localhost/api/partial", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

test("an unfinished enquiry needs only a real address", async () => {
  const { validatePartial } = load("lib/leads.ts");
  assert.equal(Object.keys(validatePartial({ email: "a@b.co" })).length, 0);
  assert.ok(validatePartial({ email: "nope" }).email);
  assert.ok(validatePartial({}).email);
  assert.ok(validatePartial({ email: 123 }).email);
});

test("a partial is never reported as a delivered conversion", async () => {
  let payload;
  const route = load("app/api/partial/route.ts", {
    process: {
      env: { RESEND_API_KEY: "test-only", CONTACT_EMAIL: "owner@example.com" },
    },
    fetch: async (_url, options) => {
      payload = JSON.parse(options.body);
      return new Response('{"id":"test"}', { status: 200 });
    },
  });
  const response = await route.POST(request(partial, "10.0.0.1"));
  assert.equal(response.status, 200);
  // The client fires its conversion event on `delivered: "email"`. This route
  // must never produce it, or unfinished forms would inflate the ad platform's
  // idea of what a converting visitor looks like.
  assert.equal((await response.json()).delivered, undefined);
  assert.match(payload.subject, /Unfinished enquiry/);
  assert.match(payload.text, /never submitted/);
  assert.match(payload.text, /utm_source: test/);
  // No reply_to: a stray reply must not open a thread with someone who never
  // asked to be written to.
  assert.equal(payload.reply_to, undefined);
});

test("an unfinished enquiry with nothing written still says so plainly", async () => {
  const { formatPartial } = load("lib/leads.ts");
  const text = formatPartial({ email: "a@b.co" });
  assert.match(text, /— nothing yet —/);
  assert.match(text, /unknown/);
});

test("honeypot partials never reach the mail provider", async () => {
  let sent = false;
  const route = load("app/api/partial/route.ts", {
    process: { env: { RESEND_API_KEY: "test-only" } },
    fetch: async () => {
      sent = true;
      return new Response("{}", { status: 200 });
    },
  });
  const response = await route.POST(
    request({ ...partial, website: "bot.example" }, "10.0.0.2"),
  );
  assert.equal(sent, false);
  assert.equal(response.status, 200);
});

test("bad shapes and bad addresses are rejected without crashing", async () => {
  const route = load("app/api/partial/route.ts");
  for (const body of [null, [], "invalid"])
    assert.equal((await route.POST(request(body, "10.0.0.3"))).status, 400);
  assert.equal(
    (await route.POST(request({ email: "nope" }, "10.0.0.3"))).status,
    422,
  );
});

test("rate limiter caps partials per window", async () => {
  const route = load("app/api/partial/route.ts");
  for (let i = 0; i < 4; i++)
    await route.POST(request({ ...partial, website: "bot" }, "10.0.0.4"));
  assert.equal(
    (await route.POST(request(partial, "10.0.0.4"))).status,
    429,
  );
});
