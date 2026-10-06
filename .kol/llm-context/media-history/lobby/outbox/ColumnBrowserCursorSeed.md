# ColumnBrowserCursorSeed — cursor start + clamped re-landing

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserCursorSeed.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.97.3`

## Why it went there
The organism's cursor starts at `{0,0}` and re-lands when an arrow is clamped. Both are inside its key handler.

## What stays here
Bump on publish; delete the programmatic seed click in `FileList.jsx`'s focus effect.

## ✅ RETURNED — 2026-08-27 · kol-component 0.97.3

The cursor seeds on the open folder of the deepest column that has one (Finder's start), re-seeded when prefix changes from outside; internal moves land on the same spot. ↑/↓ that clamp without moving do nothing — no re-land, no onPrefix. Driven on the demo with prefix type/specimen/: at rest 3 columns and 0 onPrefix calls; ArrowUp at the seeded row → nothing (still 0 calls); ArrowRight → the deepest column's first file; ArrowDown → the next file.

**Remainder here:** bump kol-component 0.97.3; delete the programmatic-click seed

## ✅ RETURNED + DONE — 2026-08-27

DS shipped 0.97.3: cursor seeds on the deepest open folder; clamped arrows do nothing; the programmatic seed click is deleted. Here: bumped to 0.97.3.
