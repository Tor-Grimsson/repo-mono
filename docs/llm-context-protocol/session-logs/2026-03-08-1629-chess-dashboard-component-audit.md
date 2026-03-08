# Session Log: Chess Dashboard Component Audit & Swaps

**Date:** 2026-03-08
**Status:** Completed

## Overview

Audited all chess dashboard pages (ChessMetrics, DashboardAnalysis, DashboardPerformance) and swapped outdated components for newer ones (DonutChart, LineChart). Fixed rating-trend unreadable x-axis, stacked-wdl cognitive mismatch, monthly-momentum wrong data source, scatter plot data clustering. Added responsive 2-col mobile grid via container queries. Added `fill` prop to LineChart for flex-based height.

## Key Accomplishments

### 1. Rating Trend — Histogram → LineChart
**File:** `apps/web/src/routes/workshop/ChessMetrics.jsx`

Histogram showed raw month strings ("2025-01") as bar labels, rendering as "2222..." on x-axis. Swapped to LineChart with `formatMonthLabel()` for readable labels (first/middle/last months shown). Added `fill` prop to make chart stretch to fill card height.

### 2. Win/Draw/Loss — DashStackedBarCard → DonutChart
**File:** `apps/web/src/routes/workshop/ChessMetrics.jsx`

DashStackedBarCard showed "47.4% win rate" as headline with per-month stacked bars — cognitive mismatch. Replaced with DonutChart (W/D/L segments, win rate center label). Used raw `dash-card` with manual flex layout for centered donut + bottom legend.

### 3. Monthly Momentum — Wrong Data Source Fixed
**File:** `apps/web/src/routes/workshop/ChessMetrics.jsx`

DashSlotCard was using `f.opponentHistogram` (opponent rating spread) for the chart — wrong data for "Monthly momentum". Swapped to LineChart with `f.monthListItems` win rate data + showArea.

### 4. Scatter Plot — Per-Game → Averaged Points
**File:** `apps/web/src/utils/chessMetrics.js`

25,000 individual game dots clustered into one vertical line (all bullet/blitz). Changed to group games by time control value and plot average opponent rating per group. Now shows ~10-15 meaningful points instead of an unreadable cluster.

### 5. DashboardAnalysis DonutChart Swaps
**File:** `apps/web/src/routes/workshop/DashboardAnalysis.jsx`

- Results ledger: DashListCard meter → centered DonutChart with win rate center label
- Time control share: DashListCard meter → centered DonutChart with mode segments

### 6. DashboardPerformance DonutChart + LineChart Swaps
**File:** `apps/web/src/routes/workshop/DashboardPerformance.jsx`

- Result mix: DashListCard meter → centered DonutChart with current win rate center label
- Monthly momentum chart: Histogram → LineChart with win rate trend + showArea

### 7. Responsive Mobile Grid
**Files:** `packages/ui/css/dashboard.css`, `packages/ui/src/dashboards/layout/DashboardGrid.jsx`

Added `dash-grid` CSS class with `@container` queries: 2-col on mobile (<768px), 4-col on desktop (≥768px). `col-span-3` and `col-span-4` clamp to `span 2` on mobile. Replaced Tailwind grid classes with CSS-based responsive grid. Applies to all dashboard pages.

### 8. LineChart `fill` Prop
**File:** `packages/ui/src/dashboards/charts/LineChart.jsx`

Added `fill` boolean prop. When true, removes fixed pixel height and uses `flex-1` + `h-full` so the chart stretches to fill its parent container.

## Files Modified

### Modified Files
- `apps/web/src/routes/workshop/ChessMetrics.jsx` — Swapped stacked-wdl, rating-trend, monthly-momentum blocks; added DonutChart/LineChart imports; changed featured-overview layout span from 3x2 to 2x2
- `apps/web/src/routes/workshop/DashboardAnalysis.jsx` — Swapped results ledger and time control share to centered DonutCharts; added DonutChart import
- `apps/web/src/routes/workshop/DashboardPerformance.jsx` — Swapped result mix to centered DonutChart, momentum chart to LineChart; added DonutChart/LineChart imports
- `apps/web/src/utils/chessMetrics.js` — Scatter plot: per-game points → averaged by time control group
- `packages/ui/src/dashboards/charts/LineChart.jsx` — Added `fill` prop for flex-based height
- `packages/ui/src/dashboards/layout/DashboardGrid.jsx` — Replaced Tailwind grid with `dash-grid` CSS class
- `packages/ui/css/dashboard.css` — Added `dash-grid` responsive grid rules (2-col mobile, 4-col desktop via @container)

## Issues Encountered

### 1. DonutChart Not Centered in Card
- **Problem:** DonutChart rendered top-left aligned inside DashChartCard. The card's `flex-1 min-h-0` content area didn't center the inline-flex donut.
- **Resolution:** Dropped DashChartCard, used raw `dash-card` with manual flex layout: title top, `flex-1 flex items-center justify-center` for donut, legend pinned at bottom.

### 2. LineChart Fixed Height Wasting Space
- **Problem:** LineChart always set a fixed pixel `height` on its container, leaving empty space in taller cards.
- **Resolution:** Added `fill` prop that removes fixed height and uses `flex-1` to stretch to parent.

### 3. Scatter Plot Data Clustering
- **Problem:** 25,000+ dots at nearly identical x-values (all bullet ~60s) rendered as a single vertical line.
- **Resolution:** Grouped games by time control, computed average opponent rating per group. Now ~10-15 meaningful data points.

## Next Steps

- Consider Sparkline integration for metric cards (inline trend indicators)
- Consider Heatmap for time-based analysis (games per hour/day)
- SurfacePreviewGrid deletion (dead code)
- Wide viewport sidebar expansion plan
