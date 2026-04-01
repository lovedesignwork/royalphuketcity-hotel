import { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components";
import { HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Legal disclaimer for Royal Phuket City Hotel website including liability limitations, accuracy of information, and external links policy.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/disclaimer`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

const sections = [
  {
    title: "General Disclaimer",
    content: [
      "The information provided on this website is for general informational purposes only. While Royal Phuket City Hotel strives to keep the information up-to-date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.",
      "Any reliance you place on such information is strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising from the use of this website.",
    ],
  },
  {
    title: "Accuracy of Information",
    content: [
      "We endeavor to ensure that all information on this website is accurate and up-to-date. However, prices, availability, room descriptions, amenities, and other details are subject to change without prior notice. Images shown on the website are for illustrative purposes and may differ from actual rooms and facilities.",
      "Room photographs may have been digitally enhanced and should be considered representative rather than exact depictions. Specific room features, views, and layouts may vary.",
    ],
  },
  {
    title: "Pricing and Availability",
    content: [
      "All rates displayed on this website are subject to availability and may change at any time without notice. Promotional rates and special offers are subject to specific terms and conditions and may have blackout dates or restrictions.",
      "The hotel reserves the right to correct any pricing errors and is not obligated to honor bookings made at incorrect rates. Final pricing will be confirmed at the time of booking or check-in.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "Royal Phuket City Hotel may arrange or recommend third-party services such as transportation, tours, spa treatments, or other activities. We act only as an intermediary and are not responsible for the quality, safety, or delivery of such services.",
      "Guests use third-party services at their own risk, and any disputes should be resolved directly with the service provider. We encourage guests to verify all arrangements and read terms before booking external services.",
    ],
  },
  {
    title: "External Links",
    content: [
      "This website may contain links to external websites that are not operated by Royal Phuket City Hotel. We have no control over the content and nature of these sites and are not responsible for any information, products, or services offered on external websites.",
      "The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them. We encourage visitors to review the privacy policies and terms of use of any external websites they visit.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, Royal Phuket City Hotel, its owners, directors, employees, agents, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:",
      "• Your use of or inability to use our website or services\n• Any errors or omissions in content\n• Unauthorized access to or alteration of your data\n• Statements or conduct of any third party on our website\n• Any other matter relating to our website or services",
      "This limitation applies regardless of whether such damages are based on warranty, contract, tort, or any other legal theory, and whether or not we have been advised of the possibility of such damages.",
    ],
  },
  {
    title: "Force Majeure",
    content: [
      "Royal Phuket City Hotel shall not be held liable for any failure or delay in performing our obligations where such failure or delay results from circumstances beyond our reasonable control, including but not limited to natural disasters, acts of terrorism, civil unrest, government actions, epidemics, pandemics, or other force majeure events.",
      "In such circumstances, we will make reasonable efforts to communicate with affected guests and offer alternative arrangements where possible.",
    ],
  },
  {
    title: "Guest Responsibility",
    content: [
      "Guests are responsible for ensuring the accuracy of all personal information provided during booking and check-in. The hotel is not liable for any issues arising from incorrect or incomplete information provided by guests.",
      "Guests are also responsible for the safekeeping of their personal belongings and valuables. While we provide in-room safes and a hotel safe deposit service, the hotel's liability for lost or stolen items is limited as per our hotel policy.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on this website, including text, graphics, logos, images, photographs, videos, and software, is the property of Royal Phuket City Hotel or its content suppliers and is protected by Thai and international copyright laws.",
      "Unauthorized use, reproduction, modification, distribution, or republication of any content without prior written consent from Royal Phuket City Hotel is strictly prohibited and may result in legal action.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "This disclaimer and any disputes arising from your use of this website shall be governed by and construed in accordance with the laws of the Kingdom of Thailand. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts of Thailand.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <HeroSection
        title="Disclaimer"
        subtitle="Legal Notice"
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
                        className="text-[--color-text-secondary] leading-relaxed whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-[--color-surface] hairline-border">
              <h3 className="font-heading text-lg mb-4">Contact Us</h3>
              <p className="text-sm text-[--color-text-secondary] mb-4">
                If you have any questions about this disclaimer, please contact us:
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
                href="/terms-conditions"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Terms & Conditions →
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Privacy Policy →
              </Link>
              <Link
                href="/hotel-policy"
                className="text-sm text-[--color-accent] hover:underline"
              >
                Hotel Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
