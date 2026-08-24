"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXTERNAL_LINKS, HOTEL_INFO } from "@/lib/constants";
import { getNavLinks } from "@/lib/i18n/nav";
import { useLocale } from "@/components/i18n/LocaleProvider";
import LocaleLink from "@/components/i18n/LocaleLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SHOW_LANGUAGE_SWITCHER } from "@/lib/i18n/config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { locale, t } = useLocale();
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);
  const nav = getNavLinks(t);
  const allLinks = [...nav.left, ...nav.right];
  const isThai = locale === "th";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.svg"
                  alt="Royal Phuket City Hotel"
                  className="h-[70px] w-auto"
                />
                <button
                  onClick={onClose}
                  className="p-2 min-h-11 min-w-11 text-[--color-text-primary] hover:opacity-70"
                  aria-label={t.header.closeMenu}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {SHOW_LANGUAGE_SWITCHER && (
                <div className="mb-6 pb-6 hairline-border-b">
                  <LanguageSwitcher compact />
                </div>
              )}

              <nav className="space-y-1">
                {allLinks.map((link) => (
                  <div key={link.label} className="hairline-border-b">
                    {"dropdown" in link && link.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedDropdown(
                              expandedDropdown === link.label ? null : link.label
                            )
                          }
                          className="flex items-center justify-between w-full py-4 text-left min-h-11"
                        >
                          <span className={`text-[--color-text-primary] ${isThai ? "text-[15px] font-medium" : "label-accent"}`}>
                            {link.label}
                          </span>
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              expandedDropdown === link.label ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {expandedDropdown === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 pl-4 space-y-3">
                                {link.href !== "#" && (
                                  <LocaleLink
                                    href={link.href}
                                    onClick={onClose}
                                    className="block text-sm text-[--color-text-secondary] hover:text-[--color-accent] min-h-11 py-2"
                                  >
                                    {t.header.viewAll}
                                  </LocaleLink>
                                )}
                                {link.dropdown.map((item) => (
                                  <LocaleLink
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="block text-sm text-[--color-text-secondary] hover:text-[--color-accent] min-h-11 py-2"
                                  >
                                    {item.label}
                                  </LocaleLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <LocaleLink
                        href={link.href}
                        onClick={onClose}
                        className={`block py-4 min-h-11 text-[--color-text-primary] hover:text-[--color-accent] ${isThai ? "text-[15px] font-medium" : "label-accent"}`}
                      >
                        {link.label}
                      </LocaleLink>
                    )}
                  </div>
                ))}

                <LocaleLink
                  href="/sustainability"
                  onClick={onClose}
                  className={`block py-4 min-h-11 text-[--color-accent] hairline-border-b ${isThai ? "text-[15px] font-medium" : "label-accent"}`}
                >
                  {t.nav.sustainability}
                </LocaleLink>
              </nav>

              <div className="mt-8">
                <a
                  href={EXTERNAL_LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  {t.header.reserve}
                </a>
              </div>

              <div className="mt-8 pt-8 hairline-border-t">
                <a
                  href={EXTERNAL_LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-3 min-h-11 font-medium border border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-white transition-colors mb-4 ${
                    isThai ? "text-sm" : "text-xs tracking-[0.12em] uppercase"
                  }`}
                >
                  {t.footer.directions}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
                <p className="text-sm text-[--color-text-secondary] mb-2">
                  {t.footer.address1}
                </p>
                <p className="text-sm text-[--color-text-secondary] mb-4">
                  {t.footer.address2}
                </p>
                <a
                  href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                  className="text-sm text-[--color-accent] hover:underline"
                >
                  {HOTEL_INFO.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
