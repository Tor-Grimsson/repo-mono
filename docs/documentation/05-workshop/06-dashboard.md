---
title: Dashboard System
type: reference
status: canonical
updated: 2026-03-08
description: Domain-agnostic dashboard component library in @kol/ui — cards, charts, layout, exports, and dash-* typography tokens.
aliases:
  - dashboard
tags:
  - project/kol-monorepo
  - domain/workshop
  - domain/dashboard
---

## Overview

The Dashboard system provides domain-agnostic data visualization and dashboard components. All card, chart, and layout components live in `@kol/ui` as a reusable library. Workshop pages use chess data from a frozen JSON snapshot, while the standalone `/metrics` page shows live site analytics.

**Package:** `@kol/ui/dashboards`
**Source:** `packages/ui/src/dashboards/`
**Stylesheet:** `packages/ui/css/dashboard.css`

**View in Workshop:** [Dashboard Overview](/workshop/dashboard) · [Components](/workshop/dashboard/components) · [Analysis](/workshop/dashboard/analysis) · [Performance](/workshop/dashboard/performance) · [Metrics](/workshop/dashboard/metrics)

**Standalone:** [Live Metrics](/metrics) (unlisted, no layout chrome)

---

## Navigation & Routes

```
/workshop/dashboard/
├── (index)           → DashboardOverview — page selector
├── components        → DashboardComponents — component showcase
├── analysis          → DashboardAnalysis — full analysis dashboard
├── performance       → DashboardPerformance — rating & performance dashboard
└── metrics           → DashboardMetrics — live site analytics dashboard

/workshop/chess/
└── metrics           → ChessMetrics — interactive chess metrics with filters

/metrics              → Metrics — standalone live analytics (unlisted)
```

| Route | File | Purpose |
|-------|------|---------|
| `/workshop/dashboard` | `DashboardOverview.jsx` | Landing page with links to sub-pages |
| `/workshop/dashboard/components` | `DashboardComponents.jsx` | Showcase of every card and chart variant |
| `/workshop/dashboard/analysis` | `DashboardAnalysis.jsx` | Comprehensive analysis dashboard |
| `/workshop/dashboard/performance` | `DashboardPerformance.jsx` | Rating progression & performance metrics |
| `/workshop/dashboard/metrics` | `DashboardMetrics.jsx` | Live site analytics (Umami, repo, CMS, deploys, B2) |
| `/workshop/chess/metrics` | `ChessMetrics.jsx` | Interactive chess metrics with period/mode/result filters |
| `/metrics` | `Metrics.jsx` | Standalone live analytics page (tabbed, full-screen) |

---

## File Structure

```
packages/ui/src/dashboards/
├── index.js                         # Barrel exports
├── cards/
│   ├── DashMetricCard.jsx           # KPI / single-metric card
│   ├── DashStackedBarCard.jsx       # Stacked bar chart card (compact & full)
│   ├── DashChartCard.jsx            # General-purpose chart wrapper card
│   ├── DashListCard.jsx             # List card (text / meter / ratings)
│   ├── DashFeaturedCard.jsx         # Hero-style featured card
│   ├── DashAlertCard.jsx            # Alert / trend card
│   ├── DashSlotCard.jsx             # Slot card for arbitrary chart content
│   ├── DashTableCard.jsx            # Structured data table card
│   └── _shared/
│       ├── CardHeader.jsx           # Icon + title + subtitle (internal)
│       └── LegendRow.jsx            # Color dot legend row (internal)
├── charts/
│   ├── Histogram.jsx                # Vertical bar histogram with Y-axis
│   ├── Candlestick.jsx              # OHLC candlestick chart
│   ├── ScatterPlot.jsx              # X/Y scatter plot with grid
│   ├── LineChart.jsx                # Line/area chart (single or multi-series)
│   ├── DonutChart.jsx               # Ring/donut chart with segments
│   ├── Sparkline.jsx                # Compact inline trend line
│   └── Heatmap.jsx                  # Grid heatmap visualization
├── layout/
│   ├── DashboardGrid.jsx            # Responsive grid container
│   └── GridCard.jsx                 # Grid cell wrapper with span configs
└── shared/
    ├── DashTooltip.jsx              # Tooltip overlay for chart hover
    ├── useChartTooltip.js           # Shared tooltip state hook
    ├── useCountUp.js                # Animated number count-up hook
    └── formatMetric.js              # Number formatting utilities
```

---

## Exports

All public components are exported from `@kol/ui/dashboards`:

