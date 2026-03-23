"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, EXTERNAL_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  const allLinks = [...NAV_LINKS.left, ...NAV_LINKS.right];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading text-xl">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-[--color-text-primary] hover:opacity-70"
                  aria-label="Close menu"
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

              {/* Navigation Links */}
              <nav className="space-y-1">
                {allLinks.map((link) => (
                  <div key={link.href} className="hairline-border-b">
                    {"dropdown" in link && link.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedDropdown(
                              expandedDropdown === link.label ? null : link.label
                            )
                          }
                          className="flex items-center justify-between w-full py-4 text-left"
                        >
                          <span className="label-accent text-[--color-text-primary]">
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
                                <Link
                                  href={link.href}
                                  onClick={onClose}
                                  className="block text-sm text-[--color-text-secondary] hover:text-[--color-accent]"
                                >
                                  View All
                                </Link>
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="block text-sm text-[--color-text-secondary] hover:text-[--color-accent]"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block py-4 label-accent text-[--color-text-primary] hover:text-[--color-accent]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}

                <Link
                  href="/sustainability"
                  onClick={onClose}
                  className="block py-4 label-accent text-[--color-accent] hairline-border-b"
                >
                  Sustainability
                </Link>
              </nav>

              {/* Reserve Button */}
              <div className="mt-8">
                <a
                  href={EXTERNAL_LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  Reserve Now
                </a>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 hairline-border-t">
                <p className="text-sm text-[--color-text-secondary] mb-2">
                  154 Phang-Nga Road, Talad Yai
                </p>
                <p className="text-sm text-[--color-text-secondary] mb-4">
                  Muang, Phuket 83000, Thailand
                </p>
                <a
                  href="tel:+6676233355"
                  className="text-sm text-[--color-accent] hover:underline"
                >
                  +66 76 233 355
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
