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

The canonical site deploys to Vercel project `ship-a-game`
(`prj_hb5UDbo3qdA61qw25T6ASrjUgkKj`) and the domain is
`shipagame.weevolve.app`. Netlify project
`a37e7c95-c0b4-4369-aa9f-823f0cd1a85f` is a frozen feedback endpoint only.
Its GitHub webhook and deploy key are intentionally removed because every Netlify
production deploy consumes 15 credits. `vercel.json` redirects `/feedback` and
`/thanks` to that frozen deployment.

Do not reconnect this repository to Netlify or run a Netlify production deploy for
routine content changes. Do not reintroduce Vercel Functions, Neon or another database
for feedback.
