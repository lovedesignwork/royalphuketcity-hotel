"use client";

import { ArrowClockwise, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useState, type RefObject } from "react";
import { festiveEvents, festiveTableStatus, twistOrigin, type FestiveBookings, type FestiveEventId } from "@/lib/twist-festive";
import styles from "./FestiveFloorPlanDialog.module.css";

const statuses = {
  "Available": "available",
  "Booked": "booked",
  "Held by staff": "held",
  "Payment pending": "pending",
} as const;

export function FestiveFloorPlanDialog({ dialogRef, event, data, loading, loadError, onRefresh }: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  event: FestiveEventId;
  data: FestiveBookings | null;
  loading: boolean;
  loadError: string;
  onRefresh: () => void;
}) {
  const [selectedId, setSelectedId] = useState("");
  const bookings = new Map(data?.bookings.map((booking) => [booking.table_id, booking]));
  const catalog = new Map(data?.tables.map((table) => [table.table_id, table]));
  const selected = catalog.get(selectedId);
  const plan = data?.floorPlan;
  const eventDetails = festiveEvents[event];

  return <dialog ref={dialogRef} className={styles.dialog} id="festive-floor-plan" aria-labelledby="festive-floor-plan-title">
    <header className={styles.header}>
      <div className="min-w-0">
        <h2 id="festive-floor-plan-title" className="text-xl leading-tight">Floor plan</h2>
        <p className={styles.muted}>{eventDetails.name} · {eventDetails.dateLabel}</p>
      </div>
      <button type="button" className={styles.iconButton} autoFocus aria-label="Close floor plan"
        onClick={() => dialogRef.current?.close()}><X size={21} aria-hidden="true" /></button>
    </header>
    <div className={styles.tools}>
      <ul className={styles.legend} aria-label="Table status legend">
        {Object.entries(statuses).map(([label, status]) => <li key={status}>
          <span className={styles.key} data-status={status} aria-hidden="true" />{label}
        </li>)}
      </ul>
      <button type="button" className={styles.refresh} disabled={loading} onClick={onRefresh}>
        <ArrowClockwise size={16} aria-hidden="true" />{loading ? "Refreshing…" : "Refresh status"}
      </button>
    </div>
    {loadError && <p className={styles.message} role="alert">{loadError}{data && " Showing the last update."}</p>}
    {plan ? <>
      <p className={styles.selection} role="status">
        {selected ? `Table ${selected.table_id} · ${selected.zone} · ${selected.capacity} seats · ${festiveTableStatus(bookings.get(selected.table_id))}`
          : "Select a table on the plan to see its status."}
      </p>
      <div className={styles.viewport} tabIndex={0} role="region" aria-label="Scrollable TWIST seating plan">
        <div className={styles.plan}>
          <Image unoptimized src={twistOrigin + plan.image.src} width={plan.image.width} height={plan.image.height}
            alt="TWIST seating plan with terrace, window and indoor tables" />
          {plan.tables.map(({ id, bounds: [left, top, right, bottom] }) => {
            const table = catalog.get(id);
            if (!table) return null;
            const { width, height } = plan.coordinates;
            const label = festiveTableStatus(bookings.get(id));
            const description = `Table ${id}, ${label}, ${table.zone}, ${table.capacity} seats`;
            return <button key={id} type="button" className={styles.table} data-status={statuses[label]}
              style={{ left: left / width * 100 + "%", top: top / height * 100 + "%",
                width: (right - left) / width * 100 + "%", height: (bottom - top) / height * 100 + "%" }}
              aria-label={description} title={description} aria-pressed={selectedId === id}
              onClick={() => setSelectedId(id)} />;
          })}
        </div>
      </div>
    </> : <p className={styles.message} role="status">
      {loading ? "Loading the floor plan…" : "The floor plan is unavailable right now. Use Refresh status to try again."}
    </p>}
  </dialog>;
}
