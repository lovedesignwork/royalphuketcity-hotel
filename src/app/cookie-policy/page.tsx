import { Metadata } from "next";
import { HeroSection } from "@/components";
import { HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Royal Phuket City Hotel cookie policy. Learn about how we use cookies and similar technologies on our website.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/cookie-policy`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Cookie Policy"
        subtitle="Website Information"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        height="medium"
        overlay="dark"
      />

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[--color-text-secondary] mb-8">
              Last updated: January 1, 2025
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl mb-4">
                  1. What Are Cookies?
                </h2>
                <p className="text-[--color-text-secondary]">
                  Cookies are small text files that are stored on your device
                  (computer, tablet, or mobile) when you visit a website. They
                  are widely used to make websites work more efficiently, provide
                  a better user experience, and give website owners information
                  about how visitors use their site.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  2. How We Use Cookies
                </h2>
                <p className="text-[--color-text-secondary] mb-4">
                  Royal Phuket City Hotel uses cookies and similar technologies
                  for the following purposes:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website
                    to function properly, such as enabling secure login and
                    remembering your booking progress
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Help us understand how
                    visitors interact with our website by collecting anonymous
                    information
                  </li>
                  <li>
                    <strong>Functionality Cookies:</strong> Remember your
                    preferences and choices to enhance your experience
                  </li>
                  <li>
                    <strong>Targeting Cookies:</strong> Used to deliver relevant
                    advertisements and track their effectiveness
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  3. Types of Cookies We Use
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="hairline-border-b">
                        <th className="text-left py-3 px-4 label-accent">
                          Cookie Type
                        </th>
                        <th className="text-left py-3 px-4 label-accent">
                          Purpose
                        </th>
                        <th className="text-left py-3 px-4 label-accent">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-[--color-text-secondary]">
                      <tr className="hairline-border-b">
                        <td className="py-3 px-4">Session Cookies</td>
                        <td className="py-3 px-4">
                          Enable core functionality like navigation and secure
                          access
                        </td>
                        <td className="py-3 px-4">Browser session</td>
                      </tr>
                      <tr className="hairline-border-b">
                        <td className="py-3 px-4">Preference Cookies</td>
                        <td className="py-3 px-4">
                          Remember language preferences and display settings
                        </td>
                        <td className="py-3 px-4">1 year</td>
                      </tr>
                      <tr className="hairline-border-b">
                        <td className="py-3 px-4">Analytics Cookies</td>
                        <td className="py-3 px-4">
                          Collect anonymous data about website usage
                        </td>
                        <td className="py-3 px-4">2 years</td>
                      </tr>
                      <tr className="hairline-border-b">
                        <td className="py-3 px-4">Marketing Cookies</td>
                        <td className="py-3 px-4">
                          Track visitors across websites for advertising
                          purposes
                        </td>
                        <td className="py-3 px-4">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  4. Third-Party Cookies
                </h2>
                <p className="text-[--color-text-secondary] mb-4">
                  Some cookies on our website are placed by third parties. These
                  may include:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>
                    <strong>Google Analytics:</strong> For website traffic
                    analysis
                  </li>
                  <li>
                    <strong>Facebook Pixel:</strong> For advertising and
                    remarketing
                  </li>
                  <li>
                    <strong>Booking Engine:</strong> For reservation
                    functionality
                  </li>
                  <li>
                    <strong>Live Chat:</strong> For customer service support
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  5. Managing Cookies
                </h2>
                <p className="text-[--color-text-secondary] mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>
                    <strong>Browser Settings:</strong> Most browsers allow you to
                    view, manage, and delete cookies through settings
                  </li>
                  <li>
                    <strong>Cookie Consent:</strong> When you first visit our
                    website, you can choose which types of cookies to accept
                  </li>
                  <li>
                    <strong>Opt-Out Tools:</strong> You can opt out of
                    third-party advertising cookies through industry tools like
                    the Digital Advertising Alliance
                  </li>
                </ul>
                <p className="text-[--color-text-secondary] mt-4">
                  Please note that blocking certain cookies may impact your
                  experience on our website and limit the services we can
                  provide.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  6. Browser-Specific Instructions
                </h2>
                <p className="text-[--color-text-secondary] mb-4">
                  To manage cookies in your browser, please refer to:
                </p>
                <ul className="space-y-2 text-[--color-text-secondary]">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--color-accent] hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--color-accent] hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--color-accent] hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--color-accent] hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">
                  7. Updates to This Policy
                </h2>
                <p className="text-[--color-text-secondary]">
                  We may update this Cookie Policy from time to time to reflect
                  changes in technology, legislation, or our practices. We
                  encourage you to review this page periodically for the latest
                  information.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl mb-4">8. Contact Us</h2>
                <p className="text-[--color-text-secondary]">
                  If you have questions about our use of cookies, please contact
                  us:
                </p>
                <div className="mt-4 p-6 bg-[--color-surface] hairline-border">
                  <p className="text-[--color-text-secondary]">
                    <strong>Royal Phuket City Hotel</strong>
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
