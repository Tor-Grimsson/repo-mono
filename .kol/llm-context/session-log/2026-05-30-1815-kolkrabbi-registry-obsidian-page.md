# Session Log: Kolkrabbi founder registry → Obsidian pillar + brand page repurpose

**Date:** 2026-05-30
**Status:** Completed

## Overview

Packaged the founder/registry data (scraped + vault-mined on 2026-05-27) into a self-contained Obsidian/kol-docs pillar, then pulled the brand app's `Acyr` registry page out of `/reference` into its own top-level `/kolkrabbi` page and rewrote its content from the leftover Another Creation scaffold to real KOL data. Confirmed brand is already unlisted (noindex) — no change needed.

## Key Accomplishments

### 1. Obsidian registry pillar — `docs/kolkrabbi-info/`
**Files:** new `docs/kolkrabbi-info/` (9 files)

Applied the kol-docs framework (`kol-system/_framework`) to the founder data in `apps/brand/src/brand/data/{business-data,info}.js`. 9 docs: `INDEX` (type: index) + `01-identity` / `02-timeline` / `03-art-practice` / `04-music` / `05-press` / `06-profiles-social` / `07-studio` (reference) + `08-open-questions` (audit). Frontmatter contract, closed-set tags (`project/kolkrabbi`, `domain/*`, `brand/identity`, `provider/*`), explicit-form wikilinks, catalog `NN-` numbering, loose-files+INDEX (no mixed subfolders). All TODO/TBD/CONFLICT items centralized in `08-open-questions`, cross-linked to affected docs. PII (kennitala/address/phone) carried but flagged in `01-identity` (same data already committed in `info.js` — no new exposure). Nothing invented; facts + caveats copied verbatim.

### 2. `Acyr` page → top-level `/kolkrabbi`
**Files:** `apps/brand/src/pages/Kolkrabbi.jsx` (renamed from `Acyr.jsx`), `apps/brand/src/App.jsx`, `apps/brand/src/components/framework/sidebars.config.js`, `apps/brand/src/brand/data/business-data.js`

Structural move: file/component `Acyr` → `Kolkrabbi`; route `/reference/acyr` → top-level `/kolkrabbi`; nav entry moved out of Reference children into its own top-level `NAV_TREE` item (`icon: 'info'`, confirmed present in `@kol/loader`). Stale `Acyr.jsx` comment in `business-data.js` updated.

### 3. Content pass — AC scaffold → real KOL data
**File:** `apps/brand/src/pages/Kolkrabbi.jsx`

Repurposed page from Another Creation (fashion) leftovers to KOL. Sections 16 → 14: removed 3 dead/empty sections (live-site map, media inventory, marketing playbook — all `[]` or AC-data-fed); swapped empty `FILMS` section for real **Video & direction** (`TIMELINE` kind `video`); added **Profiles** section (wires previously-unused `PROFILES` import). Hero title → `BIO.fullName`; tab title → `Kolkrabbi · {displayName} · Source of truth`; snapshot recomputed from real counts. All Ýr / Another Creation / Henson / FilmFreeway / opera-dance copy scrubbed. Dead imports + helpers removed (COLLECTIONS/PRODUCTS/ARTICLES/AUTHORS/FILMS/LIVE_SITE_MAP/MARKETING_PLAYBOOK, Fragment, Divider, TIMELINE_KINDS, TokenName, CoverageBadge, yearAsc, liveMapCols, playbookCols, mediaInventory). `KindBadge` map extended to real timeline kinds; `StatusBadge` got `renamed`.

### 4. Brand unlisted — verified, no change
Brand already noindex two ways: `<meta name="robots" content="noindex, nofollow">` (`apps/brand/index.html`) + `X-Robots-Tag: noindex, nofollow` header on `/(.*)` (`apps/brand/vercel.json`). Unlisted (link-reachable, off search) confirmed sufficient per user. Flagged that this is NOT private — `/kolkrabbi` PII is viewable by anyone with the URL; true privacy would need Vercel Authentication or a middleware password gate. User chose to leave unlisted for now.

## Files Modified

### New
- `docs/kolkrabbi-info/INDEX.md` — pillar router (type: index)
- `docs/kolkrabbi-info/01-identity.md` — names, birth, contact, address, legal, bio, statement (PII-flagged)
- `docs/kolkrabbi-info/02-timeline.md` — education · work · awards · milestones
- `docs/kolkrabbi-info/03-art-practice.md` — exhibitions · video · type design
- `docs/kolkrabbi-info/04-music.md` — Two Step Horror · a & E sounds · Konsulat
- `docs/kolkrabbi-info/05-press.md` — reviews · interviews · mentions
- `docs/kolkrabbi-info/06-profiles-social.md` — portfolios + social handles
- `docs/kolkrabbi-info/07-studio.md` — companies · clients · vendors · stack
- `docs/kolkrabbi-info/08-open-questions.md` — unresolved gaps (type: audit)
- `apps/brand/src/pages/Kolkrabbi.jsx` — renamed from `Acyr.jsx` + content pass

### Modified
- `apps/brand/src/App.jsx` — import + route `/reference/acyr` → `/kolkrabbi`
- `apps/brand/src/components/framework/sidebars.config.js` — nav entry out of Reference → top-level `kolkrabbi`
- `apps/brand/src/brand/data/business-data.js` — stale `Acyr.jsx` comment → `Kolkrabbi.jsx`

### Removed
- `apps/brand/src/pages/Acyr.jsx` (→ `Kolkrabbi.jsx`)

## Issues Encountered

### 1. Icon name resolution for nav entry
- **Problem:** New top-level nav entry needs an `icon` that actually exists in the registry, else blank.
- **Resolution:** Traced `<Icon>` in `SideNav.jsx` to `@kol/loader` (`packages/loader/src/`, ~2259 SVGs). Confirmed `info` present before using it.

## Next Steps

- All work uncommitted — user manages git.
- Validate `/kolkrabbi` live on brand (port 5174) — HMR-level; no build run.
- Brand nav for `/kolkrabbi` is flat (single entry, no section anchors) by design — add per-section anchor children later if desired.
- If the registry PII ever needs real protection: Vercel Authentication (dashboard toggle) or middleware basic-auth.
- Registry `08-open-questions` / `business-data.js OPEN_QUESTIONS` still open: UDK-vs-Weissensee, BFA-vs-BA, current address, China show, Rafiðn, per-typeface foundry dates, Nyctophilia review URL, @tortor handle, biskupstunga.com.
