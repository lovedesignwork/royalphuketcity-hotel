const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

function loadRoute(route) {
  const file = path.resolve(__dirname, '..', `src/app/m/${route}/[slug]/page.tsx`);
  const module = { exports: {} };
  const detail = { name: 'Known place', title: 'Known place', description: ['Description'], intro: 'Description' };
  const mocks = {
    'next/navigation': { notFound: () => { throw new Error('NEXT_HTTP_ERROR_FALLBACK;404'); } },
    '@/lib/mobile': { mobileMetadata: (title, url) => ({ title, url }) },
    '@/lib/constants': { ROOMS: [{slug:'known'}], RESTAURANTS: [{slug:'known'}], HOTEL_INFO: {phone:'+66 76 233 355'} },
    '@/lib/room-data': { ROOM_DETAILS: {known:detail} },
    '@/lib/restaurant-data': { RESTAURANT_DETAILS: {known:detail} },
    '@/lib/around-phuket': { AROUND_SECTIONS: [{slug:'known'}], getAroundSection: slug => slug === 'known' ? detail : undefined },
  };
  const source = ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions: {module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(source, { module, exports:module.exports, require: name => mocks[name] || {} });
  return module.exports;
}

for (const route of ['rooms','dining','around']) {
  test(`guest ${route}: only catalog routes are allowed and unknown metadata/rendering reject`, async () => {
    const page = loadRoute(route);
    assert.equal(page.dynamicParams, false);
    for (const slug of ['missing','constructor','toString','__proto__']) {
      const props = {params:Promise.resolve({slug})};
      await assert.rejects(page.generateMetadata(props), /;404/);
      await assert.rejects(page.default(props), /;404/);
    }
    assert.equal((await page.generateMetadata({params:Promise.resolve({slug:'known'})})).title, 'Known place');
  });
}
