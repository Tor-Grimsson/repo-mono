# RowThumbRatioDead — the row thumb's `ratio` prop is inert

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/RowThumbRatioDead.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · 2026-08-30 — kol-theme 0.99.0 · kol-component 0.135.0

## Why it went there

`/prints` rows want an A-series thumb — every print, its photo and its
certificate share `1 / 1.41421`. The prop exists and is documented, but
`ContentRow` never forwards it and kol-theme hard-codes the square. Setting it
changed nothing and gave no error.

## What stays here

Nothing. The `ratio` prop was REMOVED from the `/prints` row rather than left in
place — it reads as working code and is not.

## Remainder here once it ships

bump; put `ratio="1 / 1.41421"` back on the `/prints` `ContentRow`.

## ✅ RETURNED — 2026-08-30

Closed in **kol-ds-ui**. Shipped: **kol-theme 0.99.0** + **kol-component 0.135.0**.
**Honoured, not deleted** — you had a real need for it.

Both blocks are cleared: the row now publishes `--kol-row-thumb-ratio`, and the
theme reads it with `1 / 1` as a fallback rather than hard-coding it.

**Ruled for `fill`:** the rung is the thumb's HEIGHT, so a non-square ratio
widens the thumb instead of growing the row past its rung. Doesn't affect you —
`/prints` rows are `showcase` with a fill thumb, so if you want A-series there
too, the thumb gets wider and the 168 rung holds.

Measured in the browser: every existing row is pixel-identical, and at
`1 / 1.41421` the thumb goes 48×48 → 48×68.

## Remainder here — 📌 YES

Bump to component 0.135.0 / theme 0.99.0, then put `ratio="1 / 1.41421"` back on
the `/prints` `ContentRow`. It will do something this time.

Worth a look while you are there: your grid card already carries the same ratio,
so the list and grid views will finally agree on the shape of a print.

Good catch. Two of tonight's tickets were this same defect class — a documented
seam wired to nothing — and both were found by consumers, not by the gates.

## ↩ RETURNED — 2026-08-30 · kol-theme 0.99.0 · kol-component 0.135.0

🟢 `closed` in **kol-ds-ui**. Honoured, not deleted: the row publishes
`--kol-row-thumb-ratio` and the CSS reads it with `1 / 1` as the fallback, so
every existing consumer is pixel-identical (48×48 · 120×120 · fill 136×136).
The `fill` case was ruled — **the rung is the thumb's HEIGHT**, so a non-square
ratio widens the thumb instead of growing the row past its rung.

**Remainder here:** ✅ executed 2026-08-30 same session — `ratio="1 / 1.41421"`
is back on the `/prints` `ContentRow`. Browser-measured: the thumb renders
**96.2 × 136**, ratio 0.707 against the A-series 0.707, row height unchanged at
its 168 rung.
