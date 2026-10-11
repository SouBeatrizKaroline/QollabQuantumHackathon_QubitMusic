# QubitMusic — Qollab Quantum Hackathon

**Original adaptive instrumental soundtracks for educators, small creators and indie developers.** Built for **Quantum Impact: solving real-world problems with quantum + classical computing**.

[Português do Brasil](docs/README.pt-BR.md) · [Português de Portugal](docs/README.pt-PT.md) · [Español](docs/README.es.md)

## The real-world problem

An educator needs a gentle 24-second cue for a lesson; an indie developer needs a more energetic 16-second game cue. Searching a music library, checking recording licenses, and editing a track to length takes effort. QubitMusic creates small instrumental cues from a duration and energy brief, without third-party recordings, paid APIs or accounts.

The proposed impact is more accessible soundtrack creation. It has **not** been validated through user studies. This is an instrumental prototype, not a full song or vocal generator. It does not guarantee legal uniqueness of a melody.

## Try the studio locally

Requires Node.js 20 or later. There are no npm dependencies.

```sh
git clone https://github.com/SouBeatrizKaroline/QollabQuantumHackathon_QubitMusic.git
cd QollabQuantumHackathon_QubitMusic
npm start
```

Open **http://127.0.0.1:4173**. Choose a brief, duration, energy, palette and key. Generate, listen, remix, compare the exact classical arrangement, export WAV or export the project JSON. The interface starts in **English** and supports **pt-BR, pt-PT and es**. There is no persistent storage: export before closing. WAV export is independent of listening volume; avoid high playback volume.

The standalone preview uses an explicitly labelled **JavaScript QAOA statevector simulation**. The Qollab version uses **Qiskit and the visitor-selected backend**, including the free built-in and IonQ simulators. No hardware results have been recorded.

## How quantum and classical computing work together

1. **Classical formulation:** split the duration into six sections. Each binary decision chooses a gentle (`0`) or energetic (`1`) musical phrase, giving 64 arrangements.
2. **Classical tuning:** search 120 parameter pairs using ideal statevector expectations for a one-layer QAOA circuit.
3. **Quantum circuit:** six Hadamards, diagonal cost evolution through RZ and CX–RZ–CX gates, RX mixing, then 256 measurement shots. On Qollab this circuit is executed by its selected Qiskit backend.
4. **Classical selection:** choose the lowest-cost *observed* arrangement, with measurement frequency as a tie-breaker.
5. **Classical synthesis:** seed-controlled pentatonic notes, bass and pads become PCM audio and a mono 22,050 Hz / 16-bit WAV.

For binary choices `x_i`, energy `e`, and targets `t = e × [0.35, 0.8, 1, 1, 0.8, 0.35]`, minimize:

```text
C(x) = Σ_i (x_i - t_i)²
     + 0.45 Σ_i=1..5 (x_i - x_(i-1))²
     + (0.4/6) (Σ_i x_i - Σ_i t_i)²
     + 0.35 (x_0 + x_5)
```

These terms model energy fit, smoother section changes, an overall energy budget and gentle endpoints. They are design proxies, not validated measures of musical quality. The circuit encodes this objective, rather than adding unrelated quantum randomness to music.

**Honest baseline:** exact classical enumeration over all 64 states supplies the reference cost and solution gap. At this size classical enumeration is cheaper and definitive. No quantum speedup or advantage is claimed. A low sampled gap does not demonstrate an advantage; selecting the best of 256 shots can often recover the exact answer simply because the search space is tiny. Circuit parameter tuning itself uses classical simulation, so this is a hybrid experiment with a meaningful optimization task, not a production quantum accelerator.

## Run and publish on Qollab

To publish the standalone browser studio on Vercel, see [Vercel setup](docs/VERCEL.md). The repository includes `vercel.json` and `npm run build`, producing a static site in `dist/`. No API keys or environment variables are needed. The Vercel version uses the clearly labelled browser simulation.

See [Qollab setup](docs/QOLLAB.md). Upload the root `index.html`, `main.css`, `main.js`, `requirements.txt`, `LICENSE`, and the `lib/` and `quantum/` folders, preserving paths. `npm run package:qollab` prepares this set under `artifacts/qollab/`.

Qollab injects `backend`; Python is invoked through `callPromising`. The project submits **one backend job per run**, compatible with IonQ's limit. After generating once, use Qollab **Stop → Run** to generate a new brief. A failed submission also requires a new run. The variation seed controls musical synthesis, not IonQ shot reproducibility. Start with the free built-in simulator, then verify the free IonQ simulator. Real hardware is optional and consumes credits.

## Hackathon alignment and submission status

The [official requirements](https://qollab.xyz/programs/hackathon/how-it-works) require a runnable Qiskit project published on Qollab under MIT, a project write-up, work built during the event (or disclosure of pre-existing code), and a **public 2–3 minute video**.

- Implemented here: interactive app, Qiskit circuit, MIT license, four languages, exact baseline, tests, project-page text and demo script.
- Still to complete for eligibility: upload and execute on Qollab, verify the built-in and IonQ simulators there, publish the Qollab project, record and publish the demo video, and submit through the captain's team page.
- Registration closed October 8 at 11:00 ET. Existing registered teams can submit until October 11 at 19:00 ET (**20:00 in São Paulo**). This repository does not register a team or submit an entry.
- Created during the October 11, 2026 build window with AI assistance. Standard QAOA/Qiskit techniques and original procedural synthesis are used; no pre-existing project implementation was imported. Disclose these details in the submission.

[Project page draft](docs/PROJECT_PAGE.md) · [Demo script](docs/DEMO.md) · [Technical notes](docs/ARCHITECTURE.md)

## Validation

```sh
npm test
python -m pip install -r requirements.txt
python -m unittest discover -s tests -p 'test_*.py'
```

Tests cover probability normalization, seeded measurements, observed-state selection, objective reconstruction into Ising coefficients, circuit probabilities, the single backend call, locale completeness, audio bounds and WAV duration/header. CI runs the JavaScript and Qiskit checks. Qollab runtime and remote IonQ execution must be verified separately; passing local tests is not proof of that deployment.

## License

[MIT](LICENSE). No third-party recordings or samples are bundled. Generated audio is synthesized locally; this project imposes no additional use restrictions on exported audio.
