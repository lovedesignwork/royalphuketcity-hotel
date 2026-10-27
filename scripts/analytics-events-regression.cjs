// Offline conversion checks: no network, real form submission, or Google writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const booking = 'https://www.myxcaliber.com/ibe/b/Royal-Phuket-City-Hotel';

function harness({ consent = 'accepted', pathname = '/', host = 'royalphuketcity.com', storageError = false, gtagError = false } = {}) {
  const calls = [];
  const listeners = new Map();
  const window = { location: { pathname, host, origin: `https://${host}` }, gtag(...args) {
    if (gtagError) throw new Error('blocked');
    calls.push(args);
  } };
  const mocks = {
    '@/lib/cookie-consent': { COOKIE_CONSENT_KEY: 'rpc-cookie-consent' },
    '@/lib/constants': { EXTERNAL_LINKS: { booking } },
    '@/lib/analytics-id': { normalizeAnalyticsId: (value) => typeof value === 'string' && /^G-[A-Z0-9]+$/.test(value.trim()) ? value.trim() : '' },
    '@/lib/mobile': {
      isMobileHost: (host) => /^(m\.royalphuketcity\.com|m\.localhost)(:|$)/.test(host),
      isMobileAppPath: (path) => /^\/m(?:\/|$)/.test(path),
      isMobileAppAlias: (path) => /^\/(rooms|more|weddings|events|spa|around|feedback|chat)(?:\/|$)/.test(path),
    },
  };
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(path.join(root, 'src/lib/analytics-events.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  class FakeElement {
    constructor(anchor) { this.anchor = anchor; }
    closest(selector) { return selector === 'a[href]' ? this.anchor : null; }
  }
  vm.runInNewContext(source, {
    require: (name) => { assert(mocks[name], name); return mocks[name]; }, module, exports: module.exports,
    window, URL, Element: FakeElement,
    localStorage: { getItem: () => { if (storageError) throw new Error('blocked'); return consent; } },
    document: { addEventListener: (event, fn) => listeners.set(event, fn), removeEventListener: (event, fn) => {
      if (listeners.get(event) === fn) listeners.delete(event);
    } },
  });
  module.exports.setAnalyticsEventMeasurementId('G-TEST123456');
  return { events: module.exports, calls, window, listeners,
    click(href = booking, options = {}) {
      const event = { type: 'click', button: 0, defaultPrevented: false,
        target: new FakeElement({ href }), ...options };
      listeners.get(event.type)?.(event);
    },
  };
}

test('every delegated hotel booking activation emits exactly one reservation_click without URL query data', () => {
  const h = harness();
  const cleanup = h.events.installReservationClickTracking();
  h.click(`${booking}?email=private@example.com&promo=secret#name`);
  h.click(booking, { type: 'auxclick', button: 1 });
  assert.equal(h.calls.length, 2);
  for (const [command, name, params] of h.calls) {
    assert.equal(command, 'event');
    assert.equal(name, 'reservation_click');
    assert.equal(params.booking_engine, 'myxcaliber');
    assert.equal(params.send_to, 'G-TEST123456');
    assert(!JSON.stringify(params).includes('private'));
    assert(!JSON.stringify(params).includes('secret'));
    assert(!JSON.stringify(params).includes('purchase'));
  }
  cleanup();
  h.click();
  assert.equal(h.calls.length, 2);
});

test('other tenants, lookalike hosts, unrelated links, right-clicks and cancelled navigation are ignored', () => {
  const h = harness();
  h.events.installReservationClickTracking();
  for (const href of ['https://www.myxcaliber.com/ibe/b/Another-Hotel', 'https://myxcaliber.com.evil.test/ibe/b/Royal-Phuket-City-Hotel', 'https://royalphuketcity.com/contact', 'javascript:alert(1)', `http://www.myxcaliber.com/ibe/b/Royal-Phuket-City-Hotel`]) h.click(href);
  h.click(booking, { type: 'auxclick', button: 2 });
  h.click(booking, { defaultPrevented: true });
  assert.equal(h.calls.length, 0);
});

test('generate_lead requires a successful server acknowledgement, never just submit intent', () => {
  const h = harness();
  for (const result of [{ ok: false, data: { success: true } }, { ok: true, data: { success: false } }, { ok: true, data: null }, { ok: true, data: { success: 'true' } }]) {
    h.events.trackInquirySuccess('contact', result.ok, result.data);
  }
  assert.equal(h.calls.length, 0);
  h.events.trackInquirySuccess('contact', true, { success: true, referenceNumber: 'RPC-123', email: 'private@example.com' });
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0][1], 'generate_lead');
  assert.equal(h.calls[0][2].form_id, 'contact');
  assert(!JSON.stringify(h.calls).includes('private'));
  assert(!JSON.stringify(h.calls).includes('RPC-123'));
});

