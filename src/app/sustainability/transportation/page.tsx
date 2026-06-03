import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Public Transportation in Phuket | Royal Phuket City Hotel",
  description:
    "Guide to public transportation in Phuket including the free EV Smart Bus shuttle and local transport options near Royal Phuket City Hotel.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sustainability/transportation`,
  },
};

const transportOptions = [
  {
    name: "Phuket Smart Bus (Free EV Shuttle)",
    type: "Complimentary",
    description:
      "The eco-friendly Phuket Smart Bus operates on a fixed route connecting popular destinations across the island. This free electric shuttle stops directly at Royal Phuket City Hotel, making sustainable travel around Phuket effortless. The service runs every 15 minutes during operating hours.",
    details: [
      "Free of charge",
      "100% electric vehicles",
      "Stops at Royal Phuket City Hotel",
      "Route covers Phuket Town to beach areas",
      "Every 15 minutes, 10 AM - 9 PM daily",
    ],
    image: "/images/HOTEL WEBSITE/EV-Bus_resize-1.jpeg",
  },
  {
    name: "Hotel Private Transfer",
    type: "Premium Service",
    description:
      "For personalized transportation, our hotel offers comfortable private transfer services. Whether you need airport pickup, island tours, or point-to-point transfers, our modern mini bus fleet provides a convenient and comfortable solution.",
    details: [
      "Airport transfers available",
      "Island tours and day trips",
      "Comfortable air-conditioned vehicles",
      "Professional drivers",
      "Advance booking recommended",
    ],
    image: "/images/HOTEL WEBSITE/Hotel-Transportation-Van-Front_resize.jpg",
  },
  {
    name: "Songthaew (Local Bus)",
    type: "Budget Option",
    description:
      "Traditional converted pickup trucks that serve as local buses, songthaews are an authentic and economical way to travel around Phuket. Fixed routes connect Phuket Town to various beaches and destinations. Flag them down along the road or find them at the Phuket Town bus terminal.",
    details: [
      "Very affordable (20-50 THB)",
      "Fixed routes to beaches",
      "Runs during daylight hours",
      "Phuket Town bus terminal nearby",
      "Authentic local experience",
    ],
    image: null,
  },
  {
    name: "Grab & Bolt (Ride-Hailing Apps)",
    type: "On-Demand",
    description:
      "Modern ride-hailing apps like Grab and Bolt operate throughout Phuket, offering convenient door-to-door transportation. Simply download the app, enter your destination, and get picked up within minutes. Transparent pricing and cashless payment options available.",
    details: [
      "Download app: Grab or Bolt",
      "Door-to-door service",
      "Upfront pricing",
      "Multiple vehicle options",
      "24/7 availability",
    ],
    image: null,
  },
];

export default function TransportationPage() {
  return (
    <>
      <HeroSection
        title="Getting Around Phuket"
        subtitle="Sustainable Transportation"
        description="Eco-friendly and convenient ways to explore the island"
        image="/images/HOTEL WEBSITE/EV-Bus_resize-1.jpeg"
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                Sustainable Travel
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                Transportation Options
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Royal Phuket City Hotel is committed to promoting sustainable transportation. 
                The free Phuket Smart Bus stops right at our doorstep, making eco-friendly 
                travel around the island easier than ever.
              </p>
            </div>

            <div className="space-y-8">
              {transportOptions.map((option) => (
                <div
                  key={option.name}
                  className="bg-white border border-gray-200 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {option.image && (
                      <div className="relative aspect-[16/10] lg:aspect-auto">
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className={`p-6 md:p-8 ${option.image ? "lg:col-span-2" : "lg:col-span-3"}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-heading text-xl md:text-2xl">
                          {option.name}
                        </h3>
                        <span className={`inline-block text-[10px] tracking-wider uppercase px-2 py-1 ${
                          option.type === "Complimentary" 
                            ? "bg-green-100 text-green-800" 
                            : option.type === "Premium Service"
                            ? "bg-[#8b7355] text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {option.type}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {option.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {option.details.map((detail, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-[#8b7355] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl mb-4">
                EV Charging at Our Hotel
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                For guests traveling in electric vehicles, Royal Phuket City Hotel provides 
                EV charging stations in our parking facility. Supporting sustainable travel 
                is part of our commitment to environmental responsibility.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/facilities"
                className="inline-block bg-[#8b7355] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#705c42] transition-colors"
              >
                View Facilities
              </Link>
              <Link
                href="/sustainability"
                className="inline-block border border-[#8b7355] text-[#8b7355] px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#8b7355] hover:text-white transition-colors"
              >
                Back to Sustainability
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
