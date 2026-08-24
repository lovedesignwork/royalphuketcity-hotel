import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MICE_EVENT_TYPE_SLUGS } from "@/lib/mice-event-types-data";
import HeroSection from "@/components/HeroSection";
import EventInquiryForm from "@/components/EventInquiryForm";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeHref } from "@/lib/i18n/path";
import { getLocalizedMiceType, getMeetingPageCopy } from "@/lib/i18n/meeting-copy";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return MICE_EVENT_TYPE_SLUGS.map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const locale = await getLocale();
  const eventData = getLocalizedMiceType(type, locale);

  if (!eventData) {
    return {
      title: "Event Not Found",
    };
  }

  const path = localizeHref(`/meeting-events/${eventData.slug}`, locale);

  return {
    title: `${eventData.title} | Royal Phuket City Hotel`,
    description: eventData.metaDescription,
    keywords: eventData.seoKeywords.join(", "),
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/meeting-events/${eventData.slug}`,
        th: `${SITE_CONFIG.url}/th/meeting-events/${eventData.slug}`,
      },
    },
    openGraph: {
      title: `${eventData.title} | Royal Phuket City Hotel`,
      description: eventData.metaDescription,
      images: [eventData.heroImage],
      url: `${SITE_CONFIG.url}${path}`,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
  };
}

export default async function MiceEventTypePage({ params }: PageProps) {
  const { type } = await params;
  const locale = await getLocale();
  const t = getMeetingPageCopy(locale);
  const eventData = getLocalizedMiceType(type, locale);

  if (!eventData) {
    notFound();
  }

  const otherEventTypes = MICE_EVENT_TYPE_SLUGS.filter((slug) => slug !== type)
    .slice(0, 6)
    .map((slug) => getLocalizedMiceType(slug, locale))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title={eventData.title}
        subtitle={eventData.subtitle}
        image={eventData.heroImage}
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4 text-center">
              {eventData.label}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary] text-center mb-10">
              {eventData.title} {locale === "th" ? "ที่โรงแรมรอยัล ภูเก็ต ซิตี้" : "at Royal Phuket City Hotel"}
            </h2>
            
            <div className="space-y-6">
              {eventData.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed text-[--color-text-secondary]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
              {t.provide}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
              {t.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {eventData.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 border border-gray-200 hover:border-[#8B7355] transition-colors"
              >
                <h3 className="font-heading text-lg text-[--color-text-primary] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="outline outline-[4px] md:outline-[8px] lg:outline-[12px] outline-white border-2 border-[#8B7355] bg-[--color-surface] p-8 md:p-12">
              <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4 text-center">
                {t.partner}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl text-[--color-text-primary] text-center mb-8">
                {t.whyHotel}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventData.whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#8B7355] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-[--color-text-secondary]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-20 md:py-28 bg-[#8B7355]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/70 uppercase tracking-widest text-sm mb-4">
            {t.perfectFor}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-10">
            {t.idealTypes}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {eventData.idealFor.map((item, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Options */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
              {t.flexible}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
              {t.venueOptions}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#8B7355] text-white">
                  <th className="text-left py-4 px-6 text-sm font-normal">{t.venue}</th>
                  <th className="text-center py-4 px-6 text-sm font-normal">{t.cap}</th>
                  <th className="text-left py-4 px-6 text-sm font-normal">{t.bestFor}</th>
                </tr>
              </thead>
              <tbody>
                {eventData.venueOptions.map((venue, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-[#faf9f7]"
                    }`}
                  >
                    <td className="py-4 px-6 font-medium text-[--color-text-primary]">
                      {venue.name}
                    </td>
                    <td className="py-4 px-6 text-center text-[--color-text-secondary]">
                      {venue.capacity}
                    </td>
                    <td className="py-4 px-6 text-[--color-text-secondary]">
                      {venue.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link
              href={localizeHref("/meeting-events#floor-plan", locale)}
              className="inline-flex items-center gap-2 text-[--color-accent] hover:underline"
            >
              {t.floorLink}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
              {t.inspiration}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
              {t.gallery}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-px">
            {[
              "/images/HOTEL WEBSITE/MTG_NM_W02_ballroom_banquet_wide.jpg",
              "/images/HOTEL WEBSITE/EVT_CN_L01_concert_stage_crowd_wide.jpg",
              "/images/HOTEL WEBSITE/F45_GA_L01_gala_room_wide.jpg",
              "/images/HOTEL WEBSITE/EVT_SW_L01_workshop_room_wide.jpg",
              "/images/HOTEL WEBSITE/MTG_NM_W04_ballroom_classroom_wide.jpg",
              "/images/HOTEL WEBSITE/F45_CN_L01_concert_wide.jpg",
              "/images/HOTEL WEBSITE/EVT_EX_L01_tradeshow_floor_wide.jpg",
              "/images/HOTEL WEBSITE/MTG_MW_20_standing_ovation_medium.jpg",
              "/images/HOTEL WEBSITE/F45_SW_L01_workshop_wide.jpg",
              "/images/HOTEL WEBSITE/EVT_TS_L01_panel_stage_wide.jpg",
              "/images/HOTEL WEBSITE/F45_EX_L01_tradeshow_wide.jpg",
              "/images/HOTEL WEBSITE/MTG_NM_W03_stage_LED_wide.jpg",
              "/images/HOTEL WEBSITE/EVT_CC_L02_presenter_screen_medium.jpg",
              "/images/HOTEL WEBSITE/F45_GA_L04_gala_table_medium.jpg",
              "/images/HOTEL WEBSITE/MTG_MW_02_audience_stagelevel_medium.jpg",
              "/images/HOTEL WEBSITE/EVT_CN_L02_performer_mic_medium.jpg",
              "/images/HOTEL WEBSITE/F45_CC_L03_audience_closeup.jpg",
              "/images/HOTEL WEBSITE/EVT_EX_L02_booth_interaction_medium.jpg",
              "/images/HOTEL WEBSITE/MTG_NM_M16_floral_centrepiece_medium.jpg",
              "/images/HOTEL WEBSITE/F45_CN_L02_performer_medium.jpg",
              "/images/HOTEL WEBSITE/MTG_MW_07_gala_conversation_closeup.jpg",
              "/images/HOTEL WEBSITE/F45_GA_L02_trophy_handshake_medium.jpg",
              "/images/HOTEL WEBSITE/EVT_SW_L01_workshop_room_wide.jpg",

              "/images/HOTEL WEBSITE/MTG_MW_08_workshop_leanin_closeup.jpg",
              "/images/HOTEL WEBSITE/F45_CN_L03_audience_cheering_closeup.jpg",
            ].map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden group">
                <Image
                  src={image}
                  alt={`${eventData.title} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  quality={100}
                  unoptimized
                />
              </div>
            ))}
          </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src={eventData.heroImage}
          alt={eventData.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-6 text-center">
          <p className="text-[#8B7355] uppercase tracking-widest text-sm mb-4">
            {t.startToday}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            {t.readyHost} {eventData.title}?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {t.readyBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#event-inquiry"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#8B7355] font-medium tracking-[0.15em] uppercase text-sm hover:bg-gray-100 transition-colors"
            >
              {t.request}
            </Link>
            <Link
              href={localizeHref("/meeting-events", locale)}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/30 text-white font-medium tracking-[0.15em] uppercase text-sm hover:bg-white/10 transition-colors"
            >
              {t.viewVenues}
            </Link>
          </div>
        </div>
      </section>

      {/* Event Inquiry Form */}
      <EventInquiryForm />

      {/* Other Event Types */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
              {t.exploreMore}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
              {t.otherTypes}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {otherEventTypes.map((event) => (
              <Link
                key={event.slug}
                href={localizeHref(`/meeting-events/${event.slug}`, locale)}
                className="group block"
              >
                <article className="relative h-full overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={event.heroImage}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">
                        {event.label}
                      </p>
                      <h3 className="font-heading text-2xl md:text-3xl mb-3">
                        {event.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                        {event.subtitle}
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
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={localizeHref("/meeting-events", locale)}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#8B7355] text-white font-medium tracking-[0.15em] uppercase text-sm hover:bg-[#7a6548] transition-colors"
            >
              {t.viewAllTypes}
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Keywords (Hidden) */}
      <div className="sr-only" aria-hidden="true">
        <h2>Related Keywords</h2>
        <ul>
          {eventData.seoKeywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
