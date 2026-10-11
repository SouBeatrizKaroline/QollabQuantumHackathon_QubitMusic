# Running QubitMusic on Qollab

## Upload

1. Sign in to your existing Qollab account and create a project named **QubitMusic — Adaptive Soundtracks with Quantum + Classical Computing**.
2. Run `npm run package:qollab` locally, then upload the contents of `artifacts/qollab/`, preserving folder names. The root needs `index.html` and `main.js`; this makes it an HTML/JS project. Do not upload `preview.js`, the Node server, tests, workflows or a generated standalone page.
3. Paste [PROJECT_PAGE.md](PROJECT_PAGE.md) into the write-up. Select the MIT license and include the license file.
4. Press **Run**, choose the **built-in simulator**, then generate one cue. Check that 256 shots are returned, the cost/gap appear, playback works, and WAV export succeeds.
5. Press **Stop**, then **Run** and choose the **free IonQ simulator**, beginning with 256 shots. Repeat the same checks and document any noise-related changes. Do not select credit-consuming quantum hardware unless you intend to spend credits.
6. The runtime permits only one IonQ job per run. This app also permits one generation per Qollab run, even on local simulators, to keep the behavior consistent. Use Stop / Run to change a quantum brief. Audio controls and the classical comparison do not submit new jobs.
7. Publish a version such as `v1.0-hackathon`, making it public and default. Verify the public project page from a signed-out session.
8. Record the 2–3 minute demonstration using [DEMO.md](DEMO.md), publish a no-sign-in video link, and add the Qollab and video links to your registered team's submission before the deadline.

## Runtime details

`main.js` imports `quantum.optimizer`. Its `run_json.callPromising(backend, energy, seed, 256)` invocation allows Qollab's Python/JS bridge to suspend during IonQ network requests. The Python module uses the injected backend; it never instantiates a separate provider. The return value is a JSON string to avoid Python proxy versus JavaScript Map conversions. The browser synthesizes all audio, so no additional network requests or secrets are needed.

The project uses Qollab's documented Qiskit range, `>=2.5.2,<3.0.0`. No Aer, SciPy optimizer or other extra dependency is required. Classical QAOA tuning uses Qiskit Statevector before the single submitted circuit.

## Verification checklist

- [ ] Built-in backend returns 256 shots and a selected measured state.
- [ ] Free IonQ simulator executes one job without backend API errors.
- [ ] All four languages render and controls remain usable.
- [ ] Play, Stop and volume work in Qollab's iframe.
- [ ] WAV and JSON download in Qollab's iframe.
- [ ] Public/default Qollab version has an MIT license and clear write-up.
- [ ] Public 2–3 minute video can be viewed without sign-in.
- [ ] Registered captain submits the entry.

These checks are intentionally left unmarked until actually executed on Qollab.

Official references: [runtime](https://qollab.xyz/learn/docs/runtime-environment), [JS/Qiskit](https://qollab.xyz/learn/docs/js-qiskit-projects), [backends](https://qollab.xyz/learn/docs/compute-backends), [publishing](https://qollab.xyz/learn/docs/publish), [hackathon](https://qollab.xyz/programs/hackathon/how-it-works).
