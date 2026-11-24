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

export const twistOrigin = "https://twistphuket.com";

export function isTwistFestivePoster(image?: string | null) {
  return !!image && image.startsWith(twistOrigin + "/festive/") && image.endsWith("-flyer.webp");
}

export type FestiveFloorPlan = {
  image: { src: string; width: number; height: number };
  coordinates: { width: number; height: number };
  tables: { id: string; bounds: [number, number, number, number] }[];
};

export type EventBooking = {
  id: string;
  table_id: string;
  status: "pending" | "paid" | "staff_confirmed";
  guests: number | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  staff_source: StaffSource | null;
  staff_notes: string | null;
};

export type FestiveBookings = { tables: FestiveTable[]; bookings: EventBooking[]; floorPlan: FestiveFloorPlan | null };

export function festiveTableStatus(booking: EventBooking | undefined) {
  if (!booking) return "Available";
  if (booking.staff_source === "house") return "Held by staff";
  if (booking.status === "pending") return "Payment pending";
  return "Booked";
}
