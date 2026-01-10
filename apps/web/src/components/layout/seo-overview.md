---
version: 0.0.2
date: 2026-01-10
status: active
content-type: reference
category: metadata
cross-references:
  parent: 0.0.0
  children: []
  related:
    - 0.0.1
  deprecated-by: []
  replaces: []
---

# 0.0.2 Metadata: SEO Overview

## Overview
This document defines the SEO content rules used by `apps/web/src/components/layout/SEO.jsx` and summarizes the required copy for each route.

## Defaults
- `ogImage`: `https://kolkrabbi.io/img/open-graph/open-graph-03.png`
- `ogType`: `website`
- `twitterCard`: `summary_large_image`
- `ogTitle`: falls back to `title`
- `ogDescription`: falls back to `description`

## Rules
- Use one description string for both `description` and `ogDescription`.
- Use the patterns below for dynamic pages; only the item name changes.
- Keep Home at the top of the list.

## Patterns

### Foundry typefaces
- Description pattern: `<Typeface name> typeface by Kolkrabbi`
- Example: `Málrómur typeface by Kolkrabbi`

### Prints
- Description pattern: `<Print name> print by Kolkrabbi`
- Example: `Midnight print by Kolkrabbi`

### Stack articles
- Description pattern: `<Article title> article by Kolkrabbi`
- Example: `Kol Radial Editor article by Kolkrabbi`

### Work
- Description pattern: `<Project name> by Kolkrabbi`
- Example: `Aftra by Kolkrabbi`

## Route SEO Content

### Home (top priority)
- Route: `/`
- Title: `Kolkrabbi Studio`
- Description + `ogDescription`: `Design studio, atelier & type foundry`
- `ogTitle`: `Kolkrabbi — design studio, atelier & type foundry`

### Stack
- Route: `/stack`
- Title: `Stack — Articles and Word Womits by Kolkrabbi`
- Description + `ogDescription`: `Articles and word womits by Kolkrabbi`
- `ogTitle`: `Stack — Articles and Word Womits by Kolkrabbi`

### Studio
- Route: `/studio`
- Title: `Studio — Kolkrabbi`
- Description + `ogDescription`: `Kolkrabbi studio`
- `ogTitle`: `Kolkrabbi Studio`

### Work
- Route: `/work`
- Title: `Client Projects by Kolkrabbi`
- Description + `ogDescription`: `Client projects by Kolkrabbi`
- `ogTitle`: `Client Projects by Kolkrabbi`

### Collections
- Route: `/collections`
- Title: `Visual Design Collections — Kolkrabbi`
- Description + `ogDescription`: `Visual design collections: illustrations, logomarks, grids, and motion graphics`
- `ogTitle`: `Visual Design Collections`

### Collections: Illustrations
- Route: `/collections/illustrations`
- Title: `Visual Design Collections — Illustrations`
- Description + `ogDescription`: `Visual design collections: illustrations, logomarks, grids, and motion graphics`
- `ogTitle`: `Visual Design Collections`

### Collections: Logomarks
- Route: `/collections/logomarks`
- Title: `Visual Design Collections — Logomarks`
- Description + `ogDescription`: `Visual design collections: illustrations, logomarks, grids, and motion graphics`
- `ogTitle`: `Visual Design Collections`

### Collections: Grids
- Route: `/collections/grids`
- Title: `Visual Design Collections — Grids`
- Description + `ogDescription`: `Visual design collections: illustrations, logomarks, grids, and motion graphics`
- `ogTitle`: `Visual Design Collections`

### Collections: Motion Graphics
- Route: `/collections/motion-graphics`
- Title: `Visual Design Collections — Motion Graphics`
- Description + `ogDescription`: `Visual design collections: illustrations, logomarks, grids, and motion graphics`
- `ogTitle`: `Visual Design Collections`

### Foundry
- Route: `/foundry`
- Title: `Kolkrabbi — Foundry`
- Description + `ogDescription`: `Kolkrabbi foundry`
- `ogTitle`: `Kolkrabbi Foundry`
- `ogImage`: `/img/open-graph-foundry/open-graph-foundry.jpg`

### Foundry: Typefaces
- Route: `/foundry/typefaces`
- Title: `Foundry — Typefaces`
- Description + `ogDescription`: `Kolkrabbi typefaces`
- `ogTitle`: `Kolkrabbi Typefaces`

### Foundry: Individual typefaces
- Routes: `/foundry/typefaces/{slug}`
- Title pattern: `<Typeface name> — Typeface | Kolkrabbi Foundry`
- Description + `ogDescription`: use the Foundry typeface pattern above
- `ogTitle`: `<Typeface name> — Typeface`
- `ogImage` mapping: Dylgjur → `/img/open-graph-foundry/open-graph-dylgjur.jpg`
- `ogImage` mapping: Gullhamrar → `/img/open-graph-foundry/open-graph-gullhamrar.jpg`
- `ogImage` mapping: Málrómur → `/img/open-graph-foundry/open-graph-malromur.jpg`
- `ogImage` mapping: Rót → `/img/open-graph-foundry/open-graph-rot.jpg`
- `ogImage` mapping: Tröllatunga → `/img/open-graph-foundry/open-graph-trollatunga.jpg`

### Foundry: Specimens
- Route: `/foundry/specimen`
- Title: `Foundry — Specimens`
- Description + `ogDescription`: `Kolkrabbi specimen`
- `ogTitle`: `Kolkrabbi Specimen`

### Foundry: Individual specimens
- Routes: `/foundry/specimen/{slug}`
- Title pattern: `<Typeface name> Specimen — Kolkrabbi Foundry`
- Description + `ogDescription`: use the Foundry typeface pattern above
- `ogTitle`: `<Typeface name> Type Specimen`

### Foundry: Licensing
- Route: `/foundry/licensing`
- Title: `Foundry Licensing — Kolkrabbi Foundry`
- Description + `ogDescription`: `Foundry licensing`
- `ogTitle`: `Foundry Licensing Information`

### Foundry: Prose Styles
- Route: `/foundry/prose-styles`
- Title: `Prose Styles — Kolkrabbi Foundry`
- Description + `ogDescription`: `Prose styles`
- `ogTitle`: `Prose Styles`

### Prints
- Route: `/prints`
- Title: `Prints – Kolkrabbi`
- Description + `ogDescription`: `Prints by Kolkrabbi`
- `ogTitle`: `Prints — Kolkrabbi`

### Prints: Individual print
- Routes: `/prints/{slug}`
- Title pattern: `<Print name> — Kolkrabbi Prints`
- Description + `ogDescription`: use the Prints pattern above
- `ogTitle`: `<Print name> — Kolkrabbi Prints`
