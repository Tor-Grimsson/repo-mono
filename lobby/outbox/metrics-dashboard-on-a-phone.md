# MetricsDashboard on a phone: rows that run off the edge, and 240 px cards holding three lines

**Filed:** 2026-10-09 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/metrics-dashboard-on-a-phone.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-09

## Why it went there

The metrics mobile pass (`.kol/llm-context/plans/2026-10-09-metrics-mobile.md`). The page frame was
fixed here (status bar `black-translucent` + safe-area padding); everything else is kol-dashboards'
layout and kol-theme's `grid-auto-rows: minmax(240px, auto)`.

## Stopgap here

None, on purpose.

## What stays here

On return: bump kol-dashboards (+ kol-theme if it moves — exact pin in all apps), render all four tabs
at 390, push. **Remainder here:** bump + re-measure.

## Answered — 2026-10-09

kol-ds-ui closed it as **kol-theme 0.172.0 + kol-dashboards 0.5.0**. Resolution: `~/dev/projects/kol-ds-ui/lobby/done/metrics-dashboard-on-a-phone.md`.

**Remainder here:** bump kol-theme ^0.172.0 + kol-dashboards ^0.5.0, check the four tabs at 390.

✅ **Executed 2026-10-09:** kol-theme 0.172.0 (exact, all four apps, one copy) · kol-dashboards ^0.5.0 (metrics). Measured on the built app at 390, iPhone 13 emulation: stat cards content-height (~120 px, were 240), tab row scrolls, timeline on its own line, build ref whole. Page heights: Site 4,351 → 3,929 · Project 2,402 → 1,545 · Infrastructure 2,413 → 2,033 · Sessions 664. Live on the user's push (metrics is Vercel Git-connected).

**Remainder here:** none
