import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { HeroSection } from "@/components";
import { getBlogPath } from "@/lib/blog-path";
import BlogFeedback from "@/components/BlogFeedback";
import BlogShare from "@/components/BlogShare";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedPost, getPublishedPosts, type BlogPost } from "@/lib/blog";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  blog_categories?: { name: string; slug: string };
}

async function getRelatedPosts(current: BlogPost): Promise<RelatedPost[]> {
  const { posts } = await getPublishedPosts(1, 100);
  const score = (post: BlogPost) => (post.blog_categories?.slug && post.blog_categories.slug === current.blog_categories?.slug ? 5 : 0)
    + (post.tags || []).filter(tag => current.tags?.includes(tag)).length;
  return posts.filter(post => post.slug !== current.slug).sort((a, b) => score(b) - score(a)).slice(0, 3);
}

export async function generateBlogMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: post.title,
    description: post.meta_description || post.excerpt || post.title,
    keywords: post.seo_keywords?.join(", "),
    alternates: {
      canonical: `${SITE_CONFIG.url}${getBlogPath(post.slug)}`,
    },
    openGraph: {
      title: `${post.title} | Royal Phuket City Hotel`,
      description: post.meta_description || post.excerpt || post.title,
      url: `${SITE_CONFIG.url}${getBlogPath(post.slug)}`,
      siteName: SITE_CONFIG.name,
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              alt: post.featured_image_alt || post.title,
            },
          ]
        : [],
      locale: "en_US",
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
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
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Organization",
      name: "Royal Phuket City Hotel Team",
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Royal Phuket City Hotel",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/rpc-icon-512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}${getBlogPath(post.slug)}`,
    },
    wordCount: post.word_count,
    keywords: post.seo_keywords?.join(", "),
  };

  return <JsonLd data={schema} />;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);
  const readingTime = post.word_count ? Math.ceil(post.word_count / 200) : 3;

  return (
    <div>
      <ArticleJsonLd post={post} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_CONFIG.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_CONFIG.url}${getBlogPath(post.slug)}` },
      ] }} />

      {/* Hero Section */}
      <HeroSection
        title={post.title}
        subtitle={post.blog_categories?.name || "Blog"}
        image={post.featured_image || "/images/HOTEL WEBSITE/HKT Old Town.jpg"}
        imageAlt={post.featured_image_alt || post.title}
        height="medium"
      />

      {/* Article Meta */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-[--color-text-secondary]">
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
              className="blog-prose prose prose-lg max-w-none
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

            <BlogFeedback slug={post.slug} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h2 className="label-accent text-[--color-accent] mb-4">
                  Tags
                </h2>
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
                      Royal Phuket City Hotel Team
                    </p>
                    <p className="text-sm text-[--color-text-secondary]">
                      Your home in Phuket Old Town
                    </p>
                  </div>
                </div>
                <BlogShare title={post.title} url={`${SITE_CONFIG.url}${getBlogPath(post.slug)}`} />
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
                <Link key={relatedPost.id} href={getBlogPath(relatedPost.slug)} className="group block">
                  <article className="h-full border border-gray-200 hover:border-[#8B7355] transition-colors hover:shadow-lg bg-white">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {relatedPost.featured_image ? (
                        <Image
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
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

                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