```js
import {
  // Cards
  DashMetricCard,
  DashStackedBarCard,
  DashChartCard,
  DashListCard,
  DashFeaturedCard,
  DashAlertCard,
  DashSlotCard,
  DashTableCard,
  // Charts
  Histogram,
  Candlestick,
  ScatterPlot,
  LineChart,
  DonutChart,
  Sparkline,
  Heatmap,
  // Layout
  DashboardGrid,
  GridCard,
  // Shared
  DashTooltip,
  useChartTooltip,
  useCountUp,
  formatMetric, formatCompact, formatPercent, formatDelta
} from '@kol/ui/dashboards'
```

---

## CSS Classes

Defined in `packages/ui/css/dashboard.css`.

### Grid

| Class | Purpose |
|-------|---------|
| `.dash-grid` | Responsive grid container — 2-col mobile, 4-col desktop via `@container` queries |

`.dash-grid` provides: `display: grid`, `grid-auto-flow: dense`, `grid-template-columns: repeat(2, 1fr)` (mobile), `repeat(4, 1fr)` at `@container (min-width: 768px)`. Gaps scale from `1rem` to `1.25rem` at 768px to `1.5rem` at 1280px. Cards with `col-span-3` or `col-span-4` clamp to `span 2` on mobile and restore at 768px.

### Card Base

| Class | Purpose |
|-------|---------|
| `.dash-card` | Shared card container — flex column, gap, padding, background, border, radius |
| `.dash-card__footer` | Card footer — auto margin-top, top border, padding |

`.dash-card` provides: `display: flex`, `flex-direction: column`, `gap: 1rem`, `padding: 1.5rem`, `background: 2% on-primary`, `border: 1px solid 4% on-primary`, `border-radius: 0.25rem`.

`.dash-card__footer` provides: `margin-top: auto`, `padding-top: 1rem`, `border-top: 1px solid 8% on-primary`.

### Chart Utilities

| Class | Purpose |
|-------|---------|
| `.chart__dot` | 8px circle, uses `--chart-color-value` |
| `.chart__segment` | SVG stroke element, uses `--chart-color-value` |
| `.chart__bar-fill` | Bar fill with rounded ends, uses `--chart-color-value` |
| `.is-muted` | Modifier — reduces opacity to 0.35 |

### Chart Colors

Each class sets `--chart-color-value` to the corresponding palette variable:

| Class | Color Variable |
|-------|---------------|
| `.chart-color-blue` | `--kol-palette-blue` |
| `.chart-color-green` | `--kol-palette-green` |
| `.chart-color-yellow` | `--kol-palette-yellow` |
| `.chart-color-red` | `--kol-palette-red` |
| `.chart-color-orange` | `--kol-palette-orange` |
| `.chart-color-purple` | `--kol-palette-purple` |
| `.chart-color-teal` | `--kol-palette-teal` |

These consume the palette tokens defined in `packages/ui/theme.css`:

```css
--kol-palette-blue:   #49a0a2;
--kol-palette-green:  #66a44c;
--kol-palette-yellow: #ffe32e;
--kol-palette-red:    #ce4646;
--kol-palette-orange: #db8000;
--kol-palette-purple: #9437FF;
--kol-palette-teal:   #49a0a2;
```

The same palette is consumed by `.tag--*` classes in `components.css` and chess-specific `.chart-color-blitz`, `.chart-color-bullet`, etc. in `chess.css`.

---

## Card Components

All cards use the `.dash-card` base class. Every card accepts a `className` prop for additional styling.

### DashMetricCard

Single KPI metric with optional accent border and delta.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Uppercase label text |
| `value` | string/node | — | Primary metric value |
| `delta` | string/node | — | Change indicator (e.g. "+12.5%") |
| `borderColor` | string | — | Left border accent color (CSS value) |
| `className` | string | `''` | Additional classes |

### DashStackedBarCard

Stacked bar visualization with win/draw/loss segments. Has two modes: **full** (default) and **compact** (when `icon` is provided).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Card title |
| `value` | string/node | — | Primary metric |
| `data` | array | `[]` | Array of `{ win, draw, loss, total }` objects |
| `icon` | string | — | Icon name (triggers compact mode) |
| `label` | string | — | Compact mode: label next to value |
| `trend` | `'up'`/`'down'` | — | Compact mode: trend arrow direction |
| `footerLeft` | string/node | — | Left footer text |
| `footerRight` | string/node | — | Right footer text |
| `className` | string | `''` | Additional classes |

### DashChartCard

