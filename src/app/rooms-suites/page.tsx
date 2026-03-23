import { Metadata } from "next";
import { HeroSection, SectionHeading, RoomCard } from "@/components";
import { ROOMS, HOTEL_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Discover our collection of 251 thoughtfully designed rooms and suites at Royal Phuket City Hotel. Each room offers stunning views of Phuket Old Town and the Andaman Sea.",
};

export default function RoomsSuitesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Rooms & Suites"
        subtitle="Accommodations"
        description="251 thoughtfully designed rooms with panoramic views"
        image="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
        height="medium"
      />

      {/* Check-in Info */}
      <section className="py-8 bg-[--color-surface] hairline-border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="label-accent text-[--color-text-secondary] mb-1">
                Check-in
              </p>
              <p className="font-heading text-xl">{HOTEL_INFO.checkIn}</p>
            </div>
            <div className="text-center">
              <p className="label-accent text-[--color-text-secondary] mb-1">
                Check-out
              </p>
              <p className="font-heading text-xl">{HOTEL_INFO.checkOut}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Listing */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Our Collection"
            title="Choose Your Perfect Stay"
            subtitle="Each room type offers a unique experience, from city views to panoramic vistas of the Andaman Sea."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {ROOMS.map((room) => (
              <RoomCard key={room.slug} {...room} />
            ))}
          </div>
        </div>
      </section>

      {/* Room Amenities */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="In Every Room"
            title="Standard Amenities"
            subtitle="All rooms include these thoughtful touches for your comfort."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "High-Speed WiFi",
              "Smart TV",
              "Mini Bar",
              "In-Room Safe",
              "Coffee & Tea",
              "Bathrobes & Slippers",
              "Rain Shower",
              "Premium Toiletries",
              "Work Desk",
              "Air Conditioning",
              "24-Hour Room Service",
              "Daily Housekeeping",
            ].map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-3 p-4 bg-white hairline-border"
              >
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
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
