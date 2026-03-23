"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, EXTERNAL_LINKS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header Wrapper - Sticky position */}
      <header className="bg-white w-full z-50 shadow-sm sticky top-0">
        {/* Top Bar */}
        <div className="hairline-border-b">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-10 text-xs">
              <span className="label-accent text-[--color-text-secondary]">
                Phuket Old Town, Phuket – Thailand
              </span>
              <a
                href={EXTERNAL_LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 px-4 text-[10px]"
              >
                Reserve Now
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="container mx-auto px-6 hairline-border-b">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.left.map((link) => {
                const hasDropdown = "dropdown" in link && link.dropdown;
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() =>
                      hasDropdown && setActiveDropdown(link.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="label-accent text-[--color-text-primary] hover:text-[--color-accent] transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      {hasDropdown && (
                        <svg
                          className="w-3 h-3"
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
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {hasDropdown && (
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg hairline-border z-50"
                          >
                            <div className="py-2">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block px-4 py-3 text-[10px] tracking-[0.15em] uppercase font-medium text-[--color-text-primary] hover:bg-[--color-surface] hover:text-[--color-accent] transition-colors"
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
            </div>

            {/* Center Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-heading text-2xl md:text-3xl font-normal tracking-tight text-[--color-text-primary]">
                Royal Phuket City
              </h1>
            </Link>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.right.map((link) => {
                const hasDropdown = "dropdown" in link && link.dropdown;
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() =>
                      hasDropdown && setActiveDropdown(link.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="label-accent text-[--color-text-primary] hover:text-[--color-accent] transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      {hasDropdown && (
                        <svg
                          className="w-3 h-3"
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
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {hasDropdown && (
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg hairline-border z-50"
                          >
                            <div className="py-2">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block px-4 py-3 text-[10px] tracking-[0.15em] uppercase font-medium text-[--color-text-primary] hover:bg-[--color-surface] hover:text-[--color-accent] transition-colors"
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
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[--color-text-primary]"
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
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
