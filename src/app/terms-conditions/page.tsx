import { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components";
import { HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for booking and staying at Royal Phuket City Hotel, including reservation policies, payment terms, and guest responsibilities.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-conditions`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing this website, making a reservation, or staying at Royal Phuket City Hotel, you agree to be bound by these Terms and Conditions, our Privacy Policy, Hotel Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this website or our services.",
      "We reserve the right to modify these terms at any time without prior notice. Continued use of our website or services after any changes constitutes acceptance of the new terms.",
    ],
  },
  {
    title: "Reservation and Booking",
    content: [
      "All reservations are subject to availability and confirmation by the hotel. A booking is only confirmed when you receive a confirmation email or confirmation number from Royal Phuket City Hotel.",
      "When making a reservation, you must provide accurate and complete information including your full legal name as it appears on your identification document, valid contact information, and payment details.",
      "The person making the reservation must be at least 18 years of age and will be considered the primary guest responsible for the booking.",
      "Group bookings of 10 or more rooms are subject to separate terms and conditions and may require a signed contract.",
    ],
  },
  {
    title: "Rates and Payment",
    content: [
      "All rates are quoted in Thai Baht (THB) unless otherwise specified and include applicable taxes (currently 7% VAT). Service charges and additional fees may apply to certain services.",
      "Full payment or a valid credit card guarantee is required at the time of booking. The hotel accepts Visa, MasterCard, American Express, JCB, and cash payments in Thai Baht.",
      "Rates displayed are subject to change without notice until a booking is confirmed. Promotional rates may have specific terms, restrictions, and blackout dates.",
      "Any additional charges incurred during your stay (minibar, room service, telephone, damages, etc.) will be charged to the payment method on file at check-out.",
    ],
  },
  {
    title: "Cancellation and Modifications",
    content: [
      "Standard reservations may be cancelled free of charge up to 48 hours before the scheduled check-in date (based on local time at the hotel).",
      "Cancellations made within 48 hours of check-in will be charged one night's room rate plus applicable taxes.",
      "No-shows will be charged the full amount of the reservation.",
      "Non-refundable rates, advance purchase rates, and special promotional rates may have different cancellation policies which will be clearly stated at the time of booking.",
      "To modify or cancel a reservation, please contact our reservations team directly or use the modification link provided in your confirmation email.",
    ],
  },
  {
    title: "Check-in and Check-out",
    content: [
      `Standard check-in time is ${HOTEL_INFO.checkIn} and check-out time is ${HOTEL_INFO.checkOut}.`,
      "Early check-in and late check-out are subject to availability and may incur additional charges. Please contact the hotel in advance to request these services.",
      "All guests must present a valid government-issued photo identification (passport for international guests) at check-in.",
      "A credit card pre-authorization or cash deposit is required at check-in for incidental charges.",
      "The primary guest must be present at check-in with the credit card used for the reservation.",
    ],
  },
  {
    title: "Guest Conduct and Responsibilities",
    content: [
      "Guests are expected to conduct themselves in a respectful manner and comply with all hotel policies, including quiet hours (10:00 PM - 8:00 AM).",
      "Royal Phuket City Hotel is a non-smoking property. Smoking is prohibited in all guest rooms and indoor areas. A cleaning fee of THB 5,000 will be charged for violations.",
      "Guests are liable for any damage caused to hotel property during their stay. Costs of repair or replacement will be charged to the guest's account.",
      "The hotel reserves the right to refuse service or remove any guest who violates these terms, hotel policies, or engages in inappropriate behavior, without refund.",
      "Pets are not permitted except for certified service animals with proper documentation.",
    ],
  },
  {
    title: "Liability and Indemnification",
    content: [
      "Royal Phuket City Hotel is not liable for loss, theft, or damage to guest belongings or vehicles unless directly caused by the hotel's negligence. Safe deposit boxes are available at the front desk, and in-room safes are provided for valuables.",
      "The hotel is not responsible for any injury, illness, or death of guests unless caused by the hotel's proven negligence. Guests use all hotel facilities at their own risk.",
      "Guests agree to indemnify and hold harmless Royal Phuket City Hotel, its owners, directors, employees, and agents from any claims, damages, or expenses arising from the guest's actions or breach of these terms.",
    ],
  },
  {
    title: "Events and Meetings",
    content: [
      "Bookings for meeting rooms, events, and banquets are governed by a separate Events Contract which will be provided upon inquiry.",
      "Event deposits are typically required to secure a booking. Cancellation of events may result in forfeiture of deposits or additional charges depending on the timing and terms of the contract.",
      "The hotel reserves the right to relocate events to alternative suitable venues within the property if necessary.",
      "All event-related payments must be settled according to the agreed payment schedule in the Events Contract.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Royal Phuket City Hotel or its content suppliers and is protected by international copyright laws.",
      "You may not reproduce, modify, distribute, display, or create derivative works from any content without prior written consent from Royal Phuket City Hotel.",
      "The Royal Phuket City Hotel name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of the hotel. You may not use these marks without prior written permission.",
    ],
  },
  {
    title: "Privacy and Data Protection",
    content: [
      "We collect and process personal information in accordance with our Privacy Policy and applicable data protection laws, including Thailand's Personal Data Protection Act (PDPA).",
      "By using our services, you consent to the collection and use of your personal information as described in our Privacy Policy.",
      "We implement appropriate security measures to protect your personal data. However, no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    title: "Dispute Resolution",
    content: [
      "Any disputes arising from these terms or your use of our services shall first be attempted to be resolved through good-faith negotiation between the parties.",
      "If a dispute cannot be resolved through negotiation, it shall be submitted to mediation in Phuket, Thailand, before any legal action is taken.",
      "These terms shall be governed by and construed in accordance with the laws of the Kingdom of Thailand. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts of Thailand.",
    ],
  },
  {
    title: "Severability",
    content: [
      "If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.",
      "The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <>
      <HeroSection
        title="Terms & Conditions"
        subtitle="Booking Terms"
        image="/images/HOTEL WEBSITE/RPC-Main.jpg"
        height="medium"
        overlay="dark"
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[--color-text-secondary] mb-12 text-lg">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <div className="p-6 bg-[#8B7355]/10 border-l-4 border-[#8B7355] mb-12">
              <p className="text-[--color-text-secondary]">
                Please read these Terms and Conditions carefully before making a reservation or using our services. 
                By proceeding with a booking, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={section.title} className="hairline-border-b pb-12">
                  <h2 className="font-heading text-2xl mb-6">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-[--color-text-secondary] leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-[--color-surface] hairline-border">
              <h3 className="font-heading text-lg mb-4">Questions About These Terms?</h3>
              <p className="text-sm text-[--color-text-secondary] mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
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
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/hotel-policy"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Hotel Policy →
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Privacy Policy →
              </Link>
              <Link
                href="/disclaimer"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Disclaimer →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
