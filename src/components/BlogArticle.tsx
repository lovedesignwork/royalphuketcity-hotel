import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { getBlogPath } from "@/lib/blog-path";
import BlogFeedback from "@/components/BlogFeedback";
import BlogShare from "@/components/BlogShare";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedPost, getPublishedPosts, type BlogPost } from "@/lib/blog";
import { HOTEL_TEAM_AUTHOR, HOTEL_TEAM_PATH } from "@/lib/article-editorial";
import { articleTopic, prepareArticleContent } from "@/lib/article-content";

async function getRelatedPosts(current: BlogPost) {
  const { posts } = await getPublishedPosts(1, 100);
  const topic = articleTopic(current);
  const tags = new Set((current.tags || []).map(tag => tag.toLowerCase()));
  const score = (post: BlogPost) => (articleTopic(post) === topic ? 20 : 0)
    + (post.blog_categories?.slug && post.blog_categories.slug === current.blog_categories?.slug ? 1 : 0)
    + (post.tags || []).filter(tag => tags.has(tag.toLowerCase())).length * 3;
  return posts.filter(post => post.slug !== current.slug).sort((a, b) => score(b) - score(a)).slice(0, 3);
}

export async function generateBlogMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: true } };
  const title = post.title.includes(SITE_CONFIG.name) ? post.title : `${post.title} | ${SITE_CONFIG.name}`;
  const description = post.meta_description || post.excerpt || post.title;
  return {
    title: { absolute: title }, description,
    authors: [{ name: HOTEL_TEAM_AUTHOR.name, url: HOTEL_TEAM_AUTHOR.url }],
    keywords: post.seo_keywords?.join(", "),
    alternates: { canonical: `${SITE_CONFIG.url}${getBlogPath(post.slug)}` },
    openGraph: { title, description, url: `${SITE_CONFIG.url}${getBlogPath(post.slug)}`, siteName: SITE_CONFIG.name,
      images: post.featured_image ? [{ url: post.featured_image, alt: post.featured_image_alt || post.title }] : [], locale: "en_US", type: "article" },
    twitter: { card: "summary_large_image", title, description, images: post.featured_image ? [post.featured_image] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const relatedPosts = await getRelatedPosts(post);
  const { html, headings } = prepareArticleContent(post.content);
  const url = `${SITE_CONFIG.url}${getBlogPath(post.slug)}`;
  return <div className="bg-white">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: post.title,
      description: post.meta_description || post.excerpt, image: post.featured_image ? new URL(post.featured_image, SITE_CONFIG.url).href : undefined,
      author: HOTEL_TEAM_AUTHOR, publisher: { "@type": "Organization", name: SITE_CONFIG.name,
        logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/images/rpc-icon-512.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": url }, wordCount: post.word_count, keywords: post.seo_keywords?.join(", ") }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_CONFIG.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ] }} />
    <article>
      <header className="container mx-auto px-6 pt-10 md:pt-16 pb-8 md:pb-10">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-[#6B6B6B] mb-7 flex gap-2">
            <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">/</span><Link href="/blog" className="hover:underline">Blog</Link>
          </nav>
          <p className="label-accent text-[#8B7355] mb-4">{post.blog_categories?.name || "Stories & Insights"}</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-[#1A1A1A] mb-6">{post.title}</h1>
          {post.excerpt && <p className="text-lg md:text-xl leading-relaxed text-[#6B6B6B] mb-6">{post.excerpt}</p>}
          <Link href={HOTEL_TEAM_PATH} className="text-sm text-[#705C42] underline underline-offset-4">By {HOTEL_TEAM_AUTHOR.name}</Link>
        </div>
      </header>
      {post.featured_image && <figure className="container mx-auto px-6 max-w-6xl">
        <div className="relative aspect-[3/2] md:aspect-[16/9] overflow-hidden bg-[#FAFAFA]">
          <Image src={post.featured_image} alt={post.featured_image_alt || post.title} fill priority fetchPriority="high"
            sizes="(max-width: 1152px) calc(100vw - 48px), 1104px" className="object-cover" />
        </div>
      </figure>}
      <div className="container mx-auto px-6 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {headings.length > 0 && <details className="article-contents mb-10 border-y border-[#E8E5E0] py-5">
            <summary className="cursor-pointer text-[#705C42] font-medium">In this article</summary>
            <nav aria-label="Table of contents"><ol className="grid gap-3 mt-5 text-sm list-decimal pl-5">{headings.map(heading =>
              <li key={heading.id}><a href={`#${heading.id}`} className="text-[#555] hover:text-[#705C42] underline-offset-4 hover:underline">{heading.title}</a></li>)}</ol></nav>
          </details>}
          <div className="blog-prose text-base md:text-lg" dangerouslySetInnerHTML={{ __html: html }} />
          <BlogFeedback slug={post.slug} />
          <div className="mt-12 pt-7 border-t border-[#E8E5E0] flex flex-wrap items-center justify-between gap-6">
            <Link href="/blog" className="text-[#705C42] underline underline-offset-4">Back to all articles</Link>
            <BlogShare title={post.title} url={url} />
          </div>
        </div>
      </div>
    </article>
    {relatedPosts.length > 0 && <section className="py-14 md:py-20 bg-[#FAFAFA]" aria-labelledby="related-articles-title">
      <div className="container mx-auto px-6">
        <p className="label-accent text-[#8B7355] mb-3">Continue exploring</p>
        <h2 id="related-articles-title" className="font-heading text-3xl md:text-4xl mb-9">Related articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{relatedPosts.map(related => <Link key={related.id} href={getBlogPath(related.slug)} className="group block bg-white border border-[#E8E5E0]">
          {related.featured_image && <div className="relative aspect-[16/10] overflow-hidden"><Image src={related.featured_image} alt={related.featured_image_alt || related.title} fill
            sizes="(max-width: 768px) calc(100vw - 48px), 33vw" className="object-cover transition-transform group-hover:scale-105" /></div>}
          <div className="p-6"><h3 className="font-heading text-2xl leading-tight group-hover:text-[#705C42]">{related.title}</h3></div>
        </Link>)}</div>
      </div>
    </section>}
  </div>;
}
