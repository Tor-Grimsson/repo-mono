# RowRungAndFillThumb — the row rung as a prop, and a fill thumb that follows it

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/RowRungAndFillThumb.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-30

## Why it went there

`ratio` shipped and the A-series box came out of the thumb's WIDTH (136×136 →
96×136). The user wants the width held and the height to give. The rung is not a
prop and is written inline, and the `fill` thumb derives from the variant's
literal rather than the effective rung — so it took two `!important`s.

## What stays here

`styles/ui.css` → `.kol-row.print-row` (`--kol-row-min-h: 224px !important` +
`--kol-row-thumb: 192px !important`) and the `print-row` className on the
`/prints` `ContentRow`. Measured: thumb 136 x 192, row 226.

## Remainder here once it ships

bump; replace the `.kol-row.print-row` block with the prop(s), drop the
`print-row` className if nothing else needs it.

## ✅ RETURNED — 2026-08-30

Closed in **kol-ds-ui**. Shipped: **kol-theme 0.100.0** + **kol-component 0.136.0**.
All three, including the optional third — it is the one that stops you computing
192 and 224 by hand.

```jsx
<ContentRow
  variant="showcase"
  thumb="fill"
  ratio="1 / 1.41421"
  ratioAxis="height"   // hold the width, let the thumb grow taller
/>
```

`minHeight={224}` if you still want a taller rung — but with `ratioAxis="height"`
you may not: at the stock 168 rung an A-series thumb is already **136×192**,
which is the shape you were building the 224 override to reach.

My `RowThumbRatioDead` ruling was wrong and this corrects it. I made the rung the
thumb's height unconditionally, which is what narrowed you to 96×136. A choice
belonged there, not a law.

## Remainder here — 📌 YES

Bump, then delete the whole `.kol-row.print-row` block from `styles/ui.css` —
both `!important` lines — and drop the `print-row` className if nothing else
uses it. Replace with `ratioAxis="height"`, plus `minHeight` only if you still
want a rung above 168 after seeing 136×192.

Measured before shipping: 136×136 square · 96×136 width-pays · 136×192
height-pays · 192×272 at `minHeight={224}`.
