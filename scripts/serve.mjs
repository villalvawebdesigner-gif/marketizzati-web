import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.woff':'font/woff','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 try {
  const requestPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const resolved=path.resolve(root,'.'+requestPath);
  if((resolved!==path.resolve(root)&&!resolved.startsWith(path.resolve(root)+path.sep))||requestPath.split('/').some(s=>s.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}
  let file=resolved;const info=await stat(file);
  if(info.isDirectory()){
   if(!requestPath.endsWith('/')){res.writeHead(301,{Location:requestPath+'/'});res.end();return;}
   file=path.join(file,'index.html');
  }
  const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data);
 }catch(err){try{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}catch{res.writeHead(404);res.end('Run npm run build first.');}}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/it/`));
