# PauseIconFilled — a filled pause at the play's weight

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/PauseIconFilled.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-icons@0.21.0`

## Why it went there
kol-icons `pause` is stroked (1.5px, round caps) next to a filled `play`; the ruled glyph is two filled 4×13.5 bars with the play's 0.75px corners — an icon-set change.

## What stays here
`PlayDisc` in `src/AudioTile.jsx` draws the bars inline. On publish: bump kol-icons, swap back to `<Icon name="pause">`.

## ✅ RETURNED — 2026-08-27 · kol-icons 0.21.0

playback/pause.svg replaced with the filled glyph verbatim — two bars at the play's weight and 0.75 radius, 5.25 → 18.75, fill currentColor, no stroke. The stroked one had no second home; quarantined at _tmp/2026-08-27-pause-stroked/. Verified in source only (no server run, by your rule).

**Remainder here:** bump kol-icons 0.21.0; drop the inline pause in PlayDisc — name 'pause' carries it

## ✅ RETURNED + DONE — 2026-08-27 · kol-icons 0.21.0

`playback/pause` is the filled glyph verbatim (stroked one quarantined DS-side). Here: bumped; `PlayDisc` is a plain `IconFrame` with `name="pause"` again, inline SVG gone.
