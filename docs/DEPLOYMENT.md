# Ship a Game deployment

## Architecture

- Cloudflare Worker: `ship-a-game-site`
- Static build: Astro output in `dist`
- Worker entry point: `worker/index.js`
- Dynamic route: `POST /api/feedback` only
- Private storage: Neon project `ship-a-game-feedback`, table `public.feedback`
- Worker secret: `DATABASE_URL`
- Production hostname: `shipagame.weevolve.app`

`assets.run_worker_first` is restricted to `/api/feedback`. All pages, images and
other assets are served directly by Workers Static Assets without invoking Worker
code. `_headers` and `_redirects` are copied from `public` into `dist` at build time.
The post-build script copies `index.html` to generated `dist/_root.html`; this avoids
Cloudflare's automatic slash redirects while preserving the current contract where
both slash and no-slash page URLs return `200`.

## Feedback database setup

Use the existing Neon Free project `ship-a-game-feedback` (`autumn-pine-93042632`).
It is in `aws-us-west-2`, contains the existing `public.feedback` table and had one
archived test row at migration time. This records the existing data-location choice;
do not create a second project or move the row silently.

Set the project's connection string as the encrypted Cloudflare Worker secret
`DATABASE_URL`. Never put it in Git, build logs or a client-side environment variable.
The Worker uses Neon's HTTP driver for its single parameterised insert.

The Vercel Blob inventory at migration time contained zero objects, so there is no
historic Blob feedback payload to copy. Keep the Vercel store intact through the
rollback window. The existing Neon row remains in place.

Feedback is retained only while it remains useful for review or reply, then deleted
manually from Neon. Introduce automatic retention only after a period has been agreed.

## Build and local verification

```sh
npm ci
npm run types:cloudflare
npm run check
npm test
npm run build
npx wrangler deploy --dry-run
npm run dev:cloudflare
```

With `wrangler dev` running, verify:

```sh
curl -i http://localhost:8787/
curl -i http://localhost:8787/api/feedback
curl -i -X POST http://localhost:8787/api/feedback \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'kind=benchmark&message=Clearly+marked+local+test&pagePath=%2Ffeedback'
```

The GET must return `405` with `Allow: POST`; a valid POST must return `303` to
`/thanks`. Verify the test row in Neon and remove it before finishing the test.

## Deployment and verification

After `DATABASE_URL` is configured:

```sh
npm run deploy
```

Before production cutover, deploy to and crawl the `workers.dev` URL with a temporary
`X-Robots-Tag: noindex, nofollow` header. Do not commit that preview-only header.
Exercise invalid fields, an oversized body, the honeypot, a database failure and one
real test submission. Verify that exactly one private row was written, then delete it.

The `weevolve.app` DNS zone is shared with WeEvolve and TachoClear. Follow the estate
migration runbook: move DNS authority while preserving the Vercel targets, then switch
the three hostnames individually. Attach `shipagame.weevolve.app` only after the static
site and feedback endpoint pass on Cloudflare preview.

## Logs and personal data

Workers Logs are enabled. The endpoint emits one structured error event containing
only an event name and error type. Do not add feedback messages, reply email addresses,
request bodies or stored row content to logs.

## Rollback

Until Cloudflare has been stable for at least 48 hours, keep Vercel project
`ship-a-game`, its production deployment, `api/feedback.js`, `vercel.json`, the
`@vercel/blob` dependency and the private Blob store intact.

For a hostname rollback, detach the Worker custom domain and restore the recorded
Vercel DNS target in Cloudflare DNS. A full Namecheap nameserver rollback is reserved
for failure of Cloudflare DNS authority itself.
