import Link from "next/link";
import { HOTEL_INFO, EXTERNAL_LINKS } from "@/lib/constants";

const seoLinks = {
  phuketHotel1: [
    { label: "Phuket Old Town Hotel", href: "/phuket-old-town-hotel" },
    { label: "4-Star Hotel in Phuket", href: "/4-star-hotel-phuket" },
    { label: "Luxury Hotel Phuket City", href: "/luxury-hotel-phuket-city" },
    { label: "Best Hotel Near Phuket Town", href: "/best-hotel-phuket-town" },
    { label: "Phuket City Center Hotel", href: "/phuket-city-center-hotel" },
  ],
  phuketHotel2: [
    { label: "Budget Friendly Hotel Phuket", href: "/budget-friendly-hotel-phuket" },
    { label: "Family Hotel in Phuket", href: "/family-hotel-phuket" },
    { label: "Business Hotel Phuket", href: "/business-hotel-phuket" },
    { label: "Hotel with Pool Phuket Town", href: "/hotel-with-pool-phuket-town" },
    { label: "Heritage Hotel Phuket", href: "/heritage-hotel-phuket" },
  ],
  whereToGo: [
    { label: "Things to Do in Phuket Old Town", href: "/things-to-do-phuket-old-town" },
    { label: "Phuket Sunday Walking Street", href: "/phuket-sunday-walking-street" },
    { label: "Sino-Portuguese Architecture Phuket", href: "/sino-portuguese-architecture-phuket" },
    { label: "Best Cafes in Phuket Town", href: "/best-cafes-phuket-town" },
    { label: "Phuket Night Market Guide", href: "/phuket-night-market-guide" },
  ],
  wedding: [
    { label: "Wedding Venue Phuket City", href: "/wedding-venues" },
    { label: "Ballroom Wedding Phuket", href: "/wedding-venues" },
    { label: "Grand Wedding Hall Thailand", href: "/wedding-venues" },
    { label: "Thai Wedding Ceremony Venue", href: "/wedding-venues/thai-wedding" },
    { label: "Chinese Wedding Banquet Phuket", href: "/wedding-venues/chinese-wedding" },
  ],
  mice: [
    { label: "Corporate Conference Phuket", href: "/meeting-events/corporate-conference" },
    { label: "Seminar & Workshop Venue", href: "/meeting-events/seminar-workshop" },
    { label: "Product Launch Phuket", href: "/meeting-events/product-launch" },
    { label: "Gala Dinner Venue", href: "/meeting-events/gala-dinner-award" },
    { label: "Exhibition Hall Phuket", href: "/meeting-events/exhibition-trade-show" },
  ],
  restaurant: [
    { label: "Chinese Restaurant Phuket", href: "/yan-long-chinese-restaurant" },
    { label: "Dim Sum Phuket Town", href: "/yan-long-chinese-restaurant" },
    { label: "Best Restaurant in Phuket City", href: "/dining" },
    { label: "Rooftop Bar Phuket Town", href: "/twist-rooftop-restaurant-bar" },
    { label: "Cantonese Food Phuket", href: "/yan-long-chinese-restaurant" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Pre-Footer SEO Links */}
      <div className="bg-[--color-surface] border-b border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Phuket Hotel Column 1 */}
            <div>
              <h5 className="font-heading text-sm text-[--color-text-primary] mb-4 uppercase tracking-wider">
                Phuket Hotel
              </h5>
              <ul className="space-y-2">
                {seoLinks.phuketHotel1.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phuket Hotel Column 2 */}
            <div>
              <h5 className="font-heading text-sm text-[--color-text-primary] mb-4 uppercase tracking-wider">
                Phuket Old Town Hotel
              </h5>
              <ul className="space-y-2">
                {seoLinks.phuketHotel2.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Where to Go in Phuket */}
            <div>
              <h5 className="font-heading text-sm text-[--color-text-primary] mb-4 uppercase tracking-wider">
                Where to Go in Phuket
              </h5>
              <ul className="space-y-2">
                {seoLinks.whereToGo.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wedding */}
            <div>
              <h5 className="font-heading text-sm text-[--color-text-primary] mb-4 uppercase tracking-wider">
                Wedding
              </h5>
              <ul className="space-y-2">
                {seoLinks.wedding.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* MICE */}
            <div>
              <h5 className="font-heading text-sm text-[--color-text-primary] mb-4 uppercase tracking-wider">
                MICE
              </h5>
              <ul className="space-y-2">
                {seoLinks.mice.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phuket Restaurant */}
            <div>
              <h5 className="font-heading text-sm text-[--color-text-primary] mb-4 uppercase tracking-wider">
                Phuket Restaurant
              </h5>
              <ul className="space-y-2">
                {seoLinks.restaurant.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Hotel Info */}
          <div>
            <h3 className="font-heading text-2xl text-[--color-text-primary] mb-6 tracking-wide">
              ROYAL PHUKET CITY
            </h3>
            <p className="text-[--color-text-secondary] text-sm leading-relaxed">
              Conveniently located in the major city of Phuket. This 4-Stars hotel is comfortable, sophisticated, luxurious accommodation, which offers the perfect place to stay for friends looking to see the city and couples on a romantic getaway and thanks to the adaptability of its 9 meeting rooms it&apos;s also a remarkable venue for those important business meetings, conferences and private events.
            </p>
          </div>

          {/* Reach Out */}
          <div>
            <h4 className="font-heading text-[23px] text-[--color-text-primary] mb-6">
              Reach Out
            </h4>
            <address className="not-italic space-y-4">
              <p className="text-sm text-[--color-text-secondary]">
                <span className="text-[--color-text-primary]">Email:</span>{" "}
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="hover:text-[--color-accent] transition-colors"
                >
                  {HOTEL_INFO.email}
                </a>
              </p>
              <p className="text-sm text-[--color-text-secondary]">
                <span className="text-[--color-text-primary]">Tel:</span>{" "}
                <a
                  href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                  className="hover:text-[--color-accent] transition-colors"
                >
                  {HOTEL_INFO.phone}
                </a>
              </p>
              <div className="text-sm text-[--color-text-secondary] pt-2">
                <p>154 Phang-Nga Road, Talad Yai, Muang, Phuket</p>
                <p>83000, Thailand</p>
              </div>
              <p className="pt-2">
                <a
                  href={EXTERNAL_LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider inline-flex items-center gap-2 border-b-2 border-[#8B7355] pb-1"
                >
                  Get Directions via Google Map
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
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </a>
              </p>
            </address>
          </div>

          {/* Let's Connect */}
          <div>
            <h4 className="font-heading text-[23px] text-[--color-text-primary] mb-6">
              Let&apos;s Connect
            </h4>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-[--color-text-secondary] mr-2">Stay Connected:</span>
              <a
                href={EXTERNAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
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
                className="w-8 h-8 flex items-center justify-center text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`mailto:${HOTEL_INFO.email}`}
                className="w-8 h-8 flex items-center justify-center text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>

            {/* Reserve Button */}
            <a
              href={EXTERNAL_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#8B7355] text-[#8B7355] text-sm tracking-wider uppercase hover:bg-[#8B7355] hover:text-white transition-colors"
            >
              Reserve Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[--color-text-secondary]">
              © {new Date().getFullYear()}. Royal Phuket City Hotel, All Rights Reserved
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
              <Link
                href="/hotel-policy"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider"
              >
                Hotel Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider"
              >
                Cookie Policy
              </Link>
              <Link
                href="/disclaimer"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider"
              >
                Disclaimer
              </Link>
              <Link
                href="/accessibility"
                className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
