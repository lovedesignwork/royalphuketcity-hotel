import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROMOTIONS, EXTERNAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { OfferJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeHref } from "@/lib/i18n/path";
import {
  getLocalizedPromotion,
  getLocalizedPromotions,
  getPromotionsPageCopy,
} from "@/lib/i18n/promotions-copy";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function isPromotionActive(validUntil: string): boolean {
  return new Date(validUntil) >= new Date();
}

export async function generateStaticParams() {
  return PROMOTIONS.map((promo) => ({
    slug: promo.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = getPromotionsPageCopy(locale);
  const base = PROMOTIONS.find((p) => p.slug === slug);

  if (!base) {
    return {
      title: `${t.notFound} | Royal Phuket City Hotel`,
    };
  }

  const promo = getLocalizedPromotion(base, locale);
  const path = localizeHref(`/promotions/${slug}`, locale);

  return {
    title: `${promo.title} | ${t.promotions}`,
    description: promo.shortDescription,
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/promotions/${slug}`,
        th: `${SITE_CONFIG.url}/th/promotions/${slug}`,
      },
    },
    openGraph: {
      title: `${promo.title} | Royal Phuket City Hotel`,
      description: promo.shortDescription,
      url: `${SITE_CONFIG.url}${path}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: promo.image,
          width: 1200,
          height: 630,
          alt: promo.title,
        },
      ],
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${promo.title} | Royal Phuket City Hotel`,
      description: promo.shortDescription,
      images: [promo.image],
    },
  };
}

export default async function PromotionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = getPromotionsPageCopy(locale);
  const base = PROMOTIONS.find((p) => p.slug === slug);

  if (!base) {
    notFound();
  }

  const promo = getLocalizedPromotion(base, locale);
  const isActive = isPromotionActive(promo.validUntil);
  const others = getLocalizedPromotions(locale).filter(
    (p) => p.slug !== promo.slug && isPromotionActive(p.validUntil)
  );

  return (
    <main>
      <OfferJsonLd
        name={promo.title}
        description={promo.shortDescription}
        url={localizeHref(`/promotions/${slug}`, locale)}
        image={promo.image}
        price={promo.price}
        validFrom={promo.validFrom}
        validThrough={promo.validUntil}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t.home, url: localizeHref("/", locale) },
          { name: t.promotions, url: localizeHref("/promotions", locale) },
          { name: promo.title, url: localizeHref(`/promotions/${slug}`, locale) },
        ]}
      />
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

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href={localizeHref("/", locale)} className="hover:text-[#8B7355] transition-colors">
              {t.home}
            </Link>
            <span>/</span>
            <Link href={localizeHref("/promotions", locale)} className="hover:text-[#8B7355] transition-colors">
              {t.promotions}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{promo.title}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-heading text-2xl text-gray-900 mb-4">{t.aboutOffer}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{promo.shortDescription}</p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl text-gray-900 mb-4">{t.included}</h2>
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

                <div>
                  <h2 className="font-heading text-2xl text-gray-900 mb-4">{t.terms}</h2>
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

              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-[#FAF8F5] rounded-xl p-6 space-y-6">
                  {!isActive && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center">
                      <p className="text-red-700 text-sm font-medium">{t.expired}</p>
                    </div>
                  )}

                  <div className="text-center pb-5 border-b border-gray-200">
                    <p className="text-2xl font-bold text-[#8B7355]">{promo.price}</p>
                    {promo.originalPrice && (
                      <p className="text-gray-500 text-sm mt-1">{promo.originalPrice}</p>
                    )}
                  </div>

                  {promo.bookingCode && (
                    <div className="text-center bg-white border-2 border-dashed border-[#8B7355]/40 rounded-lg px-4 py-4">
                      <p className="text-[10px] tracking-[0.18em] uppercase text-gray-500 mb-1.5">
                        {t.applyCode}
                      </p>
                      <p className="font-mono text-2xl font-bold text-[#8B7355] tracking-[0.15em]">
                        {promo.bookingCode}
                      </p>
                    </div>
                  )}

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
                      {t.bookNow}
                    </a>
                    <a
                      href="tel:+6676233355"
                      className="block w-full text-center py-3 px-6 border border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white text-xs tracking-[0.12em] uppercase font-medium transition-colors"
                    >
                      {t.callToBook}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl text-gray-900 text-center mb-10">
            {t.moreOffers}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {others.slice(0, 3).map((otherPromo) => (
              <Link
                key={otherPromo.slug}
                href={localizeHref(`/promotions/${otherPromo.slug}`, locale)}
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
              href={localizeHref("/promotions", locale)}
              className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase font-medium text-[#8B7355] hover:text-[#705c42] transition-colors"
            >
              {t.viewAll}
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
