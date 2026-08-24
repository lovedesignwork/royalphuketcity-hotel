import { RESTAURANT_DETAILS, type RestaurantDetail } from "@/lib/restaurant-data";
import type { Locale } from "./config";

export const diningVenuePage = {
  en: {
    cuisineSuffix: "Cuisine",
    location: "Location",
    hours: "Hours",
    reservations: "Reservations",
    experience: "The Experience",
    highlights: "Highlights",
    gallery: "Gallery",
    reserveTitle: "Make a Reservation",
    reserveDesc:
      "For reservations or special requests, please contact us directly or book your stay to enjoy our exceptional dining experiences.",
    callToReserve: "Call to Reserve",
    visitWebsite: "Visit the Website",
    otherVenues: "Explore Other Venues",
  },
  th: {
    cuisineSuffix: "",
    location: "ชั้น",
    hours: "เวลาเปิด",
    reservations: "จองโต๊ะ",
    experience: "บรรยากาศและการกิน",
    highlights: "จุดเด่น",
    gallery: "ภาพร้าน",
    reserveTitle: "จองโต๊ะ",
    reserveDesc:
      "จองโต๊ะหรือบอกความต้องการพิเศษได้โดยตรงกับร้าน หรือจองห้องพักแล้วมากินในโรงแรม",
    callToReserve: "โทรจองโต๊ะ",
    visitWebsite: "เข้าเว็บไซต์ร้าน",
    otherVenues: "ร้านอาหารอื่นในโรงแรม",
  },
} as const;

type RestaurantText = Pick<
  RestaurantDetail,
  "name" | "cuisine" | "floor" | "hours" | "description" | "highlights"
> & {
  metaDesc: string;
  ogDesc: string;
};

const restaurantsTh: Record<string, RestaurantText> = {
  "yan-long-chinese-restaurant": {
    name: "หยานหลง ภัตตาคารจีน",
    cuisine: "กวางตุ้ง",
    floor: "ชั้นล่าง",
    hours: "11:00 - 22:00 น.",
    metaDesc:
      "อาหารจีนกวางตุ้งที่หยานหลง ติ่มซำ เป็ดปักกิ่ง และห้องส่วนตัวสำหรับโต๊ะครอบครัว ที่โรงแรมรอยัล ภูเก็ต ซิตี้",
    ogDesc: "อาหารกวางตุ้ง ติ่มซำ และเป็ดปักกิ่ง ที่หยานหลง ภัตตาคารจีน",
    description: [
      "หยานหลงทำอาหารจีนกวางตุ้งในภูเก็ต ห้องดูเรียบ อาหารออกแนวคลาสสิก ไม่เล่นธีมเกินจำเป็น",
      "เชฟหลักผ่านงานครัวฮ่องกงและกวางโจว ใช้วัตถุดิบสดและเทคนิคที่ทำกันมานาน ทั้งติ่มซำ เป็ดปักกิ่ง และอาหารจานรวมโต๊ะ",
      "มากินติ่มซำตอนกลางวัน นั่งโต๊ะครอบครัว หรือใช้ห้องส่วนตัวจัดเลี้ยงก็ได้ ห้องเงียบพอสำหรับงานที่อยากคุยกันได้",
    ],
    highlights: [
      "ติ่มซำทุกวัน 11:00-14:00 น.",
      "ซีฟู้ดสดตามฤดูกาล",
      "ห้องอาหารส่วนตัว",
      "หมูแดง เป็ดย่าง และบาร์บีคิวแบบกวางตุ้ง",
      "ชาจีนเกรดดี",
      "มีเมนูเจและมังสวิรัติ",
      "จับคู่ไวน์และเหล้าจีน",
      "เมนูจัดเลี้ยงสำหรับกลุ่ม",
    ],
  },
  "twist-rooftop-restaurant-bar": {
    name: "ทวิสต์ รูฟท็อป บาร์แอนด์เรสเตอรองต์",
    cuisine: "นานาชาติ",
    floor: "ชั้น 19",
    hours: "17:00 - 24:00 น.",
    metaDesc:
      "ทวิสต์ชั้น 19 วิวพระอาทิตย์ตกแบบพาโนรามา ค็อกเทล และอาหารนานาชาติ ที่โรงแรมรอยัล ภูเก็ต ซิตี้",
    ogDesc: "กินดื่มบนดาดฟ้าชั้น 19 วิวเมืองแบบพาโนรามา ค็อกเทลและอาหารนานาชาติ",
    description: [
      "ทวิสต์อยู่ชั้น 19 มองเมืองเก่าภูเก็ต ทะเลอันดามัน และภูเขาได้รอบตัว",
      "เมนูผสมอาหารนานาชาติกับเครื่องเทศไทย มีทั้งสเต็ก ซีฟู้ด และค็อกเทลที่บาร์ผสมเอง",
      "เหมาะกับดื่มตอนพระอาทิตย์ตก กินเย็นสองคน หรือนัดเพื่อนหลังเลิกงาน บรรยากาศเปิดโล่ง วิวเป็นจุดขายหลักของร้าน",
    ],
    highlights: [
      "วิว 360 องศา",
      "ค็อกเทลช่วงพระอาทิตย์ตก",
      "ดนตรีสด พฤหัส-เสาร์",
      "สเต็กและซีฟู้ด",
      "เมนูค็อกเทลของร้าน",
      "ไวน์คัดจากห้องไวน์",
      "ที่นั่งระเบียงกลางแจ้ง",
      "พื้นที่จัดงานส่วนตัว",
    ],
  },
};

export function getDiningVenueCopy(locale: Locale) {
  return diningVenuePage[locale];
}

export function getLocalizedRestaurantDetail(
  slug: string,
  locale: Locale
): RestaurantDetail | undefined {
  const base = RESTAURANT_DETAILS[slug];
  if (!base) return undefined;
  if (locale !== "th") return base;
  const copy = restaurantsTh[slug];
  if (!copy) return base;
  return {
    ...base,
    name: copy.name,
    cuisine: copy.cuisine,
    floor: copy.floor,
    hours: copy.hours,
    description: copy.description,
    highlights: copy.highlights,
  };
}

export function getRestaurantMeta(slug: string, locale: Locale) {
  const restaurant = getLocalizedRestaurantDetail(slug, locale);
  const copy = locale === "th" ? restaurantsTh[slug] : undefined;
  return {
    name: restaurant?.name ?? slug,
    metaDesc:
      copy?.metaDesc ??
      (slug === "yan-long-chinese-restaurant"
        ? "Authentic Cantonese cuisine at Yan Long Chinese Restaurant. Award-winning Peking duck, dim sum, and traditional Chinese dishes at Royal Phuket City Hotel."
        : "TWIST Rooftop Restaurant & Bar on the 19th floor. Panoramic sunset views of Phuket, craft cocktails, and international cuisine at Royal Phuket City Hotel."),
    ogDesc:
      copy?.ogDesc ??
      (slug === "yan-long-chinese-restaurant"
        ? "Authentic Cantonese cuisine with award-winning Peking duck and traditional dim sum."
        : "19th floor rooftop dining with panoramic sunset views, craft cocktails, and international cuisine."),
    image: restaurant?.images[0]?.src ?? "/images/og-image.jpg",
  };
}
