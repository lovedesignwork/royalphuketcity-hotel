"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import CountryPhoneSelector from "@/components/CountryPhoneSelector";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
}

interface DocumentLanguage {
  code: string;
  label: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

interface Document {
  id: string;
  title: string;
  description: string;
  icon: string;
  languages: DocumentLanguage[];
}

const LANGUAGE_FLAGS: Record<string, { code: string; name: string }> = {
  en: { code: "gb", name: "United Kingdom" },
  ru: { code: "ru", name: "Russia" },
  zh: { code: "cn", name: "China" },
  ko: { code: "kr", name: "South Korea" },
  vi: { code: "vn", name: "Vietnam" },
};

function FlagIcon({ langCode, size = 24 }: { langCode: string; size?: number }) {
  const flag = LANGUAGE_FLAGS[langCode];
  if (!flag) return null;
  
  return (
    <Image
      src={`https://flagcdn.com/w40/${flag.code}.png`}
      alt={flag.name}
      width={size}
      height={Math.round(size * 0.75)}
      className="inline-block object-cover"
      style={{ borderRadius: 2 }}
    />
  );
}

const DOCUMENT_PREVIEWS = [
  { id: "company-presentation", title: "Company Presentation", icon: "presentation" },
  { id: "hotel-presentation", title: "Hotel Presentation", icon: "hotel" },
  { id: "mice-presentation", title: "MICE Presentation", icon: "mice" },
  { id: "fact-sheet", title: "Fact Sheet", icon: "factsheet" },
];

function getDocumentIcon(icon: string) {
  switch (icon) {
    case "presentation":
    case "building":
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      );
    case "hotel":
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      );
    case "mice":
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      );
    case "factsheet":
    case "document":
    default:
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return " (" + parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i] + ")";
}

