import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection, CTABanner } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Royal Phuket City Hotel's commitment to sustainability. Green Key certified, ESG practices, and sustainable tourism initiatives.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sustainability`,
  },
  openGraph: {
    title: "Sustainability | Royal Phuket City Hotel",
    description:
      "Our commitment to sustainability through eco-friendly practices and community engagement.",
    url: `${SITE_CONFIG.url}/sustainability`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | Royal Phuket City Hotel",
    description:
      "Our commitment to sustainability through eco-friendly practices.",
  },
};

const certifications = [
  {
    name: "Green Hotel",
    description: "Thailand Green Hotel certification for sustainable practices",
  },
  {
    name: "STAR",
    description: "Sustainable Tourism Accreditation Recognition",
  },
  {
    name: "TSEMS",
    description: "Thailand Sustainable Event Management Standard",
  },
];

const guestActions = [
  {
    title: "Set air conditioning to 25°C",
    description:
      "This is the ideal temperature for both comfort and energy efficiency.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Reuse towels during your stay",
    description:
      "Help us conserve water and reduce detergent use by using your towels more than once.",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  {
    title: "Be mindful of water usage",
    description:
      "Every effort, big or small, helps preserve this precious resource.",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
];

const discoverLinks = [
  {
    title: "About our hotel policy",
    href: "/about",
  },
  {
    title: "Natural attraction around our hotel",
    href: "/facilities",
  },
  {
    title: "Activities around us",
    href: "/facilities",
  },
  {
    title: "Cultural and historical attractions around us",
    href: "/about",
  },
  {
    title: "Local Market & Shopping Mall",
    href: "/about",
  },
  {
    title: "Michelin Restaurant around us",
    href: "/dining",
  },
  {
    title: "Public Transportation in Phuket",
    href: "/contact",
  },
  {
    title: "Our Certificate",
    href: "/sustainability",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Sustainability"
        subtitle="Green Key Certified"
        description="Building a greener future, one stay at a time"
        image="/images/HOTEL WEBSITE/RPC-Main.jpg"
        height="large"
      />

      {/* Green Key Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                International Certification
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                Green Key
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <p>
                Green Key is a voluntary eco-certification programme for
                hotels, hostels, campsites, holiday parks, small accommodations
                as well as conference centres, attractions and restaurants.
              </p>

              <p>
                The Green Key certification is based on compliance with strict
                internationally recognised criteria in the areas of
                environmental management (water, energy, waste, cleaning, etc.)
                and sustainability education (staff, guests, suppliers, etc.).
              </p>

              <p>
                Compliance with the criteria is confirmed through a rigorous
                application process and third-party verified after regular
                on-site audits. The certification is valid for one year at a
                time.
              </p>

              <p>
                Currently (May 2023), there are more than 6,000 establishments
                in 70 countries certified with the Green Key.
              </p>

              <p>
                Green Key is endorsed by various institutional partners,
                international hotel chain and tour operator partners and
                cooperating with a range of web partners.
              </p>

              <p>
                The Green Key programme is managed by the international charity,
                the Foundation for Environmental Education (FEE) and its
                national member organisations.
              </p>

              <p>
                For more information, please have a look at the Green Key
                website (
                <a
                  href="http://www.greenkey.global"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b7355] hover:underline"
                >
                  www.greenkey.global
                </a>
                ) or contact via e-mail (
                <a
                  href="mailto:info@fee.global"
                  className="text-[#8b7355] hover:underline"
                >
                  info@fee.global
                </a>
                ).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
              Executive Summary
            </span>
            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Royal Phuket City Hotel is committed to conducting its business by
              combining excellence in service with a strong focus on
              Environmental, Social, and Governance (ESG) practices, creating
              value for its stakeholders while continuously adapting to ensure
              the sustainability of the organization.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                Our Sustainability
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3">
                Vision & Mission
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-white p-8 border border-gray-200 rounded-lg">
                <h3 className="font-heading text-2xl mb-4 text-[#8b7355]">
                  Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We take pride in supporting and participating in
                  sustainability initiatives. We are committed to being a leader
                  in sustainable hotel services in Phuket by creating a balance
                  between excellence in service, business growth, and the
                  conservation of natural resources, thereby delivering value to
                  future generations.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 border border-gray-200 rounded-lg">
                <h3 className="font-heading text-2xl mb-4 text-[#8b7355]">
                  Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We implement an ESG strategy reflects our belief that we all
                  share one Earth. We pursue sustainability by partnering with
                  eco-friendly organizations, engaging our team in green
                  initiatives, and inviting our guests to join us. Staying with
                  us is more than relaxation—it&apos;s a sustainable experience
                  that care, social development, and good governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Pride of RPC - Certifications */}
      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                The Pride of RPC
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                Our Certifications
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                The hotel has implemented an ESG strategy in order to meet both
                international and national standards, demonstrating a tangible
                commitment to sustainability. We take pride in having received
                various certifications in recognition of these efforts.
              </p>
            </div>

            {/* Certificate Image */}
            <div className="mb-12">
              <div className="relative aspect-[16/9] max-w-2xl mx-auto">
                <Image
                  src="/images/HOTEL WEBSITE/certificates.jpg"
                  alt="Royal Phuket City Hotel Certifications"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 672px"
                  quality={100}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-white p-6 text-center border border-gray-200 rounded-lg"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#8b7355] rounded-full">
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
                  <h3 className="font-heading text-xl mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-center mt-8 leading-relaxed">
              In addition, the hotel remains committed to continuously elevating
              its standards. We are currently in the process of obtaining Green
              Hotel Plus and Green Key certifications, both of which are
              internationally recognized standards that place strong emphasis on
              rigorous and sustainable environmental practices.
            </p>
          </div>
        </div>
      </section>

      {/* Green Stay Initiative */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                Smart Meetings, Sustainable Choices
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                The Green Stay Initiative
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-6 mb-12">
              <p>
                The Green Stay Initiative embodies our dedication to providing a
                sustainable hospitality experience that honors both your comfort
                and the well-being of our planet. Through this program, we
                invite you to join us in embracing eco-friendly practices in
                every guest room, making it easy for you to support
                environmental conservation during your stay.
              </p>

              <p>
                Key features of the initiative include setting the room
                temperature to an optimal 25°C to reduce energy consumption
                while ensuring a comfortable environment. We also encourage
                towel reuse, helping to minimize unnecessary laundry and
                conserve both water and cleaning agents. Additionally, we
                promote mindful water usage throughout your visit, safeguarding
                one of Earth&apos;s most precious resources.
              </p>

              <p>
                Every mindful choice—whether adjusting the air conditioning,
                reusing towels, or conserving water—contributes to reducing our
                collective environmental impact. Together, we can foster a more
                responsible, eco-conscious travel experience—today and for the
                future.
              </p>
            </div>

            {/* Discover More Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {discoverLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="bg-[#FAF8F5] p-4 text-center border border-gray-200 rounded-lg hover:border-[#8b7355] transition-colors group"
                >
                  <h4 className="text-sm font-medium text-gray-700 group-hover:text-[#8b7355] transition-colors">
                    {link.title}
                  </h4>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#8b7355] mt-2 inline-block">
                    Discover More
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comfort & Care */}
      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl mb-6">
                Comfort & Care for You and the Planet
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Royal Phuket City Hotel, our Green Stay Initiative is
                designed to reduce our environmental impact while ensuring you
                enjoy the same level of comfort and hospitality you expect from
                us. We invite you, our valued guest, to join us in adopting
                simple, mindful habits that make a big difference for the
                environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {guestActions.map((action) => (
                <div
                  key={action.title}
                  className="bg-white p-6 border border-gray-200 rounded-lg text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[#8b7355]/10 rounded-full">
                    <svg
                      className="w-7 h-7 text-[#8b7355]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={action.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 leading-relaxed mb-8">
                By participating in the Green Stay Initiative, you&apos;re not
                just enjoying a relaxing stay—you&apos;re also supporting a
                sustainable future. Every small action, multiplied by many,
                leads to real and meaningful change. Together, we can make
                responsible travel a reality and leave a positive impact on our
                planet.
              </p>

              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Stay Sustainably with Us"
        subtitle="Book Your Green Getaway"
        image="/images/HOTEL WEBSITE/RPC-Wide.jpg"
      />
    </>
  );
}
