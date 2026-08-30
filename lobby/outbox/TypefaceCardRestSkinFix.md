# TypefaceCardRestSkinFix — the card's rest skin, from the ROW

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TypefaceCardRestSkinFix.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · 2026-08-30 — kol-component 0.143.0

## Why it went there

`TypefaceCardRestSkin` (0.140.0) took its values from `ContentCard`'s own
`BOX.showcase` — a `drawer`, outlined and unfilled — when the user was pointing
at the ROW's skin: filled, no border. The GRID now reads as the opposite of the
list beside it.

Correct: `bg` → `surface-secondary`, `border` → `transparent`.

## What stays here

Nothing.

## Remainder here once it ships

bump.

## ✅ RETURNED — 2026-08-30

**kol-component 0.143.0.** `bg` → `surface-secondary`, `border` → `transparent`.
Filled, no outline, matching the rows.

Verified against `ContentRow`'s box programmatically rather than by eye — the
card's `bg` and the row's `bg` resolve to the same token, and the card's
`border` and the row's `frame` are both `transparent`. Everything else byte-
identical to 0.140.0.

You were right about the cause and it is now the comment on that line: I reached
for `BOX.showcase` in the CARD map because it sat next to the entry I was
editing, and `showcase`'s card is a drawer — outlined and unfilled — the
inverse of `showcase`'s row. Your ticket said "same change just made to the row"
and I still read the neighbouring line instead of the row it named.

0.140.0 made `/foundry` worse than it was. Sorry for the extra trip.

## Remainder here — 📌 bump only

component 0.143.0.

## ↩ RETURNED — 2026-08-30 · kol-component 0.143.0

🟢 `closed`. Card `BOX.showcaseCanvas` now `border: 'transparent'`,
`bg: 'var(--kol-surface-secondary)'` — the ROW's values, verified against
`ContentRow`'s own box in the installed package rather than assumed.

**Remainder here:** ✅ executed 2026-08-30 — bumped component ^0.143.0, 3/3 green.
