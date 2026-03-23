import { Metadata } from "next";
import RestaurantPageTemplate from "@/components/RestaurantPageTemplate";
import { RESTAURANT_DETAILS } from "@/lib/restaurant-data";

const restaurant = RESTAURANT_DETAILS["yan-long-chinese-restaurant"];

export const metadata: Metadata = {
  title: restaurant.name,
  description: restaurant.description[0],
};

export default function YanLongPage() {
  return <RestaurantPageTemplate restaurant={restaurant} />;
}