General-purpose card for wrapping chart content with header, badge, legends, and footer.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Card title (via CardHeader) |
| `subtitle` | string | — | Subtitle text |
| `icon` | string | — | Header icon name |
| `badge` | string/node | — | Badge (top-right) |
| `metricLabel` | string | — | Metric label (top-right) |
| `currentValue` | string/node | — | Current value display |
| `legends` | array | `[]` | Legend items `{ label, detail?, color? }` |
| `footer` | string/node | — | Footer text (uses `.dash-card__footer`) |
| `children` | node | — | Chart content |
| `className` | string | `''` | Additional classes |

### DashListCard

List card with three display variants: **text**, **meter**, and **ratings**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Card title (via CardHeader) |
| `subtitle` | string | — | Subtitle text |
| `icon` | string | — | Header icon name |
| `badge` | string/node | — | Badge (top-right) |
| `items` | array | `[]` | List items (shape depends on variant) |
| `variant` | `'text'`/`'meter'`/`'ratings'` | `'text'` | Display variant |
| `barColor` | string | `var(--kol-palette-yellow)` | Meter bar color |
| `footer` | string/node | — | Footer text (uses `.dash-card__footer`) |
| `className` | string | `''` | Additional classes |

**Item shapes by variant:**

- `text`: `{ label, value }`
- `meter`: `{ label, value, percent, color? }`
- `ratings`: `{ label, value, detail?, color? }`

### DashFeaturedCard

Large hero-style card with badge, icon, description, metric, chart slot, and legend row.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `badge` | string/node | — | Badge text (top-left) |
| `title` | string | — | Card title |
| `icon` | string | — | Title icon name |
| `description` | string | — | Description text |
| `metricLabel` | string | — | Metric label (top-right) |
| `metricValue` | string/node | — | Metric value (top-right) |
| `chart` | node | — | Chart content slot |
| `legends` | array | `[]` | Legend items `{ label, detail?, color? }` (wraps) |
| `className` | string | `''` | Additional classes |

### DashAlertCard

Alert/trend card showing a primary metric with trend indicator and alert items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Metric label |
| `value` | string/node | — | Primary metric value |
| `trend` | `'up'`/`'down'` | `'up'` | Trend direction |
| `trendValue` | string/node | — | Trend badge content |
| `alerts` | array | `[]` | Alert items `{ title, description }` |
| `footer` | string/node | — | Footer text (uses `.dash-card__footer`) |
| `className` | string | `''` | Additional classes |

### DashSlotCard

Flexible slot card for embedding arbitrary chart content with optional item grid and footer.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Card title (via CardHeader) |
| `subtitle` | string | — | Subtitle text |
| `icon` | string | — | Header icon name |
| `chart` | node | — | Chart content slot (min-height 180px) |
| `items` | array | `[]` | Grid items `{ label, value }` (2-col / 4-col at lg) |
| `footer` | object | — | Footer `{ label, value }` |
| `className` | string | `''` | Additional classes |

### DashTableCard

Structured data table card with columns and rows.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Card title (via CardHeader) |
| `subtitle` | string | — | Subtitle text |
| `icon` | string | — | Header icon name |
| `columns` | array | `[]` | Column definitions `{ key, label, align? }` |
| `rows` | array | `[]` | Row objects keyed by column keys |
| `footer` | string/node | — | Footer text |
| `className` | string | `''` | Additional classes |

---

## Shared Sub-Components

Internal to `packages/ui/src/dashboards/cards/_shared/`. Not exported from the barrel.

### CardHeader

Icon + title + subtitle block. Used by DashChartCard, DashListCard, DashSlotCard, DashTableCard.

| Prop | Type | Description |
|------|------|-------------|
| `icon` | string | Icon name (optional) |
| `title` | string | Heading text |
| `subtitle` | string | Subtitle text (optional) |

### LegendRow

