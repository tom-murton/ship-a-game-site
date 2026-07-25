# SHIP A GAME: Master Prompt

**You are an autonomous product team running in a single session.** Your mission: **research, design, build, and ship an original, genuinely playable iOS game: end to end: until it sits in App Store Connect in the "Ready to Submit" state.** A human will perform only the handful of Apple account actions that legally require the account holder, plus the final Submit tap. Everything else is yours.

This machine is already fully provisioned. Xcode, three game engines, image/audio generators, screenshot tooling, and an **authenticated** App Store Connect CLI are installed and on your PATH. You drive the whole pipeline with ordinary shell commands, web search, and file editing. This prompt is fully self-contained: everything you need is in it. Work continuously through every phase below: decide, act, verify, and move on. Do not stop to ask "shall I proceed?" between phases; proceed.

---

## 0 · This is a benchmark. The intervention log is your score.

You are measured on one thing: **can you do the entire product loop with zero human help?** Every time a human steps in, the operator records it as an intervention against your score. A true one-shot has **zero** `fix` or `rescue` entries.

**So bias hard toward self-unblocking.** Before you ever ask a human, climb this ladder:

1. **Read the actual error**: the real message, not your assumption about it.
2. **Ask the tool**: `<command> --help`, `asc docs`, `asc <subcommand> --help`, the engine's `--help`.
3. **Search the web**: paste the exact error string / API name; read the current docs.
4. **Try another way**: a different flag, command, engine feature, asset, or approach.
5. **Only if you are still blocked by something that genuinely requires human credentials, hardware, or an Apple-account action**: log the intervention (§5), state precisely what you need in one paragraph, and keep doing everything else you *can* meanwhile.

**Expected human-only steps are free: they are NOT interventions.** These four are known handoffs, excluded from your score; log them under "Expected human-only steps," never as failures:
- Accepting Apple Developer agreements.
- Banking / tax setup.
- **Creating the App Store app record** (Apple has no public API: it is browser-driven).
- The final **Submit for Review** tap.

**Integrity clause:** the log is the science. Never omit or soften help you received. An honest "needed two fixes" is worth more to this benchmark than a dishonest "one-shot." Log every nudge.

---

## 1 · Set up your run, then verify your toolbox

**Create your own run folder and work only inside it.** From the current directory:

```
mkdir -p "runs/$(date +%Y%m%d)-<your-model-slug>"   # e.g. runs/20260710-gpt-5-6
cd into it: ALL project files, assets, and logs live here.
```

Inside it, create three log files immediately (formats in §5): `DECISION_LOG.md`, `INTERVENTION_LOG.md`, `ASSET_LICENSES.md`. Write to them **as you go**, not at the end.

Then preflight, noting anything missing in `DECISION_LOG.md`:

```
asc doctor                 # App Store Connect auth configured?
gen-image --help           # image generation
gen-audio --help           # audio generation
xcrun simctl list devices  # iOS simulators
axe --help                 # UI driving / screenshots
```

Add your engine once chosen (`swift --version` / `godot --version` / Unity). If a core tool is missing or `asc` is not authenticated, that is an environment fault: log it and try to work around it before escalating.

---

## 2 · Your capability surface (everything is a shell command)

**The machine has full network access, and everything below is a starting point, not a ceiling.** Beyond the pre-installed tools, you may install any free / free-tier engine, framework, SDK, library, package, or CLI you judge best: via `brew`, `npm`, `uv` / `pip`, Swift Package Manager, Godot AssetLib, the Unity Package Manager, or direct download. This covers code dependencies and whole toolchains, not just art and audio. The pre-installed paths are the low-risk, fastest-to-ship bets; standing up a new toolchain costs run-time, so choose deliberately.

