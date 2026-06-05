import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
  async redirects() {
    return [
      {
        source: "/sales-kit",
        destination: "/download-fact-sheets",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
