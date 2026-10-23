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
Cloudflare Builds watches GitHub `main` and deploys it to production automatically.

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

## AI discovery checkpoint - 23 October 2026

The shared layout publishes the visible WeEvolve publisher, Ship a Game website and
page identities. Existing game reports add Article, VideoGame and breadcrumb facts
from their actual content and store links; the homepage lists that report inventory.
The report frontmatter `date` is a game release date, so it is not used as an article
publication or modification date. Model subjects are not presented as human authors,
and intervention scores are not consumer ratings.

Canonical URLs use the existing clean routes without trailing slashes, matching site
links, sitemap entries and Cloudflare file rewrites. The sitemap includes all three
published HTML round prompts; Markdown downloads remain linked from those pages.
`thanks` and `404` are excluded. No feedback service or deployment configuration changed.

`npm run build` and focused built-page, store/image, sitemap and safe JSON checks pass.
Preparation evidence is in [`docs/aeo-2026-10-23/`](docs/aeo-2026-10-23/).
Independent Gemini4ArgonHigh review approved the actual diff. [PR3](https://github.com/tom-murton/ship-a-game-site/pull/3) is live at main `4ef3570d3d0a68e95eb307440010c9520329a032`; matching Cloudflare build `df078642-2838-41cb-a7d0-a5a47a5a669e` succeeded. All9 checked HTML pages match reviewed bytes/canonical/schema/body facts and the sitemap lists8 routes, excluding thanks/404. Search Console submission shows Success with8 discovered pages. See [production receipt](docs/aeo-2026-10-23/production.json). No indexing, citation or recommendation gain claimed.
