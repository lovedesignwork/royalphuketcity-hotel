// Read-only HTTP checks, never form submissions or authenticated requests.
// Usage: node scripts/check-crawler-access.mjs [base-url] [evidence-json-path]
// User-agent probes run from this machine, not the providers' real IP ranges.
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const canonicalOrigin = "https://royalphuketcity.com";
const base = new URL(process.argv[2] || canonicalOrigin);
const agents = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Googlebot", "Googlebot-Image", "bingbot"];
const results = [];
const restricted = /\b(?:noindex|none|nosnippet|noarchive|nocache)\b|max-snippet\s*:\s*0\b/i;
const normalized = (url) => new URL(url).href.replace(/\/$/, "");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)=["']([^"']*)["']/g)].map((m) => [m[1].toLowerCase(), m[2]]));

async function request(path, agent) {
  const response = await fetch(new URL(path, base), {
    headers: { "user-agent": `Mozilla/5.0 (compatible; ${agent}/1.0)` },
    signal: AbortSignal.timeout(30000),
    redirect: "manual",
  });
  const body = await response.text();
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  assert(!restricted.test(response.headers.get("x-robots-tag") || ""), `${path}: restrictive X-Robots-Tag`);
  return { response, body };
}

function checkRobots(body, agent) {
  // Inspect the explicit group, since it overrides wildcard rules.
  const group = body.split(/\r?\n\s*\r?\n/).find((block) =>
    block.split(/\r?\n/).some((line) => line.toLowerCase() === `user-agent: ${agent.toLowerCase()}`));
  assert(group, `Missing explicit ${agent} group`);
  assert.match(group, /^Allow: \/\s*$/m);
  const exclusions = [...group.matchAll(/^Disallow:\s*(.+)$/gm)].map((m) => m[1].trim()).sort();
  assert.deepEqual(exclusions, ["/api$", "/api/"].sort());
  assert(body.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
}

function checkPage(body, path) {
  const head = body.split(/<\/head>/i)[0];
  assert.match(head, /<title>[^<]+<\/title>/i, "Missing initial HTML title");
  const tags = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
  for (const tag of tags.filter((tag) => /^(robots|googlebot|bingbot)$/i.test(tag.name || ""))) {
    assert(!restricted.test(tag.content || ""), `Restrictive ${tag.name} metadata`);
  }
  const canonical = [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0])).find((tag) => tag.rel === "canonical");
  assert(canonical?.href, "Missing initial HTML canonical");
  assert.equal(normalized(canonical.href), normalized(new URL(path, canonicalOrigin)), "Wrong canonical");
  const visible = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  assert.match(visible, /<h1\b[^>]*>[\s\S]*?<\/h1>/i, "Missing server-rendered H1");
  assert(visible.replace(/<[^>]*>/g, " ").trim().length > 200, "Insufficient server-rendered text");
  const structuredData = [...body.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  assert(structuredData.length > 0, "No structured data");
  for (const match of structuredData) JSON.parse(match[1]);
}

async function probe(path, agent) {
  try {
    const { body, response } = await request(path, agent);
    if (path === "/robots.txt") checkRobots(body, agent);
    else if (path === "/sitemap.xml") assert.match(body, /<urlset[\s>]/);
    else if (path === "/llms.txt") assert(body.startsWith("# Royal Phuket City Hotel") && body.includes("/wedding-venues/thai-wedding"));
    else checkPage(body, path);
    results.push({ path, agent, status: response.status, pass: true });
  } catch (error) {
    results.push({ path, agent, pass: false, error: error.message });
  }
}

async function pool(jobs) {
  let next = 0;
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      await probe(job.path, job.agent);
    }
  }));
}

const { body: sitemap } = await request("/sitemap.xml", "OAI-SearchBot");
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const url = new URL(m[1].replaceAll("&amp;", "&"));
  assert.equal(url.origin, canonicalOrigin);
  assert(!/^\/(?:admin|api|m|th)(?:\/|$)/.test(url.pathname), `Non-public sitemap entry: ${url.pathname}`);
  return url.pathname;
});
assert(sitemapPaths.length > 0 && new Set(sitemapPaths).size === sitemapPaths.length, "Empty/duplicate sitemap");
const { body: guide } = await request("/llms.txt", "OAI-SearchBot");
const guidePaths = [...guide.matchAll(/\]\((https:\/\/royalphuketcity\.com[^)]*)\)/g)].map((m) => new URL(m[1]).pathname);
for (const path of guidePaths.filter((path) => !/\.(txt|xml)$/.test(path))) assert(sitemapPaths.includes(path), `Guide link not in sitemap: ${path}`);
const keyPaths = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/", "/wedding-venues", "/wedding-venues/thai-wedding", "/meeting-events", "/meeting-events/corporate-conference"];
await pool(agents.flatMap((agent) => keyPaths.map((path) => ({ path, agent }))));
await pool(sitemapPaths.filter((path) => !keyPaths.includes(path)).map((path) => ({ path, agent: "OAI-SearchBot" })));
const failures = results.filter((result) => !result.pass);
const report = { checkedAt: new Date().toISOString(), base: base.href, limitation: "HTTP probes use crawler user-agent names from the tester's network; this does not prove a visit from provider IP ranges or inclusion in any search index.", agents, sitemapPages: sitemapPaths.length, guideLinks: guidePaths.length, checks: results.length, failures, results };
if (process.argv[3]) await writeFile(process.argv[3], `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ...report, results: undefined }, null, 2));
if (failures.length) process.exitCode = 1;
