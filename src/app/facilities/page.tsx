import { Metadata } from "next";
import { HeroSection, CTABanner } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";
import FacilityImageCarousel from "@/components/FacilityImageCarousel";
import { getLocale } from "@/lib/i18n/get-locale";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "World-class facilities at Royal Phuket City Hotel: rooftop pool, fitness center, spa, EV charging stations, and complimentary Smart Bus shuttle service.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/facilities`,
  },
  openGraph: {
    title: "Facilities | Royal Phuket City Hotel",
    description:
      "World-class facilities including rooftop pool, fitness center, spa, and complimentary shuttle service.",
    url: `${SITE_CONFIG.url}/facilities`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Facilities at Royal Phuket City Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facilities | Royal Phuket City Hotel",
    description:
      "World-class facilities including rooftop pool, fitness center, spa, and shuttle service.",
    images: ["/images/og-image.jpg"],
  },
};

const facilities = [
  {
    name: "Breakfast on the Rooftop",
    location: "19th Floor - TWIST Rooftop Restaurant",
    description:
      "Start your day with a breathtaking breakfast experience on the 19th floor, the highest rooftop in Phuket Town. Enjoy panoramic views of the city and ocean as you savor a wide selection of Thai, Western, and local breakfast favorites, freshly prepared to delight every palate.",
    hours: "Breakfast Time 6:30 AM - 10:30 AM",
    images: [
      "/images/breakfast/RPC-breakfast-1.jpg",
      "/images/breakfast/RPC-breakfast-2.jpg",
      "/images/breakfast/RPC-breakfast-3.jpg",
      "/images/breakfast/RPC-breakfast-4.jpg",
      "/images/breakfast/RPC-breakfast-5.jpg",
      "/images/breakfast/RPC-breakfast-6.jpg",
      "/images/breakfast/RPC-breakfast-8.jpg",
      "/images/breakfast/RPC-breakfast-12.jpg",
      "/images/breakfast/RPC-breakfast-14.jpg",
      "/images/breakfast/RPC-breakfast-15.jpg",
      "/images/breakfast/RPC-breakfast-16.jpg",
      "/images/breakfast/RPC-breakfast-19.jpg",
      "/images/breakfast/RPC-breakfast-21.jpg",
      "/images/breakfast/RPC-breakfast-24.jpg",
      "/images/breakfast/RPC-breakfast-25.jpg",
      "/images/breakfast/RPC-breakfast-26.jpg",
      "/images/breakfast/RPC-breakfast-28.jpg",
      "/images/breakfast/RPC-breakfast-29.jpg",
      "/images/breakfast/RPC-breakfast-30.jpg",
      "/images/breakfast/RPC-breakfast-31.jpg",
    ],
    features: [
      "Highest rooftop in Phuket Town",
      "Panoramic city & ocean views",
      "Thai & Western selection",
      "Freshly prepared daily",
    ],
  },
  {
    name: "Lobby and Lounge",
    location: "G Floor - Atrium Lounge",
    description:
      "Welcome to The Atrium, our elegant hotel lobby at Royal Phuket City Hotel. With its spacious, relaxed atmosphere, live piano music, and a talented singer setting the tone, it's the perfect spot to enjoy a drink from the bar, catch up with friends, or simply unwind in style.",
    hours: "Lobby Open 24 Hours | Lounge Open 3 PM - 12 AM",
    images: [
      "/images/HOTEL WEBSITE/RPC Lobby 1.jpg",
      "/images/HOTEL WEBSITE/RPC Lobby 2.jpg",
      "/images/HOTEL WEBSITE/RPC Lobby 3.jpg",
      "/images/HOTEL WEBSITE/RPC Lobby 4.jpg",
      "/images/HOTEL WEBSITE/RPC Lobby 5.jpg",
      "/images/HOTEL WEBSITE/RPC Lobby 6.jpg",
    ],
    features: [
      "Live piano music",
      "Full bar service",
      "Spacious atmosphere",
      "24-hour lobby access",
    ],
  },
  {
    name: "Fitness Centre",
    location: "3rd Floor - Workout Club",
    description:
      "Stay active during your stay with complimentary access to our well-maintained Fitness Centre, exclusively for hotel guests. Located on the 3rd floor, it features a full range of modern equipment. Our fitness centre is managed by Workout Club – Phuket's Leading Fitness Centre.",
    hours: "Open 7 AM - 9 PM | Free Use for Hotel Guests",
    images: [
      "/images/HOTEL WEBSITE/Club Asia 001.jpg",
      "/images/HOTEL WEBSITE/Club Asia 002.jpg",
      "/images/HOTEL WEBSITE/Club Asia 003.jpg",
      "/images/HOTEL WEBSITE/Club Asia 004.jpg",
      "/images/HOTEL WEBSITE/Club Asia 005.jpg",
      "/images/HOTEL WEBSITE/Club Asia 006.jpg",
      "/images/HOTEL WEBSITE/Club Asia 007.jpg",
      "/images/HOTEL WEBSITE/Club Asia 008.jpg",
      "/images/HOTEL WEBSITE/Club Asia 009.jpg",
      "/images/HOTEL WEBSITE/Club Asia 010.jpg",
    ],
    features: [
      "Modern equipment",
      "Complimentary for guests",
      "Managed by Workout Club",
    ],
  },
  {
    name: "Swimming Pool",
    location: "3rd Floor",
    description:
      "Our spacious outdoor swimming pool on the 3rd floor offers a refreshing escape with separate areas for adults and children. Surrounded by a relaxing atmosphere, it's the perfect spot to unwind, take a dip, and enjoy the Phuket sunshine.",
    hours: "Open 7 AM - 9 PM",
    images: [
      "/images/HOTEL WEBSITE/RPC Pool 01.jpeg",
      "/images/HOTEL WEBSITE/RPC Pool 02.jpeg",
      "/images/HOTEL WEBSITE/RPC Pool 03.jpeg",
      "/images/HOTEL WEBSITE/RPC Pool 04.jpeg",
      "/images/HOTEL WEBSITE/RPC Pool 05.jpeg",
      "/images/HOTEL WEBSITE/Swimming-Pool-Royal-Phuket-City-2.jpg",
    ],
    features: [
      "Adult & children areas",
      "Relaxing atmosphere",
      "Sun loungers available",
      "Poolside refreshments",
    ],
  },
  {
    name: "Massage & Spa",
    location: "3rd Floor - Royal Wellness Spa",
    description:
      "Indulge in a tranquil spa experience designed to restore balance to both body and mind. With expert massage techniques and premium aromatic oils, our spa offers a serene escape that leaves you feeling refreshed, relaxed, and completely renewed.",
    hours: "Open 10 AM - 11 PM",
    images: [
      "/images/spa/Royal Wellness Spa 01.jpg",
      "/images/spa/Royal Wellness Spa 02.jpg",
      "/images/spa/Royal Wellness Spa 03.jpg",
      "/images/spa/Royal Wellness Spa 04.jpg",
      "/images/spa/Royal Wellness Spa 05.jpg",
      "/images/spa/Royal Wellness Spa 06.jpg",
      "/images/spa/Royal Wellness Spa 07.jpg",
    ],
    features: [
      "Expert massage techniques",
      "Premium aromatic oils",
      "Tranquil atmosphere",
      "Body & mind restoration",
    ],
  },
  {
    name: "Indoor & Outdoor Parking",
    location: "EV Car Charging Station Available",
    description:
      "Enjoy hassle-free parking at Royal Phuket City Hotel with both indoor and outdoor spaces available, accommodating up to 350 cars. We also provide EV charging stations, ensuring convenience and comfort from the moment you arrive.",
    hours: "350 Car Parking Spaces Combined",
    images: [
      "/images/HOTEL WEBSITE/RPC-CAR-PARK-1.jpg",
      "/images/HOTEL WEBSITE/RPC-CAR-PARK-2.jpg",
      "/images/HOTEL WEBSITE/RPC-CAR-PARK-4.jpg",
      "/images/HOTEL WEBSITE/RPC-CAR-PARK-5.jpg",
    ],
    features: [
      "350 parking spaces",
      "Indoor & outdoor options",
      "EV charging stations",
      "24-hour security",
    ],
  },
  {
    name: "Transportation",
    location: "EV Smart Shuttle Bus & Hotel Private Transfer",
    description:
      "Getting around Phuket is easy with our free EV Phuket Shuttle Bus, which conveniently stops right at our hotel. For a more personalized experience, we also offer private island transfers with our comfortable mini bus service—perfect for exploring at your own pace.",
    hours: "Everyday 10 AM - 9 PM (every 15 minutes)",
    images: [
      "/images/HOTEL WEBSITE/EV-Bus_resize-1.jpeg",
      "/images/HOTEL WEBSITE/Hotel-Transportation-Van-Front_resize.jpg",
      "/images/HOTEL WEBSITE/Hotel_Transportation-Van-Side_resize.jpg",
    ],
    features: [
      "Free EV shuttle bus",
      "Stops at hotel",
      "Private transfers available",
      "Regular 15-min schedule",
    ],
  },
];

