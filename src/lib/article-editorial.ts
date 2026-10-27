import { SITE_CONFIG } from "@/lib/constants";

export const HOTEL_TEAM_PATH = "/hotel-team";
export const HOTEL_TEAM_AUTHOR = {
  "@type": "Organization",
  "@id": `${SITE_CONFIG.url}${HOTEL_TEAM_PATH}#team`,
  name: "Royal Phuket City Hotel Team",
  url: `${SITE_CONFIG.url}${HOTEL_TEAM_PATH}`,
} as const;

// These are article-record timestamps, not dates of human review or fact checking.
export function getArticleDates(
  post: { published_at?: string; updated_at?: string },
  now = Date.now(),
) {
  const validDate = (value?: string) => {
    if (!value || !/^\d{4}-\d{2}-\d{2}(?:T|$)/.test(value)) return undefined;
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) && timestamp <= now
      ? new Date(timestamp).toISOString()
      : undefined;
  };
  const published = validDate(post.published_at);
  const updated = validDate(post.updated_at);
  const modified = updated && (!published || updated > published) ? updated : published;
  return { published, modified, showUpdated: Boolean(modified && modified !== published) };
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Bangkok",
  }).format(new Date(value));
}
