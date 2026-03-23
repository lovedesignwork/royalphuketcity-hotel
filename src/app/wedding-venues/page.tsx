import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection, SectionHeading, CTABanner } from "@/components";

export const metadata: Metadata = {
  title: "Wedding Venues",
  description:
    "Create unforgettable wedding memories at Royal Phuket City Hotel. From intimate ceremonies to grand celebrations, our versatile venues and dedicated team ensure your perfect day.",
};

const venues = [
  {
    name: "Grand Ballroom",
    capacity: "Up to 500 guests",
    size: "800 sqm",
    description:
      "Our magnificent Grand Ballroom offers the perfect setting for lavish wedding receptions. With soaring ceilings, crystal chandeliers, and customizable lighting, it transforms into your dream celebration space.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    features: [
      "Crystal chandeliers",
      "Built-in stage",
      "Professional sound system",
      "LED wall available",
      "Flexible floor plans",
      "Private bridal suite",
    ],
  },
  {
    name: "Rooftop Terrace",
    capacity: "Up to 150 guests",
    size: "300 sqm",
    description:
      "Exchange vows against the backdrop of Phuket's stunning skyline and the Andaman Sea. Our 19th-floor rooftop terrace offers an unforgettable setting for sunset ceremonies and cocktail receptions.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    features: [
      "Panoramic views",
      "Sunset ceremonies",
      "Outdoor bar setup",
      "Climate-controlled tents available",
      "Fire features",
      "String lighting",
    ],
  },
  {
    name: "Garden Pavilion",
    capacity: "Up to 200 guests",
    size: "400 sqm",
    description:
      "Surrounded by lush tropical gardens, our elegant pavilion provides a serene outdoor setting for ceremonies and receptions. Natural beauty meets refined elegance in this enchanting venue.",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Tropical gardens",
      "Natural shade",
      "Flower arrangements",
      "Outdoor seating",
      "Photo opportunities",
      "Adjacent lawn area",
    ],
  },
];

const weddingPackages = [
  {
    name: "Intimate Ceremony",
    guests: "Up to 50",
    includes: [
      "Ceremony venue",
      "Basic floral decorations",
      "Welcome drinks",
      "2-hour venue usage",
      "Coordination support",
    ],
  },
  {
    name: "Classic Celebration",
    guests: "50-150",
    includes: [
      "Ceremony & reception venue",
      "Custom floral design",
      "Welcome cocktails",
      "4-course dinner",
      "Wedding cake",
      "Dedicated coordinator",
    ],
  },
  {
    name: "Grand Affair",
    guests: "150-500",
    includes: [
      "Grand Ballroom exclusive",
      "Premium floral installations",
      "Full cocktail hour",
      "5-course gourmet dinner",
      "Custom wedding cake",
      "Full planning team",
      "Complimentary suite",
    ],
  },
];

export default function WeddingVenuesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Wedding Venues"
        subtitle="Your Perfect Day"
        description="Create timeless memories at Royal Phuket City"
        image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
        height="large"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="Weddings at Royal Phuket City"
              title="Where Dreams Become Reality"
            />
            <p className="text-[--color-text-secondary] text-lg">
              From intimate ceremonies to grand celebrations, Royal Phuket City
              Hotel offers versatile venues and impeccable service to make your
              special day truly unforgettable. Our dedicated wedding team will
              guide you through every detail, ensuring perfection from the first
              consultation to the last dance.
            </p>
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="space-y-20 md:space-y-28">
            {venues.map((venue, index) => (
              <div
                key={venue.name}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] img-hover">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="label-accent bg-[--color-surface] px-3 py-1.5 hairline-border">
                      {venue.capacity}
                    </span>
                    <span className="label-accent bg-[--color-surface] px-3 py-1.5 hairline-border">
                      {venue.size}
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl mb-4">
                    {venue.name}
                  </h2>
                  <p className="text-[--color-text-secondary] mb-6">
                    {venue.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {venue.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-[--color-accent] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Wedding Packages"
            title="Tailored to Your Vision"
            subtitle="Choose from our carefully curated packages or let us create a bespoke experience just for you."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weddingPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="bg-white p-8 hairline-border text-center"
              >
                <h3 className="font-heading text-2xl mb-2">{pkg.name}</h3>
                <p className="label-accent text-[--color-accent] mb-6">
                  {pkg.guests} Guests
                </p>
                <ul className="space-y-3 text-left mb-8">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[--color-accent] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-[--color-text-secondary]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-outline w-full">
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Begin Your Wedding Journey"
        subtitle="Contact Our Wedding Team"
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
      />
    </>
  );
}
