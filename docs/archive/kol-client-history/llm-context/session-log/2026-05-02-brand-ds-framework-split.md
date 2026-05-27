# Session: Brand / DS / framework split — packages + repo restructure

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Established the four-layer architecture (DS / brand / framework / per-client content). Synced + restructured `kol-system/packages/`, created the new `kol-brand` package, then refactored this repo's `src/` to mirror the same split.

## Changes Made

### Files Modified — `kol-system/packages/` (upstream)

- **`kol-brand/` (NEW)** — package created at `kol-system/packages/kol-brand/` with `package.json` + `src/kol-brand-color.css`. Holds the 5 hue ramps (yellow/red/blue/orange/teal), brand-primary/secondary roles, cream + grey utility neutrals, accent rebind, and brand Tailwind exposures (`bg-brand-*`, etc.) — all stripped out of `kol-theme`.
- **`kol-theme/src/kol-color.css`** — rewritten brand-neutral. Surface tiers, ink-based accent default (`--kol-accent-* = surface-on-primary`), ui-state, borders. No hue ramps, no brand identity.
- **`kol-theme/src/`** — adopted the repo's CSS layout. Single `kol-components.css` split into `kol-components-{atoms,molecules,organisms}.css`. Mono typography split out of `kol-typography.css` into `kol-typography-mono.css`. Umbrella `kol-theme.css` now imports 8 layers in cascade order. Legacy `kol-components.css` + unused `inter/` font folder removed.
- **`kol-theme/public/fonts/`** — synced. `Right-Grotesk/` (27 woff2 cuts referenced by `kol-typography.css`), `Right-Grotesk-Text/` (2 cuts), `jetbrains-mono/` (16 cuts; 4 actively referenced). Folder renamed lowercase → capitalized to match CSS refs (case-sensitive on Linux deploy targets).
- **`kol-component/src/`** — atoms 7→10 (added Avatar, Label, Stepper, Textarea), molecules 12→12 (added LabeledControl, PropertyInput; dropped ButtonNav, UnitSelector), organisms unchanged (Table only). Dead `Checkbox.jsx` removed (superseded by ToggleCheckbox). Existing components synced from repo (Button drops `uppercase` prop + `control` variant per ARCHITECTURE.md §2). Icon imports rewritten `'../loaders/icons/Icon'` → `'../icons/Icon'` (matches scaffold layout).
- **`kol-component/src/organisms/Table.jsx`** — synced from repo (gains `variant="default"|"simple"` prop).
- **`kol-loader/src/icons/`** — registry aligned with repo. Added `00-kol/` folder (chevron-up, chevron-down, resize-corner — used by Stepper / Textarea). Renamed `00-rack/` → `99-rack/`. Removed chevron duplicates from rack + `01-navigation/`. Stripped brand-specific `kolkrabbi: ['signature-thick']` bucket from `index.js`.
- **`kol-docs/src/`** — major rewrites: `00-system/00-index.md` (overview), `00-system/02-imports.md` (manifest v4, the source-of-truth for what `init-scaffold` copies), `01-colors/00-index.md` (5-layer architecture, brand split), `02-typography/00-index.md` (sans + mono structure), `04-components/00-index.md`, `01-atoms.md`, `02-molecules.md`, `03-organisms.md` (all reflect new component lists). Cheat sheets NOT updated — flagged in each index doc.

### Files Modified — `~/.claude/skills/init-scaffold/SKILL.md`

- Frontmatter description updated to reflect brand-neutral DS, with explicit callout that `kol-brand` is NOT pulled (init-client territory).
- Step-2 summary panel updated with file counts (10 atoms / 12 molecules), 8-CSS-file split note, brand-layer carve-out.
- Step-8 import enumeration updated (8 imports inside the umbrella, not 5).
- Notes section gains `kol-brand` + `kol-loader/{logos,marks,graphics}` carve-outs.
- `cp` commands in step 7 unchanged (recursive folder-content copies pick up the new files automatically).

### Files Modified — this repo (`kol-generator-acstrip/`)

**CSS split (mirrors the package layout):**
- `src/styles/kol-color.css` — rewritten brand-neutral, identical to the package version.
- `src/styles/kol-brand-color.css` — created, holds the Kolkrabbi brand layer (mirrors `kol-system/packages/kol-brand/src/kol-brand-color.css`).
- `src/index.css` — now imports DS umbrella + brand layer + framework chrome separately (mirrors the order `init-client` would assemble).

**`src/` restructure (four-layer split):**
- **`src/brand/` (NEW)** — Kolkrabbi identity. `kol-brand-color.css`, `config.js` (was `src/brand.config.js`), `logos/` (was `src/components/loaders/logomarks/` — 4 SVGs + `KolLogo.jsx` + `index.js`), `data/` (8 files: `info.js` (was `brand-info.js`), `blog-data.js`, `shop-data.js`, `collections-data.js`, `business-data.js`, `branded-assets.js`, `kol-images.js`, `placeholder-logos.jsx`).
- **`src/components/framework/` (NEW)** — page chrome. 11 files moved from `layouts/`, `navigation/`, `sections/`: `Layout`, `BrandLayout`, `PortalFooter`, `ScrollToTop`, `SideNav`, `sidebars.config`, `ThemeToggle`, `PageSection`, `BrandHero`, `SubPageHero`, `kol-framework.css`.
- **`src/components/styleguide/` (NEW)** — per-client chapter content. 24 files moved: 9 from `sections/` (asset / logo / type / mood / mock chapters) + 15 from `organisms/` (Asset*, FeatureSplit, PortalIndex, Ramp, SigTicker, SocialMocks, SpectrumGrid, StationeryMocks, Swatch, TypeBlock, TypeSample).
- **`src/data/` flattened** — `system/` subfolder removed. `typography.js`, `color.js`, `components.js` now at `src/data/`.
- **Survivors** — `src/components/sections/ColorRamp.jsx` (DS-utility cross-feature helper), `src/components/organisms/Table.jsx` (only DS organism).
- **Empty folders removed** — `src/components/layouts/`, `src/components/navigation/`, `src/components/loaders/logomarks/`.

