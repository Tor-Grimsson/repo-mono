# ColumnBrowserOnPick — the picked file for a Finder-style breadcrumb

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserOnPick.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.97.2`

## Why it went there
The organism keeps its picked file internal; the crumb needs it. One `onPick` prop.

## What stays here
Bump on publish. `FileList.jsx` already passes `onPick` and renders the file as the last crumb.

## ✅ RETURNED — 2026-08-27 · kol-component 0.97.2

onPick(file | null) fires whenever the picked file changes — a file row click or ↑/↓ landing on a file → the object, a folder pick or an outside prefix change → null. Driven on the demo: click a file → its key, ArrowUp → the previous file, click a folder → null.

**Remainder here:** bump kol-component 0.97.2; the crumb wiring you already pass lights up

## ✅ RETURNED + DONE — 2026-08-27

DS shipped 0.97.2: `onPick` fires on every pick; the crumb wiring lights up. Here: bumped to 0.97.3.
