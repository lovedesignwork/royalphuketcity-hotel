"use client";

import { hotelDateValue } from "@/lib/guest-form-validation";

interface CalendarPickerProps {
  value: string;
  onChange: (value: string) => void;
  minDate?: Date;
  required?: boolean;
  id?: string;
}

export default function CalendarPicker({ value, onChange, minDate = new Date(), required = false, id = "event-date" }: CalendarPickerProps) {
  return (
    <input
      id={id}
      type="date"
      name="eventDate"
      aria-label="Event date"
      value={value}
      min={hotelDateValue(minDate)}
      onChange={(event) => onChange(event.target.value)}
      required={required}
      className="w-full min-w-0 px-4 py-3 bg-white hairline-border focus:border-[--color-accent] focus:outline-none transition-colors"
    />
  );
}
