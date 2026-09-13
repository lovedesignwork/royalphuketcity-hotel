import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { HeroSection, SectionHeading } from "@/components";
import { notFound } from "next/navigation";
import { getPublishedPosts, parseBlogPage, type BlogPost } from "@/lib/blog";

const blogMetadata: Metadata = {
  title: "Phuket Travel Guides & Hotel News",
  description:
    "Explore travel tips, local attractions, hotel news, and insider guides to Phuket Old Town from Royal Phuket City Hotel.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: "Blog | Royal Phuket City Hotel",
    description:
      "Explore travel tips, local attractions, hotel news, and insider guides to Phuket Old Town.",
    url: `${SITE_CONFIG.url}/blog`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
};

type BlogPageProps = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const page = parseBlogPage((await searchParams).page);
  const url = `${SITE_CONFIG.url}/blog${page > 1 ? `?page=${page}` : ""}`;
  const title = `Phuket Travel Guides & Hotel News${page > 1 ? ` | Page ${page}` : ""}`;
  return {
    ...blogMetadata,
    title,
    alternates: { canonical: url },
    openGraph: { ...blogMetadata.openGraph, title, url, images: [SITE_CONFIG.ogImage] },
    twitter: { card: "summary_large_image", title, description: String(blogMetadata.description), images: [SITE_CONFIG.ogImage] },
  };
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const readingTime = post.word_count ? Math.ceil(post.word_count / 200) : 3;

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            {post.featured_image ? (
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#8B7355]/20 to-[#8B7355]/5 flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-[#8B7355]/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div>
            {post.blog_categories && (
              <span className="label-accent text-[--color-accent] mb-4 block">
                {post.blog_categories.name}
              </span>
            )}
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-[--color-text-primary] group-hover:text-[--color-accent] transition-colors mb-4">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-[--color-text-secondary] leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-[--color-text-secondary]">
              <span>
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </span>
              <span className="w-1 h-1 bg-[--color-accent] rounded-full" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full border border-gray-200 hover:border-[#8B7355] transition-colors hover:shadow-lg bg-white">
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#8B7355]/20 to-[#8B7355]/5 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-[#8B7355]/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          )}
          {post.blog_categories && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-white text-xs font-medium tracking-wider uppercase text-[#8B7355]">
              {post.blog_categories.name}
            </span>
          )}
        </div>
        <div className="p-6">
          <h2 className="font-heading text-xl text-[--color-text-primary] group-hover:text-[--color-accent] transition-colors line-clamp-2 mb-3">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-[--color-text-secondary] text-sm line-clamp-3 mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-[--color-text-secondary]">
            <span>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseBlogPage((await searchParams).page);
  const { posts, total } = await getPublishedPosts(page, 12);
  if (page > 1 && posts.length === 0) notFound();
  const totalPages = Math.ceil(total / 12);
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts.slice(1);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Stories & Insights"
        subtitle="Our Blog"
        description="Travel tips, local guides, and stories from Royal Phuket City Hotel"
        image="/images/HOTEL WEBSITE/HKT Old Town.jpg"
        height="medium"
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <SectionHeading
              label="Latest Article"
              title="Featured Story"
            />
            <div className="outline outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12">
              <BlogCard post={featuredPost} featured />
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Explore Our Content"
            title="All Articles"
            subtitle="Discover travel tips, local attractions, and insider guides to make the most of your Phuket experience."
          />
          {remainingPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[#8B7355]/10 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-[#8B7355]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-2xl text-[--color-text-primary] mb-2">
                Coming Soon
              </h2>
              <p className="text-[--color-text-secondary] max-w-md mx-auto">
                We&apos;re working on exciting content for you. Check back soon for
                travel tips, local guides, and stories from Phuket Old Town.
              </p>
            </div>
          ) : null}
          {totalPages > 1 && (
            <nav aria-label="Article pagination" className="mt-12 flex items-center justify-center gap-6">
              {page > 1 && <Link rel="prev" className="underline underline-offset-4" href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}>Previous articles</Link>}
              <span>Page {page} of {totalPages}</span>
              {page < totalPages && <Link rel="next" className="underline underline-offset-4" href={`/blog?page=${page + 1}`}>Next articles</Link>}
            </nav>
          )}
        </div>
      </section>

      {/* Link to current offers; no newsletter service is configured. */}
      <section className="py-20 md:py-28 bg-[#8B7355]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/60 uppercase tracking-widest text-sm mb-4">
              Stay Connected
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Discover Our Latest Offers
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Explore current room packages, dining offers, and experiences at Royal Phuket City Hotel.
            </p>
            <Link href="/promotions" className="inline-flex px-8 py-4 bg-white text-[#8B7355] font-medium tracking-wider uppercase text-sm hover:bg-white/90 transition-colors">
              View Current Offers
            </Link>
          </div>
        </div>
      </section>

      {/* Explore CTA */}
      <section className="relative py-24 md:py-32">
        <Image
          src="/images/HOTEL WEBSITE/RPC-Main-Image.jpg"
          alt="Royal Phuket City Hotel"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-6">
          <div className="text-center text-white max-w-3xl mx-auto">
            <p className="label-accent text-[#8B7355] mb-4">Experience Phuket</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
              Plan Your Stay With Us
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Discover the charm of Phuket Old Town at Royal Phuket City Hotel. From comfortable rooms to exceptional dining, we offer everything for an unforgettable experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rooms-suites"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
              >
                View Rooms
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white font-medium tracking-wide uppercase text-sm hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
