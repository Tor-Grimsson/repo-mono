# DocPageAndKindShowcase — one plate for every document, the frontmatter block, the overlay's edges, and all 14 kinds on show

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/DocPageAndKindShowcase.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.114.0 · kol-theme 0.75.0 · kol-framework 0.29.0, 2026-08-27

## Why it went there
The page plate, the column zoom, the code-block rules, the frontmatter block and the arrow gutters are all consumer CSS / JSX over DS markup; the framework overlay clash is the framework's; and the user wants every kind viewable in the showcase, which only the DS can host.

## What stays here
`DocPage` + `DOC_KINDS` and the `fixed` arrows in `src/FileList.jsx`, `src/DocFrontmatter.jsx`, `src/lib/frontmatter.js`, the `.r2b2-doc` block and the `.kol-overlay` overrides in `src/index.css`. On publish: bump; drop them.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.114.0 · kol-theme 0.75.0 · kol-framework 0.29.0

🟢 `closed` in **kol-ds-ui** — (1) `DocPage` — one plate for every document: `KindPreview` renders markdown · text · code · JSON · YAML on `.kol-doc-page` (base plate; in `.kol-overlay` the A-series page 85vh × 85vh/√2 inside the 10rem gutters, scrolling; in `.kol-column-browser-preview` zoomed 0.5, children reset); the code block inside is transparent, borderless, full width; `KindPreview`'s own max-w/max-h wrappers are gone. (2) `DocFrontmatter` (the workshop block, ported) renders markdown's frontmatter above the prose from the same fetch — `parseFrontmatter` exported (`utilities/frontmatter`). (3) `MediaViewer`'s arrows are `fixed` at `left-6` / `right-6`, every slide stops `10rem` short. (4) The framework's `.kol-overlay` / `-sheet` / `-close` rules are retired (kol-framework 0.29.0) — the theme's FullscreenOverlay holds; your `index.css` override goes. (5) `/sets/preview/kind-preview` — all 14 kinds, column preview + overlay, the bar and both audio sheets. 21 gates clean; verified in source only.

**Remainder here:** bump kol-component 0.114.0 · kol-theme 0.75.0 · kol-framework 0.29.0; drop `src/DocFrontmatter.jsx`, `src/lib/frontmatter.js`, `DocPage` in `FileList.jsx` (render `KindPreview` bare) and the `.r2b2-doc` + `.kol-overlay` blocks in `index.css`; the lightbox arrows go `fixed` like `MediaViewer`'s.

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.114.0 · kol-theme 0.75.0 · kol-framework 0.29.0

Bumped. `KindPreview` renders markdown · text · code · JSON · YAML on the DS `DocPage` itself, frontmatter parsed from its own fetch — the local `DocPage` wrapper, `DOC_KINDS`, `src/DocFrontmatter.jsx` and `src/lib/frontmatter.js` are gone (files → `_tmp/2026-08-27-mediasheets-docpage-local/`), along with the whole `.r2b2-doc` + `.kol-overlay` block in `src/index.css` — framework 0.29.0 retired the clashing overlay rules, so the theme's chrome stands alone. The lightbox keeps its own `fixed` arrows and `10rem` gutters (it is a local inspector, not `MediaViewer`, which now does the same). Lint, both test files and `pnpm build` green.

**Not verified here:** the showcase page (5) is the DS's own surface.
