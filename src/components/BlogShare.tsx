"use client";

import { useState } from "react";

export default function BlogShare({ title, url }: { title: string; url: string }) {
  const [message, setMessage] = useState("");
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setMessage("Link copied."); }
    catch { setMessage(`Copy this link: ${url}`); }
  }
  async function nativeShare() {
    if (!navigator.share) return copyLink();
    try { await navigator.share({ title, url }); }
    catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) await copyLink(); }
  }
  const style = "border border-gray-200 px-3 py-2 text-sm hover:border-[#8B7355] focus-visible:outline-2 focus-visible:outline-[#8B7355]";
  return <div>
    <p className="text-sm mb-3">Share this guide</p>
    <div className="flex flex-wrap gap-2">
      <a className={style} href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>Email</a>
      <a className={style} href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a className={style} href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button className={style} onClick={copyLink}>Copy link</button>
      <button className={style} onClick={nativeShare}>Share</button>
    </div>
    <p className="text-sm mt-2 break-all" role="status">{message}</p>
  </div>;
}
