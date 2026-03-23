"use client";

import { useState } from "react";

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
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData(initialFormData);
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
          <p className="font-medium">Thank you for your message!</p>
          <p>We will get back to you as soon as possible.</p>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
          <p className="font-medium">Failed to send message</p>
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
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block label-accent text-[--color-text-primary] mb-2"
          >
            Email *
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
            htmlFor="phone"
            className="block label-accent text-[--color-text-primary] mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
            placeholder="+66 XX XXX XXXX"
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <label
            htmlFor="inquiry_type"
            className="block label-accent text-[--color-text-primary] mb-2"
          >
            Inquiry Type
          </label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            value={formData.inquiry_type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
          >
            <option value="general">General Inquiry</option>
            <option value="reservation">Reservation</option>
            <option value="corporate">Corporate / MICE</option>
            <option value="wedding">Wedding</option>
            <option value="dining">Dining Reservation</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block label-accent text-[--color-text-primary] mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
          placeholder="How can we help?"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block label-accent text-[--color-text-primary] mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
