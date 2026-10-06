# Session: Package wave + the four anatomy adoptions + ListingCard spec round-trip

**Date:** 2026-08-15 (second session this date)
**Agent:** Grim
**Summary:** Every stale KOL package bumped (two waves); the four 08-15 receipt remainders executed via four parallel sub-agents (FeatureSplit · ListingCard · ArticleHeader · FeaturedCarousel — 8 files re-declared, 7 locals retired); the ArticleCardSizeSpec lobby entry ruled and closed same-day, spec filed to kol-ds-ui as ListingCardSpec, DS shipped kol-content 0.7.0 against it and the rename was adopted here within the hour; lobby at zero, stale 📌 rows squared; builds 3/3 green throughout.

## Changes Made

### Package waves (both apps unless noted)
- Wave 1: theme 0.42.0 (exact) · component ^0.43.0 · framework ^0.20.1 · chess ^0.6.0 (web) · content ^0.6.1 (web)
- Wave 2: content ^0.7.0 (web) · theme 0.42.2 (exact) · icons ^0.17.0 — icons' renamed nav glyphs verified unused here

### The four adoptions (receipt remainders, executed in parallel)
- **FeatureSplit** — HomeFoundry + StudioProcessCard re-declared (flip mapping corrected against source); FoundryFeatureSection retired. Deviations: HomeSignup → **NewsletterBand** (DS ships that exact band); **HomeAbout stays local** (GSAP pinned-clip expansion can't live in a fixed-aspect frame); ConnectCta now a 16-line binding on DS CtaGlobal
- **ListingCard** (was ArticleCard) — StackLatest + Stack on the package variants with type seams; ArticleCardHero/Mini retired; `readmore` unadopted (no such surface exists); second pass swapped the name to `ListingCard` on 0.7.0
- **ArticleHeader** — StackArticle on the package header; Sanity builders stay app-side feeding `authorImage`/`heroImageSrcSet`/`heroImageSizes`; local twin retired
- **FeaturedCarousel** — Studio + FoundryTypefaces on the embla organism (media descriptors, `navPosition="header"`, foundry title ramp via app-side `renderTitle`); FeaturedCarousel + CarouselNavigation retired, 3 call sites resolved
- All retirements → `_tmp/2026-08-15-anatomy-adoption/` (7 files)

### Lobby round-trip (ArticleCardSizeSpec → ListingCardSpec → 0.7.0)
- User rulings: presets cut to THREE (`readmore` dropped — a context rendering `mini`+`label`, not a size); geometry table written (120×120 confirmed, clamps 2/3/2, breakpoint swaps consumer-side, seams replace-only); scope WIDE (THE listing card); name **`ListingCard`** (aliases until next major)
- Entry closed 🟢 → `.kol/llm-context/lobby-archive/`; spec filed to kol-ds-ui with receipt; DS returned kol-content **0.7.0** same day (WorkCard deliberately NOT aliased — different card, folds next major); remainder executed here
- Stale 📌 ledger rows squared (RecordManager · SideNavGrabResize → 🟢 `none`, matching their receipts)

### Process
- GitHub issue filed on the user's go: anthropics/claude-code#86834 — show the resolved model per subagent in task rows (text-only, no transcript)
- Memory: bump-includes-remainders rule; no-Fable-subagents rule (explicit `model` on every spawn — the four adoption subs inherited the session model against the standing order)

## Current State

### Working
- Stack: theme **0.42.2** (exact) · component **^0.43.0** · content **^0.7.0** · framework **^0.20.1** · icons **^0.17.0** · chess **^0.6.0** · workshop ^0.22.0 · brand ^0.1.2
- All 08-15 receipts 🟢 remainder-executed; both lobbies' queues at zero for this repo's items; builds 3/3 green after every wave

### Known Issues
- **Eyeballs owed (user, next dev run):** FeatureSplit sections (kicker now authored-case, reveal staggers gone, heading steps), embla drag on Studio + typefaces carousels, ListingCard deltas (mini meta no longer uppercase, clamp 2), no-cover articles render NO hero block (was empty placeholder), workshop dashboard exhibit pages (still unexercised), gallery, intro loader
- Prior open rulings unchanged: monitor.mp4 CDN, 4 route-less dashboard cards, hygiene-audit tail, FoundryTypefaces weight table
- Everything since 08-09 undeployed

## Next Steps
1. Round 2 of the anatomy arc: MediaCard/MediaRow adoption census (tile-lookalikes: prints grid, library tiles, TypefaceLibraryItem, BentoCard)
2. User eyeball pass over the adopted surfaces, then deploy
