// Offline analytics configuration checks. Google and database calls are mocked.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const test = require('node:test');
const root = path.resolve(__dirname, '..');

function harness({ saved, env = 'G-ENV1234567', databaseError = false, databaseConfigured = true } = {}) {
  const cache = new Map();
  let stored = saved;
  let writes = 0;
  const invalidations = [];
  const supabase = { from: () => ({
    select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: stored === undefined ? null : { value: stored }, error: databaseError ? { message: 'unavailable' } : null }) }) }),
    upsert: async (row) => { stored = row.value; writes++; return { error: null }; },
  }) };
  function load(file) {
    const resolved = path.resolve(root, file);
    if (cache.has(resolved)) return cache.get(resolved);
    const module = { exports: {} };
    const source = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const mocks = {
      'server-only': {},
      'next/cache': { unstable_cache: (fn) => fn, revalidateTag: (tag) => invalidations.push(tag) },
      'next/server': { NextResponse: { json: (data, init) => ({ status: init?.status || 200, data, headers: init?.headers }) } },
      '@/lib/supabase': { getSupabaseClient: () => databaseConfigured ? supabase : null },
    };
    vm.runInNewContext(source, {
      require: (name) => mocks[name] || load(`src/${name.slice(2)}.ts`), module, exports: module.exports,
      process: { env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: env } }, console: { error() {} }, Date,
    }, { filename: resolved });
    cache.set(resolved, module.exports);
    return module.exports;
  }
  return { load, invalidations, writes: () => writes };
}

test('saved Analytics ID is used by both public config and admin readout', async () => {
  const h = harness({ saved: 'G-SAVED12345' });
  const publicResult = await h.load('src/app/api/analytics-config/route.ts').GET();
  const adminResult = await h.load('src/app/api/admin/settings/route.ts').GET();
  assert.equal(publicResult.data.measurementId, 'G-SAVED12345');
  assert.equal(adminResult.data.googleAnalyticsId, publicResult.data.measurementId);
  assert.deepEqual(Object.keys(publicResult.data), ['measurementId']);
});

test('missing, empty, invalid, or unavailable database settings preserve deployment ID', async () => {
  for (const options of [{}, { saved: '' }, { saved: 'invalid' }, { saved: { secret: 'not-an-id' } }, { databaseError: true }, { databaseConfigured: false }]) {
    const h = harness(options);
    assert.equal(await h.load('src/lib/analytics-config.ts').getAnalyticsMeasurementId(), 'G-ENV1234567');
  }
});

test('invalid deployment values never become a public tracking configuration', async () => {
  const h = harness({ env: '<script>invalid</script>' });
  assert.equal(await h.load('src/lib/analytics-config.ts').getAnalyticsMeasurementId(), '');
});

test('admin save validates IDs and invalidates the shared configuration cache', async () => {
  const h = harness();
  const route = h.load('src/app/api/admin/settings/route.ts');
  for (const value of ['UA-12345', {}, 123, null]) {
    assert.equal((await route.POST({ json: async () => ({ googleAnalyticsId: value }) })).status, 400);
  }
  assert.equal(h.writes(), 0);
  assert.equal((await route.POST({ json: async () => ({ googleAnalyticsId: ' G-NEW1234567 ' }) })).status, 200);
  assert.equal((await route.GET()).data.googleAnalyticsId, 'G-NEW1234567');
  assert.equal(h.invalidations.length, 1);
  assert.equal((await route.POST({ json: async () => ({ googleAnalyticsId: '' }) })).status, 200);
  assert.equal((await route.GET()).data.googleAnalyticsId, 'G-ENV1234567');
});

