"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from "@/lib/cookie-consent";

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
      <Script id="google-analytics" strategy="afterInteractive">
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
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
      setConsentAccepted(accepted);
    };
    updateConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, updateConsent);
    window.addEventListener("storage", updateConsent);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, updateConsent);
      window.removeEventListener("storage", updateConsent);
    };
  }, [measurementId, isAdmin]);

  return (
    <>
      {consentAccepted && !isAdmin && <VisitorTracker />}
      {consentAccepted && !isAdmin && <GoogleAnalytics measurementId={measurementId} />}
      {children}
    </>
  );
}
