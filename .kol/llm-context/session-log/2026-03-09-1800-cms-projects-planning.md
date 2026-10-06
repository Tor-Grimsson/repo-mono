# Session Log: CMS Projects Planning & Content Authoring

**Date:** 2026-03-09
**Status:** In Progress

## Overview

Comprehensive planning pass through `docs/cms-projects/` — restructured the CMS project schema, cleaned up all project copy, established tone of voice conventions, and documented 5 new tool-type projects with structure trees and ASCII diagrams.

## Key Accomplishments

### 1. Media Deliverables & Layout Doc Overhaul
**File:** `docs/cms-projects/cms-projects-layout.md`

- Added media deliverables table at top (thumbnail, hero, gallery specs)
- Gallery aspect ratios: 4:3 → 5:4 (mirrors 4:5 portrait, avoids PAL feel)
- Thumbnail aspect: 4:3 (not 1:1)
- Gallery constraint: must be multiple of 6 images
- Mixed media: `images[]` → `media[]` (image or video per slot)
- Removed SVG field, removed technical CSS details, kept it as planning reference
- Updated overlay metadata labels: Services → Tags

### 2. Schema Changes
**Files:** `docs/cms-projects/cms-projects-template.md`, all 23 project files

- Added `Type` field: `client` / `collection` / `tool`
- Renamed `Services` → `Tags` across all files
- Removed `Timeframe`, `Order`, `Featured`, `Published`, `Fonts`, `SVG` fields
- Client field hidden when type is `collection` or `tool`
- Optional `Links` section: Live URL, Repo URL, Workshop route

### 3. Detail File Deduplication
**File:** `docs/cms-projects/cms-projects-detail.md`

- Replaced inline data with hyperlinks to individual `projects/*.md` files
- Single source of truth now lives in project files only

### 4. Copy Polish — Client Projects (1–9)
Rewrote descriptions and about text following writing guidelines:
- Aftra: broader description, rewritten about, year → 2026, Web Design casing
- Folios 1–3: unified description/about/tags (`Logo Design, Brand Marks, Form Design`)
- Kaffistofan: description expanded
- Exmon: client capitalized, description rewritten, about tightened (no "we"), tags unified
- Canalix: description + about rewritten (dropped self-congratulatory tone), tags cased
- Kolkrabbi: client → Personal, description + about rewritten, tags updated
- Flík: description + about rewritten, tags trimmed to `Visual Identity, Logo Design`

### 5. Copy Polish — Collections (10–12)
- Illustrations, Grids, Motion Graphics: descriptions + about text written, years → 2026
- Type set to `collection`, Client field removed

### 6. Tool Projects (13–17) — New Entries
Created full entries with structure trees, ASCII diagrams, and links:

- **13. Kol Modulator** — interactive frequency visualizer, 4 diagrams (waveform geometry, circle pairs, data flow, UI layout)
- **14. Kol Radial** — parametric waveform vector editor, full structure tree + 6 diagrams (geometry, presets, LFO, mirror, data flow, UI)
- **15. Kol Editor** — vector design editor, structure tree + 3 diagrams (UI, render pipeline, filter pipeline)
- **16. Kol Noter** — hierarchical note-taking system, structure tree + 3 diagrams (data hierarchy, persistence flow, UI)
- **17. Kol Distress** — SVG distortion tool, structure tree + 2 diagrams (distortion pipeline, UI)

### 7. Tone Skill
**File:** `.claude/skills/tone/SKILL.md`

Created `/tone` Claude Code skill for loading writing guidelines before copywriting tasks.

## Files Modified

### New Files
- `.claude/skills/tone/SKILL.md` — Tone of voice skill
- `docs/llm-context-protocol/session-logs/2026-03-09-1800-cms-projects-planning.md` — This log

### Modified Files
- `docs/cms-projects/cms-projects-layout.md` — Media deliverables, 5:4 ratio, mixed media
- `docs/cms-projects/cms-projects-template.md` — Type field, removed fields, Links section
- `docs/cms-projects/cms-projects-detail.md` — Replaced with hyperlink index
- `docs/cms-projects/projects/1-aftra.md` — Description, about, year, tags
- `docs/cms-projects/projects/2-folio-3.md` — Description, about, tags
- `docs/cms-projects/projects/3-folio-2.md` — Description, about, tags
- `docs/cms-projects/projects/4-kaffistofan.md` — Description
- `docs/cms-projects/projects/5-exmon.md` — Client, description, about, tags
- `docs/cms-projects/projects/6-folio-1.md` — Description, about, tags
- `docs/cms-projects/projects/7-canalix.md` — Description, about, tags
- `docs/cms-projects/projects/8-kolkrabbi.md` — Client, description, about, tags
- `docs/cms-projects/projects/9-flik.md` — Description, about, tags
- `docs/cms-projects/projects/10-illustrations.md` — Type, year, description, about
- `docs/cms-projects/projects/11-grids.md` — Type, year, description, about
- `docs/cms-projects/projects/12-motion-graphics.md` — Type, year, description, about
- `docs/cms-projects/projects/15-kol-editor.md` — Full rewrite with structure + diagrams
- `docs/cms-projects/projects/16-kol-noter.md` — Full rewrite with structure + diagrams
- `docs/cms-projects/projects/17-kol-distress.md` — Full rewrite with structure + diagrams

### Renamed Files
- `13-frequency-modulator.md` → `13-kol-modulator.md` — Full rewrite with structure + diagrams
- `14-radial-editor.md` → `14-kol-radial.md` — Full rewrite with structure + diagrams

### All 23 project files — batch changes
- Removed: Timeframe, Order, Featured, Published, Fonts rows
- Renamed: Services → Tags

## Decisions Made

- **Three project types**: `client`, `collection`, `tool` — enables filtering on /work
- **Tags over Services**: more flexible for non-client work
- **5:4 replaces 4:3**: mirrors 4:5 portrait, more modern feel, gallery ratios now 2:1 / 4:5 / 5:4
- **Mixed media gallery**: `media[]` array with image/video type per slot
- **Gallery count constraint**: must be multiple of 6 (one full masonry cycle)
- **Year = latest entry**: for collections, year reflects most recent addition
- **Deduped detail file**: project files are single source of truth
- **Tool naming**: `kol-modulator`, `kol-radial`, `kol-editor`, `kol-noter`, `kol-distress`

## Next Steps

- Projects 18–23 (Hall of Mirrors, Chess, Dashboard, Design System, ASCII Card, Foundry) — need type assignment and copy
- Sanity schema implementation: `type` field, conditional Client visibility, `media[]` array
- Workshop iframe embed fix (cookie partitioning issue)
- Check if home.jsx hero animation stops when not in view
- Rename workshop routes to match new slugs (e.g. `radial-editor` → `kol-radial`)