const facilitiesTh: Record<string, { name: string; location: string; description: string; hours: string; features: string[] }> = {
  "Breakfast on the Rooftop": {
    name: "อาหารเช้าบนดาดฟ้า",
    location: "ชั้น 19 - ทวิสต์ รูฟท็อป",
    description: "เริ่มวันบนชั้น 19 จุดสูงสุดของภูเก็ตทาวน์ กินอาหารเช้าแบบไทยและสากล มองเมืองและทะเลไปด้วยขณะที่ครัวทำของสดทุกเช้า",
    hours: "อาหารเช้า 6:30 - 10:30 น.",
    features: ["ดาดฟ้าสูงสุดในภูเก็ตทาวน์", "วิวเมืองและทะเล", "เลือกได้ทั้งของไทยและของสากล", "ทำสดทุกวัน"],
  },
  "Lobby and Lounge": {
    name: "ล็อบบี้และเลานจ์",
    location: "ชั้นล่าง - เอเทรียม เลานจ์",
    description: "เอเทรียมเป็นล็อบบี้กว้าง บรรยากาศนั่งสบาย มีเปียโนสดและนักร้องในบางช่วง ใช้ดื่มที่บาร์ นั่งคุย หรือพักก่อนออกเมืองได้",
    hours: "ล็อบบี้เปิด 24 ชั่วโมง | เลานจ์ 15:00 - 24:00 น.",
    features: ["ดนตรีเปียโนสด", "บริการบาร์", "พื้นที่นั่งกว้าง", "ล็อบบี้ใช้ได้ตลอด 24 ชั่วโมง"],
  },
  "Fitness Centre": {
    name: "ฟิตเนส",
    location: "ชั้น 3 - Workout Club",
    description: "ฟิตเนสชั้น 3 ใช้ฟรีสำหรับผู้เข้าพัก เครื่องออกกำลังครบ ดูแลโดย Workout Club ซึ่งเป็นฟิตเนสชั้นนำของภูเก็ต",
    hours: "เปิด 7:00 - 21:00 น. | ผู้เข้าพักใช้ฟรี",
    features: ["เครื่องออกกำลังทันสมัย", "ผู้เข้าพักใช้ฟรี", "ดูแลโดย Workout Club"],
  },
  "Swimming Pool": {
    name: "สระว่ายน้ำ",
    location: "ชั้น 3",
    description: "สระกลางแจ้งชั้น 3 มีโซนผู้ใหญ่และเด็กแยกกัน บรรยากาศโล่ง ใช้แช่ พัก และอาบแดดได้ทั้งวัน",
    hours: "เปิด 7:00 - 21:00 น.",
    features: ["โซนผู้ใหญ่และเด็ก", "บรรยากาศเงียบ นั่งพักได้", "มีเตียงอาบแดด", "เครื่องดื่มริมสระ"],
  },
  "Massage & Spa": {
    name: "นวดและสปา",
    location: "ชั้น 3 - รอยัล เวลเนส สปา",
    description: "สปาในโรงแรมสำหรับคลายเมื่อยหลังเดินทาง นวดโดยเทคนิคมาตรฐานโรงแรม ใช้น้ำมันหอม บรรยากาศเงียบ",
    hours: "เปิด 10:00 - 23:00 น.",
    features: ["นวดโดยนักบำบัดในโรงแรม", "น้ำมันหอมเกรดสปา", "ห้องเงียบ เป็นสัดส่วน", "เน้นผ่อนคลายทั้งตัว"],
  },
  "Indoor & Outdoor Parking": {
    name: "ที่จอดรถในร่มและกลางแจ้ง",
    location: "มีจุดชาร์จรถไฟฟ้า",
    description: "จอดได้ทั้งในร่มและกลางแจ้ง รวมประมาณ 350 คัน มีจุดชาร์จรถไฟฟ้า เข้าโรงแรมแล้วจอดได้เลยไม่ต้องหาที่ข้างนอก",
    hours: "ที่จอดรวม 350 คัน",
    features: ["ที่จอด 350 คัน", "มีทั้งในร่มและกลางแจ้ง", "จุดชาร์จรถไฟฟ้า", "รปภ. ตลอด 24 ชั่วโมง"],
  },
  "Transportation": {
    name: "รถรับส่ง",
    location: "รถไฟฟ้าสมาร์ทบัส และรถรับส่งส่วนตัว",
    description: "มีรถ Shuttle ไฟฟ้าจอดที่โรงแรม ใช้ฟรี และมีรถตู้รับส่งส่วนตัวถ้าอยากจัดตารางเอง",
    hours: "ทุกวัน 10:00 - 21:00 น. ทุก 15 นาที",
    features: ["รถ Shuttle ไฟฟ้าฟรี", "จอดที่โรงแรม", "มีรถรับส่งส่วนตัว", "รอบรถทุก 15 นาที"],
  },
};

