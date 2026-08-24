"use client";

import { useState, useRef } from "react";
import CountryPhoneSelector from "./CountryPhoneSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  inquiry_type: "general",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const { t } = useLocale();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const formLoadedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Get honeypot value
    const form = e.target as HTMLFormElement;
    const honeypotInput = form.querySelector('input[name="_hp"]') as HTMLInputElement;
    const honeypotValue = honeypotInput?.value || "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _hp: honeypotValue,
          _ts: formLoadedAt.current,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData(initialFormData);
      formLoadedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
          <p className="font-medium">{t.form.success}</p>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
          <p className="font-medium">{t.form.error}</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block label-accent text-[--color-text-primary] mb-2"
          >
            {t.form.name} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
            placeholder={t.contactPage.namePlaceholder}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block label-accent text-[--color-text-primary] mb-2"
          >
            {t.form.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label
            className="block label-accent text-[--color-text-primary] mb-2"
          >
            {t.form.phone}
          </label>
          <CountryPhoneSelector
            value={formData.phone}
            onChange={handlePhoneChange}
            defaultCountry="TH"
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <label
            htmlFor="inquiry_type"
            className="block label-accent text-[--color-text-primary] mb-2"
          >
            {t.form.inquiry}
          </label>
          <div className="relative">
            <select
              id="inquiry_type"
              name="inquiry_type"
              value={formData.inquiry_type}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="general">{t.form.general}</option>
              <option value="reservation">{t.form.reservation}</option>
              <option value="corporate">{t.form.event}</option>
              <option value="wedding">{t.form.wedding}</option>
              <option value="dining">{t.nav.dining}</option>
              <option value="feedback">{t.form.feedback}</option>
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block label-accent text-[--color-text-primary] mb-2"
        >
          {t.form.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
          placeholder={t.contactPage.subjectPlaceholder}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block label-accent text-[--color-text-primary] mb-2"
        >
          {t.form.message} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors resize-none"
          placeholder={t.contactPage.messagePlaceholder}
        />
      </div>

      {/* Honeypot field - hidden from humans, bots will fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_hp">Leave this empty</label>
        <input
          type="text"
          id="_hp"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? t.form.sending : t.form.send}
      </button>
    </form>
  );
}
