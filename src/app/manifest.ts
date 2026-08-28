import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const headerStore = await headers();
  const isMobileApp = headerStore.get("x-mobile-app") === "1";

  return {
    name: "Royal Phuket City Hotel",
    short_name: "RPC Hotel",
    description:
      "Experience luxury and comfort at Royal Phuket City Hotel, a 4-star hotel in the heart of Phuket Old Town. 251 elegant rooms, 5 dining venues, and world-class facilities.",
    start_url: isMobileApp ? "/" : "/",
    display: "standalone",
    background_color: isMobileApp ? "#F7F4EF" : "#FAF8F5",
    theme_color: "#8B7355",
    icons: [
      {
        src: "/images/rpc-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/images/rpc-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/rpc-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["travel", "hotel", "hospitality"],
    lang: "en",
    dir: "ltr",
  };
}
