// Offline authorization regression checks using real Next request/response semantics.
// Session/database access is mocked. No route handlers, network or writes execute.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");
const { NextRequest, NextResponse } = require("next/server");
const root = path.resolve(__dirname, "..");

function harness({ user = null, admin = null } = {}) {
  let sessionChecks = 0;
  let signOuts = 0;
  const modules = new Map();
  function load(filename) {
    const resolved = path.resolve(root, filename);
    if (modules.has(resolved)) return modules.get(resolved).exports;
    const module = { exports: {} };
    modules.set(resolved, module);
    const source = ts.transpileModule(fs.readFileSync(resolved, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    function localRequire(name) {
      if (name === "next/server") return { NextResponse };
      if (name === "@/lib/supabase/middleware") return { updateSession: async () => {
        sessionChecks++;
        const response = NextResponse.next();
        response.cookies.set("test-session", "refreshed", { httpOnly: true });
        const query = { select() { return this; }, eq() { return this; }, async maybeSingle() { return { data: admin, error: null }; } };
        return { response, user, supabase: { from: () => query, auth: { signOut: async () => { signOuts++; } } } };
      } };
      if (name.startsWith("@/")) return load(`src/${name.slice(2)}.ts`);
      if (name.startsWith(".")) return load(path.resolve(path.dirname(resolved), `${name}.ts`));
      throw new Error(`Unexpected dependency: ${name}`);
    }
    vm.runInNewContext(source, { require: localRequire, module, exports: module.exports, URL, Headers }, { filename: resolved });
    return module.exports;
  }
  const middleware = load("src/middleware.ts").middleware;
  return {
    run(route, method = "GET", host = "royalphuketcity.com") {
      return middleware(new NextRequest(`https://${host}${route}`, { method, headers: { host } }));
    },
    get sessionChecks() { return sessionChecks; },
    get signOuts() { return signOuts; },
  };
}

test("anonymous admin APIs stop GET/POST/PATCH/DELETE instead of continuing protected handlers", async () => {
  const env = harness();
  for (const method of ["GET", "POST", "PATCH", "DELETE"]) {
    const response = await env.run("/api/admin/blog", method);
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("x-middleware-next"), null);
    assert.equal(response.headers.get("x-middleware-rewrite"), null);
    assert.equal(response.cookies.get("test-session").value, "refreshed");
    assert.deepEqual(await response.json(), { error: "Unauthorized" });
  }
  assert.equal(env.sessionChecks, 4);
});

test("signed-in non-admin APIs reject with 403 and never carry a continuation header", async () => {
  const env = harness({ user: { id: "ordinary-user" } });
  const response = await env.run("/api/admin/downloads", "POST");
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("x-middleware-next"), null);
  assert.equal(env.signOuts, 1);
});

test("authorized admin requests still continue through middleware", async () => {
  const env = harness({ user: { id: "admin-user" }, admin: { id: "admin-user", role: "admin" } });
  const response = await env.run("/api/admin/blog", "POST");
  assert.equal(response.headers.get("x-middleware-next"), "1");
  assert.equal(env.signOuts, 0);
});

test("Thai API aliases reject before any rewrite or handler for both hosts and methods", async () => {
  const env = harness();
  for (const host of ["royalphuketcity.com", "m.royalphuketcity.com"]) {
    for (const route of ["/th/api", "/th/api/admin/blog?preview=true", "/th/api/contact"]) {
      for (const method of ["GET", "POST"]) {
        const response = await env.run(route, method, host);
        assert.equal(response.status, 404);
        assert.equal(response.headers.get("x-middleware-next"), null);
        assert.equal(response.headers.get("x-middleware-rewrite"), null);
      }
    }
  }
  assert.equal(env.sessionChecks, 0);
});

test("Thai admin aliases canonicalize to the protected desktop route with their query intact", async () => {
  const env = harness();
  for (const host of ["royalphuketcity.com", "m.royalphuketcity.com"]) {
    const response = await env.run("/th/admin/login?from=%2Fadmin%2Fblog", "GET", host);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://royalphuketcity.com/admin/login?from=%2Fadmin%2Fblog");
  }
  assert.equal(env.sessionChecks, 0);
  const destination = await env.run("/admin/blog");
  assert.equal(destination.status, 307);
  assert.equal(new URL(destination.headers.get("location")).pathname, "/admin/login");
});

test("canonical mobile-host admin requests redirect to desktop authentication", async () => {
  const env = harness();
  const response = await env.run("/api/admin/blog?page=2", "POST", "m.royalphuketcity.com");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "https://royalphuketcity.com/api/admin/blog?page=2");
});

test("public APIs and localized public pages keep working", async () => {
  const env = harness();
  const api = await env.run("/api/contact", "POST");
  assert.equal(api.headers.get("x-middleware-next"), "1");
  const page = await env.run("/th/contact");
  assert.equal(new URL(page.headers.get("x-middleware-rewrite")).pathname, "/contact");
  assert.equal(env.sessionChecks, 0);
});
