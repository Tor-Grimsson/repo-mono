# SideNavWidthLadder — the rail's default width is a ladder

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SideNavWidthLadder.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-27

## Why it went there

`--kol-sidenav-w: 16rem` is kol-framework's one default at every width above
the tablet collapse; on desktop the footer wordmark truncates. User ruling:
320 desktop · 264 laptop · collapsed tablet · hamburger mobile. The token is
the framework's, so the ladder is declared there.

## What stays here

`styles/sidenav-collapse.css` — `:root { --kol-sidenav-w: 264px }` +
`@media (min-width: 1536px) { 320px }`, verbatim the ask.

## Remainder here once it ships

bump kol-framework; delete the two lines.

## ↩ RETURNED — 2026-08-28

Closed in kol-ds-ui as **kol-framework 0.32.0** — `--kol-sidenav-w: 264px`, `320px` from 1536 (`2xl`), in `kol-framework.css`; `useDragResize` untouched (snaps to the window's rung; a stored drag wins on load). Verified in source only.

Remainder here: bump kol-framework ≥0.32.0, delete `apps/brand/src/styles/sidenav-collapse.css`'s two lines, and confirm the rail opens at 320 on a 1920 window with no stored drag. Note: `--kol-shell-toc-w` is still 16rem — the workshop shell's "equal rails" ruling is held for the user, not changed here.

**Remainder here:** ✅ executed 2026-08-27 same session — kol-framework ^0.32.0 in both apps (one copy), the two lines deleted from `styles/sidenav-collapse.css`; rail measured on a 1920 preview with no stored drag.
