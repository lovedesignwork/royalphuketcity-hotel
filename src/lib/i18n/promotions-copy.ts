import { PROMOTIONS } from "@/lib/constants";
import type { Locale } from "./config";

type PromoSlug = (typeof PROMOTIONS)[number]["slug"];

type PromoCopy = {
  title: string;
  subtitle: string;
  tagline: string;
  shortDescription: string;
  highlights: string[];
  terms: string[];
  price: string;
  originalPrice: string;
};

export const promotionsPage = {
  en: {
    metaTitle: "Promotions & Special Offers",
    metaDesc:
      "Discover exclusive promotions and special offers at Royal Phuket City Hotel. Save on room rates, packages, and experiences in Phuket Old Town.",
    heroTitle: "Exceptional Value for Your Stay",
    heroSubtitle: "Exclusive Deals",
    heroDesc:
      "Take advantage of our carefully curated promotions designed to make your Phuket experience even more memorable.",
    valid: "Valid",
    viewDetails: "View Details",
    emptyTitle: "No active promotions at the moment.",
    emptyDesc: "Please check back soon for new special offers.",
    helpTitle: "Need help booking?",
    helpDesc: "Our reservations team is ready to assist you.",
    call: "Call +66 76 233 355",
    ctaTitle: "Can't Find What You're Looking For?",
    ctaDesc: "Contact our team for personalized offers and group bookings.",
    aboutOffer: "About This Offer",
    included: "What's Included",
    terms: "Terms & Conditions",
    expired: "This promotion has expired",
    applyCode: "Apply code",
    bookNow: "Book Now",
    callToBook: "Call to Book",
    moreOffers: "More Special Offers",
    viewAll: "View All Promotions",
    home: "Home",
    promotions: "Promotions",
    notFound: "Promotion Not Found",
  },
  th: {
    metaTitle: "โปรโมชั่นและข้อเสนอพิเศษ",
    metaDesc:
      "โปรโมชั่นห้องพักและแพ็กเกจพิเศษจากโรงแรมรอยัล ภูเก็ต ซิตี้ จองราคาดี พักเมืองเก่าภูเก็ตได้คุ้มกว่า",
    heroTitle: "คุ้มค่าทุกคืนที่พัก",
    heroSubtitle: "ข้อเสนอพิเศษ",
    heroDesc:
      "เลือกโปรโมชั่นที่จัดไว้ให้ตรงกับการเดินทาง ไม่ว่าจะพักสั้น พักครอบครัว หรืออยู่ยาวเพื่อทำงาน",
    valid: "ใช้ได้",
    viewDetails: "ดูรายละเอียด",
    emptyTitle: "ขณะนี้ยังไม่มีโปรโมชั่นที่เปิดจอง",
    emptyDesc: "โปรดกลับมาดูอีกครั้งเร็ว ๆ นี้",
    helpTitle: "ต้องการความช่วยเหลือในการจอง?",
    helpDesc: "ทีมจองห้องพักพร้อมดูแลให้",
    call: "โทร +66 76 233 355",
    ctaTitle: "ยังไม่เจอแพ็กเกจที่ใช่?",
    ctaDesc: "คุยกับทีมงานได้โดยตรง สำหรับเรทส่วนตัวหรืองานกลุ่ม",
    aboutOffer: "เกี่ยวกับข้อเสนอนี้",
    included: "สิ่งที่รวมในแพ็กเกจ",
    terms: "ข้อกำหนดและเงื่อนไข",
    expired: "โปรโมชั่นนี้หมดอายุแล้ว",
    applyCode: "ใช้โค้ด",
    bookNow: "จองเลย",
    callToBook: "โทรจอง",
    moreOffers: "โปรโมชั่นอื่นที่น่าสนใจ",
    viewAll: "ดูโปรโมชั่นทั้งหมด",
    home: "หน้าแรก",
    promotions: "โปรโมชั่น",
    notFound: "ไม่พบโปรโมชั่น",
  },
} as const;