export default async function FacilitiesPage() {
  const locale = await getLocale();
  const localizedFacilities = facilities.map((facility) => {
    const th = facilitiesTh[facility.name];
    if (locale !== "th" || !th) return facility;
    return { ...facility, ...th };
  });
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={locale === "th" ? "ครบในโรงแรม ที่เดียวจบ" : "Everything You Need, All in One Place"}
        subtitle={locale === "th" ? "สิ่งอำนวยความสะดวก" : "Facilities That Elevate Every Moment"}
        description={locale === "th" ? "ใช้สระ ฟิตเนส สปา รถรับส่ง และอาหารเช้าได้ในโรงแรม โดยไม่ต้องออกไปหาที่อื่น" : "Enjoy complete in-house facilities designed to meet all your needs."}
        image="/images/HOTEL WEBSITE/RPC Wide.jpg"
        height="medium"
      />

      {/* Facilities List */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="space-y-16 md:space-y-24">
            {localizedFacilities.map((facility, index) => (
              <div
                key={facility.name}
                className="border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  {/* Image Carousel */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <FacilityImageCarousel
                      images={facility.images}
                      alt={facility.name}
                    />
                  </div>

                  {/* Content */}
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    {/* Location label */}
                    <p className="text-[13px] tracking-[0.2em] uppercase text-[--color-accent] mb-2">
                      {facility.location}
                    </p>

                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl mb-3 text-[--color-text-primary]">
                      {facility.name}
                    </h2>

                    {/* Hours with gold accent */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-[2px] bg-[#8B7355]" />
                      <span className="text-xs text-[--color-text-secondary] uppercase tracking-wider">
                        {facility.hours}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[--color-text-secondary] leading-relaxed mb-6">
                      {facility.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {facility.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-[#8B7355] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-[--color-text-secondary]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title={locale === "th" ? "ใช้สิ่งอำนวยความสะดวกของโรงแรมให้คุ้มวันที่พัก" : "Experience Our World-Class Facilities"}
        subtitle={locale === "th" ? "จองห้องพัก" : "Book Your Stay"}
        image="/images/HOTEL WEBSITE/RPC-Mainss.png"
      />
    </>
  );
}
