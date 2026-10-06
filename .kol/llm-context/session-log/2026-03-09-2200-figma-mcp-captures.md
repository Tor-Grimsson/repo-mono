# Session Log: Figma MCP Captures — Clients & Collections

**Date:** 2026-03-09
**Status:** In Progress

## Overview

Established a workflow for capturing project gallery templates from HTML into Figma as editable layers using the Figma MCP `generate_figma_design` tool. Completed all client and collection captures. Started tool project workflow with Playwright MCP.

## Key Accomplishments

### 1. Figma MCP Workflow Established
- Figma MCP connected (`claude mcp add --transport http figma https://mcp.figma.com/mcp`)
- Discovered `generate_figma_design` is the only write tool — captures rendered HTML as editable Figma layers
- No native "create frame" API — must render HTML, serve locally, and capture
- Workflow: create HTML → serve on localhost → get capture ID → open with hash params → poll for completion
- Frames render at 0.5x (CSS px → Figma pt), aspect ratios correct

### 2. Figma File: 04b--kolkrabbi-cms-content
- File key: `cB8S0VxasaJIfm2CSnKhj6`
- Pages discovered: Cover (0:1), ➤ type (1:3), ↳ [client] (1:7), ↳ [collection] (1:8), ↳ [system] (1:9?), ↳ [tool] (1:10), ↳ [general] (1:11), ➤ overview (1:12)

### 3. Client Captures (6 projects → client page 1:7)
All captured with frontmatter, SEO, gallery pairing tables, and slot previews:
- 1. Aftra → node 4-2
- 4. Kaffistofan → node 5-2
- 5. Exmon → node 6-2
- 7. Canalix → node 7-2
- 8. Kolkrabbi → node 8-2
- 9. Flík → node 9-2

### 4. Collection Captures (6 projects → collection page 1:8)
- 2. Folio #3 → node 10-2
- 3. Folio #2 → node 11-2
- 6. Folio #1 → node 12-2
- 10. Illustrations → node 13-2
- 11. Grids → node 14-2
- 12. Motion Graphics → node 15-2

### 5. Tool Capture Workflow (In Progress)
For tools (13–18) and systems (19–23), established a 3-tier Playwright approach:
1. **Playwright** navigates to live Vercel app, interacts with controls to set up visual state
2. **Screenshot** — pixel-perfect PNG at exact gallery dimensions for CMS media
3. **Figma capture** — same DOM state converted to editable layers

Started with 13. Kol Modulator (`kol-modulator.vercel.app`):
- Successfully navigated and set params (5 circles, freq 180, scale 80, intensity 300, separation 30)
- Screenshot confirmed working — shapes visible
- Figma capture script injection hung (possible permission prompt UI bug in Claude Code)
- **Needs fresh session to continue**

## Files Created
- `docs/cms-projects/figma/` — 12 HTML capture templates (6 client + 6 collection)
- `docs/cms-projects/figma-capture.html` — original test template

## Decisions Made
- **Simple HTML for clients/collections** — no need for design system, content is placeholder text + slot previews
- **Dev server / Playwright for tools + systems** — live Vercel apps have real components to capture
- **3-tier per slot**: Playwright state → screenshot (production) → Figma capture (editable)
- **Folios on collection page** — not client page, matching the 4-type structure

## Issues Encountered
- Figma MCP `get_metadata` with empty nodeId fails — must probe specific page IDs
- Body background not captured reliably — Figma defaults to light; wrap in explicit div for dark bg
- Playwright `browser_run_code` for Figma capture injection hangs — suspected permission prompt UI bug

## Next Steps
- **Resume modulator capture** in fresh session — retry Figma capture injection via Playwright
- Complete all 12 gallery slots for kol-modulator per pairing table
- Proceed to remaining tools: 14-kol-radial, 15-kol-editor, 16-kol-noter, 17-kol-distress, 18-kol-mirror
- Then systems (19–23) using dev server for live component captures
- Consider screen recording skill for video slots (slot 7 in client pairings)
