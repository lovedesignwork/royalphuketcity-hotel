import { RESTAURANTS, ROOMS } from "@/lib/constants";
import type { Locale } from "./config";
import { getLocalizedRestaurantDetail } from "./dining-copy";
import { getDictionary } from "./messages";

export function getLocalizedRooms(locale: Locale) {
  const t = getDictionary(locale);
  return ROOMS.map((room) => {
    const copy = t.rooms[room.slug];
    return {
      ...room,
      shortDescription: copy.short,
      views: copy.views,
      bedType: copy.bed,
      size: locale === "th" ? room.size.replace("sqm", "ตร.ม.") : room.size,
    };
  });
}

export function getLocalizedRestaurants(locale: Locale) {
  const t = getDictionary(locale);
  return RESTAURANTS.map((restaurant) => {
    const copy = t.restaurants[restaurant.slug];
    const detail = getLocalizedRestaurantDetail(restaurant.slug, locale);
    return {
      ...restaurant,
      name: detail?.name ?? restaurant.name,
      cuisine: copy.cuisine,
      floor: copy.floor,
      hours: copy.hours,
      shortDescription: copy.short,
    };
  });
}
