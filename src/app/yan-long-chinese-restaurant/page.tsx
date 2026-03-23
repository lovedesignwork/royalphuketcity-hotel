import { Metadata } from "next";
import RestaurantPageTemplate from "@/components/RestaurantPageTemplate";
import { RESTAURANT_DETAILS } from "@/lib/restaurant-data";
import { SITE_CONFIG } from "@/lib/constants";

const restaurant = RESTAURANT_DETAILS["yan-long-chinese-restaurant"];
const slug = "yan-long-chinese-restaurant";

export const metadata: Metadata = {
  title: restaurant.name,
  description:
    "Authentic Cantonese cuisine at Yan Long Chinese Restaurant. Award-winning Peking duck, dim sum, and traditional Chinese dishes at Royal Phuket City Hotel.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/${slug}`,
  },
  openGraph: {
    title: `${restaurant.name} | Royal Phuket City Hotel`,
    description:
      "Authentic Cantonese cuisine with award-winning Peking duck and traditional dim sum.",
    url: `${SITE_CONFIG.url}/${slug}`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: restaurant.images[0].src,
        width: 1200,
        height: 630,
        alt: restaurant.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurant.name} | Royal Phuket City Hotel`,
    description:
      "Authentic Cantonese cuisine with award-winning Peking duck and dim sum.",
    images: [restaurant.images[0].src],
  },
};

export default function YanLongPage() {
  return <RestaurantPageTemplate restaurant={restaurant} />;
}
