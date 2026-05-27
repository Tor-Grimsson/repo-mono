# Session: init-skills overhaul + editor / styleguide / client packaging

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Promoted `kol-editor`, `kol-styleguide`, and `kol-client` as upstream packages under `kol-system/packages/`; synced kol-component / kol-loader / kol-theme drift from this repo; rewrote `init-client` and `init-scaffold` skills to match the 4-layer architecture; wrote new `init-editor` skill. This repo's source files were NOT modified — all work was outside (`kol-system/packages/` and `~/.claude/skills/`).

## Changes Made

### New upstream packages
- `kol-system/packages/kol-editor/` — full editor surface: `src/` (134 files: Editor / EditorShell / color / components / compose / data / icons / library / modes / shell / state / styles), `public/fonts/Right-Grotesk-ttf/` (98 ttfs), `docs/` (11 reference + plans files), `package.json`, `README.md`. Type-lab unit lives here as a coherent group: `TypeBlock` + `TypeBlockToolbar` + `data/typography-cuts.js` + 98-ttf set + `kol-typography-fonts-full.css`.
- `kol-system/packages/kol-styleguide/` — brand-reference presentation: `src/` (23 files after TypeBlock removal: AssetCard, Swatch, Ramp, MoodTile, etc.), `package.json`, `README.md`.
- `kol-system/packages/kol-client/` — client-template payload: `src/pages/{Landing, Styleguide, Reference, Gallery, NotFound}.jsx`, `src/brand/{data, logos}/` placeholder set (Kolkrabbi-flavored defaults), `src/data/{color, typography, components}.js` (DS reference data for Reference page), `public/brand/template/` skeleton, `public/images/` minimal photo skeleton (6 placeholder files), `package.json`, `README.md`.

### Synced from this repo to existing upstream packages
- `kol-component/atoms/` — overwrote Button / Input / Slider / Stepper / Textarea (DIFFs); added ColorSwatch + TransparentX (NEW). 10 → 12 atoms.
- `kol-component/molecules/` — overwrote Dropdown / LabeledControl / SectionLabel / ViewToggle (DIFFs); added ContentFilters + MenuItem + Modal + Popover + SegmentedToggle (NEW). 12 → 17 molecules. Skipped TypeBlockToolbar (moved to kol-editor instead) and MenuPopover (dead code, no consumers).
- `kol-loader/icons/Icon.jsx` — two-pass `00-kol/` overlay pattern.
- `kol-loader/icons/svg/00-kol/` — 3 → 29 icons (full canonical set per `docs/kol-components-sync.md`).
- `kol-theme/src/` — kol-color.css, kol-components-atoms.css, kol-components-molecules.css, kol-theme.css.

### Skill updates
- `~/.claude/skills/init-scaffold/SKILL.md` — atom count 10→12, molecule count 12→17, icon registry note updated, `pnpm add @floating-ui/react` step added (kol-component Popover/MenuItem now require it).
- `~/.claude/skills/init-client/SKILL.md` — full rewrite. Sources from `kol-system/packages/{kol-framework, kol-styleguide, kol-brand, kol-loader, kol-client}` (no longer from `kol-client/kol-client/`). Targets the 4-layer src layout (`src/brand/` + `src/components/{framework, styleguide, client, atoms, molecules, organisms, icons}/`). Marketing-site path removed entirely. Step list: prereq → prompt brand → summary → 6 copy passes → write `brand/config.js` → overwrite `App.jsx` (4 routes: `/` `/styleguide` `/reference` `/gallery`) → append imports to `index.css` → set `data-theme="dark"` → install deps (react-router-dom + gsap + embla-carousel-react) → report.
- `~/.claude/skills/init-editor/SKILL.md` — NEW. Prereq: `/init-scaffold` + `/init-client` ran. Steps: copy `kol-editor/{src,public/fonts,docs}` into target → patch `App.jsx` for `/editor/:mode` route + legacy `/generators/*` redirects → add Editor sidebar entry → install deps (`colord opentype.js wawoff2` runtime, `vite-plugin-svgr` dev) → wire `svgr()` in vite.config.js → report.

### Type-lab consolidation in kol-editor
- Moved `TypeBlock.jsx` from kol-styleguide → `kol-editor/src/components/`.
- Moved `TypeBlockToolbar.jsx` from `src/components/molecules/` (would've gone to kol-component) → `kol-editor/src/components/`.
- Moved `typography-cuts.js` from consuming repo's `src/data/` → `kol-editor/src/data/`.
- Rewrote import paths inside kol-editor for these moves: `TypeBlock`, `TypeBlockToolbar`, `modes/type/cuts.js`, `compose/LayerRenderer.jsx`, `modes/type/TypeFrame.jsx`.
- Verified TypeBlock had no consumers in kol-styleguide (TypeSpecCard / TypeSample / TypeScaleSection don't import it) before removing.

## Current State

### Working
- Five upstream packages aligned with this repo's reality: kol-component (12 atoms / 17 molecules / 1 organism), kol-loader (29 00-kol icons + two-pass overlay), kol-theme (4 CSS files synced), kol-editor (full surface + fonts + docs), kol-styleguide (23 components), kol-client (29 files: pages + brand template + data + assets).
- Three skills cover the bootstrap chain: init-scaffold (DS-only) → init-client (framework + brand + styleguide + client pages) → init-editor (editor surface, optional).
- This repo unchanged — still working surface for ongoing editor development.

### Known Issues
- **MenuPopover** (`src/components/molecules/MenuPopover.jsx`) is dead code in this repo — superseded by Popover but never deleted. Not promoted upstream.
- **Acyr.jsx** (`src/pages/Acyr.jsx`) is AC-specific reference page kept in this repo for ongoing use; intentionally NOT in kol-client template (clients shouldn't inherit AC-specific content).
- **kol-framework upstream brand/sections duplicates kol-styleguide** — Swatch, Ramp, SpectrumGrid, TypeSample, AssetFigure, AssetGrid, AssetCarousel are duplicated in `kol-framework/src/{brand,sections}/` and `kol-styleguide/src/`. Eventual cleanup: drop them from kol-framework (which should retain only PageSection-style page-chrome sections). Flagged in kol-styleguide README.
- **Brand assets in kol-client are Kolkrabbi-flavored defaults** — clients see a populated baseline they replace, matching the older Voyager template convention. If a more neutral default is desired, kol-client `public/images/` and `src/brand/{data,logos}/` would need a one-time strip.
- **kol-client/kol-client/** (the old standalone repo at `/Users/biskup/dev/projects/kol-client/kol-client/`) is now deprecated. Not deleted — left as historical reference until the user explicitly drops it.

## Next Steps

1. Test `/init-scaffold` on a fresh empty directory to verify the new floating-ui install + bumped atom/molecule counts work end-to-end.
2. Test `/init-client` chain on top — confirm 4-layer layout produces correctly, brand portal renders, styleguide pages mount.
3. Test `/init-editor` chain on top — confirm editor mounts at `/editor/compose`, all four modes work, type-lab loads ttfs.
4. **Phase B follow-up**: kol-framework still ships duplicates of kol-styleguide pieces. Drop them from kol-framework once init-client's styleguide-import path is verified.
5. Consider creating `init-marketing-site` (or similar) skill if a marketing site is wanted again — it'd source the older `kol-client/kol-client/` blog/contact pages as a separate optional layer.
