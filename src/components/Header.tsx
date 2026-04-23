"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, EXTERNAL_LINKS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allNavLinks = [...NAV_LINKS.left, ...NAV_LINKS.right];

  return (
    <>
      <header className="bg-white w-full z-50 sticky top-0 border-b border-gray-200">
        {/* Desktop Header - Two Rows with Logo spanning full height */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-6 relative">
            {/* Logo - Positioned on the left */}
            <Link href="/" className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Royal Phuket City Hotel"
                className="h-12 w-auto"
              />
            </Link>

            {/* Reserve Button - Vertically centered on right */}
            <a
              href={EXTERNAL_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#8b7355] hover:bg-[#705c42] text-white text-[10px] tracking-[0.12em] uppercase font-medium py-2.5 px-5 transition-colors"
            >
              Reserve Now
            </a>

            {/* Row 1: Location text centered */}
            <div className="h-6 flex items-center justify-center">
              <span className="text-[9px] tracking-[0.15em] uppercase text-gray-500">
                Phuket Old Town, Phuket – Thailand
              </span>
            </div>

            {/* Row 2: Navigation centered with gold separator line above */}
            <div className="flex items-center justify-center pb-2">
              <div className="flex flex-col items-center mx-auto" style={{ maxWidth: "calc(100% - 280px)" }}>
                {/* Gold separator line - matches nav width */}
                <div className="w-full h-px bg-[#8b7355] mb-2" />
                {/* Navigation - Centered (with padding to account for logo and button) */}
                <nav className="flex items-center justify-center gap-2 lg:gap-3 xl:gap-5">
                {allNavLinks.map((link) => {
                  const hasDropdown = "dropdown" in link && link.dropdown;
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.href === "#" ? (
                        <button
                          className="text-[8px] lg:text-[9px] xl:text-[11px] tracking-[0.1em] xl:tracking-[0.12em] uppercase font-medium text-gray-700 hover:text-[#8b7355] transition-colors flex items-center gap-0.5 whitespace-nowrap cursor-default"
                        >
                          {link.label}
                          {hasDropdown && (
                            <svg className="w-2 h-2 xl:w-2.5 xl:h-2.5 ml-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[8px] lg:text-[9px] xl:text-[11px] tracking-[0.1em] xl:tracking-[0.12em] uppercase font-medium text-gray-700 hover:text-[#8b7355] transition-colors flex items-center gap-0.5 whitespace-nowrap"
                        >
                          {link.label}
                          {hasDropdown && (
                            <svg className="w-2 h-2 xl:w-2.5 xl:h-2.5 ml-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </Link>
                      )}

                      {/* Dropdown */}
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
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-4 py-2.5 text-[10px] tracking-[0.12em] uppercase font-medium text-gray-700 hover:bg-gray-50 hover:text-[#8b7355] transition-colors"
                                  >
                                    {item.label}
                                  </Link>
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

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.svg"
                  alt="Royal Phuket City Hotel"
                  className="h-10 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-700"
                aria-label="Open menu"
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
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