export default function DownloadFactSheetsPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);

  const fetchDocuments = useCallback(async () => {
    setIsLoadingDocs(true);
    try {
      const response = await fetch("/api/downloads");
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      }
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setIsLoadingDocs(false);
    }
  }, []);

  useEffect(() => {
    // Check if user already has access
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("rpc_download_access");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          const timestamp = new Date(data.timestamp);
          const now = new Date();
          const diffDays = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24);
          if (diffDays < 30) {
            setIsUnlocked(true);
          }
        } catch {
          // Invalid data, ignore
        }
      }
    }
  }, []);

  useEffect(() => {
    // Fetch documents when unlocked
    if (isUnlocked) {
      fetchDocuments();
    }
  }, [isUnlocked, fetchDocuments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: "Download Request - Fact Sheets & Presentations",
          message: `Company: ${formData.companyName || "N/A"}\n\nRequested access to download company documents.`,
          inquiry_type: "download",
        }),
      });

      if (response.ok) {
        setIsUnlocked(true);
        localStorage.setItem("rpc_download_access", JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }));
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <HeroSection
        title="Downloads"
        subtitle="Brochures & Fact Sheets"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
        height="medium"
      />

      {!isUnlocked ? (
        // Lead Capture Form
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
                  Get Instant Access
                </p>
                <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary] mb-4">
                  Download Our Documents
                </h2>
                <p className="text-[--color-text-secondary] max-w-xl mx-auto">
                  Please provide your details to access our company presentations, hotel brochures, MICE materials, and fact sheets in multiple languages.
                </p>
              </div>

              {/* Document Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {DOCUMENT_PREVIEWS.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-[--color-surface] p-4 text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355]">
                      {getDocumentIcon(doc.icon)}
                    </div>
                    <p className="text-sm font-medium text-[--color-text-primary]">
                      {doc.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="outline outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[--color-text-primary] font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[--color-text-primary] font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[--color-text-primary] font-medium mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <CountryPhoneSelector
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      defaultCountry="TH"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-[--color-text-primary] font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter your company name (optional)"
                      className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 border border-red-200">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase hover:bg-[#7a6548] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        Unlock Downloads
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[--color-text-secondary] text-center">
                    By submitting this form, you agree to receive communications from Royal Phuket City Hotel.
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Download Section (Unlocked)
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* Success Message */}
              <div className="text-center mb-16">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
                  Access Granted
                </p>
                <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary] mb-4">
                  Download Our Documents
                </h2>
                <p className="text-[--color-text-secondary] max-w-xl mx-auto">
                  Select your preferred language for each document. All files are available in PDF format.
                </p>
              </div>

              {/* Loading State */}
              {isLoadingDocs ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B7355]"></div>
                </div>
              ) : documents.length > 0 ? (
                // Documents Grid
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-200 hover:border-[#8B7355] transition-colors bg-white"
                    >
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355] flex-shrink-0">
                            {getDocumentIcon(doc.icon)}
                          </div>
                          <div>
                            <h3 className="font-heading text-xl text-[--color-text-primary] mb-2">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-[--color-text-secondary]">
                              {doc.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-widest text-[--color-text-secondary] mb-4">
                          Available Languages ({doc.languages.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {doc.languages.map((lang) => (
                            <a
                              key={lang.code}
                              href={lang.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-[#8B7355] hover:bg-[#8B7355]/5 transition-colors text-sm"
                            >
                              <FlagIcon langCode={lang.code} size={20} />
                              <span className="text-[--color-text-primary]">
                                {lang.label}
                                <span className="text-[--color-text-secondary] text-xs">
                                  {formatFileSize(lang.fileSize)}
                                </span>
                              </span>
                              <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // No Documents Available
                <div className="text-center py-12 bg-[--color-surface]">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <h3 className="font-heading text-xl text-[--color-text-primary] mb-2">
                    Documents Coming Soon
                  </h3>
                  <p className="text-[--color-text-secondary] mb-6">
                    Our team is currently preparing the documents. Please check back later.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
                  >
                    Contact Us for Documents
                  </Link>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-16 bg-[--color-surface] p-8 text-center">
                <h3 className="font-heading text-xl text-[--color-text-primary] mb-4">
                  Need Customized Information?
                </h3>
                <p className="text-[--color-text-secondary] mb-6 max-w-xl mx-auto">
                  If you require additional materials or customized presentations for your specific needs, 
                  our team is ready to assist you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
                >
                  Contact Our Team
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Download Section */}
      <section className="py-16 md:py-20 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl text-[--color-text-primary]">
                What&apos;s Included
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355] mb-4">
                  {getDocumentIcon("presentation")}
                </div>
                <h3 className="font-heading text-lg text-[--color-text-primary] mb-2">
                  Company Presentation
                </h3>
                <p className="text-sm text-[--color-text-secondary]">
                  Our story, vision, and commitment to hospitality excellence since 1998.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355] mb-4">
                  {getDocumentIcon("hotel")}
                </div>
                <h3 className="font-heading text-lg text-[--color-text-primary] mb-2">
                  Hotel Presentation
                </h3>
                <p className="text-sm text-[--color-text-secondary]">
                  251 rooms, 5 restaurants, facilities, and guest services overview.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355] mb-4">
                  {getDocumentIcon("mice")}
                </div>
                <h3 className="font-heading text-lg text-[--color-text-primary] mb-2">
                  MICE Presentation
                </h3>
                <p className="text-sm text-[--color-text-secondary]">
                  9 meeting rooms, grand ballroom, AV equipment, and event packages.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 bg-[#8B7355]/10 flex items-center justify-center text-[#8B7355] mb-4">
                  {getDocumentIcon("factsheet")}
                </div>
                <h3 className="font-heading text-lg text-[--color-text-primary] mb-2">
                  Fact Sheet
                </h3>
                <p className="text-sm text-[--color-text-secondary]">
                  Quick reference with key facts, specifications, and contact details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Available */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-sm text-[--color-text-secondary] uppercase tracking-widest">
              Available in:
            </span>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[--color-text-primary]">
                <FlagIcon langCode="en" size={24} /> English
              </span>
              <span className="flex items-center gap-2 text-[--color-text-primary]">
                <FlagIcon langCode="ru" size={24} /> Russian
              </span>
              <span className="flex items-center gap-2 text-[--color-text-primary]">
                <FlagIcon langCode="zh" size={24} /> Chinese
              </span>
              <span className="flex items-center gap-2 text-[--color-text-primary]">
                <FlagIcon langCode="ko" size={24} /> Korean
              </span>
              <span className="flex items-center gap-2 text-[--color-text-primary]">
                <FlagIcon langCode="vi" size={24} /> Vietnamese
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
