# ContentFiltersMobileGaps — the filter row's gaps are desktop values with no mobile rung

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentFiltersMobileGaps.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

`gap-6` + a `pr-4` title span (`:322`/`:335`) = 40px from title edge to divider at
390; `gap-16` on both facet rows (`:460-461`) = 64px between CATEGORY and YEAR. No
breakpoint variant on any of it. The organism is the DS's.

Note the `pr-4` is **ours** — the `ContentFiltersTitleGap` ticket put it there
2026-08-27 for the desktop balance. This is that ticket's other half.

## What stays here

Nothing. `/work` and `/stack` pass neither gap.

## Remainder here once it ships

bump; no consumer change expected. If the fix lands as a prop rather than a
breakpoint, `/work` and `/stack` are the two call sites.

## ✅ RETURNED — 2026-09-01 · kol-component@0.150.1

Mobile rungs on both. Title seam: gap-3 md:gap-6 + pr-2 md:pr-4 — keeps the exact frame-air balance the ContentFiltersTitleGap ruling wanted (12+8 glyph side, 12+8 title side) at half the spend; was 40px of a 390 viewport. Facet columns: gap-8 md:gap-16 on the outer row and the inner group row, kept equal as before. Breakpoint rungs, not props — /work and /stack pass nothing and keep passing nothing.

**Remainder here:** bump kol-component@0.150.1; no consumer change expected

✅ **Remainder executed 2026-09-01 same session:** component ^0.150.1; no consumer change — `/work` and `/stack` still pass nothing. Gap rungs are DS-side breakpoint values; Sanity CORS blocks a local look at 5180.
