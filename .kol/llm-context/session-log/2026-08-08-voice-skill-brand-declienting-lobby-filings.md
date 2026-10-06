# Session: Voice skill + agent, brand de-clienting, three lobby filings, sidenav loads closed

**Date:** 2026-08-06 (logged 2026-08-08)
**Agent:** Grim (Fable 5)
**Summary:** Sidenav category disclosure made load-closed-always; three tickets filed (RecordManager + SideNavGrabResize → kol-ds-ui, tone-of-voice → dotfiles); the tone-of-voice skill + kol-voice-agent were then built, harness-verified and 🟢 closed the same session; the skill's first live audit exposed the brand book speaking as **Another Creation** (client-era residue), and on the user's order all four rendered surfaces were rewritten to Kolkrabbi copy drawn from kol-studio's canon prose.

## Changes Made

### Files Modified
- `apps/brand/src/components/framework/SideNav.jsx` — `openPages` no longer reads/writes `localStorage` (`kol-sidenav-open`); categories always load closed, disclosure survives navigation but never a reload. His read of the 08-01 "load collapsed" ruling: load means load.
- `apps/brand/src/pages/brand/About.jsx` — **re-authored from canon** (`kol-studio/data/studio/07-studio-about.md` + `08-studio-values-approach.md`): Kolkrabbi, founded 2019, Tór Grímsson; pillars now *Systematic not superficial · Grounded in structure · Foundations that endure*.
- `apps/brand/src/pages/brand/Tone.jsx` — Kolkrabbi's voice in the original cadence ("specifics over claims, systems over slogans"); title/label aligned to the Voice→Tone rename.
- `apps/brand/src/pages/Landing.jsx:38` — tagline → "A design studio rooted in craft and clarity." (verbatim from the canon hero section; replaced "A Central European atelier crafting timeless womenswear by hand").
- `apps/brand/src/components/styleguide/StationeryMocks.jsx:687` — gift-box caption → `{BRAND_INFO.identity.name}` (import already present).
- `lobby/INDEX.md` + `lobby/outbox/` ×3 — receipts for the three filings; tone-of-voice already returned 🟢.

### External (other repos, same session)
- **kol-ds-ui** `lobby/inbox/RecordManager.md` — Framer-CMS record surface: ⠿ drag-reorder table, status Tag-dropdown, slide-over panel on a new FieldRow molecule; 3 reference screenshots in `_assets/`.
- **kol-ds-ui** `lobby/inbox/SideNavGrabResize.md` — grab-edge resize + snap-collapse, prior art `kol-mirror/src/pages/MirrorPlayground.jsx#L21-L76`; two `--kol-sidenav-*` tokens to mint. Replaces the collapse Button he doesn't love.
- **dotfiles** `claude/skills/tone-of-voice/SKILL.md` + `claude/agents/kol-voice-agent.md` — built, harness-verified in-session (skill registered + run; agent listed in the roster), ticket 🟢 in `done/`.

## Current State

### Working
- Sidebar loads fully collapsed, zero categories open, every reload.
- Brand book speaks as Kolkrabbi on every rendered surface; grep for "Another Creation" hits only dead data.
- `/tone-of-voice` + `kol-voice-agent` live for every future session.

### Known Issues
- `brand/data/blog-data.js` · `shop-data.js` · `collections-data.js` — Another Creation content, **zero importers**, unrendered; quarantine candidates awaiting his word.
- **kol-theme 0.24.0 is coming**: kol-ds-ui's ledger says it deletes `.text-body` / `--kol-fg-body` with no fallback. npm still serves 0.19.0 (verified) — both apps pinned exact, nothing hits yet, but that wave needs eyes when it publishes.
- Voice pass has only covered About / Tone / Landing — the other 40 pages are unaudited.

## Next Steps
1. Quarantine the three dead AC data files on his word.
2. DS queue holds RecordManager + SideNavGrabResize for the DS agent.
3. Optional: voice-agent pass over the remaining brand-book pages.
4. Open rulings (his, unchanged): accent · editor presets · video posters · `Landing.jsx:35` uppercase · statics hoist.
