"use client";

import { useRef, useState } from "react";
import MobileLink from "./MobileLink";

const QUESTIONS = [
  { key: "overall", label: "Overall stay", required: true },
  { key: "room", label: "Your room", required: false },
  { key: "cleanliness", label: "Cleanliness", required: false },
  { key: "staff", label: "Staff", required: false },
  { key: "dining", label: "Dining", required: false },
] as const;

const STAY_AGAIN = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" },
] as const;

type Scores = Record<(typeof QUESTIONS)[number]["key"], number | null>;

export default function StayFeedbackForm() {
  const formLoadedAt = useRef(Date.now());
  const [scores, setScores] = useState<Scores>({
    overall: null,
    room: null,
    cleanliness: null,
    staff: null,
    dining: null,
  });
  const [stayAgain, setStayAgain] = useState<string>("");
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!scores.overall) {
      setError("Please rate your overall stay.");
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem("_hp") as HTMLInputElement | null)?.value || "";

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...scores,
          stayAgain,
          comments,
          name,
          email,
          roomNumber,
          _hp: honeypot,
          _ts: formLoadedAt.current,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Could not send feedback.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send feedback.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-[16px] bg-[var(--m-card)] p-5 text-center">
        <p className="text-sm text-[var(--m-gold)]">Thank you</p>
        <h2 className="mt-2 font-heading text-2xl">We read every note</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--m-muted)]">
          Your stay survey helps the team on the floor today.
        </p>
        <MobileLink
          href="/"
          className="mt-5 flex min-h-11 items-center justify-center rounded-full bg-[var(--m-gold)] px-4 text-sm font-medium text-white"
        >
          Back to home
        </MobileLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
      <p className="text-sm text-[var(--m-muted)]">
        Rate this stay. Add a comment if you want the desk to follow up.
      </p>

      {QUESTIONS.map((question) => (
        <fieldset key={question.key} className="min-w-0">
          <legend className="mb-1.5 font-medium">
            {question.label}
            {question.required ? " (required)" : " (optional)"}
          </legend>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => {
              const selected = scores[question.key] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setScores((prev) => ({ ...prev, [question.key]: value }))}
                  className={`flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-[12px] text-sm ${
                    selected
                      ? "bg-[var(--m-gold)] font-medium text-white"
                      : "bg-[var(--m-card)] text-[var(--m-ink)]"
                  }`}
                  aria-pressed={selected}
                  aria-label={`${question.label} ${value} of 5`}
                >
                  {value}
                </button>
              );
            })}
          </div>
          <div className="mt-1 flex justify-between text-xs text-[var(--m-muted)]">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </fieldset>
      ))}

      <fieldset className="min-w-0">
        <legend className="mb-1.5 font-medium">Would you stay again</legend>
        <div className="grid grid-cols-3 gap-2">
          {STAY_AGAIN.map((option) => {
            const selected = stayAgain === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setStayAgain(option.value)}
                className={`min-h-11 rounded-[12px] text-sm ${
                  selected
                    ? "bg-[var(--m-gold)] font-medium text-white"
                    : "bg-[var(--m-card)]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="min-w-0">
        <label htmlFor="feedback-comments" className="mb-1.5 block font-medium">
          Your comments
        </label>
        <textarea
          id="feedback-comments"
          rows={5}
          value={comments}
          onChange={(event) => setComments(event.target.value)}
          placeholder="What went well, or what should we fix"
          className="w-full min-w-0 resize-none bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="min-w-0">
        <label htmlFor="feedback-name" className="mb-1.5 block font-medium">
          Name (optional)
        </label>
        <input
          id="feedback-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full min-w-0 bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="min-w-0">
        <label htmlFor="feedback-room" className="mb-1.5 block font-medium">
          Room number (optional)
        </label>
        <input
          id="feedback-room"
          value={roomNumber}
          onChange={(event) => setRoomNumber(event.target.value)}
          className="w-full min-w-0 bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="min-w-0">
        <label htmlFor="feedback-email" className="mb-1.5 block font-medium">
          Email if you want a reply
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full min-w-0 bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_hp_feedback">Leave empty</label>
        <input id="_hp_feedback" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && error ? (
        <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--m-gold)] px-5 text-sm font-medium text-white disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send feedback"}
      </button>
    </form>
  );
}
