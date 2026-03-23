import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { slug } = await params;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*, blog_categories(id, name, slug)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Only return published posts on public API (or drafts for preview)
    if (data.status !== "published") {
      // Allow preview mode by checking for preview param
      const { searchParams } = new URL(request.url);
      if (!searchParams.get("preview")) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
