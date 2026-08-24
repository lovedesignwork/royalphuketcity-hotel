import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeHref } from "@/lib/i18n/path";
import { getRoyalGreenCopy } from "@/lib/i18n/royal-green-copy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getRoyalGreenCopy(locale);
  const path = localizeHref("/royal-green", locale);
  const siteName = locale === "th" ? "โรงแรมรอยัล ภูเก็ต ซิตี้" : "Royal Phuket City Hotel";
  return {
    title: `${t.metaTitle} | ${siteName}`,
    description: t.metaDesc,
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/royal-green`,
        th: `${SITE_CONFIG.url}/th/royal-green`,
      },
    },
    openGraph: {
      title: `${t.metaTitle} | ${siteName}`,
      description: t.ogDesc,
      url: `${SITE_CONFIG.url}${path}`,
      siteName: SITE_CONFIG.name,
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
  };
}

export default async function RoyalGreenPage() {
  const locale = await getLocale();
  const t = getRoyalGreenCopy(locale);

  return (
    <main>
      <HeroSection
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        image="/images/HOTEL WEBSITE/RPC-Main.jpg"
        height="medium"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl text-center text-gray-900 mb-4">
              {t.joinTitle}
            </h2>
            <p className="text-center text-gray-600 mb-10">{t.joinDesc}</p>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-6">{t.helpTitle}</h3>

              <ul className="space-y-4">
                {t.helpItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-800">{item}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-[#8B7355] font-medium">{t.thanks}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-gray-900 mb-6">
              {t.supplierTitle}
            </h2>
            <div className="bg-[#FAF8F5] rounded-xl p-8">
              <p className="text-gray-600 mb-4">{t.supplierGreeting}</p>
              <p className="text-gray-600 mb-4">{t.supplierP1}</p>
              <p className="text-gray-600">{t.supplierP2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-[#8B7355] uppercase tracking-wider mb-2">
              {t.staffLabel}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl text-gray-900 mb-10">
              {t.staffTitle}
            </h2>

            <div className="mb-10">
              <h3 className="font-heading text-xl text-gray-900 mb-4">{t.whatTitle}</h3>
              <p className="text-gray-600">{t.whatBody}</p>
            </div>

            <div className="mb-10">
              <h3 className="font-heading text-xl text-gray-900 mb-4">{t.staffCanTitle}</h3>
              <ul className="space-y-2">
                {t.staffCan.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-gray-900 mb-4">{t.heroTitle3}</h3>
              <p className="text-gray-600">{t.heroBody3}</p>
            </div>
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
