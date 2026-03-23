import { Metadata } from "next";
import { HeroSection } from "@/components";
import { HOTEL_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hotel Policy",
  description:
    "Royal Phuket City Hotel policies including check-in/check-out times, cancellation policy, children policy, and house rules.",
};

const policies = [
  {
    title: "Check-in & Check-out",
    items: [
      `Check-in time: ${HOTEL_INFO.checkIn}`,
      `Check-out time: ${HOTEL_INFO.checkOut}`,
      "Early check-in and late check-out are subject to availability and may incur additional charges",
      "Valid government-issued photo ID required at check-in",
      "Credit card required for incidentals",
    ],
  },
  {
    title: "Reservation & Cancellation",
    items: [
      "Reservations can be made online, by phone, or email",
      "A credit card guarantee is required for all reservations",
      "Free cancellation up to 48 hours before check-in date",
      "Cancellations within 48 hours of check-in may be charged one night's stay",
      "No-shows will be charged the full reservation amount",
      "Group reservations (10+ rooms) have separate cancellation policies",
    ],
  },
  {
    title: "Payment",
    items: [
      "We accept Visa, MasterCard, American Express, and JCB",
      "Cash payments accepted in Thai Baht",
      "Payment is required at check-in for the full stay",
      "All rates are quoted in Thai Baht and include VAT",
      "Service charge of 10% applies to all food and beverage services",
    ],
  },
  {
    title: "Children Policy",
    items: [
      "Children of all ages are welcome",
      "Children under 12 stay free when sharing parent's room with existing bedding",
      "Extra beds and baby cots are available upon request (charges may apply)",
      "Child-friendly amenities and menus available",
      "Children must be supervised at the pool at all times",
    ],
  },
  {
    title: "Pet Policy",
    items: [
      "Pets are not permitted in the hotel",
      "Service animals are welcome with proper documentation",
      "Please inform us in advance if you require a service animal",
    ],
  },
  {
    title: "Smoking Policy",
    items: [
      "Royal Phuket City Hotel is a non-smoking property",
      "Smoking is prohibited in all guest rooms and indoor areas",
      "Designated smoking areas are available outdoors",
      "A cleaning fee of THB 5,000 will be charged for smoking in non-designated areas",
    ],
  },
  {
    title: "Pool & Fitness Center",
    items: [
      "Pool hours: 6:00 AM - 8:00 PM daily",
      "Fitness Center: 24 hours with room key access",
      "Proper swim attire required at the pool",
      "Children under 12 must be accompanied by an adult",
      "Glass containers are not permitted in the pool area",
      "Towels are provided poolside",
    ],
  },
  {
    title: "Guest Conduct",
    items: [
      "Quiet hours: 10:00 PM - 8:00 AM",
      "Visitors must register at the front desk",
      "The hotel reserves the right to refuse service or remove guests who violate policies",
      "Damage to hotel property will be charged to the guest's account",
    ],
  },
];

export default function HotelPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Hotel Policy"
        subtitle="Guest Information"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        height="medium"
        overlay="dark"
      />

      {/* Policies */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {policies.map((policy) => (
                <div key={policy.title} className="hairline-border-b pb-12">
                  <h2 className="font-heading text-2xl mb-6">{policy.title}</h2>
                  <ul className="space-y-3">
                    {policy.items.map((item, index) => (
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

            <div className="mt-12 p-6 bg-[--color-surface] hairline-border">
              <p className="text-sm text-[--color-text-secondary]">
                <strong>Note:</strong> These policies are subject to change. For
                the most current information, please contact our front desk at{" "}
                <a
                  href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                  className="text-[--color-accent] hover:underline"
                >
                  {HOTEL_INFO.phone}
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="text-[--color-accent] hover:underline"
                >
                  {HOTEL_INFO.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
