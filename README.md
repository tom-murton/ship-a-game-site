# Ship a Game

The canonical public home for Tom Murton's Ship a Game benchmark, served at
`https://shipagame.weevolve.app`.

This is an Astro 7 static site. Complete game reports live in `content/games`; one MDX
file creates the scoreboard card and full report. The two build prompts and reporting
prompt live in `src/data/` and are published at `/prompt`.

```sh
npm install
npm run dev
npm run build
```

## Feedback

The form at `/feedback` posts to the Cloudflare Worker at `/api/feedback`. Each message
is stored as one private JSON object in the EU-jurisdiction
`ship-a-game-feedback-eu` R2 bucket. The bucket has no public domain and nothing is
published automatically.

Read submissions from the private R2 bucket in the Cloudflare dashboard. The Worker
keeps only the submitted message, optional reply email, category, source page and
timestamp. Delete feedback after it has been handled and is no longer needed.

## Deployment

The primary target is Cloudflare Workers with Static Assets. Static requests bypass
Worker execution; only `/api/feedback` runs the Worker and writes to R2.

- Cloudflare Worker: `ship-a-game-site`
- Static output: `dist`
- Production domain: `https://shipagame.weevolve.app`
- Private feedback bucket: `ship-a-game-feedback-eu`
- R2 binding: `FEEDBACK_BUCKET`

```sh
npm ci
npm run check
npm test
npm run build
npm run dev:cloudflare
npm run deploy
```

Run `npm run types:cloudflare` after changing bindings in `wrangler.jsonc`.
Cloudflare account setup, preview checks, custom-domain cutover and rollback are in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

The Vercel Function and Blob dependency remain temporarily as a rollback path. Netlify
is not part of the deployment path.
