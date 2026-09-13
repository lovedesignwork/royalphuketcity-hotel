// Exercise actual rendered JSON-LD and landing pages without network or a browser.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const root = path.resolve(__dirname, "..");
const modules = new Map();
function load(filename) {
  const resolved = path.resolve(root, filename);
  if (modules.has(resolved)) return modules.get(resolved).exports;
  const module = { exports: {} };
  modules.set(resolved, module);
  const source = ts.transpileModule(fs.readFileSync(resolved, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  function localRequire(name) {
    if (name === "next/navigation") return { notFound: () => { throw new Error("NEXT_NOT_FOUND"); } };
    if (name === "next/link") return ({ children, href, ...props }) => React.createElement("a", { href, ...props }, children);
    if (name === "@/components/i18n/LocaleLink") return ({ children, href, ...props }) => React.createElement("a", { href, ...props }, children);
    if (name === "@/components/i18n/LocaleProvider") return { useLocale: () => ({ locale: "en" }) };
    if (name === "@/lib/i18n/get-locale") return { getLocale: async () => "en" };
    if (name === "@/components/ImageGallery") return () => null;
    if (name === "@/components") return {
      Breadcrumbs: load("src/components/Breadcrumbs.tsx").default,
      ReserveButton: () => React.createElement("a", { href: "/contact" }, "Reserve"),
      ImageGallery: () => null,
      RoomPhotoSlider: () => null,
    };
    if (name === "next/image") return ({ src, alt }) => React.createElement("img", { src, alt });
    if (name === "@/components/HeroSection") return ({ title }) => React.createElement("h1", {}, title);
    if (name.startsWith("@/") || name.startsWith(".")) {
      const base = name.startsWith("@/") ? path.join(root, "src", name.slice(2)) : path.resolve(path.dirname(resolved), name);
      const file = [base, `${base}.ts`, `${base}.tsx`].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
      if (!file) throw new Error(`Missing local module ${name}`);
      return load(file);
    }
    return require(name);
  }
  vm.runInNewContext(source, { require: localRequire, module, exports: module.exports, URL, Date, console }, { filename: resolved });
  return module.exports;
}

const schema = load("src/components/JsonLd.tsx");
const { HOTEL_INFO, SITE_CONFIG, PROMOTIONS } = load("src/lib/constants.ts");
const { SEO_PAGES, SEO_PAGE_SLUGS } = load("src/lib/seo-pages-data.ts");
const landingPage = load("src/app/(seo-pages)/[slug]/page.tsx");
function renderedData(component, props = {}) {
  const html = renderToStaticMarkup(React.createElement(component, props));
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(match, "Expected JSON-LD script");
  return JSON.parse(match[1]);
}

test("JSON-LD keeps script-closing content inert while preserving text", () => {
  const text = '</script><script>alert("injected")</script><img src=x onerror=alert(1)>';
  const html = renderToStaticMarkup(React.createElement(schema.JsonLd, { data: { "@context": "https://schema.org", name: text } }));
  assert.equal((html.match(/<script/g) || []).length, 1);
  assert(!html.includes("<img"));
  assert.equal(renderedData(schema.JsonLd, { data: { name: text } }).name, text);
});

test("promotion prices do not concatenate nights, rooms or percentages", () => {
  const cases = [
    ["From ฿2,200 / 2 nights", 2200],
    ["From ฿3,799 / 2 rooms", 3799],
    ["เริ่มต้น ฿5,200 / 2 คืน", 5200],
    ["From THB 1,234.50/night", 1234.5],
    ["1200.50", 1200.5],
    ["Hotel guests 10% off", undefined],
    ["Contact us for a quote", undefined],
  ];
  for (const [price, expected] of cases) {
    const data = renderedData(schema.OfferJsonLd, { name: "Package", description: price, price, url: "/promotions/package", image: "/images/og-image.jpg", validFrom: "2026-01-01", validThrough: "2026-09-30" });
    assert.equal(data.price, expected, price);
    assert.equal(data.priceCurrency, expected === undefined ? undefined : "THB");
    assert.equal(data.availability, undefined, "Live inventory must not be assumed");
    assert.equal(data.validThrough, "2026-09-30T23:59:59.999+07:00");
  }
  for (const promotion of PROMOTIONS) {
    const data = renderedData(schema.OfferJsonLd, { ...promotion, name: promotion.title, description: promotion.shortDescription, url: `/promotions/${promotion.slug}`, validThrough: promotion.validUntil });
    if (promotion.price.includes("%")) assert.equal(data.price, undefined);
  }
});

test("hotel and publishing organization share an entity and public contact details", () => {
  const hotel = renderedData(schema.HotelJsonLd);
  const organization = renderedData(schema.OrganizationJsonLd);
  const website = renderedData(schema.WebSiteJsonLd);
  assert.equal(hotel["@id"], organization["@id"]);
  assert.equal(website.publisher["@id"], hotel["@id"]);
  assert.equal(hotel.name, HOTEL_INFO.name);
  assert.equal(hotel.telephone, HOTEL_INFO.phone);
  assert.equal(hotel.email, HOTEL_INFO.email);
  assert.equal(hotel.address.streetAddress, "154 Phang-Nga Road, Talad Yai");
  assert.equal(hotel.aggregateRating, undefined);
  assert.equal(website.potentialAction, undefined);
  assert(fs.existsSync(path.join(root, "public", decodeURIComponent(new URL(organization.logo.url).pathname))));
});

test("room images are absolute, decimal floor sizes are retained and breadcrumbs accept absolute URLs", () => {
  const room = renderedData(schema.HotelRoomJsonLd, { name: "Room", description: "A room", image: "/images/room photo.jpg", url: "/rooms-suites/example", bedType: "Twin", occupancy: 2, floorSize: "30.5 sqm", amenities: ["WiFi"] });
  assert.equal(room.image, `${SITE_CONFIG.url}/images/room%20photo.jpg`);
  assert.equal(room.floorSize.value, 30.5);
  assert.equal(room.containedInPlace["@id"], `${SITE_CONFIG.url}/#hotel`);
  const crumbs = renderedData(schema.BreadcrumbJsonLd, { items: [{ name: "Home", url: "/" }, { name: "Contact", url: `${SITE_CONFIG.url}/contact` }] });
  assert.equal(crumbs.itemListElement[1].item, `${SITE_CONFIG.url}/contact`);
  assert.deepEqual(crumbs.itemListElement.map((item) => item.position), [1, 2]);
});

test("all 15 landing pages render content, breadcrumbs, matching FAQs and unique canonicals", async () => {
  const canonicals = new Set();
  for (const slug of SEO_PAGE_SLUGS) {
    const props = { params: Promise.resolve({ slug }) };
    const metadata = await landingPage.generateMetadata(props);
    assert.equal(metadata.alternates.canonical, `${SITE_CONFIG.url}/${slug}`);
    canonicals.add(metadata.alternates.canonical);
    const html = renderToStaticMarkup(await landingPage.default(props));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, slug);
    assert(!html.includes("Related Keywords"), `${slug} must not contain a hidden keyword list`);
    const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert(structuredData.some((data) => data["@type"] === "BreadcrumbList"), slug);
    const faqs = structuredData.find((data) => data["@type"] === "FAQPage");
    for (const item of faqs?.mainEntity || []) {
      const visibleAnswer = renderToStaticMarkup(React.createElement("p", {}, item.acceptedAnswer.text)).slice(3, -4);
      assert(html.includes(`>${visibleAnswer}</p>`), `${slug}: schema answer must also be visible`);
    }
    const data = SEO_PAGES[slug];
    assert(fs.existsSync(path.join(root, "public", data.heroImage)), `${slug}: missing hero`);
    const links = [data.content.callToAction.buttonLink, ...(data.content.planningSections || []).flatMap((section) => section.links.map((link) => link.href))];
    for (const href of links) {
      const actualPage = fs.existsSync(path.join(root, "src/app", href, "page.tsx"));
      const knownLanding = Boolean(SEO_PAGES[href.slice(1)]);
      const room = href.startsWith("/rooms-suites/") && Boolean(load("src/lib/room-data.ts").ROOM_DETAILS[href.split("/").pop()]);
      assert(actualPage || knownLanding || room, `${slug}: broken content link ${href}`);
    }
  }
  assert.equal(canonicals.size, SEO_PAGE_SLUGS.length);
});

test("unknown and inherited object-key slugs return not found instead of errors or indexable pages", async () => {
  for (const slug of ["not-a-real-page", "constructor", "toString", "__proto__"]) {
    await assert.rejects(landingPage.default({ params: Promise.resolve({ slug }) }), /NEXT_NOT_FOUND/);
    await assert.rejects(landingPage.generateMetadata({ params: Promise.resolve({ slug }) }), /NEXT_NOT_FOUND/);
  }
});

test("all live room detail components render the room schema with their visible specifications", async () => {
  const page = load("src/app/rooms-suites/[slug]/page.tsx");
  const { ROOM_DETAILS } = load("src/lib/room-data.ts");
  for (const [slug, room] of Object.entries(ROOM_DETAILS)) {
    const props = { params: Promise.resolve({ slug }) };
    const html = renderToStaticMarkup(await page.default(props));
    const items = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const data = items.find((item) => item["@type"] === "HotelRoom");
    assert(data, slug);
    assert.equal(data.name, room.name);
    assert.equal(data.floorSize.value, parseFloat(room.size));
    assert.equal(data.occupancy.maxValue, room.maxGuests);
    assert(html.includes(room.size));
    const metadata = await page.generateMetadata(props);
    assert.equal(metadata.openGraph.images[0].width, undefined, "Do not invent dimensions for room photographs");
  }
  await assert.rejects(page.default({ params: Promise.resolve({ slug: "constructor" }) }), /NEXT_NOT_FOUND/);
});

test("both actual restaurant templates render JSON-LD with the displayed name, cuisine and telephone", () => {
  const { RESTAURANT_DETAILS } = load("src/lib/restaurant-data.ts");
  const Template = load("src/components/RestaurantPageTemplate.tsx").default;
  for (const restaurant of Object.values(RESTAURANT_DETAILS)) {
    const html = renderToStaticMarkup(React.createElement(Template, { restaurant }));
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert(match, restaurant.slug);
    const data = JSON.parse(match[1]);
    assert.equal(data["@type"], "Restaurant");
    assert.equal(data.name, restaurant.name);
    assert.equal(data.servesCuisine, restaurant.cuisine);
    assert.equal(data.telephone, restaurant.phone);
    assert.equal(data.parentOrganization["@id"], `${SITE_CONFIG.url}/#hotel`);
    assert.equal(data.hasMenu, undefined, "Do not mark up menu content that is not visible");
    assert(html.includes(restaurant.phone));
    const expectedPhone = restaurant.slug === "yan-long-chinese-restaurant"
      ? "tel:+6676233355;ext=1234" : "tel:+6676233355;ext=1901";
    assert.equal(html.split(`href="${expectedPhone}"`).length - 1, 2, "Both reservation links must preserve the extension in RFC3966 format");
  }
});

test("date-only promotions remain active until Phuket midnight and expire immediately after", () => {
  const { isPromotionActive, promotionExpiry } = load("src/lib/promotion-validity.ts");
  assert.equal(promotionExpiry("2026-09-30"), "2026-09-30T23:59:59.999+07:00");
  assert.equal(isPromotionActive("2026-09-30", new Date("2026-09-30T06:59:59+07:00")), true);
  assert.equal(isPromotionActive("2026-09-30", new Date("2026-09-30T07:00:01+07:00")), true, "UTC midnight must not end the local booking day");
  assert.equal(isPromotionActive("2026-09-30", new Date("2026-09-30T16:59:59.999Z")), true);
  assert.equal(isPromotionActive("2026-09-30", new Date("2026-09-30T17:00:00.000Z")), false);
  assert.equal(isPromotionActive("invalid-date", new Date()), false);
});

test("actual promotion detail pages use correct price or omit price on discount-only offers", async () => {
  const page = load("src/app/promotions/[slug]/page.tsx");
  for (const [slug, expected] of [["stay-2-pay-1", 2200], ["family-nest", 3799], ["yan-long-dining", undefined], ["spa-guest-recovery", undefined]]) {
    const props = { params: Promise.resolve({ slug }) };
    const html = renderToStaticMarkup(await page.default(props));
    const items = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const data = items.find((item) => item["@type"] === "Offer");
    assert.equal(data.price, expected, slug);
    const metadata = await page.generateMetadata(props);
    assert.equal(metadata.openGraph.images[0].width, undefined, "Do not invent dimensions for promotional photographs");
  }
});
