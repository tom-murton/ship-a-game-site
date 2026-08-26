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
is inserted as one private row in the existing Neon project
`ship-a-game-feedback`. Nothing is published automatically.

Read submissions from the private `feedback` table in the Neon console. The Worker
keeps only the submitted message, optional reply email, category, source page and
timestamp. Delete feedback after it has been handled and is no longer needed.

## Deployment

The primary target is Cloudflare Workers with Static Assets. Static requests bypass
Worker execution; only `/api/feedback` runs the Worker and writes to Neon.

- Cloudflare Worker: `ship-a-game-site`
- Static output: `dist`
- Production domain: `https://shipagame.weevolve.app`
- Private feedback database: Neon project `ship-a-game-feedback`
- Cloudflare secret: `DATABASE_URL`

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
