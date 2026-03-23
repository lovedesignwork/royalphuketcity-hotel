import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection, SectionHeading, CTABanner } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Royal Phuket City Hotel's commitment to sustainability. Thai Green Hotel certified, eco-friendly practices, and community engagement programs.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sustainability`,
  },
  openGraph: {
    title: "Sustainability | Royal Phuket City Hotel",
    description:
      "Our commitment to sustainability through eco-friendly practices and community engagement.",
    url: `${SITE_CONFIG.url}/sustainability`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sustainability at Royal Phuket City Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | Royal Phuket City Hotel",
    description:
      "Our commitment to sustainability through eco-friendly practices.",
    images: ["/images/og-image.jpg"],
  },
};

const sustainabilityPillars = [
  {
    title: "Environmental Conservation",
    description:
      "We minimize our environmental footprint through energy efficiency, water conservation, and waste reduction programs.",
    initiatives: [
      "LED lighting and smart climate control systems",
      "Solar panels contributing to energy needs",
      "Low-flow fixtures and rainwater harvesting",
      "Comprehensive recycling and composting programs",
      "Elimination of single-use plastics",
    ],
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c036bc0654?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Community Engagement",
    description:
      "We actively support and invest in the local community, creating opportunities and fostering sustainable development.",
    initiatives: [
      "Local hiring and career development programs",
      "Partnership with local farmers and suppliers",
      "Support for local schools and education",
      "Community event sponsorships",
      "Cultural preservation initiatives",
    ],
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Responsible Operations",
    description:
      "Every aspect of our operations is guided by principles of sustainability, from procurement to guest services.",
    initiatives: [
      "Green procurement policies",
      "Staff sustainability training",
      "Energy and water usage monitoring",
      "Sustainable cleaning products",
      "Digital transformation to reduce paper",
    ],
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
  },
];

const achievements = [
  { value: "30%", label: "Energy reduction since 2020" },
  { value: "40%", label: "Water savings achieved" },
  { value: "60%", label: "Waste diverted from landfill" },
  { value: "70%", label: "Ingredients sourced locally" },
];

const certifications = [
  {
    name: "Thailand Green Hotel",
    level: "Gold Level Certification",
    year: "2020",
  },
  {
    name: "SHA Plus",
    level: "Safety & Health Administration",
    year: "2021",
  },
  {
    name: "EarthCheck",
    level: "Bronze Benchmark",
    year: "2023",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Sustainability"
        subtitle="Our Commitment"
        description="Building a greener future, one stay at a time"
        image="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2075&auto=format&fit=crop"
        height="large"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="Our Vision"
              title="Hospitality with Purpose"
            />
            <p className="text-[--color-text-secondary] text-lg">
              At Royal Phuket City Hotel, we believe that luxury and
              sustainability can coexist harmoniously. Our comprehensive
              sustainability program reflects our deep commitment to protecting
              the environment, supporting our community, and preserving the
              natural beauty of Phuket for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl md:text-5xl text-[--color-accent]">
                  {stat.value}
                </p>
                <p className="label-accent mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Pillars */}
      <section className="pb-20 md:pb-28">
        {sustainabilityPillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className={`py-20 md:py-28 ${
              index % 2 === 1 ? "bg-[--color-surface]" : ""
            }`}
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] img-hover">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-[--color-accent]/10 rounded-full">
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
                          d={pillar.icon}
                        />
                      </svg>
                    </div>
                    <span className="label-accent text-[--color-accent]">
                      Sustainability Pillar
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl mb-4">
                    {pillar.title}
                  </h2>
                  <p className="text-[--color-text-secondary] mb-6">
                    {pillar.description}
                  </p>
                  <ul className="space-y-3">
                    {pillar.initiatives.map((initiative) => (
                      <li
                        key={initiative}
                        className="flex items-start gap-3 text-[--color-text-secondary]"
                      >
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
                        {initiative}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Recognition"
            title="Certifications & Awards"
            subtitle="Our sustainability efforts have been recognized by leading environmental bodies."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white p-8 hairline-border text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[--color-accent] rounded-full">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl mb-1">{cert.name}</h3>
                <p className="text-sm text-[--color-text-secondary] mb-2">
                  {cert.level}
                </p>
                <p className="label-accent text-[--color-accent]">
                  Since {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading
            label="Learn More"
            title="Explore Our Green Initiatives"
            subtitle="Discover more about our comprehensive sustainability programs."
          />
          <Link href="/royal-green" className="btn-primary">
            Visit Royal Green
          </Link>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Stay Sustainably with Us"
        subtitle="Book Your Green Getaway"
        image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
      />
    </>
  );
}
