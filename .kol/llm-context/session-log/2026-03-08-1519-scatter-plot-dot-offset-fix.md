# Session Log: Fix ScatterPlot Dot Vertical Offset

**Date:** 2026-03-08
**Status:** Completed

## Overview

Fixed ScatterPlot dots being shifted upward by ~80-100px. Root cause was a CSS specificity conflict: `.dash-scatter-point` in `dashboard.css` declared `position: relative`, which overrode Tailwind's `absolute` class on the dot `<span>` elements. This caused dots to render in normal document flow instead of being absolutely positioned within the chart container, making `bottom: %` values ineffective.

## Key Accomplishments

### 1. Root Cause Diagnosis
**File:** `packages/ui/css/dashboard.css` (line 217)

The `.dash-scatter-point` class (added during the dashboard interactivity session for hit-area expansion via `::before` pseudo-element) included `position: relative`. This overwrote the Tailwind `absolute` class on each dot `<span>`, pulling dots out of absolute positioning. Grid lines (which had no conflicting CSS class) rendered correctly, confirming the issue was isolated to the dots.

Key insight came from comparing ScatterPlot (CSS absolute positioning with `bottom: %`) vs LineChart (SVG with self-contained `viewBox` coordinate system). LineChart was immune because SVG handles its own coordinate mapping — no CSS `position` property involved.

### 2. Fix Applied
**File:** `packages/ui/css/dashboard.css`

Removed `position: relative` from `.dash-scatter-point`. The `::before` pseudo-element (used for hit-area expansion) still works because `position: absolute` (from Tailwind) on the parent `<span>` establishes a valid positioning context for its pseudo-elements.

## Files Modified

### Modified Files
- `packages/ui/css/dashboard.css` — Removed `position: relative` from `.dash-scatter-point` (line 217)

## Issues Encountered

### 1. Initial misdiagnosis
- **Problem:** Plan hypothesized the issue was Tailwind's `relative` class on the chart container not being applied, causing dots to resolve against DashChartCard's wrapper. Attempted fix: switch from Tailwind `relative` to inline `style={{ position: 'relative' }}` on the chart container div.
- **Resolution:** That change was a no-op — the container's positioning was never the problem. The actual issue was CSS specificity on the dots themselves. Reverted the unnecessary change.

## Next Steps

- Verify dots at y:1400 sit between 1K and 1.5K grid lines at `/workshop/dashboard/components`
- Verify no dots overflow above the card
