import { Metadata } from "next";
import Image from "next/image";
import { HeroSection, SectionHeading } from "@/components";
import ArtworkMasonry from "@/components/ArtworkMasonry";
import { SITE_CONFIG } from "@/lib/constants";
import { getArtistPageCopy, getLocalizedArtists } from "@/lib/i18n/artist-copy";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeHref } from "@/lib/i18n/path";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getArtistPageCopy(locale);
  const path = localizeHref("/artist", locale);
  const siteName = locale === "th" ? "โรงแรมรอยัล ภูเก็ต ซิตี้" : "Royal Phuket City Hotel";
  return {
    title: `${t.metaTitle} | ${siteName}`,
    description: t.metaDesc,
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/artist`,
        th: `${SITE_CONFIG.url}/th/artist`,
      },
    },
    openGraph: {
      title: `${t.metaTitle} | ${siteName}`,
      description: t.ogDesc,
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
      title: `${t.metaTitle} | ${siteName}`,
      description: t.ogDesc,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function ArtistPage() {
  const locale = await getLocale();
  const t = getArtistPageCopy(locale);
  const artists = getLocalizedArtists(locale);

  return (
    <main>
      <HeroSection
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
        image="/images/HOTEL WEBSITE/RPC-Main-Image.jpg"
        height="medium"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading label={t.label} title={t.title} />
            <p className="text-[--color-text-secondary] text-lg leading-relaxed">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {artists.map((artist, index) => (
              <article key={artist.id} className="py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center mb-12 md:mb-16">
                  <div className="lg:col-span-2">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[--color-surface]">
                      <Image
                        src={artist.portrait}
                        alt={t.portraitAlt(artist.name)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <span className="label-accent text-[--color-accent] block mb-3 tracking-[0.2em]">
                      {t.artistLabel}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-2">
                      {artist.name}
                    </h2>
                    {artist.nameSecondary && (
                      <p className="text-[--color-text-secondary] text-lg mb-4">
                        {artist.nameSecondary}
                      </p>
                    )}
                    <p className="text-sm uppercase tracking-[0.15em] text-[--color-accent] mb-5">
                      {artist.specialty}
                    </p>
                    <p className="text-[--color-text-secondary] text-base md:text-lg leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-xl md:text-2xl mb-6 text-center">
                    {t.selectedWorks}
                  </h3>
                  <ArtworkMasonry
                    works={artist.works}
                    artistName={artist.name}
                    showCaptions={artist.showCaptions}
                  />
                </div>

                {index < artists.length - 1 && (
                  <div className="mt-16 md:mt-20 flex items-center justify-center">
                    <div className="h-px bg-[#8B7355]/30 flex-1 max-w-[160px]" />
                    <span className="mx-6 text-[#8B7355]/60 text-xs tracking-[0.3em] uppercase">
                      ◆
                    </span>
                    <div className="h-px bg-[#8B7355]/30 flex-1 max-w-[160px]" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
