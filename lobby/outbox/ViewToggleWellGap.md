# ViewToggleWellGap — the icon toggle's well padding breaks an even row gap

**Filed:** 2026-08-28 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ViewToggleWellGap.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-28

## Why it went there

`ViewToggle variant="icon"` carries `p-1`, so its box runs 4px past the last
visible chip. In the `/icons` control row `gap-4` renders 20px on the toggle's
side and 16px on the text's — the component's padding leaking into the
consumer's rhythm.

## What stays here

`pages/IconsGallery.jsx` — `-ml-1` on the vertical `Divider` beside the toggle.

## Remainder here once it ships

bump; delete the `-ml-1`.

## ↩ RETURNED — 2026-08-28

Closed in kol-ds-ui as **kol-component 0.121.1**. Verified in source only.

Remainder here: bump kol-component ≥0.121.1; delete the `-ml-1` on the divider.

## ↩ RETURNED — 2026-08-28 · kol-component 0.121.1

🟢 `closed` in **kol-ds-ui**. The icon well is inset (`-mx-1` beside the `p-1`),
so `gap-N` measures N to the chips on both sides.

**Remainder here:** ✅ executed 2026-08-28 same session — bumped component
^0.121.1, the `-ml-1` on the divider and its comment deleted.

⚠ Ceiling the DS flagged: the well now bleeds 4px past a row's outer edge when
the toggle is first or last in that row. On `/icons` the toggle is mid-row, so
nothing to see here — file it if a gutter ever reads wrong.
