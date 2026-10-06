# Session: Foundry skin parity — one two-value ask, six tickets

**Date:** 2026-08-30
**Agent:** Grim
**Summary:** `/foundry`'s rows and cards now wear `/work`'s and `/prints`' skin — filled surface, no outline at rest, hover adds only the border. The change itself was two values; getting there took six DS round-trips, every extra one caused by me scoping or referencing wrong. Continued from `2026-08-30-prints-keyboard-set-gutter-ownership.md`.

## Changes Made

### Files Modified
- `apps/{web,brand}/package.json` — component `^0.137.0 → ^0.143.0` · theme `0.110.0 → 0.111.0` · framework `^0.35.0 → ^0.36.0` · shell `^0.28.0 → ^0.30.0`
- `apps/web/src/styles/ui.css` — a pad/rung stopgap added and removed within the hour, once `TypefaceRowSkinCorrection` landed
- `lobby/` — six tickets, receipts, ledger rows and the arc's history line

### The six tickets, in order
1. **`TypefaceRowSkin`** → 0.138.0. Asked for the row's two rest colours; **I recommended collapsing `showcaseCanvas` into `showcase`** and the DS did. It carried `pad` 24→16 and `rung` 160→168 uninvited, and could not reach `ContentText`'s `FILL` map (keyed by variant NAME), so the two boxes agreed on every number and still disagreed about the vertical spread.
2. **`TypefaceRowSkinCorrection`** → 0.139.0. Undid the derive; `showcaseCanvas` keeps its own box and takes only `bg` + `frame`.
3. **`TypefaceCardRestSkin`** → 0.140.0. Same two values on the card — but I read them off `ContentCard`'s own `BOX.showcase`, which is a **`drawer`: outlined, unfilled**. Shipped every `/foundry` grid card as an outlined empty box, the opposite of its rows.
4. **`TypefaceRowHoverBg`** → 0.141.0. The leftover `hover` background wash on the row, which no earlier ticket had mentioned.
5. **`TypefaceCardRestSkinFix`** → 0.143.0. The card taking the **ROW's** values (`transparent` border, `surface-secondary` fill), verified against `ContentRow`'s box in the installed package.

## Current State

### Working
- `/foundry` list and grid match `/work` and `/prints`: `bg: surface-secondary`, `border/frame: transparent`, hover adds the border only
- Card verified field-by-field against the row's box, not assumed
- component 0.143.0 · theme 0.111.0 · framework 0.36.0 · shell 0.30.0, 3/3 builds green

### Known Issues
- Everything is source-and-build verified; the visuals owe the user's eyes
- The DS published ~15 times this session, most with no receipt to us

### Two laws this arc bought
- **When the ask is two values, the ticket says two values.** Recommending a restructure for a colour change is what produced tickets 1 and 2. `RATIO`, `REVEAL_BG`, `MEDIA` and `FILL` are all keyed by variant NAME — a spread in `BOX` cannot reach them, so deriving one box from another silently desyncs behaviour from appearance.
- **"Make X look like Y" means diff EVERY state, and read Y's OWN map.** Ticket 4 existed because I never checked hover. Tickets 3 and 5 existed because I read the card map when the user was pointing at a row — the two maps share variant names but not treatments: `showcase` is a filled row AND an outlined drawer card.

## Next Steps
1. **📌 CARRIED — the cards on the typeface SLUG pages (`/foundry/typefaces/:slug`) are still outlined, not filled.** Noted by the user 2026-08-30 as work for a next session. This arc fixed the LIBRARY grid + list (`/foundry`); the slug pages render their own cards and never came into scope. Same change as `TypefaceCardRestSkinFix`: grey fill (`surface-secondary`) instead of the outline, rest state only. Find what those cards actually are before filing — they may be a different variant or a kol-foundry-local component, and reading the wrong map is exactly what cost this arc two extra tickets.
2. Eyeball `/foundry` list and grid beside `/work` — the parity is measured in source only
2. `RowRungAndFillThumb`'s open ceiling: the inset `ViewToggle` well bleeds 4px past a row's outer edge when first or last
3. `/metrics`, `/workshop`, `/chess` stay outside the layout model by the user's ruling — do not surface them in layout audits
