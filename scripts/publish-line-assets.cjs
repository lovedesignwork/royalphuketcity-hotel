// Upload only the four public brand logos. Credentials stay in local environment files.
const fs=require('node:fs');
require('@next/env').loadEnvConfig(process.cwd(),true,{info(){},error(){}});
const {createClient}=require('@supabase/supabase-js');
(async()=>{
 const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
 const bucket='line-brand-assets';
 const {data,error}=await db.storage.getBucket(bucket);
 if(error){const {error:createError}=await db.storage.createBucket(bucket,{public:true,fileSizeLimit:1048576,allowedMimeTypes:['image/png']});if(createError)throw new Error('Could not create logo bucket');}
 else if(!data.public)throw new Error('Existing logo bucket is private; inspect before changing it');
 for(const brand of ['hotel','yanlong','twist','spa']){
  const {error}=await db.storage.from(bucket).upload(`${brand}.png`,fs.readFileSync(`public/images/line/${brand}.png`),{contentType:'image/png',upsert:true,cacheControl:'86400'});
  if(error)throw new Error(`Could not upload ${brand} logo`);
  const {data:{publicUrl}}=db.storage.from(bucket).getPublicUrl(`${brand}.png`);
  const response=await fetch(publicUrl);
  if(!response.ok||!response.headers.get('content-type')?.includes('image/png'))throw new Error(`${brand} logo not accessible`);
  console.log(`${brand}: public PNG verified`);
 }
})().catch(error=>{console.error(error.message);process.exitCode=1;});
