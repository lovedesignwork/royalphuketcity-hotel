// Hotel booking dates run through the end of the specified day in Phuket.
export function promotionExpiry(validUntil: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(validUntil)
    ? `${validUntil}T23:59:59.999+07:00`
    : validUntil;
}

export function isPromotionActive(validUntil: string, now: Date = new Date()): boolean {
  const expiry = Date.parse(promotionExpiry(validUntil));
  return Number.isFinite(expiry) && now.getTime() <= expiry;
}