test('repeated acknowledgement of the same inquiry is counted once; different inquiries remain distinct', () => {
  const h = harness();
  h.events.trackInquirySuccess('wedding', true, { success: true, referenceNumber: 'RPC-1' });
  h.events.trackInquirySuccess('wedding', true, { success: true, referenceNumber: 'RPC-1' });
  h.events.trackInquirySuccess('event', true, { success: true, referenceNumber: 'RPC-2' });
  h.events.trackInquirySuccess('fact_sheets', true, { success: true, referenceNumber: 'RPC-3' });
  assert.deepEqual(h.calls.map((entry) => entry[2].form_id), ['wedding', 'event', 'fact_sheets']);
});

test('consent, admin, mobile and disabled measurement guards are checked at event time', () => {
  for (const options of [{ consent: null }, { consent: 'declined' }, { storageError: true }, { pathname: '/admin' }, { pathname: '/th/admin/settings' }, { pathname: '/m/contact' }, { pathname: '/spa' }, { host: 'm.royalphuketcity.com' }]) {
    const h = harness(options);
    h.events.installReservationClickTracking();
    h.click();
    h.events.trackInquirySuccess('contact', true, { success: true });
    assert.equal(h.calls.length, 0, JSON.stringify(options));
  }
  const h = harness();
  h.window['ga-disable-G-TEST123456'] = true;
  h.events.trackInquirySuccess('contact', true, { success: true });
  assert.equal(h.calls.length, 0);
});

test('unavailable Google tag or analytics exception never breaks form/booking functionality', () => {
  const h = harness({ gtagError: true });
  assert.doesNotThrow(() => h.events.trackInquirySuccess('contact', true, { success: true }));
  h.window.gtag = undefined;
  assert.doesNotThrow(() => h.events.trackInquirySuccess('contact', true, { success: true }));
  h.events.setAnalyticsEventMeasurementId('invalid');
  assert.doesNotThrow(() => h.events.trackInquirySuccess('contact', true, { success: true }));
  assert.equal(h.calls.length, 0);
});

test('all four real form submit handlers instrument only their acknowledged success branch', async () => {
  const cases = [
    ['src/components/ContactForm.tsx', 'contact'],
    ['src/components/WeddingInquiryForm.tsx', 'wedding'],
    ['src/components/EventInquiryForm.tsx', 'event'],
    ['src/app/download-fact-sheets/page.tsx', 'fact_sheets'],
  ];
  for (const [file, expectedForm] of cases) {
    for (const outcome of ['success', 'server-error', 'rejected', 'network-error']) {
      const calls = [];
      const text = new Proxy({}, { get: () => text });
      const jsx = (type, props) => ({ type, props });
      const mocks = {
        react: { useState: (value) => [value, () => {}], useRef: (value) => ({ current: value }), useEffect() {}, useCallback: (fn) => fn },
        'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
        '@/components/i18n/LocaleProvider': { useLocale: () => ({ locale: 'en', t: text }) },
        '@/lib/i18n/wedding-copy': { getWeddingPageCopy: () => text },
        '@/lib/i18n/meeting-copy': { getMeetingPageCopy: () => text },
        '@/lib/i18n/path': { localizeHref: (href) => href },
        '@/lib/analytics-events': { trackInquirySuccess: (...args) => calls.push(args) },
      };
      const module = { exports: {} };
      const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
      }).outputText;
      vm.runInNewContext(source, {
        require: (name) => mocks[name] || { default: name }, module, exports: module.exports, Date,
        localStorage: { setItem() {} },
        fetch: async () => {
          if (outcome === 'network-error') throw new Error('network unavailable');
          return { ok: outcome !== 'server-error', json: async () => ({ success: outcome !== 'rejected', referenceNumber: 'RPC-TEST' }) };
        },
      });
      function findForm(node) {
        if (!node || node === text || typeof node !== 'object') return null;
        if (node.type === 'form' && node.props.onSubmit) return node;
        for (const child of [node.props?.children].flat(Infinity)) {
          const found = findForm(child);
          if (found) return found;
        }
        return null;
      }
      const form = findForm(module.exports.default({}));
      assert(form, file);
      await form.props.onSubmit({ preventDefault() {}, target: { querySelector: () => null } });
      assert.equal(calls.length, outcome === 'success' ? 1 : 0, `${file}: ${outcome}`);
      if (calls.length) {
        assert.equal(calls[0][0], expectedForm);
        assert.equal(calls[0][1], true);
        assert.equal(calls[0][2].success, true);
      }
    }
  }
});
