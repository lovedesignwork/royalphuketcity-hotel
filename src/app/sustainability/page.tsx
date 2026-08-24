import { Metadata } from "next";
import Image from "next/image";
import { HeroSection, CTABanner } from "@/components";
import LocaleLink from "@/components/i18n/LocaleLink";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeHref } from "@/lib/i18n/path";
import { getSustainabilityCopy } from "@/lib/i18n/sustainability-copy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getSustainabilityCopy(locale);
  const path = localizeHref("/sustainability", locale);
  const siteName = locale === "th" ? "โรงแรมรอยัล ภูเก็ต ซิตี้" : "Royal Phuket City Hotel";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/sustainability`,
        th: `${SITE_CONFIG.url}/th/sustainability`,
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
    twitter: {
      card: "summary_large_image",
      title: `${t.metaTitle} | ${siteName}`,
      description: t.ogDesc,
    },
  };
}

export default async function SustainabilityPage() {
  const locale = await getLocale();
  const t = getSustainabilityCopy(locale);

  return (
    <>
      <HeroSection
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
        image="/images/HOTEL WEBSITE/RPC-Main.jpg"
        height="large"
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                {t.certLabel}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                {t.greenKeyTitle}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              {t.greenKey.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                {t.moreInfoBefore}
                <a
                  href="http://www.greenkey.global"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b7355] hover:underline"
                >
                  www.greenkey.global
                </a>
                {t.moreInfoMid}
                <a
                  href="mailto:info@fee.global"
                  className="text-[#8b7355] hover:underline"
                >
                  info@fee.global
                </a>
                {t.moreInfoAfter}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
              {t.execLabel}
            </span>
            <p className="text-gray-600 text-lg mt-6 leading-relaxed">{t.execBody}</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                {t.visionLabel}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3">
                {t.visionMission}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 border border-gray-200 rounded-lg">
                <h3 className="font-heading text-2xl mb-4 text-[#8b7355]">{t.visionTitle}</h3>
                <p className="text-gray-600 leading-relaxed">{t.visionBody}</p>
              </div>
              <div className="bg-white p-8 border border-gray-200 rounded-lg">
                <h3 className="font-heading text-2xl mb-4 text-[#8b7355]">{t.missionTitle}</h3>
                <p className="text-gray-600 leading-relaxed">{t.missionBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications" className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                {t.prideLabel}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                {t.certsTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {t.certsIntro}
              </p>
            </div>

            <div className="mb-12">
              <div className="relative aspect-[16/9] max-w-2xl mx-auto">
                <Image
                  src="/images/Picture2.gif"
                  alt={t.certsImageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 672px"
                  quality={100}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-white p-6 text-center border border-gray-200 rounded-lg"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#8b7355] rounded-full">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-center mt-8 leading-relaxed">{t.certsMore}</p>

            <div className="mt-12">
              <div className="relative w-full">
                <Image
                  src="/images/logo/Picture2.gif"
                  alt={t.logosAlt}
                  width={5170}
                  height={497}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 896px"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                {t.greenStayLabel}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                {t.greenStayTitle}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-6 mb-12">
              {t.greenStay.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.discoverLinks.map((link) => (
                <LocaleLink
                  key={link.href}
                  href={link.href}
                  className="bg-[#FAF8F5] p-4 text-center border border-gray-200 rounded-lg hover:border-[#8b7355] transition-colors group"
                >
                  <h4 className="text-sm font-medium text-gray-700 group-hover:text-[#8b7355] transition-colors">
                    {link.title}
                  </h4>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#8b7355] mt-2 inline-block">
                    {t.discoverMore}
                  </span>
                </LocaleLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl mb-6">{t.comfortTitle}</h2>
              <p className="text-gray-600 leading-relaxed">{t.comfortIntro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {t.guestActions.map((action) => (
                <div
                  key={action.title}
                  className="bg-white p-6 border border-gray-200 rounded-lg text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[#8b7355]/10 rounded-full">
                    <svg
                      className="w-7 h-7 text-[#8b7355]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={action.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 leading-relaxed mb-8">{t.comfortOutro}</p>
              <LocaleLink href="/contact" className="btn-primary">
                {t.contactUs}
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title={t.ctaTitle}
        subtitle={t.ctaSubtitle}
        image="/images/HOTEL WEBSITE/RPC-Wide.jpg"
      />
    </>
  );
}
