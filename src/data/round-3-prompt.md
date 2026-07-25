# SHIP A GAME: Round 3: Tell the Story

> **Operator fills in before starting:**
> - Run folder: `runs/<id>` (the game project, logs and reports)
> - Website repo: `<path to the benchmark website repo>`
> - Live App Store URL: `<required https://apps.apple.com/... URL>`
> - Live site URL: `<benchmark-site-url>`

You built this game in round one and reviewed it in round two. Round three measures whether you can turn the evidence into a short, candid case study that somebody might actually read.

The logs are the audit trail. **Do not reproduce them in prose.**

## Read first

Read the website's `content/games/README.md`, then the primary evidence in the run folder:

- `GAME_DESIGN.md`
- `DECISION_LOG.md` and `DECISION_LOG_R2.md`
- `INTERVENTION_LOG.md` and `INTERVENTION_LOG_R2.md`
- `FINAL_REPORT.md`, `CRITIQUE.md` and `IMPROVEMENT_REPORT.md`
- `PLAYTEST_LOG.md`
- `ASSET_LICENSES.md`
- the screenshots and enough of the game code to check technical claims

Check the live App Store state rather than copying an old status from a report.

## Write the article people see

Add one MDX article using the website's existing per-game content format.

The main article must be **600–900 words**, excluding the evidence appendix. Use no more than four `h2` sections. The page already shows the scorecard, App Store status, price and playtest verdict, so do not repeat every field in the opening.

Build the article around **one strong story**: the most revealing failure, surprise or decision from the run. Everything else should support that story.

Cover these points without turning them into six matching sections:

1. Explain the game and its hook in plain language.
2. Give only the research, engine and asset choices needed to understand why the build took this shape.
3. Spend most of the article on what went wrong, what round two changed and what remains weak.
4. State where human help was needed and whether it supplied access, direction, a fix or a rescue.
5. Include the two-person fun check and distinguish it from broader reception.
6. End with a clear verdict on what this run proves and what it does not.

Write in the first person only if the same model identity genuinely remained in place. If the harness switched models, name each model and use a neutral editorial voice rather than pretending there was one continuous “I”.

## Put the audit material at the bottom

After the main article, add:

```mdx
<details className="report-appendix">
  <summary>Full run notes and evidence</summary>

  ...
</details>
```

Use the collapsed appendix for:

- the full round-by-round scores and intervention counts;
- test counts and other verification evidence;
- every human intervention and the reason for it;
- model or harness changes;
- App Store submission evidence;
- known limitations, missing logs and provenance gaps;
- time and cost only when the source evidence supports them.

The appendix can be detailed. It must not introduce claims that are absent from the primary evidence.

## Editorial rules

- Truth beats smoothness. Never invent a detail, quote, metric or motive.
- Do not soften failures or hide retries.
- Prefer short paragraphs and specific facts.
- Cut throat-clearing, exhaustive chronology, repeated score explanations and tidy “lesson learned” endings.
- Do not use generic AI phrases, fake-profound closing lines or a rhetorical question as the final sentence.
- A first draft is not done. Remove repeated sentence patterns, inflated language and unnecessary em dashes before publishing.
- If the model identity changed, treat that as benchmark evidence rather than a footnote.
- Do not fill independent quality or reception scores yourself.

## Verify and finish

Recount intervention rows from the primary logs. Do not trust tally lines or existing website values without checking them.

Create `INTERVENTION_LOG_R3.md` even if round three needed no help. Fill the round-three score only after the article and appendix are complete.

Run the website build and inspect the rendered page. Confirm that:

- the main article is within 600–900 words;
- the evidence appendix is collapsed by default and readable when opened;
- screenshots and links work;
- the game is live on the App Store;
- the article is faithful to the source material.

The scored round ends when that work is complete. An independent editor may later shorten or reframe the public copy without changing the recorded round-three intervention score, but must not alter the underlying facts.
