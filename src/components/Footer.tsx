import Link from "next/link";
import { HOTEL_INFO, EXTERNAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[--color-surface] hairline-border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Hotel Info */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl mb-4">{HOTEL_INFO.name}</h3>
            <p className="text-[--color-text-secondary] text-sm leading-relaxed mb-6 max-w-md">
              Experience heritage hospitality at its finest in the heart of
              Phuket Old Town. A landmark of elegance since opening, our
              19-story hotel offers 251 thoughtfully designed rooms with
              panoramic views of the city and Andaman Sea.
            </p>
            <div className="flex gap-4">
              <a
                href={EXTERNAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center hairline-border text-[--color-text-secondary] hover:text-[--color-accent] hover:border-[--color-accent] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a
                href={EXTERNAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center hairline-border text-[--color-text-secondary] hover:text-[--color-accent] hover:border-[--color-accent] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={EXTERNAL_LINKS.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center hairline-border text-[--color-text-secondary] hover:text-[--color-accent] hover:border-[--color-accent] transition-colors"
                aria-label="TripAdvisor"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-accent text-[--color-text-primary] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/rooms-suites"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/dining"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/wedding-venues"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  Wedding Venues
                </Link>
              </li>
              <li>
                <Link
                  href="/meeting-events"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  Meeting & Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="label-accent text-[--color-text-primary] mb-6">
              Contact
            </h4>
            <address className="not-italic space-y-3">
              <p className="text-sm text-[--color-text-secondary]">
                {HOTEL_INFO.address}
              </p>
              <p>
                <a
                  href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  {HOTEL_INFO.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                >
                  {HOTEL_INFO.email}
                </a>
              </p>
              <p className="pt-2">
                <a
                  href={EXTERNAL_LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[--color-accent] hover:underline inline-flex items-center gap-1"
                >
                  View on Google Maps
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </p>
            </address>

            <div className="mt-8">
              <a
                href={EXTERNAL_LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Reserve Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="hairline-border-t">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[--color-text-secondary]">
              © {new Date().getFullYear()} Royal Phuket City Hotel. All Rights
              Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/hotel-policy"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
              >
                Hotel Policy
              </Link>
              <Link
                href="/privacy-policy"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
