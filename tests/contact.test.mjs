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
const valid = {
  name: "QA",
  email: "qa@example.com",
  broken: "A client portal",
  company: "",
  timeline: "",
  projectType: "web-apps",
  attribution: "utm_source: test",
};
function request(body) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify(body),
  });
}

test("rejects wrong JSON shapes and non-text required fields without crashing", async () => {
  const route = load("app/api/contact/route.ts");
  for (const body of [null, [], "invalid"])
    assert.equal((await route.POST(request(body))).status, 400);
  assert.equal(
    (await route.POST(request({ ...valid, name: 123 }))).status,
    422,
  );
});
test("missing mail provider never reports a conversion", async () => {
  const route = load("app/api/contact/route.ts");
  const response = await route.POST(request(valid));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});
test("provider rejection and network failure are recoverable failures", async () => {
  for (const fetch of [
    async () => new Response("{}", { status: 500 }),
    async () => {
      throw new Error("timeout");
    },
  ]) {
    const route = load("app/api/contact/route.ts", {
      process: { env: { RESEND_API_KEY: "test-only" } },
      fetch,
    });
    assert.equal((await route.POST(request(valid))).status, 502);
  }
});
test("confirmed delivery includes project type and attribution", async () => {
  let payload;
  const route = load("app/api/contact/route.ts", {
    process: {
      env: { RESEND_API_KEY: "test-only", CONTACT_EMAIL: "owner@example.com" },
    },
    fetch: async (_url, options) => {
      payload = JSON.parse(options.body);
      return new Response('{"id":"test"}', { status: 200 });
    },
  });
  const response = await route.POST(request(valid));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).delivered, "email");
  assert.match(payload.text, /web-apps/);
  assert.match(payload.text, /utm_source: test/);
  assert.equal(payload.reply_to, valid.email);
});
test("honeypot submissions never call the mail provider or report email delivery", async () => {
  let sent = false;
  const route = load("app/api/contact/route.ts", {
    fetch: async () => {
      sent = true;
    },
  });
  const response = await route.POST(
    request({ ...valid, website: "bot.example" }),
  );
  assert.equal(sent, false);
  assert.equal((await response.json()).delivered, undefined);
});
test("rate limiter rejects the sixth request in its window", async () => {
  const route = load("app/api/contact/route.ts");
  for (let i = 0; i < 5; i++)
    await route.POST(request({ ...valid, website: "bot.example" }));
  assert.equal((await route.POST(request(valid))).status, 429);
});
test("validation rejects invalid build types and overlong email", () => {
  const { validate } = load("lib/leads.ts");
  assert.ok(validate({ ...valid, projectType: "invalid" }).projectType);
  assert.ok(
    validate({ ...valid, email: "a".repeat(250) + "@example.com" }).email,
  );
});
