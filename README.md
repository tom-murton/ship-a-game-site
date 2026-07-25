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

The form at `/feedback` posts to a small Vercel Function. Each message is stored as a
private JSON object in the `ship-a-game-feedback` Vercel Blob store. Nothing is exposed
publicly or published automatically.

Read submissions in Vercel under **Storage → ship-a-game-feedback**. The function keeps
only the submitted message, optional reply email, category, source page and timestamp.

## Deployment

The canonical site deploys to its existing Vercel project through GitHub integration.
Pushes to `main` deploy to production; other branches and pull requests receive Vercel
previews.

- Vercel project: `ship-a-game`
- Vercel project ID: `prj_hb5UDbo3qdA61qw25T6ASrjUgkKj`
- Production domain: `https://shipagame.weevolve.app`
- Private feedback store: `ship-a-game-feedback`
- Private feedback store ID: `store_5SgK8zYtp9SfweV3`

Netlify is no longer part of the production path.
