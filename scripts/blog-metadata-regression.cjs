// Exercise the real metadata function with published article fixtures; no network.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");

const hotelName = "Royal Phuket City Hotel";
const origin = "https://royalphuketcity.com";
function metadataFor(post) {
  const module = { exports: {} };
  const source = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "../src/components/BlogArticle.tsx"), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }
  ).outputText;
  function requireMock(name) {
    if (name === "@/lib/constants") return { SITE_CONFIG: { name: hotelName, url: origin } };
    if (name === "@/lib/blog") return { getPublishedPost: async () => post };
    if (name === "@/lib/blog-path") return { getBlogPath: slug => `/${slug}` };
    if (name === "@/lib/article-editorial") {
      const editorial = { exports: {} };
      const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, "../src/lib/article-editorial.ts"), "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      }).outputText;
      vm.runInNewContext(compiled, { require: requireMock, module: editorial, exports: editorial.exports });
      return editorial.exports;
    }
    if (["next/image", "next/link", "next/navigation", "@/components", "@/components/BlogFeedback", "@/components/BlogShare", "@/components/JsonLd"].includes(name)) return {};
    return require(name);
  }
  vm.runInNewContext(source, { require: requireMock, module, exports: module.exports });
  return module.exports.generateBlogMetadata({ params: Promise.resolve({ slug: post?.slug || "missing" }) });
}

test("article search and social titles include branding once without changing the article", async () => {
  for (const title of ["Planning Your Dream Wedding at Royal Phuket City Hotel", "Phuket Town or Patong: Where Should You Stay?"]) {
    const post = Object.freeze({ title, slug: "hotel-guide", meta_description: "Plan your hotel stay.", featured_image: "/images/og-image.jpg", published_at: "2026-10-11T00:00:00Z" });
    const metadata = await metadataFor(post);
    const expected = title.includes(hotelName) ? title : `${title} | ${hotelName}`;
    assert.equal(metadata.title.absolute, expected);
    assert.equal(metadata.openGraph.title, expected);
    assert.equal(metadata.twitter.title, expected);
    assert.equal(metadata.title.absolute.split(hotelName).length - 1, 1);
    assert.equal(metadata.alternates.canonical, `${origin}/hotel-guide`);
    assert.equal(metadata.description, post.meta_description);
    assert.equal(post.title, title);
  }
});

test("missing articles remain excluded from indexing", async () => {
  const metadata = await metadataFor(null);
  assert.equal(metadata.robots.index, false);
  assert.equal(metadata.title, "Post Not Found");
});
