import { SEO_PAGE_SLUGS } from "@/lib/seo-pages-data";

// Existing hotel/service pages always keep their routes. Legacy articles with a
// collision remain readable under /blog instead of redirecting to another page.
const reserved = new Set([
  ...SEO_PAGE_SLUGS, "admin", "api", "m", "th", "blog", "contact", "rooms-suites",
  "promotions", "good-eatz-154", "facilities", "dining", "wedding-venues", "meeting-events",
  "artist", "artist-story", "royal-green", "our-clients", "sustainability",
  "download-fact-sheets", "hotel-policy", "privacy-policy", "cookie-policy",
  "terms-conditions", "disclaimer", "accessibility", "yan-long-chinese-restaurant",
  "twist-rooftop-restaurant-bar", "robots.txt", "sitemap.xml", "llms.txt",
  "manifest.webmanifest", "opengraph-image", "favicon.ico", "images", "_next",
]);

export function getBlogPath(slug: string) {
  const encoded = encodeURIComponent(slug);
  return reserved.has(slug) ? `/blog/${encoded}` : `/${encoded}`;
}

export function isBlogSlugAvailable(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && !reserved.has(slug);
}
