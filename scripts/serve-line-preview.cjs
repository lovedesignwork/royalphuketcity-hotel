// Local-only preview server. Serves only the fictional preview and four public logos.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 const logo=/^\/images\/line\/(hotel|yanlong|twist|spa)\.png$/.exec(url.pathname);
 const file=url.pathname==='/'?'.secrets/line-preview.html':logo?`public/images/line/${logo[1]}.png`:null;
 if(!file){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',logo?'image/png':'text/html; charset=utf-8');
 fs.createReadStream(path.resolve(__dirname,'..',file)).pipe(res);
}).listen(3002,'127.0.0.1',()=>console.log('LINE preview: http://127.0.0.1:3002'));
