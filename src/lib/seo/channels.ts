export type TrafficChannel =
  | "Organic search"
  | "Direct"
  | "Social"
  | "Referral"
  | "Hotel / local network";

const SOCIAL = [
  "facebook.com",
  "instagram.com",
  "l.instagram.com",
  "l.facebook.com",
  "m.facebook.com",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "tiktok.com",
  "youtube.com",
  "pinterest.com",
  "threads.net",
];

const SEARCH = [
  "google.",
  "bing.com",
  "yahoo.",
  "duckduckgo.com",
  "yandex.",
  "baidu.",
  "naver.com",
  "ecosia.org",
];

const OWN = [
  "royalphuketcity.com",
  "www.royalphuketcity.com",
  "m.royalphuketcity.com",
];

function hostOf(referrer: string): string {
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return referrer.toLowerCase();
  }
}

export function classifyReferrer(referrer: string | null | undefined): TrafficChannel {
  const raw = (referrer || "").trim();
  if (!raw || raw === "(direct)") return "Direct";

  if (/^https?:\/\/(\d{1,3}\.){3}\d{1,3}/.test(raw)) {
    return "Hotel / local network";
  }

  const host = hostOf(raw);
  if (!host || OWN.some((d) => host === d || host.endsWith(`.${d}`))) {
    return "Direct";
  }
  if (SEARCH.some((d) => host.includes(d))) return "Organic search";
  if (SOCIAL.some((d) => host.includes(d))) return "Social";
  return "Referral";
}
