# Playbook — kol-foundry separation

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`.

**Goal:** take the 17 reached kol-foundry files local into `apps/web/src/components/foundry/`, drop the package, render identical to baseline. Plan: `plans/2026-10-07-foundry-local-copy-scope.md`.

**Standing rules (non-negotiable):**
- Never touch the user's dev server on 5173 — measure on `vite preview` 5199, kill that PID after.
- Copy verbatim; no fixes during separation — the UI fixes come after, on the user's list.
- Anything removed goes to `_tmp/`, never `rm`.

---
## Entries

[15:55 GMT · 2026-10-09] · setup · playbook created
  what → initialised the live playbook   why → user go on the separation (/kol-goal)

[16:00 GMT · 2026-10-09] · T1 baseline · _tmp/2026-10-09-foundry-sep/base/
  what → built web at kol-foundry 0.12.0 into base-dist; captured 7 routes × 1440/390 (PNG + DOM signature)
  verify → second run: all 14 PNGs byte-identical ✓ · sig noise = generated Font_<ts> names + cursor particles only
  note → only console error is /_vercel/insights/script.js (absent off Vercel)

[16:01 GMT · 2026-10-09] · T2 copy · apps/web/src/components/foundry/
  what → 17 reached files copied verbatim from kol-foundry@0.12.0 src/ (paths kept, engine/ subfolder) + index.js with the 8 used exports

[16:01 GMT · 2026-10-09] · T3 PairingCard · components/foundry/PairingCard.jsx:41
  before → .kol-pairing-card (kol-theme kol-components-foundry.css:291)
  after → inline Tailwind, same color-mix srgb values; v4 hover: carries the (hover: hover) guard

[16:01 GMT · 2026-10-09] · T4 rewire · TypefacePage.jsx:3 · FoundryOtherTypefaces.jsx:2 · FoundryTypefaces.jsx:3
  what → '@kolkrabbi/kol-foundry' → local folder

[16:01 GMT · 2026-10-09] · T5 unwire · package.json · index.css:19 · vite.config.js:22
  what → dependency, @source, optimizeDeps exclude removed; pnpm install
  verify → lockfile kol-foundry ×0 ✓ · pnpm why kol-component = 1 version ✓

[16:02 GMT · 2026-10-09] · T6 verify · _tmp/2026-10-09-foundry-sep/after/
  what → rebuilt without the package, same 14 captures
  verify → build ✓ · 14/14 PNGs byte-identical to baseline ✓ · DOM sig: only the PairingCard class string + cursor particles ✓ · PairingCard rest + hover computed styles identical ✓ · 5199 released ✓

[16:02 GMT · 2026-10-09] · T7 records · ARCHITECTURE.md §9 · docs/INDEX.md:31 · plan State line
  what → the foundry is local by ruling; no tickets for it

──────────── MILESTONE: foundry separation ──────────── [16:02]
  changed: 6 files + 18 new (components/foundry/) · quarantined: 0 · build ✓
  log: pending /log-work
