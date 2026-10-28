export type TwistInboxKind = "reservations" | "inquiries";
export const TWIST_STATUSES = ["new", "read", "replied", "archived"] as const;
export type TwistStatus = (typeof TWIST_STATUSES)[number];

export interface TwistInquiry {
  id: string;
  form_type: string;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  reservation_date: string | null;
  reservation_time: string | null;
  party_size: number | null;
  special_requests: string | null;
  event_type: string | null;
  event_date: string | null;
  guest_count: string | null;
  country: string | null;
  status: TwistStatus;
  notes: string | null;
  created_at: string;
}

export function twistGuestName(row: TwistInquiry) {
  return row.name || [row.first_name, row.last_name].filter(Boolean).join(" ") || "Guest";
}

export function twistStatusLabel(status: string, kind: TwistInboxKind) {
  if (status === "replied") return kind === "reservations" ? "Confirmed" : "Replied";
  return status.charAt(0).toUpperCase() + status.slice(1);
}
