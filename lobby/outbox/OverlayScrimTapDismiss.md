# OverlayScrimTapDismiss — tapping the scrim does not close the search overlay

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/OverlayScrimTapDismiss.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

`ShellSearchOverlay.jsx:137` wires `onClick={onClose}` on a scrim that measurably
covers the viewport, and a tap at (195,70) under touch emulation still leaves the
overlay open. Handler right, box right, tap never lands. The component is the DS's.

## What stays here

Nothing.

## Remainder here once it ships

bump; re-check `/workshop` on a phone — open search, tap the dimmed area, confirm
it closes.

## ✅ RETURNED — 2026-09-01 · kol-component@0.150.1

The scrim is a <button type=button aria-label="Close search">, not a div — iOS Safari does not bubble tap-clicks from non-interactive elements, so the div's onClick never fired on a phone. Fixes the aria-hidden-on-an-interactive-target half in the same move. Same line found and fixed in ShellDrawer's backdrop (the mobile drawer — the identical defect class).

**Remainder here:** bump kol-component@0.150.1; re-check /workshop on a phone — open search, tap the dimmed area, confirm it closes

⚠ **Re-check FAILED 2026-09-01 — successor filed.** The shipped button is present and fires (instrumented: `touchstart` → `touchend` → `click` all reach the scrim), but the overlay stays open: `ShellLayout.jsx:365` runs `setSearchQuery('')` after the close and `TagModeContext.setText` force-sets `isOpen: true`, undoing it in the same batch. Filed as `WorkshopSearchCloseUndoneBySetText` (kol-workshop). The bump itself executed: component ^0.150.1.
