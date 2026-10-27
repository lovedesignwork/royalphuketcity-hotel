import ownership from "../../content/editorial/image-ownership.json";
import { countArticleWords } from "@/lib/article-content";

type ArticleInput = { id?: string; slug?: string; content?: string; featured_image?: string | null; featured_image_alt?: string | null; meta_description?: string | null };

function normaliseImage(value: string) {
  try { const url = new URL(value, "https://royalphuketcity.com"); return decodeURIComponent(url.origin + url.pathname); }
  catch { return value; }
}

const identities = new Map<string, string>();
for (const article of ownership.articles) for (const asset of article.images) {
  const identity = asset.sourceSha256;
  identities.set(normaliseImage(asset.url), identity);
  for (const variant of asset.variants) identities.set(normaliseImage(variant.url), identity);
  if ("sourcePath" in asset && asset.sourcePath) identities.set(normaliseImage(asset.sourcePath.replace(/^public/, "")), identity);
}
for (const article of ownership.existingArticles) for (const asset of article.images) {
  if ("sha256" in asset && asset.sha256) identities.set(normaliseImage(asset.url), asset.sha256);
}

function identity(url: string) {
  const normal = normaliseImage(url);
  const uploadedHash = normal.match(/\/storage\/v1\/object\/public\/blog-images\/[^/]*-([a-f0-9]{64})\.webp$/i)?.[1];
  return identities.get(normal) || (uploadedHash ? `upload:${uploadedHash}` : normal);
}
function images(post: ArticleInput) {
  return [post.featured_image, ...[...(post.content || "").matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map(match => match[1])]
    .filter((url): url is string => Boolean(url));
}

export function validateBlogPublication(post: ArticleInput, others: ArticleInput[]) {
  const content = post.content || "";
  const words = countArticleWords(content);
  if (words < 800 || words > 1600) return `Article content must contain 800–1,600 words. Current count: ${words}.`;
  if (!post.featured_image || !post.featured_image_alt?.trim()) return "Add a featured image and descriptive featured-image alt text.";
  if (!post.meta_description?.trim()) return "Add a unique meta description before publishing.";
  if (/<time\b|\b\d+\s+(?:min|minutes?)\s+read\b/i.test(content)) return "Remove public timestamps and reading-time labels from the article.";
  if (/<h1\b/i.test(content)) return "Use H2 and H3 headings in the body; the article title supplies the H1.";
  if (!/<h2\b/i.test(content)) return "Add clear H2 sections before publishing.";
  const ownImages = images(post).map(identity);
  if (ownImages.length < 3 || ownImages.length > 5) return "Use 3–5 distinct images, including the featured image.";
  if (new Set(ownImages).size !== ownImages.length) return "Each article image must be different; do not repeat the featured image in the body.";
  for (const match of content.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=["'][^"']+?["']/i.test(match[0])) return "Every supporting image needs accurate alt text.";
    if (!/\bwidth=["']\d+["']/i.test(match[0]) || !/\bheight=["']\d+["']/i.test(match[0])) return "Reserve supporting-image space with width and height attributes.";
  }
  for (const other of others) {
    if ((post.id && post.id === other.id) || (post.slug && post.slug === other.slug)) continue;
    if (images(other).some(url => ownImages.includes(identity(url)))) return `An image is already assigned to “${other.slug}”. Choose a different photograph; renaming or cropping does not create a new image.`;
  }
  return null;
}
