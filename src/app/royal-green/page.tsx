import { Metadata } from "next";
import Image from "next/image";
import { HeroSection, SectionHeading, CTABanner } from "@/components";

export const metadata: Metadata = {
  title: "Royal Green",
  description:
    "Discover Royal Phuket City Hotel's commitment to sustainability. Our Royal Green initiative encompasses eco-friendly practices, waste reduction, and community engagement.",
};

const initiatives = [
  {
    title: "Energy Conservation",
    description:
      "LED lighting throughout the property, smart room systems that adjust climate control based on occupancy, and solar panels contributing to our energy needs.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    stats: "30% reduction in energy consumption",
  },
  {
    title: "Water Management",
    description:
      "Low-flow fixtures, rainwater harvesting systems, and efficient laundry operations help us conserve this precious resource.",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    stats: "40% water savings achieved",
  },
  {
    title: "Waste Reduction",
    description:
      "Comprehensive recycling program, composting of organic waste, elimination of single-use plastics, and donation of usable items to local communities.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    stats: "60% waste diverted from landfill",
  },
  {
    title: "Local Sourcing",
    description:
      "Partnerships with local farmers and suppliers reduce transportation emissions while supporting the local economy and ensuring fresh, quality ingredients.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    stats: "70% ingredients sourced locally",
  },
];

const certifications = [
  {
    name: "Thailand Green Hotel",
    level: "Gold Level",
    year: "2020",
  },
  {
    name: "SHA Plus",
    level: "Certified",
    year: "2021",
  },
  {
    name: "EarthCheck",
    level: "Bronze",
    year: "2023",
  },
];

const communityPrograms = [
  {
    title: "Beach Cleanup Initiative",
    description:
      "Monthly beach cleanup events with staff and guests, removing plastic and debris from Phuket's beautiful coastlines.",
  },
  {
    title: "Local School Support",
    description:
      "Educational partnerships providing hospitality training and career opportunities for local students.",
  },
  {
    title: "Food Donation Program",
    description:
      "Surplus food from our restaurants is donated to local community centers and shelters.",
  },
  {
    title: "Coral Restoration",
    description:
      "Partnership with marine conservation groups to support coral reef restoration efforts around Phuket.",
  },
];

export default function RoyalGreenPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Royal Green"
        subtitle="Sustainability"
        description="Our commitment to a greener future"
        image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="Our Commitment"
              title="Hospitality with Responsibility"
            />
            <p className="text-[--color-text-secondary] text-lg">
              At Royal Phuket City Hotel, sustainability is not just a policy—
              it&apos;s a philosophy that guides everything we do. Our Royal Green
              initiative represents our commitment to minimizing environmental
              impact while maximizing positive contributions to our community and
              the beautiful island we call home.
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Green Initiatives"
            title="How We Make a Difference"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative) => (
              <div key={initiative.title} className="bg-white p-8 hairline-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[--color-surface] rounded-full flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[--color-accent]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={initiative.icon}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-[--color-text-secondary] text-sm mb-4">
                      {initiative.description}
                    </p>
                    <span className="label-accent text-[--color-accent]">
                      {initiative.stats}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="Recognition"
                title="Environmental Certifications"
                align="left"
              />
              <p className="text-[--color-text-secondary] mb-8">
                Our sustainability efforts have been recognized by leading
                environmental certification bodies, validating our commitment to
                responsible hospitality practices.
              </p>
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-4 p-4 hairline-border">
                    <div className="w-12 h-12 flex items-center justify-center bg-[--color-accent] text-white rounded-full">
                      <svg
                        className="w-6 h-6"
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
                    </div>
                    <div>
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-[--color-text-secondary]">
                        {cert.level} • Since {cert.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] img-hover">
              <Image
                src="https://images.unsplash.com/photo-1518173946687-a4c036bc0654?q=80&w=1974&auto=format&fit=crop"
                alt="Green hotel certification"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Community Impact"
            title="Giving Back to Phuket"
            subtitle="Our sustainability efforts extend beyond the hotel to support the local community."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityPrograms.map((program) => (
              <div key={program.title} className="bg-white p-6 hairline-border">
                <h3 className="font-heading text-lg mb-3">{program.title}</h3>
                <p className="text-sm text-[--color-text-secondary]">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Participation */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading
            label="Join Us"
            title="How Guests Can Participate"
            subtitle="Simple ways to contribute to our sustainability efforts during your stay."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[--color-surface] rounded-full">
                <span className="font-heading text-2xl text-[--color-accent]">
                  1
                </span>
              </div>
              <h3 className="font-heading text-lg mb-2">Reuse Towels</h3>
              <p className="text-sm text-[--color-text-secondary]">
                Hang your towels to reuse them, reducing water and energy
                consumption.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[--color-surface] rounded-full">
                <span className="font-heading text-2xl text-[--color-accent]">
                  2
                </span>
              </div>
              <h3 className="font-heading text-lg mb-2">Conserve Energy</h3>
              <p className="text-sm text-[--color-text-secondary]">
                Turn off lights and AC when leaving your room using your key
                card system.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[--color-surface] rounded-full">
                <span className="font-heading text-2xl text-[--color-accent]">
                  3
                </span>
              </div>
              <h3 className="font-heading text-lg mb-2">Recycle</h3>
              <p className="text-sm text-[--color-text-secondary]">
                Use the recycling bins provided in your room and throughout the
                hotel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Stay Green with Us"
        subtitle="Book a Sustainable Stay"
        image="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2075&auto=format&fit=crop"
      />
    </>
  );
}
