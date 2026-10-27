"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from "@/lib/cookie-consent";
import { normalizeAnalyticsId } from "@/lib/analytics-id";
import { isMobileAppAlias, isMobileAppPath, isMobileHost } from "@/lib/mobile";
import { installReservationClickTracking, setAnalyticsEventMeasurementId } from "@/lib/analytics-events";

function generateVisitorId(): string {
  const stored = localStorage.getItem("visitor_id");
  if (stored) return stored;

  const newId = crypto.randomUUID();
  localStorage.setItem("visitor_id", newId);
  return newId;
}

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (/^\/(?:th\/)?admin(?:\/|$)/.test(pathname)) return;

    const trackPageView = async () => {
      try {
        const visitorId = generateVisitorId();
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            visitorId,
            referrer: document.referrer || null,
          }),
        });
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) return null;
  const measurementIdJson = JSON.stringify(measurementId).replace(/</g, "\\u003c");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id={`google-analytics-${measurementId}`} strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${measurementIdJson}, {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = /^\/(?:th\/)?admin(?:\/|$)/.test(pathname);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [desktopMeasurementId, setDesktopMeasurementId] = useState<string>();
  const fallbackId = normalizeAnalyticsId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  const isMobileApp = isMobileAppPath(pathname) || isMobileAppAlias(pathname) ||
    (typeof window !== "undefined" && isMobileHost(window.location.host));
  // The guest app retains its existing environment-based configuration.
  const measurementId = isMobileApp ? fallbackId : desktopMeasurementId;

  useEffect(() => {
    if (!consentAccepted || isAdmin || isMobileApp) {
      setDesktopMeasurementId(undefined);
      return;
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3000);
    let active = true;
    const loadConfig = async () => {
      let id = fallbackId;
      try {
        const response = await fetch("/api/analytics-config", { signal: controller.signal });
        if (response.ok) {
          const data = await response.json();
          id = normalizeAnalyticsId(data.measurementId) || fallbackId;
        }
      } catch {
        // Preserve the existing tag when the optional settings lookup fails.
      } finally {
        window.clearTimeout(timeout);
      }
      if (active) setDesktopMeasurementId(id);
    };
    void loadConfig();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [consentAccepted, isAdmin, isMobileApp, fallbackId]);

  useEffect(() => {
    const updateConsent = () => {
      let accepted = false;
      try {
        accepted = localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
        if (!accepted) localStorage.removeItem("visitor_id");
      } catch {
        // Storage unavailable: keep optional tracking disabled.
      }
      if (measurementId) {
        (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !accepted || isAdmin;
      }
      setAnalyticsEventMeasurementId(accepted && !isAdmin && !isMobileApp ? measurementId : undefined);
      setConsentAccepted(accepted);
    };
    updateConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, updateConsent);
    window.addEventListener("storage", updateConsent);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, updateConsent);
      window.removeEventListener("storage", updateConsent);
      if (measurementId) {
        (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
      }
      setAnalyticsEventMeasurementId(undefined);
    };
  }, [measurementId, isAdmin, isMobileApp]);

  useEffect(() => {
    if (!consentAccepted || isAdmin || isMobileApp) return;
    return installReservationClickTracking();
  }, [consentAccepted, isAdmin, isMobileApp]);

  return (
    <>
      {consentAccepted && !isAdmin && <VisitorTracker />}
      {consentAccepted && !isAdmin && <GoogleAnalytics measurementId={measurementId} />}
      {children}
    </>
  );
}
