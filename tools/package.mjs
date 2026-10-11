import {mkdir,copyFile,cp} from 'node:fs/promises';
import {resolve} from 'node:path';
await mkdir('artifacts/qollab',{recursive:true});
for(const name of ['index.html','main.css','main.js','requirements.txt','LICENSE'])await copyFile(name,resolve('artifacts/qollab',name));
for(const name of ['lib','quantum'])await cp(name,resolve('artifacts/qollab',name),{recursive:true,filter:source=>!source.includes('__pycache__')});
console.log('Qollab upload files are ready in artifacts/qollab. Upload preserving folders.');
