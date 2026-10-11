# Deploy the browser studio on Vercel

The Vercel site runs the labelled JavaScript QAOA browser simulation. The Qiskit entry remains in the repository for Qollab, where the selected backend is supplied by that platform.

1. Sign in at https://vercel.com/new and connect GitHub if needed.
2. Import `SouBeatrizKaroline/QollabQuantumHackathon_QubitMusic`.
3. Set the project name to `qubitmusic`.
4. Use framework preset **Other**, root directory **./**, build command **npm run build**, and output directory **dist**. `vercel.json` already declares the build/output configuration.
5. No environment variables or API keys are needed. Click **Deploy**.
6. Once deployment is ready, open the actual production URL. In **Settings → Domains**, check whether `qubitmusic.vercel.app` is assigned. If it is available, assign that exact address so the pitch video's QR destination matches. Project name alone does not guarantee availability of that address.
7. Test generation, playback, WAV export and all four languages on the production site.

If the requested address is unavailable, use the actual Vercel address and update the video QR before publishing the video. Vercel publication does not replace the hackathon's required runnable Qollab publication.

For a local build, run `npm run build`; the complete standalone site is generated in `dist/`. It does not use the Node preview server in production.
