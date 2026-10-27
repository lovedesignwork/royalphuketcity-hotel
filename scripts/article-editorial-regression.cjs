const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(relativePath, mocks = {}) {
  const module = { exports: {} };
  const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const requireModule = name => {
    if (name in mocks) return mocks[name];
    if (name === "@/lib/constants") return { SITE_CONFIG: { name: "Royal Phuket City Hotel", url: "https://royalphuketcity.com" } };
    if (name === "@/lib/article-editorial") return load("src/lib/article-editorial.ts");
    if (name === "@/lib/article-content") return load("src/lib/article-content.ts");
    return require(name);
  };
  vm.runInNewContext(compiled, { require: requireModule, module, exports: module.exports, URL });
  return module.exports;
}
const { getArticleDates, formatArticleDate, HOTEL_TEAM_AUTHOR } = load("src/lib/article-editorial.ts");
const now = Date.parse("2026-10-27T12:00:00Z");

test("article dates never invent missing dates or accept future/invalid values", () => {
  for (const value of [undefined, "", "invalid", "2027-01-01T00:00:00Z"]) {
    const dates = getArticleDates({ published_at: value, updated_at: value }, now);
    assert.equal(dates.published, undefined);
    assert.equal(dates.modified, undefined);
    assert.equal(dates.showUpdated, false);
  }
});

test("updates cannot predate publication; independent valid update dates are retained", () => {
  const published_at = "2026-10-11T00:00:00Z";
  for (const updated_at of [published_at, "2026-09-01T00:00:00Z", "invalid"]) {
    const dates = getArticleDates({ published_at, updated_at }, now);
    assert.equal(dates.modified, dates.published);
    assert.equal(dates.showUpdated, false);
  }
  const dates = getArticleDates({ updated_at: published_at }, now);
  assert.equal(dates.published, undefined);
  assert.equal(dates.modified, "2026-10-11T00:00:00.000Z");
  assert.equal(dates.showUpdated, true);
  assert.equal(formatArticleDate("2026-10-10T18:00:00Z"), "11 October 2026");
});

test("public articles keep timestamps and reading times private while retaining author and canonical metadata", async () => {
  const post = { id: "1", slug: "hotel-guide", title: "Hotel guide", content: "<p>Hotel information</p>", published_at: "2020-01-02T00:00:00Z", updated_at: "2020-02-03T00:00:00Z" };
  const nullComponent = () => null;
  const article = load("src/components/BlogArticle.tsx", {
    "@/lib/blog": { getPublishedPost: async () => post, getPublishedPosts: async () => ({ posts: [] }) },
    "@/lib/blog-path": { getBlogPath: slug => `/${slug}` },
    "next/navigation": { notFound: () => { throw new Error("not found"); } },
    "next/image": { default: nullComponent },
    "next/link": { default: ({ children, ...props }) => React.createElement("a", props, children) },
    "@/components": { HeroSection: nullComponent },
    "@/components/BlogFeedback": { default: nullComponent },
    "@/components/BlogShare": { default: nullComponent },
    "@/components/JsonLd": { JsonLd: ({ data }) => React.createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(data) } }) },
  });
  const params = Promise.resolve({ slug: post.slug });
  const html = renderToStaticMarkup(await article.default({ params }));
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  const metadata = await article.generateBlogMetadata({ params });
  assert.equal(schema.author.url, HOTEL_TEAM_AUTHOR.url);
  assert.equal(schema.author["@id"], HOTEL_TEAM_AUTHOR["@id"]);
  assert.match(html, /href="\/hotel-team"/);
  assert.equal(schema.datePublished, undefined);
  assert.equal(schema.dateModified, undefined);
  assert.equal(metadata.openGraph.publishedTime, undefined);
  assert.equal(metadata.openGraph.modifiedTime, undefined);
  assert.doesNotMatch(html, /<time|dateTime=|min read|2 January 2020|3 February 2020|Published|Updated/);

});
