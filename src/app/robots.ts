import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  // Specific crawler groups do not inherit the wildcard group's exclusions.
  // Search bots and user-directed fetchers share the public-site policy.
  const publicSiteRules = {
    allow: "/",
    // Assets must remain crawlable. Admin/guest pages expose noindex and retain
    // their normal authentication; robots.txt is not access control.
    disallow: ["/api$", "/api/"],
  };

  return {
    rules: [
      {
        userAgent: "*",
        ...publicSiteRules,
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Googlebot",
          "Googlebot-Image",
          "bingbot",
        ],
        ...publicSiteRules,
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
