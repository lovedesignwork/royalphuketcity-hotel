// Offline route tests: database and auth are mocked; never alter guest records.
const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { NextRequest, NextResponse } = require('next/server');
const root = path.resolve(__dirname, '..');

function harness({ user = { id: 'admin' }, admin = { id: 'admin' }, error = null, missing = false } = {}) {
  const calls = [];
  const row = { id: 17, form_type: 'reservation', name: 'Example Guest', status: 'new', notes: null };
  const query = {};
  for (const method of ['select', 'eq', 'neq', 'or', 'order', 'range', 'update']) {
    query[method] = (...args) => { calls.push([method, ...args]); return query; };
  }
  query.then = (resolve) => resolve({ data: error ? null : [row], count: 23, error });
  query.maybeSingle = async () => ({ data: missing ? null : row, error });
  function load(relative) {
    const module = { exports: {} };
    const code = ts.transpileModule(fs.readFileSync(path.join(root, relative), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const requireMock = (name) => {
      if (name === 'next/server') return { NextResponse };
      if (name === '@/lib/twist-inbox') return load('src/lib/twist-inbox.ts');
      if (name === '@/lib/supabase/server') return {
        createClient: async () => ({ auth: { getUser: async () => ({ data: { user } }) }, from: () => ({ select() { return this; }, eq() { return this; }, maybeSingle: async () => ({ data: admin }) }) }),
        createServiceRoleClient: () => ({ from: (table) => { calls.push(['from', table]); return query; } }),
      };
      throw new Error(`Unexpected dependency: ${name}`);
    };
    vm.runInNewContext(code, { module, exports: module.exports, require: requireMock, console, URL }, { filename: relative });
    return module.exports;
  }
  const route = load('src/app/api/admin/twist/[kind]/route.ts');
  return {
    calls,
    run: (method = 'GET', kind = 'reservations', params = '', body) => route[method](new NextRequest(`https://hotel.test/api/admin/twist/${kind}${params}`, {
      method, ...(body === undefined ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }),
    }), { params: Promise.resolve({ kind }) }),
  };
}

test('TWIST handlers recheck authentication before accessing private requests', async () => {
  for (const method of ['GET', 'PATCH']) {
    const env = harness({ user: null });
    assert.equal((await env.run(method)).status, 401);
    assert.equal(env.calls.length, 0);
    const nonAdmin = harness({ admin: null });
    assert.equal((await nonAdmin.run(method)).status, 403);
    assert.equal(nonAdmin.calls.length, 0);
  }
});
test('reservation and inquiry inboxes filter the shared table separately', async () => {
  for (const kind of ['reservations', 'inquiries']) {
    const env = harness();
    const response = await env.run('GET', kind, '?page=2&status=new');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    const result = await response.json();
    assert.equal(result.items[0].id, '17');
    assert.equal(result.totalPages, 2);
    assert.deepEqual(env.calls.find(([method]) => method === 'from'), ['from', 'twist_inquiries']);
    assert.ok(env.calls.some(([method, column, value]) => method === (kind === 'reservations' ? 'eq' : 'neq') && column === 'form_type' && value === 'reservation'));
    assert.deepEqual(env.calls.find(([method]) => method === 'range'), ['range', 20, 39]);
  }
});
test('invalid pagination, statuses and inbox routes are rejected', async () => {
  for (const params of ['?page=-1', '?page=NaN', '?page=1.5', '?page=100001', '?status=deleted']) {
    assert.equal((await harness().run('GET', 'reservations', params)).status, 400);
  }
  assert.equal((await harness().run('GET', 'unknown')).status, 404);
});
test('PostgREST search cannot introduce extra filters or wildcards', async () => {
  const env = harness();
  await env.run('GET', 'inquiries', '?search=' + encodeURIComponent('a%,status.eq.archived_(b)'));
  const expression = env.calls.find(([method]) => method === 'or')[1];
  assert.ok(!expression.includes('%,status'));
  assert.ok(!expression.includes('('));
  assert.ok(expression.split(',').every((part) => !part.split('.ilike.')[1].includes('_')));
  assert.equal(expression.split(',').length, 7);
});
test('database failures are visible rather than a successful empty inbox', async () => {
  assert.equal((await harness({ error: { code: '42P01' } }).run()).status, 500);
});
test('updates only change status and internal notes and stay within the chosen inbox', async () => {
  const env = harness();
  const response = await env.run('PATCH', 'inquiries', '', { id: '17', status: 'read', notes: 'Call back', email: 'attacker@example.test' });
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(JSON.stringify(env.calls.find(([method]) => method === 'update')[1])), { status: 'read', notes: 'Call back' });
  assert.ok(env.calls.some(([method, field]) => method === 'neq' && field === 'form_type'));
});
test('invalid writes and missing rows do not report success', async () => {
  for (const body of ['{', { id: '17', status: 'deleted', notes: '' }, { id: '1,2', status: 'new', notes: '' }, { id: '17', status: 'new', notes: 'x'.repeat(5001) }]) {
    const env = harness();
    assert.equal((await env.run('PATCH', 'reservations', '', body)).status, 400);
    assert.equal(env.calls.length, 0);
  }
  assert.equal((await harness({ missing: true }).run('PATCH', 'reservations', '', { id: '17', status: 'read', notes: '' })).status, 404);
  assert.equal((await harness({ error: { code: 'error' } }).run('PATCH', 'reservations', '', { id: '17', status: 'read', notes: '' })).status, 500);
});
