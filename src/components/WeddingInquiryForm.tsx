"use client";

import { useState } from "react";
import Link from "next/link";
import CountryPhoneSelector from "./CountryPhoneSelector";
import CountrySelector from "./CountrySelector";
import CalendarPicker from "./CalendarPicker";

interface SubmittedData {
  fullName: string;
  partnerName: string;
  email: string;
  phone: string;
  country: string;
  weddingDate: string;
  numberOfGuests: number;
  weddingDetails: string;
  referenceNumber?: string;
}

export default function WeddingInquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    partnerName: "",
    email: "",
    phone: "",
    country: "",
    weddingDate: "",
    numberOfGuests: 100,
    weddingDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

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
    setFormData((prev) => ({ ...prev, weddingDate: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: `Wedding Inquiry - ${formData.fullName} & ${formData.partnerName} on ${formData.weddingDate}`,
          message: `Partner Name: ${formData.partnerName}\nCountry: ${formData.country}\nWedding Date: ${formData.weddingDate}\nNumber of Guests: ${formData.numberOfGuests}\n\nWedding Details:\n${formData.weddingDetails}`,
          inquiry_type: "wedding",
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
          partnerName: "",
          email: "",
          phone: "",
          country: "",
          weddingDate: "",
          numberOfGuests: 100,
          weddingDetails: "",
        });
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

  return (
    <section id="wedding-inquiry" className="py-20 md:py-28 bg-[--color-surface] scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header - Outside the box */}
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary] mb-4">
              Plan Your Dream Wedding
            </h2>
            <p className="text-[--color-text-secondary]">
              Our dedicated wedding specialist is ready to help you create your perfect day
            </p>
          </div>

          {/* Form Container with Double Stroke - White outer, Gold inner */}
          <div className="relative outline outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Your Name</span>
                <span className="block text-sm text-[--color-text-secondary] italic">first & last name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
              />
            </div>

            {/* Partner's Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Partner&apos;s Name</span>
                <span className="block text-sm text-[--color-text-secondary] italic">first & last name</span>
              </label>
              <input
                type="text"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Email</span>
              </label>
              <div className="flex-1 relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors pr-10"
                />
                <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
            </div>

            {/* Phone with Country Code */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Phone number</span>
                <span className="block text-sm text-[--color-text-secondary] italic">whatsapp</span>
              </label>
              <CountryPhoneSelector
                value={formData.phone}
                onChange={handlePhoneChange}
                defaultCountry="TH"
                required
              />
            </div>

            {/* Country with Flags */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Country</span>
              </label>
              <CountrySelector
                value={formData.country}
                onChange={handleCountryChange}
                required
              />
            </div>

            {/* Wedding Date with Calendar Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Wedding Date</span>
                <span className="block text-sm text-[--color-text-secondary] italic">planned date</span>
              </label>
              <CalendarPicker
                value={formData.weddingDate}
                onChange={handleDateChange}
                required
              />
            </div>

            {/* Number of Guests */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Number of Guests</span>
                <span className="block text-sm text-[--color-text-secondary] italic">estimated</span>
              </label>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    name="numberOfGuests"
                    min="20"
                    max="2300"
                    step="10"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B7355]"
                  />
                  <span className="text-[--color-text-primary] font-medium min-w-[60px] text-right">
                    {formData.numberOfGuests}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[--color-text-secondary] mt-1">
                  <span>20</span>
                  <span>2300</span>
                </div>
              </div>
            </div>

            {/* Wedding Details */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label className="sm:w-40 sm:text-right pt-3 flex-shrink-0">
                <span className="text-[--color-text-primary] font-medium">Tell Us More</span>
                <span className="block text-sm text-[--color-text-secondary] italic">your vision</span>
              </label>
              <textarea
                name="weddingDetails"
                value={formData.weddingDetails}
                onChange={handleChange}
                rows={5}
                className="flex-1 px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors resize-none"
                placeholder="Share your wedding vision, theme preferences, special requirements, or any questions you have..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <div className="sm:w-40 flex-shrink-0" />
              <div className="flex-1 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#8B7355] text-white font-medium tracking-wide hover:bg-[#7a6548] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <div className="sm:w-40 flex-shrink-0" />
                <div className="flex-1 p-4 bg-red-50 text-red-700 border border-red-200">
                  Something went wrong. Please try again or contact us directly at{" "}
                  <a href="mailto:narin.r@royalphuketcity.com" className="underline font-medium">
                    narin.r@royalphuketcity.com
                  </a>
                </div>
              </div>
            )}
          </form>

          {/* Success Message - Full Takeover */}
          {submitStatus === "success" && submittedData && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 md:p-12">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-[#8B7355] rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

              {/* Thank You Message */}
              <h3 className="font-heading text-2xl md:text-3xl text-[--color-text-primary] text-center mb-2">
                Thank You, {submittedData.fullName}!
              </h3>
              <p className="text-[--color-text-secondary] text-center mb-6 max-w-md">
                Your wedding inquiry has been successfully submitted. Our wedding specialist will review your request and contact you shortly to begin planning your special day.
              </p>

              {/* Reference Number */}
              {submittedData.referenceNumber && (
                <div className="bg-[#faf9f7] border border-[#8B7355]/20 px-6 py-4 mb-8 text-center">
                  <p className="text-sm text-[--color-text-secondary] mb-1">Your Reference Number</p>
                  <p className="text-2xl font-bold text-[#8B7355] tracking-wider">{submittedData.referenceNumber}</p>
                  <p className="text-xs text-[--color-text-secondary] mt-2">Please save this for your records</p>
                </div>
              )}

              {/* Submission Summary */}
              <div className="w-full max-w-md bg-[#faf9f7] p-6 mb-8">
                <h4 className="font-medium text-[--color-text-primary] mb-4 pb-2 border-b border-gray-200">
                  Your Wedding Inquiry Summary
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">Couple:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.fullName} & {submittedData.partnerName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">Email:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">Phone:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">Country:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.country}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">Wedding Date:</dt>
                    <dd className="text-[--color-text-primary] font-medium">
                      {new Date(submittedData.weddingDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[--color-text-secondary]">Number of Guests:</dt>
                    <dd className="text-[--color-text-primary] font-medium">{submittedData.numberOfGuests}</dd>
                  </div>
                </dl>
              </div>

              {/* Confirmation Email Notice */}
              <div className="flex items-center gap-3 text-sm text-[--color-text-secondary] mb-8">
                <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>A confirmation email has been sent to <strong>{submittedData.email}</strong></span>
              </div>

              {/* Response Time */}
              <div className="bg-[#8B7355] text-white px-6 py-4 text-center mb-8">
                <p className="text-sm opacity-80 mb-1">Our wedding team typically responds within</p>
                <p className="text-xl font-bold">24-48 Business Hours</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleNewInquiry}
                  className="px-8 py-3 border-2 border-[#8B7355] text-[#8B7355] font-medium tracking-wide hover:bg-[#8B7355] hover:text-white transition-colors"
                >
                  Submit Another Inquiry
                </button>
                <Link
                  href="/"
                  className="px-8 py-3 bg-[#1a1a2e] text-white font-medium tracking-wide hover:bg-[#2a2a3e] transition-colors text-center"
                >
                  Return to Homepage
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
