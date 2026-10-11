// Offline technical SEO regression checks. Blog data is mocked; no network requests.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const test = require("node:test");
const root = path.resolve(__dirname, "..");

function harness({ thaiLaunched = false, posts = [], blogError = false } = {}) {
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
      if (name === "@/lib/blog") return { getPublishedPostSitemapEntries: async () => {
        if (blogError) throw new Error("Database unavailable");
        return posts;
      } };
      if (name === "@/lib/i18n/config" || name === "./i18n/config" || name === "./config") {
        return { SHOW_LANGUAGE_SWITCHER: thaiLaunched, TH_PREFIX: "/th" };
      }
      if (name.startsWith("@/")) return load(`src/${name.slice(2)}.ts`);
      if (name.startsWith(".")) return load(path.resolve(path.dirname(resolved), `${name}.ts`));
      throw new Error(`Unexpected dependency: ${name}`);
    }
    vm.runInNewContext(source, { require: localRequire, module, exports: module.exports, URL, Date, console }, { filename: resolved });
    return module.exports;
  }
  return { load };
}

test("canonical URLs ignore tracking/hash and normalize locale and trailing slashes", () => {
  const { getPageAlternates } = harness().load("src/lib/seo-utils.ts");
  assert.equal(getPageAlternates("/rooms-suites/?utm_source=test#rooms").canonical, "https://royalphuketcity.com/rooms-suites");
  assert.equal(getPageAlternates("/th/rooms-suites", "th").canonical, "https://royalphuketcity.com/th/rooms-suites");
  assert.equal(getPageAlternates("/th", "en").canonical, "https://royalphuketcity.com/");
  assert.equal(getPageAlternates("/contact").languages, undefined);
});

test("room metadata points to its actual route and branding appears once", () => {
  const { generatePageMetadata, generateRoomMetadata } = harness().load("src/lib/seo-utils.ts");
  const room = generateRoomMetadata({ name: "Premier Deluxe", slug: "premier-deluxe", category: "Room", description: [] });
  assert.equal(room.alternates.canonical, "https://royalphuketcity.com/rooms-suites/premier-deluxe");
  const page = generatePageMetadata({ title: "Contact | Royal Phuket City Hotel", description: "Contact the hotel", path: "/contact" });
  assert.equal(page.title.absolute, "Contact | Royal Phuket City Hotel");
  assert.equal(page.openGraph.url, page.alternates.canonical);
  assert.equal(page.openGraph.images[0].url, "https://royalphuketcity.com/images/og-image.jpg");
});

test("Thai previews remain noindex without prematurely advertising translations", () => {
  const { generatePageMetadata } = harness().load("src/lib/seo-utils.ts");
  const page = generatePageMetadata({ title: "Contact", description: "Contact", path: "/contact", locale: "th" });
  assert.equal(page.robots.index, false);
  assert.equal(page.robots.googleBot.index, false);
  assert.equal(page.alternates.languages, undefined);
});

test("approved language variants have reciprocal self-inclusive alternates", () => {
  const { getPageAlternates } = harness({ thaiLaunched: true }).load("src/lib/seo-utils.ts");
  const en = getPageAlternates("/contact", "en");
  const th = getPageAlternates("/th/contact", "th");
  assert.equal(JSON.stringify(en.languages), JSON.stringify(th.languages));
  assert.equal(en.languages.en, en.canonical);
  assert.equal(th.languages.th, th.canonical);
  assert.equal(en.languages["x-default"], en.canonical);
});

test("sitemap covers every real page type without duplicates or preview/admin/guest URLs", async () => {
  const env = harness();
  const sitemap = await env.load("src/app/sitemap.ts").default();
  const urls = new Set(sitemap.map(({ url }) => url));
  assert.equal(urls.size, sitemap.length);
  for (const slug of env.load("src/lib/seo-pages-data.ts").SEO_PAGE_SLUGS) assert(urls.has(`https://royalphuketcity.com/${slug}`));
  for (const slug of Object.keys(env.load("src/lib/room-data.ts").ROOM_DETAILS)) assert(urls.has(`https://royalphuketcity.com/rooms-suites/${slug}`));
  for (const slug of env.load("src/lib/wedding-types-data.ts").WEDDING_TYPE_SLUGS) assert(urls.has(`https://royalphuketcity.com/wedding-venues/${slug}`));
  for (const slug of env.load("src/lib/mice-event-types-data.ts").MICE_EVENT_TYPE_SLUGS) assert(urls.has(`https://royalphuketcity.com/meeting-events/${slug}`));
  for (const entry of sitemap) {
    assert(!/^\/(?:th|admin|api|m)(?:\/|$)/.test(new URL(entry.url).pathname));
    assert.equal(entry.lastModified, undefined);
    assert.equal(entry.priority, undefined);
    assert.equal(entry.changeFrequency, undefined);
  }
  for (const route of ["hotel-policy", "privacy-policy", "cookie-policy", "terms-conditions", "disclaimer"]) {
    assert(!urls.has(`https://royalphuketcity.com/${route}`), `Noindexed policy route must not be submitted: ${route}`);
  }
});

test("sitemap uses real article timestamps, rejects invalid/future dates, and encodes slugs", async () => {
  const posts = [
    { slug: "hotel-news", updated_at: "2025-04-05T12:00:00Z", published_at: "2025-03-01T12:00:00Z" },
    { slug: "guide & tips", updated_at: "invalid", published_at: "2025-01-01T00:00:00Z" },
    { slug: "missing-date", updated_at: "2099-01-01T00:00:00Z" },
  ];
  const sitemap = await harness({ posts }).load("src/app/sitemap.ts").default();
  const news = sitemap.find(({ url }) => url.endsWith("/hotel-news"));
  assert.equal(news.lastModified, "2025-04-05T12:00:00.000Z");
  const guide = sitemap.find(({ url }) => url.endsWith("/guide%20%26%20tips"));
  assert.equal(guide.lastModified, "2025-01-01T00:00:00.000Z");
  assert.equal(sitemap.find(({ url }) => url.endsWith("/missing-date")).lastModified, undefined);
});

test("sitemap fails regeneration on database failure instead of caching missing articles", async () => {
  await assert.rejects(harness({ blogError: true }).load("src/app/sitemap.ts").default(), /Database unavailable/);
});

test("robots permits rendering resources and noindex pages while excluding APIs", () => {
  const robots = harness().load("src/app/robots.ts").default();
  // Named groups replace the wildcard policy; each must retain API exclusions
  // without blocking the assets or pages needed to read noindex metadata.
  for (const agent of ["*", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Googlebot", "Googlebot-Image", "bingbot"]) {
    const rule = robots.rules.find(({ userAgent }) => [userAgent].flat().includes(agent));
    assert(rule, `Missing crawler policy: ${agent}`);
    assert.equal(rule.allow, "/");
    for (const route of ["/wedding-venues", "/meeting-events", "/_next/static/app.js", "/_next/image", "/m/contact", "/admin/login"]) {
      assert(!rule.disallow.some((blocked) => route.startsWith(blocked.replace(/\$$/, ""))), `${agent}: ${route}`);
    }
    assert(rule.disallow.includes("/api$"));
    assert(rule.disallow.includes("/api/"));
  }
  assert.equal(robots.sitemap, "https://royalphuketcity.com/sitemap.xml");
});
