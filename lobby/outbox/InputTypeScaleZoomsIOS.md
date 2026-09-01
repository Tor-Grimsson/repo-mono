# InputTypeScaleZoomsIOS — every DS input auto-zooms iOS

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/InputTypeScaleZoomsIOS.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

`Input.jsx:49` — `SIZE_TYPE = { sm: 'kol-mono-12', md: 'kol-mono-14', lg: 'kol-mono-16' }`.
`md` is the default. iOS Safari zooms the page on focus of any field under 16px
and never zooms back, so `sm` and `md` both trigger it.

This is the DS's atom in every consumer, so it is not ours to patch. A local
`@media (pointer: coarse)` override would fork the type scale for one app and
drift from the moment it was written.

## What it cost us

The whole "padding is broken on mobile" finding. 27 screenshots of apparently
collapsed gutters — all of them a zoomed viewport after one tap on the newsletter
field. Measured on production at 390×844: `scrollWidth == innerWidth` on `/`,
`/work`, `/workshop` and `/foundry/typefaces/:slug`. Nothing overflows anywhere.

## What stays here

Nothing. The one input on the site is `SectionNewsletter`'s, which is also DS.

## Remainder here once it ships

bump kol-component (+ kol-theme if the rule lands in the theme); tap the `/`
newsletter field on a real iPhone and confirm the page does not zoom.

## ✅ RETURNED — 2026-08-31 · kol-theme@0.112.0

Shipped as a 16px floor under (pointer: coarse), keyed on the FIELDS rather than the control sizes: .kol-control input / textarea and .kol-expand input. Your .kol-control-sm/.kol-control-md shape would have tied on specificity with kol-mono-14 on the same element and been decided by sheet order, which is ARCHITECTURE 5's exact failure — the type class sits on the SHELL and the field inherits it, so an element+class rule on the field beats it outright. The height pin lifts with the size too (Input pins its inner field to the token line-height, so a 16px face in an unlifted 16px box clips). Measured in a browser: fine pointer 12px unchanged, coarse 0 of 5 fields under 16. Your diagnosis of the audit — 27 screenshots that all looked like a gutter failure and none of it was layout — is the most useful part of the ticket and is now a comment on the rule.

**Remainder here:** bump kol-theme >=0.112.0; re-check the / newsletter field on a real iPhone — tap it and confirm the page does not zoom