**Import rewrites — ~120 sites across `src/`:**
- All `layouts/X` / `navigation/X` / `sections/{PageSection,BrandHero,SubPageHero}` → `framework/X`.
- All `sections/{ClearspaceDiagram,LogoCard,LogoCarousel,LogoScaling,MoodTile,ProsePreview,TypeScaleSection,TypeSpecCard,FullscreenGallery}` → `styleguide/X`.
- All `organisms/{Asset*,FeatureSplit,PortalIndex,Ramp,SigTicker,SocialMocks,SpectrumGrid,StationeryMocks,Swatch,TypeBlock,TypeSample}` → `styleguide/X`.
- `components/loaders/logomarks` → `brand/logos` + depth-fix (one extra `../` for files inside `src/components/`).
- `data/system/{typography,color,components}` → `data/{typography,color,components}` (flatten).
- `data/{brand-info,blog-data,shop-data,collections-data,business-data,branded-assets,kol-images,placeholder-logos}` → `brand/data/` (with `brand-info` renamed to `info`).
- `brand.config` → `brand/config`.
- Two formerly-co-located sibling imports patched: `styleguide/TypeScaleSection.jsx` (`./PageSection` → `../framework/PageSection`), `styleguide/AssetTable.jsx` (`./Table` → `../organisms/Table`).

**Other:**
- `scripts/build-photos-manifest.js` — soft-fail when `public/brand/images/` missing (writes empty manifest instead of `process.exit(1)`). Predev no longer blocks dev when brand assets are stripped.
- `docs/repo-setup/src-layout.md` (NEW, 157 lines) — explains the four-layer architecture, folder layout, decision rules for new files, CSS cascade order, relationship to upstream packages.

### Features Added/Removed

- **Added:** `kol-brand` package (entire layer). `src/brand/`, `src/components/framework/`, `src/components/styleguide/` (entire folder hierarchy).
- **Removed:** Brand identity tokens from `kol-theme/src/kol-color.css` (moved to kol-brand). Dead components in `kol-component` (Checkbox, ButtonNav, UnitSelector). Dead `kol-components.css` legacy single-file. Empty source folders (`layouts/`, `navigation/`, `loaders/logomarks/`).

## Current State

### Working

- All four layers physically separated in this repo + mirrored upstream in `kol-system/packages/`.
- Vite verified all imports resolve (after two depth/sibling-import patches).
- DS scaffold smoke-tested into `/tmp/scratch-kol-smoke`: 0 missing font refs, 0 stale imports, accent renders ink-on-surface (no Kolkrabbi yellow bleed) without brand layer loaded.
- `init-scaffold` ready to copy the brand-neutral DS into a fresh project.
- This repo's `index.css` cascade: tailwind → DS umbrella → brand layer → framework chrome → legacy site CSS.
- Predev script tolerates missing brand assets (writes empty photo manifest).

### Known Issues

- Single-file folders survive the move: `src/components/sections/` has only `ColorRamp.jsx`, `src/components/organisms/` has only `Table.jsx`. Functional but slightly awkward.
- `kol-typography-fonts-full.css` (98 ttf for Type Lab opentype.js morph) lives in `src/styles/` — generator-specific, not DS, but flagged as such in the repo. Out of scope for this session.
- `src/styles/kol-site.css` still imported by `src/index.css` — marketing-site chrome being deleted per ARCHITECTURE.md but not yet stripped.
- `kol-system/packages/kol-theme/public/fonts/jetbrains-mono/` ships 16 cuts; only 4 are referenced by `kol-typography-mono.css`. Tiny dead weight (~360KB).
- `kol-loader/src/icons/index.js` registry's `rack` bucket still lists chevron-up/down even though those icons moved to `00-kol/`. Cosmetic — Icon.jsx resolves by filename via `import.meta.glob`, so runtime works.
- `kol-system/packages/kol-framework/` is empty / not yet set up. Once it is, `src/components/framework/` will sync upstream the same way `src/components/atoms/` syncs to `kol-component`.
- Build was not run end-to-end (per CLAUDE.md rule "Don't run yarn build after routine code changes"). User will validate live via `pnpm dev`.

## Next Steps

1. User runs `pnpm dev` to validate the refactor end-to-end. Any new broken imports surface in the Vite HMR overlay; patch on demand.
2. Set up `kol-system/packages/kol-framework/` once the `init-client` skill is ready — sync framework chrome upstream from `src/components/framework/`.
3. Finish the AC strip — delete `src/styles/kol-site.css` import + the file, finish "Another Creation" → "Kolkrabbi" string sweep in styleguide.
4. Optional cleanup: trim the 12 unused JetBrains Mono cuts from `kol-system/packages/kol-theme/public/fonts/jetbrains-mono/`. Cosmetic only.
5. Optional cleanup: realign the `kol-loader/src/icons/index.js` registry's `rack` bucket so chevrons are listed under a `kol` bucket.
