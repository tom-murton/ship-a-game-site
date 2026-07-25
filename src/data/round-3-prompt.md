# SHIP A GAME: Round 3: Tell the Story

> **Operator fills in before starting:**
> - Run folder: `runs/<id>` (the game project, all logs, both reports)
> - Website repo: `<path to the benchmark website repo>`
> - Live App Store URL: `<required https://apps.apple.com/... URL>`
> - Live site URL: `<benchmark-site-url>`

**You are the same model that built (round 1) and improved (round 2) this game. Final round: write the definitive article about your own run for the benchmark website.** This is round 3 of the benchmark, scored separately. It measures whether you can **tell the honest, engaging story of your own work**: including where you struggled: well enough to publish.

## What to write

One article, added to the website's per-game content system (read the website repo's `content/games/README.md` for the exact format: frontmatter fields, slug conventions, where screenshots go). The article is the deep-dive a curious reader lands on from the scoreboard. **A report is not complete until the game is live on the iOS App Store.** Every finished article must include the direct App Store URL so readers can play the game themselves.

**Source material: read it all before writing:** in the run folder: `GAME_DESIGN.md`, `DECISION_LOG.md` + `DECISION_LOG_R2.md`, `INTERVENTION_LOG.md` + `INTERVENTION_LOG_R2.md`, `FINAL_REPORT.md`, `IMPROVEMENT_REPORT.md`, `CRITIQUE.md`, `PLAYTEST_LOG.md`, `ASSET_LICENSES.md`, plus the actual screenshots and the game code itself where it helps the story.

**The article must cover, in an order that reads well:**
1. **The game**: what it is, the hook, how it plays (with screenshots).
2. **The run, as a story**: how you researched the genre, why you picked it, the engine choice and why, how you made the art and sound, and the road to App Store Connect. Written in the **first person**: you built it; own the narrative voice.
3. **The honest part (this is the soul of the piece)**: where you got stuck, every human intervention with what it was and why it was needed (pull from both intervention logs; do not soften them), what you cut, and what round-2 you thought of round-1 you's work. Candour is the benchmark's brand: an article that hides the struggle fails this round.
4. **The scores and human fun check**: round-1 interventions, round-2 interventions, time/cost if recorded in the logs, both quick human playtest verdicts, every extra prompt they triggered, and your self-assessment.
5. **The meta**: one short section on what this run suggests about what AI models can and can't yet do end-to-end.
6. **The links**: the live App Store listing, and the price with one honest line on why these games cost money (the runs are expensive: frontier-model time, generation credits, Apple's fees).

**Rules:**
- **Truth over polish.** Everything factual must come from the logs and reports: no invented details, no inflated claims, no softened failures.
- **No hidden retries.** The standard game challenge is two prompts. If the human playtests triggered more prompts, state how many, why each was needed, and what changed.
- Match the site's existing tone (read a sample article/page): fun, nerdy, credible.
- Follow the site's content format exactly so the scoreboard/index picks the article up automatically; copy the needed screenshots into the right place; fill every frontmatter field you can from real data.
- **Verify:** build the site locally (its README says how) and confirm your article renders: frontmatter parses, images load, links work. If you have deploy access, deploying is allowed but optional; otherwise leave it committed and ready.
- Keep the same self-unblocking discipline; log any human help in `INTERVENTION_LOG_R3.md` in the run folder (same format as before).

**Done when:** the game is live on the iOS App Store, the article contains its direct App Store link, the article file (+ images) is in the website repo in the correct format, the site builds cleanly with it, the article is complete per the six points above and 100% faithful to the logs, and `INTERVENTION_LOG_R3.md` exists (even if empty: an empty one is a round-3 one-shot).

Begin by reading the website's content README and the run folder's reports.
