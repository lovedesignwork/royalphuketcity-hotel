import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Royal Phuket City Hotel",
    short_name: "RPC Hotel",
    description:
      "Experience luxury and comfort at Royal Phuket City Hotel, a 4-star hotel in the heart of Phuket Old Town. 251 elegant rooms, 5 dining venues, and world-class facilities.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
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
