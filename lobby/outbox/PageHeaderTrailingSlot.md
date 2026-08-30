# PageHeaderTrailingSlot — no seam for a control on the header row

**Filed:** 2026-08-28 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/PageHeaderTrailingSlot.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-28

## Why it went there

`/icons` needed the size control on the subtitle's baseline, right — r2b2's
header. `PageHeader` is a closed flex column with an inline `marginBottom: 40`
and no trailing slot, and flexbox only exposes a column's FIRST baseline, so
wrapping it aligns to the `h1`. The only way through was to take the subtitle
out of the component.

## What stays here

`pages/IconsGallery.jsx` — the bare `<p className="text-oq-64 kol-mono-14">`
lede and its own baseline row; `styles/controls-tone.css` — the
`header { margin-bottom: 0 !important }` rule and the 800px subtitle measure.

## Remainder here once it ships

bump; pass the control cluster to `PageHeader` as `actions`, give the lede back
to the component with its measure prop, delete the bare `<p>`, the `!important`
margin rule and the `max-width` rule.

## ↩ RETURNED — 2026-08-28

Closed in kol-ds-ui as **kol-shell 0.15.0**. Verified in source only.

Remainder here: bump kol-shell ≥0.15.0; pass the cluster as `actions` and the measure as `subtitleMaxWidth`; delete the bare `<p>`, the `!important` margin rule and the `max-width` rule.

## ↩ RETURNED — 2026-08-28 · kol-shell 0.15.0

🟢 `closed` in **kol-ds-ui**. `<PageHeader actions={…} subtitleMaxWidth="…">` —
the cluster shares an `items-baseline` row with the lede, so it lands on the
subtitle's FIRST baseline (the title's when there is no subtitle); the bottom
rhythm is `--kol-page-header-mb` (40px default) instead of an inline literal.

**Remainder here:** ✅ executed 2026-08-28 same session — bumped shell ^0.15.0;
the lede is back inside `PageHeader` with `subtitleMaxWidth="800px"` and the
control cluster passed as `actions`; the bare `<p>`, its baseline row, the
`!important` margin rule and the `max-width` rule are all gone. **`styles/controls-tone.css`
is now empty of purpose and retired to `_tmp/2026-08-28-icons-controls-tone/`,
its `@import` removed from `index.css`** — the page carries zero local CSS again.
