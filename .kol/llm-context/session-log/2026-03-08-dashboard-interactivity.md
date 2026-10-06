# Session Log: Dashboard Interactivity

**Date:** 2026-03-08
**Status:** In Progress

## Overview

Added 4 interactive features to the dashboard system: chart tooltips, metric card cycling, list item hover effects, and value count-up animation. Tooltip positioning and styling went through multiple iterations — moved from React state-based positioning to CSS custom property approach, fixed opacity/padding issues.

## Key Accomplishments

### 1. Chart Tooltips (CSS Variable Positioning)
**Files:** `packages/ui/src/dashboards/shared/DashTooltip.jsx`, `packages/ui/src/dashboards/shared/useChartTooltip.js`

Tooltip system for Histogram, Candlestick, and ScatterPlot charts. Went through 3 iterations:
- v1: React state for x/y on every mousemove per-element → tooltip stuck to element top, not cursor
- v2: React state with `e.clientX`/`e.clientY` → still re-renders on every mousemove
- v3 (current): Single `onMouseMove` on container sets `--tx`/`--ty` CSS custom properties directly on the DOM. Zero React re-renders for position. `activeIndex` state only tracks which element is hovered.

Tooltip styling issues fixed:
- Removed `box-shadow` (not used in design system)
- Changed background from transparent `color-mix` to opaque `var(--kol-surface-primary)` (bars were visible through tooltip)
- Added `display: inline-flex; align-items: center; line-height: 1;` to match button text centering pattern (JetBrains Mono font metrics cause uneven padding otherwise)
- Tightened padding to `0.125rem 0.25rem`

Also removed `overflow: hidden` from `.dash-card`, DashChartCard wrapper, and chart containers that were clipping tooltips.

### 2. Metric Card Cycling
**File:** `packages/ui/src/dashboards/cards/DashMetricCard.jsx`

New optional `metrics` array prop. When provided, card becomes clickable to cycle through metrics. Includes dot indicators, 150ms fade transition, and useCountUp animation. Backward compatible — direct `label`/`value`/`delta` props still work.

### 3. List Item Hover
**File:** `packages/ui/src/dashboards/cards/DashListCard.jsx`

CSS-only hover effects: background highlight on hover, `detail` field revealed with max-height/opacity transition. Each ListItem wrapped in `.dash-list-item` div.

### 4. Value Count-Up Animation
**File:** `packages/ui/src/dashboards/shared/useCountUp.js`

IntersectionObserver triggers rAF animation on viewport entry. Parses numeric portions from formatted strings (`"1,423"`, `"87%"`, `"2.1K"`), animates number, preserves formatting. Re-runs on value change while visible.

## Files Modified

### New Files
- `packages/ui/src/dashboards/shared/DashTooltip.jsx` — Tooltip component (4 lines, visibility gate + div)
- `packages/ui/src/dashboards/shared/useChartTooltip.js` — Hook: CSS var positioning + activeIndex state
- `packages/ui/src/dashboards/shared/useCountUp.js` — Hook: viewport-triggered numeric animation

### Modified Files
- `packages/ui/css/dashboard.css` — +109 lines: tooltip, chart active state, scatter hit area, list hover/detail reveal, metric cycling dots/fade
- `packages/ui/src/dashboards/cards/DashChartCard.jsx` — Removed `overflow-hidden` from chart wrapper
- `packages/ui/src/dashboards/cards/DashListCard.jsx` — Added `.dash-list-item` wrapper, detail reveal for text/meter variants
- `packages/ui/src/dashboards/cards/DashMetricCard.jsx` — Cycling with `metrics` array, useCountUp, dot indicators, fade transition
- `packages/ui/src/dashboards/charts/Histogram.jsx` — Tooltip integration with containerHandlers
- `packages/ui/src/dashboards/charts/Candlestick.jsx` — Tooltip integration, O/H/L/C grid content
- `packages/ui/src/dashboards/charts/ScatterPlot.jsx` — Tooltip integration, dash-scatter-point hit area
- `packages/ui/src/dashboards/index.js` — Exported DashTooltip, useChartTooltip, useCountUp

## Issues Encountered

### 1. Tooltips Clipped by overflow:hidden
- **Problem:** 3 layers of `overflow: hidden` (`.dash-card` CSS, DashChartCard wrapper, chart containers) clipped absolutely-positioned tooltips
- **Resolution:** Changed `.dash-card` to `overflow: visible`, removed `overflow-hidden` class from DashChartCard and chart container divs

### 2. Tooltip Positioning Stuck to Element Top
- **Problem:** `useChartTooltip` calculated position from `getBoundingClientRect()` of hovered element, not mouse cursor
- **Resolution:** Rewrote to use CSS custom properties (`--tx`/`--ty`) set from `e.clientX`/`e.clientY` on container-level mousemove — no React state for position

### 3. Tooltip Padding Asymmetry
- **Problem:** JetBrains Mono glyph metrics create uneven vertical space in line box, making symmetric CSS padding look asymmetric
- **Resolution:** Added `display: inline-flex; align-items: center; line-height: 1;` — same pattern used by Button component in the design system

### 4. Transparent Tooltip Background
- **Problem:** `color-mix(in srgb, var(--kol-surface-on-primary) 8%, transparent)` is nearly transparent — bars visible through tooltip
- **Resolution:** Changed to opaque `var(--kol-surface-primary)`

## Next Steps

- Verify tooltip appearance across all chart types at all routes
- Test metric card cycling with actual `metrics` array data
- Verify count-up animation triggers on scroll
- Consider whether `.dash-card` `overflow: visible` causes any layout regressions elsewhere
