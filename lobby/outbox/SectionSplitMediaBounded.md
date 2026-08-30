# SectionSplitMediaBounded — the media half must take its size from the section

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionSplitMediaBounded.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.85.0; remainder executed here 2026-08-27

## Why it went there

Studio process split at `height="40"` looks like 60 and like nothing: the
square item is taller than any rung, so the min-height never bites — the
image sizes the card. Ask: the media half is bounded by the section's rung
(max-height = the rung; width follows the ratio inside it), so the four rungs
give four heights.

## Remainder here once it ships

bump; eyeball the Studio process split at 40 (and flip it to 60 once to see the difference)

## ✅ RETURNED — 2026-08-27 · kol-component@0.85.0

The media frame takes its size from the section: every rung publishes `--kol-section-h`, the split publishes its vertical padding as `--kol-section-py`, and the frame's height is `calc(rung − 2 × padding)` with its width following `ratio` (`w-auto`, capped at the column, centred). The section's min-height stays for text-heavy columns. Measured on the Section Set at 1000 tall (4/5 media, lg padding 128): `full` → section 1000, frame 595×744 · `80` → 800, 435×544 · `60` → 600, 275×344 · `40` → frame 115×144 (the section stood at 483 because the text column is taller than 400). Four rungs, four card heights. Note the lg padding is 128 each side, so at `40` the frame is 144 tall — the rung minus the padding is what you asked for; if a low rung wants less air, that is the padding's ticket. The split hero already bounds its half by the row; nothing changed there.

**Remainder here:** bump kol-component 0.85.0; Studio process split at `height="40"` now renders a 40vh card with the ProfileCard sized to it

✅ **Remainder executed 2026-08-27 same session:** component ^0.85.0 in both apps; Studio process split stays on `height="40"`, nothing else passed. Note from the return: at `40` the frame is the rung minus 2 × 128px lg padding (144px tall) — if that's too small, the padding is the next ticket. Eyeball is the user's.
