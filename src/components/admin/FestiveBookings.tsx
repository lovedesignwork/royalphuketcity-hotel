"use client";

import { ArrowClockwise } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import CountryPhoneSelector from "@/components/CountryPhoneSelector";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { StyledSelect } from "@/components/ui/StyledSelect";
import { festiveEvents, isFestiveEvent, staffSources, type EventBooking, type FestiveBookings as BookingData, type FestiveEventId } from "@/lib/twist-festive";

const endpoint = "/api/admin/twist/festive";
const eventOptions = Object.entries(festiveEvents).map(([value, { name, dateLabel }]) => ({
  value, label: `${name} · ${dateLabel}`,
}));
const sourceOptions = Object.entries(staffSources).map(([value, label]) => ({ value, label }));
const input = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm";
const label = "mb-1.5 block text-xs font-medium text-gray-600";
const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium hover:bg-[#f3f1ed]";
const primary = "min-h-11 rounded-lg bg-[#6d573e] px-4 text-sm font-semibold text-white hover:bg-[#57452f]";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { cache: "no-store", ...options });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401) throw new Error("Your session has expired. Sign in again to manage bookings.");
    throw new Error(result?.error || "The booking service is unavailable. Please retry.");
  }
  return result;
}

export default function FestiveBookings() {
  const [event, setEvent] = useState<FestiveEventId>("christmas26");
  const [working, setWorking] = useState(false);

  return <div className="admin-overview [overflow-wrap:anywhere]">
    <header className="admin-page-heading">
      <div>
        <h1>TWIST festive bookings</h1>
        <p>See who has each table and reserve tables for bookings taken by staff.</p>
      </div>
    </header>
    <div className="mb-6 max-w-sm">
      <StyledSelect label="Event" value={event} options={eventOptions} disabled={working}
        onChange={(next) => { if (isFestiveEvent(next)) setEvent(next); }} />
    </div>
    <a className="mb-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#6d573e] underline xl:hidden" href="#festive-create-heading">Add a staff booking</a>
    <EventDesk key={event} event={event} working={working} setWorking={setWorking} />
  </div>;
}

