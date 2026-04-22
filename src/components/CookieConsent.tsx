"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "rpc-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const choice = localStorage.getItem(STORAGE_KEY);
      if (!choice) {
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      localStorage.setItem(`${STORAGE_KEY}-at`, new Date().toISOString());
    } catch {
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:bottom-6 md:right-auto md:max-w-md z-[9998] animate-cookie-in"
    >
      <div className="bg-white border border-black/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#8B7355]/10 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-[#8B7355]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"
              />
              <circle cx="9" cy="13" r="0.9" fill="currentColor" />
              <circle cx="14" cy="16" r="0.9" fill="currentColor" />
              <circle cx="15" cy="10" r="0.9" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-[--color-text-primary]">
              We use cookies to enhance your browsing experience and analyse site
              traffic. See our{" "}
              <Link
                href="/cookie-policy"
                className="underline decoration-[#8B7355]/40 underline-offset-2 hover:text-[#8B7355] transition-colors"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleChoice("declined")}
            className="text-xs tracking-wide uppercase text-[--color-text-secondary] hover:text-[--color-text-primary] px-3 py-2 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="text-xs tracking-wide uppercase bg-[#8B7355] text-white px-5 py-2.5 hover:bg-[#7a6548] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes cookieIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.animate-cookie-in) {
          animation: cookieIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}
