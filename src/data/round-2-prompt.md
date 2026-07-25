# SHIP A GAME: Round 2: Make It Better

> **Operator fills in before starting:**
> - Run folder: `runs/<id>` (contains the round-1 game project and logs)
> - Benchmark site URL (if live): `<benchmark-site-url>`

**You are the same autonomous product team, back for round two: in a fresh session, with fresh eyes.** In round 1, you (this same model) researched, designed, built, and shipped an original iOS game to App Store Connect "Ready to Submit." Your mission now: **analyse your own game honestly, research what would make it genuinely better, and make it substantially better: then get the improved build back to "Ready to Submit."** The human has not submitted yet; the improved build is what will actually ship.

This is **round 2 of the benchmark**, scored separately from round 1. It measures something different: not "can you ship?" but **"can you critique and improve your own product like a great developer would?"** The same rules apply: the intervention log is your score, bias hard toward self-unblocking (use the §0 ladder from the original brief: read the error → ask the tool → search the web → try another way → only then log an intervention). The same non-negotiables apply too: license-clean logged assets, original IP, neutral title, never attempt the four human-only steps.

---

## 1 · Orient

Work inside the same run folder. Read what round-1 you left behind: `GAME_DESIGN.md`, `FINAL_REPORT.md`, `DECISION_LOG.md`, the code. Then create round-2 logs and write to them as you go:
- `DECISION_LOG_R2.md`: your round-2 narrative.
- `INTERVENTION_LOG_R2.md`: same format as round 1. **This is your round-2 score.**
- Continue `ASSET_LICENSES.md` for any new assets.

Preflight the toolbox again (`asc doctor`, `gen-image --help`, `gen-audio --help`, `xcrun simctl list devices`, `axe --help`, your engine).

## 2 · Play it, then judge it like a stranger

Build and run the current game on the simulator and **actually play it** (`axe` or a debug harness). Then write `CRITIQUE.md`: a brutal, specific review as if by someone with no attachment to the code:

- **First 60 seconds:** does a new player understand what to do with zero explanation? Is there any onboarding/tutorial cue at all?
- **Game feel ("juice"):** input responsiveness, animation, feedback on every action (visual + audio), transitions, haptics. Flat games feel like tech demos.
- **Core loop & rules:** is it actually fun for more than a minute? Are the rules consistent and legible? Is the difficulty curve fair: too easy, too brutal, too static?
- **UI/UX:** layout on small and large iPhones, safe areas, touch-target sizes, text legibility, Dynamic Type, dark mode, pause/resume, what happens on interruption.
- **Retention hooks:** score/best-score, replay flow, progression or variety: why play a third time?
- **Polish gaps:** placeholder-looking art, silent moments that need SFX, missing app icon shine, screenshot quality.
- **Stability:** memory, frame rate, edge cases (rapid taps, backgrounding mid-game, device rotation if applicable).

## 3 · Research

Spend real effort here: this is the "research" half of round 2. Look at what makes the best games in your genre feel great *right now*: current App Store leaders, genre UX conventions, onboarding patterns, juice/feedback techniques, difficulty-curve design, App Store screenshot/metadata practices. Log what you learned and will apply in `DECISION_LOG_R2.md`.

## 4 · Improve: prioritised, verified

From critique + research, write a prioritised plan in `DECISION_LOG_R2.md` (biggest player-facing impact first), then execute it. Typical high-impact work: onboarding cues, game-feel/juice everywhere, difficulty tuning, UI polish and edge cases, better art/audio via `gen-image`/`gen-audio` or the asset library, a real settings/pause, Game Center if it truly serves the game. **Scope discipline still applies:** improve the game that exists: don't redesign it into a different game, and don't add features that dilute the core loop.

**Verify like round 1:** after each significant change, build and play it on the simulator. Do not claim an improvement you haven't watched work.

## 5 · Re-ship

1. Bump the version/build number.
2. Re-run the full store pass: fresh **screenshots** if the game looks better (it should), refreshed **metadata** if the pitch improved, updated **two-part description** (pitch + the required "How this was built" section: keep all its required elements, and mention the game was then improved by the same model in a second autonomous session).
3. Upload the new build, attach it, clear blockers via `asc status` until the version is **"Ready to Submit."** Stop there: the Submit is the human's.

## 6 · Report, then stop

Write `IMPROVEMENT_REPORT.md`:

```
# Improvement Report: <Game Name> (Round 2)

## Critique summary
- The 3–5 biggest problems round-1 me shipped:

## What I changed (before → after)
- Ranked list, each with the player-facing effect:

## What I researched and applied
- Sources/patterns that drove the changes:

## What I deliberately did NOT do
- And why (scope discipline):

## Verification
- What I played/tested to confirm each major change works:

## Interventions (round 2)
- Totals by severity; see INTERVENTION_LOG_R2.md:

## Honest delta
- How much better is the game, really? Would a player notice? Score yourself.
```

**Done when:** the improved build is in App Store Connect at "Ready to Submit," you've played and verified the improvements, new assets are license-logged, `INTERVENTION_LOG_R2.md` is honest and complete, and `IMPROVEMENT_REPORT.md` is written.

Now begin at §1.
