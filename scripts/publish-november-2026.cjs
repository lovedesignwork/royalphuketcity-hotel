// Explicitly approved November batch. Reuses the existing upload and publish handlers.
// node --env-file=.env.local scripts/publish-november-2026.cjs [--stage|--publish]
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const ts=require('typescript');
const {createClient}=require('@supabase/supabase-js');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'content/editorial/2026-11-drafts');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const mode=process.argv.includes('--publish')?'publish':process.argv.includes('--stage')?'stage':'check';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
if(!url||new URL(url).hostname!=='crhzxvbubvyachauomlx.supabase.co')throw Error('Wrong hotel CMS target');
const db=createClient(url,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const receiptPath=path.join(dir,'publication-receipt.json');
const receipt=fs.existsSync(receiptPath)?read(receiptPath):{approved:true,approval:'Owner approved all four final articles and selected images and instructed publication.',articles:[],assets:[],status:'preflight'};
function load(file){const module={exports:{}};const code=ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;const req=n=>n==='@/lib/supabase'?{getSupabaseClient:()=>db}:n.startsWith('@/')?load('src/'+n.slice(2)+'.ts'):n.startsWith('.')?require(path.resolve(root,path.dirname(file),n)):require(n);vm.runInNewContext(code,{require:req,module,exports:module.exports,URL,Buffer,console,Date,Math});return module.exports;}
(async()=>{
 const posts=manifest.articles.map(a=>{const p=path.join(root,'content/blog',a.slug+'.json'),bytes=fs.readFileSync(p);if(hash(bytes)!==a.jsonSha256)throw Error('Approved draft changed: '+a.slug);for(const im of a.images)if(hash(fs.readFileSync(path.join(dir,im.file)))!==im.sha256)throw Error('Approved image changed');return JSON.parse(bytes)});
 const {data:existing,error}=await db.from('blog_posts').select('*');if(error)throw error;
 const {validateBlogPublication}=load('src/lib/blog-publication.ts');
 const {isBlogSlugAvailable}=load('src/lib/blog-path.ts');
 for(const p of posts){if(!isBlogSlugAvailable(p.slug))throw Error('Reserved slug');const match=existing.find(x=>x.id===p.id||x.slug===p.slug);if(match&&(match.id!==p.id||match.slug!==p.slug))throw Error('Identity conflict');const error=validateBlogPublication(p,[...existing,...posts]);if(error)throw Error(error);}
 if(mode==='check'){console.log('Verified four approved draft hashes, 16 originals, available slugs, identities and publication rules.');return;}
 if(!receipt.baseline){receipt.baseline=existing.map(p=>({id:p.id,slug:p.slug,hash:hash(Buffer.from(JSON.stringify(p)))}));write(receiptPath,receipt);}
 if(mode==='stage'){
  const {POST:upload}=load('src/app/api/admin/upload/route.ts');
  for(const a of manifest.articles)for(const im of a.images){if(receipt.assets.some(x=>x.originalSha256===im.sha256))continue;const form=new FormData();form.append('bucket','blog-images');form.append('file',new File([fs.readFileSync(path.join(dir,im.file))],path.basename(im.proposedUrl),{type:'image/jpeg'}));const response=await upload(new Request('https://royalphuketcity.com/api/admin/upload',{method:'POST',body:form}));const result=await response.json();if(!response.ok||!result.url)throw Error('Upload failed: '+JSON.stringify(result));const live=await fetch(result.url);if(!live.ok)throw Error('Uploaded asset not readable');const bytes=Buffer.from(await live.arrayBuffer());receipt.assets.push({slug:a.slug,originalSha256:im.sha256,driveId:im.driveId,url:result.url,path:result.path,width:result.width,height:result.height,sha256:hash(bytes),bytes:bytes.length,role:im.role});write(receiptPath,receipt);console.log('Uploaded',a.slug,im.role);}
  const rows=[];for(const p of posts){const a=manifest.articles.find(x=>x.slug===p.slug);let content=p.content;for(const im of a.images){const asset=receipt.assets.find(x=>x.originalSha256===im.sha256);content=content.replaceAll(im.proposedUrl,asset.url);content=content.replace(new RegExp('(<img src="'+asset.url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'" width=")\\d+(" height=")\\d+(" )'),`$1${asset.width}$2${asset.height}$3`);}const row={...p,content,featured_image:receipt.assets.find(x=>x.slug===p.slug&&x.role==='cover').url,status:'draft',published_at:null,scheduled_at:null,updated_at:new Date().toISOString()};const err=validateBlogPublication(row,[...existing,...rows]);if(err)throw Error(err);rows.push(row);}
  for(const row of rows){const old=existing.find(x=>x.id===row.id);if(old){if(old.content!==row.content||old.featured_image!==row.featured_image)throw Error('Existing staged content differs');}else{const result=await db.from('blog_posts').insert(row);if(result.error)throw result.error;}}
  write(path.join(dir,'cms-release.json'),rows);receipt.articles=rows.map(x=>({id:x.id,slug:x.slug,status:'draft',url:'https://royalphuketcity.com/'+x.slug}));receipt.status='staged';write(receiptPath,receipt);
  const regPath=path.join(root,'content/editorial/image-ownership.json'),reg=read(regPath);for(const a of manifest.articles){if(reg.articles.some(x=>x.slug===a.slug))continue;reg.articles.push({slug:a.slug,images:a.images.map(im=>{const asset=receipt.assets.find(x=>x.originalSha256===im.sha256);return{url:asset.url,role:im.role==='cover'?'featured':'supporting',alt:im.alt,width:asset.width,height:asset.height,bytes:asset.bytes,sha256:asset.sha256,sourceSha256:im.sha256,origin:'Owner-supplied November Google Drive image library',driveId:im.driveId,driveUrl:im.driveUrl,variants:[{url:asset.url,width:asset.width}]}})});}write(regPath,reg);console.log('Staged four articles in the existing CMS and registered image ownership; no articles published.');return;
 }
 if(receipt.status!=='staged'&&receipt.status!=='published')throw Error('Stage and verify the release first');
 const rows=read(path.join(dir,'cms-release.json'));
 for(const asset of receipt.assets){const r=await fetch(asset.url);if(!r.ok||hash(Buffer.from(await r.arrayBuffer()))!==asset.sha256)throw Error('Live image hash mismatch');}
 for(const row of rows){const actual=existing.find(x=>x.id===row.id);if(!actual||actual.content!==row.content||actual.featured_image!==row.featured_image||actual.title!==row.title||actual.meta_description!==row.meta_description)throw Error('Staged record differs from approved release');const err=validateBlogPublication(actual,existing);if(err)throw Error(err);}
 const {PUT:publish}=load('src/app/api/admin/blog/route.ts');
 for(const row of rows){const result=await publish(new Request('https://royalphuketcity.com/api/admin/blog',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:row.id,status:'published'})}));const data=await result.json();if(!result.ok||data.post?.status!=='published')throw Error('Publication failed '+JSON.stringify(data));const rec=receipt.articles.find(x=>x.id===row.id);rec.status='published';rec.published_at=data.post.published_at;write(receiptPath,receipt);console.log('Published',row.slug);}
 const {data:after,error:afterError}=await db.from('blog_posts').select('*');if(afterError)throw afterError;for(const p of receipt.baseline){const record=after.find(x=>x.id===p.id);if(hash(Buffer.from(JSON.stringify(record)))!==p.hash)throw Error('Unexpected change to pre-existing record '+p.slug);}
 receipt.status='published';receipt.completedAt=new Date().toISOString();receipt.preexistingRecordsUnchanged=receipt.baseline.length;write(receiptPath,receipt);console.log('Verified all '+receipt.baseline.length+' pre-existing records unchanged.');
})().catch(e=>{console.error(e.message||e);process.exitCode=1});
