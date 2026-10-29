// Shared by the deployed worker, offline tests and visual previews. No buttons/actions.
import { parsePhoneNumberFromString } from 'libphonenumber-js';
export const brands = {
  hotel: { name: 'Royal Phuket City Hotel', prefix: 'RPC', color: '#333333', tint: '#F7F4EF', logoBackground: '#333333' },
  yanlong: { name: 'Yan Long', prefix: 'YL', color: '#861D50', tint: '#FBF3F7', logoBackground: '#861D50' },
  twist: { name: 'TWIST Rooftop Restaurant & Bar', prefix: 'TW', color: '#7C3AED', tint: '#F6F2FC', logoBackground: '#7C3AED' },
  spa: { name: 'Royal Wellness Spa', prefix: 'RWS', color: '#F5F0E6', tint: '#F8F4E9', headerText: '#594829' },
};
const text = (value, options = {}) => ({ type: 'text', text: String(value ?? '') || 'Not provided', size: 'sm', color: '#202937', wrap: true, ...options });
const box = (contents, options = {}) => ({ type: 'box', layout: 'vertical', contents, ...options });
const label = (value) => text(value.toUpperCase(), { size: 'xxs', color: '#78818C' });
const titleCase = (value) => String(value).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
export function phoneCountry(value) {
  const number = String(value || '').trim().replace(/^00/, '+');
  // Do not infer a country for local, incomplete or non-geographic numbers.
  if (!number.startsWith('+')) return null;
  const parsed = parsePhoneNumberFromString(number, { extract: false });
  return parsed?.isPossible() ? parsed.country || null : null;
}
function phoneLine(value) {
  const country = phoneCountry(value);
  const number = text(value || 'Phone not provided', { size: 'xs', color: '#637083', flex: 1 });
  return country ? box([
    { type: 'image', url: `https://flagcdn.com/w40/${country.toLowerCase()}.png`, size: '18px', aspectRatio: '3:2', aspectMode: 'fit', flex: 0 },
    number,
  ], { layout: 'horizontal', spacing: 'sm', alignItems: 'center' }) : number;
}
function chunks(value, length = 1400) {
  const result = [''];
  for (const char of String(value)) {
    if (result.at(-1).length + char.length > length) result.push('');
    result[result.length - 1] += char;
  }
  return result;
}
export function inquiryDetails(job) {
  const brand = brands[job.brand];
  if (!brand) throw new Error('unknown-brand');
  const r = job.row_snapshot;
  const reservation = job.source_table.endsWith('_reservations') || r.form_type === 'reservation';
  const category = reservation ? 'Reservation request' : titleCase(r.inquiry_type_label || r.inquiry_type || r.event_type || r.form_type || 'General inquiry');
  const reference = r.reference || `${brand.prefix}-${String(job.request_id).slice(0, 8).toUpperCase()}`;
  const details = [['Request', category]];
  for (const [name, value] of [
    ['Subject', r.subject], ['Date', r.date || r.reservation_date || r.event_date],
    ['Time · Phuket', r.time || r.reservation_time], ['Guests', r.guests ?? r.party_size ?? r.guest_count],
    ['Treatment / service', r.service], ['Occasion', r.occasion], ['Seating', r.seating_preference],
    ['Country', r.country], ['Payment', r.payment_status ? titleCase(r.payment_status) : null],
    ['Amount', r.amount != null ? `${Number(r.amount).toLocaleString('en-US', { maximumFractionDigits: 2 })} THB` : null],
  ]) if (value !== null && value !== undefined && value !== '') details.push([name, String(value)]);
  return { brand, reservation, category, reference, details,
    name: r.guest_name || r.name || [r.first_name, r.last_name].filter(Boolean).join(' ') || 'Guest',
    email: r.email, phone: r.phone,
    message: [r.message, r.special_requests].filter(Boolean).join('\n\n') || 'No additional message.',
    received: r.created_at && Number.isFinite(Date.parse(r.created_at)) ? new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bangkok', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(r.created_at)) : null,
  };
}
export function inquiryLineMessage(job, assetBase) {
  const d = inquiryDetails(job);
  if (!/^https:\/\//.test(assetBase)) throw new Error('invalid-logo-url');
  const messageChunks = chunks(d.message);
  const logo = box([{ type: 'image', url: `${assetBase.replace(/\/$/, '')}/${job.brand}.png`, size: 'full', aspectRatio: job.brand === 'yanlong' || job.brand === 'twist' ? '4:1' : '5:2', aspectMode: 'fit' }], { width: '126px', flex: 0, ...(d.brand.logoBackground ? { backgroundColor: d.brand.logoBackground, cornerRadius: '4px' } : {}) });
  const header = box([logo, box([
    text('NEW REQUEST', { size: 'xxs', color: d.brand.headerText || '#FFFFFF', align: 'end' }),
    text(d.reference, { size: 'xs', color: d.brand.headerText || '#FFFFFF', weight: 'bold', align: 'end' }),
  ], { spacing: 'sm', flex: 1 })], { layout: 'horizontal', spacing: 'lg', alignItems: 'center', backgroundColor: d.brand.color, paddingAll: '22px' });
  const body = box([
    box([text(d.name, { size: 'lg', weight: 'bold' }), text(d.email || 'Email not provided', { size: 'xs', color: '#637083' }), phoneLine(d.phone)], { spacing: 'xs' }),
    box(d.details.map(([name, value]) => box([text(name, { size: 'xs', color: '#737B87', flex: 2 }), text(value, { size: 'sm', flex: 4 })], { layout: 'horizontal', spacing: 'md' })), { spacing: 'md', paddingAll: '18px', backgroundColor: d.brand.tint, cornerRadius: '6px' }),
    text(messageChunks[0]),
    ...(d.received ? [text(d.received, { size: 'xxs', color: '#78818C' })] : []),
  ], { spacing: 'xl', paddingAll: '22px' });
  const bubbles = [{ type: 'bubble', size: 'giga', header, body }, ...messageChunks.slice(1).map((chunk, i) => ({ type: 'bubble', size: 'giga', body: box([label(d.brand.name), text(`${d.reference} · note ${i + 2}/${messageChunks.length}`, { weight: 'bold' }), text(chunk)], { paddingAll: '22px', spacing: 'lg' }) }))];
  const result = { type: 'flex', altText: `${d.brand.name} · ${d.category} · ${d.name}`.slice(0, 400), contents: bubbles.length === 1 ? bubbles[0] : { type: 'carousel', contents: bubbles } };
  if (bubbles.length > 12 || new TextEncoder().encode(JSON.stringify(result.contents)).length > (bubbles.length === 1 ? 30000 : 50000)) throw new Error('message-too-large');
  return result;
}
