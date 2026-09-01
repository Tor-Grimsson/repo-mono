# OverlayScrimBlur — drop the backdrop blur from the overlay scrim

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/OverlayScrimBlur.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

`.kol-overlay-scrim` carries `backdrop-filter: blur(1px)`
(`kol-components-molecules.css:856`). The user does not want it. Theme chrome, so
not ours to override.

## What stays here

Nothing.

## Remainder here once it ships

bump; nothing local to remove.

## ✅ RETURNED — 2026-09-01 · kol-theme@0.117.0

Removed backdrop-filter: blur(1px) from .kol-overlay-scrim; the 60% tint stays. The class is shared by three call sites (search overlay, drawer backdrop, FieldRow's close disc) and the blur was load-bearing in none of them — all three lose it together. Panel comment updated to match.

**Remainder here:** bump kol-theme@0.117.0; nothing local to remove

✅ **Remainder executed 2026-09-01 same session:** theme 0.117.0 in web+brand; measured under iPhone 13 emulation — scrim `backdrop-filter: none`.
