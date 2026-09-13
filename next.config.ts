import type { NextConfig } from "next";
import { SHOW_LANGUAGE_SWITCHER } from "./src/lib/i18n/config";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Keep canonical/social/description tags in the initial head for all readers.
  htmlLimitedBots: /.*/,
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, follow" }];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      { source: "/admin/:path*", headers: noindex },
      { source: "/m/:path*", headers: noindex },
      { source: "/:path*", has: [{ type: "host" as const, value: "m\\.royalphuketcity\\.com" }], headers: noindex },
      ...(!SHOW_LANGUAGE_SWITCHER ? [{ source: "/th/:path*", headers: noindex }] : []),
    ];
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "royalphuketcity.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.royalwellnessspaphuket.com",
      },
      {
        protocol: "https",
        hostname: "royalwellnessspaphuket.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/good-eatz-154",
        destination: "/dining",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
