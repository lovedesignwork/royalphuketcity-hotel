import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import { getBlogPath } from "@/lib/blog-path";

export default async function LatestBlogs() {
  const { posts } = await getPublishedPosts(1, 3);
  if (!posts.length) return null;
  return <section className="py-20 bg-[#FAFAFA]" aria-labelledby="latest-guides-title">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
        <div><p className="label-accent text-[#8B7355] mb-3">Stories & Insights</p>
          <h2 id="latest-guides-title" className="font-heading text-3xl md:text-4xl">From the hotel journal</h2></div>
        <Link href="/blog" className="text-[#8B7355] underline underline-offset-4">View all blogs</Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">{posts.map(post => <Link href={getBlogPath(post.slug)} key={post.id} className="group bg-white border border-gray-200">
        {post.featured_image && <div className="relative aspect-[4/3] overflow-hidden"><Image src={post.featured_image} alt={post.featured_image_alt || post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform group-hover:scale-105" /></div>}
        <div className="p-6"><h3 className="font-heading text-2xl mb-3 group-hover:text-[#8B7355]">{post.title}</h3><p className="text-gray-600 line-clamp-3">{post.excerpt}</p></div>
      </Link>)}</div>
    </div>
  </section>;
}
