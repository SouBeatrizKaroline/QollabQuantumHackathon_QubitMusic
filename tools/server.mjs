import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,dirname,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(path==='/') {
      const html=await readFile(resolve(root,'index.html'),'utf8');
      res.writeHead(200,{'Content-Type':types['.html']});
      return res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>QubitMusic · Quantum Impact</title><link rel="stylesheet" href="/main.css"></head><body>${html}<script type="module" src="/preview.js"></script></body></html>`);
    }
    const file=resolve(root,'.'+path);
    const allowed=file.startsWith(root+sep)&&['.js','.css'].includes(extname(file))&&!file.includes(`${sep}node_modules${sep}`);
    if(!allowed){res.writeHead(404);return res.end('Not found');}
    res.writeHead(200,{'Content-Type':types[extname(file)]});res.end(await readFile(file));
  }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log(`QubitMusic preview: http://127.0.0.1:${server.address().port}`));
