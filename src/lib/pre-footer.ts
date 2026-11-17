import type { Locale } from "@/lib/i18n/config";

type LocalizedText = Record<Locale, string>;

export interface PreFooterGroup {
  id: string;
  title: LocalizedText;
  links: { label: LocalizedText; href: string }[];
}

export const PRE_FOOTER_COPY = {
  title: { en: "Explore Phuket. Plan your stay.", th: "สำรวจภูเก็ต วางแผนการเข้าพัก" },
  description: {
    en: "Find your room, discover the neighbourhood, or plan a celebration with our hotel pages and local guides.",
    th: "ค้นหาห้องพัก สำรวจย่านเมืองเก่า หรือวางแผนงานสำคัญผ่านข้อมูลโรงแรมและคู่มือท่องเที่ยวของเรา",
  },
  blog: { en: "Browse all articles", th: "อ่านบทความทั้งหมด" },
} satisfies Record<string, LocalizedText>;

// Curated site-wide directory: add, edit, reorder or remove links here.
// Use a descriptive label and an existing related page or published article.
// Article URLs use their canonical root path (see getBlogPath in blog-path.ts).
// Keep this curated rather than querying the CMS on every footer render.
export const PRE_FOOTER_GROUPS: PreFooterGroup[] = [
  {
    id: "stay",
    title: { en: "Stay in Phuket", th: "ที่พักในภูเก็ต" },
    links: [
      { label: { en: "Phuket Old Town hotel", th: "โรงแรมใกล้เมืองเก่าภูเก็ต" }, href: "/phuket-old-town-hotel" },
      { label: { en: "Choosing your Phuket Town hotel", th: "เลือกโรงแรมในเมืองภูเก็ต" }, href: "/best-hotel-phuket-town" },
      { label: { en: "Rooms & suites", th: "ห้องพักและห้องสวีท" }, href: "/rooms-suites" },
      { label: { en: "4-star hotel in Phuket", th: "โรงแรม 4 ดาวในภูเก็ต" }, href: "/4-star-hotel-phuket" },
      { label: { en: "Family stays in Phuket", th: "ที่พักสำหรับครอบครัวในภูเก็ต" }, href: "/family-hotel-phuket" },
      { label: { en: "Hotel with a pool", th: "โรงแรมพร้อมสระว่ายน้ำ" }, href: "/hotel-with-pool-phuket-town" },
      { label: { en: "Business hotel in Phuket", th: "โรงแรมสำหรับการเดินทางธุรกิจ" }, href: "/business-hotel-phuket" },
      { label: { en: "Phuket Town or Patong?", th: "พักในเมืองภูเก็ตหรือป่าตองดี?" }, href: "/phuket-town-or-patong" },
      { label: { en: "Hotel offers & packages", th: "ข้อเสนอและแพ็กเกจโรงแรม" }, href: "/promotions" },
    ],
  },
  {
    id: "explore",
    title: { en: "Explore Old Town", th: "สำรวจเมืองเก่า" },
    links: [
      { label: { en: "Things to do in Old Town", th: "กิจกรรมน่าทำในเมืองเก่า" }, href: "/things-to-do-phuket-old-town" },
      { label: { en: "Two-day Phuket itinerary", th: "แผนเที่ยวภูเก็ตสองวัน" }, href: "/phuket-old-town-two-day-itinerary" },
      { label: { en: "Sunday Walking Street", th: "ถนนคนเดินวันอาทิตย์" }, href: "/phuket-sunday-walking-street" },
      { label: { en: "Phuket night markets", th: "ตลาดกลางคืนภูเก็ต" }, href: "/phuket-night-market-guide" },
      { label: { en: "Sino-Portuguese architecture", th: "สถาปัตยกรรมชิโนโปรตุกีส" }, href: "/sino-portuguese-architecture-phuket" },
      { label: { en: "Cafés in Phuket Town", th: "คาเฟ่ในเมืองภูเก็ต" }, href: "/best-cafes-phuket-town" },
      { label: { en: "Rainy-day ideas in Phuket", th: "เที่ยวภูเก็ตในวันฝนตก" }, href: "/rainy-day-phuket-town" },
      { label: { en: "Culture & historic sights", th: "วัฒนธรรมและสถานที่ประวัติศาสตร์" }, href: "/sustainability/cultural-historical" },
    ],
  },
  {
    id: "dining",
    title: { en: "Food & dining", th: "อาหารและห้องอาหาร" },
    links: [
      { label: { en: "Hotel restaurants", th: "ห้องอาหารของโรงแรม" }, href: "/dining" },
      { label: { en: "TWIST rooftop restaurant", th: "ห้องอาหารรูฟท็อป TWIST" }, href: "/twist-rooftop-restaurant-bar" },
      { label: { en: "Yan Long Chinese restaurant", th: "ห้องอาหารจีนหยานหลง" }, href: "/yan-long-chinese-restaurant" },
      { label: { en: "Dim sum in Phuket Town", th: "ติ่มซำในเมืองภูเก็ต" }, href: "/dim-sum-phuket-town-guide" },
      { label: { en: "Planning a rooftop dinner", th: "วางแผนมื้อค่ำบนรูฟท็อป" }, href: "/rooftop-dinner-phuket-town" },
      { label: { en: "Local street food", th: "อาหารริมทางในภูเก็ต" }, href: "/best-street-food-near-royal-phuket-city" },
      { label: { en: "Vegetarian dining guide", th: "คู่มืออาหารมังสวิรัติ" }, href: "/vegetarian-dining-phuket-town" },
      { label: { en: "Breakfast in Phuket Town", th: "อาหารเช้าในเมืองภูเก็ต" }, href: "/breakfast-phuket-town-before-booking" },
    ],
  },
  {
    id: "weddings",
    title: { en: "Weddings", th: "งานแต่งงาน" },
    links: [
      { label: { en: "Phuket wedding venues", th: "สถานที่จัดงานแต่งงานภูเก็ต" }, href: "/wedding-venues" },
      { label: { en: "Thai wedding ceremonies", th: "พิธีแต่งงานแบบไทย" }, href: "/wedding-venues/thai-wedding" },
      { label: { en: "Chinese wedding ceremonies", th: "พิธีแต่งงานแบบจีน" }, href: "/wedding-venues/chinese-wedding" },
      { label: { en: "Small weddings in Phuket", th: "งานแต่งงานขนาดเล็กในภูเก็ต" }, href: "/small-wedding-phuket-town" },
      { label: { en: "Compare wedding packages", th: "เปรียบเทียบแพ็กเกจแต่งงาน" }, href: "/compare-phuket-wedding-packages" },
      { label: { en: "Wedding reception timeline", th: "ลำดับงานเลี้ยงฉลองแต่งงาน" }, href: "/phuket-wedding-reception-timeline" },
      { label: { en: "Wedding venue checklist", th: "เช็กลิสต์สถานที่จัดงานแต่งงาน" }, href: "/phuket-wedding-reception-checklist" },
      { label: { en: "Wedding menus & dietary needs", th: "เมนูงานแต่งงานและข้อจำกัดด้านอาหาร" }, href: "/phuket-wedding-menu-dietary-questions" },
    ],
  },
  {
    id: "meetings",
    title: { en: "Meetings & events", th: "การประชุมและอีเวนต์" },
    links: [
      { label: { en: "Phuket meeting & event venues", th: "สถานที่ประชุมและจัดงานภูเก็ต" }, href: "/meeting-events" },
      { label: { en: "Corporate conferences", th: "การประชุมองค์กร" }, href: "/meeting-events/corporate-conference" },
      { label: { en: "Seminars & workshops", th: "สัมมนาและเวิร์กช็อป" }, href: "/meeting-events/seminar-workshop" },
      { label: { en: "Gala dinners & awards", th: "งานกาลาดินเนอร์และมอบรางวัล" }, href: "/meeting-events/gala-dinner-award" },
      { label: { en: "Meeting room checklist", th: "เช็กลิสต์เลือกห้องประชุม" }, href: "/meeting-rooms-phuket-checklist" },
      { label: { en: "Meeting room seating layouts", th: "รูปแบบการจัดที่นั่งห้องประชุม" }, href: "/meeting-room-seating-layouts" },
      { label: { en: "Hybrid meeting AV checklist", th: "เช็กลิสต์ระบบภาพและเสียงประชุมไฮบริด" }, href: "/hybrid-meeting-phuket-av-checklist" },
      { label: { en: "Product launch planning", th: "วางแผนงานเปิดตัวสินค้า" }, href: "/product-launch-checklist-phuket" },
    ],
  },
  {
    id: "planning",
    title: { en: "Before you arrive", th: "ก่อนการเดินทาง" },
    links: [
      { label: { en: "Hotel location & directions", th: "ที่ตั้งโรงแรมและเส้นทาง" }, href: "/contact" },
      { label: { en: "Phuket airport to town", th: "จากสนามบินสู่เมืองภูเก็ต" }, href: "/phuket-airport-to-phuket-town" },
      { label: { en: "Getting around without a car", th: "เที่ยวภูเก็ตโดยไม่เช่ารถ" }, href: "/getting-around-phuket-town-without-car" },
      { label: { en: "Arrival & departure planning", th: "วางแผนวันเดินทางเข้าและกลับ" }, href: "/phuket-hotel-arrival-departure" },
      { label: { en: "Pool, fitness & spa facilities", th: "สระว่ายน้ำ ฟิตเนส และสปา" }, href: "/facilities" },
      { label: { en: "Sustainable stays at Royal Green", th: "การเข้าพักอย่างยั่งยืนกับ Royal Green" }, href: "/royal-green" },
      { label: { en: "Hotel & event fact sheets", th: "เอกสารข้อมูลโรงแรมและสถานที่จัดงาน" }, href: "/download-fact-sheets" },
      { label: { en: "Accessible stays", th: "ข้อมูลการเข้าถึงสำหรับทุกคน" }, href: "/accessibility" },
    ],
  },
];
