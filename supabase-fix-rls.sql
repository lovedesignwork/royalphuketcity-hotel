-- =====================================================
-- FIX ALL RLS SECURITY ISSUES
-- Run this in Supabase SQL Editor (Database > SQL Editor)
-- =====================================================

-- 1. Enable RLS on all affected tables
-- -------------------------------------

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- 2. Create/Update policies for public read access (for website visitors)
-- These tables need to be readable by anyone visiting the website
-- ------------------------------------------------------------------------

-- Announcements: Public can read active announcements
DROP POLICY IF EXISTS "Anyone can read active announcements" ON public.announcements;
CREATE POLICY "Anyone can read active announcements" ON public.announcements
  FOR SELECT USING (is_active = true);

-- Announcements: Service role can do everything
DROP POLICY IF EXISTS "Service role full access announcements" ON public.announcements;
CREATE POLICY "Service role full access announcements" ON public.announcements
  FOR ALL USING (auth.role() = 'service_role');

-- Blog Categories: Public can read all categories
DROP POLICY IF EXISTS "Anyone can read blog categories" ON public.blog_categories;
CREATE POLICY "Anyone can read blog categories" ON public.blog_categories
  FOR SELECT USING (true);

-- Blog Categories: Service role can do everything
DROP POLICY IF EXISTS "Service role full access blog_categories" ON public.blog_categories;
CREATE POLICY "Service role full access blog_categories" ON public.blog_categories
  FOR ALL USING (auth.role() = 'service_role');

-- Blog Posts: Public can read published posts
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

-- Blog Posts: Service role can do everything
DROP POLICY IF EXISTS "Service role full access blog_posts" ON public.blog_posts;
CREATE POLICY "Service role full access blog_posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'service_role');

-- Blog Post Versions: Service role only (internal versioning)
DROP POLICY IF EXISTS "Service role full access blog_post_versions" ON public.blog_post_versions;
CREATE POLICY "Service role full access blog_post_versions" ON public.blog_post_versions
  FOR ALL USING (auth.role() = 'service_role');

-- Site Settings: Public can read settings
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
CREATE POLICY "Anyone can read site settings" ON public.site_settings
  FOR SELECT USING (true);

-- Site Settings: Service role can do everything
DROP POLICY IF EXISTS "Service role full access site_settings" ON public.site_settings;
CREATE POLICY "Service role full access site_settings" ON public.site_settings
  FOR ALL USING (auth.role() = 'service_role');

-- Page Views: Anyone can insert (for analytics)
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Anyone can insert page views" ON public.page_views
  FOR INSERT WITH CHECK (true);

-- Page Views: Service role can read/manage (for admin dashboard)
DROP POLICY IF EXISTS "Service role full access page_views" ON public.page_views;
CREATE POLICY "Service role full access page_views" ON public.page_views
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- VERIFICATION: Check RLS is enabled on all tables
-- =====================================================
SELECT 
  schemaname,
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'announcements', 
    'blog_categories', 
    'blog_post_versions', 
    'blog_posts', 
    'site_settings', 
    'page_views'
  )
ORDER BY tablename;
