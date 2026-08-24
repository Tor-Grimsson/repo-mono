# DashboardIconCoverage — 7 dashboard icon names resolve nowhere

**Filed:** 2026-08-14 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/DashboardIconCoverage.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-14 — icons 0.16.0

## Why it went there

`dashboard-bookmark` · `dashboard-roadmap` · `dashboard-dual-opponent` ·
`stat-crown` · `stat-winner` · `stopwatch` · `trending` are absent from
`@kolkrabbi/kol-icons@0.15.0`. Nine call sites here warn and render nothing
(`routes/Metrics.jsx:336,379,382,392`,
`routes/workshop/DashboardComponents.jsx:314,382,399,416,490`).

This repo cannot pick replacement names safely — the real question is whether
the v1 set is meant to cover the dashboard vocabulary or whether
`registerIcons()` is the blessed permanent consumer path. That ruling is
kol-icons', and it decides which fix lands here.

**Re-file, not a new finding.** Raised 2026-07-15 as item 2.9 of
`docs/DS-CHANGES-2.0.md` — the pre-lobby batch ledger, never handed over,
retired 2026-08-14 (elder: `_tmp/2026-08-14-ds-changes-ledgers/`). Still firing
after icons 0.6.1 → 0.15.0; live-confirmed in the 2026-08-12 headless walk.

## What stays here

- **On ruling: adopt.** Either swap to the shipped names, or add the
  `registerIcons()` call at the app's icon boot.
- Nothing to retire — the names are already in use and simply render empty.

## Return — 🟢 2026-08-14

Ruling: **v1 grows** — 4 retired drawings promoted under plain names in
**icons 0.16.0** (`crown` · `trophy` · `stopwatch` · `users`); 3 names mapped,
not minted. **Remainder here:** bump icons ≥0.16.0 and swap the 9 call sites —
`stat-crown`→`crown` · `stat-winner`→`trophy` · `dashboard-dual-opponent`→`users` ·
`dashboard-bookmark`→`bookmark` · `dashboard-roadmap`→`roadmap` ·
`trending`→`trending-up`; `stopwatch` resolves as-is.
