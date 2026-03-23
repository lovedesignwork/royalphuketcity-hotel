import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ versions: [] });
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("blog_post_versions")
      .select("*")
      .eq("post_id", postId)
      .order("version_number", { ascending: false });

    if (error) {
      console.error("Error fetching versions:", error);
      return NextResponse.json({ versions: [] });
    }

    return NextResponse.json({ versions: data || [] });
  } catch (error) {
    console.error("Error fetching versions:", error);
    return NextResponse.json({ versions: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { post_id, title, content, meta_description, seo_keywords, created_by = "AI" } = body;

    if (!post_id || !title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: existingVersions } = await supabase
      .from("blog_post_versions")
      .select("version_number")
      .eq("post_id", post_id)
      .order("version_number", { ascending: false })
      .limit(1);

    const nextVersion = existingVersions && existingVersions.length > 0
      ? existingVersions[0].version_number + 1
      : 1;

    const { data, error } = await supabase
      .from("blog_post_versions")
      .insert([{
        post_id,
        version_number: nextVersion,
        title,
        content,
        meta_description,
        seo_keywords,
        created_by,
      }])
      .select()
      .single();

    if (error) {
      console.error("Error creating version:", error);
      return NextResponse.json({ error: "Failed to create version" }, { status: 500 });
    }

    return NextResponse.json({ success: true, version: data });
  } catch (error) {
    console.error("Error creating version:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
