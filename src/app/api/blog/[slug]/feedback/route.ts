import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getPublishedPost } from "@/lib/blog";
import { getSupabaseClient } from "@/lib/supabase";

const cookieName = "rpc_article_vote";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const recent = new Map<string, { at: number; requests: number }>();
type Context = { params: Promise<{ slug: string }> };

function voterHash(articleId: string, voter: string) {
  return createHash("sha256").update(`${articleId}:${voter}`).digest("hex");
}

export async function GET(request: NextRequest, { params }: Context) {
  const post = await getPublishedPost((await params).slug);
  if (!post) return NextResponse.json({ error: "Article not found" }, { status: 404 });
  const db = getSupabaseClient();
  if (!db) return NextResponse.json({ error: "Feedback unavailable" }, { status: 503 });
  const voter = request.cookies.get(cookieName)?.value;
  const [likes, dislikes, own] = await Promise.all([
    db.from("article_feedback").select("vote", { count: "exact", head: true }).eq("article_id", post.id).eq("vote", 1),
    db.from("article_feedback").select("vote", { count: "exact", head: true }).eq("article_id", post.id).eq("vote", -1),
    voter && uuid.test(voter)
      ? db.from("article_feedback").select("vote").eq("article_id", post.id).eq("voter_hash", voterHash(post.id, voter)).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ]);
  if (likes.error || dislikes.error || own.error) return NextResponse.json({ error: "Feedback unavailable" }, { status: 503 });
  return NextResponse.json({ likes: likes.count, dislikes: dislikes.count, vote: own.data?.vote ?? null }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: NextRequest, { params }: Context) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 512) return NextResponse.json({ error: "Invalid vote" }, { status: 413 });
  const body = await request.json().catch(() => null);
  if (!body || (body.vote !== 1 && body.vote !== -1)) return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  for (const [hash, value] of recent) if (now - value.at > 60000) recent.delete(hash);
  const hits = recent.get(key) ?? { at: now, requests: 0 };
  if (hits.requests >= 10 || recent.size >= 10000) return NextResponse.json({ error: "Please try again shortly" }, { status: 429 });
  hits.requests++; recent.set(key, hits);
  const post = await getPublishedPost((await params).slug);
  if (!post) return NextResponse.json({ error: "Article not found" }, { status: 404 });
  const db = getSupabaseClient();
  if (!db) return NextResponse.json({ error: "Feedback unavailable" }, { status: 503 });
  const existing = request.cookies.get(cookieName)?.value;
  const voter = existing && uuid.test(existing) ? existing : randomUUID();
  const hash = voterHash(post.id, voter);
  const { error } = await db.from("article_feedback").upsert({ article_id: post.id, voter_hash: hash, vote: body.vote, updated_at: new Date().toISOString() }, { onConflict: "article_id,voter_hash" });
  if (error) return NextResponse.json({ error: "Unable to save your vote" }, { status: 503 });
  const response = NextResponse.json({ vote: body.vote }, { headers: { "Cache-Control": "private, no-store" } });
  response.cookies.set(cookieName, voter, { httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax", path: "/", maxAge: 31536000 });
  return response;
}
