import { Metadata } from "next";
import RestaurantPageTemplate from "@/components/RestaurantPageTemplate";
import { RESTAURANT_DETAILS } from "@/lib/restaurant-data";

const restaurant = RESTAURANT_DETAILS["good-eatz-154"];

export const metadata: Metadata = {
  title: restaurant.name,
  description: restaurant.description[0],
};

export default function GoodEatzPage() {
  return <RestaurantPageTemplate restaurant={restaurant} />;
}
