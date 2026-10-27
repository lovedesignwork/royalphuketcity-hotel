"use client";

import { useState } from "react";

export default function ArticleImageTools({ onInsert }: { onInsert: (html: string) => void }) {
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [generated, setGenerated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  async function insert(file?: File) {
    if (!file) return;
    if (!alt.trim()) { setError("Describe the image before uploading."); return; }
    setBusy(true); setError("");
    try {
      const form = new FormData(); form.append("file", file); form.append("bucket", "blog-images");
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const image = await response.json();
      if (!response.ok) throw new Error(image.error || "Upload failed");
      const label = generated ? "AI-generated editorial illustration. " : "";
      onInsert(`<figure><img src="${escape(image.url)}" width="${image.width}" height="${image.height}" alt="${escape(alt + (generated ? " — AI-generated editorial illustration" : ""))}" loading="lazy" decoding="async"><figcaption>${escape(label + caption)}</figcaption></figure>`);
      setAlt(""); setCaption("");
    } catch (error) { setError(error instanceof Error ? error.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  return <fieldset className="border border-gray-200 rounded-lg p-4 mt-5 space-y-3">
    <legend className="text-sm font-medium px-1">Add a supporting image</legend>
    <p className="text-xs text-gray-500">Upload a new photograph owned by this article. It will be resized and compressed to WebP. The figure is appended below; move it beside the relevant section in the editor.</p>
    <label className="block text-sm">Image description<input value={alt} onChange={event => setAlt(event.target.value)} className="block w-full mt-1 px-3 py-2 border rounded-lg" /></label>
    <label className="block text-sm">Caption<input value={caption} onChange={event => setCaption(event.target.value)} className="block w-full mt-1 px-3 py-2 border rounded-lg" /></label>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={generated} onChange={event => setGenerated(event.target.checked)} />AI-generated editorial illustration</label>
    <label className="block text-sm">{busy ? "Optimising image…" : "Choose image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={event => { void insert(event.target.files?.[0]); event.target.value = ""; }} className="block mt-2 text-sm" /></label>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
  </fieldset>;
}
