import {random} from './quantum.js';
export function compose(state, {duration=24, key=60, sound='warm', seed=42}={}) {
  const rng=random(seed), scale=[0,2,4,7,9], notes=[], section=duration/6;
  for(let i=0;i<6;i++) {
    const bright=(state>>i)&1, steps=bright?8:4, root=[0,0,7,5,0,0][i];
    for(let j=0;j<steps;j++) {
      const degree=Math.floor(rng()*scale.length), pitch=key+scale[degree]+(bright&&j%3===0?12:0);
      notes.push({time:i*section+j*section/steps,duration:section/steps*.78,midi:pitch,velocity:bright?.24:.17,voice:'lead'});
    }
    notes.push({time:i*section,duration:section*.94,midi:key-24+root,velocity:.18,voice:'bass'});
    for(const offset of [0,7,12]) notes.push({time:i*section,duration:section*.9,midi:key-12+root+offset,velocity:.045,voice:'pad'});
  }
  return {version:1,duration,key,sound,seed,state,notes};
}
export function synthesize(track,sampleRate=22050) {
  const out=new Float32Array(Math.ceil(track.duration*sampleRate));
  for(const n of track.notes) {
    const start=Math.round(n.time*sampleRate), length=Math.min(Math.round(n.duration*sampleRate),out.length-start), frequency=440*2**((n.midi-69)/12);
    for(let j=0;j<length;j++) {
      const t=j/sampleRate, phase=2*Math.PI*frequency*t;
      const attack=Math.min(1,t/.03), release=Math.min(1,(length-j)/(sampleRate*.12));
      const decay=n.voice==='lead'?Math.exp(-t*(track.sound==='glass'?3:1.5)):1;
      let wave=Math.sin(phase);
      if(n.voice==='lead'&&track.sound==='glass') wave=.72*wave+.28*Math.sin(phase*2.01);
      if(n.voice==='lead'&&track.sound==='pulse') wave=.7*wave+.2*Math.sin(phase*3)+.1*Math.sin(phase*5);
      out[start+j]+=wave*attack*release*decay*n.velocity;
    }
  }
  // Peak-limit for predictable playback; volume affects listening only.
  let peak=0; for(const v of out) peak=Math.max(peak,Math.abs(v));
  const gain=peak>.85?.85/peak:1;
  for(let i=0;i<out.length;i++)out[i]*=gain*Math.min(1,i/(sampleRate*.02),(out.length-i)/(sampleRate*.15));
  return out;
}
export function wavBytes(samples,sampleRate=22050) {
  const buffer=new ArrayBuffer(44+samples.length*2),view=new DataView(buffer);
  const str=(offset,s)=>[...s].forEach((c,i)=>view.setUint8(offset+i,c.charCodeAt(0)));
  str(0,'RIFF');view.setUint32(4,36+samples.length*2,true);str(8,'WAVE');str(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,sampleRate,true);view.setUint32(28,sampleRate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);str(36,'data');view.setUint32(40,samples.length*2,true);
  samples.forEach((s,i)=>view.setInt16(44+i*2,Math.round(Math.max(-1,Math.min(1,s))*32767),true));
  return buffer;
}
