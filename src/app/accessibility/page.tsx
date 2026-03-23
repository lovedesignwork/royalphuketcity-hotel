import { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components";
import { HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Royal Phuket City Hotel's commitment to accessibility for guests with disabilities. Learn about our accessible facilities, services, and accommodations.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/accessibility`,
  },
};

const accessibilityFeatures = [
  {
    title: "Accessible Guest Rooms",
    items: [
      "Wheelchair-accessible rooms available on request",
      "Wider doorways (minimum 32 inches) for wheelchair access",
      "Roll-in showers with grab bars and shower seats",
      "Lowered amenities including closet rods and switches",
      "Visual and audible alarms for guests with hearing impairments",
      "Refrigerators and safes at accessible heights",
    ],
  },
  {
    title: "Public Areas & Facilities",
    items: [
      "Step-free access to main entrance and lobby",
      "Elevators with Braille buttons and audible announcements",
      "Accessible restrooms on ground floor and meeting areas",
      "Accessible parking spaces near the main entrance",
      "Ramps and handrails in required areas",
      "Non-slip flooring in wet areas",
    ],
  },
  {
    title: "Dining Accessibility",
    items: [
      "All restaurants accessible via elevator or ramp",
      "Movable seating for wheelchair accommodation",
      "Menus available in large print upon request",
      "Staff trained to assist guests with special dining needs",
      "Allergen information available for all menu items",
    ],
  },
  {
    title: "Meeting & Event Spaces",
    items: [
      "All meeting rooms accessible via elevator",
      "Hearing loop systems available for conferences",
      "Portable microphones for accessibility",
      "Reserved accessible seating areas",
      "Accessible staging options for presentations",
    ],
  },
  {
    title: "Pool & Fitness Center",
    items: [
      "Pool lift available for water access",
      "Accessible changing facilities",
      "Adapted fitness equipment available",
      "Staff assistance available upon request",
    ],
  },
  {
    title: "Communication Services",
    items: [
      "TTY/TDD devices available at front desk",
      "Visual notification devices for door and phone",
      "Sign language interpreter arranged upon advance request",
      "Written communication available as alternative to phone",
      "Accessible website design following WCAG guidelines",
    ],
  },
];

const services = [
  {
    title: "Service Animals",
    description:
      "We welcome certified service animals accompanying guests with disabilities. Please inform us at the time of booking so we can ensure appropriate accommodations. Service animals must be under control at all times and are the responsibility of the guest.",
  },
  {
    title: "Wheelchair & Mobility Equipment",
    description:
      "Wheelchairs are available for guest use within the hotel at no charge. For extended use or specialized equipment, we can assist in arranging rental from local providers. Please contact us in advance for arrangements.",
  },
  {
    title: "Transportation Assistance",
    description:
      "We can arrange accessible transportation to and from the airport or for local excursions. Please provide advance notice so we can coordinate with our accessible transport partners.",
  },
  {
    title: "Staff Assistance",
    description:
      "Our staff members are trained in disability awareness and are available to provide assistance with luggage, room orientation, and navigating the property. Please don't hesitate to ask for help.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <HeroSection
        title="Accessibility"
        subtitle="Welcoming All Guests"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        height="medium"
        overlay="dark"
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl mb-6">Our Commitment to Accessibility</h2>
              <p className="text-lg text-[--color-text-secondary] leading-relaxed mb-6">
                Royal Phuket City Hotel is committed to ensuring that all guests, including those with disabilities, 
                can enjoy a comfortable and dignified stay. We strive to provide accessible facilities and services 
                that meet the needs of all our guests.
              </p>
              <p className="text-[--color-text-secondary] leading-relaxed">
                We continuously work to improve our accessibility features and welcome feedback from our guests. 
                If you have specific accessibility needs or questions, please contact us before your arrival so 
                we can best accommodate your requirements.
              </p>
            </div>

            {/* Accessibility Features */}
            <div className="mb-16">
              <h2 className="font-heading text-2xl mb-8">Accessibility Features</h2>
              <div className="space-y-10">
                {accessibilityFeatures.map((feature) => (
                  <div key={feature.title} className="hairline-border-b pb-10">
                    <h3 className="font-heading text-xl mb-4 text-[--color-accent]">
                      {feature.title}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {feature.items.map((item, index) => (
                        <li
                          key={index}
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
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="mb-16">
              <h2 className="font-heading text-2xl mb-8">Assistance & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="p-6 bg-[--color-surface] hairline-border"
                  >
                    <h3 className="font-heading text-lg mb-3">{service.title}</h3>
                    <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Website Accessibility */}
            <div className="mb-16 p-8 bg-[#8B7355]/10 hairline-border">
              <h2 className="font-heading text-2xl mb-4">Website Accessibility</h2>
              <p className="text-[--color-text-secondary] leading-relaxed mb-4">
                We are committed to making our website accessible to all users. Our website is designed to 
                follow Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, including:
              </p>
              <ul className="space-y-2 text-[--color-text-secondary]">
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent]">•</span>
                  Clear and consistent navigation structure
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent]">•</span>
                  Alt text for all meaningful images
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent]">•</span>
                  Sufficient color contrast for readability
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent]">•</span>
                  Keyboard navigation support
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[--color-accent]">•</span>
                  Resizable text without loss of functionality
                </li>
              </ul>
              <p className="text-sm text-[--color-text-secondary] mt-4">
                If you encounter any accessibility barriers on our website, please let us know so we can address them.
              </p>
            </div>

            {/* Contact for Accessibility */}
            <div className="p-6 bg-[--color-surface] hairline-border">
              <h3 className="font-heading text-lg mb-4">Contact Us About Accessibility</h3>
              <p className="text-sm text-[--color-text-secondary] mb-4">
                To ensure we can best accommodate your needs, please contact us at least 48 hours before 
                your arrival with any accessibility requests or questions:
              </p>
              <ul className="space-y-2 text-sm text-[--color-text-secondary]">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${HOTEL_INFO.email}`}
                    className="text-[--color-accent] hover:underline"
                  >
                    {HOTEL_INFO.email}
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                    className="text-[--color-accent] hover:underline"
                  >
                    {HOTEL_INFO.phone}
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> {HOTEL_INFO.address}
                </li>
              </ul>
              <p className="text-sm text-[--color-text-secondary] mt-4 italic">
                We value your feedback and are committed to continuously improving our accessibility. 
                Please share your suggestions or concerns with us.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/hotel-policy"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Hotel Policy →
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
