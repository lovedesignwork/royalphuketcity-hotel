import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

type SitemapEntry = {
  route: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const pages: SitemapEntry[] = [
    // Homepage - highest priority
    { route: "", changeFrequency: "daily", priority: 1.0 },

    // Core pages - high priority
    { route: "/rooms-suites", changeFrequency: "weekly", priority: 0.9 },
    { route: "/dining", changeFrequency: "weekly", priority: 0.8 },
    { route: "/facilities", changeFrequency: "weekly", priority: 0.8 },
    { route: "/wedding-venues", changeFrequency: "weekly", priority: 0.8 },
    { route: "/meeting-events", changeFrequency: "weekly", priority: 0.8 },

    // Room pages - canonical URLs via the dynamic /rooms-suites/[slug] route
    { route: "/rooms-suites/premier-superior", changeFrequency: "weekly", priority: 0.7 },
    { route: "/rooms-suites/premier-superior-partial-sea-view", changeFrequency: "weekly", priority: 0.7 },
    { route: "/rooms-suites/premier-deluxe", changeFrequency: "weekly", priority: 0.7 },
    { route: "/rooms-suites/premier-deluxe-partial-sea-view", changeFrequency: "weekly", priority: 0.7 },
    { route: "/rooms-suites/suite-room", changeFrequency: "weekly", priority: 0.7 },
    { route: "/rooms-suites/executive-suite", changeFrequency: "weekly", priority: 0.7 },

    // Restaurant pages
    { route: "/yan-long-chinese-restaurant", changeFrequency: "weekly", priority: 0.7 },
    { route: "/twist-rooftop-restaurant-bar", changeFrequency: "weekly", priority: 0.7 },
    { route: "/good-eatz-154", changeFrequency: "weekly", priority: 0.7 },

    // About section
    { route: "/about", changeFrequency: "monthly", priority: 0.6 },
    { route: "/royal-green", changeFrequency: "monthly", priority: 0.5 },
    { route: "/our-clients", changeFrequency: "monthly", priority: 0.5 },
    { route: "/artist-story", changeFrequency: "monthly", priority: 0.5 },
    { route: "/sustainability", changeFrequency: "monthly", priority: 0.5 },

    // Contact
    { route: "/contact", changeFrequency: "monthly", priority: 0.6 },

    // Policy pages - low priority, excluded from main navigation
    { route: "/hotel-policy", changeFrequency: "yearly", priority: 0.3 },
    { route: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { route: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
