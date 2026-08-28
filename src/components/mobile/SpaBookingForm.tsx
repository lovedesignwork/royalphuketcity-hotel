"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import CountryPhoneSelector from "@/components/CountryPhoneSelector";
import MobileLink from "@/components/mobile/MobileLink";
import { EXTERNAL_LINKS } from "@/lib/constants";
import {
  HOTEL_GUEST_DISCOUNT,
  formatBaht,
  getSpaTreatment,
  parseDurationOptions,
  spaTreatments,
  type Treatment,
} from "@/lib/spa-treatments";

const TIMES = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

function datesAhead(days: number) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

function formatDay(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function SpaBookingForm() {
  const searchParams = useSearchParams();
  const presetId = Number(searchParams.get("treatment") || "");
  const preset = getSpaTreatment(presetId) ?? null;
  const formLoadedAt = useRef(Date.now());

  const [treatment, setTreatment] = useState<Treatment | null>(preset);
  const durationOptions = useMemo(
    () => (treatment ? parseDurationOptions(treatment) : []),
    [treatment]
  );
  const [duration, setDuration] = useState(durationOptions[0]?.duration ?? "");
  const [price, setPrice] = useState(durationOptions[0]?.price ?? 0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const dates = useMemo(() => datesAhead(14), []);
  const discounted = Math.round(price * (1 - HOTEL_GUEST_DISCOUNT));

  const chooseTreatment = (next: Treatment) => {
    const options = parseDurationOptions(next);
    setTreatment(next);
    setDuration(options[0]?.duration ?? "");
    setPrice(options[0]?.price ?? next.priceValue);
  };

  const chooseDuration = (option: { duration: string; price: number }) => {
    setDuration(option.duration);
    setPrice(option.price);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!treatment || !date || !time || !name || !email || !phone) {
      setError("Choose a treatment, time, and your contact details.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/spa/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          roomNumber,
          date,
          time,
          treatmentId: treatment.id,
          treatmentName: treatment.name,
          duration,
          amount: discounted,
          guests: treatment.isCouple ? 2 : 1,
          notes,
          _hp: (event.currentTarget.elements.namedItem("_hp") as HTMLInputElement)?.value,
          _ts: formLoadedAt.current,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Booking did not go through.");
      }
      setReference(data.reference || "");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking did not go through.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-[16px] bg-[var(--m-card)] p-5 text-center">
        <p className="text-sm text-[var(--m-gold)]">Request sent</p>
        <h2 className="mt-2 font-heading text-2xl">See you at the spa</h2>
        {reference ? (
          <p className="mt-3 text-sm text-[var(--m-muted)]">
            Reference <span className="font-medium text-[var(--m-ink)]">{reference}</span>
          </p>
        ) : null}
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--m-muted)]">
          {treatment?.name} on {date ? formatDay(date) : ""} at {time}. Pay at the spa on the
          3rd floor. Hotel guest 10% is already applied.
        </p>
        <MobileLink
          href="/spa"
          className="mt-5 flex min-h-11 items-center justify-center rounded-full bg-[var(--m-gold)] px-4 text-sm font-medium text-white"
        >
          Browse treatments
        </MobileLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-5">
      <p className="text-sm text-[var(--m-muted)]">
        Book a slot during your stay. Pay at the spa. Hotel guests get 10% off.
      </p>

      <div className="min-w-0">
        <label htmlFor="spa-treatment" className="mb-1.5 block font-medium">
          Treatment
        </label>
        <select
          id="spa-treatment"
          required
          value={treatment?.id ?? ""}
          onChange={(event) => {
            const next = getSpaTreatment(Number(event.target.value));
            if (next) chooseTreatment(next);
          }}
          className="w-full min-w-0 rounded-none bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        >
          <option value="" disabled>
            Select a treatment
          </option>
          {spaTreatments.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {durationOptions.length > 1 ? (
        <fieldset className="min-w-0">
          <legend className="mb-1.5 font-medium">Duration</legend>
          <div className="flex flex-wrap gap-2">
            {durationOptions.map((option) => {
              const selected = option.duration === duration;
              return (
                <button
                  key={option.duration}
                  type="button"
                  onClick={() => chooseDuration(option)}
                  className={`min-h-11 rounded-full px-4 text-sm ${
                    selected
                      ? "bg-[var(--m-gold)] font-medium text-white"
                      : "bg-[var(--m-card)] text-[var(--m-ink)]"
                  }`}
                >
                  {option.duration} · {formatBaht(option.price)}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <fieldset className="min-w-0">
        <legend className="mb-1.5 font-medium">Date</legend>
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2">
            {dates.map((value) => {
              const selected = value === date;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDate(value)}
                  className={`min-h-11 min-w-[4.5rem] rounded-[12px] px-3 text-sm ${
                    selected
                      ? "bg-[var(--m-gold)] font-medium text-white"
                      : "bg-[var(--m-card)]"
                  }`}
                >
                  {formatDay(value)}
                </button>
              );
            })}
          </div>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-1.5 font-medium">Time</legend>
        <div className="grid grid-cols-4 gap-2">
          {TIMES.map((value) => {
            const selected = value === time;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setTime(value)}
                className={`min-h-11 rounded-[12px] text-sm ${
                  selected
                    ? "bg-[var(--m-gold)] font-medium text-white"
                    : "bg-[var(--m-card)]"
                }`}
              >
                {value}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="min-w-0">
        <label htmlFor="spa-name" className="mb-1.5 block font-medium">
          Your name
        </label>
        <input
          id="spa-name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full min-w-0 bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="min-w-0">
        <label htmlFor="spa-email" className="mb-1.5 block font-medium">
          Email
        </label>
        <input
          id="spa-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full min-w-0 bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="min-w-0">
        <p className="mb-1.5 font-medium">Phone</p>
        <CountryPhoneSelector value={phone} onChange={setPhone} defaultCountry="TH" required />
      </div>

      <div className="min-w-0">
        <label htmlFor="spa-room" className="mb-1.5 block font-medium">
          Room number
        </label>
        <input
          id="spa-room"
          value={roomNumber}
          onChange={(event) => setRoomNumber(event.target.value)}
          placeholder="So the spa can find you"
          className="w-full min-w-0 bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="min-w-0">
        <label htmlFor="spa-notes" className="mb-1.5 block font-medium">
          Notes
        </label>
        <textarea
          id="spa-notes"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Pressure, allergies, or a preferred therapist"
          className="w-full min-w-0 resize-none bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_hp_spa">Leave empty</label>
        <input id="_hp_spa" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      {price > 0 ? (
        <div className="rounded-[16px] bg-[var(--m-card)] px-4 py-3 text-sm">
          <div className="flex justify-between text-[var(--m-muted)]">
            <span>Menu price</span>
            <span>{formatBaht(price)}</span>
          </div>
          <div className="mt-1 flex justify-between text-[var(--m-muted)]">
            <span>Hotel guest 10%</span>
            <span>-{formatBaht(price - discounted)}</span>
          </div>
          <div className="mt-2 flex justify-between font-medium">
            <span>Pay at spa</span>
            <span>{formatBaht(discounted)}</span>
          </div>
        </div>
      ) : null}

      {status === "error" && error ? (
        <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--m-gold)] px-5 text-sm font-medium text-white disabled:opacity-50"
      >
        {status === "sending" ? "Sending request..." : "Book treatment"}
      </button>

      {treatment ? (
        <a
          href={`${EXTERNAL_LINKS.spaBook}?treatment=${treatment.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--m-border)] bg-[var(--m-card)] px-5 text-sm font-medium"
        >
          Pay online on spa site
        </a>
      ) : null}
    </form>
  );
}
