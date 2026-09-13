// Offline regression checks. All mail/database adapters are mocked: no network or writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

function harness(options = {}) {
  const emails = [];
  const inserts = [];
  const env = options.configured === false ? {} : {
    NEXT_PUBLIC_SUPABASE_URL: 'https://database.invalid',
    SUPABASE_SERVICE_ROLE_KEY: 'test-only',
    RESEND_API_KEY: 'test-only',
  };
  if (options.emailOnly) {
    delete env.NEXT_PUBLIC_SUPABASE_URL;
    delete env.SUPABASE_SERVICE_ROLE_KEY;
  }
  const cache = new Map();
  function load(file) {
    const resolved = path.resolve(root, file);
    if (cache.has(resolved)) return cache.get(resolved);
    const module = { exports: {} };
    cache.set(resolved, module.exports);
    const source = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    }).outputText;
    const mocks = {
      'next/server': { NextResponse: { json: (data, init) => ({ status: init?.status || 200, data }) } },
      '@supabase/supabase-js': { createClient: () => ({ from: (table) => ({ insert: (row) => {
        inserts.push({ table, row });
        return { select: () => ({ single: async () => ({
          data: options.databaseError ? null : { id: '12345678-test', reference: 'TEST-REFERENCE' },
          error: options.databaseError ? { message: 'Database unavailable' } : null,
        }) }) };
      } }) }) },
      resend: { Resend: class { constructor() { this.emails = { send: async (email) => {
        emails.push(email);
        if (options.mailThrows) throw new Error('Mail unavailable');
        return { data: options.mailError ? null : { id: 'test-mail' }, error: options.mailError ? { message: 'Mail rejected' } : null };
      } }; } } },
    };
    const requireModule = (name) => {
      if (mocks[name]) return mocks[name];
      if (name.startsWith('@/')) return load(`src/${name.slice(2)}.ts`);
      throw new Error(`Unmocked dependency: ${name}`);
    };
    vm.runInNewContext(source, { require: requireModule, module, exports: module.exports,
      process: { env }, console: { log() {}, error() {} }, Date, Math, Intl, JSON,
    }, { filename: resolved });
    return module.exports;
  }
  return { load, emails, inserts, post: (route, body) => load(`src/app/api/${route}/route.ts`).POST({ json: async () => body }) };
}

const contact = { name: 'Example Guest', email: 'guest@example.com', message: 'Please share room availability.', _ts: Date.now() - 10000 };
const spa = { ...contact, phone: '+66812345678', roomNumber: '123', date: '2099-01-15', time: '11:00', treatmentId: 20, treatmentName: 'Recovery Starter', duration: '60 min', amount: 1080, guests: 1, notes: '' };

