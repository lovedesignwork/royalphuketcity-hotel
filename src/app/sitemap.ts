import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = [
    "",
    "/rooms-suites",
    "/room/premier-superior",
    "/room/premier-superior-sea-view",
    "/room/premier-deluxe",
    "/room/premier-deluxe-sea-view",
    "/room/suite",
    "/room/executive-suite",
    "/dining",
    "/yan-long-chinese-restaurant",
    "/twist-rooftop-restaurant-bar",
    "/good-eatz-154",
    "/facilities",
    "/wedding-venues",
    "/meeting-events",
    "/about",
    "/royal-green",
    "/our-clients",
    "/artist-story",
    "/contact",
    "/sustainability",
    "/hotel-policy",
    "/privacy-policy",
    "/cookie-policy",
  ];

  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.includes("/room/") ? 0.9 : 0.8,
  }));
}
