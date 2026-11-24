export const festiveEvents = {
  christmas26: { name: "Christmas Gala Dinner", date: "2026-12-24", dateLabel: "24 December 2026" },
  nye2027: { name: "New Year’s Eve 2027", date: "2026-12-31", dateLabel: "31 December 2026" },
} as const;

export type FestiveEventId = keyof typeof festiveEvents;

export const staffSources = {
  phone: "Phone",
  chat: "Chat",
  walk_in: "Walk-in",
  other: "Other manual booking",
  house: "House block",
} as const;

export type StaffSource = keyof typeof staffSources;

export function isFestiveEvent(value: unknown): value is FestiveEventId {
  return typeof value === "string" && Object.hasOwn(festiveEvents, value);
}

export function isStaffSource(value: unknown): value is StaffSource {
  return typeof value === "string" && Object.hasOwn(staffSources, value);
}

export type FestiveTable = { table_id: string; zone: string; capacity: number };

export type EventBooking = {
  id: string;
  table_id: string;
  status: "pending" | "paid" | "staff_confirmed";
  guests: number;
  guest_name: string;
  guest_email: string | null;
  guest_phone: string | null;
  staff_source: StaffSource | null;
  staff_notes: string | null;
};

export type FestiveBookings = { tables: FestiveTable[]; bookings: EventBooking[] };
