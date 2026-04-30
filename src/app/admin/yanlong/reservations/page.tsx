"use client";

import { useEffect, useState } from "react";

interface Reservation {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  service?: string;
  occasion?: string;
  seating_preference?: string;
  country?: string;
  special_requests?: string;
  status?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

function StatusBadge({ status }: { status?: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: "bg-red-100", text: "text-red-700", label: "New" },
    read: { bg: "bg-gray-100", text: "text-gray-700", label: "Read" },
    replied: { bg: "bg-green-100", text: "text-green-700", label: "Confirmed" },
    archived: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Archived" },
  };
  const c = config[status || "new"] || config.new;
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}

function formatDate(iso: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ReservationDetail({
  reservation,
  onClose,
  onUpdate,
}: {
  reservation: Reservation;
  onClose: () => void;
  onUpdate: (id: string, status: string, notes: string) => void;
}) {
  const [status, setStatus] = useState(reservation.status || "new");
  const [notes, setNotes] = useState(reservation.notes || "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onUpdate(reservation.id, status, notes);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Reservation Request</h2>
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
            <div className="bg-[#8B1E5A]/5 border border-[#8B1E5A]/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-[#8B1E5A] uppercase tracking-wider mb-3">Booking</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Date</span>
                  <p className="text-gray-900 font-medium">{formatDate(reservation.date)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Time</span>
                  <p className="text-gray-900 font-medium">{reservation.time}</p>
                </div>
                <div>
                  <span className="text-gray-500">Service</span>
                  <p className="text-gray-900">{reservation.service || "-"}</p>
                </div>
                <div>
                  <span className="text-gray-500">Guests</span>
                  <p className="text-gray-900">{reservation.guests}</p>
                </div>
                {reservation.occasion && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Occasion</span>
                    <p className="text-gray-900">{reservation.occasion}</p>
                  </div>
                )}
                {reservation.seating_preference && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Seating preference</span>
                    <p className="text-gray-900">{reservation.seating_preference}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Guest</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Name</span>
                  <p className="text-gray-900 font-medium">{reservation.guest_name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email</span>
                  <a href={`mailto:${reservation.email}`} className="text-[#8B7355] hover:underline block">
                    {reservation.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-500">Phone</span>
                  <a href={`tel:${reservation.phone}`} className="text-[#8B7355] hover:underline block">
                    {reservation.phone}
                  </a>
                </div>
                <div>
                  <span className="text-gray-500">Submitted</span>
                  <p className="text-gray-900">{new Date(reservation.created_at).toLocaleString()}</p>
                </div>
                {reservation.country && (
                  <div>
                    <span className="text-gray-500">Country</span>
                    <p className="text-gray-900">{reservation.country}</p>
                  </div>
                )}
              </div>
            </div>

            {reservation.special_requests && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Special requests
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap text-sm">
                  {reservation.special_requests}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Confirmed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Quick actions</label>
                  <a
                    href={`mailto:${reservation.email}?subject=Re: Your reservation at Yan Long`}
                    className="block w-full px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] transition-colors text-center text-sm"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Internal notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes about this reservation..."
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

export default function YanLongReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Reservation | null>(null);

  useEffect(() => {
    fetchData();
  }, [page, statusFilter]);

  async function fetchData() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/admin/yanlong/reservations?${params}`);
      if (res.ok) {
        const data = await res.json();
        setReservations(data.reservations);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: string, status: string, notes: string) {
    const res = await fetch("/api/admin/yanlong/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, notes }),
    });
    if (res.ok) fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this reservation?")) return;
    const res = await fetch(`/api/admin/yanlong/reservations?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  }

  const newCount = reservations.filter((s) => s.status === "new" || !s.status).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1E5A] uppercase tracking-[0.3em] mb-1">
            <span className="w-1.5 h-1.5 bg-[#8B1E5A] rounded-full" /> Yan Long
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-500 mt-1">Bookings from the Yan Long public website</p>
        </div>
        {newCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-700 font-medium">
              {newCount} new {newCount === 1 ? "reservation" : "reservations"}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 flex gap-3">
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
            {s === "replied" ? "Confirmed" : s}
          </button>
        ))}
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
        ) : reservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium">No reservations yet</p>
            <p className="text-sm">Bookings from yanlongphuket.com will appear here</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Date &amp; Time</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.map((r) => (
                  <tr
                    key={r.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                      r.status === "new" || !r.status ? "bg-red-50/30" : ""
                    }`}
                    onClick={() => setSelected(r)}
                  >
                    <td className="px-6 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{r.guest_name}</p>
                      <p className="text-sm text-gray-500">{r.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{formatDate(r.date)}</p>
                      <p className="text-sm text-gray-500">{r.time}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{r.guests}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString()}
                      <br />
                      <span className="text-xs">{new Date(r.created_at).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(r)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700"
                        >
                          View
                        </button>
                        <a
                          href={`mailto:${r.email}?subject=Re: Your reservation at Yan Long`}
                          className="px-3 py-1.5 bg-[#8B7355]/10 hover:bg-[#8B7355]/20 rounded-lg text-xs font-medium text-[#8B7355]"
                        >
                          Reply
                        </a>
                        <button
                          onClick={() => handleDelete(r.id)}
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
        <ReservationDetail
          reservation={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
