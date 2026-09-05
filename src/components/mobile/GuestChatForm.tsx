"use client";

import { useRef, useState } from "react";

export default function GuestChatForm() {
  const formLoadedAt = useRef(Date.now());
  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Hotel guest",
          email: "guest@royalphuketcity.com",
          phone: "",
          subject: roomNumber ? `Guest chat · Room ${roomNumber}` : "Guest chat",
          message,
          inquiry_type: "guest_chat",
          _hp: (event.currentTarget.elements.namedItem("_hp") as HTMLInputElement)?.value,
          _ts: formLoadedAt.current,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send your message");
      setStatus("success");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send your message");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[16px] bg-[var(--m-card)] p-5">
        <p className="font-heading text-xl">Message sent</p>
        <p className="mt-2 text-sm text-[var(--m-muted)]">
          The front desk has your note. They will call the room or reply shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="block">
        <span className="mb-1.5 block font-medium">Your name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-medium">Room number</span>
        <input
          value={roomNumber}
          onChange={(event) => setRoomNumber(event.target.value)}
          className="w-full bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-medium">Message</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What do you need?"
          className="w-full bg-white px-4 py-3 hairline-border focus:border-[--color-accent] focus:outline-none"
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--m-gold)] px-4 text-sm font-medium text-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send to front desk"}
      </button>
    </form>
  );
}
