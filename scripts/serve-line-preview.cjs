// Local-only preview server. Serves only the fictional preview and public brand assets.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 const logo=/^\/images\/line\/((?:hotel|yanlong|twist|spa)(?:-avatar)?)\.png$/.exec(url.pathname);
 const previews = { '/': '.secrets/line-preview.html', '/festive': '.secrets/festive-line-preview.html' };
 const file = Object.hasOwn(previews, url.pathname) ? previews[url.pathname] : logo ? `public/images/line/${logo[1]}.png` : null;
 if(!file){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',logo?'image/png':'text/html; charset=utf-8');
 res.setHeader('Cache-Control', 'no-store');
 const stream = fs.createReadStream(path.resolve(__dirname,'..',file));
 stream.on('error', () => { res.writeHead(404); res.end(); });
 stream.pipe(res);
}).listen(3002,'127.0.0.1',()=>console.log('LINE preview: http://127.0.0.1:3002'));
