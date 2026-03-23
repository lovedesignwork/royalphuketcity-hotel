-- Royal Phuket City Hotel - Supabase Schema
-- Run this SQL in your Supabase SQL Editor to set up the required tables

-- ============================================
-- STORAGE BUCKET SETUP (Run in Supabase Dashboard)
-- ============================================
-- 1. Go to Storage in your Supabase Dashboard
-- 2. Create a new bucket named "blog-images"
-- 3. Set the bucket to PUBLIC (for public image URLs)
-- 4. Add the following policy for authenticated uploads:
--    - Policy name: "Allow public read"
--    - Allowed operations: SELECT
--    - Policy: true (allows anyone to read)
-- 
-- Or run this SQL to create the bucket policy:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
--
-- ============================================

-- Page Views Table (for visitor tracking)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  visitor_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  device TEXT,
  browser TEXT,
  country TEXT,
  city TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);

-- Site Settings Table (for storing Google Analytics ID and other settings)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Form Submissions Table (for inquiry management)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster inquiry queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Migration: Add new columns if table already exists
-- Run these ALTER statements if you already have the contact_submissions table
-- ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS inquiry_type TEXT DEFAULT 'general';
-- ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
-- ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS notes TEXT;
-- ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Enable Row Level Security (RLS) - Optional but recommended
-- For production, you should set up proper RLS policies

-- Grant necessary permissions for the service role
-- (Service role bypasses RLS by default)

-- Example: Insert initial settings
INSERT INTO site_settings (key, value) 
VALUES ('google_analytics_id', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- AI Blog Writer Tables
-- ============================================

-- Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Hotel News', 'hotel-news', 'Latest news and updates from Royal Phuket City Hotel'),
  ('Travel Tips', 'travel-tips', 'Useful tips for travelers visiting Phuket'),
  ('Local Attractions', 'local-attractions', 'Discover Phuket Old Town and nearby attractions'),
  ('Dining', 'dining', 'Food, restaurants, and culinary experiences'),
  ('Events', 'events', 'Upcoming events and special occasions'),
  ('Wellness', 'wellness', 'Spa, relaxation, and wellness content')
ON CONFLICT (slug) DO NOTHING;

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  featured_image_alt TEXT,
  meta_description TEXT,
  seo_keywords TEXT[],
  focus_keyword TEXT,
  tags TEXT[],
  category_id UUID REFERENCES blog_categories(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'archived')),
  tone TEXT DEFAULT 'professional',
  target_audience TEXT,
  word_count INTEGER,
  seo_score INTEGER,
  author TEXT DEFAULT 'Admin',
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for blog posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);

-- Blog Post Versions Table (for version history)
CREATE TABLE IF NOT EXISTS blog_post_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT DEFAULT 'AI'
);

-- Create index for versions
CREATE INDEX IF NOT EXISTS idx_blog_versions_post ON blog_post_versions(post_id, version_number DESC);

-- AI Generation Prompts Table (configurable templates)
CREATE TABLE IF NOT EXISTS ai_prompt_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  prompt_template TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default AI prompt templates
INSERT INTO ai_prompt_templates (name, prompt_template, description) VALUES
  ('blog_full_generation', 'You are an expert SEO content writer for Royal Phuket City Hotel, a 4-star hotel in Phuket Old Town, Thailand. Generate a complete blog post based on the following inputs. The content should be engaging, SEO-optimized, and naturally incorporate the provided keywords.

INPUTS:
{{inputs}}

REQUIREMENTS:
- Write in {{tone}} tone for {{audience}} audience
- Target word count: {{word_count}} words
- Naturally incorporate all SEO keywords with proper density
- Include H2 and H3 headings for structure
- Write a compelling meta description (max 155 characters)
- Suggest relevant tags
- If a title is not provided, create an SEO-optimized title

OUTPUT FORMAT (JSON):
{
  "title": "SEO-optimized title",
  "slug": "url-friendly-slug",
  "excerpt": "2-3 sentence excerpt for blog listings",
  "content": "Full blog content in HTML format with proper headings",
  "meta_description": "Max 155 character meta description",
  "tags": ["tag1", "tag2", "tag3"],
  "seo_score": 85,
  "seo_analysis": "Brief analysis of SEO optimization"
}', 'Main template for full blog post generation'),
  
  ('blog_title_only', 'Generate 5 SEO-optimized blog title suggestions for Royal Phuket City Hotel based on these keywords: {{keywords}}. Return as JSON array.', 'Generate title suggestions only'),
  
  ('blog_outline', 'Create a detailed blog post outline with H2/H3 headings for a post about: {{topic}}. Target audience: {{audience}}. Include introduction, main sections, and conclusion.', 'Generate content outline before full generation')
ON CONFLICT (name) DO NOTHING;
