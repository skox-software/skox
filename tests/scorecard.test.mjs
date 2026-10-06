import { test } from "node:test";
import { createRequire } from "node:module";
const dependency = createRequire(import.meta.url);
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(path, overrides = {}) {
  const source = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  const sandbox = {
    exports,
    require: (name) => (name.startsWith("@/lib/") ? load(`lib/${name.slice(6)}.ts`, overrides) : dependency(name)),
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

let n = 0;
function request(body) {
  n += 1;
  return new Request("http://localhost/api/scorecard", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `10.0.0.${n}` },
    body: JSON.stringify(body),
  });
}

test("a scorecard request needs only a real address", () => {
  const { validateScorecard } = load("lib/scorecard.ts");
  assert.equal(Object.keys(validateScorecard({ email: "a@b.co" })).length, 0);
  assert.ok(validateScorecard({ email: "nope" }).email);
  assert.ok(validateScorecard({}).email);
  assert.ok(validateScorecard({ email: 5 }).email);
  assert.ok(validateScorecard({ email: "a@b.co", locations: "lots" }).locations);
  assert.equal(Object.keys(validateScorecard({ email: "a@b.co", locations: "4–10" })).length, 0);
});

test("the visitor gets the link first, then the founders hear about it", async () => {
  const sent = [];
  const route = load("app/api/scorecard/route.ts", {
    process: { env: { RESEND_API_KEY: "test-only", CONTACT_EMAIL: "owner@example.com" } },
    fetch: async (_url, options) => {
      sent.push(JSON.parse(options.body));
      return new Response('{"id":"test"}', { status: 200 });
    },
  });
  const res = await route.POST(request({ email: "pat@example.com", name: "Pat Smith", locations: "2–3" }));
  const json = await res.json();
  assert.equal(res.status, 200);
  assert.equal(json.delivered, true);
  assert.deepEqual(sent[0].to, ["pat@example.com"]);
  assert.match(sent[0].text, /Hi Pat,/);
  assert.match(sent[0].text, /\/downloads\/SKOX-Monday-Locations-Scorecard\.xlsx/);
  assert.deepEqual(sent.at(-1).to, ["owner@example.com"]);
  assert.match(sent.at(-1).subject, /^Scorecard download/);
  assert.match(sent.at(-1).text, /Locations: 2–3/);
});

test("a failed send is never reported as delivered", async () => {
  const route = load("app/api/scorecard/route.ts", {
    process: { env: { RESEND_API_KEY: "test-only" } },
    fetch: async () => new Response("no", { status: 500 }),
  });
  const res = await route.POST(request({ email: "pat@example.com" }));
  assert.equal(res.status, 502);
  assert.notEqual((await res.json()).delivered, true);
});

test("no mail provider means no delivery and no count", async () => {
  const route = load("app/api/scorecard/route.ts", { fetch: async () => assert.fail("must not send") });
  const res = await route.POST(request({ email: "pat@example.com" }));
  assert.equal(res.status, 503);
});

test("the honeypot sends nothing and claims nothing", async () => {
  const route = load("app/api/scorecard/route.ts", {
    process: { env: { RESEND_API_KEY: "test-only" } },
    fetch: async () => assert.fail("must not send"),
  });
  const res = await route.POST(request({ email: "bot@example.com", website: "spam" }));
  const json = await res.json();
  assert.equal(json.ok, true);
  assert.notEqual(json.delivered, true);
});

test("bad input is rejected", async () => {
  const route = load("app/api/scorecard/route.ts", { process: { env: { RESEND_API_KEY: "x" } } });
  assert.equal((await route.POST(request({ email: "nope" }))).status, 422);
  assert.equal((await route.POST(request([1, 2]))).status, 400);
});
