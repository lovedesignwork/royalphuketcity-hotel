import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import WeddingPhotoSlider from "@/components/WeddingPhotoSlider";
import WeddingInquiryForm from "@/components/WeddingInquiryForm";
import WeddingGallery from "@/components/WeddingGallery";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeHref } from "@/lib/i18n/path";
import { getWeddingPageCopy } from "@/lib/i18n/wedding-copy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getWeddingPageCopy(locale);
  const path = localizeHref("/wedding-venues", locale);
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/wedding-venues`,
        th: `${SITE_CONFIG.url}/th/wedding-venues`,
      },
    },
    openGraph: {
      title: `${t.metaTitle} | Royal Phuket City Hotel`,
      description: t.metaDesc,
      url: `${SITE_CONFIG.url}${path}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t.metaTitle,
        },
      ],
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

export default async function WeddingVenuesPage() {
  const locale = await getLocale();
  const t = getWeddingPageCopy(locale);
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
        image="/images/HOTEL WEBSITE/WED.jpg"
        height="large"
        subtitleSize="large"
        showSparkles
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              label={t.introLabel}
              title={t.introTitle}
            />
            <p className="text-[--color-text-secondary] text-lg">
              {t.introBody}
            </p>
          </div>
        </div>
      </section>

      {/* Photo Slider */}
      <WeddingPhotoSlider />

      {/* CTA - Plan Your Wedding */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          {/* Double Stroke Container - White outer, Gold inner */}
          <div className="outline outline-[4px] md:outline-[8px] lg:outline-[4px] md:outline-[8px] lg:outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <p className="label-accent text-[#8B7355] mb-2">{t.planLabel}</p>
                <h3 className="font-heading text-2xl md:text-3xl text-[--color-text-primary] mb-2">
                  {t.planTitle}
                </h3>
                <p className="text-[--color-text-secondary]">
                  {t.planDesc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#wedding-inquiry"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t.inquiry}
                </a>
                <Link 
                  href={localizeHref("/download-fact-sheets", locale)} 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#8B7355]/30 text-[--color-text-primary] font-medium tracking-wide uppercase text-sm hover:bg-[#8B7355]/10 hover:border-[#8B7355]/50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  {t.brochure}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            label={t.servicesLabel}
            title={t.servicesTitle}
            subtitle={t.servicesSubtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: t.services[0].title,
                description: t.services[0].description,
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              },
              {
                title: t.services[1].title,
                description: t.services[1].description,
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              },
              {
                title: t.services[2].title,
                description: t.services[2].description,
                icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
              },
              {
                title: t.services[3].title,
                description: t.services[3].description,
                icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
              },
            ].map((service) => (
              <div key={service.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white hairline-border rounded-full">
                  <svg
                    className="w-8 h-8 text-[--color-accent]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={service.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl mb-3">{service.title}</h3>
                <p className="text-sm text-[--color-text-secondary]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Types */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            label={t.typesLabel}
            title={t.typesTitle}
            subtitle={t.typesSubtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Engagement Ceremony */}
            <Link href={localizeHref("/wedding-venues/engagement-ceremony", locale)} className="group block">
              <article className="relative h-full overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/HOTEL WEBSITE/Wedding/WED_ENG_P02_couple_laugh_portrait.jpg"
                    alt="Engagement Ceremony at Royal Phuket City"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">{t.types["engagement-ceremony"].label}</p>
                    <h3 className="font-heading text-2xl md:text-3xl mb-3">{t.types["engagement-ceremony"].title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      {t.types["engagement-ceremony"].desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                      {t.learnMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>

            {/* Thai Wedding */}
            <Link href={localizeHref("/wedding-venues/thai-wedding", locale)} className="group block">
              <article className="relative h-full overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/HOTEL WEBSITE/Wedding/WED_THAI_P02_couple_wai_portrait.jpg"
                    alt="Thai Wedding Ceremony at Royal Phuket City"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">{t.types["thai-wedding"].label}</p>
                    <h3 className="font-heading text-2xl md:text-3xl mb-3">{t.types["thai-wedding"].title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      {t.types["thai-wedding"].desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                      {t.learnMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>

            {/* Chinese Wedding */}
            <Link href={localizeHref("/wedding-venues/chinese-wedding", locale)} className="group block">
              <article className="relative h-full overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/HOTEL WEBSITE/Wedding/WED_CHN_P02_couple_firstlook_portrait.jpg"
                    alt="Chinese Wedding Banquet at Royal Phuket City"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">{t.types["chinese-wedding"].label}</p>
                    <h3 className="font-heading text-2xl md:text-3xl mb-3">{t.types["chinese-wedding"].title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      {t.types["chinese-wedding"].desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                      {t.learnMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>

            {/* Muslim Wedding */}
            <Link href={localizeHref("/wedding-venues/muslim-wedding", locale)} className="group block">
              <article className="relative h-full overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/HOTEL WEBSITE/Wedding/WED_MUS_P02_couple_tender_portrait.jpg"
                    alt="Muslim Wedding at Royal Phuket City"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">{t.types["muslim-wedding"].label}</p>
                    <h3 className="font-heading text-2xl md:text-3xl mb-3">{t.types["muslim-wedding"].title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      {t.types["muslim-wedding"].desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                      {t.learnMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>

            {/* Western Wedding */}
            <Link href={localizeHref("/wedding-venues/western-wedding", locale)} className="group block">
              <article className="relative h-full overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/HOTEL WEBSITE/Wedding/WED_WES_P02_champagne_toast_portrait.jpg"
                    alt="Western Wedding Reception at Royal Phuket City"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">{t.types["western-wedding"].label}</p>
                    <h3 className="font-heading text-2xl md:text-3xl mb-3">{t.types["western-wedding"].title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      {t.types["western-wedding"].desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                      {t.learnMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>

            {/* LGBTQ Wedding */}
            <Link href={localizeHref("/wedding-venues/lgbtq-wedding", locale)} className="group block">
              <article className="relative h-full overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/HOTEL WEBSITE/Wedding/WED_LGBT_P01_twobrides_cheektop_portrait.jpg"
                    alt="LGBTQ+ Wedding Celebration at Royal Phuket City"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">{t.types["lgbtq-wedding"].label}</p>
                    <h3 className="font-heading text-2xl md:text-3xl mb-3">{t.types["lgbtq-wedding"].title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      {t.types["lgbtq-wedding"].desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                      {t.learnMore}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* After-Party Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/HOTEL WEBSITE/Wedding/Resize/2024.12.19 WD Cin-Ong Royal-10365_resize.jpg"
          alt="Wedding celebration at Royal Phuket City"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        
        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight whitespace-pre-line">
                {t.afterTitle}
              </h2>
            </div>
            
            {/* Right Content */}
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-white mb-4">
                {t.afterHeading}
              </h3>
              <p className="text-white/80 leading-relaxed mb-8">
                {t.afterBody}
              </p>
              
              {/* After-Party Image */}
              <div className="relative aspect-video overflow-hidden border-4 border-[#8B7355]">
                <Image
                  src="/images/HOTEL WEBSITE/Wedding/MTT1996_resize.jpg"
                  alt="Wedding celebration at Royal Phuket City"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={100}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All-in-One Wedding Service */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          {/* Double Stroke Container - White outer, Gold inner */}
          <div className="outline outline-[4px] md:outline-[8px] lg:outline-[4px] md:outline-[8px] lg:outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Wedd.jpg"
                  alt="Wedding couple first dance"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div>
                <p className="label-accent text-[--color-accent] mb-3">{t.allInLabel}</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary] mb-6">
                  {t.allInTitle}
                </h2>
                <p className="text-[--color-text-secondary] leading-relaxed mb-8">
                  {t.allInBody}
                </p>

                {/* Service List */}
                <ul className="space-y-3 mb-10">
                  {t.allInItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[--color-text-secondary]">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Contact Info - Elegant Style */}
                <div className="mt-10 pt-8 border-t border-[#8B7355]/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-[1px] bg-[#8B7355]" />
                    <p className="text-xs tracking-[0.2em] uppercase text-[#8B7355]">{t.specialist}</p>
                  </div>
                  
                  <p className="font-heading text-2xl text-[--color-text-primary] mb-6">Khun Narin Ruengmun</p>
                  
                  <div className="space-y-3">
                    <a href="mailto:narin.r@royalphuketcity.com" className="flex items-center gap-3 text-[--color-text-secondary] hover:text-[#8B7355] transition-colors">
                      <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <span>narin.r@royalphuketcity.com</span>
                    </a>
                    <a href="tel:+66815989985" className="flex items-center gap-3 text-[--color-text-secondary] hover:text-[#8B7355] transition-colors">
                      <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <span>+66 (0)81 598 9985 #3</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phuket&apos;s Most Loved Wedding Venue */}
      <section className="relative py-32 md:py-48">
        <Image
          src="/images/HOTEL WEBSITE/RPC wedding 545.jpg"
          alt="Wedding ceremony at Royal Phuket City Hotel"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-6">
          <div className="text-center text-white max-w-4xl mx-auto">
            <p className="label-accent mb-4" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)" }}>{t.lovedLabel}</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 whitespace-pre-line" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.5)" }}>
              {t.lovedTitle}
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)" }}>
              {t.lovedBody}
            </p>
          </div>
        </div>
      </section>

      {/* Certified Excellence - Wedding */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          {/* Double Stroke Container - White outer, Gold inner */}
          <div className="outline outline-[4px] md:outline-[8px] lg:outline-[4px] md:outline-[8px] lg:outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
              {/* Image */}
              <div className="relative min-h-[500px] lg:min-h-0 overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Wedding/MTT2447_resize.jpg"
                  alt="Wedding ceremony"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={100}
                  unoptimized
                />
              </div>

              {/* Content */}
              <div>
              <p className="label-accent text-[--color-accent] mb-3">{t.certLabel}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary] mb-6">
                {t.certTitle}
              </h2>
              <p className="text-[--color-text-secondary] leading-relaxed mb-8">
                {t.certBody}
              </p>

              {/* Certification Logos */}
              <div className="mb-10">
                <Image
                  src="/images/certificates.png"
                  alt="Certifications - ASEAN MICE Venue, TCEB, Halal, Green Hotel, Safe Travels, SHA Plus"
                  width={1600}
                  height={256}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Our Certifications */}
              <div>
                <h3 className="font-heading text-xl text-[--color-text-primary] mb-5">{t.certHeading}</h3>
                <ul className="space-y-3">
                  {t.certs.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[--color-text-secondary]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Wedding Gallery */}
      <WeddingGallery />

      {/* Why Our Wedding Venue */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16">
            <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
              {t.whyLabel}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary]">
              {t.whyTitle}
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Best Location */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/HKT Old Town.jpg"
                  alt="Phuket Old Town near Royal Phuket City Hotel"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[0].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[0].desc}
              </p>
            </div>

            {/* Great Value */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Wedding/Resize/Royal PHoto SHoot035_resize.jpg"
                  alt="Professional wedding team at Royal Phuket City"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[1].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[1].desc}
              </p>
            </div>

            {/* Flexibility Comes First */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Wedding/Resize/line_oa_chat_240912_092752_resize.jpg"
                  alt="Flexible wedding planning at Royal Phuket City"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[2].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[2].desc}
              </p>
            </div>

            {/* Food to Impress */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Restaurant/YanLong.jpg"
                  alt="Wedding catering at Royal Phuket City"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[3].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[3].desc}
              </p>
            </div>

            {/* Large-Scale Capacity */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Ballroom.jpg"
                  alt="Grand ballroom at Royal Phuket City"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[4].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[4].desc}
              </p>
            </div>

            {/* Ample Parking */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden bg-[#8B7355]/10 flex items-center justify-center">
                <svg className="w-16 h-16 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[5].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[5].desc}
              </p>
            </div>

            {/* Certified Excellence */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden flex items-center justify-center bg-[--color-surface] p-4">
                <Image
                  src="/images/certificates.png"
                  alt="TCEB and Tourism Certifications"
                  width={300}
                  height={100}
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[6].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[6].desc}
              </p>
            </div>

            {/* Sustainability Certified */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[7].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[7].desc}
              </p>
            </div>

            {/* 27 Years Wedding Experience */}
            <div className="border border-gray-200 p-6 group hover:border-[#8B7355] transition-colors bg-white hover:shadow-lg">
              <div className="relative aspect-video mb-5 overflow-hidden bg-gradient-to-br from-[#8B7355]/10 to-[#8B7355]/5 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-heading text-5xl text-[#8B7355]">27</span>
                  <span className="block text-[#8B7355] text-sm uppercase tracking-widest mt-1">{t.years}</span>
                </div>
              </div>
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{t.why[8].title}</h3>
              <p className="text-[--color-text-secondary] text-sm leading-relaxed">
                {t.why[8].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Inquiry Form */}
      <WeddingInquiryForm />

      {/* MICE CTA */}
      <section className="relative py-24 md:py-32">
        <Image
          src="/images/HOTEL WEBSITE/Banquet-Royal-Phuket-City-5.jpg"
          alt="Meeting and events venue at Royal Phuket City"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-6">
          <div className="text-center text-white max-w-3xl mx-auto">
            <p className="label-accent text-[#8B7355] mb-4">{t.miceLabel}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
              {t.miceTitle}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {t.miceDesc}
            </p>
            <Link
              href={localizeHref("/meeting-events", locale)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
            >
              {t.miceCta}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
