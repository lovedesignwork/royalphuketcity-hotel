// Shared by the deployed worker, offline tests and visual previews. No buttons/actions.
import { parsePhoneNumberFromString } from 'libphonenumber-js';
export const brands = {
  hotel: { name: 'Royal Phuket City Hotel', prefix: 'RPC', color: '#333333', tint: '#F7F4EF', logoBackground: '#333333' },
  yanlong: { name: 'Yan Long', prefix: 'YL', color: '#861D50', tint: '#FBF3F7', logoBackground: '#861D50' },
  twist: { name: 'TWIST Rooftop Restaurant & Bar', prefix: 'TW', color: '#7C3AED', tint: '#F6F2FC', logoBackground: '#7C3AED', senderName: 'TWIST Rooftop', senderIcon: 'twist-avatar.png' },
  spa: { name: 'Royal Wellness Spa', prefix: 'RWS', color: '#F5F0E6', tint: '#F8F4E9', headerText: '#594829' },
};
const text = (value, options = {}) => ({ type: 'text', text: String(value ?? '') || 'Not provided', size: 'sm', color: '#202937', wrap: true, ...options });
const box = (contents, options = {}) => ({ type: 'box', layout: 'vertical', contents, ...options });
const label = (value) => text(value.toUpperCase(), { size: 'xxs', color: '#78818C' });
const titleCase = (value) => String(value).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
export function inquiryBrand(job) {
  // The hotel contact form can explicitly address TWIST. Never guess from guest prose.
  return job.brand === 'hotel' && job.source_table === 'contact_submissions' && job.row_snapshot.inquiry_type === 'twist' ? 'twist' : job.brand;
}
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
  const brand = brands[inquiryBrand(job)];
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
function messageLogo(brandKey, assetBase) {
  return {
    type: 'image', url: `${assetBase}/${brandKey}.png`, size: 'full',
    aspectRatio: brandKey === 'yanlong' || brandKey === 'twist' ? '4:1' : '5:2', aspectMode: 'fit',
  };
}

function messageHeader(brandKey, assetBase, heading, reference) {
  const brand = brands[brandKey];
  const color = brand.headerText || '#FFFFFF';
  const logo = box([messageLogo(brandKey, assetBase)], {
    width: '126px', flex: 0, ...(brand.logoBackground ? { backgroundColor: brand.logoBackground, cornerRadius: '4px' } : {}),
  });
  return box([logo, box([
    text(heading, { size: 'xxs', color, align: 'end' }),
    ...(reference ? [text(reference, { size: 'xs', color, weight: 'bold', align: 'end' })] : []),
  ], { spacing: 'sm', flex: 1 })], { layout: 'horizontal', spacing: 'lg', alignItems: 'center', backgroundColor: brand.color, paddingAll: '22px' });
}

function festiveHeader(eventName, assetBase) {
  const heading = eventName === 'Christmas Gala Dinner' ? ['Christmas', 'Gala Dinner'] : ['New Year’s', 'Eve 2027'];
  return box([
    box([messageLogo('twist', assetBase)], { width: '108px', flex: 0 }),
    box(heading.map((line) => text(line, { size: 'md', color: '#FFFFFF', weight: 'bold', align: 'end' })),
      { spacing: 'xs', flex: 1 }),
  ], { layout: 'horizontal', spacing: 'md', alignItems: 'center', backgroundColor: '#60063F', paddingAll: '16px' });
}

function detailRows(rows) {
  return rows.map(([name, value]) => box([
    text(name, { size: 'xs', color: '#616B7A', flex: 2 }),
    text(value, { size: 'sm', flex: 4 }),
  ], { layout: 'horizontal', spacing: 'md' }));
}

