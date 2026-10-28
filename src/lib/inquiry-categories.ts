export const INQUIRY_CATEGORIES = [
  { value: "download", label: "Download" },
  { value: "reservation", label: "Reservation" },
  { value: "event", label: "Event" },
  { value: "wedding", label: "Wedding" },
  { value: "general", label: "General" },
] as const;

export type InquiryCategory = typeof INQUIRY_CATEGORIES[number]["value"];
export function isInquiryCategory(value: string): value is InquiryCategory {
  return INQUIRY_CATEGORIES.some((category) => category.value === value);
}
export function inquiryCategoryHref(category: string) {
  return isInquiryCategory(category) ? `/admin/inquiries/${category}` : "/admin/inquiries";
}
