import { cache } from "react";
import { getSupabaseClient } from "@/lib/supabase";

export interface BlogPost {
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
  updated_at?: string;
  word_count?: number;
  blog_categories?: { id: string; name: string; slug: string };
}

const postFields = "id, title, slug, excerpt, content, featured_image, featured_image_alt, meta_description, seo_keywords, tags, published_at, updated_at, word_count, blog_categories(id, name, slug)";
const summaryFields = "id, title, slug, excerpt, featured_image, featured_image_alt, meta_description, tags, published_at, updated_at, word_count, blog_categories(id, name, slug)";

export function parseBlogPage(value: string | null | undefined, fallback = 1, max = 10000) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
}

// Reading directly on the server avoids a self-fetch to the wrong deployment.
export async function getPublishedPosts(page = 1, limit = 12, category?: string | null) {
  const supabase = getSupabaseClient();
  if (!supabase) return { posts: [] as BlogPost[], total: 0 };
  const safePage = parseBlogPage(String(page));
  const safeLimit = parseBlogPage(String(limit), 12, 100);
  let query = supabase.from("blog_posts")
    .select(category ? summaryFields.replace("blog_categories(", "blog_categories!inner(") : summaryFields, { count: "exact" })
    .eq("status", "published")
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .order("published_at", { ascending: false })
    .order("id", { ascending: false });
  if (category) query = query.eq("blog_categories.slug", category);
  const from = (safePage - 1) * safeLimit;
  const { data, error, count } = await query.range(from, from + safeLimit - 1);
  if (error) throw new Error("Unable to load published articles", { cause: error });
  return { posts: (data || []) as unknown as BlogPost[], total: count || 0 };
}

export const getPublishedPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("blog_posts")
    .select(postFields).eq("slug", slug).eq("status", "published")
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .maybeSingle();
  if (error) throw new Error("Unable to load article", { cause: error });
  return data as unknown as BlogPost | null;
});

export async function getPublishedPostSitemapEntries() {
  const supabase = getSupabaseClient();
  const entries: { slug: string; updated_at?: string; published_at?: string }[] = [];
  if (!supabase) return entries;
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from("blog_posts")
      .select("slug, updated_at, published_at").eq("status", "published")
      .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
      .order("slug").range(from, from + 999);
    if (error) throw new Error("Unable to load article sitemap", { cause: error });
    entries.push(...(data || []));
    if (!data || data.length < 1000) return entries;
  }
}
