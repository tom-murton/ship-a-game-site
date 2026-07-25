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

The public GitHub repository is connected to Netlify through a repository-scoped,
read-only deploy key and a GitHub push webhook. Pushes to `main` deploy production;
pull requests receive deploy previews. The Netlify GitHub App is not required.

- Netlify project: `ship-a-game`
- Netlify project ID: `a37e7c95-c0b4-4369-aa9f-823f0cd1a85f`
- Production domain: `https://shipagame.weevolve.app`
- DNS provider: Namecheap

Do not deploy this project to Vercel. The live games are paid products, so the
commercial benchmark belongs on Netlify rather than Vercel's Hobby plan.
