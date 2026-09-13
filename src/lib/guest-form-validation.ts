/** Shared validation for public guest forms. Values remain plain text in storage. */
export function isFormBody(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function formText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** A calendar date must never go through UTC conversion. */
export function localDateValue(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function hotelDateValue(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => parts.find((value) => value.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function hotelDatesAhead(days: number, now = new Date()): string[] {
  const firstDay = hotelDateValue(now);
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(`${firstDay}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

export const SPA_BOOKING_TIMES = Array.from({ length: 11 }, (_, index) => `${index + 10}:00`);

export function isFutureSpaSlot(date: string, time: string, now = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !SPA_BOOKING_TIMES.includes(time)) return false;
  const calendarDate = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(calendarDate.getTime()) || calendarDate.toISOString().slice(0, 10) !== date) return false;
  return new Date(`${date}T${time}:00+07:00`).getTime() > now.getTime();
}
