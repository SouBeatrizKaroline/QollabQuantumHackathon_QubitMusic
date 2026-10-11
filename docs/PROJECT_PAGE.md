# QubitMusic: adaptive soundtracks with quantum + classical computing

**Theme: Quantum Impact**

QubitMusic helps educators, small video creators and indie developers produce short instrumental cues adapted to a precise duration and energy brief. Instead of searching and editing existing recordings, users generate new audio from procedural notes, listen, adjust their brief and export a WAV.

The interface is available in English, Brazilian Portuguese, European Portuguese and Spanish. It requires no audio uploads, microphone access or third-party music APIs.

## What the quantum part does

Six qubits represent gentle-versus-energetic phrase choices across six sections. Our QAOA circuit encodes a quadratic cost balancing target energy, adjacent-section smoothness, total energy and gentle endpoints. A classical grid search tunes one-layer QAOA parameters using ideal statevectors. The selected Qollab backend measures the resulting circuit in one job. Classical code chooses the best observed arrangement and synthesizes the audio.

The app also enumerates all 64 arrangements classically, displays the exact optimum and solution gap, and lets the listener hear that arrangement. This makes the quantum contribution inspectable.

## Run it

Press Run and select the free built-in simulator. Choose a brief, duration, energy, palette and key, then Generate soundtrack. Press Play, export WAV, or compare the classical optimum. Use Qollab Stop and Run to generate a second brief: IonQ permits one job per execution. After verifying the built-in backend, choose the free IonQ simulator. Real hardware is optional.

## Impact and limitations

We target the practical effort of producing adaptable background cues without third-party recordings. User benefit remains a hypothesis, to be evaluated through task completion time, usable-export rate and listener ratings of brief fit. We report optimization costs as mathematical proxies rather than user outcomes. At six qubits, exact classical enumeration is cheaper than this quantum workflow; no quantum advantage is claimed. This is an early instrumental prototype, not a vocal or full-song generator.

## Reproducibility and disclosure

Code: https://github.com/SouBeatrizKaroline/QollabQuantumHackathon_QubitMusic

MIT licensed. Created during the hackathon build window with AI assistance. No pre-existing application implementation or commercial music assets were imported. QAOA is an established algorithm; our contribution is the soundtrack objective, hybrid pipeline, accessible studio and honest baseline comparison. The variation seed reproduces procedural note choices; remote quantum shot outcomes may vary.

Before submitting, add a verified public 2–3 minute demo video link and describe the actual tested Qollab backends. Do not claim an IonQ run that has not happened.
