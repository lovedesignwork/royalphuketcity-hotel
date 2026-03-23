import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection, SectionHeading, CTABanner } from "@/components";
import { HOTEL_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Royal Phuket City Hotel - the first high-rise and tallest building near Phuket Old Town. A 4-star landmark offering 251 rooms, 5 restaurants, and world-class facilities.",
};

const milestones = [
  {
    year: "1995",
    title: "Grand Opening",
    description:
      "Royal Phuket City Hotel opens as the first high-rise building in Phuket, setting a new standard for hospitality in the region.",
  },
  {
    year: "2005",
    title: "Major Renovation",
    description:
      "Comprehensive renovation modernizes all guest rooms and public spaces while preserving our signature elegance.",
  },
  {
    year: "2015",
    title: "TWIST Rooftop Opens",
    description:
      "The iconic 19th-floor rooftop restaurant and bar debuts, offering panoramic views of Phuket.",
  },
  {
    year: "2020",
    title: "Green Certification",
    description:
      "Commitment to sustainability recognized with Green Hotel certification from the Thai government.",
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description:
      "Launch of enhanced digital services and smart room features for an elevated guest experience.",
  },
];

const certifications = [
  { name: "SHA Plus", description: "Safety & Health Administration" },
  { name: "Green Hotel", description: "Thailand Green Hotel Standard" },
  { name: "4-Star Rating", description: "Thailand Hotel Standard Foundation" },
  { name: "TripAdvisor Excellence", description: "Certificate of Excellence" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="About Royal Phuket City"
        subtitle="Our Story"
        description="A landmark of elegance since 1995"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="Our Heritage"
                title="The First High-Rise in Phuket"
                align="left"
              />
              <div className="space-y-4 text-[--color-text-secondary]">
                <p>
                  Standing proudly as the first high-rise and tallest building
                  near Phuket Old Town, Royal Phuket City Hotel has been a
                  landmark of hospitality excellence since our grand opening in
                  1995.
                </p>
                <p>
                  Our 19-story contemporary classic building offers unparalleled
                  views of Phuket&apos;s historic center, the surrounding
                  mountains, and the Andaman Sea beyond. We combine the warmth
                  of traditional Thai hospitality with modern luxury to create
                  unforgettable experiences for every guest.
                </p>
                <p>
                  Located in the heart of Talad Yai, we serve as the perfect
                  gateway to explore the colorful streets, Sino-Portuguese
                  architecture, and rich cultural heritage of Phuket Old Town.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] img-hover">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop"
                alt="Royal Phuket City Hotel exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-heading text-5xl md:text-6xl text-[--color-accent]">
                {HOTEL_INFO.totalRooms}
              </p>
              <p className="label-accent mt-2">Guest Rooms</p>
            </div>
            <div>
              <p className="font-heading text-5xl md:text-6xl text-[--color-accent]">
                {HOTEL_INFO.totalRestaurants}
              </p>
              <p className="label-accent mt-2">Restaurants</p>
            </div>
            <div>
              <p className="font-heading text-5xl md:text-6xl text-[--color-accent]">
                {HOTEL_INFO.meetingRooms}
              </p>
              <p className="label-accent mt-2">Meeting Rooms</p>
            </div>
            <div>
              <p className="font-heading text-5xl md:text-6xl text-[--color-accent]">
                {HOTEL_INFO.parkingSpaces}
              </p>
              <p className="label-accent mt-2">Parking Spaces</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Our Journey"
            title="Milestones"
            subtitle="Key moments in our history of hospitality excellence."
          />
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative pl-8 pb-12 ${
                  index !== milestones.length - 1
                    ? "border-l border-[--color-border]"
                    : ""
                }`}
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 bg-[--color-accent] rounded-full" />
                <span className="label-accent text-[--color-accent] block mb-2">
                  {milestone.year}
                </span>
                <h3 className="font-heading text-2xl mb-2">{milestone.title}</h3>
                <p className="text-[--color-text-secondary]">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Recognition"
            title="Awards & Certifications"
            subtitle="Our commitment to excellence is recognized by industry leaders."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-center p-6 bg-white hairline-border">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[--color-surface] rounded-full">
                  <svg
                    className="w-8 h-8 text-[--color-accent]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg mb-1">{cert.name}</h3>
                <p className="text-xs text-[--color-text-secondary]">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Discover More"
            title="Explore Our Story"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/royal-green"
              className="group relative aspect-[4/3] img-hover"
            >
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
                alt="Royal Green sustainability initiatives"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <span className="label-accent text-white/80 block mb-2">
                    Sustainability
                  </span>
                  <h3 className="font-heading text-2xl">Royal Green</h3>
                </div>
              </div>
            </Link>
            <Link
              href="/our-clients"
              className="group relative aspect-[4/3] img-hover"
            >
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                alt="Corporate clients"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <span className="label-accent text-white/80 block mb-2">
                    Partners
                  </span>
                  <h3 className="font-heading text-2xl">Our Clients</h3>
                </div>
              </div>
            </Link>
            <Link
              href="/artist-story"
              className="group relative aspect-[4/3] img-hover"
            >
              <Image
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
                alt="Art collection"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <span className="label-accent text-white/80 block mb-2">
                    Art & Culture
                  </span>
                  <h3 className="font-heading text-2xl">Artist Story</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Experience Royal Phuket City"
        subtitle="Book Your Stay"
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
      />
    </>
  );
}
