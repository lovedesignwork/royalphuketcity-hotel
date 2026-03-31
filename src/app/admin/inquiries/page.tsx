"use client";

import { useEffect, useState, useRef } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiry_type?: string;
  status?: string;
  notes?: string;
  created_at: string;
}

// Icon Components
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function BedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function ArrowDownTrayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ArchiveBoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
  );
}

// Custom Dropdown Component
interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

function CustomDropdown({
  value,
  options,
  onChange,
  placeholder = "Select...",
  className = "",
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;
      
      if (event.key === "Escape") {
        setIsOpen(false);
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const currentIndex = options.findIndex((opt) => opt.value === value);
        const nextIndex = event.key === "ArrowDown" 
          ? Math.min(currentIndex + 1, options.length - 1)
          : Math.max(currentIndex - 1, 0);
        onChange(options[nextIndex].value);
      } else if (event.key === "Enter") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, options, value, onChange]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none transition-colors"
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon && (
            <span className={selectedOption.color || "text-gray-500"}>
              {selectedOption.icon}
            </span>
          )}
          <span className="text-gray-700">
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDownIcon 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                option.value === value ? "bg-[#8B7355]/5" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                {option.icon && (
                  <span className={option.color || "text-gray-500"}>
                    {option.icon}
                  </span>
                )}
                <span className={option.value === value ? "font-medium text-gray-900" : "text-gray-700"}>
                  {option.label}
                </span>
              </div>
              {option.value === value && (
                <CheckIcon className="w-4 h-4 text-[#8B7355]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const statusConfig: Record<string, { bg: string; text: string; label: string; icon: React.ReactNode }> = {
    new: { bg: "bg-blue-100", text: "text-blue-700", label: "New", icon: <SparklesIcon className="w-3.5 h-3.5" /> },
    read: { bg: "bg-gray-100", text: "text-gray-700", label: "Read", icon: <EyeIcon className="w-3.5 h-3.5" /> },
    replied: { bg: "bg-green-100", text: "text-green-700", label: "Replied", icon: <CheckCircleIcon className="w-3.5 h-3.5" /> },
    archived: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Archived", icon: <ArchiveBoxIcon className="w-3.5 h-3.5" /> },
  };

  const config = statusConfig[status || "new"] || statusConfig.new;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
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

  const statusOptions: DropdownOption[] = [
    { value: "new", label: "New", icon: <SparklesIcon className="w-4 h-4" />, color: "text-blue-600" },
    { value: "read", label: "Read", icon: <EyeIcon className="w-4 h-4" />, color: "text-gray-600" },
    { value: "replied", label: "Replied", icon: <CheckCircleIcon className="w-4 h-4" />, color: "text-green-600" },
    { value: "archived", label: "Archived", icon: <ArchiveBoxIcon className="w-4 h-4" />, color: "text-yellow-600" },
  ];

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
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Inquiry Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Name
                </label>
                <p className="text-gray-900 font-medium">{inquiry.name}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Email
                </label>
                <a href={`mailto:${inquiry.email}`} className="text-[#8B7355] hover:underline">
                  {inquiry.email}
                </a>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Phone
                </label>
                <p className="text-gray-900">{inquiry.phone || "-"}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Inquiry Type
                </label>
                <p className="text-gray-900 capitalize">{inquiry.inquiry_type || "General"}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <p className="text-gray-900">{inquiry.subject || "-"}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Received
                </label>
                <p className="text-gray-900">
                  {new Date(inquiry.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Message
              </label>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
                {inquiry.message}
              </div>
            </div>

            {/* Status & Notes */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <CustomDropdown
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Quick Actions
                  </label>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || "Your Inquiry"}`}
                      className="flex-1 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] transition-colors text-center text-sm"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Internal Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes about this inquiry..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function InquiryTypeBadge({ type }: { type?: string }) {
  const typeConfig: Record<string, { bg: string; text: string; label: string; icon: React.ReactNode }> = {
    event: { bg: "bg-purple-100", text: "text-purple-700", label: "Event", icon: <CalendarIcon className="w-3.5 h-3.5" /> },
    general: { bg: "bg-gray-100", text: "text-gray-700", label: "General", icon: <ChatBubbleIcon className="w-3.5 h-3.5" /> },
    reservation: { bg: "bg-green-100", text: "text-green-700", label: "Reservation", icon: <BedIcon className="w-3.5 h-3.5" /> },
    wedding: { bg: "bg-pink-100", text: "text-pink-700", label: "Wedding", icon: <HeartIcon className="w-3.5 h-3.5" /> },
    download: { bg: "bg-red-100", text: "text-red-700", label: "Download", icon: <ArrowDownTrayIcon className="w-3.5 h-3.5" /> },
  };

  const config = typeConfig[type || "general"] || typeConfig.general;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, [page, statusFilter, typeFilter]);

  async function fetchInquiries() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("inquiry_type", typeFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/inquiries?${params}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchInquiries();
  }

  async function handleUpdateInquiry(id: string, status: string, notes: string) {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, notes }),
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (error) {
      console.error("Failed to update inquiry:", error);
    }
  }

  async function handleDeleteInquiry(id: string) {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    }
  }

  async function handleMarkAsRead(id: string) {
    await handleUpdateInquiry(id, "read", "");
  }

  const newCount = inquiries.filter((i) => i.status === "new" || !i.status).length;
  const downloadCount = inquiries.filter((i) => i.inquiry_type === "download").length;
  const newDownloadCount = inquiries.filter((i) => i.inquiry_type === "download" && (i.status === "new" || !i.status)).length;

  // Dropdown options
  const typeOptions: DropdownOption[] = [
    { value: "all", label: "All Types", icon: <FunnelIcon className="w-4 h-4" />, color: "text-gray-500" },
    { value: "event", label: "Event Inquiries", icon: <CalendarIcon className="w-4 h-4" />, color: "text-purple-600" },
    { value: "general", label: "General", icon: <ChatBubbleIcon className="w-4 h-4" />, color: "text-gray-600" },
    { value: "reservation", label: "Reservation", icon: <BedIcon className="w-4 h-4" />, color: "text-green-600" },
    { value: "wedding", label: "Wedding", icon: <HeartIcon className="w-4 h-4" />, color: "text-pink-600" },
    { value: "download", label: "Download Requests", icon: <ArrowDownTrayIcon className="w-4 h-4" />, color: "text-red-600" },
  ];

  const statusOptions: DropdownOption[] = [
    { value: "all", label: "All Status", icon: <FunnelIcon className="w-4 h-4" />, color: "text-gray-500" },
    { value: "new", label: "New", icon: <SparklesIcon className="w-4 h-4" />, color: "text-blue-600" },
    { value: "read", label: "Read", icon: <EyeIcon className="w-4 h-4" />, color: "text-gray-600" },
    { value: "replied", label: "Replied", icon: <CheckCircleIcon className="w-4 h-4" />, color: "text-green-600" },
    { value: "archived", label: "Archived", icon: <ArchiveBoxIcon className="w-4 h-4" />, color: "text-yellow-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-500 mt-1">
            Manage contact form submissions and inquiries
          </p>
        </div>
        <div className="flex items-center gap-3">
          {newDownloadCount > 0 && (
            <button
              onClick={() => {
                setTypeFilter("download");
                setPage(1);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700 font-medium">
                {newDownloadCount} new download {newDownloadCount === 1 ? "request" : "requests"}
              </span>
            </button>
          )}
          {newCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm text-blue-700 font-medium">
                {newCount} new {newCount === 1 ? "inquiry" : "inquiries"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={() => { setTypeFilter("all"); setStatusFilter("all"); setPage(1); }}
          className={`p-4 rounded-xl border transition-all ${typeFilter === "all" && statusFilter === "all" ? "border-[#8B7355] bg-[#8B7355]/5" : "border-gray-200 bg-white hover:border-gray-300"}`}
        >
          <p className="text-2xl font-bold text-gray-900">{total}</p>
          <p className="text-sm text-gray-500">Total Inquiries</p>
        </button>
        <button
          onClick={() => { setTypeFilter("all"); setStatusFilter("new"); setPage(1); }}
          className={`p-4 rounded-xl border transition-all ${statusFilter === "new" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
        >
          <p className="text-2xl font-bold text-blue-600">{newCount}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <SparklesIcon className="w-3.5 h-3.5" /> New
          </p>
        </button>
        <button
          onClick={() => { setTypeFilter("download"); setStatusFilter("all"); setPage(1); }}
          className={`p-4 rounded-xl border transition-all ${typeFilter === "download" ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
        >
          <p className="text-2xl font-bold text-red-600">{downloadCount}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <ArrowDownTrayIcon className="w-3.5 h-3.5" /> Downloads
          </p>
        </button>
        <button
          onClick={() => { setTypeFilter("event"); setStatusFilter("all"); setPage(1); }}
          className={`p-4 rounded-xl border transition-all ${typeFilter === "event" ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
        >
          <p className="text-2xl font-bold text-purple-600">{inquiries.filter(i => i.inquiry_type === "event").length}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5" /> Events
          </p>
        </button>
        <button
          onClick={() => { setTypeFilter("wedding"); setStatusFilter("all"); setPage(1); }}
          className={`p-4 rounded-xl border transition-all ${typeFilter === "wedding" ? "border-pink-500 bg-pink-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
        >
          <p className="text-2xl font-bold text-pink-600">{inquiries.filter(i => i.inquiry_type === "wedding").length}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <HeartIcon className="w-3.5 h-3.5" /> Weddings
          </p>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          <CustomDropdown
            value={typeFilter}
            onChange={(val) => {
              setTypeFilter(val);
              setPage(1);
            }}
            options={typeOptions}
            className="w-52"
          />
          <CustomDropdown
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
            options={statusOptions}
            className="w-40"
          />
          <button
            onClick={fetchInquiries}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-[#8B7355] border-t-transparent rounded-full" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <InboxIcon className="w-12 h-12 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No inquiries found</p>
            <p className="text-sm">Contact form submissions will appear here</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
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
                  {inquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        inquiry.status === "new" || !inquiry.status
                          ? "bg-blue-50/50"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <StatusBadge status={inquiry.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{inquiry.name}</p>
                          <p className="text-sm text-gray-500">{inquiry.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 max-w-xs truncate">
                          {inquiry.subject || "-"}
                        </p>
                        <p className="text-sm text-gray-500 max-w-xs truncate">
                          {inquiry.message}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <InquiryTypeBadge type={inquiry.inquiry_type} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                        <br />
                        <span className="text-xs">
                          {new Date(inquiry.created_at).toLocaleTimeString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <EyeIcon className="w-4 h-4 text-gray-600" />
                          </button>
                          {(inquiry.status === "new" || !inquiry.status) && (
                            <button
                              onClick={() => handleMarkAsRead(inquiry.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Mark as Read"
                            >
                              <CheckIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          )}
                          <a
                            href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || "Your Inquiry"}`}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Reply"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                          <button
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
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
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} inquiries
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <InquiryModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdate={handleUpdateInquiry}
        />
      )}
    </div>
  );
}