const promotionsTh: Record<PromoSlug, PromoCopy> = {
  "stay-2-pay-1": {
    title: "พัก 2 จ่าย 1",
    subtitle: "พักสองคืน จ่ายเพียงคืนเดียว",
    tagline: "คุ้มที่สุด",
    shortDescription:
      "พักใจกลางเมืองเก่าภูเก็ตในเรทที่คุ้มที่สุด จองล่วงหน้าอย่างน้อย 7 วัน รับคืนที่สองฟรี เหมาะกับทริปสองคืนที่ไม่ต้องจ่ายเกินจำเป็น",
    highlights: [
      "พัก 2 คืน ห้อง Premier Superior",
      "อาหารเช้าทุกวัน สำหรับ 2 ท่าน",
      "เรทพิเศษเริ่ม ฿2,200 สำหรับ 2 คืน (เฉลี่ย ฿1,100/คืน)",
      "จองล่วงหน้าอย่างน้อย 7 วัน",
      "ลด 10% ร้านอาหารและสปาในโรงแรม",
    ],
    terms: [
      "ระยะเวลาจอง: 9 เมษายน – 30 กันยายน 2569",
      "ระยะเวลาเข้าพัก: 1 พฤษภาคม 2569 – 10 มกราคม 2570",
      "จองผ่านเว็บไซต์โรงแรม และใส่โค้ด STAYON",
      "ต้องจองล่วงหน้าอย่างน้อย 7 วัน",
      "ขึ้นอยู่กับห้องว่าง และใช้ร่วมกับโปรอื่นไม่ได้",
    ],
    price: "เริ่ม ฿2,200 / 2 คืน",
    originalPrice: "เฉลี่ย ฿1,100/คืน",
  },
  "family-nest": {
    title: "Family Nest",
    subtitle: "ห้องติดกันสำหรับทั้งครอบครัว",
    tagline: "แพ็กเกจครอบครัว",
    shortDescription:
      "พาทั้งบ้านมาพักเมืองเก่าภูเก็ตแบบมีพื้นที่ส่วนตัว Family Nest จัดห้องติดกันให้แน่นอน พร้อมอาหารเช้าทุกคน ไม่ต้องแย่งห้องหรือเดินข้ามปีก",
    highlights: [
      "รับรองห้องติดกัน 2 ห้อง",
      "อาหารเช้าทุกวัน สูงสุด 4 ท่าน",
      "Premier Superior: เริ่ม ฿3,799 สำหรับ 2 ห้อง",
      "Premier Deluxe: เริ่ม ฿4,999 สำหรับ 2 ห้อง",
      "รองรับ ผู้ใหญ่ 4 + เตียงเสริม 2 + เด็ก 2",
      "ลด 10% ร้านอาหารและสปาในโรงแรม",
    ],
    terms: [
      "ระยะเวลาจอง: 20 มิถุนายน – 15 ตุลาคม 2569",
      "ระยะเวลาเข้าพัก: 20 มิถุนายน – 15 ตุลาคม 2569",
      "ขึ้นอยู่กับห้องว่าง แนะนำจองล่วงหน้า",
      "เตียงเสริมตามคำขอ",
      "ใช้ร่วมกับโปรอื่นไม่ได้",
    ],
    price: "เริ่ม ฿3,799 / 2 ห้อง",
    originalPrice: "",
  },
  "sun-and-fun": {
    title: "Sun & Fun",
    subtitle: "เด็กพักและทานฟรี",
    tagline: "เด็กฟรี",
    shortDescription:
      "ทริปครอบครัวเล็ก ๆ ที่ไม่ต้องคิดเยอะ เด็กพักและทานฟรี ห้องมีเตียงคู่หนึ่งและเตียงเดี่ยวหนึ่ง พร้อมอาหารเช้าทุกวัน",
    highlights: [
      "ใช้ได้ทุกประเภทห้อง (เตียงคู่ 1 + เตียงเดี่ยว 1)",
      "รวมอาหารเช้าทุกวัน",
      "เด็กอายุต่ำกว่า 12 ปี 1 คน พักและทานฟรี",
      "Premier Superior: ฿2,000/คืน",
      "Premier Superior วิวทะเล: ฿2,300/คืน",
      "Premier Deluxe: ฿2,600/คืน | วิวทะเล: ฿2,900/คืน",
      "ลด 10% ร้านอาหารและสปาในโรงแรม",
    ],
    terms: [
      "ระยะเวลาจอง: 20 มิถุนายน – 15 ตุลาคม 2569",
      "ระยะเวลาเข้าพัก: 20 มิถุนายน – 15 ตุลาคม 2569",
      "จองผ่านเว็บไซต์โรงแรม และใส่โค้ด SUNFUN",
      "เด็กอายุต่ำกว่า 12 ปี สูงสุด 1 คนต่อห้อง",
      "ขึ้นอยู่กับห้องว่าง และใช้ร่วมกับโปรอื่นไม่ได้",
    ],
    price: "เริ่ม ฿2,000/คืน",
    originalPrice: "เด็กฟรี",
  },
  "splash-and-stay": {
    title: "Splash & Stay",
    subtitle: "โรงแรม + สวนน้ำอันดามันดา",
    tagline: "รวมบัตรสวนน้ำ",
    shortDescription:
      "พักสองคืนในเมือง แล้วไปเล่นน้ำเต็มวันที่สวนน้ำอันดามันดา แพ็กเกจเดียวจบ ทั้งที่นอนและบัตรเข้าสวนน้ำ",
    highlights: [
      "พัก 2 คืน ตามประเภทห้องที่เลือก",
      "อาหารเช้าทุกวัน สำหรับ 2 ท่าน",
      "บัตรสวนน้ำอันดามันดา 2 ใบ",
      "Premier Superior: ฿5,200 | วิวทะเล: ฿5,700",
      "Premier Deluxe: ฿6,200 | วิวทะเล: ฿6,700",
      "ลด 10% ร้านอาหารและสปาในโรงแรม",
    ],
    terms: [
      "ระยะเวลาจอง: 20 มิถุนายน – 15 ตุลาคม 2569",
      "ระยะเวลาเข้าพัก: 20 มิถุนายน – 15 ตุลาคม 2569",
      "เข้าพักขั้นต่ำ 2 คืน",
      "บัตรสวนน้ำใช้ได้เฉพาะช่วงวันที่เข้าพัก",
      "ขึ้นอยู่กับห้องว่าง และใช้ร่วมกับโปรอื่นไม่ได้",
    ],
    price: "เริ่ม ฿5,200 / 2 คืน",
    originalPrice: "รวมบัตรสวนน้ำ",
  },
  "family-getaway": {
    title: "Happy Family Getaway",
    subtitle: "แพ็กเกจปิดเทอมคุ้มค่า",
    tagline: "โปรเมษา-พฤษภา",
    shortDescription:
      "แพ็กเกจปิดเทอมสำหรับครอบครัวไทย ห้องกว้าง มีกิจกรรมเด็ก และร้านอาหารที่พาลูกมากินได้สบาย",
    highlights: [
      "ห้อง Premier Deluxe กว้างสำหรับครอบครัว",
      "อาหารเช้าทุกวัน ผู้ใหญ่ 2 + เด็ก 2",
      "เด็กอายุต่ำกว่า 12 ปี พักฟรี",
      "ของขวัญต้อนรับสำหรับเด็ก",
      "เช็คเอาต์สายถึง 14:00 น.",
      "ใช้สระว่ายน้ำและฟิตเนสได้",
    ],
    terms: [
      "ใช้ได้สำหรับการเข้าพัก 1 เมษายน – 31 พฤษภาคม 2569",
      "เด็กอายุต่ำกว่า 12 ปี สูงสุด 2 คนต่อห้อง",
      "เด็กนอนรวมเตียงที่มีอยู่",
      "เข้าพักขั้นต่ำ 2 คืน",
      "ขึ้นอยู่กับห้องว่าง",
    ],
    price: "เริ่ม ฿1,800/คืน",
    originalPrice: "",
  },
  "songkran-package": {
    title: "สงกรานต์ที่ RPC",
    subtitle: "ฐานทัพเล่นน้ำเมืองเก่า",
    tagline: "สงกรานต์ 2569",
    shortDescription:
      "มาเล่นสงกรานต์กลางเมืองเก่าภูเก็ต นอนใกล้จุดเล่นน้ำ กลับมาอาบน้ำพักได้ทันที พร้อมชุดรอดสงกรานต์ในห้อง",
    highlights: [
      "ห้องพักสะดวกสำหรับเดินเล่นเมืองเก่า",
      "บุฟเฟต์อาหารเช้าทุกวัน",
      "ชุดรอดสงกรานต์ในห้อง",
      "ซองกันน้ำสำหรับมือถือ",
      "ผ้าเช็ดตัวแห้งเร็ว",
      "แผนที่และทิปจุดเล่นน้ำเมืองเก่า",
    ],
    terms: [
      "ใช้ได้สำหรับการเข้าพัก 12–16 เมษายน 2569",
      "แนะนำเข้าพักอย่างน้อย 2 คืน",
      "ชุดรอดสงกรานต์ 1 ชุดต่อห้อง",
      "ห้องจำกัด ควรจองล่วงหน้า",
      "ช่วงสงกรานต์ไม่สามารถขอคืนเงินได้",
    ],
    price: "เริ่ม ฿2,499/คืน",
    originalPrice: "฿3,200/คืน",
  },
  "april-residence-deal": {
    title: "The April Residence Deal",
    subtitle: "เฉพาะคนไทยและผู้พำนักในไทย",
    tagline: "คนไทยเท่านั้น",
    shortDescription:
      "เรทพิเศษเดือนเมษายนสำหรับคนไทยและผู้ถือใบอนุญาตทำงาน พักเมืองเก่าภูเก็ตในราคาที่จับต้องได้ พร้อมเครดิตอาหารและสิทธิพิเศษตามฤดูกาล",
    highlights: [
      "เรทพิเศษเริ่ม ฿1,699 / คืน",
      "บุฟเฟต์อาหารเช้าบนรูฟท็อป",
      "เครดิตอาหาร ฿300 ต่อวัน ที่ร้านในโรงแรม",
      "เลื่อนเป็นห้องวิวทะเลบางส่วนฟรี (ตามห้องว่าง)",
      "ลด 10% ร้านอาหารและสปาในโรงแรม",
      "ใช้ได้เฉพาะคนไทยและผู้ถือใบอนุญาตทำงาน",
    ],
    terms: [
      "ระยะเวลาจอง: 9 – 30 เมษายน 2569",
      "ระยะเวลาเข้าพัก: 9 – 21 เมษายน และ 27 – 30 เมษายน 2569",
      "จองผ่านเว็บไซต์หรือโทรตรง ใส่โค้ด APR26",
      "แสดงบัตรประชาชนไทยหรือใบอนุญาตทำงานตอนเช็คอิน",
      "จำนวนห้องจำกัด และใช้ร่วมกับโปรอื่นไม่ได้",
    ],
    price: "เริ่ม ฿1,699/คืน",
    originalPrice: "",
  },
  "blissful-3-night": {
    title: "แพ็กเกจ 3 คืน บลิสฟูล",
    subtitle: "พัก 3 คืน ได้สปาและดินเนอร์รูฟท็อป",
    tagline: "รวมสปาและอาหาร",
    shortDescription:
      "แพ็กเกจสามคืนที่รวมทั้งที่พัก สปา และดินเนอร์ไว้ในเรทเดียว ราคา ฿5,397 ไม่ต้องคิดแยกทีละอย่าง",
    highlights: [
      "พัก 3 คืน ห้อง Premier Superior",
      "อาหารเช้าทุกวัน สำหรับ 2 ท่าน",
      "สปา 60 นาที สำหรับ 2 ท่าน",
      "ดินเนอร์ที่ TWIST Rooftop สำหรับ 2 ท่าน",
      "ราคารวมทั้งแพ็กเกจ ฿5,397 สุทธิ",
      "ลด 10% ร้านอาหารและสปาในโรงแรม",
    ],
    terms: [
      "ระยะเวลาจอง: 9 เมษายน – 30 มิถุนายน 2569",
      "ระยะเวลาเข้าพัก: 1 พฤษภาคม – 30 มิถุนายน 2569",
      "จองผ่านเว็บไซต์โรงแรม และใส่โค้ด BLISS3",
      "ต้องจองคิวสปาล่วงหน้า",
      "ขึ้นอยู่กับห้องว่าง และใช้ร่วมกับโปรอื่นไม่ได้",
    ],
    price: "฿5,397 / 3 คืน",
    originalPrice: "ราคาสุทธิแพ็กเกจ",
  },
  "weekly-stay-7": {
    title: "พักรายสัปดาห์ 7 วัน",
    subtitle: "เรทรายสัปดาห์ สำหรับเวิร์คเคชัน",
    tagline: "เรทรายสัปดาห์",
    shortDescription:
      "อยู่ยาวทั้งเที่ยวทั้งทำงานในเรท 7 คืนคงที่ ฿10,493 รวมอาหารเช้า ดินเนอร์สองมื้อ และซักรีด ไม่ต้องย้ายโรงแรมกลางสัปดาห์",
    highlights: [
      "พัก 7 คืน ห้อง Premier Superior",
      "อาหารเช้าทุกวัน สำหรับ 2 ท่าน",
      "ดินเนอร์ที่ TWIST Rooftop 2 มื้อ สำหรับ 2 ท่าน",
      "ซักรีด 4 ชิ้นต่อช่วงเข้าพัก",
      "เรทรายสัปดาห์ ฿10,493 สุทธิ",
      "ลด 10% ร้านอาหารและสปาในโรงแรม",
    ],
    terms: [
      "ระยะเวลาจอง: 9 เมษายน – 30 มิถุนายน 2569",
      "ระยะเวลาเข้าพัก: 1 พฤษภาคม – 30 มิถุนายน 2569",
      "จองผ่านเว็บไซต์โรงแรม และใส่โค้ด LIVEIN",
      "สิทธิซักรีดโอนหรือแลกเงินสดไม่ได้",
      "ขึ้นอยู่กับห้องว่าง และใช้ร่วมกับโปรอื่นไม่ได้",
    ],
    price: "฿10,493 / 7 คืน",
    originalPrice: "ราคาสุทธิรายสัปดาห์",
  },
};

export function getPromotionsPageCopy(locale: Locale) {
  return promotionsPage[locale];
}

export function getLocalizedPromotion<T extends (typeof PROMOTIONS)[number]>(promo: T, locale: Locale) {
  if (locale !== "th") return promo;
  const copy = promotionsTh[promo.slug];
  return {
    ...promo,
    ...copy,
  };
}

export function getLocalizedPromotions(locale: Locale) {
  return PROMOTIONS.map((promo) => getLocalizedPromotion(promo, locale));
}

export function formatPromoPeriod(validFrom: string, validUntil: string, locale: Locale, long = false) {
  const from = new Date(validFrom);
  const until = new Date(validUntil);
  const options: Intl.DateTimeFormatOptions = long
    ? { month: "long", day: "numeric", year: "numeric" }
    : { month: "short", day: "numeric", year: "numeric" };
  const tag = locale === "th" ? "th-TH" : "en-US";
  const sep = locale === "th" ? " - " : " – ";
  return `${from.toLocaleDateString(tag, options)}${sep}${until.toLocaleDateString(tag, options)}`;
}
