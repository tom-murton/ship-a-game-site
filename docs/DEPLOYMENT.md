# Ship a Game deployment

## Architecture

- Cloudflare Worker: `ship-a-game-site`
- Static build: Astro output in `dist`
- Worker entry point: `worker/index.js`
- Dynamic route: `POST /api/feedback` only
- Private storage: `ship-a-game-feedback-eu`, R2 jurisdiction `eu`
- R2 binding: `FEEDBACK_BUCKET`
- Production hostname: `shipagame.weevolve.app`

`assets.run_worker_first` is restricted to `/api/feedback`. All pages, images and
other assets are served directly by Workers Static Assets without invoking Worker
code. `_headers` and `_redirects` are copied from `public` into `dist` at build time.
The post-build script copies `index.html` to generated `dist/_root.html`; this avoids
Cloudflare's automatic slash redirects while preserving the current contract where
both slash and no-slash page URLs return `200`.

## Cloudflare account setup

R2 must be enabled by the account owner before the first full deployment if the
account requires billing acceptance or a payment method. Do not accept paid terms
without the owner's approval.

Create a private R2 bucket named `ship-a-game-feedback-eu` with the `eu`
jurisdiction. Do not enable public access, attach a public bucket domain or create an
R2 API token for the Worker: it uses the in-process binding declared in
`wrangler.jsonc`.

The Vercel Blob inventory at migration time contained zero objects, so there is no
historic feedback payload to copy. Keep the Vercel store intact through the rollback
window.

There is no automatic object-expiry rule. Feedback is retained only while it remains
useful for review or reply, then deleted manually. Introduce a lifecycle rule only
after an explicit retention period has been agreed.

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
`/thanks`. Verify the local test object and remove it before finishing the test.

## Deployment and verification

After the bucket exists:

```sh
npm run deploy
```

Before production cutover, deploy to and crawl the `workers.dev` URL with a temporary
`X-Robots-Tag: noindex, nofollow` header. Do not commit that preview-only header.
Exercise invalid fields, an oversized body, the honeypot, an R2 failure and one real
test submission. Verify that exactly one private object was written, then delete it.

The `weevolve.app` DNS zone is shared with WeEvolve and TachoClear. Follow the estate
migration runbook: move DNS authority while preserving the Vercel targets, then switch
the three hostnames individually. Attach `shipagame.weevolve.app` only after the static
site and feedback endpoint pass on Cloudflare preview.

## Logs and personal data

Workers Logs are enabled. The endpoint emits one structured error event containing
only an event name and error type. Do not add feedback messages, reply email addresses,
request bodies or stored object content to logs.

## Rollback

Until Cloudflare has been stable for at least 48 hours, keep Vercel project
`ship-a-game`, its production deployment, `api/feedback.js`, `vercel.json`, the
`@vercel/blob` dependency and the private Blob store intact.

For a hostname rollback, detach the Worker custom domain and restore the recorded
Vercel DNS target in Cloudflare DNS. A full Namecheap nameserver rollback is reserved
for failure of Cloudflare DNS authority itself.
