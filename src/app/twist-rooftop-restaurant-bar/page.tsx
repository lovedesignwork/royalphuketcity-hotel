import { Metadata } from "next";
import RestaurantPageTemplate from "@/components/RestaurantPageTemplate";
import { RESTAURANT_DETAILS } from "@/lib/restaurant-data";
import { SITE_CONFIG } from "@/lib/constants";

const restaurant = RESTAURANT_DETAILS["twist-rooftop-restaurant-bar"];
const slug = "twist-rooftop-restaurant-bar";

export const metadata: Metadata = {
  title: restaurant.name,
  description:
    "TWIST Rooftop Restaurant & Bar on the 19th floor. Panoramic sunset views of Phuket, craft cocktails, and international cuisine at Royal Phuket City Hotel.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/${slug}`,
  },
  openGraph: {
    title: `${restaurant.name} | Royal Phuket City Hotel`,
    description:
      "19th floor rooftop dining with panoramic sunset views, craft cocktails, and international cuisine.",
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
      "19th floor rooftop dining with panoramic views and craft cocktails.",
    images: [restaurant.images[0].src],
  },
};

export default function TwistRooftopPage() {
  return <RestaurantPageTemplate restaurant={restaurant} />;
}
