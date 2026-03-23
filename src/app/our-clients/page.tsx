import { Metadata } from "next";
import Link from "next/link";
import { HeroSection, SectionHeading, CTABanner } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "Trusted by leading corporations, government agencies, and organizations for meetings, events, and corporate stays at Royal Phuket City Hotel.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/our-clients`,
  },
  openGraph: {
    title: "Our Clients | Royal Phuket City Hotel",
    description:
      "Trusted partner for leading corporations and organizations for meetings and corporate stays.",
    url: `${SITE_CONFIG.url}/our-clients`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Our Clients - Royal Phuket City Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Clients | Royal Phuket City Hotel",
    description:
      "Trusted partner for leading corporations and organizations.",
    images: ["/images/og-image.jpg"],
  },
};

const clientCategories = [
  {
    category: "Government & Public Sector",
    clients: [
      "Tourism Authority of Thailand",
      "Phuket Provincial Administration",
      "Ministry of Culture",
      "Department of National Parks",
    ],
  },
  {
    category: "Corporate & Business",
    clients: [
      "PTT Public Company Limited",
      "Bangkok Bank",
      "CP Group",
      "Thai Airways International",
    ],
  },
  {
    category: "Hospitality & Tourism",
    clients: [
      "Amazing Thailand Tourism Board",
      "Thai Hotels Association",
      "PATA Thailand Chapter",
      "Tourism Council of Thailand",
    ],
  },
  {
    category: "Education & Research",
    clients: [
      "Prince of Songkla University",
      "Phuket Rajabhat University",
      "Hospitality Academy of Thailand",
      "ASEAN Tourism Research Center",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Royal Phuket City Hotel has been our preferred venue for regional conferences for over a decade. Their professionalism and attention to detail never disappoint.",
    author: "Director of MICE Operations",
    company: "Tourism Authority of Thailand",
  },
  {
    quote:
      "The event team at Royal Phuket City consistently exceeds our expectations. Their flexibility and creative solutions make them an invaluable partner.",
    author: "Corporate Events Manager",
    company: "Bangkok Bank PCL",
  },
  {
    quote:
      "From intimate board meetings to large-scale conferences, Royal Phuket City delivers exceptional service and facilities every time.",
    author: "Regional HR Director",
    company: "CP Group",
  },
];

const partnerships = [
  {
    title: "Corporate Rates",
    description:
      "Exclusive pricing and benefits for companies with regular booking needs.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Priority Booking",
    description:
      "Guaranteed availability and preferential access for partner organizations.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "Dedicated Support",
    description:
      "Personal account managers ensuring seamless coordination for all events.",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    title: "Flexible Solutions",
    description:
      "Customized packages tailored to your organization's specific requirements.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
];

export default function OurClientsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Our Clients"
        subtitle="Trusted Partners"
        description="Building lasting relationships with industry leaders"
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="Partnerships"
              title="Your Success Is Our Priority"
            />
            <p className="text-[--color-text-secondary] text-lg">
              For over two decades, Royal Phuket City Hotel has been the trusted
              choice for leading corporations, government agencies, and
              organizations hosting meetings, conferences, and corporate events in
              Phuket. Our commitment to excellence has earned us long-standing
              partnerships built on reliability, quality, and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Client Categories */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Our Partners"
            title="Organizations That Trust Us"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientCategories.map((category) => (
              <div key={category.category} className="bg-white p-6 hairline-border">
                <h3 className="font-heading text-lg mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.clients.map((client) => (
                    <li
                      key={client}
                      className="text-sm text-[--color-text-secondary] flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-[--color-accent] flex-shrink-0"
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
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Client Feedback"
            title="What Our Partners Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-[--color-surface] hairline-border">
                <svg
                  className="w-10 h-10 text-[--color-accent] mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[--color-text-secondary] mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-[--color-text-secondary]">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Partner Benefits"
            title="Corporate Partnership Program"
            subtitle="Exclusive advantages for organizations that choose Royal Phuket City."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerships.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white hairline-border rounded-full">
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
                      d={benefit.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl mb-3">{benefit.title}</h3>
                <p className="text-sm text-[--color-text-secondary]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading
            label="Join Us"
            title="Become a Corporate Partner"
            subtitle="Discover how Royal Phuket City can support your organization's meeting and event needs."
          />
          <Link href="/contact" className="btn-primary">
            Contact Our Corporate Team
          </Link>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Partner With Excellence"
        subtitle="Start Your Partnership Today"
        image="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
      />
    </>
  );
}
