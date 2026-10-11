import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output=resolve(root,'dist');
await mkdir(resolve(output,'lib'),{recursive:true});
const body=await readFile(resolve(root,'index.html'),'utf8');
await writeFile(resolve(output,'index.html'),`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Generate adaptive instrumental soundtracks with a six-qubit QAOA browser simulation and classical audio synthesis. English, Brazilian Portuguese, European Portuguese and Spanish.">
  <title>QubitMusic · Quantum Impact</title>
  <link rel="stylesheet" href="/main.css">
</head>
<body>${body}<script type="module" src="/preview.js"></script></body>
</html>
`);
// Only browser-compatible assets are deployed; Qollab keeps its own root entry.
for(const name of ['main.css','preview.js','lib/app.js','lib/i18n.js','lib/music.js','lib/quantum.js']){
  await copyFile(resolve(root,name),resolve(output,name));
}
console.log('Vercel browser studio built in dist/');
