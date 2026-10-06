# 🏁 Milestone: Sprint polish sealed — `sprint/ds-adoption` merge-ready

**Date:** 2026-07-29
**Agent:** Grim (Fable 5)
**Arc:** The post-milestone polish tail of the ds-adoption sprint (07-28 evening → 07-29): foundry hero geometry, navbar fade system, specimen text, /stack hero recolor, and the full-bleed root-cause fix. Seals the sprint branch as ready for main.
**Delivered:** All polish rulings applied and user-verified live; the last silent regression from the 07-15 theme quarantine (`full-bleed` no-op) found and fixed; remaining smalls parked with owners; **sprint MERGED to main `3e475ff` and deployed, Vercel green (2026-07-29)** — the ds-adoption sprint is live on kolkrabbi.io.

## What closed
- Typeface-page hero → done: spans to viewport top, offset folded into `FullBleedHero` height 560/768
- Navbar fade → done: bg + links one opacity unit, scroll-positioned (solid < 100vh, 300ms, no timer), verified live
- Font Preview specimen → done: full Icelandic passage vendored as web-owned `SAMPLE_TEXT` (engine's English default out)
- All Typefaces header icon → done: `library` → `book-open`
- /stack hero → done: colorful mannequin master on CDN as `mood-05` (400–1600w), `object-cover` center, theme-conditional `.stack-hero-overlay` (fg-inverse 32/80) in `styles/ui.css`
- `@utility full-bleed` no-op (dead `--spacing-4/5/6` since the 07-15 elder-theme quarantine) → FIXED with literals mirroring `.breakpoint-padding`; bleed restored on stack/home heroes + workshop embeds — the localhost-vs-prod margin mystery resolved
- **USER RULE pinned:** `index.css` is imports-only — component CSS lives in `styles/`
- Latent no-op `/NN` classes (2 sites) · navbar touch-at-top · deep-page reveal → parked at `plans/post-merge-smalls.md` (rulings, non-blocking)
- Pre-merge cleanup (`packages/chess-data` quarantine) → already DONE 2026-07-28
- Pre-merge sweep (2026-07-29, user go) → DONE: `apps/web/_quarantine/` (15 elder files) → `_tmp/web-quarantine-elder/`; deleted `apps/web/demo/` (dead FoundryDemo), dead twin `routes/foundry/components/TypefaceLibraryItem.jsx`, root strays `navbar-check.png` · `Info.plist` · 2 MIGRATION briefs. `.DS_Store`/`.playwright-mcp`/`_tmp` all gitignored, never rode. /metrics disconnected styles → parked at `plans/metrics-data-plan.md` tail
- Merge + deploy → DONE: gate green (turbo 4/4, 42s) · `--no-ff` to main `3e475ff` (709 files, +7,955/−41,884) · pushed · Vercel green. Detail cleanup + everything further = another session (parked: `plans/post-merge-smalls.md`; standing arcs in AGENT-CONTEXT Ongoing status)

## The arc (brief)
- Rode the tail of the two 07-28 milestones (foundry ownership, 5d audit) as a user-driven live-HMR polish barrage
- One root-cause detour: the /stack margin "bug" unmasked `full-bleed` as silently dead since the theme collapse — prod only looked right because it predated the quarantine
- Spans: `2026-07-29-foundry-hero-navbar-fade-stack-hero-overlay.md` → this capstone; DS wave untouched (no publishes needed — all consumer-side)
