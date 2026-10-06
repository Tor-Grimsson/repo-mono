# Session Log: Input Sizing Unification

**Date:** 2026-03-07
**Status:** Completed

## Overview

Unified Input atom sizing with Button/Dropdown (28/32/36px tiers). Removed conflicting JS inline styles, auto-sizing logic, and responsive CSS overrides. Refactored SearchInput to wrap Input. Fixed HomeSignup newsletter form. Migrated TagModeOverlay to Input atom. Deleted dead `shell-tab-search-wrapper` / `kol-search-input` CSS. Added missing Chess Metrics overview card.

## Key Accomplishments

### 1. Input Atom Sizing Unification
**Files:** `packages/ui/src/atoms/Input.jsx`, `packages/ui/css/components.css`

- Added fixed `height: 28/32/36px` to `input-sm/md/lg` CSS classes, matching `btn-sm/md/lg`
- Added text styles (mono, 470 weight, 14/14/18px, tracking 0.03em) to CSS classes, matching Button
- Removed `@container` responsive padding overrides from `input-sm/md/lg`
- Removed fixed widths (280/380/480px) from CSS classes — width is now the consumer's concern
- Removed `SIZE_MAP` entries for `fontSize`, `paddingY`, `paddingX` — kept only `icon` + `paddingX` for icon offset math
- Removed `window.innerWidth` auto-sizing `useEffect` — default is now `md` (same as Button/Dropdown)
- Removed `kol-mono-text` from JS className (text styles now in CSS)

### 2. SearchInput Refactored to Wrap Input
**File:** `packages/ui/src/atoms/SearchInput.jsx`

- Default mode now renders `<Input iconLeft="search-16">` instead of manual `shell-tab-search-wrapper` build
- Accepts and passes through `size` prop
- `iconOnly` and `bare` modes unchanged

### 3. HomeSignup Newsletter Form Cleanup
**File:** `apps/web/src/components/sections/home/HomeSignup.jsx`

- Replaced manual `shell-tab-search-wrapper` + `kol-search-input` with `<Input size="md">`
- Removed `h-11` height override from Button (was forcing 44px instead of design system 32px)
- Removed search icon (was inappropriate for email input)
- Both input and button now use consistent `md` sizing (32px)

### 4. InputPreview Workshop Update
**File:** `apps/web/src/components/workshop/molecules/InputPreview.jsx`

- Replaced breakpoint simulation (with hardcoded padding/fontSize overrides) with sm/md/lg size showcase
- Updated descriptions to reflect unified sizing system

### 5. TagModeOverlay Migration
**File:** `apps/web/src/components/workshop/docs/TagModeOverlay.jsx`

- Replaced manual `shell-tab-search-wrapper` + `kol-search-input` with `<Input size="md" iconLeft="search-16" className="w-full">`
- Clear button preserved alongside Input

### 6. Dead CSS Cleanup
**File:** `packages/ui/css/components.css`

- Deleted `shell-tab-search-wrapper` and `kol-search-input` classes (zero consumers remaining)
- Removed associated `@container` responsive blocks and hover/focus-within states

### 7. Chess Metrics Overview Card
**File:** `apps/web/src/routes/workshop/ChessHome.jsx`

- Added missing Metrics card to chess overview grid
- Uses `stat-stat` icon, links to `/workshop/chess/metrics`

## Files Modified

### Modified Files
- `packages/ui/css/components.css` — Rewrote `input-sm/md/lg`, deleted `shell-tab-search-wrapper` + `kol-search-input`
- `packages/ui/src/atoms/Input.jsx` — Simplified SIZE_MAP, removed auto-sizing, CSS-driven sizing
- `packages/ui/src/atoms/SearchInput.jsx` — Wraps Input internally for default mode
- `apps/web/src/components/sections/home/HomeSignup.jsx` — Uses Input atom, removed overrides
- `apps/web/src/components/workshop/molecules/InputPreview.jsx` — Shows sm/md/lg sizes
- `apps/web/src/components/workshop/docs/TagModeOverlay.jsx` — Uses Input atom, full-width
- `apps/web/src/routes/workshop/ChessHome.jsx` — Added Metrics card

## Decisions Made

- **Input sizing via CSS only:** Heights and text styles in `input-sm/md/lg` CSS classes (single source of truth), no JS inline overrides. Matches Button pattern.
- **No auto-sizing:** Input defaults to `md` like Button and Dropdown. Size is explicit, not viewport-dependent.
- **SIZE_MAP kept minimal:** Only `icon` (for icon sizing) and `paddingX` (for icon offset calculation) remain in JS — these are values CSS can't provide for the JS positioning math.

## Next Steps

- Dropdown uses inline height from JS SIZE_MAP — could be moved to CSS for full consistency (lower priority)
- Visual verification of all Input consumers at different sizes
