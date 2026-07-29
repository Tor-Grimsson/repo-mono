---
title: Workshop Index
type: index
status: active
updated: 2026-02-17
created: 2025-12-02
description: Central index routing to every /workshop/* documentation page — foundations, apparatus, mirrors, components, chess, dashboards, and the docs-system pages.
tags:
  - project/kol-monorepo
  - domain/workshop
---

## Overview

Central index for everything under `/workshop/*`. The workshop is the sandbox for live prototypes—foundations, apparatus tools, visual effects, chess analytics, and data dashboards.

---

## Workshop Sections

| Doc | Route | Description |
|-----|-------|-------------|
| [Foundations](./01-foundations.md) | `/workshop/foundations` | Design foundations and core patterns |
| [Apparatus](./02-apparatus.md) | `/workshop/apparat` | Interactive tools and apparatus |
| [Mirrors](./03-mirrors.md) | `/workshop/mirrors` | Hall of Mirrors visual effects |
| [Components](./04-components.md) | `/workshop/components` | Component demonstrations |
| [Chess](./05-chess.md) | `/workshop/chess` | Chess analytics program |
| [Dashboard](./06-dashboard.md) | `/workshop/dashboard` | Data dashboards |
| [Documentation](./07-documentation.md) | `/workshop/design-system/documentation` | Internal documentation viewer |
| [Search Indexer](./08-search-indexer.md) | — | Keyword-based content search |
| [Right Sidebar](./09-right-sidebar.md) | — | TOC rail, sibling nav, default fallback |

---

## Routing

All `/workshop/*` pages mount through `apps/web/src/App.jsx` beneath `<Route path="workshop" element={<Workshop />}>`.

```tsx
<Route path="workshop" element={<Workshop />}>
  <Route element={<WorkshopLayout />}>
    <Route path="foundations" element={<Foundations />} />
    <Route path="apparatus" element={<Apparatus />} />
    <Route path="mirrors" element={<HallOfMirrors />} />
    <Route path="components" element={<Components />} />
    <Route path="chess/*" element={<ChessRoutes />} />
    <Route path="analytics/*" element={<AnalyticsRoutes />} />
  </Route>
</Route>
```

---

## Shared Components

- `WorkshopLayout` - Two-column shell with sidebar
- `WorkshopSidebar` - Intra-section navigation
- `DesPage` - Header wrapper
- `DesSection` - Section container
- `DesCard` - Card component

---

## Changelog

### 2025-12-02 (v2.0.0)
- Restructured to match site routes
- Added foundations, apparatus, components sections
- Renamed effects → mirrors
- Updated numbering: chess (5.5.0), analytics (5.6.0)