Horizontal row of color-dot legends. Used by DashChartCard, DashFeaturedCard.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legends` | array | `[]` | Items `{ label, detail?, color? }` |
| `wrap` | boolean | `false` | Allow wrapping |

Default colors cycle: `--kol-palette-yellow` (first), `--kol-palette-purple` (rest). Override per-item with `color`.

---

## Chart Components

### Histogram

Vertical bar chart with Y-axis labels (max, midpoint, 0) and X-axis range labels.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | `[]` | Items `{ count, range }` |
| `height` | number | `288` | Chart height in pixels |
| `barColor` | string | `var(--kol-accent-primary)` | Bar fill color |

### Candlestick

OHLC candlestick chart with horizontal grid lines.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | `[]` | Items `{ open, high, low, close, variant? }` |
| `height` | number | `288` | Chart height in pixels |

Colors driven by `variant`: `'accent'` uses `--kol-palette-yellow`, `'neutral'` uses `--kol-palette-purple`.

### ScatterPlot

X/Y scatter plot with configurable axes and grid lines.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | `[]` | Points `{ x, y }` |
| `maxX` | number | `200` | X-axis maximum |
| `maxY` | number | `3000` | Y-axis maximum |
| `xLabels` | array | `[]` | X-axis grid line values |
| `yLabels` | array | `[]` | Y-axis grid line values |
| `pointColor` | string | `var(--kol-palette-blue)` | Point fill color |
| `height` | number | `320` | Chart height in pixels |

Y-axis labels auto-format large numbers (e.g. `2500` -> `2.5K`).

### LineChart

Line/area chart supporting single or multi-series data.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | — | Single series: `[{ y }]` (uses accent color) |
| `series` | array | — | Multi-series: `[{ data: [{ y }], color, fill? }]` |
| `height` | number | `240` | Chart height in pixels (ignored when `fill`) |
| `fill` | boolean | `false` | Stretch to fill parent container height |
| `xLabels` | array | — | X-axis labels (evenly distributed) |
| `yLabels` | array | — | Y-axis labels (top to bottom) |
| `showArea` | boolean | `false` | Fill area under the line (gradient) |
| `showDots` | boolean | `false` | Show data point dots |

Use `data` for a single line or `series` for multiple colored lines. The `fill` prop removes the fixed height and uses `flex-1` to stretch within a flex parent (useful inside DashChartCard).

### DonutChart

Ring/donut chart with proportional segments and optional center label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `segments` | array | `[]` | Items `{ value, label, color }` |
| `size` | number | `120` | SVG diameter in pixels |
| `thickness` | number | `20` | Ring stroke width |
| `centerLabel` | string/node | — | Text shown in the center |
| `showLegend` | boolean | `false` | Show color dot legend below |

For centered layout in a card, wrap in a flex container:
```jsx
<div className="dash-card h-full flex flex-col">
  <div className="dash-body text-fg-88">Title</div>
  <div className="flex-1 flex items-center justify-center min-h-0">
    <DonutChart segments={segments} size={200} centerLabel="47%" />
  </div>
  {/* legend at bottom */}
</div>
```

### Sparkline

Compact inline trend line for embedding in metric cards or list items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | `[]` | Points `[{ y }]` |
| `width` | number | `80` | SVG width |
| `height` | number | `24` | SVG height |
| `color` | string | `var(--kol-accent-primary)` | Line stroke color |

### Heatmap

Grid-based heatmap for time or category-based data.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | `[]` | 2D array of values |
| `xLabels` | array | `[]` | Column labels |
| `yLabels` | array | `[]` | Row labels |
| `color` | string | `var(--kol-palette-green)` | Heat color (opacity scales with value) |

---

## Layout Components

### DashboardGrid

Responsive CSS grid container using `@container` queries. Renders 2 columns on mobile, 4 columns on desktop.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Additional classes |
| `children` | node | — | GridCard components |

Uses the `.dash-grid` CSS class which provides:
- **< 768px container**: `grid-template-columns: repeat(2, 1fr)`, `gap: 1rem`
- **>= 768px container**: `grid-template-columns: repeat(4, 1fr)`, `gap: 1.25rem`
- **>= 1280px container**: `gap: 1.5rem`
- `grid-auto-flow: dense` for backfilling gaps from multi-row spans
- `col-span-3` and `col-span-4` clamp to `span 2` on mobile

### GridCard

Grid cell wrapper with column/row span configurations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `span` | string | `'1x1'` | Span preset (columns x rows) |
| `className` | string | `''` | Additional classes |
| `children` | node | — | Card content |
| `asCard` | boolean | `false` | Apply `.dash-card` styling |

**Span presets:**

| Preset | Grid Classes |
|--------|-------------|
| `'1x1'` | `col-span-1 row-span-1` |
| `'2x1'` | `col-span-2 row-span-1` |
| `'2x2'` | `col-span-2 row-span-2` |
| `'3x1'` | `col-span-3 row-span-1` |
| `'3x2'` | `col-span-3 row-span-2` |
| `'4x1'` | `col-span-4 row-span-1` |
| `'4x2'` | `col-span-4 row-span-2` |
| `'4x3'` | `col-span-4 row-span-3` |
| `'1x2'` | `col-span-1 row-span-2` |

---

## Shared Utilities

Exported from `@kol/ui/dashboards`:

### useChartTooltip

Hook for chart hover interactions. Returns `{ activeIndex, handlers, containerHandlers, containerRef }`.

### useCountUp

Animated number counter using IntersectionObserver + requestAnimationFrame. Triggers when element scrolls into view.

### formatMetric / formatCompact / formatPercent / formatDelta

Number formatting utilities for dashboard display values.

---

## Data Sources

### Chess Data (Workshop)

Workshop dashboard pages use chess data as a reference implementation.

- **Static snapshot:** `apps/web/src/data/chessAnalyticsSnapshot.json` — frozen JSON used by DashboardAnalysis and DashboardPerformance
- **Dynamic computation:** `apps/web/src/utils/chessMetrics.js` — `computeLightweightMetrics()` (from monthly summary) and `computeFullMetrics()` (from full game dataset) used by ChessMetrics
- **Helpers:** `apps/web/src/utils/chessHelpers.js` — `formatCompactNumber`, `formatMonthLabel`, etc.
- **Chess styles:** `packages/ui/css/chess.css` — time-class color mappings

### Live Site Analytics (/metrics)

The standalone `/metrics` page and workshop `/dashboard/metrics` show live data from 5 API endpoints.

- **Shared hook:** `apps/web/src/hooks/useMetricsData.js` — fetches from `/api/metrics`, `/api/metrics-repo`, `/api/metrics-sanity`, `/api/metrics-deploys`, `/api/metrics-b2`
- **Data sources:** Umami analytics (kol-umami.vercel.app + Neon PostgreSQL), GitHub repo stats, Sanity CMS, Vercel deployments, Backblaze B2 storage
- **Exports:** `useMetricsData` (hook), `RANGES`, `DEPLOY_STATE_COLORS`, `DEPLOY_STATE_LABELS`, `TYPE_COLORS`, `durationBuckets`, `formatB2Size`, `timeAgo`, fallback constants

Components are fully domain-agnostic. Card and chart components accept generic props and have no domain-specific logic.

---

## Design Tokens

### Colors

All chart and data visualization colors use the shared palette from `theme.css`:

| Token | Hex | Usage |
|-------|-----|-------|
| `--kol-palette-blue` | `#49a0a2` | ScatterPlot points, tags, general data |
| `--kol-palette-green` | `#66a44c` | Positive states, wins, tags |
| `--kol-palette-yellow` | `#ffe32e` | Candlestick accent, default legend color, tags |
| `--kol-palette-red` | `#ce4646` | Alerts, losses, negative states, tags |
| `--kol-palette-orange` | `#db8000` | Secondary data, tags |
| `--kol-palette-purple` | `#9437FF` | Candlestick neutral, secondary legend, tags |
| `--kol-palette-teal` | `#49a0a2` | Supplementary data, tags |

