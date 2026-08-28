"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import CountryPhoneSelector from "./CountryPhoneSelector";
import CountrySelector from "./CountrySelector";
import CalendarPicker from "./CalendarPicker";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getMeetingPageCopy } from "@/lib/i18n/meeting-copy";
import { localizeHref } from "@/lib/i18n/path";

interface SubmittedData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  eventDate: string;
  numberOfGuests: number;
  eventDetails: string;
  referenceNumber?: string;
}

export default function EventInquiryForm({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const t = getMeetingPageCopy(locale);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    companyName: "",
    eventDate: "",
    numberOfGuests: 50,
    eventDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const formLoadedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const handleDateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventDate: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Get honeypot value
    const form = e.target as HTMLFormElement;
    const honeypotInput = form.querySelector('input[name="_hp"]') as HTMLInputElement;
    const honeypotValue = honeypotInput?.value || "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: `Event Inquiry - ${formData.numberOfGuests} guests on ${formData.eventDate}`,
          message: `Country: ${formData.country}\nCompany: ${formData.companyName || "N/A"}\nEvent Date: ${formData.eventDate}\nNumber of Guests: ${formData.numberOfGuests}\n\nEvent Details:\n${formData.eventDetails}`,
          inquiry_type: "event",
          _hp: honeypotValue,
          _ts: formLoadedAt.current,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmittedData({
          ...formData,
          referenceNumber: data.referenceNumber,
        });
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          companyName: "",
          eventDate: "",
          numberOfGuests: 50,
          eventDetails: "",
        });
        formLoadedAt.current = Date.now();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewInquiry = () => {
    setSubmitStatus("idle");
    setSubmittedData(null);
  };

  const row = compact
    ? "flex min-w-0 flex-col gap-1.5"
    : "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6";
  const rowTop = compact
    ? "flex min-w-0 flex-col gap-1.5"
    : "flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6";
  const labelCls = compact ? "min-w-0" : "sm:w-40 sm:text-right flex-shrink-0";
  const fieldCls = compact
    ? "w-full min-w-0 px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
    : "flex-1 px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors";

  return (
    <section
      id="event-inquiry"
      className={compact ? "scroll-mt-4" : "py-20 md:py-28 bg-[--color-surface] scroll-mt-24"}
    >
      <div className={compact ? "" : "container mx-auto px-6"}>
        <div className={compact ? "min-w-0" : "max-w-3xl mx-auto"}>
          {!compact && (
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary] mb-4">
              {t.formTitle}
            </h2>
            <p className="text-[--color-text-secondary]">
              {t.formDesc}
            </p>
          </div>
          )}

          <div
            className={
              compact
                ? "relative min-w-0 overflow-hidden rounded-[16px] bg-[var(--m-card)] p-4"
                : "relative outline outline-[4px] md:outline-[8px] lg:outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12"
            }
          >
            <form onSubmit={handleSubmit} className="min-w-0 space-y-5">
            <div className={row}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.fullName}</span>
                <span className="block text-sm text-[--color-text-secondary] italic">{t.firstLast}</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={fieldCls}
              />
            </div>

            <div className={row}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.email}</span>
              </label>
              <div className={compact ? "relative min-w-0 w-full" : "flex-1 relative"}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors pr-10"
                />
                <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
            </div>

            <div className={row}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.phone}</span>
                <span className="block text-sm text-[--color-text-secondary] italic">{t.whatsapp}</span>
              </label>
              <div className="min-w-0 w-full">
              <CountryPhoneSelector
                value={formData.phone}
                onChange={handlePhoneChange}
                defaultCountry="TH"
                required
              />
              </div>
            </div>

            <div className={row}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.country}</span>
              </label>
              <div className="min-w-0 w-full">
              <CountrySelector
                value={formData.country}
                onChange={handleCountryChange}
                required
              />
              </div>
            </div>

            <div className={row}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.company}</span>
                <span className="block text-sm text-[--color-text-secondary] italic">{t.optional}</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={fieldCls}
              />
            </div>

            <div className={row}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.eventDate}</span>
              </label>
              <div className="min-w-0 w-full">
              <CalendarPicker
                value={formData.eventDate}
                onChange={handleDateChange}
                required
              />
              </div>
            </div>

            <div className={row}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.guests}</span>
                <span className="block text-sm text-[--color-text-secondary] italic">{t.attendees}</span>
              </label>
              <div className={compact ? "min-w-0 w-full" : "flex-1"}>
                <div className="flex min-w-0 items-center gap-3">
                  <input
                    type="range"
                    name="numberOfGuests"
                    min="10"
                    max="2300"
                    step="10"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    className="h-1 min-w-0 flex-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B7355]"
                  />
                  <span className="w-12 shrink-0 text-right font-medium text-[--color-text-primary]">
                    {formData.numberOfGuests}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[--color-text-secondary] mt-1">
                  <span>50</span>
                  <span>2300</span>
                </div>
              </div>
            </div>

            <div className={rowTop}>
              <label className={labelCls}>
                <span className="text-[--color-text-primary] font-medium">{t.details}</span>
              </label>
              <textarea
                name="eventDetails"
                value={formData.eventDetails}
                onChange={handleChange}
                rows={5}
                className={`${fieldCls} resize-none`}
                placeholder={t.placeholder}
              />
            </div>

            {/* Honeypot field - hidden from humans */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="_hp_event">Leave empty</label>
              <input type="text" id="_hp_event" name="_hp" tabIndex={-1} autoComplete="off" />
            </div>

            <div className={compact ? "pt-1" : "flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"}>
              {!compact && <div className="sm:w-40 flex-shrink-0" />}
              <div className={compact ? "" : "flex-1 flex justify-end"}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    compact
                      ? "flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--m-gold)] px-5 text-sm font-medium text-white disabled:opacity-50"
                      : "px-8 py-3 bg-[#8B7355] text-white font-medium tracking-wide hover:bg-[#7a6548] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  }
                >
                  {isSubmitting ? t.submitting : t.submit}
                </button>
              </div>
            </div>

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 text-red-700 border border-red-200 text-sm">
                  {t.error}{" "}
                  <a href="mailto:reservation@royalphuketcity.com" className="underline font-medium">
                    reservation@royalphuketcity.com
                  </a>
              </div>
            )}
          </form>

          {/* Success Message - Full Takeover */}
          {submitStatus === "success" && submittedData && (
            <div className={compact ? "bg-[var(--m-card)] flex flex-col items-center p-2" : "absolute inset-0 bg-white flex flex-col items-center justify-center p-8 md:p-12"}>
              {/* Success Icon */}
              <div className="w-20 h-20 bg-[#8B7355] rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Thank You Message */}
              <h3 className="font-heading text-2xl md:text-3xl text-[--color-text-primary] text-center mb-2">
                {t.thankYou}, {submittedData.fullName}!
              </h3>
              <p className="text-[--color-text-secondary] text-center mb-6 max-w-md">
                {t.successBody}
              </p>

              {/* Reference Number */}
              {submittedData.referenceNumber && (
                <div className="bg-[#faf9f7] border border-[#8B7355]/20 px-6 py-4 mb-8 text-center">
                  <p className="text-sm text-[--color-text-secondary] mb-1">{t.refNumber}</p>
                  <p className="text-2xl font-bold text-[#8B7355] tracking-wider">{submittedData.referenceNumber}</p>
                  <p className="text-xs text-[--color-text-secondary] mt-2">{t.saveRef}</p>
                </div>
              )}

              {/* Submission Summary */}
              <div className="w-full max-w-md bg-[#faf9f7] p-6 mb-8">
                <h4 className="font-medium text-[--color-text-primary] mb-4 pb-2 border-b border-gray-200">
                  {t.summary}
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">{t.email}:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">{t.phone}:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">{t.country}:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.country}</dd>
                  </div>
                  {submittedData.companyName && (
                    <div className="flex justify-between">
                      <dt className="text-[--color-text-secondary]">{t.company}:</dt>
                      <dd className="text-[--color-text-primary] font-medium">{submittedData.companyName}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">{t.eventDate}:</dt>
                    <dd className="text-[--color-text-primary] font-medium">
                      {new Date(submittedData.eventDate).toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">{t.guests}:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.numberOfGuests}</dd>
                  </div>
                </dl>
              </div>

              {/* Confirmation Email Notice */}
              <div className="flex items-center gap-3 text-sm text-[--color-text-secondary] mb-8">
                <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>{t.confirmEmail} <strong>{submittedData.email}</strong></span>
              </div>

              {/* Response Time */}
              <div className="bg-[#8B7355] text-white px-6 py-4 text-center mb-8">
                <p className="text-sm opacity-80 mb-1">{t.respondWithin}</p>
                <p className="text-xl font-bold">{t.hours}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleNewInquiry}
                  className="px-8 py-3 border-2 border-[#8B7355] text-[#8B7355] font-medium tracking-wide hover:bg-[#8B7355] hover:text-white transition-colors"
                >
                  {t.newInquiry}
                </button>
                <Link
                  href={localizeHref("/", locale)}
                  className="px-8 py-3 bg-[#1a1a2e] text-white font-medium tracking-wide hover:bg-[#2a2a3e] transition-colors text-center"
                >
                  {t.returnHome}
                </Link>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
