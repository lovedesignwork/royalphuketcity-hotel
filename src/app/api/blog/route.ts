import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ posts: [], total: 0 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");

    let query = supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image, meta_description, tags, published_at, word_count, blog_categories(name, slug)", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (category) {
      query = query.eq("blog_categories.slug", category);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Error fetching blog posts:", error);
      return NextResponse.json({ posts: [], total: 0 });
    }

    return NextResponse.json({
      posts: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("Error in blog API:", error);
    return NextResponse.json({ posts: [], total: 0 });
  }
}
