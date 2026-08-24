import type { MetadataRoute } from "next";
import { SITE_CONFIG, ROOMS, RESTAURANTS, PROMOTIONS } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },

    // Core booking pages - high priority
    { url: `${baseUrl}/rooms-suites`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/promotions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/dining`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/facilities`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/wedding-venues`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/meeting-events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // Contact
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/download-fact-sheets`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // About section
    { url: `${baseUrl}/artist`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/artist-story`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/royal-green`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/our-clients`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/sustainability`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // Sustainability sub-pages
    { url: `${baseUrl}/sustainability/activities`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/sustainability/cultural-historical`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/sustainability/michelin-restaurants`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/sustainability/natural-attractions`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/sustainability/transportation`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },

    // Blog
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // Policy pages - low priority
    { url: `${baseUrl}/hotel-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic room pages
  const roomPages: MetadataRoute.Sitemap = ROOMS.map((room) => ({
    url: `${baseUrl}/rooms-suites/${room.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic restaurant pages
  const restaurantPages: MetadataRoute.Sitemap = RESTAURANTS.map((restaurant) => ({
    url: `${baseUrl}/${restaurant.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic promotion pages
  const promotionPages: MetadataRoute.Sitemap = PROMOTIONS.map((promo) => ({
    url: `${baseUrl}/promotions/${promo.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Wedding venue type pages
  const weddingTypes = [
    "engagement-ceremony",
    "thai-wedding",
    "chinese-wedding",
    "muslim-wedding",
    "western-wedding",
    "lgbtq-wedding",
  ];
  const weddingPages: MetadataRoute.Sitemap = weddingTypes.map((type) => ({
    url: `${baseUrl}/wedding-venues/${type}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Meeting & event type pages
  const eventTypes = [
    "corporate-conference",
    "seminar-workshop",
    "product-launch",
    "gala-dinner-award",
    "exhibition-trade-show",
    "concert-live-performance",
    "stand-up-comedy",
    "talk-show-panel",
    "graduation-ceremony",
  ];
  const eventPages: MetadataRoute.Sitemap = eventTypes.map((type) => ({
    url: `${baseUrl}/meeting-events/${type}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const englishPages = [
    ...staticPages,
    ...roomPages,
    ...restaurantPages,
    ...promotionPages,
    ...weddingPages,
    ...eventPages,
  ];

  const thaiPages: MetadataRoute.Sitemap = englishPages.map((page) => {
    const path = page.url.replace(baseUrl, "") || "/";
    return {
      ...page,
      url: path === "/" ? `${baseUrl}/th` : `${baseUrl}/th${path}`,
    };
  });

  return [...englishPages, ...thaiPages];
}
