import type { MetadataRoute } from "next";
import { SITE_CONFIG, RESTAURANTS, PROMOTIONS } from "@/lib/constants";
import { ROOM_DETAILS } from "@/lib/room-data";
import { SEO_PAGE_SLUGS } from "@/lib/seo-pages-data";
import { WEDDING_TYPE_SLUGS } from "@/lib/wedding-types-data";
import { MICE_EVENT_TYPE_SLUGS } from "@/lib/mice-event-types-data";
import { SHOW_LANGUAGE_SWITCHER } from "@/lib/i18n/config";
import { getPageAlternates } from "@/lib/seo-utils";
import { getBlogPath } from "@/lib/blog-path";
import { getPublishedPostSitemapEntries } from "@/lib/blog";

// Refresh published posts without requiring a deployment after every article.
// Database publication must be discoverable without waiting for a rebuild.
export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  "/",
  "/rooms-suites",
  "/promotions",
  "/dining",
  "/facilities",
  "/wedding-venues",
  "/meeting-events",
  "/contact",
  "/download-fact-sheets",
  "/artist",
  "/artist-story",
  "/royal-green",
  "/our-clients",
  "/sustainability",
  "/sustainability/activities",
  "/sustainability/cultural-historical",
  "/sustainability/michelin-restaurants",
  "/sustainability/natural-attractions",
  "/sustainability/transportation",
  "/blog",
  "/hotel-team",
  // Legal policy routes intentionally set noindex and stay out of the sitemap.
  "/accessibility",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    ...STATIC_PATHS,
    ...Object.keys(ROOM_DETAILS).map((slug) => `/rooms-suites/${slug}`),
    ...RESTAURANTS.map(({ slug }) => `/${slug}`),
    ...PROMOTIONS.map(({ slug }) => `/promotions/${slug}`),
    ...WEDDING_TYPE_SLUGS.map((slug) => `/wedding-venues/${slug}`),
    ...MICE_EVENT_TYPE_SLUGS.map((slug) => `/meeting-events/${slug}`),
    ...SEO_PAGE_SLUGS.map((slug) => `/${slug}`),
  ];

  const pages: MetadataRoute.Sitemap = [...new Set(paths)].flatMap((path) => {
    const alternates = getPageAlternates(path);
    const englishPage = { url: new URL(path, SITE_CONFIG.url).toString() };

    // The Thai copy is still a preview. Do not submit noindexed pages or
    // advertise language alternates until the existing launch flag is enabled.
    if (!SHOW_LANGUAGE_SWITCHER) return [englishPage];

    const languages = alternates?.languages as Record<string, string>;
    return [
      { ...englishPage, alternates: { languages } },
      { url: languages.th, alternates: { languages } },
    ];
  });

  const posts = await getPublishedPostSitemapEntries();
  for (const post of posts) {
    // Slugs are a single path segment. Encoding also protects XML URL values.
    const url = new URL(getBlogPath(post.slug), SITE_CONFIG.url).toString();
    const modified = [post.updated_at, post.published_at]
      .filter((value): value is string => Boolean(value))
      .map((value) => new Date(value))
      .filter((date) => Number.isFinite(date.getTime()) && date.getTime() <= Date.now())
      .sort((a, b) => b.getTime() - a.getTime())[0];

    pages.push({ url, ...(modified && { lastModified: modified.toISOString() }) });
  }

  // Static content has no editorial timestamps. Omitting lastmod is more
  // accurate than claiming every page changed whenever the sitemap is served.
  return [...new Map(pages.map((page) => [page.url, page])).values()];
}
