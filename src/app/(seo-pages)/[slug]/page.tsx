import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SEO_PAGES, SEO_PAGE_SLUGS, SeoPageData } from "@/lib/seo-pages-data";
import HeroSection from "@/components/HeroSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEO_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = SEO_PAGES[slug];

  if (!pageData) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${pageData.title} | Royal Phuket City Hotel`,
    description: pageData.metaDescription,
    keywords: pageData.seoKeywords.join(", "),
    openGraph: {
      title: `${pageData.title} | Royal Phuket City Hotel`,
      description: pageData.metaDescription,
      images: [pageData.heroImage],
    },
  };
}

function getCategoryLabel(category: SeoPageData["category"]) {
  const labels = {
    hotel: "Accommodation",
    attractions: "Phuket Attractions",
    wedding: "Weddings",
    mice: "MICE & Events",
    dining: "Dining",
  };
  return labels[category];
}

function getCategoryColor() {
  return "bg-[#8B7355]";
}

export default async function SeoPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = SEO_PAGES[slug];

  if (!pageData) {
    notFound();
  }

  const relatedPages = pageData.relatedPages
    .map((relSlug) => SEO_PAGES[relSlug])
    .filter(Boolean);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title={pageData.title}
        subtitle={pageData.subtitle}
        image={pageData.heroImage}
        height="medium"
      />

      {/* Category Badge */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <span className="inline-block px-4 py-1.5 text-xs tracking-widest uppercase text-white bg-[#8B7355]">
            {getCategoryLabel(pageData.category)}
          </span>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {pageData.content.intro.map((paragraph, index) => (
              <p
                key={index}
                className={`text-lg leading-relaxed text-[--color-text-secondary] ${
                  index < pageData.content.intro.length - 1 ? "mb-6" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Only for hotel pages */}
      {pageData.content.features && pageData.category === "hotel" && (
        <section className="py-16 md:py-20 bg-[--color-surface]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
                What We Offer
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
                Key Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {pageData.content.features.map((feature, index) => (
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
      )}

      {/* Location Section - For attraction pages */}
      {pageData.content.locationSection && (
        <section className="py-16 md:py-20 bg-[--color-surface]">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Content */}
                <div>
                  <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
                    {pageData.content.locationSection.subtitle}
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary] mb-6">
                    {pageData.content.locationSection.title}
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    {pageData.content.locationSection.description.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-[--color-text-secondary] leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-6 p-4 bg-white border border-gray-200">
                    <svg
                      className="w-6 h-6 text-[#8B7355] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span className="text-[--color-text-primary] font-medium">
                      {pageData.content.locationSection.walkingTime}
                    </span>
                  </div>
                </div>

                {/* Right - Highlights Card */}
                <div className="bg-white border-2 border-[#8B7355] p-6 md:p-8">
                  <h3 className="font-heading text-xl text-[--color-text-primary] mb-6">
                    Why Stay at Royal Phuket City
                  </h3>
                  <div className="space-y-4">
                    {pageData.content.locationSection.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-0.5"
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
                        <span className="text-[--color-text-secondary] text-sm">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/rooms-suites"
                    className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 bg-[#8B7355] text-white font-medium tracking-[0.15em] uppercase text-xs hover:bg-[#7a6349] transition-colors"
                  >
                    Book Your Stay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Highlights Section */}
      {pageData.content.highlights && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="outline outline-[12px] outline-white border-2 border-[#8B7355] bg-[--color-surface] p-8 md:p-12">
                <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4 text-center">
                  Highlights
                </p>
                <h2 className="font-heading text-2xl md:text-3xl text-[--color-text-primary] text-center mb-8">
                  What You&apos;ll Love
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pageData.content.highlights.map((highlight, index) => (
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
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-[#8B7355]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            {pageData.content.callToAction.title}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {pageData.content.callToAction.description}
          </p>
          <Link
            href={pageData.content.callToAction.buttonLink}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#8B7355] font-medium tracking-[0.15em] uppercase text-sm hover:bg-gray-100 transition-colors"
          >
            {pageData.content.callToAction.buttonText}
          </Link>
        </div>
      </section>

      {/* Related Pages */}
      {relatedPages.length > 0 && (
        <section className="py-16 md:py-20 bg-[--color-surface]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
                Explore More
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
                Related Pages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPages.slice(0, 4).map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group block"
                >
                  <article className="relative h-full overflow-hidden bg-white border border-gray-200 hover:border-[#8B7355] hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={page.heroImage}
                        alt={page.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-3 py-1 text-[10px] tracking-widest uppercase text-[#8B7355] border border-[#8B7355] mb-3">
                        {getCategoryLabel(page.category)}
                      </span>
                      <h3 className="font-heading text-lg text-[--color-text-primary] mb-2 group-hover:text-[#8B7355] transition-colors line-clamp-2">
                        {page.title}
                      </h3>
                      <p className="text-sm text-[--color-text-secondary] line-clamp-2 mb-4">
                        {page.subtitle}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                        Learn More
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Keywords (Hidden) */}
      <div className="sr-only" aria-hidden="true">
        <h2>Related Keywords</h2>
        <ul>
          {pageData.seoKeywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
