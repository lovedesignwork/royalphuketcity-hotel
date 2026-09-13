import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Article Preview",
  robots: { index: false, follow: false },
};

export default async function ArticlePreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin } = await client.from("admin_users").select("id").eq("id", user.id).maybeSingle();
  if (!admin) notFound();
  const db = getSupabaseClient();
  if (!db) notFound();
  const { data: post, error } = await db.from("blog_posts").select("title, content, status").eq("id", id).maybeSingle();
  if (error || !post) notFound();
  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between gap-4 rounded-lg bg-amber-50 p-4 text-amber-950">
        <p>Saved article preview · {post.status}</p>
        <Link className="underline" href={`/admin/blog/${id}`}>Back to editor</Link>
      </div>
      <article>
        <h1 className="font-heading mb-8 text-4xl">{post.title}</h1>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
