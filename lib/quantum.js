// Six binary phrase choices. Bit i is phrase i (Qiskit's little-endian order).
export const N = 6;
export function objective(energy = .4) {
  if (!Number.isFinite(energy) || energy < 0 || energy > 1) throw new Error('Energy must be in [0, 1]');
  const targets = [.35, .8, 1, 1, .8, .35].map(v => v * energy);
  return Array.from({length: 1 << N}, (_, state) => {
    const x = Array.from({length:N}, (_, i) => (state >> i) & 1);
    const fit = x.reduce((s,v,i) => s + (v - targets[i]) ** 2, 0);
    const smooth = x.slice(1).reduce((s,v,i) => s + .45 * (v - x[i]) ** 2, 0);
    const budget = .4 / N * (x.reduce((a,b) => a+b,0) - targets.reduce((a,b) => a+b,0)) ** 2;
    return fit + smooth + budget + .35 * (x[0] + x[N-1]);
  });
}
export function probabilities(costs, gamma, beta) {
  let real = costs.map(c => Math.cos(-gamma*c)/8);
  let imag = costs.map(c => Math.sin(-gamma*c)/8);
  const c = Math.cos(beta), s = Math.sin(beta);
  for (let q=0;q<N;q++) for(let a=0;a<64;a++) {
    if(a & (1 << q)) continue;
    const b = a | (1 << q), ar=real[a], ai=imag[a], br=real[b], bi=imag[b];
    real[a]=c*ar+s*bi; imag[a]=c*ai-s*br;
    real[b]=c*br+s*ai; imag[b]=c*bi-s*ar;
  }
  return real.map((v,i) => v*v+imag[i]*imag[i]);
}
export function tune(costs) {
  let best = {expectation:Infinity};
  // Classical parameter search; statevector simulation, not hardware acceleration.
  for(let g=1;g<=12;g++) for(let b=1;b<=10;b++) {
    const gamma=g*Math.PI/12, beta=b*Math.PI/20;
    const probs=probabilities(costs,gamma,beta);
    const expectation=probs.reduce((s,p,i)=>s+p*costs[i],0);
    if(expectation<best.expectation) best={gamma,beta,expectation,probs};
  }
  return best;
}
export function random(seed) {
  let a = seed >>> 0;
  return () => { a += 0x6D2B79F5; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
}
export function sample(probs, shots, seed) {
  const rng=random(seed), counts={};
  for(let j=0;j<shots;j++){let value=rng(),i=0;while(i<63 && value>probs[i]) value-=probs[i++];const key=i.toString(2).padStart(N,'0');counts[key]=(counts[key]||0)+1;}
  return counts;
}
export function summarize(costs,counts,params={}) {
  const entries=Object.entries(counts).filter(([,v])=>v>0);
  if(!entries.length) throw new Error('Backend returned no measurements');
  const winner=entries.map(([bits,count])=>({bits,count,state:parseInt(bits.replaceAll(' ',''),2)})).sort((a,b)=>costs[a.state]-costs[b.state]||b.count-a.count||a.state-b.state)[0];
  const optimum=Math.min(...costs), exactState=costs.indexOf(optimum);
  return {...params,counts,state:winner.state,bits:winner.bits,cost:costs[winner.state],optimum,exactState,gap:costs[winner.state]-optimum};
}
export async function browserQuantum(energy,seed) {
  const costs=objective(energy), params=tune(costs), counts=sample(params.probs,256,seed);
  return summarize(costs,counts,{gamma:params.gamma,beta:params.beta,expectation:params.expectation,engine:'browser',shots:256});
}
