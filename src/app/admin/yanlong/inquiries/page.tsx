"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiry_type?: string;
  inquiry_type_label?: string;
  country?: string;
  status?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

function StatusBadge({ status }: { status?: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: "bg-blue-100", text: "text-blue-700", label: "New" },
    read: { bg: "bg-gray-100", text: "text-gray-700", label: "Read" },
    replied: { bg: "bg-green-100", text: "text-green-700", label: "Replied" },
    archived: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Archived" },
  };
  const c = config[status || "new"] || config.new;
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

function InquiryModal({
  inquiry,
  onClose,
  onUpdate,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onUpdate: (id: string, status: string, notes: string) => void;
}) {
  const [status, setStatus] = useState(inquiry.status || "new");
  const [notes, setNotes] = useState(inquiry.notes || "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onUpdate(inquiry.id, status, notes);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Inquiry Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">Yan Long · Chinese Restaurant</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-500 uppercase">Name</span>
                <p className="text-gray-900 font-medium">{inquiry.name}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase">Email</span>
                <a href={`mailto:${inquiry.email}`} className="text-[#8B7355] hover:underline block">
                  {inquiry.email}
                </a>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase">Phone</span>
                <p className="text-gray-900">{inquiry.phone || "-"}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase">Inquiry type</span>
                <p className="text-gray-900 capitalize">
                  {inquiry.inquiry_type_label || inquiry.inquiry_type || "General"}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-gray-500 uppercase">Subject</span>
                <p className="text-gray-900">{inquiry.subject || "-"}</p>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-gray-500 uppercase">Received</span>
                <p className="text-gray-900">{new Date(inquiry.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-500 uppercase block mb-2">Message</span>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap text-sm">
                {inquiry.message}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Quick action</label>
                <a
                  href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || "Your inquiry"}`}
                  className="block w-full px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] text-center text-sm"
                >
                  Reply via Email
                </a>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 uppercase block mb-2">Internal notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] disabled:opacity-50 text-sm"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function YanLongInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchData();
  }, [page, statusFilter, typeFilter]);

  async function fetchData() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("inquiry_type", typeFilter);
      const res = await fetch(`/api/admin/yanlong/inquiries?${params}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.submissions);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: string, status: string, notes: string) {
    const res = await fetch("/api/admin/yanlong/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, notes }),
    });
    if (res.ok) fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    const res = await fetch(`/api/admin/yanlong/inquiries?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  }

  const newCount = inquiries.filter((s) => s.status === "new" || !s.status).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1E5A] uppercase tracking-[0.3em] mb-1">
            <span className="w-1.5 h-1.5 bg-[#8B1E5A] rounded-full" /> Yan Long
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-500 mt-1">General contact messages from the Yan Long website</p>
        </div>
        {newCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm text-blue-700 font-medium">
              {newCount} new {newCount === 1 ? "inquiry" : "inquiries"}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3">
        <div className="flex gap-2">
          {["all", "new", "read", "replied", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                statusFilter === s
                  ? "bg-[#8B7355] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All types</option>
          <option value="general">General</option>
          <option value="event">Event</option>
          <option value="wedding">Wedding</option>
          <option value="reservation">Reservation inquiry</option>
        </select>
        <button onClick={fetchData} className="ml-auto p-2 hover:bg-gray-100 rounded-lg" title="Refresh">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-[#8B7355] border-t-transparent rounded-full" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium">No inquiries yet</p>
            <p className="text-sm">Messages from yanlongphuket.com will appear here</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      s.status === "new" || !s.status ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{s.name}</p>
                      <p className="text-sm text-gray-500">{s.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 max-w-xs truncate">{s.subject || "-"}</p>
                      <p className="text-sm text-gray-500 max-w-xs truncate">{s.message}</p>
                    </td>
                    <td className="px-6 py-4 capitalize text-sm text-gray-700">
                      {s.inquiry_type_label || s.inquiry_type || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(s.created_at).toLocaleDateString()}
                      <br />
                      <span className="text-xs">{new Date(s.created_at).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(s)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium"
                        >
                          View
                        </button>
                        <a
                          href={`mailto:${s.email}?subject=Re: ${s.subject || "Your inquiry"}`}
                          className="px-3 py-1.5 bg-[#8B7355]/10 hover:bg-[#8B7355]/20 rounded-lg text-xs font-medium text-[#8B7355]"
                        >
                          Reply
                        </a>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {(page - 1) * 20 + 1}-{Math.min(page * 20, total)} of {total}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <InquiryModal
          inquiry={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
