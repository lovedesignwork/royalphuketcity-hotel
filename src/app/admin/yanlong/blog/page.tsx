import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
const category = '1a2aa552-ac78-4563-a5b1-6a895e6eeb74';
export default async function YanLongBlogAdmin() {
  const db = getSupabaseClient();
  const result = db ? await db.from('blog_posts').select('id,title,slug,status,word_count').eq('category_id',category).order('created_at',{ascending:false}) : null;
  return <div className="p-6 md:p-8 max-w-6xl mx-auto">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-semibold">Yan Long Blog</h1><p className="text-gray-600 mt-2">Publish directly to yanlongphuket.com through Supabase. No GitHub commit is needed.</p></div><Link href={`/admin/blog/new?category=${category}`} className="px-4 py-3 bg-[#8B1E5A] text-white rounded-lg">New article</Link></div>
    <div className="my-6 p-5 bg-white border rounded-xl text-sm leading-7"><strong>Publishing checklist</strong><p>Keep the category set to “Yan Long Blog”. Use 800–1,600 words, one featured image and 2–4 different supporting images. Include descriptive alt text, a meta description, H2 sections and links to relevant Yan Long pages. Generated visuals need an editorial-illustration caption.</p><p>Upload images through the editor; the uploader compresses them. Supporting images need width and height attributes. Never reuse another article’s image, including renamed or cropped copies. Publication checks enforce word count, image count and known image ownership.</p><p>Use /blog/your-slug for article links on Yan Long. Published posts appear on the archive, sitemap and latest-three homepage section; changes can take up to a minute to refresh. Dates stay internal. Draft and archived posts are excluded.</p></div>
    {result?.error && <p role="alert">Articles could not be loaded. Please try again.</p>}
    <div className="space-y-3">{result?.data?.map(post => <article key={post.id} className="p-5 border rounded-xl bg-white flex flex-wrap justify-between items-center gap-4"><div><h2 className="font-semibold">{post.title}</h2><p className="text-sm text-gray-500">{post.status} · {post.word_count || 0} words</p></div><div className="flex gap-5"><Link className="text-[#8B1E5A] underline" href={`/admin/blog/${post.id}`}>Edit article</Link>{post.status==='published' && <a className="underline" href={`https://yanlongphuket.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">View live</a>}</div></article>)}</div>
  </div>;
}
