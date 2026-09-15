# Ship a Game agent guide

This is the canonical repository for `https://shipagame.weevolve.app`, the public
benchmark that tests whether frontier AI models can research, build, improve and
report on real paid iOS games. Its readers are builders and people assessing what those
models actually achieved; clear evidence and honest limitations matter more than scores.

## Read for the task

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

Build content and page changes with `npm run build`; use reference checks for documentation
changes. For visual changes, inspect desktop and mobile widths, keyboard
navigation, reduced motion, contrast and image alt text.

The canonical site deploys to Cloudflare Worker `ship-a-game-site`; the domain is
`shipagame.weevolve.app` and GitHub `main` is the production branch. Static assets
come from `dist`. `scripts/prepare-cloudflare-assets.mjs` creates the generated
`dist/_root.html` used by the root rewrite; edit the Astro page, not that build output.
Only `/api/feedback` may run Worker code; keep
`assets.run_worker_first` narrowly scoped to that path.

Cloudflare Builds watches GitHub `main`; a push to `main` runs `npm run build` and
`wrangler deploy`. Use `npm run deploy` only for an intentional manual recovery or an
explicitly requested deployment. Confirm the resulting build and the live custom domain
before reporting production complete.

Feedback is handled by `worker/index.js` and stored as private rows in the existing
Neon project `ship-a-game-feedback`. Keep `DATABASE_URL` in Cloudflare secrets,
collect only the existing form fields and never log messages or reply email addresses.
Read submissions from the Neon console and delete them when no longer needed.
Run `npm run types:cloudflare` after changing bindings; do not hand-edit
`worker-configuration.d.ts`.

For Worker or feedback changes, run `npm run check`, `npm test` and the build; verify
the endpoint in `wrangler dev` when integration behaviour changes. Use a clearly marked
test row and remove exactly that row afterwards. Routine content changes need no database
write. For deployment configuration changes, also run `npx wrangler deploy --dry-run`.

`api/feedback.js`, `vercel.json` and `@vercel/blob` remain only for the documented
Vercel rollback window. Do not add new Vercel-only behaviour.

Netlify is not part of the production path. Do not reconnect this repository to
Netlify or run a Netlify deployment.

## Working agreements

Use a task branch; reuse an existing branch/worktree only for the same task and preserve
unrelated changes. Complete the requested scope and appropriate checks without routine
approval pauses. Keep current work in the existing tracker; update an instruction only
when this task changes its meaning or invalidates its references. Skills are optional
sources of relevant expertise, not a mandatory sequence for every change.
