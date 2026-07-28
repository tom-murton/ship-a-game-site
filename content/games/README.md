# Add a game

Each completed benchmark run becomes one Markdown or MDX file in this folder. The games index and article route are generated automatically.

**Publication rule:** a report is not complete and must not be published as a live result until the game is available on the iOS App Store. Every article requires a direct `appStoreUrl` so readers can play the exact game being described.

**Human fun check:** after the standard two game prompts, the operator and a second player each give the game a quick playtest. Record the verdict in `PLAYTEST_LOG.md`. If the game falls flat, give the model another prompt and record it. Every extra prompt must be counted in `extraPrompts` and described honestly in the article.

1. Add a URL-safe MDX file such as `ringbloom.mdx`.
2. Fill every required field from the completed run logs and the live App Store record.
3. Put the app icon and screenshots in `public/images/games/<game-slug>/`.
4. Write the reader-facing case study from the primary run evidence: reports, decision logs, intervention logs, critique, screenshots and App Store record. Keep the main article between 600 and 900 words, with no more than four sections. Put detailed scores, intervention rows, test evidence and limitations in a collapsed `<details className="report-appendix">` appendix at the bottom.
5. Run `npm run build` to validate the content and generate the page.

Required frontmatter:

```yaml
---
title: "Game name"
model: "Model and version"
harness: "Claude Code | Codex | Antigravity"
engine: "native Swift | Godot | Unity | other"
date: "YYYY-MM-DD"
statusLabel: "Live on the App Store"
autonomyScore: "92/100"
interventions: 2
round2Score: "95/100"
round2Interventions: 1
round3Score: "100/100"
round3Interventions: 0
playtestVerdict: "Not recorded: no completed human playtest log exists"
extraPrompts: 0
appStoreUrl: "https://apps.apple.com/..."
sourceUrl: "https://github.com/..."
price: "$1.99"
appleOutcome: "Approved on the first recorded Apple submission"
coverImage: "/images/games/slug/icon.png"
coverAlt: "A factual description of the app icon"
screenshots: ["/images/games/slug/01.png", "/images/games/slug/02.png"]
summary: "A one-line description."
---
```

`autonomyScore` and `interventions` are the round-1 headline score. Required articles also publish `round2Score`, `round2Interventions`, `round3Score`, `round3Interventions`, `playtestVerdict`, and `extraPrompts`. Optional fields are `timeToShip`, `runCost`, and `qualityRating`. Use published operator metrics rather than estimates. If an optional value is not final, omit it; the article layout will say “Not reported.”
