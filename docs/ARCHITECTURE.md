# Architecture and evaluation

- `index.html` is body-only markup for Qollab's HTML/JS runtime; `main.css` is its supported stylesheet.
- `main.js` is the Qollab entry and imports `quantum.optimizer` through the platform's Python bridge.
- `quantum/optimizer.py` constructs the Qiskit circuit, tunes parameters with Statevector, submits one backend job and returns JSON.
- `lib/quantum.js` implements the same ideal p=1 statevector evolution for an independent standalone preview and reproducibility tests. It is not a Qiskit replacement for the Qollab entry.
- `lib/music.js` turns an arrangement and seed into notes and mono PCM, then serializes 16-bit WAV.
- `lib/app.js` handles controls, playback and exports. Language changes do not regenerate or alter audio.
- `lib/i18n.js` contains complete EN, pt-BR, pt-PT and es dictionaries.
- `tools/server.mjs` serves a local wrapper using `preview.js`; it does not execute the Qollab-only entry in an ordinary browser.

## Objective-to-circuit conversion

The cost is quadratic in binary variables. Since `x_i=(1-Z_i)/2`, its diagonal Hamiltonian contains only a constant, single-Z coefficients and ZZ coefficients. A Walsh transform of the 64 costs calculates these coefficients exactly. The constant gives only global phase and is omitted. Apply `RZ(2γh_i)` and `CX-RZ(2γJ_ij)-CX`, then `RX(2β)` for every qubit. Qiskit bitstrings list the highest-index bit first; section i uses `(state >> i) & 1` in both languages.

## Experimental limits

The selected cost is the best *sampled* cost, not the expectation value used during tuning. Shot outcomes vary on Qollab; the seed only controls procedural note generation. Local preview shot sampling is seeded for reproducibility. Short WAVs use 22,050 Hz mono PCM, capped at 60 seconds, with attack/release envelopes and a peak limiter. The volume slider affects playback only.

Six binary decisions make this a deliberately small demo. They cannot produce the compositional richness of a trained music model. The formulation is a handcrafted proxy for soundtrack fit; no listener study establishes that lower objective cost sounds better. The classical exact baseline is a correctness reference and a competitive alternative, not evidence for quantum advantage.

## Proposed impact evaluation (not measured)

Recruit educators and indie creators for the same duration/energy task. Compare this app with a classical-only version and a conventional search/edit workflow. Measure time to accepted audio, task completion rate, brief-fit ratings and perceived control. For larger combinatorial problems compare QAOA with equal-budget random sampling, greedy choices, dynamic programming where applicable and classical optimization; count tuning, synthesis and backend latency, rather than reporting quantum execution alone.
