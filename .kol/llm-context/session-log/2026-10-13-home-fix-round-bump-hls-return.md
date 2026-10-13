# Session: Home fix round, bump, HLS start-level ticket returned

**Date:** 2026-10-13
**Agent:** Grim (Fable 5.1 / Opus 5.5)
**Summary:** KOL bump in all four apps, four stale ledger rows squared, the user's 10-item home/foundry/stack review rounded to one DS ticket + local edits; the ticket returned and was consumed the same evening.

## Changes Made

### Files Modified
- `apps/*/package.json` · lockfile — component ^0.255.0 · icons ^0.37.0 · shell ^0.63.0 · theme 0.173.0 (exact) · brand media-client ^0.5.0; one DS copy.
- `apps/web/src/hooks/useFeatureCards.js` — Collections card → `/stack` (was `/work?view=list`).
- `apps/web/src/components/sections/home/HomeHighlights.jsx` — `enableTilt={false}` on all 7 `TiltBento`.
- `apps/web/src/components/sections/home/HomeSignup.jsx` — `background="none"` (was `bg-fg-absolute-16`); affects `/` and `/stack`.
- `apps/web/src/routes/StackArticle.jsx` — TOC blurb "A condensed outline…" deleted.
- `apps/web/src/components/sections/foundry/InDevelopmentSection.jsx` — placeholder note "In progress".
- `apps/web/src/components/sections/home/HomeHero.jsx` — renders DS `BackgroundVideo` (`aria-hidden` passed); local `components/ui/HlsVideo.jsx` → `_tmp/2026-10-13-local-hlsvideo/`.
- `lobby/` — `BackgroundVideoStartsAtLowestRendition` filed + returned 🟢 (kol-component 0.255.0 `HLS_DEFAULTS`); `PageGutterOwnership` · `RowRungAndFillThumb` · `RowVariantNamesAndSpecs` squared 📌 → 🟢 none; `metrics-dashboard-on-the-app-hub` → ⚪.
- `playbook/2026-10-13-home-fix-round.md` — the journal.

### Ruled no-change
- Primary button hover in dark = the well (PrimaryHoverIsTheWell, 10-10). Left as is.
- Tilt banding = TiltBento's hover scrim over near-black video; tilt off should kill the shimmer. A ticket only if it survives.

## Current State

### Working
- All edits parse; one kol-component copy.

### Known Issues
- Nothing rendered or measured this session — the user validates live after a dev-server restart (+ `rm -rf node_modules/.vite`, theme moved).
- `HLS_DEFAULTS` is not exported from the kol-component index (only from the file).
- Monitor tile is a 35 MB mp4 in `public/img/dev/`, not HLS on the bucket.

## Next Steps
1. Eyeball `/`, `/stack`, `/stack/:slug`, `/foundry/typefaces` after restart.
2. Monitor video → HLS on B2, if wanted.
3. Brand pass (`plans/2026-10-09-brand-pass.md`).
