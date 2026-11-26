// Render the actual Flex payload as a local, fictional-data preview. No API calls.
import { inquiryLineMessage, brands } from '../supabase/functions/_shared/line-message.mjs';
import { festiveLineSamples } from './festive-line-samples.mjs';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const assetBase = 'https://crhzxvbubvyachauomlx.supabase.co/storage/v1/object/public/line-brand-assets';
const sizes={xxs:'10px',xs:'12px',sm:'14px',md:'16px',lg:'19px',xl:'22px'};
const gaps={xs:'4px',sm:'6px',md:'12px',lg:'18px',xl:'22px'};
function render(node) {
 if(node.type==='separator')return '<hr style="border:0;border-top:1px solid #e6e8eb;width:100%;margin:0">';
 if(node.type==='image')return `<img alt="${node.url.includes('flagcdn.com')?'Phone country flag':'Brand logo'}" src="${escape(node.url)}" style="width:${node.size==='full'?'100%':node.size};${node.flex===0?'flex:0 0 auto;':''}aspect-ratio:${node.aspectRatio.replace(':','/')};object-fit:contain">`;
 const style=`${node.flex!=null?`flex:${node.flex===0?'0 0 auto':node.flex};`:''}min-width:0;${node.width?`width:${node.width};`:''}${node.paddingAll?`padding:${node.paddingAll};`:''}${node.backgroundColor?`background:${node.backgroundColor};`:''}${node.cornerRadius?`border-radius:${node.cornerRadius};`:''}`;
 if(node.type==='text')return `<div style="${style}font-size:${sizes[node.size]||'14px'};color:${node.color};font-weight:${node.weight==='bold'?600:400};text-align:${node.align==='end'?'right':'left'};white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.45">${escape(node.text)}</div>`;
 return `<div style="${style}display:flex;flex-direction:${node.layout==='horizontal'?'row':'column'};gap:${gaps[node.spacing]||0};${node.alignItems==='center'?'align-items:center;':''}">${node.contents.map(render).join('')}</div>`;
}
function renderMessage(message) {
 const sender=message.sender ? `<div class="sender"><img src="${escape(message.sender.iconUrl)}" alt="" width="36" height="36"><div><strong>${escape(message.sender.name)}</strong> from ‘DirectLine’</div></div>` : '';
 return `${sender}<article aria-label="${escape(message.altText)}">${render(message.contents.header)}${render(message.contents.body)}</article>`;
}

function renderInquiryCards() {
 return Object.entries(brands).map(([brand,b],i)=>{
 const job={brand,source_table:brand==='hotel'?'contact_submissions':brand==='twist'?'twist_inquiries':`${brand}_reservations`,request_id:'12345678',row_snapshot:{name:'Alex Morgan',email:'alex@example.test',phone:'+66 80 000 0000',subject:i?null:'Meeting & event enquiry',inquiry_type:'event',form_type:brand==='twist'?'reservation':undefined,date:i?'2026-11-12':null,time:i?'18:30':null,guests:i?2:null,service:brand==='spa'?'Royal Thai Massage · 90 minutes':null,payment_status:brand==='spa'?'paid':null,message:'We would love to visit. Please let us know your availability and any recommendations. Thank you!',created_at:'2026-10-29T03:00:00Z'}};
 const message=inquiryLineMessage(job,assetBase);
 return `<section><h2>${escape(b.name)}</h2><div class="chat">${renderMessage(message)}</div></section>`;
 }).join('');
}

const festive = process.argv.includes('--festive');
const title = festive ? 'TWIST booking alerts' : 'New guest requests in LINE';
const description = festive
 ? '<p class="destination">LINE group · <strong>RPC Notification</strong></p><p>Sample bookings for Christmas and New Year’s Eve. LINE may display slightly different fonts, spacing, and chat backgrounds.</p>'
 : '<p class="destination">Verified LINE group <strong>RPC Notification</strong></p><p>Fictional inquiries for four brands. LINE may display slightly different fonts, spacing and chat backgrounds.</p>';
const cards = festive
 ? festiveLineSamples.map((message) => `<section class="chat" aria-label="Sample LINE chat">${renderMessage(message)}</section>`).join('')
 : renderInquiryCards();
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${title} · LINE preview</title><style>
*{box-sizing:border-box}
body{font-family:Arial,sans-serif;background:#f3f0f5;color:#252035;margin:0;padding:clamp(12px,4vw,40px);overflow-wrap:anywhere}
main{max-width:1200px;margin-inline:auto}.festive{max-width:736px}
h1{font-size:clamp(27px,5vw,39px);letter-spacing:-.035em;margin:0 0 12px}
p{font-size:14px;line-height:1.5;color:#554f61;margin:0 0 20px;max-width:56ch}
.destination{margin-bottom:4px;color:#29213b}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.festive .cards{grid-template-columns:repeat(2,minmax(0,1fr))}
h2{font-size:13px;font-weight:600;margin:0 0 12px}
.chat{min-width:0;background:#dfe5f2;border:1px solid #ccd4e5;border-radius:18px;padding:12px 18px 16px}
.sender{display:flex;align-items:center;gap:8px;margin:0 0 9px;color:#374159;font-size:12px;line-height:1.35}
.sender img{border-radius:50%;flex:none}
article{background:white;border-radius:14px;box-shadow:0 2px 8px #18233a14}
article>div:first-child{border-radius:14px 14px 0 0}
.chat article{max-width:300px}
@media(max-width:1000px){.cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:620px){.cards,.festive .cards{grid-template-columns:minmax(0,1fr)}.chat{max-width:360px;width:100%;justify-self:center;padding-inline:clamp(8px,4vw,18px)}}
</style></head><body><main${festive ? ' class="festive"' : ''}><h1>${title}</h1>${description}
<div class="cards">${cards}</div></main></body></html>`
 .replaceAll(assetBase,'/images/line')
 .replaceAll('https://royalphuketcity.com/images/line','/images/line');
await mkdir('.secrets',{recursive:true});
const output = festive ? '.secrets/festive-line-preview.html' : '.secrets/line-preview.html';
await writeFile(path.resolve(output),html);
console.log('Preview generated in ' + output);
