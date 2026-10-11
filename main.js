// Qollab entry: Python module imports are provided by Qollab's runtime.
import * as optimizer from 'quantum.optimizer';
import {startStudio} from './lib/app.js';
startStudio(async (energy,seed) => {
  // JSON avoids PyProxy/Map conversion ambiguity across Python and JavaScript.
  const proxy=await optimizer.run_json.callPromising(backend,energy,seed,256);
  const result=JSON.parse(String(proxy));
  proxy?.destroy?.();
  return result;
},'qollab');
