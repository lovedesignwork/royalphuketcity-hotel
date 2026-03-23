"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "technical", label: "Technical" },
  { value: "storytelling", label: "Storytelling" },
  { value: "persuasive", label: "Persuasive" },
];

const WORD_COUNTS = [
  { value: 300, label: "Short (~300 words)" },
  { value: 600, label: "Medium (~600 words)" },
  { value: 1200, label: "Long (~1200 words)" },
  { value: 0, label: "Custom" },
];

const AUDIENCES = [
  { value: "general", label: "General Public" },
  { value: "travelers", label: "Travelers" },
  { value: "business", label: "Business Travelers" },
  { value: "couples", label: "Couples" },
  { value: "families", label: "Families" },
  { value: "luxury", label: "Luxury Seekers" },
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seoAnalysis, setSeoAnalysis] = useState<string | null>(null);

  // Input fields
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [wordCount, setWordCount] = useState(600);
  const [customWordCount, setCustomWordCount] = useState(600);
  const [tone, setTone] = useState("professional");
  const [targetAudience, setTargetAudience] = useState("travelers");
  const [categoryId, setCategoryId] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImagePath, setFeaturedImagePath] = useState("");

  // Generated fields
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [seoScore, setSeoScore] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "blog-images");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setFeaturedImage(data.url);
      setFeaturedImagePath(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemoveImage() {
    if (!featuredImagePath) {
      setFeaturedImage("");
      return;
    }

    try {
      await fetch(`/api/admin/upload?path=${featuredImagePath}&bucket=blog-images`, {
        method: "DELETE",
      });
      setFeaturedImage("");
      setFeaturedImagePath("");
    } catch (err) {
      console.error("Failed to delete image:", err);
      setFeaturedImage("");
      setFeaturedImagePath("");
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/blog/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  function handleAddKeyword(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const kw = keywordInput.trim().replace(/,/g, "");
      if (kw && !keywords.includes(kw)) {
        setKeywords([...keywords, kw]);
        if (!focusKeyword) setFocusKeyword(kw);
      }
      setKeywordInput("");
    }
  }

  function removeKeyword(kw: string) {
    setKeywords(keywords.filter((k) => k !== kw));
    if (focusKeyword === kw) {
      setFocusKeyword(keywords[0] || "");
    }
  }

  async function handleGenerate() {
    if (keywords.length === 0 && !title) {
      setError("Please provide at least a title or some keywords");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const selectedCategory = categories.find((c) => c.id === categoryId);
      const res = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || undefined,
          keywords,
          focusKeyword: focusKeyword || keywords[0],
          wordCount: wordCount === 0 ? customWordCount : wordCount,
          tone,
          targetAudience,
          category: selectedCategory?.name,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate content");
      }

      const data = await res.json();
      const generated = data.generated;

      setGeneratedTitle(generated.title);
      setSlug(generated.slug);
      setExcerpt(generated.excerpt);
      setContent(generated.content);
      setMetaDescription(generated.meta_description);
      setTags(generated.tags || []);
      setSeoScore(generated.seo_score);
      setSeoAnalysis(generated.seo_analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate content");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave(status: "draft" | "published" = "draft") {
    if (!generatedTitle && !title) {
      setError("Please generate content first or provide a title");
      return;
    }

    if (!content) {
      setError("Please generate content first");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedTitle || title,
          slug,
          excerpt,
          content,
          featured_image: featuredImage || null,
          meta_description: metaDescription,
          seo_keywords: keywords,
          focus_keyword: focusKeyword,
          tags,
          category_id: categoryId || null,
          status,
          tone,
          target_audience: targetAudience,
          word_count: content.split(/\s+/).length,
          seo_score: seoScore,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save post");
      }

      const data = await res.json();
      router.push(`/admin/blog/${data.post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  const hasGeneratedContent = !!content;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
            <p className="text-gray-500">Use AI to generate SEO-optimized content</p>
          </div>
        </div>
        {hasGeneratedContent && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save as Draft"}
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Publish
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Input Fields</h2>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Leave empty to auto-generate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Keywords <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleAddKeyword}
                  placeholder="Type and press Enter to add"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                />
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.map((kw) => (
                      <span
                        key={kw}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                          kw === focusKeyword
                            ? "bg-[#8B7355] text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {kw}
                        {kw !== focusKeyword && (
                          <button
                            onClick={() => setFocusKeyword(kw)}
                            className="hover:text-[#8B7355]"
                            title="Set as focus keyword"
                          >
                            ★
                          </button>
                        )}
                        <button
                          onClick={() => removeKeyword(kw)}
                          className="hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Click ★ to set focus keyword
                </p>
              </div>

              {/* Word Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Length
                </label>
                <select
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                >
                  {WORD_COUNTS.map((wc) => (
                    <option key={wc.value} value={wc.value}>
                      {wc.label}
                    </option>
                  ))}
                </select>
                {wordCount === 0 && (
                  <input
                    type="number"
                    value={customWordCount}
                    onChange={(e) => setCustomWordCount(parseInt(e.target.value) || 600)}
                    placeholder="Custom word count"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                  />
                )}
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Writing Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                >
                  {TONES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                >
                  {AUDIENCES.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {featuredImage ? (
                  <div className="relative">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={featuredImage}
                        alt="Featured"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#8B7355] hover:bg-[#8B7355]/5 transition-colors disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin w-6 h-6 border-2 border-[#8B7355] border-t-transparent rounded-full" />
                        <span className="text-sm text-gray-500">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-500">Click to upload image</span>
                        <span className="text-xs text-gray-400">JPG, PNG, WebP, GIF (max 5MB)</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || (keywords.length === 0 && !title)}
              className="w-full mt-6 px-4 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate with AI
                </>
              )}
            </button>
          </div>

          {/* SEO Score */}
          {seoScore !== null && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">SEO Score</h2>
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                    seoScore >= 80
                      ? "bg-green-100 text-green-600"
                      : seoScore >= 60
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {seoScore}
                </div>
              </div>
              {seoAnalysis && (
                <p className="text-sm text-gray-600 text-center">{seoAnalysis}</p>
              )}
            </div>
          )}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-2 space-y-6">
          {!hasGeneratedContent ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Fill in the input fields on the left (at minimum, add some SEO keywords), then click &ldquo;Generate with AI&rdquo; to create your blog post.
              </p>
            </div>
          ) : (
            <>
              {/* Title & Slug */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={generatedTitle}
                      onChange={(e) => setGeneratedTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none text-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug / URL
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">/blog/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Description */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                  <span className="text-gray-400 ml-2">
                    ({metaDescription.length}/155)
                  </span>
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={2}
                  maxLength={155}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <span className="text-sm text-gray-500">
                    {content.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none resize-none font-mono text-sm"
                />
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => setTags(tags.filter((_, j) => j !== i))}
                        className="hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
