import { notFound, permanentRedirect } from "next/navigation";
import BlogArticle, { generateBlogMetadata } from "@/components/BlogArticle";
import { getPublishedPost } from "@/lib/blog";
import { getBlogPath } from "@/lib/blog-path";

type Props = { params: Promise<{ slug: string }> };
export const generateMetadata = generateBlogMetadata;
export default async function LegacyBlogPage({ params }: Props) {
  const { slug } = await params;
  if (!await getPublishedPost(slug)) notFound();
  const path = getBlogPath(slug);
  if (!path.startsWith("/blog/")) permanentRedirect(path);
  return <BlogArticle params={params} />;
}
