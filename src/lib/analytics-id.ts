/** Measurement IDs are public identifiers, but arbitrary settings must not become script URLs. */
export function normalizeAnalyticsId(value: unknown): string {
  if (typeof value !== "string") return "";
  const id = value.trim();
  return /^G-[A-Z0-9]+$/.test(id) && id.length <= 64 ? id : "";
}
