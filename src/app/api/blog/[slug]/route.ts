import { NextRequest, NextResponse } from "next/server";
import { getPublishedPost } from "@/lib/blog";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // A public preview query parameter must never authorize access to drafts.
    const post = await getPublishedPost(slug);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching published article:", error);
    return NextResponse.json({ error: "Article is temporarily unavailable" }, { status: 503 });
  }
}
