# ColumnBrowserSeams — three seams the browse page needs so kol-r2b2 keeps no CSS

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserSeams.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-28 — `kol-component@0.119.0` + `kol-theme@0.81.0`

## Why it went there
All three are seams the organism does not expose: no autofocus, no stats toggle on the library page, and no semantic state class on a row — so the consumer focuses the DS's DOM from outside and hooks its selection rules on a Tailwind utility.

## What stays here
The mount-focus effect in `src/App.jsx`, and the override block in `src/index.css` (`.r2b2-library > p`, the row/selection rules). On publish: bump; delete both, leaving the imports, the body anchor and the media-checkbox rule.

## ↩ RETURNED — 2026-08-28

Closed in kol-ds-ui as **kol-component 0.119.0** (`ColumnBrowser autoFocus`, forwarded by `MediaLibraryBrowse`; `MediaLibraryLibrary stats={false}`; `is-selected` / `is-cursor` on the row) + **kol-theme 0.81.0** (the row fill in the theme on the state classes — hover/cursor fg-04, selected fg-02 as the trail, the deepest column's selection fg-04 via `:has(~)`; the one-selected-state ruling). Verified in source only.

Remainder here: bump both, delete the override block; your Finder pill / accent / no-dividers rules are later local rulings — file them if they are to become the organism's.

## ✅ RETURNED + DONE — 2026-08-28 · kol-component 0.119.0 · kol-theme 0.81.0

All three shipped and adopted. `autoFocus` on the browse page (focuses on mount and on `prefix` change) replaced the rAF `querySelector` reach into the organism's DOM; `stats={false}` replaced the CSS that hid the duplicate count; `is-selected` / `is-cursor` replaced the Tailwind `bg-fg-04` hook, and the theme now owns the fills — including the one-selection `:has(~ …)` rule, which is gone from here.

**The predicted break happened and was caught on the bump:** 0.119.0 removes `bg-fg-04` from the row, so every local rule keyed on it matched nothing. The half the DS did not take — no dividers, the constant 4px inset, the rounded pill, and the no-hover-fill ruling — is re-keyed onto the new state classes. Theme 0.81.0 paints `:hover` at `fg-04`, so the hover-off override stays and is now three lines that keep the cursor and selection visible.

`src/index.css` is 93 lines; the Finder tuning and the grab pill are what remain. Lint, both test files and `pnpm build` green; deployed, both hosts 200.

**Not filed, still local by the DS's own note:** the pill-on-the-line geometry, the proximity `is-near` state, the GSAP trailing motion, and the no-dividers / inset / rounded shape. Those are later rulings this ticket never carried — a follow-up if they should become the organism's.
