import {translations} from './i18n.js';
import {compose,synthesize,wavBytes} from './music.js';
export function startStudio(provider, mode='browser') {
  const $=id=>document.getElementById(id);
  let language='en',result=null,track=null,source=null,audio=null,gain=null,used=false,busy=false,pcm=null,playing=false,statusKey='ready';
  const t=key=>translations[language][key];
  const status=key=>{$('status').textContent=t(key);statusKey=key;};
  function localize(){document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));$('engineBadge').textContent=t(mode);status(statusKey);if(track)draw();if(playing)$('play').textContent=t('playing');}
  function settings(){return {duration:Number($('duration').value),energy:Number($('energy').value)/100,key:Number($('key').value),sound:$('sound').value,seed:Math.max(1,Math.min(999999,Math.floor(Number($('seed').value)||42)))};}
  function enable(){for(const id of ['play','stop','wav','json','classical'])$(id).disabled=!track||busy;for(const id of ['generate','remix'])$(id).disabled=busy;}
  function stop(){if(source){source.onended=null;source.stop();source=null;}playing=false;$('play').textContent=t('play');status('stopped');}
  function draw(){
    $('trackTitle').textContent=t('track');$('score').replaceChildren();
    for(const note of track.notes){const el=document.createElement('span');el.className='note '+note.voice;el.style.left=100*note.time/track.duration+'%';el.style.width=Math.max(.6,100*note.duration/track.duration)+'%';el.style.bottom=Math.max(2,Math.min(90,(note.midi-30)*1.75))+'%';el.style.height=note.voice==='lead'?'9px':'4px';$('score').append(el);}
    $('timeline').replaceChildren();for(let i=0;i<6;i++){const el=document.createElement('span');const bright=(track.state>>i)&1;el.className=bright?'bright':'';el.textContent=`0${i+1} · ${t(bright?'high':'low')}`;$('timeline').append(el);}
    const selectedCost=track.state===result.exactState?result.optimum:result.cost;
    $('cost').textContent=selectedCost.toFixed(3);$('optimal').textContent=result.optimum.toFixed(3);$('gap').textContent=(selectedCost-result.optimum).toFixed(3);
    $('circuitInfo').textContent=`H × 6 → RZ / RZZ (γ=${result.gamma.toFixed(3)}) → RX (β=${result.beta.toFixed(3)}) → ${result.shots} shots · |${result.bits.replaceAll(' ','')}⟩`;
    $('histogram').replaceChildren();const counts=Object.entries(result.counts).sort((a,b)=>b[1]-a[1]).slice(0,8),max=Math.max(...counts.map(([,v])=>v));for(const [bits,count] of counts){const bar=document.createElement('div');bar.style.height=75*count/max+'px';bar.title=`${bits}: ${count}`;const label=document.createElement('small');label.textContent=bits;bar.append(label);$('histogram').append(bar);}
  }
  async function generate(){
    if(busy)return;if(mode==='qollab'&&used){status('used');return;}
    stop();busy=true;enable();status('busy');const config=settings();
    try{if(mode==='qollab')used=true;result=await provider(config.energy,config.seed);track=compose(result.state,config);pcm=null;draw();status('done');}
    catch(error){console.error(error);status(mode==='qollab'?'needRun':'failed');}
    finally{busy=false;enable();}
  }
  async function play(){
    if(!track)return;stop();
    try{audio??=new (window.AudioContext||window.webkitAudioContext)();await audio.resume();gain??=audio.createGain();gain.disconnect();gain.connect(audio.destination);gain.gain.value=Number($('volume').value)/100;pcm??=synthesize(track);const buffer=audio.createBuffer(1,pcm.length,22050);buffer.copyToChannel(pcm,0);source=audio.createBufferSource();source.buffer=buffer;source.connect(gain);source.onended=()=>{source=null;playing=false;$('play').textContent=t('play');status('done');};source.start();playing=true;$('play').textContent=t('playing');status('playing');}
    catch(error){console.error(error);status('errorAudio');}
  }
  function download(content,type,name){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
  $('language').onchange=()=>{language=$('language').value;localize();};
  $('generate').onclick=generate;
  $('remix').onclick=()=>{if(mode==='qollab'&&used){status('used');return;}$('seed').value=(Number($('seed').value)||42)%999999+1;generate();};
  $('play').onclick=play;$('stop').onclick=stop;
  $('volume').oninput=()=>{if(gain)gain.gain.setTargetAtTime(Number($('volume').value)/100,audio.currentTime,.03);};
  $('wav').onclick=()=>{if(!track)return;pcm??=synthesize(track);download(wavBytes(pcm),'audio/wav',`qubitmusic-${track.seed}.wav`);status('exported');};
  $('json').onclick=()=>{if(track)download(JSON.stringify({track,optimization:result,selectedMethod:track.state===result.exactState?'exact-or-matching-quantum':'quantum-sampled'},null,2),'application/json',`qubitmusic-${track.seed}.json`);};
  $('classical').onclick=()=>{if(!track)return;stop();track=compose(result.exactState,track);pcm=null;draw();play().then(()=>status('classicalDone'));};
  for(const id of ['duration','energy','sound','key','seed'])$(id).addEventListener('input',()=>{$('durationValue').textContent=$('duration').value+' s';$('energyValue').textContent=$('energy').value+'%';if(track)status('changed');});
  $('preset').onchange=()=>{const p={lesson:[24,25,'warm'],story:[30,55,'glass'],game:[16,85,'pulse']}[$('preset').value];$('duration').value=p[0];$('energy').value=p[1];$('sound').value=p[2];$('duration').dispatchEvent(new Event('input'));};
  localize();enable();
}
