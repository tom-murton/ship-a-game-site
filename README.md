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

The form at `/feedback` uses Netlify Forms. It deliberately has no database, server
function or public submission list. Read submissions in the Netlify dashboard under
**Forms → benchmark-feedback**.

## Deployment

The canonical site deploys to its existing Vercel project. Netlify is deliberately
kept as a frozen feedback endpoint because Netlify Forms are free but every production
deploy consumes 15 credits. The GitHub webhook and deploy key for Netlify have been
removed, so ordinary pushes cannot spend Netlify credits.

- Vercel project: `ship-a-game`
- Vercel project ID: `prj_hb5UDbo3qdA61qw25T6ASrjUgkKj`
- Production domain: `https://shipagame.weevolve.app`
- Netlify feedback endpoint: `https://ship-a-game.netlify.app/feedback`
- Netlify project ID: `a37e7c95-c0b4-4369-aa9f-823f0cd1a85f`

`vercel.json` redirects `/feedback` and `/thanks` to the frozen Netlify deployment.
Do not reconnect this repository to Netlify or run `netlify deploy --prod` for routine
content changes.
