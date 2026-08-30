# ControlToneInverse — `tone="inverse"` on ViewToggle (icon) · Dropdown · Input

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ControlToneInverse.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.117.0 · kol-theme 0.78.0, 2026-08-27

## Why it went there

Brand `/icons` sits on `pageWash` fg-04; the icon `ViewToggle`'s grey well reads
as a second plate on it. The user asked for the flipped scheme — dark well,
grey active — and for the same as a variant on the Dropdown and the Input.
Three DS controls, one tone: the DS's to add.

## What stays here

`styles/icons-toggle-inverse.css` (two rules) + the `.icons-toggle-inverse`
wrapper in `pages/IconsGallery.jsx` — the ViewToggle half of the flip, by the
className-seam rule. Dropdown and Input are NOT carried locally.

## Remainder here once it ships

bump kol-component (+ theme if it rides there); `tone="inverse"` on the two
ViewToggles, the size Dropdown and ContentFilters' search; delete
`styles/icons-toggle-inverse.css`, its `@import`, and the wrapper div.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.117.0 · kol-theme 0.78.0

🟢 `closed` in **kol-ds-ui** — `tone="inverse"` on `ViewToggle` (icon) · `Dropdown` · `Input` · `SearchInput`, and `ContentFilters tone` forwarded to its search field: the control takes the dark chip (`fg-absolute-24`), the active chip the lighter grey (`surface-tertiary` — your "the active grey can be lighter"), the inactive hover an absolute-white wash, the Dropdown panel continuing its trigger. Rules in kol-theme (`.kol-tone-inverse`), defaults unchanged everywhere; shown beside the default on an fg-04 wash in the showcase ViewToggle demo. 21 gates clean; verified in source only.

**Remainder here:** bump kol-component 0.117.0 · kol-theme 0.78.0; `tone="inverse"` on the `/icons` ViewToggle, Dropdown and Input (or `tone` on the ContentFilters row); delete `apps/brand/src/styles/icons-toggle-inverse.css` and the `icons-toggle-inverse` wrapper.

**Remainder here:** ✅ executed 2026-08-27 same session — component ^0.117.0 · theme 0.78.0 in both apps (one DS copy); `tone="inverse"` on ContentFilters, the ViewToggle and the Dropdown at `/icons`; `styles/icons-toggle-inverse.css` → `_tmp/2026-08-27-icons-toggle-inverse/`, its import and the wrapper gone. ⚠ the shipped active chip is `surface-tertiary` — the user had already rejected that rung as DARKER than secondary ("I said lighter not darker"); the local carry was on `fg-16`. Reported to the DS session.

**Addendum — 2026-08-27 · kol-theme 0.78.1:** the active chip is `--kol-fg-16`, not `surface-tertiary` — the user's ruling on the live page ("just use bg-fg-16"). Theme patch only; kol-website's one local rule dies on the bump.

**0.78.1 — 2026-08-27:** the DS took `fg-16` as the ruling; theme bumped to 0.78.1 in both apps, the local rule retired to `_tmp/2026-08-27-icons-toggle-inverse/`. Nothing local left.
