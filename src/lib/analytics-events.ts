import { COOKIE_CONSENT_KEY } from "@/lib/cookie-consent";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { normalizeAnalyticsId } from "@/lib/analytics-id";
import { isMobileAppAlias, isMobileAppPath, isMobileHost } from "@/lib/mobile";

type InquiryForm = "contact" | "wedding" | "event" | "fact_sheets";
type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: string, parameters: Record<string, string>) => void;
};

let measurementId = "";
const recordedInquiries = new Set<string>();

export function setAnalyticsEventMeasurementId(id?: string): void {
  measurementId = normalizeAnalyticsId(id);
}

function sendEvent(name: "reservation_click" | "generate_lead", parameters: Record<string, string>): boolean {
  try {
    if (typeof window === "undefined" || !measurementId) return false;
    const { host, pathname } = window.location;
    if (/^\/(?:th\/)?admin(?:\/|$)/.test(pathname) || isMobileHost(host) ||
      isMobileAppPath(pathname) || isMobileAppAlias(pathname)) return false;
    if (localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted") return false;
    if ((window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] === true) return false;
    const analytics = window as AnalyticsWindow;
    if (typeof analytics.gtag !== "function") return false;
    analytics.gtag("event", name, { ...parameters, send_to: measurementId });
    return true;
  } catch {
    // Blocked storage, extensions, or tracking must never interrupt the guest's action.
    return false;
  }
}

export function trackInquirySuccess(form: InquiryForm, responseOk: boolean, data: unknown): void {
  if (!responseOk || !data || typeof data !== "object" || !("success" in data) || data.success !== true) return;
  const reference = "referenceNumber" in data && typeof data.referenceNumber === "string"
    ? data.referenceNumber : "";
  const key = reference ? `${form}:${reference}` : "";
  if (key && recordedInquiries.has(key)) return;
  // Static identifiers only: no name, email, phone, message, company, dates,
  // reference number, or invented monetary value is transmitted to Google.
  if (sendEvent("generate_lead", { form_id: form, method: "website_form" }) && key) {
    recordedInquiries.add(key);
    if (recordedInquiries.size > 100) recordedInquiries.delete(recordedInquiries.values().next().value!);
  }
}

export function installReservationClickTracking(): () => void {
  const booking = new URL(EXTERNAL_LINKS.booking);
  const normalizeHost = (host: string) => host.toLowerCase().replace(/^www\./, "");
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || (event.type === "click" ? event.button !== 0 : event.button !== 1)) return;
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!anchor) return;
    try {
      const destination = new URL(anchor.href);
      if (destination.protocol !== "https:" || normalizeHost(destination.hostname) !== normalizeHost(booking.hostname) ||
        normalizePath(destination.pathname) !== normalizePath(booking.pathname)) return;
      // This measures the booking-engine handoff, never a completed reservation.
      // Delegation covers header/footer/menu/promotions/shared ReserveButton
      // without adding duplicate handlers to each link or changing navigation.
      sendEvent("reservation_click", { booking_engine: "myxcaliber", link_domain: booking.hostname });
    } catch {
      // Ignore malformed or non-web links.
    }
  };
  document.addEventListener("click", onClick);
  document.addEventListener("auxclick", onClick);
  return () => {
    document.removeEventListener("click", onClick);
    document.removeEventListener("auxclick", onClick);
  };
}
