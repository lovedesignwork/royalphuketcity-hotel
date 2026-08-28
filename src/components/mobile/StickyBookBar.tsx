import { EXTERNAL_LINKS } from "@/lib/constants";

export default function StickyBookBar({
  label = "Add nights",
  code,
}: {
  label?: string;
  code?: string;
}) {
  const href = code
    ? `${EXTERNAL_LINKS.booking}${EXTERNAL_LINKS.booking.includes("?") ? "&" : "?"}promo=${encodeURIComponent(code)}`
    : EXTERNAL_LINKS.booking;

  return (
    <div className="mobile-book-bar border-t border-[var(--m-border)] bg-[var(--m-card)] px-4 py-3">
      {code ? (
        <p className="mb-2 text-center text-xs text-[var(--m-muted)]">
          Use code <span className="font-medium text-[var(--m-ink)]">{code}</span>
        </p>
      ) : null}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--m-gold)] px-5 text-sm font-medium text-white transition-transform duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--m-gold)]"
      >
        {label}
      </a>
    </div>
  );
}
