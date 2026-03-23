import { Metadata } from "next";
import Image from "next/image";
import { HeroSection, SectionHeading, CTABanner } from "@/components";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Discover world-class facilities at Royal Phuket City Hotel including rooftop pool, fitness center, spa, EV charging, and complimentary shuttle service.",
};

const facilities = [
  {
    name: "Rooftop Swimming Pool",
    description:
      "Enjoy stunning panoramic views of Phuket Old Town from our rooftop swimming pool. Surrounded by comfortable sun loungers and lush greenery, it's the perfect spot to unwind after a day of exploration.",
    hours: "6:00 AM - 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Panoramic city views",
      "Poolside service",
      "Sun loungers & umbrellas",
      "Towel service",
    ],
  },
  {
    name: "Fitness Center",
    description:
      "Stay active during your stay with our state-of-the-art fitness center. Equipped with the latest cardio machines, free weights, and strength training equipment, available around the clock for your convenience.",
    hours: "24 Hours",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Modern equipment",
      "Personal training available",
      "24-hour access",
      "Complimentary water & towels",
    ],
  },
  {
    name: "Spa & Wellness",
    description:
      "Rejuvenate your body and mind at our tranquil spa. Our skilled therapists offer a range of traditional Thai and international treatments designed to restore balance and promote well-being.",
    hours: "10:00 AM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Thai massage",
      "Aromatherapy",
      "Body treatments",
      "Private treatment rooms",
    ],
  },
  {
    name: "Atrium Lounge",
    description:
      "An elegant space bathed in natural light, perfect for afternoon tea, light refreshments, or casual meetings. The stunning atrium architecture creates a serene atmosphere for relaxation.",
    hours: "7:00 AM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Afternoon tea service",
      "Light refreshments",
      "Natural lighting",
      "Comfortable seating",
    ],
  },
  {
    name: "Smart Bus Service",
    description:
      "Explore Phuket with ease using our complimentary Smart Bus service. Regular shuttles connect the hotel to popular destinations including beaches, shopping centers, and cultural attractions.",
    hours: "Scheduled departures",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Complimentary service",
      "Multiple destinations",
      "Air-conditioned",
      "Regular schedule",
    ],
  },
  {
    name: "EV Charging Station",
    description:
      "Travel sustainably with our electric vehicle charging stations. Located in our parking facility, guests can charge their electric vehicles during their stay at no additional cost.",
    hours: "24 Hours",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    features: [
      "Complimentary charging",
      "Multiple stations",
      "Type 2 connectors",
      "Convenient location",
    ],
  },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Facilities"
        subtitle="Hotel Amenities"
        description="Everything you need for an exceptional stay"
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="World-Class Amenities"
              title="Designed for Your Comfort"
            />
            <p className="text-[--color-text-secondary] text-lg">
              From our rooftop pool with panoramic views to our 24-hour fitness
              center and rejuvenating spa, every facility at Royal Phuket City
              Hotel is designed to enhance your stay and ensure complete
              comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities List */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="space-y-20 md:space-y-28">
            {facilities.map((facility, index) => (
              <div
                key={facility.name}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Gold border offset */}
                  <div className={`absolute -bottom-4 ${index % 2 === 1 ? "-right-4" : "-left-4"} w-2/3 h-2/3 border border-[#8B7355] -z-10`} />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  {/* Gold accent bar + hours */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-[2px] bg-[#8B7355]" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[--color-accent]">
                      {facility.hours}
                    </span>
                  </div>

                  <h2 className="font-heading text-3xl md:text-4xl mb-4">
                    {facility.name}
                  </h2>

                  {/* Gold left-border accent on description */}
                  <div className="border-l-2 border-[#8B7355] pl-4 mb-6">
                    <p className="text-[--color-text-secondary] leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {facility.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#8B7355] rounded-full flex-shrink-0" />
                        <span className="text-sm text-[--color-text-secondary]">{feature}</span>
                      </div>
                    ))}
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
