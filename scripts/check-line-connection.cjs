// Explicitly enqueue four fictional connection cards; never creates a guest inquiry.
// Run only against the agreed LINE destination, with --send-test.
const fs = require('node:fs');
const { randomUUID } = require('node:crypto');
require('@next/env').loadEnvConfig(process.cwd(),true,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
(async()=>{
 if (!process.argv.includes('--send-test')) throw new Error('Use --send-test to send the four fictional connection cards');
 const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
 const groupResponse=await fetch(`https://api.line.me/v2/bot/group/${process.env.LINE_RECIPIENT_ID}/summary`,{headers:{Authorization:`Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`}});
 if(!groupResponse.ok)throw new Error('Cannot verify group');
 const group=await groupResponse.json();
 if(group.groupName!=='RPC Notification')throw new Error('Unexpected destination');
 const jobs=['hotel','yanlong','twist','spa'].map(brand=>({brand,source_table:'connection_test',request_id:randomUUID(),row_snapshot:{
  name:'Alex Morgan · TEST',email:'alex@example.test',phone:'+66 80 000 0000',reference:`TEST-${brand.toUpperCase()}`,
  form_type:brand==='hotel'?'contact':'reservation',inquiry_type:'event',
  subject:brand==='hotel'?'Meeting & event enquiry':null,
  date:brand==='hotel'?null:'2026-11-12',time:brand==='hotel'?null:'18:30',guests:brand==='hotel'?null:2,
  service:brand==='spa'?'Royal Thai Massage · 90 minutes':null,payment_status:brand==='spa'?'pending':null,
  message:'TEST PREVIEW — fictional guest details. We would love to visit. Please let us know your availability and any recommendations. Thank you!',
  created_at:new Date().toISOString()
 }}));
 const {data,error}=await db.from('brand_line_outbox').insert(jobs).select('id,brand');
 if(error)throw new Error('Could not queue connection tests');
 fs.writeFileSync('.secrets/line-test-jobs.json',JSON.stringify(data));
 const response=await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/brand-line-notifications`,{method:'POST',headers:{Authorization:`Bearer ${process.env.LINE_WORKER_SECRET}`}});
 console.log('Worker:',response.status,await response.text());
 const result=await db.from('brand_line_outbox').select('brand,status,provider_id,last_error').in('id',data.map(row=>row.id));
 if(result.error)throw new Error('Could not read receipts');
 console.log('Connection test receipts:',JSON.stringify(result.data));
 if(result.data.some(row=>row.status!=='sent'))throw new Error('Some connection tests are not accepted yet; inspect saved jobs before retrying');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
