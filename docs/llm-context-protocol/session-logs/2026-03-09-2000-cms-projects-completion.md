# Session Log: CMS Projects Completion — Types, Frontmatter & SEO

**Date:** 2026-03-09
**Status:** Completed

## Overview

Completed the full CMS projects planning pass. Created content for projects 18–23, introduced a 4th project type (`system`), converted all 23 project files to Obsidian-friendly YAML frontmatter format, and generated SEO titles/descriptions for every project.

## Key Accomplishments

### 1. Projects 18–23 — New Content
Created full entries with structure trees, ASCII diagrams, and links:

- **18. Kol Mirror** (tool) — image distortion playground, 6 halls, 9 filter variants, 3 diagrams (rendering pipelines, hall architecture, control flow)
- **19. Chess** (system) — 27,200-game analytics, data pipeline + board apparatus + metrics dashboard, 5 diagrams (pipeline, board state, metrics, ASCII board, stats card)
- **20. Dashboard** (system) — reusable dashboard framework, 10 cards + 7 charts, 3 diagrams (architecture, grid system, data flow)
- **21. Design System** (system) — token-driven system, 69 colors + 157 icons + 76 components, 3 diagrams (token architecture, theming, component hierarchy)
- **22. ASCII Card** (system) — scroll-driven Instagram section, ASCII density layers, 3 diagrams (scroll timeline, density field, Space Invader sprite)
- **23. Foundry** (system) — type specimen system, 5 typefaces + 40+ specimens, 3 diagrams (data→UI, component hierarchy, variable font axes)

### 2. Fourth Project Type: `system`
- Added `system` type for projects 19–23 (chess, dashboard, design-system, ascii-card, foundry)
- Updated template: `client / collection / tool / system`
- Updated index and detail files with 4-type sections
- Client field hidden for collection, tool, and system types

### 3. YAML Frontmatter Conversion (All 23 Files)
Converted every project file from markdown table format to Obsidian-friendly YAML frontmatter:

- Frontmatter fields: title, type, slug, client (if applicable), year, description, about, tags (list), links (list of label/url), seo_title, seo_description
- Media moved from table to body content as checkbox list (`- [ ] Thumbnail`, etc.)
- Nested YAML objects avoided (Obsidian renders them as JSON strings)
- SEO fields flattened to `seo_title` / `seo_description` in frontmatter

### 4. SEO Titles & Descriptions (All 23 Files)
Generated for every project following format:
- `seo_title`: "Title — Category | Kolkrabbi" (≤60 chars)
- `seo_description`: Active voice summary (≤160 chars)

### 5. Index File Updates
- **cms-projects-index.md**: Rewritten with 4 type sections (Client 1–9, Collection 10–12, Tool 13–18, System 19–23)
- **cms-projects-detail.md**: Rewritten with matching 4 type sections
- **cms-projects-audit.md**: Updated type names, added new projects, resolved open questions
- **cms-projects-template.md**: Updated type field to include `system`

### 6. Kol Mirror Rename
- "Hall of Mirrors" renamed to "Kol Mirror" across all files
- File renamed from `18-hall-of-mirrors.md` → `18-kol-mirror.md`

## Files Modified

### New Files
- `docs/cms-projects/projects/18-kol-mirror.md` — Full content (was placeholder)
- `docs/cms-projects/projects/19-chess.md` — Full content (was empty)
- `docs/cms-projects/projects/20-dashboard.md` — Full content (new)
- `docs/cms-projects/projects/21-design-system.md` — Full content (new)
- `docs/cms-projects/projects/22-ascii-card.md` — Full content (new)
- `docs/cms-projects/projects/23-foundry.md` — Full content (new)

### Modified Files (Frontmatter Conversion + SEO)
- `docs/cms-projects/projects/1-aftra.md`
- `docs/cms-projects/projects/2-folio-3.md`
- `docs/cms-projects/projects/3-folio-2.md`
- `docs/cms-projects/projects/4-kaffistofan.md`
- `docs/cms-projects/projects/5-exmon.md`
- `docs/cms-projects/projects/6-folio-1.md`
- `docs/cms-projects/projects/7-canalix.md`
- `docs/cms-projects/projects/8-kolkrabbi.md`
- `docs/cms-projects/projects/9-flik.md`
- `docs/cms-projects/projects/10-illustrations.md`
- `docs/cms-projects/projects/11-grids.md`
- `docs/cms-projects/projects/12-motion-graphics.md`
- `docs/cms-projects/projects/13-kol-modulator.md`
- `docs/cms-projects/projects/14-kol-radial.md`
- `docs/cms-projects/projects/15-kol-editor.md`
- `docs/cms-projects/projects/16-kol-noter.md`
- `docs/cms-projects/projects/17-kol-distress.md`
- `docs/cms-projects/cms-projects-index.md`
- `docs/cms-projects/cms-projects-detail.md`
- `docs/cms-projects/cms-projects-audit.md`
- `docs/cms-projects/cms-projects-template.md`

## Decisions Made

- **4 project types**: `client` (1–9), `collection` (10–12), `tool` (13–18), `system` (19–23)
- **`system` over `showcase`**: "showcase" felt like a product; "system" better describes internal infrastructure
- **Flat SEO fields**: `seo_title`/`seo_description` instead of nested `seo:` object (Obsidian limitation)
- **Media as body content**: checkbox list in body, not frontmatter (Obsidian can't display nested booleans)
- **WebGL tag for Kol Mirror**: replaces "Creative Coding" since PixiJS is the differentiator from SVG-only tools
- **Foundry description**: "Type foundry." kept minimal — specimen feature may be removed later
- **Chess `system` type**: data parsing + analytics fits "system" better than "tool"

## Issues Encountered

### 1. Obsidian Nested YAML Objects
- **Problem:** Obsidian Properties panel renders nested objects (media, seo) as JSON strings
- **Resolution:** Flattened SEO to `seo_title`/`seo_description`, moved media to body as checkbox list

### 2. Hall Architecture Diagram
- **Problem:** Symphony was drawn as peer to other halls instead of as a mixer below them
- **Resolution:** Redrew with Symphony positioned below Displacement/Movement/Copies with arrows feeding in

### 7. Gallery Pairing Tables (All 20 Projects)
Added gallery pairing suggestions to 20 project files (skipped folios 2, 3, 6):
- **Client projects (1, 4, 5, 7, 8, 9):** Slot-by-slot suggestions based on project tags and content type
- **Collections (10, 11, 12):** Single-cycle suggestions (6 slots), adapted for collection format
- **Tools (13–18) and Systems (19–23):** Full 12-slot suggestions + ASCII/Diagram Options subsection with 3 alternatives for using existing structure trees and ASCII art as gallery visuals (5:4 composites, 4:5 vertical pairs, hero placeholders)

### 8. Figma MCP Server
Installed Figma official MCP server for creating gallery frames directly in Figma:
```
claude mcp add --transport http figma https://mcp.figma.com/mcp
```
Added to user-level `.claude` config. Requires conversation restart to load tools.

## Next Steps

- **Figma gallery frames** — restart conversation, authenticate with Figma, create frames at correct aspect ratios per project
- Sanity schema implementation: `type` field, conditional Client visibility, `media[]` mixed array
- Workshop iframe embed fix (cookie partitioning issue for kol-editor, kol-noter, kol-distress)
- Check if home.jsx hero animation stops when not in view
- Rename workshop routes to match new slugs (e.g. `radial-editor` → `kol-radial`)
