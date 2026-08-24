import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeHref } from "@/lib/i18n/path";
import {
  formatPromoPeriod,
  getLocalizedPromotions,
  getPromotionsPageCopy,
} from "@/lib/i18n/promotions-copy";

function isPromotionActive(validUntil: string): boolean {
  return new Date(validUntil) >= new Date();
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getPromotionsPageCopy(locale);
  const path = localizeHref("/promotions", locale);
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/promotions`,
        th: `${SITE_CONFIG.url}/th/promotions`,
      },
    },
    openGraph: {
      title: `${t.metaTitle} | Royal Phuket City Hotel`,
      description: t.metaDesc,
      url: `${SITE_CONFIG.url}${path}`,
      siteName: SITE_CONFIG.name,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: t.metaTitle }],
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.metaTitle} | Royal Phuket City Hotel`,
      description: t.metaDesc,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function PromotionsPage() {
  const locale = await getLocale();
  const t = getPromotionsPageCopy(locale);
  const promotions = getLocalizedPromotions(locale);
  const activePromotions = promotions.filter((p) => isPromotionActive(p.validUntil));

  return (
    <main>
      <HeroSection
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
        image="/images/HOTEL WEBSITE/RPC-Main.jpg"
        height="small"
      />

      <section className="bg-[#FAF8F5] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activePromotions.map((promo) => (
              <Link
                key={promo.slug}
                href={localizeHref(`/promotions/${promo.slug}`, locale)}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#8B7355] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1.5 rounded-full">
                      {promo.tagline}
                    </span>
                  </div>
                </div>

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
                      {t.valid}: {formatPromoPeriod(promo.validFrom, promo.validUntil, locale)}
                    </p>
                    <span className="text-xs font-medium text-[#8B7355] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t.viewDetails}
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
              <p className="text-gray-500 text-lg mb-4">{t.emptyTitle}</p>
              <p className="text-gray-400">{t.emptyDesc}</p>
            </div>
          )}
        </div>
      </section>

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
                <p className="font-medium text-gray-900">{t.helpTitle}</p>
                <p className="text-sm text-gray-500">{t.helpDesc}</p>
              </div>
            </div>
            <a
              href="tel:+6676233355"
              className="bg-[#8B7355] hover:bg-[#705c42] text-white text-xs tracking-[0.12em] uppercase font-medium py-3 px-6 transition-colors"
            >
              {t.call}
            </a>
          </div>
        </div>
      </section>

      <CTABanner
        title={t.ctaTitle}
        description={t.ctaDesc}
        image="/images/HOTEL WEBSITE/RPC-Wide.jpg"
      />
    </main>
  );
}