### Typography System

Dashboard components use a self-contained type system built on **JetBrains Mono** (Regular 400, Medium 500), defined in `packages/ui/css/dashboard.css`. These `dash-*` classes are independent from the main `kol-*` typography and use `@container` queries instead of `clamp()`, responding to the **container width** rather than the viewport. `DashboardGrid` provides `container-type: inline-size` as the query context.

**Font token:** `--kol-font-family-dash` — `'JetBrains Mono', 'SFMono-Regular', Consolas, monospace`

| Class | Weight | Size (base -> @768px -> @1024px) | Line Height | Usage |
|-------|--------|------------------------|-------------|-------|
| `.dash-title` | 500 | `16px -> 20px` | 120% | Card titles (via CardHeader) |
| `.dash-value` | 500 | `24px -> 28px -> 32px` | 120% | Primary KPI values, large metrics |
| `.dash-subtitle` | 500 | `16px -> 22px` | 125% | Secondary values, stacked bar card metrics |
| `.dash-body` | 400 | `12px -> 14px` | 125% | List items, alert descriptions, badge text |
| `.dash-detail` | 400 | `10px -> 12px` | 120% | Labels, subtitles, footer text |
| `.dash-caption` | 400 | `8px -> 10px -> 11px` | 120% | Chart axis labels, legend labels |

See [Typography](../02-design-system/03-typography.md#dashboard-typography-jetbrains-mono) and [Typography Cheat Sheet](../02-design-system/04-typography-cheat-sheet.md#dashboard-typography-jetbrains-mono) for the full type system reference.

### Foreground Opacity Classes

| Class | Usage |
|-------|-------|
| `text-fg-64` | Subtitles, labels, footer text, axis labels |
| `text-fg-80` | List item labels, descriptions |
| `text-fg-88` | Icons, list item values, legend labels |
| `border-fg-08` | Grid lines, card footer borders |

---

## Related Documentation

- `2.1.0-design-system-colors.md` — Color token system and palette definitions
- `2.2.0-design-system-typography.md` — Typography scales (includes dashboard `dash-*` system)
- `3.0.0-design-system-components.md` — Component structure standards
- `04-integrations.md` — Umami analytics integration details