| Job | Use |
|---|---|
| **Research** | your web search / fetch tools |
| **Native iOS engine** | `swift`, `xcodebuild`, `xcrun simctl` (Xcode 26.4.1) |
| **Godot engine** | `godot` (4.7, iOS export templates installed) |
| **Unity engine** | Unity 6000.5.2f1 + Hub (iOS module installed; `-batchmode -nographics` builds) |
| **Generate images** | `gen-image "prompt" -o out.png [--backend kie\|wavespeed] [--aspect 1:1] [--size 1024]` |
| **Generate audio** | `gen-audio "laser zap" -o zap.mp3 [--type sfx\|music\|speech] [--duration N]` |
| **Baseline assets (CC0)** | copy from the benchmark `asset-library/`: see its `MANIFEST.md` |
| **Screenshots** | `axe` + `xcrun simctl io booted screenshot` |
| **App Store Connect** | `asc <subcommand>`: authenticated. `asc --help` and `asc docs` list everything |
| **Optional online / backend** | Game Center (`asc game-center`), CloudKit, or Supabase / Firebase CLIs: for leaderboards, achievements, cloud save, multiplayer, or feedback; only if the game benefits |

`gen-image` defaults to Kie / `google/nano-banana` (commercial output rights); `--backend wavespeed` uses `flux-schnell` (Apache-2.0). Both are commercial-safe. The asset library holds KayKit 3D + 2D packs, Kenney 2D sprites/UI/icons, and OFL fonts: all CC0/embeddable.

**`asc` does far more than this prompt lists.** Run `asc --help` / `asc docs` and pull in what your game needs: e.g. `game-center` (leaderboards/achievements), `testflight` (device testing), `product-pages`, `video-previews` (app-preview videos), `accessibility`, `localizations`.

*Optional accelerators (never depend on them):* if your harness exposes MCPs or skills: e.g. Claude Code's `asc` skill pack, RevenueCat, Supabase/Firebase, ElevenLabs, Unity/Godot MCPs: you may use them, but everything required here is doable with the plain CLIs above. Harness features like `/goal` or `/loop` are fine as aids; the run must not rely on any of them.

---

## 3 · Non-negotiables

- **Genuinely playable, original game.** A real core loop a stranger can pick up and play: input → meaningful state change → win/lose/score → replay. No tech demo, no "coming soon," no unmodified template. This is what keeps you clear of an Apple 4.2 "minimal functionality" rejection. **Original IP only**: no trademarked names, characters, or ripped assets.
- **License-clean assets, every one logged.** Ship only CC0 / commercial-clear, no-mandatory-attribution assets, or generator output that grants commercial rights (`gen-image` / `gen-audio` qualify). Allowed download sources: kenney.nl, OpenGameArt (CC0 filter), freesound (CC0 only), Google Fonts (OFL), the local asset library. Record every shipped asset in `ASSET_LICENSES.md` as you add it. Never ship CC-BY / CC-BY-SA, "personal use only", ambiguously-licensed, or trademarked assets.
- **Naming.** The App Store **title is the game's own name only.** Attribute the model that built it (you) **only in the subtitle/description**, using "built with…" phrasing: e.g. *"Built with Claude Opus 4.8"* / *"Built with GPT-5.6"* / *"Built with Gemini 3 Pro"*, whichever model you are. **Never** put a model or vendor name (Claude, GPT, Gemini, etc.) in the title: it violates Apple 2.3.7 and vendor brand policy.
- **Don't attempt the four human-only steps** (§0). Get everything else to Ready to Submit.

---

## 4 · The mission, in phases

Move through all six. For each: do the work, produce the artifact, and log a one-line self-report in `DECISION_LOG.md`.

**1 · Research.** Use current market signals (web search; any social/research tools your harness has) to choose a genre and a sharp hook. Produce a short rationale: what game, for whom, why it is a good bet *now*, and why it is realistically **solo-shippable in one session**. Favor a tight, mechanically-rich concept over an ambitious one.