function EventDesk({ event, working, setWorking }: {
  event: FestiveEventId; working: boolean; setWorking: (value: boolean) => void;
}) {
  const [data, setData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [releaseError, setReleaseError] = useState("");
  const [notice, setNotice] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [tableId, setTableId] = useState("");
  const [guests, setGuests] = useState(2);
  const [source, setSource] = useState("phone");
  const [phone, setPhone] = useState("");
  const [releasing, setReleasing] = useState<EventBooking | null>(null);
  const listHeading = useRef<HTMLHeadingElement>(null);
  const occupied = new Set(data?.bookings.map((booking) => booking.table_id));
  const tableOptions = (data?.tables ?? []).filter((table) => table.capacity >= guests && !occupied.has(table.table_id))
    .map((table) => ({ value: table.table_id, label: `Table ${table.table_id} · ${table.zone} · ${table.capacity} seats` }));
  const availableTable = tableOptions.some(({ value }) => value === tableId);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadError("");
    request<BookingData>(`${endpoint}?event=${event}`, { signal: controller.signal }).then((result) => {
      if (!controller.signal.aborted) setData(result);
    }).catch((error: Error) => {
      if (!controller.signal.aborted) setLoadError(error.message);
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [event, refresh]);

  async function save(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!availableTable || working || loading) return;
    const form = formEvent.currentTarget;
    const fields = new FormData(form);
    setFormError("");
    setNotice("");
    setWorking(true);
    try {
      const { booking } = await request<{ booking: EventBooking }>(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, table: tableId, name: fields.get("guestName"),
          notes: fields.get("notes"), guests, phone: source === "house" ? "" : phone, source }),
      });
      setData((current) => current && { ...current, bookings: [...current.bookings, booking] });
      form.reset();
      setPhone("");
      setTableId("");
      setNotice(`Table ${booking.table_id} is booked for ${booking.guest_name}.`);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not save the booking.");
    } finally {
      setWorking(false);
      setRefresh((value) => value + 1);
    }
  }

  async function release() {
    if (!releasing || working) return;
    setWorking(true);
    setReleaseError("");
    setNotice("");
    try {
      const { table } = await request<{ table: string }>(endpoint, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, id: releasing.id }),
      });
      setData((current) => current && { ...current, bookings: current.bookings.filter(({ id }) => id !== releasing.id) });
      setReleasing(null);
      setNotice(`Table ${table} was released for online booking.`);
      listHeading.current?.focus();
    } catch (error) {
      setReleaseError(error instanceof Error ? error.message : "Could not release the table.");
    } finally {
      setWorking(false);
      setRefresh((value) => value + 1);
    }
  }

  return <>
    {notice && <p className="mb-4 text-sm font-medium text-emerald-800" role="status">{notice}</p>}
    {loadError && <div className="admin-error mb-4" role="alert"><span>{loadError}</span>
      <button type="button" onClick={() => setRefresh((value) => value + 1)} disabled={loading}>Retry</button>
    </div>}
    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
      <section className="min-w-0 self-start rounded-xl border border-gray-200" aria-labelledby="festive-list-heading" aria-busy={loading}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2 id="festive-list-heading" ref={listHeading} tabIndex={-1} className="font-semibold">Table bookings</h2>
            {data && <p className="mt-1 text-xs text-gray-600">{data.tables.length - occupied.size} tables available out of {data.tables.length}</p>}
          </div>
          <button type="button" className={button} disabled={loading || working} onClick={() => setRefresh((value) => value + 1)}>
            <ArrowClockwise size={16} aria-hidden="true" /> Refresh
          </button>
        </div>
        {loading && !data && <p role="status" className="p-5 text-sm text-gray-600">Loading table bookings…</p>}
        {data && !data.bookings.length && <p className="p-5 text-sm text-gray-600">No tables booked for this event yet.</p>}
        {data && data.bookings.length > 0 && <ul role="list" className="divide-y divide-gray-200">
          {data.tables.map((table) => {
            const booking = data.bookings.find(({ table_id }) => table_id === table.table_id);
            if (!booking) return null;
            const status = booking.status === "paid" ? "Paid" :
              booking.status === "pending" ? "Payment pending" : "Booked by staff";
            return <li key={booking.id} className="min-w-0 px-4 py-4 sm:px-5">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-2 sm:gap-x-5">
                <div><p className="font-semibold">Table {table.table_id}</p><p className="text-xs text-gray-600">{table.zone}</p></div>
                <div>
                  <p className="font-semibold">{booking.guest_name}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    {booking.guests} {booking.guests === 1 ? "guest" : "guests"} · {booking.staff_source ? staffSources[booking.staff_source] : "Online"} · {status}
                  </p>
                  {(booking.guest_phone || booking.guest_email) && <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    {booking.guest_phone && <a className="underline" href={`tel:${booking.guest_phone}`}>{booking.guest_phone}</a>}
                    {booking.guest_email && <a className="underline" href={`mailto:${booking.guest_email}`}>{booking.guest_email}</a>}
                  </p>}
                  {booking.staff_notes && <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{booking.staff_notes}</p>}
                  {booking.status === "staff_confirmed" && releasing?.id !== booking.id && <button type="button" className="mt-2 min-h-11 rounded text-sm font-medium underline"
                    disabled={working} aria-label={`Release table ${table.table_id}`} onClick={() => { setReleaseError(""); setReleasing(booking); }}>Release table</button>}
                  {releasing?.id === booking.id && <div className="mt-3 border-t border-gray-200 pt-3">
                    <p className="text-sm">Release table {table.table_id} and make it available online?</p>
                    {releaseError && <p role="alert" className="mt-2 text-sm text-red-800">{releaseError}</p>}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button type="button" className={button} disabled={working} onClick={() => setReleasing(null)}>Keep booking</button>
                      <button type="button" className={primary} disabled={working} onClick={release}>{working ? "Releasing…" : "Confirm release"}</button>
                    </div>
                  </div>}
                </div>
              </div>
            </li>;
          })}
        </ul>}
      </section>
      <section aria-labelledby="festive-create-heading" className="min-w-0 self-start rounded-xl border border-gray-200 bg-[#faf9f6] p-4 sm:p-5">
        <h2 id="festive-create-heading" tabIndex={-1} className="scroll-mt-4 text-base font-semibold">Add a staff booking</h2>
        <p className="mt-1 text-xs text-gray-600">Saving reserves the table online for this event.</p>
        <form onSubmit={save} className="mt-4">
          <fieldset disabled={working} className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-4">
            <legend className="sr-only">Staff booking details</legend>
            <div>
              <label htmlFor="festive-guest-count" className={label}>Guests</label>
              <NumberStepper id="festive-guest-count" min={1} max={4} value={guests}
                onChange={(value) => { setGuests(value); setFormError(""); }} />
            </div>
            <StyledSelect label="Table" value={availableTable ? tableId : ""} options={tableOptions}
              disabled={!tableOptions.length || loading || working}
              onChange={(next) => { setTableId(next); setFormError(""); }} />
            {data && !tableOptions.length && <p className="-mt-3 text-xs text-gray-600">No tables fit this party size.</p>}
            <StyledSelect label="Booking source" value={source} options={sourceOptions} onChange={setSource} disabled={working} />
            <div>
              <label htmlFor="festive-guest-name" className={label}>{source === "house" ? "Block name" : "Guest name"}</label>
              <input id="festive-guest-name" name="guestName" className={input} autoComplete="off" required minLength={2} maxLength={100} />
            </div>
            {source !== "house" && <div>
              <label htmlFor="festive-guest-phone" className={label}>Guest phone (optional)</label>
              <CountryPhoneSelector id="festive-guest-phone" value={phone} onChange={setPhone} />
            </div>}
            <div>
              <label htmlFor="festive-staff-note" className={label}>Staff notes (optional)</label>
              <textarea id="festive-staff-note" name="notes" className={input} maxLength={1000} rows={2} />
            </div>
            {formError && <p role="alert" className="text-sm text-red-800">{formError}</p>}
            <button type="submit" className={primary} disabled={!availableTable || loading || working}>
              {working && !releasing ? "Saving…" : "Book table"}
            </button>
          </fieldset>
        </form>
      </section>
    </div>
  </>;
}
