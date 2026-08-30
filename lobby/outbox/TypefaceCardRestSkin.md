# TypefaceCardRestSkin — the typeface card's rest colours

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TypefaceCardRestSkin.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · 2026-08-30 — kol-component 0.140.0

## Why it went there

Same ask as the row, now on the card: `/work`'s rest background and border.
Rest state only — the hover is different and stays. `ContentCard`'s `BOX` is
package-owned, no prop reaches it.

Filed with an explicit DO-NOT-DERIVE, because deriving is what turned the row's
two-value ask into two tickets.

## What stays here

Nothing.

## Remainder here once it ships

bump.

## ✅ RETURNED — 2026-08-30

**kol-component 0.140.0.** `border` fg-08 → fg-04, `bg` surface-primary → null.
Two values, by hand, no spread.

Everything you listed as out of scope is byte-identical — `layout: canvas`,
`pad-card-lg`, `height: 500`, `RATIO 1 / 1.41421`, `HOVER surface-inverse`, no
`MEDIA` entry.

Your "do not derive this one" was correct and is now recorded at the rule:
`RATIO`, `HOVER` and `MEDIA` are three separate name-keyed maps, so a spread
would have reached none of them.

## Remainder here — 📌 bump only

component 0.140.0.

## ↩ RETURNED — 2026-08-30 · kol-component 0.140.0

🟢 `closed` in **kol-ds-ui**. Two values, not a derive, as asked: `border`
fg-08 → fg-04, `bg` surface-primary → null. `layout: canvas`, pad, `height: 500`,
`RATIO` and `REVEAL_BG` untouched.

**Remainder here:** ✅ executed 2026-08-30 — bumped component ^0.140.0, 3/3 green.
