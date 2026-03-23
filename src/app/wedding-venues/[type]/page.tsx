import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection, SectionHeading } from "@/components";
import { WEDDING_TYPES, WEDDING_TYPE_SLUGS } from "@/lib/wedding-types-data";
import { SITE_CONFIG } from "@/lib/constants";
import WeddingInquiryForm from "@/components/WeddingInquiryForm";

export async function generateStaticParams() {
  return WEDDING_TYPE_SLUGS.map((type) => ({
    type,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const weddingType = WEDDING_TYPES[type];

  if (!weddingType) {
    return {
      title: "Wedding Type Not Found | Royal Phuket City Hotel",
    };
  }

  return {
    title: `${weddingType.title} in Phuket | Royal Phuket City Hotel`,
    description: weddingType.metaDescription,
    keywords: weddingType.seoKeywords.join(", "),
    alternates: {
      canonical: `${SITE_CONFIG.url}/wedding-venues/${weddingType.slug}`,
    },
    openGraph: {
      title: `${weddingType.title} in Phuket | Royal Phuket City Hotel`,
      description: weddingType.metaDescription,
      url: `${SITE_CONFIG.url}/wedding-venues/${weddingType.slug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: weddingType.heroImage,
          width: 1200,
          height: 630,
          alt: weddingType.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function WeddingTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const weddingType = WEDDING_TYPES[type];

  if (!weddingType) {
    notFound();
  }

  const otherWeddingTypes = WEDDING_TYPE_SLUGS.filter((t) => t !== type).slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title={weddingType.title}
        subtitle={weddingType.subtitle}
        description="at Royal Phuket City Hotel"
        image={weddingType.heroImage}
        height="large"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="label-accent text-[--color-accent] mb-4">Your Dream {weddingType.title}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary] mb-6">
                {weddingType.subtitle}
              </h2>
            </div>
            <div className="space-y-6">
              {weddingType.description.map((paragraph, index) => (
                <p key={index} className="text-[--color-text-secondary] leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="outline outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={weddingType.traditions[0]?.image || weddingType.heroImage}
                  alt={`${weddingType.title} at Royal Phuket City Hotel`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div>
                <p className="label-accent text-[--color-accent] mb-3">Why Choose Us</p>
                <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary] mb-6">
                  What We Offer
                </h2>
                <ul className="space-y-4">
                  {weddingType.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[--color-text-secondary]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditions & Ceremonies */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Traditions & Ceremonies"
            title={`${weddingType.title} Traditions`}
            subtitle="Experience the meaningful rituals and customs that make your celebration special."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weddingType.traditions.map((tradition, index) => (
              <article key={index} className="group">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={tradition.image}
                    alt={tradition.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{tradition.title}</h3>
                <p className="text-[--color-text-secondary] text-sm leading-relaxed">{tradition.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Gallery"
            title="Captured Moments"
            subtitle="See the beauty of celebrations we've hosted."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {weddingType.gallery.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden group">
                <Image
                  src={image}
                  alt={`${weddingType.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src={weddingType.heroImage}
          alt={weddingType.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-6 text-center">
          <p className="text-[#8B7355] uppercase tracking-widest text-sm mb-4">Start Planning</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Ready to Plan Your {weddingType.title}?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Our dedicated wedding specialists are ready to help you create the perfect celebration.
            Contact us today to begin your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#wedding-inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
            >
              Inquire Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <Link
              href="/wedding-venues"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white font-medium tracking-wide uppercase text-sm hover:bg-white/10 transition-colors"
            >
              View All Wedding Types
            </Link>
          </div>
        </div>
      </section>

      {/* Wedding Inquiry Form */}
      <WeddingInquiryForm />

      {/* Other Wedding Types */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Explore More"
            title="Other Wedding Ceremonies"
            subtitle="Discover more wedding styles we offer."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherWeddingTypes.map((slug) => {
              const otherType = WEDDING_TYPES[slug];
              return (
                <Link key={slug} href={`/wedding-venues/${slug}`} className="group block">
                  <article className="relative overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={otherType.heroImage}
                        alt={otherType.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-heading text-xl md:text-2xl mb-2">{otherType.title}</h3>
                        <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                          Learn More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Keywords Section (Hidden visually but good for SEO) */}
      <section className="sr-only">
        <h2>Related Keywords</h2>
        <ul>
          {weddingType.seoKeywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
