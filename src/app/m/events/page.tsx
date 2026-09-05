import Image from "next/image";
import EventInquiryForm from "@/components/EventInquiryForm";
import { MICE_EVENT_TYPES } from "@/lib/mice-event-types-data";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Events",
  "/events",
  "Meetings and events at Royal Phuket City Hotel."
);

export default function MobileEventsPage() {
  const types = Object.values(MICE_EVENT_TYPES)
    .filter((item) => item.slug !== "talk-show-panel")
    .map((item) =>
      item.slug === "stand-up-comedy"
        ? {
            ...item,
            title: "Stand-Up Comedy & Talk Show",
            subtitle: "Where laughter and ideas take the stage",
          }
        : item
    );

  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Ballroom, breakouts, and a team that runs MICE days in Phuket Town.
      </p>

      <div className="space-y-3">
        {types.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-[16px] bg-[var(--m-card)]">
            <div className="relative h-[11.07rem]">
              <Image
                src={item.heroImage}
                alt={item.title}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-heading text-xl">{item.title}</h2>
              <p className="mt-1 text-sm text-[var(--m-muted)]">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-heading text-xl">Request a date</h2>
        <EventInquiryForm compact />
      </div>
    </div>
  );
}
