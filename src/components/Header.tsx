"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { getNavLinks } from "@/lib/i18n/nav";
import { useLocale } from "@/components/i18n/LocaleProvider";
import LocaleLink from "@/components/i18n/LocaleLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SHOW_LANGUAGE_SWITCHER } from "@/lib/i18n/config";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { locale, t } = useLocale();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nav = getNavLinks(t);
  const allNavLinks = [...nav.left, ...nav.right];
  const isThai = locale === "th";
  const navClass = isThai
    ? "text-[12px] xl:text-[13px] font-medium text-gray-700 hover:text-[#8b7355] transition-colors flex items-center gap-0.5 whitespace-nowrap"
    : "text-[8px] lg:text-[9px] xl:text-[11px] tracking-[0.1em] xl:tracking-[0.12em] uppercase font-medium text-gray-700 hover:text-[#8b7355] transition-colors flex items-center gap-0.5 whitespace-nowrap";

  return (
    <>
      <header className="bg-white w-full z-50 sticky top-0 border-b border-gray-200">
        <div className="hidden lg:block">
          <div className="container mx-auto px-6 relative">
            <LocaleLink href="/" className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Royal Phuket City Hotel"
                className="h-12 w-auto"
              />
            </LocaleLink>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex items-center gap-3">
              {SHOW_LANGUAGE_SWITCHER && <LanguageSwitcher />}
              <a
                href={EXTERNAL_LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-[#8b7355] hover:bg-[#705c42] text-white font-medium py-2.5 px-5 transition-colors ${
                  isThai
                    ? "text-[13px]"
                    : "text-[10px] tracking-[0.12em] uppercase"
                }`}
              >
                {t.header.reserve}
              </a>
            </div>

            <div className="h-6 flex items-center justify-center">
              <span
                className={
                  isThai
                    ? "text-[11px] text-gray-500"
                    : "text-[9px] tracking-[0.15em] uppercase text-gray-500"
                }
              >
                {t.header.location}
              </span>
            </div>

            <div className="flex items-center justify-center pb-2">
              <div
                className="flex flex-col items-center mx-auto"
                style={{ maxWidth: "calc(100% - 360px)" }}
              >
                <div className="w-full h-px bg-[#8b7355] mb-2" />
                <nav className="flex items-center justify-center gap-2 lg:gap-3 xl:gap-5">
                  {allNavLinks.map((link) => {
                    const hasDropdown = "dropdown" in link && link.dropdown;
                    return (
                      <div
                        key={link.label}
                        className="relative"
                        onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {link.href === "#" ? (
                          <button className={`${navClass} cursor-default`}>
                            {link.label}
                            {hasDropdown && (
                              <svg className="w-2 h-2 xl:w-2.5 xl:h-2.5 ml-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </button>
                        ) : (
                          <LocaleLink href={link.href} className={navClass}>
                            {link.label}
                            {hasDropdown && (
                              <svg className="w-2 h-2 xl:w-2.5 xl:h-2.5 ml-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </LocaleLink>
                        )}

                        {hasDropdown && (
                          <AnimatePresence>
                            {activeDropdown === link.label && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border border-gray-100 z-50"
                              >
                                <div className="py-1">
                                  {link.dropdown.map((item) => (
                                    <LocaleLink
                                      key={item.href}
                                      href={item.href}
                                      className={
                                        isThai
                                          ? "block px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-[#8b7355] transition-colors"
                                          : "block px-4 py-2.5 text-[10px] tracking-[0.12em] uppercase font-medium text-gray-700 hover:bg-gray-50 hover:text-[#8b7355] transition-colors"
                                      }
                                    >
                                      {item.label}
                                    </LocaleLink>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <LocaleLink href="/" className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.svg"
                  alt="Royal Phuket City Hotel"
                  className="h-10 w-auto"
                />
              </LocaleLink>
              <div className="flex items-center gap-1">
                {SHOW_LANGUAGE_SWITCHER && <LanguageSwitcher compact />}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 text-gray-700 min-h-11 min-w-11"
                  aria-label={t.header.openMenu}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
