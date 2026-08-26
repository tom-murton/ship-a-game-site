# Ship a Game agent guide

This is the canonical repository for `https://shipagame.weevolve.app`, the public
benchmark that tests whether frontier AI models can research, build, improve and
report on real paid iOS games.

## Read before changing anything

- `README.md` — local setup and deployment.
- `content/games/README.md` — publishing contract for game reports.
- `src/content.config.ts` — enforced content schema.

Inspect `git status` first. Preserve unrelated work and stage only files belonging to
the task.

## Sources of truth

- `content/games/*.mdx` contains the published results and first-person reports.
- `src/data/` contains the benchmark prompts and scoring protocol.
- `public/images/games/` contains game icons and screenshots.
- `src/pages/index.astro` and `src/styles/global.css` define the distinctive benchmark
  experience.

Do not recreate the benchmark inside `personal-cv`. Tom's portfolio should link here;
its personal editorial article may remain there. WeEvolve is the publisher catalogue
and should link here rather than duplicate reports.

Never invent run metrics, playtest verdicts, costs, model continuity or Apple outcomes.
Use the primary logs and store records. A missing human playtest stays explicitly
“Not recorded”.

## Validation and deployment

Run `npm run build`. For visual changes, inspect desktop and mobile widths, keyboard
navigation, reduced motion, contrast and image alt text.

The canonical site deploys to Cloudflare Worker `ship-a-game-site`; the domain is
`shipagame.weevolve.app` and GitHub `main` is the production branch. Static assets
come from `dist`. `scripts/prepare-cloudflare-assets.mjs` creates the generated
`dist/_root.html` used by the root rewrite; edit the Astro page, not that build output.
Only `/api/feedback` may run Worker code; keep
`assets.run_worker_first` narrowly scoped to that path.

Feedback is handled by `worker/index.js` and stored as private rows in the existing
Neon project `ship-a-game-feedback`. Keep `DATABASE_URL` in Cloudflare secrets,
collect only the existing form fields and never log messages or reply email addresses.
Read submissions from the Neon console and delete them when no longer needed.
Run `npm run types:cloudflare` after changing bindings; do not hand-edit
`worker-configuration.d.ts`.

Before deployment, run `npm run check`, `npm test`, `npm run build` and
`npx wrangler deploy --dry-run`. Verify the feedback endpoint in `wrangler dev`,
including a stored test row that is removed afterwards.

`api/feedback.js`, `vercel.json` and `@vercel/blob` remain only for the documented
Vercel rollback window. Do not add new Vercel-only behaviour.

Netlify is not part of the production path. Do not reconnect this repository to
Netlify or run a Netlify deployment.
