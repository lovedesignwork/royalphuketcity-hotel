import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
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
