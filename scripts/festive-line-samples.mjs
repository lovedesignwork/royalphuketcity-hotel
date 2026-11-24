import { inquiryLineMessage } from '../supabase/functions/_shared/line-message.mjs';

const assetBase = 'https://royalphuketcity.com/images/line';

export const festiveLineSamples = [
  {
    reference: 'TWIST-XMAS-SAMPLE',
    event_name: 'Christmas Gala Dinner',
    event_date: '2026-12-24',
    event_time: '18:30–22:30',
    guests: 3,
    child_tickets: 1,
    table_id: 'O3',
    table_zone: 'Open-air terrace',
    package_name: 'International buffet dinner',
    ticket_rate: 'early_bird',
    amount_cents: 510_000,
    guest_name: 'Alex Morgan',
    guest_email: 'alex@example.test',
    guest_phone: '+66800000000',
  },
  {
    reference: 'TWIST-NYE-SAMPLE',
    event_name: 'New Year’s Eve 2027',
    event_date: '2026-12-31',
    event_time: '18:30–00:30',
    guests: 2,
    child_tickets: 0,
    table_id: 'A2',
    table_zone: 'Window seating',
    package_name: 'Buffet dinner + after-party',
    ticket_rate: 'standard',
    amount_cents: 660_000,
    guest_name: 'Jamie Lee',
    guest_email: 'jamie@example.test',
    guest_phone: '+12025550183',
  },
].map((booking) => inquiryLineMessage({
  brand: 'twist', source_table: 'twist_festive_bookings', row_snapshot: { ...booking, status: 'paid' },
}, assetBase));
