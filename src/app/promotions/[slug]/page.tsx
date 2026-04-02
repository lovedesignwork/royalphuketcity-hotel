import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROMOTIONS, EXTERNAL_LINKS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatValidityPeriod(validFrom: string, validUntil: string): string {
  const from = new Date(validFrom);
  const until = new Date(validUntil);
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  return `${from.toLocaleDateString("en-US", options)} – ${until.toLocaleDateString("en-US", options)}`;
}

function isPromotionActive(validUntil: string): boolean {
  return new Date(validUntil) >= new Date();
}

export async function generateStaticParams() {
  return PROMOTIONS.map((promo) => ({
    slug: promo.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const promo = PROMOTIONS.find((p) => p.slug === slug);

  if (!promo) {
    return {
      title: "Promotion Not Found | Royal Phuket City Hotel",
    };
  }

  return {
    title: `${promo.title} | Promotions | Royal Phuket City Hotel`,
    description: promo.shortDescription,
  };
}

export default async function PromotionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const promo = PROMOTIONS.find((p) => p.slug === slug);

  if (!promo) {
    notFound();
  }

  const isActive = isPromotionActive(promo.validUntil);

  return (
    <main>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={promo.image}
          alt={promo.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <span className="inline-block bg-[#8B7355] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full mb-4">
              {promo.tagline}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-3">
              {promo.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl">{promo.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#8B7355] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/promotions" className="hover:text-[#8B7355] transition-colors">Promotions</Link>
            <span>/</span>
            <span className="text-gray-900">{promo.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="font-heading text-2xl text-gray-900 mb-4">About This Offer</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{promo.shortDescription}</p>
                </div>

                {/* Highlights */}
                <div>
                  <h2 className="font-heading text-2xl text-gray-900 mb-4">What&apos;s Included</h2>
                  <ul className="space-y-3">
                    {promo.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#8B7355] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terms */}
                <div>
                  <h2 className="font-heading text-2xl text-gray-900 mb-4">Terms & Conditions</h2>
                  <ul className="space-y-2">
                    {promo.terms.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-[#FAF8F5] rounded-xl p-6 space-y-6">
                  {/* Status Badge */}
                  {!isActive && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center">
                      <p className="text-red-700 text-sm font-medium">This promotion has expired</p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-center pb-5 border-b border-gray-200">
                    <p className="text-gray-400 text-sm line-through mb-1">{promo.originalPrice}</p>
                    <p className="text-3xl font-bold text-[#8B7355]">{promo.price}</p>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Valid Period</p>
                      <p className="text-sm text-gray-900 font-medium">{formatValidityPeriod(promo.validFrom, promo.validUntil)}</p>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Promo Code</p>
                      <p className="text-sm text-gray-900 font-mono font-bold tracking-wider">{promo.bookingCode}</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3 pt-2">
                    <a
                      href={EXTERNAL_LINKS.booking}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-3 px-6 text-xs tracking-[0.12em] uppercase font-medium transition-colors ${
                        isActive
                          ? "bg-[#8B7355] hover:bg-[#705c42] text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                      Book Now
                    </a>
                    <a
                      href="tel:+6676233355"
                      className="block w-full text-center py-3 px-6 border border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white text-xs tracking-[0.12em] uppercase font-medium transition-colors"
                    >
                      Call to Book
                    </a>
                  </div>

                  {/* Contact hint */}
                  <p className="text-xs text-gray-400 text-center">
                    Mention code <span className="font-mono font-bold">{promo.bookingCode}</span> when booking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Promotions */}
      <section className="bg-[#FAF8F5] py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl text-gray-900 text-center mb-10">
            More Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PROMOTIONS.filter((p) => p.slug !== promo.slug && isPromotionActive(p.validUntil))
              .slice(0, 3)
              .map((otherPromo) => (
                <Link
                  key={otherPromo.slug}
                  href={`/promotions/${otherPromo.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={otherPromo.image}
                      alt={otherPromo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#8B7355] text-white text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 rounded-full">
                        {otherPromo.tagline}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg text-gray-900 group-hover:text-[#8B7355] transition-colors mb-1">
                      {otherPromo.title}
                    </h3>
                    <p className="text-sm text-[#8B7355] font-medium">{otherPromo.price}</p>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/promotions"
              className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase font-medium text-[#8B7355] hover:text-[#705c42] transition-colors"
            >
              View All Promotions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
