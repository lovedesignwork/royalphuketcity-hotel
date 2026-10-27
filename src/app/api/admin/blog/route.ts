import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { countArticleWords } from "@/lib/article-content";
import { validateBlogPublication } from "@/lib/blog-publication";
import { isBlogSlugAvailable } from "@/lib/blog-path";

async function publicationError(post: Parameters<typeof validateBlogPublication>[0]) {
  const db = getSupabaseClient();
  if (!db) throw new Error("Database not configured");
  const others = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from("blog_posts").select("id, slug, content, featured_image").range(from, from + 999);
    if (error) throw new Error("Unable to verify image ownership");
    others.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return validateBlogPublication(post, others);
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ posts: [], total: 0 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    let query = supabase
      .from("blog_posts")
      .select("*, blog_categories(name, slug)", { count: "exact" })
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (category) {
      query = query.eq("category_id", category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
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

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      featured_image_alt,
      meta_description,
      seo_keywords,
      focus_keyword,
      tags,
      category_id,
      status = "draft",
      tone,
      target_audience,
      seo_score,
      scheduled_at,
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const postSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!isBlogSlugAvailable(postSlug)) return NextResponse.json({ error: "Choose a descriptive article slug that does not use an existing service route." }, { status: 400 });
    if (status === "published") {
      const error = await publicationError({ ...body, slug: postSlug });
      if (error) return NextResponse.json({ error }, { status: 400 });
    }

    const postData = {
      title,
      slug: postSlug,
      excerpt,
      content,
      featured_image,
      featured_image_alt,
      meta_description,
      seo_keywords,
      focus_keyword,
      tags,
      category_id: category_id || null,
      status,
      tone,
      target_audience,
      word_count: countArticleWords(content),
      seo_score,
      published_at: status === "published" ? new Date().toISOString() : null,
      scheduled_at: scheduled_at || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      if (error.code === "23505") {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
      }
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const { data: existing, error: readError } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
    if (readError || !existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    if (updates.slug && updates.slug !== existing.slug && !isBlogSlugAvailable(updates.slug)) return NextResponse.json({ error: "This slug is reserved for an existing page." }, { status: 400 });
    const candidate = { ...existing, ...updates, id };
    if (candidate.status === "published") {
      const error = await publicationError(candidate);
      if (error) return NextResponse.json({ error }, { status: 400 });
    }
    updates.updated_at = new Date().toISOString();
    // Editing an article must not move it back to the top of the homepage.
    updates.published_at = existing.published_at || (candidate.status === "published" ? new Date().toISOString() : null);
    if (typeof updates.content === "string") updates.word_count = countArticleWords(updates.content);

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