function clientHarness({ consent = null, pathname = '/', host = 'royalphuketcity.com' } = {}) {
  let currentPath = pathname;
  let choice = consent;
  let hookIndex = 0;
  let needsRender = true;
  let output;
  const state = [];
  const effects = [];
  const pending = [];
  const listeners = new Map();
  const requests = [];
  const window = { location: { host }, setTimeout: () => 1, clearTimeout() {},
    addEventListener: (event, fn) => listeners.set(event, fn),
    removeEventListener: (event, fn) => { if (listeners.get(event) === fn) listeners.delete(event); },
  };
  const jsx = (type, props) => ({ type, props });
  const react = {
    useState(initial) {
      const index = hookIndex++;
      if (!(index in state)) state[index] = initial;
      return [state[index], (value) => { if (state[index] !== value) { state[index] = value; needsRender = true; } }];
    },
    useEffect(fn, deps) {
      const index = hookIndex++;
      const previous = effects[index];
      if (!previous || deps.some((value, i) => value !== previous.deps[i])) {
        pending.push(() => {
          previous?.cleanup?.();
          effects[index] = { deps, cleanup: fn() };
        });
      }
    },
  };
  const mocks = {
    react,
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    'next/navigation': { usePathname: () => currentPath },
    'next/script': { default: 'script' },
    '@/lib/cookie-consent': { COOKIE_CONSENT_KEY: 'consent', COOKIE_CONSENT_EVENT: 'consent-change' },
    '@/lib/analytics-id': { normalizeAnalyticsId: harness().load('src/lib/analytics-id.ts').normalizeAnalyticsId },
    '@/lib/analytics-events': { installReservationClickTracking: () => () => {}, setAnalyticsEventMeasurementId() {} },
    '@/lib/mobile': {
      isMobileHost: (h) => h === 'm.royalphuketcity.com',
      isMobileAppPath: (p) => p === '/m' || p.startsWith('/m/'),
      isMobileAppAlias: (p) => p === '/spa',
    },
  };
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(path.join(root, 'src/components/Analytics.tsx'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(source, {
    require: (name) => { assert(mocks[name], name); return mocks[name]; }, module, exports: module.exports,
    window, AbortController, process: { env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-ENV1234567' } },
    localStorage: { getItem: () => choice, removeItem() {} },
    fetch: (url, options) => new Promise((resolve, reject) => requests.push({ url, options, resolve, reject })),
  });
  function render() {
    needsRender = true;
    let count = 0;
    while (needsRender) {
      assert(count++ < 20, 'render loop');
      needsRender = false;
      hookIndex = 0;
      output = module.exports.AnalyticsProvider({ children: 'page' });
      while (pending.length) pending.shift()();
    }
  }
  render();
  return {
    requests, window,
    trackedId: () => output.props.children.find((child) => child?.type === module.exports.GoogleAnalytics)?.props.measurementId,
    consent(value) { choice = value; listeners.get('consent-change')?.(); render(); },
    navigate(value) { currentPath = value; render(); },
    async flush() { await new Promise((resolve) => setImmediate(resolve)); render(); },
  };
}

test('configuration is never fetched before consent, after decline, or on admin routes', () => {
  for (const options of [{}, { consent: 'declined' }, { consent: 'accepted', pathname: '/admin' }, { consent: 'accepted', pathname: '/th/admin/settings' }]) {
    const h = clientHarness(options);
    assert.equal(h.requests.length, 0);
    assert.equal(h.trackedId(), undefined);
  }
});

test('accepted consent resolves the saved ID without sending duplicate manual pageviews', async () => {
  const h = clientHarness();
  h.consent('accepted');
  assert.equal(h.requests.length, 1);
  assert.equal(h.trackedId(), undefined);
  h.requests[0].resolve({ ok: true, json: async () => ({ measurementId: 'G-SAVED12345' }) });
  await h.flush();
  assert.equal(h.trackedId(), 'G-SAVED12345');
  assert.equal(h.window['ga-disable-G-SAVED12345'], false);
  h.navigate('/rooms-suites');
  assert.equal(h.requests.length, 1);
});

test('revocation/admin navigation cancels pending configuration and ignores stale responses', async () => {
  for (const action of [(h) => h.consent('declined'), (h) => h.navigate('/admin')]) {
    const h = clientHarness({ consent: 'accepted' });
    action(h);
    assert.equal(h.requests[0].options.signal.aborted, true);
    h.requests[0].resolve({ ok: true, json: async () => ({ measurementId: 'G-SAVED12345' }) });
    await h.flush();
    assert.equal(h.trackedId(), undefined);
  }
});

test('network failure falls back to existing deployment tag; revoke disables loaded tag', async () => {
  const h = clientHarness({ consent: 'accepted' });
  h.requests[0].reject(new Error('network unavailable'));
  await h.flush();
  assert.equal(h.trackedId(), 'G-ENV1234567');
  h.consent('declined');
  assert.equal(h.trackedId(), undefined);
  assert.equal(h.window['ga-disable-G-ENV1234567'], true);
});

test('mobile app retains environment-based configuration without a settings request', () => {
  for (const options of [{ pathname: '/m' }, { pathname: '/spa' }, { host: 'm.royalphuketcity.com' }]) {
    const h = clientHarness({ consent: 'accepted', ...options });
    assert.equal(h.requests.length, 0);
    assert.equal(h.trackedId(), 'G-ENV1234567');
  }
});
