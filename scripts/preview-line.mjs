// Render the actual Flex payload as a local, fictional-data preview. No API calls.
import { inquiryLineMessage, brands } from '../supabase/functions/_shared/line-message.mjs';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sizes={xxs:'10px',xs:'12px',sm:'14px',md:'16px',lg:'19px',xl:'22px'};
const gaps={xs:'4px',sm:'6px',md:'12px',lg:'18px',xl:'22px'};
function render(node) {
 if(node.type==='separator')return '<hr style="border:0;border-top:1px solid #e6e8eb;width:100%;margin:0">';
 if(node.type==='image')return `<img alt="${node.url.includes('flagcdn.com')?'Phone country flag':'Brand logo'}" src="${escape(node.url)}" style="width:${node.size==='full'?'100%':node.size};${node.flex===0?'flex:0 0 auto;':''}aspect-ratio:${node.aspectRatio.replace(':','/')};object-fit:contain">`;
 const style=`${node.flex!=null?`flex:${node.flex===0?'0 0 auto':node.flex};`:''}min-width:0;${node.width?`width:${node.width};`:''}${node.paddingAll?`padding:${node.paddingAll};`:''}${node.backgroundColor?`background:${node.backgroundColor};`:''}${node.cornerRadius?`border-radius:${node.cornerRadius};`:''}`;
 if(node.type==='text')return `<div style="${style}font-size:${sizes[node.size]||'14px'};color:${node.color};font-weight:${node.weight==='bold'?600:400};text-align:${node.align==='end'?'right':'left'};white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.45">${escape(node.text)}</div>`;
 return `<div style="${style}display:flex;flex-direction:${node.layout==='horizontal'?'row':'column'};gap:${gaps[node.spacing]||0};${node.alignItems==='center'?'align-items:center;':''}">${node.contents.map(render).join('')}</div>`;
}
const cards=Object.entries(brands).map(([brand,b],i)=>{
 const job={brand,source_table:i?'spa_reservations':'contact_submissions',request_id:'12345678',row_snapshot:{name:'Alex Morgan',email:'alex@example.test',phone:'+66 80 000 0000',subject:i?null:'Meeting & event enquiry',inquiry_type:'event',date:i?'2026-11-12':null,time:i?'18:30':null,guests:i?2:null,service:brand==='spa'?'Royal Thai Massage · 90 minutes':null,payment_status:brand==='spa'?'pending':null,message:'We would love to visit. Please let us know your availability and any recommendations. Thank you!',created_at:'2026-10-29T03:00:00Z'}};
 const message=inquiryLineMessage(job,'https://preview.example/images/line');
 const bubble=message.contents;
 return `<section><h2>${escape(b.name)}</h2><article>${render(bubble.header)}${render(bubble.body)}</article></section>`;
}).join('');
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Royal Phuket City · LINE notification preview</title><style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;background:#f0eeea;color:#252c36;margin:0;padding:32px}h1{font-size:25px;font-weight:500;margin:0 0 10px}p{font-size:14px;color:#69717c;margin:0 0 30px}.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}h2{font-size:13px;font-weight:600;min-height:32px}article{background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px #18233a0a}@media(max-width:1000px){.cards{grid-template-columns:repeat(2,minmax(0,1fr))}}</style><h1>New guest requests, in LINE.</h1><p>Four brands. One consistent format. No buttons. Fictional preview data.</p><div class="cards">${cards}</div></html>`.replaceAll('https://preview.example/images/line','/images/line');
await mkdir('.secrets',{recursive:true});
await writeFile(path.resolve('.secrets/line-preview.html'),html);
console.log('Preview generated in .secrets/line-preview.html');
