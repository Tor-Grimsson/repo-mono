# Session Log: Work V2 View Toggle (Collins-style)

**Date:** 2026-03-13
**Status:** Completed

## Overview

Implemented a Collins-inspired shelf/list view toggle with animated search bar for the Work V2 page. The toggle is fixed-positioned at the top center of the viewport (independent of navbar scroll), features a sliding pill indicator with bounce easing, icon reveal/hide animations, and an expanding search bar with close button.

## Key Accomplishments

### 1. WorkViewContext
**File:** `apps/web/src/context/WorkViewContext.jsx`

Created shared context providing `viewMode`, `setViewMode`, `isSearchOpen`, `setIsSearchOpen` state. Provider wraps SiteLayout so both Navbar and WorkV2 can consume the context.

### 2. WorkViewToggle Component
**File:** `apps/web/src/routes/WorkV2.jsx`

Built the main toggle UI as a fixed-position element (`fixed top-4 left-1/2 z-[60]`). Features:
- **Pill toggle** with sliding indicator (`bg-fg-96` pill, bounce easing `cubic-bezier(0.34, 1.2, 0.64, 1)`)
- **Icon reveal/hide** — active toggle shows icon (library/view-list) with animated width/margin/opacity transitions
- **Inactive text centering** — padding compensation for negative margin overlap (`-ml-4`)
- **Explicit button widths** (96px each) to prevent flex sizing inconsistency
- **Search expansion** — search icon button expands to 280px search bar, toggle collapses to 0, close button appears
- All transitions use `cubic-bezier(0.16, 1, 0.3, 1)` ease

### 3. Navbar Route-Aware Hiding
**File:** `apps/web/src/components/layout/Navbar.jsx`

Desktop nav links hidden when pathname starts with `/work-v2`. Uses `useLocation()` for route detection.

### 4. ListView Component
**File:** `apps/web/src/routes/WorkV2.jsx`

Added list view mode using existing `ProjectListItem` component. View switches between Embla shelf rows and vertical list based on `viewMode` context.

### 5. Design System Additions
**File:** `packages/ui/css/utilities.css`

Added 13 `hover:bg-fg-*` utility classes (01 through 96) using same `color-mix` pattern as static `bg-fg-*` classes.

### 6. View-List Icon Fix
**File:** `packages/ui/src/atoms/icons/svg/view-list.svg`

Converted from stroke-based `<line>` elements to path-based `<path>` fills. Tightened bar spacing (3px gaps, 2px thickness) to match library icon weight.

## Files Modified

### New Files
- `apps/web/src/context/WorkViewContext.jsx` — View mode + search state context

### Modified Files
- `apps/web/src/routes/WorkV2.jsx` — Added WorkViewToggle, ListView, removed inline toggle, uses context
- `apps/web/src/components/layout/Navbar.jsx` — Route-aware nav link hiding for `/work-v2`
- `apps/web/src/components/layout/SiteLayout.jsx` — Wrapped with WorkViewProvider
- `packages/ui/css/utilities.css` — Added hover:bg-fg-* utility classes
- `packages/ui/src/atoms/icons/svg/view-list.svg` — Converted to path fills, tighter spacing
- `docs/documentation/02-design-system/2.1.0-colors.md` — Documented hover:bg-fg-* classes
- `docs/documentation/02-design-system/2.1.1-colors-cheat-sheet.md` — Added hover bg section, updated count

## Issues Encountered

### 1. Non-existent Icon Reference
- **Problem:** Used `close` icon name which doesn't exist in the icon set
- **Resolution:** Found `cross.svg` via glob search, switched to `Icon name="cross"`

### 2. Phantom Gap When Icon Collapses
- **Problem:** CSS `gap-2` on buttons kept spacing even when icon span was `width: 0`
- **Resolution:** Removed gap, used animated `marginRight` on icon span instead

### 3. Unequal Button Widths
- **Problem:** `flex-1` caused 99px vs 93px due to content width differences
- **Resolution:** Set explicit `width: 96` on both buttons

### 4. replace_all Unintended Targets
- **Problem:** Replacing class names with `replace_all` hit shelf row labels and other elements
- **Resolution:** Manually restored affected elements individually

### 5. Inconsistent Color Approaches
- **Problem:** Mixed opacity-based and fg-* utility approaches for dimming
- **Resolution:** Standardized on `text-fg-80` for inactive text, `text-fg-80` for icons

## Design Decisions

- **Fixed positioning over Navbar embedding** — toggle stays visible when navbar scrolls away
- **bg-fg-04** for containers (subtle, not competing with content)
- **Border hover** (`hover:border-fg-12`) on search icon instead of bg hover
- **Bounce easing** on pill slide (`cubic-bezier(0.34, 1.2, 0.64, 1)`) — subtle 1.2 overshoot
- **Deferred complex icon animation** — path scatter/deconstruct effect was too glitchy, reverted to simple width/opacity

## Next Steps

- Wire search input to actual project filtering logic
- Revisit icon path construction/deconstruction animation (deferred)
- Address mobile behavior (hamburger menu integration)
- Refine ProjectListItem layout for list view
