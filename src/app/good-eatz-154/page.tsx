import { Metadata } from "next";
import RestaurantPageTemplate from "@/components/RestaurantPageTemplate";
import { RESTAURANT_DETAILS } from "@/lib/restaurant-data";
import { SITE_CONFIG } from "@/lib/constants";

const restaurant = RESTAURANT_DETAILS["good-eatz-154"];
const slug = "good-eatz-154";

export const metadata: Metadata = {
  title: restaurant.name,
  description:
    "Good Eatz 154 all-day dining at Royal Phuket City Hotel. Thai favorites, international breakfast buffet, and fresh local cuisine from 6 AM to 10 PM.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/${slug}`,
  },
  openGraph: {
    title: `${restaurant.name} | Royal Phuket City Hotel`,
    description:
      "All-day dining with Thai favorites, international breakfast buffet, and fresh local cuisine.",
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
      "All-day dining with Thai favorites and international breakfast buffet.",
    images: [restaurant.images[0].src],
  },
};

export default function GoodEatzPage() {
  return <RestaurantPageTemplate restaurant={restaurant} />;
}
