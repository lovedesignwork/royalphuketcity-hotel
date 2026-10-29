// Offline GA tests. Never use real credentials or call Google.
const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { NextRequest, NextResponse } = require('next/server');
const root = path.resolve(__dirname, '..');

function harness(options = {}) {
  const calls = [], auth = [], modules = {};
  const env = options.env ?? { GA4_HOTEL_PROPERTY_ID: '101', GA4_TWIST_PROPERTY_ID: '202', GA4_SERVICE_ACCOUNT_EMAIL: 'reader@example.test', GA4_PRIVATE_KEY: 'test-key' };
  const google = {
    auth: { JWT: class { constructor(value) { auth.push(value); } }, GoogleAuth: class { constructor(value) { auth.push(value); } } },
    analyticsdata: () => ({ properties: { batchRunReports: async (request) => {
      calls.push(request);
      if (options.providerError) throw options.providerError;
      return { data: { reports: request.requestBody.requests.map((query) => {
        if (options.empty) return { metadata: { timeZone: 'Asia/Bangkok' }, rows: [] };
        return {
          metadata: { timeZone: 'Asia/Bangkok', subjectToThresholding: true },
          rows: [{ dimensionValues: query.dimensions.map(({name}) => ({value: name === 'date' ? '20261028' : name === 'pagePath' ? '/' : name === 'country' ? 'Singapore' : name === 'countryId' ? 'SG' : 'Desktop'})),
            metricValues: query.metrics.map(({ name }) => ({value: options.malformed ? 'not-a-number' : String({screenPageViews: 120, totalUsers: 80, sessions: 90, engagementRate: 0.75, bounceRate: 0.25, averageSessionDuration: 125.75, keyEvents: 4, eventCount: 240}[name])})) }],
        };
      }) } };
    } } }),
  };
  function load(file) {
    if (modules[file]) return modules[file];
    const module = { exports: {} };
    const requireMock = (name) => {
      if (name === 'googleapis') return { google };
      if (name === 'next/server') return { NextResponse };
      if (name.endsWith('ga4-types')) return load('src/lib/ga4-types.ts');
      if (name === '@/lib/google-analytics') return load('src/lib/google-analytics.ts');
      if (name === '@/lib/supabase/server') return { createClient: async () => ({
        auth: { getUser: async () => ({ data: { user: options.user === false ? null : { id: 'admin' } } }) },
        from: () => ({ select() { return this; }, eq() { return this; }, maybeSingle: async () => ({ data: options.admin === false ? null : { id: 'admin' } }) }),
      }) };
      throw new Error(`Unexpected dependency ${name}`);
    };
    const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    vm.runInNewContext(code, { module, exports: module.exports, require: requireMock, process: { env }, console, Date, Intl, Map });
    return modules[file] = module.exports;
  }
  return { calls, auth, env, lib: load('src/lib/google-analytics.ts'), run: (query = '') => load('src/app/api/admin/analytics/route.ts').GET(new NextRequest(`http://hotel.test/api/admin/analytics${query}`)) };
}

test('GA reports require an authenticated admin before any Google request', async () => {
  for (const [options, status] of [[{ user: false }, 401], [{ admin: false }, 403]]) {
    const h = harness(options);
    assert.equal((await h.run()).status, status);
    assert.equal(h.calls.length, 0);
  }
});
test('only configured brands and supported periods can be requested', async () => {
  const h = harness();
  for (const query of ['?brand=unknown', '?range=365d']) assert.equal((await h.run(query)).status, 400);
  assert.equal(h.calls.length, 0);
  const response = await h.run('?brand=spa');
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'property_missing');
});
test('missing credentials fail explicitly rather than returning zero traffic', async () => {
  const h = harness({ env: { GA4_HOTEL_PROPERTY_ID: '101' } });
  const response = await h.run();
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'credentials_missing');
  assert.equal(h.calls.length, 0);
});
test('GA metrics retain their units, property mapping and complete-day range', async () => {
  const h = harness();
  const response = await h.run('?propertyId=999');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  const body = await response.json();
  assert.deepEqual(body.totals, { views: 120, users: 80, sessions: 90, engagementRate: 0.75, bounceRate: 0.25, averageSessionDuration: 125.75, keyEvents: 4 });
  assert.deepEqual(body.countries, [{ name: 'Singapore', value: 80, countryCode: 'SG' }]);
  assert.deepEqual(body.downloads, { views: 120, users: 80 });
  assert.equal(body.daily.length, 7);
  assert.equal(body.timeZone, 'Asia/Bangkok');
  assert.equal(body.warnings.length, 1);
  assert.deepEqual(h.calls.map(call => call.property), ['properties/101', 'properties/101']);
  assert.deepEqual(h.calls.map(call => call.requestBody.requests.length), [5, 3]);
  assert.equal(h.calls[0].requestBody.requests[0].dateRanges[0].endDate, 'yesterday');
  assert.equal(h.auth[0].scopes[0], 'https://www.googleapis.com/auth/analytics.readonly');
});
test('cache deduplicates concurrent requests and isolates brand, property and range', async () => {
  const h = harness();
  await Promise.all([h.lib.getBrandAnalytics('hotel', '7d'), h.lib.getBrandAnalytics('hotel', '7d')]);
  assert.equal(h.calls.length, 2);
  await h.lib.getBrandAnalytics('hotel', '7d');
  assert.equal(h.calls.length, 2);
  const twist = await h.lib.getBrandAnalytics('twist', '7d');
  assert.equal(twist.propertyId, '202');
  assert.equal(twist.downloads, null);
  await h.lib.getBrandAnalytics('hotel', '30d');
  h.env.GA4_HOTEL_PROPERTY_ID = '303';
  assert.equal((await h.lib.getBrandAnalytics('hotel', '7d')).propertyId, '303');
  assert.equal(h.calls.length, 8);
});
test('Google failures never leak provider messages or become zero reports', async () => {
  for (const [status, expected] of [[403, 503], [429, 429], [500, 502]]) {
    const h = harness({ providerError: { response: { status }, message: 'SECRET_TOKEN' } });
    const response = await h.run();
    assert.equal(response.status, expected);
    assert.ok(!(await response.text()).includes('SECRET_TOKEN'));
    await h.run();
    assert.equal(h.calls.length, 4, 'failed reports must not enter cache');
  }
  assert.equal((await harness({ malformed: true }).run()).status, 502);
  const empty = await (await harness({ empty: true }).run()).json();
  assert.equal(empty.totals.views, 0);
  assert.equal(empty.totals.bounceRate, 0);
  assert.equal(empty.totals.averageSessionDuration, 0);
  assert.equal(empty.pages.length, 0);
});
test('report dates respect property midnight and leap days', () => {
  const { reportDates } = harness().lib;
  assert.deepEqual(Array.from(reportDates(2, 'Asia/Bangkok', new Date('2026-10-28T18:00:00Z'))), ['2026-10-27', '2026-10-28']);
  assert.deepEqual(Array.from(reportDates(2, 'UTC', new Date('2026-10-28T18:00:00Z'))), ['2026-10-26', '2026-10-27']);
  assert.deepEqual(Array.from(reportDates(2, 'UTC', new Date('2024-03-01T00:00:00Z'))), ['2024-02-28', '2024-02-29']);
});
