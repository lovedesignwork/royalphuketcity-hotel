import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import { PROMOTIONS, EXTERNAL_LINKS } from "@/lib/constants";

function isPromotionActive(validUntil: string): boolean {
  return new Date(validUntil) >= new Date();
}

function formatValidityPeriod(validFrom: string, validUntil: string): string {
  const from = new Date(validFrom);
  const until = new Date(validUntil);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return `${from.toLocaleDateString("en-US", options)} – ${until.toLocaleDateString("en-US", options)}`;
}

export const metadata = {
  title: "Promotions & Special Offers | Royal Phuket City Hotel",
  description: "Discover exclusive promotions and special offers at Royal Phuket City Hotel. Save on room rates, packages, and experiences in Phuket Old Town.",
};

export default function PromotionsPage() {
  const activePromotions = PROMOTIONS.filter((p) => isPromotionActive(p.validUntil));

  return (
    <main>
      <HeroSection
        title="Special Offers"
        subtitle="Promotions"
        image="/images/HOTEL WEBSITE/RPC-Main.jpg"
        height="small"
      />

      {/* Intro */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-4">
            Exclusive Deals
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-gray-900 mb-6">
            Exceptional Value for Your Stay
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Take advantage of our carefully curated promotions designed to make your Phuket experience even more memorable. From seasonal escapes to romantic getaways, find the perfect offer for your next visit.
          </p>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="bg-[#FAF8F5] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activePromotions.map((promo) => (
              <Link
                key={promo.slug}
                href={`/promotions/${promo.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#8B7355] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1.5 rounded-full">
                      {promo.tagline}
                    </span>
                  </div>
                  {/* Price overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/60 text-xs line-through">{promo.originalPrice}</p>
                        <p className="text-white text-lg font-bold">{promo.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-xl text-gray-900 mb-1 group-hover:text-[#8B7355] transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-[#8B7355] font-medium mb-3">{promo.subtitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {promo.shortDescription}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Valid: {formatValidityPeriod(promo.validFrom, promo.validUntil)}
                    </p>
                    <span className="text-xs font-medium text-[#8B7355] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {activePromotions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No active promotions at the moment.</p>
              <p className="text-gray-400">Please check back soon for new special offers.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Need help booking?</p>
                <p className="text-sm text-gray-500">Our reservations team is ready to assist you.</p>
              </div>
            </div>
            <a
              href="tel:+6676233355"
              className="bg-[#8B7355] hover:bg-[#705c42] text-white text-xs tracking-[0.12em] uppercase font-medium py-3 px-6 transition-colors"
            >
              Call +66 76 233 355
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Can't Find What You're Looking For?"
        subtitle="Contact our team for personalized offers and group bookings."
        primaryButton={{
          text: "Contact Us",
          href: "/contact",
        }}
        secondaryButton={{
          text: "Book Direct",
          href: EXTERNAL_LINKS.booking,
          external: true,
        }}
        image="/images/HOTEL WEBSITE/Restaurant/Twist ROoftop.jpg"
      />
    </main>
  );
}
