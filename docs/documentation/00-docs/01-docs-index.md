---
title: Documentation Index
type: index
status: active
updated: 2026-02-28
description: Routes into the numbered documentation folders covering foundation, design system, components, pages, workshop, foundry, research, and CDN.
aliases:
  - docs-index
tags:
  - project/kol-monorepo
  - domain/docs
audience: internal
---

## Concept Lookup

| Concept | Index | File |
|---------|-------|------|
| Documentation System | `0.0.0` | INDEX.md |
| Writing Guidelines | `1.4.0` | 07-writing-guidelines.md |
| Documentation Index | `0.0.1` | 01-docs-index.md |
| Colors / Tokens | `2.1.0` | 2.1.0-design-system-colors.md |
| Typography / Type | `2.2.0` | 2.2.0-design-system-typography.md |
| Text Reference | `7.6.2` | 7.6.2-kolkrabbi-text.md |
| Icons | `3.4.0` | 3.4.0-icons.md |
| Templates & Components | `3.7.0` | 3.7.0-design-system-templates-overview.md |
| Home Page | `4.0.1` | 4.0.1-home.md |
| Studio Page | `4.0.2` | 4.0.2-studio.md |
| Stack Page | `4.0.3` | 4.0.3-stack.md |
| Work Page | `4.0.4` | 4.0.4-work.md |
| Workshop Overview | `5.0.0` | 5.0.0-workshop-overview.md |
| Workshop Layout Settings | `5.0.1` | 5.0.1-workshop-settings.md |
| Workshop Sidebar | `5.0.2` | 5.0.2-workshop-sidebar.md |
| Chess Program | `5.1.0` | 5.1.0-chess-analytics-chapter-01.md |
| Analytics Dashboards | `5.2.0` | 5.2.0-analytics.md |
| Social Crawlers & OG Metadata | `1.5.0` | 08-social-crawlers.md |
| Hosting & DNS | `7.6.3` | 7.6.3-hosting-and-dns.md |
| Projects & Use Cases | `7.6.4` | 7.6.4-projects-use-cases.md |

Return only the index number (e.g., `2.1.0`) when someone asks "where is color?" so answers stay consistent.

---

## Active Documents

### 00-docs

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Docs Overview | Active |
| `01-docs-index.md` | Documentation Index (this file) | Active |

### 01-foundation

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Foundation Index | Active |
| `01-repository-structure.md` | Repository Structure | Active |
| `02-naming-conventions.md` | Naming Conventions | Active |
| `03-markdown-parser.md` | Markdown Parser | Active |
| `04-build-system.md` | Build System | Active |
| `05-navigation-system.md` | Navigation System | Active |
| `06-css-architecture.md` | CSS Architecture | Active |
| `07-writing-guidelines.md` | Writing Guidelines | Active |
| `08-social-crawlers.md` | Social Crawlers & OG Metadata | Active |

### 02-design-system

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Design System Overview | Active |
| `01-colors.md` | Color System | Active |
| `02-colors-cheat-sheet.md` | Colors Cheat Sheet | Active |
| `03-typography.md` | Typography | Active |
| `04-typography-cheat-sheet.md` | Typography Cheat Sheet | Active |
| `05-breakpoints.md` | Breakpoints & Responsive Layout | Active |
| `06-breakpoints-cheat-sheet.md` | Breakpoints Cheat Sheet | Active |

### 03-components

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Components Index | Active |
| `01-components-list.md` | Components List | Active |
| `02-icons.md` | Icons | Active |
| `03-templates.md` | Templates | Active |

### 04-pages

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Pages Index | Active |
| `01-home.md` | Home | Active |
| `02-studio.md` | Studio | Active |
| `03-stack.md` | Stack | Active |
| `04-work.md` | Work | Active |
| `4.5.0-foundry.md` | Foundry | Active |
| `05-collections-index.md` | Collections Index | Active |
| `06-grids.md` | Grids | Active |
| `07-illustrations.md` | Illustrations | Active |
| `08-logomarks.md` | Logomarks | Active |
| `09-motion.md` | Motion | Active |

### 05-workshop

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Workshop Index | Active |

### 06-foundry

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Foundry Index | Active |

### 07-research

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | Research Index | Active |

### 08-cdn

| File | Title | Status |
|------|-------|--------|
| `INDEX.md` | CDN Index | Active |

---

## Section Overview

**00-docs** — Documentation about the documentation system itself: the numbering scheme, writing conventions, and this master index.

**01-foundation** — Technical infrastructure: monorepo architecture, naming conventions, build system, navigation system, CSS architecture, writing guidelines, and social crawler / OG metadata implementation.

**02-design-system** — Visual language: color tokens, typography scales, breakpoints, and cheat-sheet reference cards.

**03-components** — UI component library: atoms, icons, templates following atomic design methodology.

**04-pages** — Public site pages: Home, Studio, Stack, Work, Foundry, and Collections sub-pages (grids, illustrations, logomarks, motion).

**05-workshop** — Interactive tools and developer workshop environment.

**06-foundry** — Type foundry documentation.

**07-research** — Research findings informing design decisions.

**08-cdn** — Backblaze B2 bucket layout as consumed by the site. (DevOps/hosting/DNS moved out to the `operations/` sibling — repo machinery, not site subject matter.)
