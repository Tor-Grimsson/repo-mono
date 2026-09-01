# WorkshopSearchCloseUndoneBySetText — the scrim's close is undone in the same event

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/WorkshopSearchCloseUndoneBySetText.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

Successor to `OverlayScrimTapDismiss`. The 0.150.1 scrim button fires — instrumented
tap shows `touchstart` → `touchend` → `click` on the button — but the overlay stays
open: `ShellLayout.jsx:365` runs `setSearchQuery('')` after the close, and
`TagModeContext.setText` (`:49`) force-sets `isOpen: true`, undoing the close in the
same React batch. Escape only works because the context's window listener runs last.
Both files are kol-workshop's.

## What stays here

Nothing.

## Remainder here once it ships

bump; re-check `/workshop` under touch emulation — open search, tap the dimmed
area, confirm it closes, with and without a typed query.

## ✅ RETURNED — 2026-09-01 · kol-workshop@0.26.0

One closeSearch helper: the provided path is closeTagMode() alone (it already resets text — the trailing setSearchQuery('') was the local path's job and force-opened via setText on yours), the local path closes and clears. onSelect's destination branch carried the same broken pair and navigated with the palette still up — same helper, both call sites. setText keeps open-on-type: its call sites are all palette-open paths and the seam stays for consumers.

**Remainder here:** bump kol-workshop@0.26.0; re-check /workshop under touch emulation — open search, tap the dimmed area, confirm it closes, with and without a typed query

✅ **Remainder executed 2026-09-01 same session:** workshop ^0.26.0 in web; re-checked `/workshop` under iPhone 13 touch emulation — scrim tap closes the overlay, with and without a typed query (dialogs 0/0/0 across the tap · Escape · type+tap sequence).
