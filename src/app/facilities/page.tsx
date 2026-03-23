import { Metadata } from "next";
import { HeroSection, CTABanner } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";
import FacilityImageCarousel from "@/components/FacilityImageCarousel";

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
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
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
      "Stay active during your stay with complimentary access to our well-maintained Fitness Centre, exclusively for hotel guests. Located on the 3rd floor, it features a full range of modern equipment along with steam baths and sauna rooms. Our fitness centre is managed by Workout Club – Phuket's Leading Fitness Centre.",
    hours: "Open 7 AM - 9 PM | Free Use for Hotel Guests",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Modern equipment",
      "Steam bath & sauna",
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
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=2070&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Expert massage techniques",
      "Premium aromatic oils",
      "Tranquil atmosphere",
      "Body & mind restoration",
    ],
  },
  {
    name: "Bakery Shop",
    location: "G Floor - 154 Bakery",
    description:
      "Visit our in-house bakery, where our cake and pastry specialists craft delicious treats with exceptional quality and care. Beyond freshly baked goods, the shop also offers an inviting all-day dining menu perfect for any time of day.",
    hours: "Open 6:30 AM - 10 PM",
    images: [
      "https://images.unsplash.com/photo-1517433670267-30f41c09d8b4?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop",
    ],
    features: [
      "Fresh pastries daily",
      "All-day dining menu",
      "Quality ingredients",
      "Take-away available",
    ],
  },
  {
    name: "Indoor & Outdoor Parking",
    location: "EV Car Charging Station Available",
    description:
      "Enjoy hassle-free parking at Royal Phuket City Hotel with both indoor and outdoor spaces available, accommodating up to 350 cars. We also provide EV charging stations, ensuring convenience and comfort from the moment you arrive.",
    hours: "350 Car Parking Spaces Combined",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop",
    ],
    features: [
      "Free EV shuttle bus",
      "Stops at hotel",
      "Private transfers available",
      "Regular 15-min schedule",
    ],
  },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Everything You Need, All in One Place"
        subtitle="Facilities That Elevate Every Moment"
        description="Enjoy complete in-house facilities designed to meet all your needs."
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
        height="medium"
      />

      {/* Facilities List */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="space-y-16 md:space-y-24">
            {facilities.map((facility, index) => (
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
                    <div className="grid grid-cols-2 gap-3">
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
        title="Experience Our World-Class Facilities"
        subtitle="Book Your Stay"
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
      />
    </>
  );
}
