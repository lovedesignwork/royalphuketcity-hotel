import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { HeroSection } from "@/components";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  featured_image_alt?: string;
  meta_description?: string;
  seo_keywords?: string[];
  tags?: string[];
  published_at?: string;
  word_count?: number;
  author?: string;
  blog_categories?: { id: string; name: string; slug: string };
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  blog_categories?: { name: string; slug: string };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/${slug}?preview=true`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.post;
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<RelatedPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog?limit=3`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts.filter((p: RelatedPost) => p.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Royal Phuket City Hotel",
    };
  }

  return {
    title: `${post.title} | Royal Phuket City Hotel`,
    description: post.meta_description || post.excerpt || post.title,
    keywords: post.seo_keywords?.join(", "),
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Royal Phuket City Hotel`,
      description: post.meta_description || post.excerpt || post.title,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      siteName: SITE_CONFIG.name,
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: post.featured_image_alt || post.title,
            },
          ]
        : [],
      locale: "en_US",
      type: "article",
      publishedTime: post.published_at,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Royal Phuket City Hotel`,
      description: post.meta_description || post.excerpt || post.title,
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

function ArticleJsonLd({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      "@type": "Organization",
      name: "Royal Phuket City Hotel",
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Royal Phuket City Hotel",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    wordCount: post.word_count,
    keywords: post.seo_keywords?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug);
  const readingTime = post.word_count ? Math.ceil(post.word_count / 200) : 3;

  return (
    <main>
      <ArticleJsonLd post={post} />

      {/* Hero Section */}
      <HeroSection
        title={post.title}
        subtitle={post.blog_categories?.name || "Blog"}
        image={post.featured_image || "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=2070&auto=format&fit=crop"}
        height="medium"
      />

      {/* Article Meta */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-[--color-text-secondary]">
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
              {post.word_count && (
                <>
                  <span className="w-1 h-1 bg-[--color-accent] rounded-full" />
                  <span>{post.word_count.toLocaleString()} words</span>
                </>
              )}
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[--color-accent] hover:text-[--color-accent-hover] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="mb-12 pb-12 border-b border-gray-200">
                <p className="text-xl md:text-2xl text-[--color-text-secondary] leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none 
                prose-headings:font-heading 
                prose-headings:text-[--color-text-primary] 
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-[--color-text-secondary] prose-p:leading-relaxed
                prose-a:text-[--color-accent] prose-a:no-underline hover:prose-a:underline 
                prose-img:rounded-none prose-img:my-8
                prose-strong:text-[--color-text-primary]
                prose-blockquote:border-l-[--color-accent] prose-blockquote:bg-[--color-surface] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                prose-ul:text-[--color-text-secondary]
                prose-ol:text-[--color-text-secondary]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="label-accent text-[--color-accent] mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-[--color-surface] text-[--color-text-secondary] text-sm hover:bg-[#8B7355]/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author & Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#8B7355] flex items-center justify-center">
                    <span className="text-white font-heading text-xl">R</span>
                  </div>
                  <div>
                    <p className="font-heading text-lg text-[--color-text-primary]">
                      Royal Phuket City Hotel
                    </p>
                    <p className="text-sm text-[--color-text-secondary]">
                      Your home in Phuket Old Town
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[--color-text-secondary]">Share:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        `${SITE_CONFIG.url}/blog/${post.slug}`
                      )}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-[#8B7355] hover:text-[#8B7355] transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `${SITE_CONFIG.url}/blog/${post.slug}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-[#8B7355] hover:text-[#8B7355] transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 36.6 36.6 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        `${SITE_CONFIG.url}/blog/${post.slug}`
                      )}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-[#8B7355] hover:text-[#8B7355] transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 md:py-28 bg-[--color-surface]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="label-accent text-[--color-accent] mb-4">Continue Reading</p>
              <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group block">
                  <article className="h-full border border-gray-200 hover:border-[#8B7355] transition-colors hover:shadow-lg bg-white">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {relatedPost.featured_image ? (
                        <Image
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#8B7355]/20 to-[#8B7355]/5 flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-[#8B7355]/30"
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
                    <div className="p-6">
                      <h3 className="font-heading text-lg text-[--color-text-primary] group-hover:text-[--color-accent] transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <span className="text-sm text-[--color-text-secondary]">
                        {relatedPost.published_at
                          ? new Date(relatedPost.published_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#8B7355]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/60 uppercase tracking-widest text-sm mb-4">
            Experience Phuket
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Plan Your Stay With Us
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Discover the charm of Phuket Old Town at Royal Phuket City Hotel.
            Book your stay today and experience the best of southern Thailand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms-suites"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#8B7355] font-medium tracking-wide uppercase text-sm hover:bg-white/90 transition-colors"
            >
              View Rooms
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white font-medium tracking-wide uppercase text-sm hover:bg-white/10 transition-colors"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