function festiveLineMessage(booking, assetBase) {
  const { status, reference, event_name, table_id, table_zone, guests, child_tickets,
    package_name, ticket_rate, amount_cents, guest_name, guest_email, guest_phone } = booking;
  if (status !== 'paid') throw new Error('unconfirmed-festive-payment');
  if (!Number.isSafeInteger(amount_cents) || amount_cents <= 0) throw new Error('invalid-festive-amount');
  const brand = brands.twist;
  const amount = new Intl.NumberFormat('en-TH', {
    style: 'currency', currency: 'THB', currencyDisplay: 'narrowSymbol', minimumFractionDigits: amount_cents % 100 ? 2 : 0,
  }).format(amount_cents / 100);
  const children = child_tickets ?? 0;
  const adults = guests - children;
  const tickets = child_tickets == null ? `${guests} ${guests === 1 ? 'guest' : 'guests'}` : [
    adults && `${adults} ${adults === 1 ? 'adult' : 'adults'}`,
    children && `${children} ${children === 1 ? 'child' : 'children'}`,
  ].filter(Boolean).join(' · ');
  const rows = [
    ['Table', table_zone ? `${table_id} · ${table_zone}` : table_id],
    ['Tickets', tickets],
    ...(package_name ? [['Package', package_name]] : []),
    ...(ticket_rate === 'early_bird' ? [['Buffet rate', 'Early Bird']] : []),
    ['Reference', reference],
  ];
  const body = box([
    box([
      box([text('Amount paid', { size: 'xs', weight: 'bold' }), text('Pay Solutions', { size: 'xxs', color: '#526171' })], { spacing: 'xs', flex: 3 }),
      text(amount, { size: 'xl', weight: 'bold', color: '#5924A6', align: 'end', flex: 4 }),
    ], { layout: 'horizontal', alignItems: 'center', spacing: 'sm', backgroundColor: brand.tint, cornerRadius: '6px', paddingAll: '12px' }),
    box(detailRows(rows), { spacing: 'sm' }),
    { type: 'separator', color: '#E6E8EB' },
    box([label('Guest'), text(guest_name, { size: 'md', weight: 'bold' }),
      text(guest_email || 'Email not provided', { size: 'xs', color: '#526171' }), phoneLine(guest_phone)], { spacing: 'xs' }),
  ], { spacing: 'lg', paddingAll: '20px' });
  return {
    type: 'flex',
    altText: `Paid TWIST booking · ${event_name} · Table ${table_id} · ${amount} · ${reference}`.slice(0, 400),
    sender: { name: brand.senderName, iconUrl: `${assetBase}/${brand.senderIcon}` },
    contents: { type: 'bubble', size: 'giga', header: festiveHeader(event_name, assetBase), body },
  };
}

export function inquiryLineMessage(job, assetBase) {
  if (!/^https:\/\//.test(assetBase)) throw new Error('invalid-logo-url');
  assetBase = assetBase.replace(/\/$/, '');
  if (job.brand === 'twist' && job.source_table === 'twist_festive_bookings') return festiveLineMessage(job.row_snapshot, assetBase);
  const d = inquiryDetails(job);
  const brandKey = inquiryBrand(job);
  const messageChunks = chunks(d.message);
  const header = messageHeader(brandKey, assetBase, 'NEW REQUEST', d.reference);
  const body = box([
    box([text(d.name, { size: 'lg', weight: 'bold' }), text(d.email || 'Email not provided', { size: 'xs', color: '#637083' }), phoneLine(d.phone)], { spacing: 'xs' }),
    box(d.details.map(([name, value]) => box([text(name, { size: 'xs', color: '#737B87', flex: 2 }), text(value, { size: 'sm', flex: 4 })], { layout: 'horizontal', spacing: 'md' })), { spacing: 'md', paddingAll: '18px', backgroundColor: d.brand.tint, cornerRadius: '6px' }),
    text(messageChunks[0]),
    ...(d.received ? [text(d.received, { size: 'xxs', color: '#78818C' })] : []),
  ], { spacing: 'xl', paddingAll: '22px' });
  const bubbles = [{ type: 'bubble', size: 'giga', header, body }, ...messageChunks.slice(1).map((chunk, i) => ({ type: 'bubble', size: 'giga', body: box([label(d.brand.name), text(`${d.reference} · note ${i + 2}/${messageChunks.length}`, { weight: 'bold' }), text(chunk)], { paddingAll: '22px', spacing: 'lg' }) }))];
  const result = { type: 'flex', altText: `${d.brand.name} · ${d.category} · ${d.name}`.slice(0, 400), contents: bubbles.length === 1 ? bubbles[0] : { type: 'carousel', contents: bubbles } };
  // Override the shared bot's message identity, without renaming the account for other brands.
  if (d.brand.senderName) result.sender = { name: d.brand.senderName, iconUrl: `${assetBase}/${d.brand.senderIcon}` };
  if (bubbles.length > 12 || new TextEncoder().encode(JSON.stringify(result.contents)).length > (bubbles.length === 1 ? 30000 : 50000)) throw new Error('message-too-large');
  return result;
}
