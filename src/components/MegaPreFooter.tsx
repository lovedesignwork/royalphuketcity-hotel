import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/path";
import { PRE_FOOTER_COPY, PRE_FOOTER_GROUPS } from "@/lib/pre-footer";

export default function MegaPreFooter({ locale }: { locale: Locale }) {
  return (
    <nav
      aria-labelledby="pre-footer-heading"
      className="border-t border-border bg-surface text-text-primary [overflow-wrap:anywhere]"
    >
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex min-w-0 flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="min-w-0 max-w-2xl">
            <h2 id="pre-footer-heading" className="font-heading text-3xl leading-tight md:text-4xl">
              {PRE_FOOTER_COPY.title[locale]}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {PRE_FOOTER_COPY.description[locale]}
            </p>
          </div>
          <Link
            href={localizeHref("/blog", locale)}
            prefetch={false}
            className="inline-flex min-h-11 max-w-full shrink-0 items-center self-start border-b border-accent py-2 text-sm text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:self-auto"
          >
            {PRE_FOOTER_COPY.blog[locale]}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-9 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {PRE_FOOTER_GROUPS.map((group) => (
            <div key={group.id} className="min-w-0">
              <h3 className="mb-3 font-heading text-xl leading-snug">
                {group.title[locale]}
              </h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href} className="min-w-0">
                    <Link
                      href={localizeHref(link.href, locale)}
                      prefetch={false}
                      className="inline-flex min-h-11 max-w-full items-center py-2 text-sm leading-relaxed text-text-secondary underline-offset-4 transition-colors hover:text-accent-hover hover:underline focus-visible:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {link.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
