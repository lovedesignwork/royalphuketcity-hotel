import { Metadata } from "next";
import { HeroSection } from "@/components";
import { HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Royal Phuket City Hotel privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Privacy Policy"
        subtitle="Your Privacy Matters"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        height="medium"
        overlay="dark"
      />

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-[--color-text-secondary] mb-8">
              Last updated: January 1, 2025
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl mb-4">1. Introduction</h2>
                <p className="text-[--color-text-secondary]">
                  Royal Phuket City Hotel (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is
                  committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you visit our hotel, use our website, or
                  interact with our services.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-[--color-text-secondary] mb-4">
                  We may collect the following types of information:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, postal address, date of birth, passport or ID
                    details
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Credit card details,
                    billing address
                  </li>
                  <li>
                    <strong>Stay Preferences:</strong> Room preferences, dietary
                    requirements, special requests
                  </li>
                  <li>
                    <strong>Technical Data:</strong> IP address, browser type,
                    device information, cookies
                  </li>
                  <li>
                    <strong>Communication Data:</strong> Correspondence with our
                    team, feedback, reviews
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-[--color-text-secondary] mb-4">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>Process and manage your reservations</li>
                  <li>Provide personalized guest services</li>
                  <li>Process payments and prevent fraud</li>
                  <li>
                    Send booking confirmations and important updates
                  </li>
                  <li>
                    Communicate promotional offers (with your consent)
                  </li>
                  <li>Improve our services and guest experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  4. Information Sharing
                </h2>
                <p className="text-[--color-text-secondary] mb-4">
                  We may share your information with:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>
                    <strong>Service Providers:</strong> Payment processors,
                    booking platforms, IT service providers
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> When required by law or
                    to protect our rights
                  </li>
                  <li>
                    <strong>Business Partners:</strong> With your consent, for
                    joint promotions or services
                  </li>
                </ul>
                <p className="text-[--color-text-secondary] mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">5. Data Security</h2>
                <p className="text-[--color-text-secondary]">
                  We implement appropriate technical and organizational measures
                  to protect your personal information, including encryption,
                  secure servers, and access controls. However, no method of
                  transmission over the Internet is 100% secure, and we cannot
                  guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  6. Data Retention
                </h2>
                <p className="text-[--color-text-secondary]">
                  We retain your personal information for as long as necessary
                  to fulfill the purposes outlined in this policy, comply with
                  legal obligations, resolve disputes, and enforce our
                  agreements. Guest records are typically retained for 7 years
                  after your last stay.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">7. Your Rights</h2>
                <p className="text-[--color-text-secondary] mb-4">
                  Under applicable data protection laws, you may have the right
                  to:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
                <p className="text-[--color-text-secondary] mt-4">
                  To exercise these rights, please contact us using the details
                  below.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  8. International Transfers
                </h2>
                <p className="text-[--color-text-secondary]">
                  Your information may be transferred to and processed in
                  countries other than Thailand. We ensure appropriate
                  safeguards are in place to protect your data in accordance
                  with this policy and applicable laws.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  9. Children&apos;s Privacy
                </h2>
                <p className="text-[--color-text-secondary]">
                  Our services are not directed to individuals under 18. We do
                  not knowingly collect personal information from children
                  without parental consent.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="text-[--color-text-secondary]">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on our website with an updated effective date.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">11. Contact Us</h2>
                <p className="text-[--color-text-secondary]">
                  If you have questions about this Privacy Policy or wish to
                  exercise your rights, please contact us:
                </p>
                <div className="mt-4 p-6 bg-[--color-surface] hairline-border">
                  <p className="text-[--color-text-secondary]">
                    <strong>Royal Phuket City Hotel</strong>
                    <br />
                    Data Protection Officer
                    <br />
                    {HOTEL_INFO.address}
                    <br />
                    Email:{" "}
                    <a
                      href={`mailto:${HOTEL_INFO.email}`}
                      className="text-[--color-accent] hover:underline"
                    >
                      {HOTEL_INFO.email}
                    </a>
                    <br />
                    Phone:{" "}
                    <a
                      href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                      className="text-[--color-accent] hover:underline"
                    >
                      {HOTEL_INFO.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
