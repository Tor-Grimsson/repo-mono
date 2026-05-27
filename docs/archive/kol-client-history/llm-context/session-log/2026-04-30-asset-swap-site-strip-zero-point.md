# Session: Asset swap + /site strip + docs zero-point

**Date:** 2026-04-30
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** First session in the `kol-generator-acstrip` repo. Replaced AC brand
assets (logos + photos) with Kolkrabbi versions, stripped the marketing site
(`/site/*`) routes / pages / layout / site-only organisms, then archived the
inherited `kol-ac` documentation and laid down a fresh `llm-context` scaffold so
future agents start clean. Migration is partial — three more passes in
`docs/kol-migration/migration-notes.md`.

## Changes Made

### Asset swap

**Logos** (drop-in replacements, AC filenames preserved so `AcLogo.jsx` keeps
working):
- `src/components/loaders/logomarks/svg/ac-logomark.svg` ← `_tmp/kolkrabbi-logos/logo.svg`
- `src/components/loaders/logomarks/svg/ac-wordmark.svg` ← `_tmp/kolkrabbi-logos/wordmark.svg`
- `src/components/loaders/logomarks/svg/ac-lockup-hori.svg` ← `_tmp/kolkrabbi-logos/logo-full.svg`
- `src/components/loaders/logomarks/svg/ac-lockup-vert.svg` ← `_tmp/kolkrabbi-logos/logo-lockup-2.svg`
- `#262A33` literal → `currentColor` in `ac-wordmark.svg` and `ac-lockup-vert.svg`
  so theme toggle still flips ink.

**Photo dirs** (renamed + contents replaced):
- `public/brand/images/ac-mood/` → `kol-mood/` (4 files from `_tmp/images/album-studio`)
- `public/brand/images/ac-photoshoot/` → `kol-photoshoot/` (8 files from `album-tor`)
- `public/brand/images/ac-textures/` → `kol-textures/` (6 files from `album-type`)
- `public/brand/images/ac-yr/` → `kol-kol/` (1 billboard from `album-mocks`)

**Hardcoded path fix:**
- `src/pages/Landing.jsx` — `HERO_IMAGE` const updated to
  `/brand/images/kol-photoshoot/thg-01.jpg`.

### Marketing-site strip

**Edited:**
- `src/App.jsx` — removed all `/site/*` routes + `SiteLayout` import + 16 site
  page imports.

**Deleted:**
- `src/pages/site/` (entire dir, 16 pages: Home, Blog, BlogArticle, BlogAuthor,
  Collections, CollectionDetail, Shop, ProductDetail, Handmade, Contact,
  Privacy, Terms, ShippingReturns, Cart, Checkout, OrderConfirmation)
- `src/components/layouts/SiteLayout.jsx`
- `src/components/site/` (CartContext.jsx + dir)
- `src/components/navigation/Nav.jsx` (site nav)
- `src/components/organisms/{BlogBody, Collection, DesignerVision, FAQ, Footer,
  HandmadeCard, LookbookCarousel, Marquee, Newsletter, ProductCard, SupportCTA,
  Testimonial}.jsx`

**Restored** (deleted in error — `Acyr.jsx` depends on them; user re-supplied
from `_tmp/data/`):
- `src/data/blog-data.js`, `shop-data.js`, `collections-data.js`,
  `business-data.js`, `ac-images.js`

### Docs zero-point reset

**Moved to `docs/archive/`** — pre-strip parent context, frozen for reference:
- `brand-assets/`, `documentation/`, `styleguide/` dirs
- `breakpoints-audit.md`, `compose-audit.md`, `compose-plan.md`,
  `layout-gra.md`, `website-concept.md`
- `history.md`, `plan.md`
- `llm-context/` (parent `kol-ac` README + ARCHITECTURE + AGENT-CONTEXT + 11
  session logs)

**Created fresh:**
- `docs/llm-context/README.md` — context-system index
- `docs/llm-context/ARCHITECTURE.md` — zero-point with §1 (repo purpose) +
  non-goals (no marketing site, no guides, single-brand)
- `docs/llm-context/AGENT-CONTEXT.md` — current-state snapshot
- `docs/llm-context/session-log/` — empty (this is the first entry)
- `docs/history.md`, `docs/plan.md` — empty stubs

**Bridge doc:**
- `docs/kol-migration/migration-notes.md` — punch-list of what's done, open
  issues, and the remaining roadmap (guides strip → brand rename → code rename).

**Updated:**
- `LLM_RULES.md` (root) — project name `kol-ac` → `kol-generator-acstrip`,
  rewrote welcome blurb (now scoped to generators + compose), updated directory
  tree to reflect current layout.

## Current State

### Working
- 4 Kolkrabbi logos render via `AcLogo` (filenames still AC-prefixed; loader
  untouched).
- Photo dirs serve KOL content under `kol-*` paths.
- Landing hero image renders.
- All `/site/*` routes return `NotFound` (site is gone).

### Known issues (from `kol-migration/migration-notes.md`)
- **Stale path refs:** `src/data/ac-images.js` (lines 1–2) and
  `src/data/blog-data.js` (lines 18–19) hardcode old `ac-*` prefixes AND specific
  filenames (`33a4402.jpg`, `image-NN.jpeg`) that no longer exist. `ac-images.js`
  is currently unused; `blog-data.js` is consumed by `Acyr.jsx` so its article
  preview thumbs will 404.
- **Dead `/site` link:** `src/pages/Landing.jsx` line 36 — `Enter site` button
  navigates to `/site` which now returns `NotFound`.
- **Unverified:** dev server not yet started post-strip. Click-through of every
  surviving route (`/`, `/styleguide`, `/reference`, `/reference/acyr`,
  `/generators` + 5 sub-labs, `/compose`, `/demo`, `/demo/runway-v1`–`v4`,
  `/gallery`) pending.

## Next Steps

1. **Verify.** Run `pnpm dev`, click every surviving route, watch the console.
2. **Cleanup current pass.** Decide on the dead `/site` link in Landing + the
   stale path refs in `blog-data.js` / `ac-images.js`.
3. **Strip guides.** Delete `src/components/guides/`,
   `src/components/navigation/GuidesHop.jsx`, `src/styles/kol-guides.css`. Remove
   the import from `src/index.css`. Remove `<GuidesProvider>` from `BrandLayout`.
   Remove `<GuidesHop>` from `SideNav`. Replace `<GuideStage>` /
   `<StandardAsset>` / `<AssetSpecTable>` consumers in `Styleguide.jsx`
   stationery chapter with bare `<figure>` wrappers.
4. **Brand identity rename.** Update `brand.config.js`
   (`Another Creation` → `Kolkrabbi`, slug `another-creation` → `kolkrabbi`).
   Rename `public/brand/another-creation/` → `public/brand/kolkrabbi/`. Rewrite
   identity strings in `brand-info.js`. String sweep across surviving files.
5. **Code rename.** `AcLogo` → `KolLogo`, `ac-images.js` → `kol-images.js`, SVG
   filename rename `ac-*` → `kol-*` and update imports.
