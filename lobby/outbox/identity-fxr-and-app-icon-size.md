# kol-icons `identity` gains `fxr`, and the KOL app icon's mark size is written down (60%)

**Filed:** 2026-10-09 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/identity-fxr-and-app-icon-size.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-09

## Why it went there

R2B2's touch icon (octopus at the 18×18 keyline, 75%) read crowded beside FXR's (60%). The user ruled
60%. The identity set and the icon docs are kol-ds-ui's, so FXR's mark and the size rule go there.

## Stopgap here

None needed — the consumer side is already done: `apps/media/public/touch-icons/` dark + light re-cut
to `translate(4.8 4.8) scale(0.72) translate(-2 -2)` (mark bbox 36–144 of 180), PNGs regenerated
(RGB), media deployed 2026-10-09. The 75% originals: `_tmp/2026-10-09-media-touch-icons-75/`.

## What stays here

Nothing on return — kol-website imports no identity icon for FXR. Close with `Remainder here: none`.

**Remainder here:** none

## Answered — 2026-10-09

kol-ds-ui closed it as **@kolkrabbi/kol-icons@0.36.0**. Resolution: `~/dev/projects/kol-ds-ui/lobby/done/identity-fxr-and-app-icon-size.md`.

**Remainder here:** none