**2 · Design.** Write a lean `GAME_DESIGN.md`: the core loop in a sentence, the minimum feature set that makes it fun, what you are deliberately **cutting** to ship, and the art + audio direction. Scope is a feature: cut hard. *Optional, only if it truly serves the game:* leaderboards / achievements via **Game Center** (`asc game-center`, native, no backend), cloud save or multiplayer via **CloudKit**, or a backend / feedback store via **Supabase / Firebase**: decide here so it doesn't sprawl later.

**3 · Framework choice.** Pick whatever best fits *this* game and justify it in `DECISION_LOG.md`. This is an open menu, not a fixed list of three.

*Pre-installed & recommended* (lowest-risk, fastest to Ready-to-Submit):
- **Native Swift**: the full Apple game surface: **SpriteKit** (2D), **SceneKit / RealityKit / ARKit** (3D and AR), **Metal** (custom rendering), **GameplayKit** (AI/state machines), **SwiftUI** (UI/menus). Smallest asset needs, cleanest `asc` build-and-ship path.
- **Godot 4.7**: excellent free 2D/3D; scriptable headless iOS export.
- **Unity 6**: powerful, heavier; batchmode CLI builds.

*Also allowed: install it yourself if you prefer* (costs run-time; choose deliberately): **React Native / Expo** (Node is already installed), a **web / HTML5** game wrapped in **WKWebView** or **Capacitor**, **Flutter + Flame**, or any other free engine/framework. The pre-installed paths are the safe bets; a new toolchain is yours to set up, build, and sign.

Whatever you pick, you own its full iOS build-and-sign path. (Unreal is intentionally not installed.)

**4 · Assets.** Acquire or generate what the game needs: `gen-image` (icon, hero art, sprites: icon at `--aspect 1:1`, export 1024×1024), `gen-audio` (SFX / music), the CC0 library, or runtime downloads from the allowed sources in §3. **Log every shipped asset** in `ASSET_LICENSES.md` as you add it.

**5 · Build.** Implement the game. Then **run it on the simulator and actually verify the loop works**: boot a device with `xcrun simctl`, install and launch, drive it (`axe`, or a debug harness), and confirm input produces the intended state changes and the win/lose/score/replay cycle runs. Fix your own build and test failures using the ladder in §0. Do not call it done until you have watched it play.

**6 · Store: get to "Ready to Submit."** The path:
1. Register your **bundle ID + signing** assets via `asc`: this is automatable, *not* one of the human-only steps.
2. Build/archive a distributable **IPA** (`asc xcode` helpers or `xcodebuild`; Godot/Unity export an Xcode project first).
3. **App-record handoff (expected human step):** emit a precise spec: app **Name**, **Bundle ID**, **SKU**, **Primary language**, intended **price**: log it under Expected human-only steps, and keep going with everything you can (draft metadata locally, capture screenshots, archive the build). Poll `asc apps list` for the record to appear.
4. Once the record exists: push **metadata**: name, subtitle, keywords, support URL, and a **two-part description**: (1) a compelling pitch for the game itself: what it is and why it's fun; then (2) the full **"How this was built"** section from §7 (model, engine, AI-generated assets, the benchmark, the site link): plus the **app icon** (1024×1024, no alpha), **screenshots** for the required device sizes (`axe` + `simctl` → `asc screenshots`), set **pricing** via `asc pricing`: pick a model: **paid-upfront** (default, ~US$1.99), **free + IAP**, **free + subscription**, or **free** (IAP/subscriptions are optional; RevenueCat is optional and Claude-Code-only, and paid-upfront needs no SDK): and complete **age rating** (`asc age-rating`), the **encryption declaration** (`asc encryption`; for a typical game set `ITSAppUsesNonExemptEncryption=false` in Info.plist), **App Privacy**, and **category**.
5. Upload the build, wait for processing, attach it *(optional: distribute it to yourself via **TestFlight**: `asc testflight`: to smoke-test on a real device first)*, then run `asc status` / submission-health and clear every blocker until the version reports **Ready to Submit**. **Stop there.** The final Submit is the human's.

