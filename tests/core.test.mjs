import test from 'node:test';
import assert from 'node:assert/strict';
import {objective,probabilities,tune,sample,summarize,browserQuantum} from '../lib/quantum.js';
import {compose,synthesize,wavBytes} from '../lib/music.js';
import {translations} from '../lib/i18n.js';
test('QAOA probabilities normalize for diverse briefs and parameters',()=>{
  for(const energy of [0,.25,.55,.85,1])for(const [g,b] of [[0,0],[.8,.4],[Math.PI,.7]]){
    const p=probabilities(objective(energy),g,b);assert.ok(p.every(v=>v>=0&&v<=1));assert.ok(Math.abs(p.reduce((a,b)=>a+b)-1)<1e-12);
  }
});
test('zero cost-phase produces uniform distribution and tuning improves expected cost',()=>{
  const costs=objective(.85);const p=probabilities(costs,0,.7);for(const v of p)assert.ok(Math.abs(v-1/64)<1e-12);
  assert.ok(tune(costs).expectation<costs.reduce((a,b)=>a+b)/64);
});
test('measurement selection never invents an unobserved candidate; exact baseline is independent',()=>{
  const costs=objective(0);const result=summarize(costs,{'111111':256});assert.equal(result.state,63);assert.equal(result.exactState,0);assert.ok(result.gap>0);
});
test('sampling conserves shot count and seeded runs reproduce',async()=>{
  const a=await browserQuantum(.55,42),b=await browserQuantum(.55,42);assert.deepEqual(a,b);assert.equal(Object.values(a.counts).reduce((a,b)=>a+b),256);assert.ok(a.gap>=-1e-12);assert.deepEqual(sample(tune(objective(.55)).probs,256,7),sample(tune(objective(.55)).probs,256,7));
});
test('music and PCM preserve duration, seed, bounds and valid WAV header',()=>{
  for(const sound of ['warm','glass','pulse']){
    const track=compose(42,{duration:8,seed:42,sound});assert.deepEqual(track,compose(42,{duration:8,seed:42,sound}));
    assert.ok(track.notes.every(n=>n.time+n.duration<=8));const pcm=synthesize(track);assert.equal(pcm.length,176400);assert.ok(pcm.every(v=>Number.isFinite(v)&&Math.abs(v)<=.851));assert.ok(pcm.some(v=>Math.abs(v)>.1));
    const wav=new DataView(wavBytes(pcm));assert.equal(wav.getUint32(24,true),22050);assert.equal(wav.getUint32(40,true),pcm.length*2);assert.equal(wav.byteLength,44+pcm.length*2);
  }
});
test('all four locales have exactly the English keys',()=>{const keys=Object.keys(translations.en).sort();assert.equal(Object.keys(translations).length,4);for(const dict of Object.values(translations)){assert.deepEqual(Object.keys(dict).sort(),keys);assert.ok(Object.values(dict).every(v=>typeof v==='string'&&v.length>0));}});
