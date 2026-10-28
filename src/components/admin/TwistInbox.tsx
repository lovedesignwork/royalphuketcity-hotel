"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StyledSelect } from "@/components/ui/StyledSelect";
import { TWIST_STATUSES, twistGuestName, twistStatusLabel, type TwistInboxKind, type TwistInquiry, type TwistStatus } from "@/lib/twist-inbox";

const button = "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B7355] disabled:cursor-not-allowed disabled:opacity-50";
const statusColors = { new: "bg-blue-50 text-blue-800", read: "bg-gray-100 text-gray-700", replied: "bg-green-50 text-green-800", archived: "bg-amber-50 text-amber-800" };
function receivedDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Bangkok" }).format(new Date(value));
}
function bookingDate(value: string | null) {
  if (!value) return "Not specified";
  const date = new Date(`${value}T12:00:00+07:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Asia/Bangkok" }).format(date);
}

function RequestDetail({ item, kind, onSaved, onClose }: {
  item: TwistInquiry; kind: TwistInboxKind; onSaved: () => void; onClose: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<TwistStatus>(item.status || "new");
  const [notes, setNotes] = useState(item.notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { heading.current?.focus(); }, []);
  const isBooking = kind === "reservations";
  async function save(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    try {
      const response = await fetch(`/api/admin/twist/${kind}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, status, notes }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save changes.");
      onSaved();
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to save changes. Please retry."); }
    finally { setSaving(false); }
  }
  const facts = [
    ["Email", item.email], ["Phone", item.phone], ["Received (Phuket time)", receivedDate(item.created_at)],
    ...(isBooking ? [["Reservation date", bookingDate(item.reservation_date)], ["Time", item.reservation_time], ["Guests", item.party_size?.toString()]]
      : [["Type", item.form_type === "contact" ? "General inquiry" : item.form_type], ["Subject", item.subject]]),
    ["Occasion / event", item.event_type], ["Event date", item.event_date], ["Event guests", item.guest_count], ["Country", item.country],
  ];
  return <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6" aria-labelledby="twist-detail-title">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div><h2 id="twist-detail-title" ref={heading} tabIndex={-1} className="text-xl font-semibold text-gray-900 outline-none">{twistGuestName(item)}</h2>
        <p className="mt-1 text-sm text-gray-500">{isBooking ? "Reservation request" : "Inquiry"} · #{item.id}</p></div>
      <button className={button} disabled={saving} onClick={onClose}>Close details</button>
    </div>
    <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 xl:grid-cols-3">{facts.filter(([, value]) => value).map(([label, value]) =>
      <div key={label} className="min-w-0"><dt className="text-gray-500">{label}</dt><dd className="mt-1 break-words text-gray-900">{value}</dd></div>)}</dl>
    {(item.message || item.special_requests) && <div className="mt-5 border-t border-gray-100 pt-5">
      <h3 className="text-sm font-medium text-gray-700">{isBooking ? "Guest requests" : "Message"}</h3>
      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-700">{[item.message, item.special_requests].filter(Boolean).join("\n\n")}</p>
    </div>}
    <form onSubmit={save} className="mt-6 space-y-4 border-t border-gray-200 pt-5">
      <div className="max-w-xs"><StyledSelect label="Request status" value={status} onChange={(value) => setStatus(value as TwistStatus)} disabled={saving}
        options={TWIST_STATUSES.map((value) => ({ value, label: twistStatusLabel(value, kind) }))} /></div>
      <div><label htmlFor="twist-notes" className="mb-1.5 block text-sm font-medium text-gray-700">Internal notes</label>
        <textarea id="twist-notes" value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={5000} rows={3} disabled={saving}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-900 caret-[#8B7355] focus-visible:outline-2 focus-visible:outline-[#8B7355]" />
        <p className="mt-1 text-xs text-gray-500">For your team only. Saving a status does not send an email.</p></div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className={`${button} !border-[#8B7355] !bg-[#8B7355] !text-white hover:!bg-[#705C42]`}>{saving ? "Saving…" : "Save changes"}</button>
        {item.email && <a className={button} href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject || "Your TWIST reservation"}`)}`}>Reply by email</a>}
      </div>
    </form>
  </section>;
}

