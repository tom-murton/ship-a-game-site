# Ship a Game AI discovery verification - 23 October 2026

## Implemented

- `src/layouts/BaseLayout.astro`: WeEvolve Organization, WebSite and page graph; safe JSON serialization; optional structured facts for page consumers. Stable publisher identity is `https://weevolve.app/#publisher`.
- Canonical correction: the previous file-build normalization changed `.html` output to a trailing-slash canonical, although links and sitemap entries use clean bare routes and Astro config has `trailingSlash: never`. Both bare and slash forms already resolve through existing Cloudflare rewrites. Canonical and schema URLs now consistently use the clean bare route. No routing config changed.
- `src/pages/games/[...slug].astro`: Article linked through mainEntity to stable VideoGame identity, actual store link/name/cover/screenshots, and breadcrumbs. Benchmark build model(s) are subjects; no inferred human or model article author. Brinkball's documented round-two fallback remains an additional model subject. No fabricated article publication/modified date: frontmatter date remains the displayed release date only.
- `src/pages/index.astro`: CollectionPage/ItemList generated from actual report inventory and order.
- `public/sitemap.xml`: added the three already published HTML round prompt routes. Eight HTML destinations total; thanks/404 omitted; raw Markdown downloads remain discovery links on HTML prompt pages, not additional canonical pages.
- Existing README checkpoint updated; all report prose/frontmatter, metrics, prices, playtest records, social, backend/feedback, bindings/security and DNS untouched.

## Checks

- `npm run build`: successful; Astro check reports 0 errors/warnings/hints, 10 HTML pages generated plus Markdown downloads.
- Built HTMLParser/JSON validation: ten pages each have exactly one correct clean canonical and one parseable graph. Shared publisher/website/page identity and actual routes agree. Both reports have correct stable mainEntity links and breadcrumbs. Existing store links and cover images match frontmatter; all referenced local images exist. Homepage lists exactly the two published report URLs.
- Both MDX sources compare byte-for-byte with HEAD. No datePublished, dateModified, author, review, rating or price/offers field introduced.
- Sitemap XML parses and lists exactly the eight existing selected HTML routes; each has a built asset. Root rewrite `_root.html` matches index.html bytes.
- Actual BaseLayout serialization expression evaluated with a script-closing input: no literal `<` remains and JSON round-trips the original value.
- `xmllint --noout public/sitemap.xml` and `git diff --check`: pass.
- Detailed results: checks.json.

Build used a temporary symlink `node_modules` to the canonical repository's existing `/Users/tommurton/GitHub/ship-a-game-site/node_modules`; it was removed after checks. No install/dependency change, Worker integration test, database write or deployment. Independent Gemini4ArgonHigh review approved the actual diff; lead local browser checks passed. [PR3](https://github.com/tom-murton/ship-a-game-site/pull/3) is live at main `4ef3570d3d0a68e95eb307440010c9520329a032`; matching Cloudflare build `df078642-2838-41cb-a7d0-a5a47a5a669e` succeeded. All9 live HTML pages exactly match reviewed bytes/canonical/schema/body facts. Sitemap has8 routes; thanks/404 remain excluded. GSC submission shows Success with8 discovered pages. [Production receipt](production.json); no deployment pending. No measured citation/recommendation improvement is claimed.
