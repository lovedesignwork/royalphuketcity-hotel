import { NextRequest, NextResponse } from "next/server";
import { getPublishedPosts, parseBlogPage } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseBlogPage(searchParams.get("page"));
  const limit = parseBlogPage(searchParams.get("limit"), 12, 100);
  try {
    const { posts, total } = await getPublishedPosts(page, limit, searchParams.get("category"));
    return NextResponse.json({ posts, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching published articles:", error);
    return NextResponse.json({ error: "Articles are temporarily unavailable" }, { status: 503 });
  }
}