export function TwistInbox({ kind }: { kind: TwistInboxKind }) {
  const [items, setItems] = useState<TwistInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [status, setStatus] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [reload, setReload] = useState(0);
  const [selected, setSelected] = useState<TwistInquiry | null>(null);
  const lastOpened = useRef<HTMLButtonElement | null>(null);
  const isBooking = kind === "reservations";
  const title = isBooking ? "TWIST Reservations" : "TWIST Inquiries";

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    const params = new URLSearchParams({ page: String(page), status, search });
    (async () => {
      try {
        const response = await fetch(`/api/admin/twist/${kind}?${params}`, { signal: controller.signal, cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to load requests.");
        if (!controller.signal.aborted) {
          setItems(result.items); setTotal(result.total); setTotalPages(result.totalPages);
          if (page > result.totalPages) setPage(result.totalPages);
        }
      } catch (error) {
        if (!controller.signal.aborted) setError(error instanceof Error ? error.message : "Unable to load requests. Please retry.");
      } finally { if (!controller.signal.aborted) setLoading(false); }
    })();
    return () => controller.abort();
  }, [kind, page, status, search, reload]);

  const close = () => { setSelected(null); lastOpened.current?.focus(); };
  return <div className="mx-auto max-w-7xl selection:bg-[#8B7355]/20">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div><h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-600">TWIST Rooftop Restaurant &amp; Bar · {isBooking ? "Table requests and guest preferences" : "Guest messages and event inquiries"}</p></div>
      <button className={button} disabled={loading} onClick={() => setReload((value) => value + 1)}>Refresh</button>
    </div>
    <div className="mb-6 flex gap-5 border-b border-gray-200" aria-label="TWIST inboxes">
      {(["reservations", "inquiries"] as const).map((value) => <Link key={value} href={`/admin/twist/${value}`} aria-current={kind === value ? "page" : undefined}
        className={`border-b-2 px-1 pb-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-[#8B7355] ${kind === value ? "border-[#8B7355] text-[#705C42]" : "border-transparent text-gray-600 hover:text-gray-900"}`}>{value === "reservations" ? "Reservations" : "Inquiries"}</Link>)}
    </div>
    <form className="mb-5 flex flex-wrap items-end gap-3" onSubmit={(event) => { event.preventDefault(); setSearch(searchInput.trim()); setPage(1); setSelected(null); }}>
      <StyledSelect label="Status" value={status} onChange={(value) => { setStatus(value); setPage(1); setSelected(null); }}
        options={[{ value: "all", label: "All statuses" }, ...TWIST_STATUSES.map((value) => ({ value, label: twistStatusLabel(value, kind) }))]} />
      <div className="min-w-40 flex-1"><label htmlFor="twist-search" className="mb-1.5 block text-xs font-medium text-gray-600">Search requests</label>
        <input id="twist-search" type="search" value={searchInput} maxLength={100} onChange={(event) => setSearchInput(event.target.value)} placeholder="Name, email or message"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-[#8B7355]" /></div>
      <button className={button} type="submit">Search</button>
      {(search || status !== "all") && <button className={button} type="button" onClick={() => { setSearch(""); setSearchInput(""); setStatus("all"); setPage(1); setSelected(null); }}>Clear filters</button>}
    </form>
    {notice && <p role="status" className="mb-4 text-sm text-green-800">{notice}</p>}
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white" aria-busy={loading}>
      {error ? <div role="alert" className="p-8 text-center"><p className="mb-3 text-sm text-red-700">{error}</p><button className={button} onClick={() => setReload((value) => value + 1)}>Retry</button></div>
        : loading ? <p role="status" className="p-12 text-center text-sm text-gray-600">Loading TWIST {kind}…</p>
        : !items.length ? <div className="px-6 py-14 text-center"><h2 className="text-lg font-semibold text-gray-900">{search || status !== "all" ? "No matching requests" : `No ${kind} yet`}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">{search || status !== "all" ? "Try another search or clear the filters." : `Requests saved by the connected TWIST ${isBooking ? "reservation" : "contact"} form will appear here.`}</p></div>
        : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">TWIST {kind}, newest first</caption>
          <thead className="border-b border-gray-200 bg-gray-50 text-xs text-gray-600"><tr>{["Guest", isBooking ? "Reservation" : "Inquiry", "Received · Phuket", "Status", ""].map((label, i) => <th key={i} scope="col" className="px-5 py-3 font-medium">{label || <span className="sr-only">Details</span>}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">{items.map((item) => <tr key={item.id} className={selected?.id === item.id ? "bg-[#8B7355]/5" : "hover:bg-gray-50"}>
            <td className="max-w-64 px-5 py-4"><p className="break-words font-medium text-gray-900">{twistGuestName(item)}</p><p className="mt-1 break-all text-xs text-gray-600">{item.email || item.phone || "No contact details"}</p></td>
            <td className="max-w-72 px-5 py-4 text-gray-700"><p className="break-words">{isBooking ? `${bookingDate(item.reservation_date)} · ${item.reservation_time || "Time not specified"}` : item.subject || item.event_type || "General inquiry"}</p><p className="mt-1 text-xs text-gray-500">{isBooking ? `${item.party_size ?? "—"} guests` : item.form_type}</p></td>
            <td className="whitespace-nowrap px-5 py-4 text-xs tabular-nums text-gray-600">{receivedDate(item.created_at)}</td>
            <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[item.status] || statusColors.new}`}>{twistStatusLabel(item.status || "new", kind)}</span></td>
            <td className="px-5 py-4"><button className={button} aria-label={`View request from ${twistGuestName(item)}`} onClick={(event) => { lastOpened.current = event.currentTarget; setSelected(item); setNotice(""); }}>View</button></td>
          </tr>)}</tbody></table></div>}
      {!error && !loading && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 text-sm text-gray-600">
        <span>{total} {total === 1 ? "request" : "requests"}</span><div className="flex items-center gap-3"><button className={button} disabled={page <= 1} onClick={() => { setPage(page - 1); setSelected(null); }}>Previous</button><span className="tabular-nums">{page} / {totalPages}</span><button className={button} disabled={page >= totalPages} onClick={() => { setPage(page + 1); setSelected(null); }}>Next</button></div>
      </div>}
    </div>
    {selected && <RequestDetail key={selected.id} item={selected} kind={kind} onClose={close} onSaved={() => { close(); setNotice("Changes saved."); setReload((value) => value + 1); }} />}
  </div>;
}
