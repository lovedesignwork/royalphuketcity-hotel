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
        source: "/good-eatz-154",
        destination: "/dining",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
