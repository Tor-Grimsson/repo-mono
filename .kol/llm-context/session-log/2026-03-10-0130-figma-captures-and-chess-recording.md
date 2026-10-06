# Session Log: Figma Captures & Chess Analysis Recording

**Date:** 2026-03-10
**Status:** Completed

## Overview

Continued Figma MCP capture workflow for system pages (Chess, Dashboard) and external tool pages (Kol Distress). Resolved Playwright+Figma capture injection hanging issue with fire-and-forget pattern. Created chess analysis screen recording script.

## Key Accomplishments

### 1. Figma Capture — Fire-and-Forget Fix
Discovered that `captureForDesign()` hangs when `await`ed in Playwright's `browser_run_code`. Fix: call without `await` (fire-and-forget), wait 5s, then poll Figma for completion. This unblocked all external and localhost captures.

### 2. Kol Distress Capture (External, 1440x720)
- Navigated to `https://kol-distress.vercel.app/` via Playwright
- Resized viewport to 1440x720
- Injected Figma capture script, fired capture
- Added to file `cB8S0VxasaJIfm2CSnKhj6` at node `35-2` (tool page 1:10)

### 3. Chess Analysis Capture (Localhost)
- `/workshop/chess/analysis` with Game Info + Notation expanded
- Captured at 1440x720 to node `36-2` (tool page — user will move to system page 1:9)

### 4. Chess Components Capture (Localhost, Expanded)
- `/workshop/chess/components` with "Expand all" toggle clicked
- Captured at 1440x720 to node `37-2` (system page 1:9)

### 5. Chess Metrics Capture (Localhost)
- `/workshop/chess/metrics`
- Captured at 1440x720 to node `38-2` (system page 1:9)
- Console errors from missing API endpoints (expected in dev)

### 6. Dashboard Components Capture (Localhost, Expanded)
- `/workshop/dashboard/components` with "Expand all" toggle clicked
- Captured at 1440x720 to node `39-2` (system page 1:9)

### 7. Dashboard Metrics Capture (Localhost)
- `/workshop/dashboard/metrics`
- Captured at 1440x720 to node `40-2` (system page 1:9)

### 8. Chess Analysis Screen Recording
- Created `apps/video/scripts/record-chess-analysis.mjs`
- 1440x900 viewport, 2x retina (2880x1800)
- Flow: load page → hide sidebars → load game → scroll board into view → expand Game Info + Notation → step through moves → jump to start → auto-play
- Output: `apps/video/out/chess-analysis-2x.mp4` (3.7MB, 34s) and `chess-analysis-1x.mp4` (975KB)

## Files Created

- `apps/video/scripts/record-chess-analysis.mjs` — Playwright screen recording script for chess analysis interaction

## Figma Capture Summary

| Page | Node | Figma Page | Viewport |
|------|------|------------|----------|
| Kol Distress | `35-2` | tool (1:10) | 1440x720 |
| Chess Analysis (expanded) | `36-2` | tool (user moves to system) | 1440x720 |
| Chess Components (expanded) | `37-2` | system (1:9) | 1440x720 |
| Chess Metrics | `38-2` | system (1:9) | 1440x720 |
| Dashboard Components (expanded) | `39-2` | system (1:9) | 1440x720 |
| Dashboard Metrics | `40-2` | system (1:9) | 1440x720 |

## Issues Encountered

### 1. Playwright MCP Disconnects
- **Problem:** Playwright MCP server disconnects frequently, requiring `/mcp` reconnect
- **Resolution:** User manually reconnects; tools must be re-loaded via ToolSearch after each reconnect

### 2. captureForDesign() Hanging
- **Problem:** `await page.evaluate(() => window.figma.captureForDesign(...))` never resolves
- **Resolution:** Fire-and-forget pattern — call without `await`, wait 5s, then poll Figma capture ID

### 3. Chess Board Below Fold
- **Problem:** At 1440x900, the chessboard sits at y=1199, far below the viewport
- **Resolution:** Hide both sidebars + `scrollToCenter()` to bring board into view for recording

## Decisions Made

- Chess pages belong on **system page** (1:9) in Figma, not tool page (1:10)
- Dashboard pages also go on system page (1:9)
- Screen recordings use sidebar-hidden layout for maximum board visibility

## Next Steps

- Review chess analysis recording quality, adjust timing/trimming if needed
- Capture remaining tool pages: Kol Editor, Kol Radial, Kol Noter, Kol Mirror, Kol Modulator
- Capture remaining system pages: Design System, ASCII Card, Foundry
- Create screen recordings for other tool projects (Kol Distress, Kol Radial, etc.)