test('contact never reports success with no delivery destination', async () => {
  const result = await harness({ configured: false }).post('contact', contact);
  assert.equal(result.status, 503);
});
test('contact treats a returned mail error as failed delivery', async () => {
  const result = await harness({ emailOnly: true, mailError: true }).post('contact', contact);
  assert.equal(result.status, 503);
});
test('saved contact remains accepted if mail throws (no duplicate retry)', async () => {
  const result = await harness({ mailThrows: true }).post('contact', contact);
  assert.equal(result.status, 200);
  assert.equal(result.data.confirmationEmailSent, false);
});
test('email-only contact returns the same usable reference sent by email', async () => {
  const h = harness({ emailOnly: true });
  const result = await h.post('contact', contact);
  assert.equal(result.status, 200);
  assert.ok(result.data.referenceNumber);
  assert.ok(h.emails[0].html.includes(result.data.referenceNumber));
});
test('contact escapes guest HTML in notification and confirmation', async () => {
  const h = harness();
  await h.post('contact', { ...contact, message: '<img src=x onerror=alert(1)>\nPlease help.' });
  assert.equal(h.emails.length, 2);
  for (const email of h.emails) {
    assert.ok(!email.html.includes('<img src=x'));
    assert.ok(email.html.includes('&lt;img'));
  }
});
test('contact rejects malformed field types and invalid email as 400', async () => {
  for (const body of [null, { ...contact, name: {} }, { ...contact, email: 'bad-email' }, { ...contact, message: '   ' }]) {
    const h = harness();
    assert.equal((await h.post('contact', body)).status, 400);
    assert.equal(h.inserts.length, 0);
  }
});
test('Thai guest messages pass antispam', async () => {
  const { validateAntiSpam } = harness().load('src/lib/antispam.ts');
  const result = await validateAntiSpam({ ...contact, message: 'สวัสดีค่ะ ต้องการสอบถามห้องพักสำหรับครอบครัวในวันหยุด และบริการอาหารเช้าที่โรงแรมค่ะ' });
  assert.equal(result.passed, true);
});
test('spa uses catalog price and guest count rather than client claims', async () => {
  const h = harness();
  assert.equal((await h.post('spa/book', { ...spa, amount: 1, guests: 99, treatmentName: 'Injected treatment' })).status, 200);
  assert.equal(h.inserts[0].row.amount, 1080);
  assert.equal(h.inserts[0].row.guests, 1);
  assert.equal(h.inserts[0].row.service, 'Recovery Starter (60 min)');
});
test('spa rejects invalid treatment, duration, date and times before persistence', async () => {
  for (const patch of [{ treatmentId: 999 }, { duration: '999 min' }, { date: '2020-01-01' }, { date: '2099-02-31' }, { time: '03:00' }]) {
    const h = harness();
    assert.equal((await h.post('spa/book', { ...spa, ...patch })).status, 400);
    assert.equal(h.inserts.length, 0);
  }
});
test('saved spa booking remains accepted if notification fails', async () => {
  assert.equal((await harness({ mailThrows: true }).post('spa/book', spa)).status, 200);
});
test('saved feedback remains accepted if notification fails', async () => {
  assert.equal((await harness({ mailThrows: true }).post('feedback', { overall: 5, _ts: Date.now() - 10000 })).status, 200);
});
test('feedback rejects invalid optional ratings and email', async () => {
  for (const patch of [{ room: 99 }, { overall: true }, { email: 'bad-email' }, { stayAgain: 'invalid' }]) {
    const h = harness();
    assert.equal((await h.post('feedback', { overall: 5, ...patch })).status, 400);
    assert.equal(h.inserts.length, 0);
  }
});
test('guest chat never sends a confirmation to the placeholder address', async () => {
  const h = harness();
  const result = await h.post('contact', { ...contact, inquiry_type: 'guest_chat', email: 'guest@royalphuketcity.com' });
  assert.equal(result.status, 200);
  assert.equal(h.emails.length, 1);
  assert.equal(result.data.confirmationEmailSent, false);
});
test('hotel date uses Bangkok around UTC midnight and slots reject elapsed hours', () => {
  const { hotelDateValue, isFutureSpaSlot } = harness().load('src/lib/guest-form-validation.ts');
  assert.equal(hotelDateValue(new Date('2026-09-12T18:00:00Z')), '2026-09-13');
  assert.equal(isFutureSpaSlot('2026-09-13', '10:00', new Date('2026-09-13T03:30:00Z')), false);
  assert.equal(isFutureSpaSlot('2026-09-13', '11:00', new Date('2026-09-13T03:30:00Z')), true);
});
test('native calendar minimum preserves the local day in eastern and western timezones', () => {
  const { localDateValue } = harness().load('src/lib/guest-form-validation.ts');
  const original = process.env.TZ;
  try {
    for (const zone of ['Asia/Bangkok', 'America/Los_Angeles']) {
      process.env.TZ = zone;
      assert.equal(localDateValue(new Date(2026, 8, 13)), '2026-09-13');
    }
  } finally {
    if (original === undefined) delete process.env.TZ; else process.env.TZ = original;
  }
});
test('spa dates are consecutive Bangkok days across a visitor daylight-saving change', () => {
  const { hotelDatesAhead } = harness().load('src/lib/guest-form-validation.ts');
  const original = process.env.TZ;
  try {
    process.env.TZ = 'America/Los_Angeles';
    const values = hotelDatesAhead(3, new Date('2026-03-07T17:30:00Z'));
    assert.equal(values.join(','), '2026-03-08,2026-03-09,2026-03-10');
  } finally {
    if (original === undefined) delete process.env.TZ; else process.env.TZ = original;
  }
});
test('calendar minimum is identical on a UTC server and Bangkok browser', () => {
  const { hotelDateValue } = harness().load('src/lib/guest-form-validation.ts');
  const original = process.env.TZ;
  try {
    for (const zone of ['UTC', 'Asia/Bangkok']) {
      process.env.TZ = zone;
      assert.equal(hotelDateValue(new Date('2026-09-12T18:00:00Z')), '2026-09-13');
    }
  } finally {
    if (original === undefined) delete process.env.TZ; else process.env.TZ = original;
  }
});

(async () => {
  let failures = 0;
  for (const { name, fn } of tests) {
    try { await fn(); console.log(`PASS ${name}`); }
    catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`); }
  }
  console.log(`${tests.length - failures}/${tests.length} guest-form regression checks passed`);
  process.exitCode = failures ? 1 : 0;
})();