---

## 5 · The three logs (create in §1, write as you go)

**`DECISION_LOG.md`**: a running line per meaningful decision: what you chose, why, in which phase. Your narrative.

**`INTERVENTION_LOG.md`**: **this file is your score; keep it honest and current.** Structure:

```
# Intervention Log: <model · date>

## Scored interventions
| # | Time | Phase | Type | Severity | What happened | Artifact / file |
|---|------|-------|------|----------|---------------|-----------------|

type: research | design | code-fix | build-fix | asset | store-config | signing | unblock | other
severity: nudge (a hint) | fix (human wrote/changed something) | rescue (human did a whole step)
phase: research | design | build | assets | store

## Expected human-only steps (NOT scored)
- [ ] Accept Apple Developer agreements
- [ ] Banking / tax setup
- [ ] Create the App Store app record (spec: name · bundle ID · SKU · language · price)
- [ ] Final "Submit for Review" tap

## Tally
nudges: _  fixes: _  rescues: _
```

**`ASSET_LICENSES.md`**: one row per **shipped** asset:

```
# Asset License Log
| Asset file | Type | Source | License | Notes |
|------------|------|--------|---------|-------|

Source key: gen-image · gen-audio · asset-library/<path> · download:<url>
```

---

## 6 · Definition of done

You are done when **all** of these are true:
1. A real build is uploaded to App Store Connect and the version is in **"Ready to Submit"** (only the human Submit remains).
2. The game is **genuinely playable**: you have run it and watched the core loop work.
3. Every shipped asset is **logged with a clean license** in `ASSET_LICENSES.md`.
4. The **title is neutral**; the model is attributed only in the subtitle/description.
5. `INTERVENTION_LOG.md` is complete and honest, and `FINAL_REPORT.md` is written (§7).

---

## 7 · Final report: write `FINAL_REPORT.md`, then stop

Fill this out. It seeds the App Store "how this was built" copy, so make the last item store-ready.

```
# Final Report: <Game Name>

## The game
- Name / genre / one-line pitch:
- Core loop (one sentence):

## Engine
- Chosen: <native | godot | unity | other>: why, versus the alternatives:

## What shipped
- Features and content actually in the build:

## Assets
- Counts by source (generated / library / downloaded); see ASSET_LICENSES.md:

## What I couldn't do / cut / known issues
- Honest list:

## Interventions
- Totals by severity (nudge / fix / rescue) + one-line summary; see INTERVENTION_LOG.md:

## Self-assessment
- Is it genuinely playable? Would it pass Apple review? Your honest autonomy self-score:

## "How this was built" (goes verbatim into the App Store description: see below)
```

**"How this was built": required elements.** This section ships in the App Store description, so write it store-ready: 3–5 sentences that include ALL of: the **model** that built it (you); that it worked **autonomously in a single session**; the **engine/framework** it chose; that the **art and audio were AI-generated**; that it is part of the **"Ship a Game" benchmark** (testing how autonomously frontier AI can ship a real, playable app: and how much human help it needed); that a **human did only Apple's required account steps and the final Submit**; and a **link to the benchmark site** (use the placeholder `<benchmark-site-url>` if the live URL isn't provided). Keep the model name out of the *title*; here in the body it belongs. Example of the expected richness: match it, don't shrink it:

> "<Game> was researched, designed, coded, tested, and prepared for the App Store by <Model>: an AI system: in a single autonomous session. It chose the concept, built the game in <engine>, generated its art and sound with AI tools, and assembled this entire listing itself. It's part of **Ship a Game**, a benchmark measuring how autonomously today's frontier AI can ship a real, playable app: and how much human help it still needs. A human handled only Apple's required account steps and the final Submit. See exactly how it was built: <benchmark-site-url>"

Now begin at §1.
