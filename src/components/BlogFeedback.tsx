"use client";
import { useEffect, useState } from "react";

export default function BlogFeedback({ slug }: { slug: string }) {
  const [vote, setVote] = useState<number | null>(null);
  const [counts, setCounts] = useState<{ likes: number; dislikes: number } | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const endpoint = `/api/blog/${encodeURIComponent(slug)}/feedback`;
  useEffect(() => {
    let current = true;
    fetch(endpoint, { cache: "no-store" }).then(async r => {
      if (!r.ok) throw new Error("Feedback is temporarily unavailable.");
      const data = await r.json();
      if (current) { setCounts(data); setVote(data.vote); }
    }).catch(() => { if (current) setMessage("Feedback is temporarily unavailable."); });
    return () => { current = false; };
  }, [endpoint]);
  async function submit(value: number) {
    setBusy(true); setMessage("");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vote: value }) });
      if (!response.ok) throw new Error(response.status === 429 ? "Please try again shortly." : "Unable to save your vote. Please try again.");
      setVote(value); setMessage("Thanks — your feedback was saved. You can change your vote.");
      const refreshed = await fetch(endpoint, { cache: "no-store" });
      if (refreshed.ok) setCounts(await refreshed.json());
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save your vote."); }
    finally { setBusy(false); }
  }
  return <section className="mt-12 py-8 border-t border-gray-200" aria-label="Article feedback">
    <h2 className="font-heading text-2xl mb-4">Was this helpful?</h2>
    <div className="flex flex-wrap gap-3">{[[1, "Yes, helpful"], [-1, "No, not helpful"]].map(([value, label]) => <button key={value} disabled={busy} onClick={() => submit(Number(value))} aria-pressed={vote === value} className={`px-4 py-3 border disabled:opacity-50 ${vote === value ? "border-[#8B7355] bg-[#8B7355]/10" : "border-gray-200"}`}>{label}{counts && ` (${value === 1 ? counts.likes : counts.dislikes})`}</button>)}</div>
    <p role="status" className="mt-3 text-sm text-gray-600">{message}</p>
  </section>;
}
