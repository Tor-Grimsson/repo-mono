# Session Log: GridSymbols V2–V5 & Line Animation Skill

**Date:** 2026-03-10
**Status:** Completed

## Overview

Iterated GridSymbols composition from V2 through V5, developing a mature SVG line animation vocabulary. V2 introduced draw-on/off (no fade), V3 added loop structure + magenta construction guides, V4 bumped to 4K, V5 created a 3:5 portrait with 3 stacked grid instances showing different symbols simultaneously. Created `/line-animation` Claude Code skill documenting the full technique. Organized `apps/video/out/` into structured subfolders.

## Key Accomplishments

### 1. GridSymbolsV2 — Draw-On/Off Focus
**File:** `apps/video/src/compositions/GridSymbolsV2.tsx`

30-second composition replacing V1's fade-heavy approach with position-based animations: hex lines grow/collapse via endpoint interpolation, grid lines expand from center, yellow symbols use strokeDashoffset draw-on/draw-off. Background changed to #121215. Scale pulse removed for stability during main animation.

### 2. GridSymbolsV3 — Loop Structure + Guides
**File:** `apps/video/src/compositions/GridSymbolsV3.tsx`

Added loop-friendly symbol cycle: 1→2→3→1 (symbol 1 reappears before outro). Merged connected yellow path segments into polylines for clean `strokeLinejoin="round"` corners (no double round-cap gaps). Added magenta construction guides — dotted lines that LEAD the gold stroke by ~15-18 frames, showing trajectory intent at non-obvious turns. Guides use `<mask>` for progressive dotted line reveal (clipPath doesn't support strokes). Multiple iterations on guide placement, timing, opacity, and stroke weight based on user feedback and reference sketches.

### 3. GridSymbolsV4 — 4K Resolution
**File:** `apps/video/src/compositions/GridSymbolsV4.tsx`

Same animation as V3, bumped to 3840x2160 with SCALE 9.6 (3.2 × 2 for resolution × 1.5 for larger fill). Learned that resolution changes require scaling the SCALE constant proportionally to canvas size increase.

### 4. GridSymbolsV5 — 3:5 Portrait, 3 Grids
**File:** `apps/video/src/compositions/GridSymbolsV5.tsx`

2160×3600 portrait with 3 grid instances stacked vertically. Each instance shows a different symbol at any given moment via rotated `SYMBOL_ORDER` arrays. Extracted `GridInstance` as an inner component accepting `instanceIdx` and `introStagger` props. Unique mask IDs per instance to avoid SVG collisions. Shared enter/exit animation, per-instance hex intro stagger (8 frames apart).

### 5. Line Animation Skill
**File:** `.claude/skills/line-animation/SKILL.md`

Created comprehensive skill documenting: stroke draw-on/off technique, line endpoint animation, data-driven path arrays, merged polylines, construction guide concept (trajectory previews that lead gold strokes), composition structure, timeline design, easing, scale stability, multi-instance pattern, resolution/scaling table, and output folder conventions.

### 6. Output Folder Organization
Organized `apps/video/out/` from flat mess into:
- `out/remotion/` — Remotion composition renders (.mp4)
- `out/screen-recordings/` — Playwright captures (webm/mp4, per-tool subfolders)
- `out/previews/` — Static frame captures (.png)

## Files Modified

### New Files
- `apps/video/src/compositions/GridSymbolsV2.tsx` — 30s draw-on/off composition
- `apps/video/src/compositions/GridSymbolsV3.tsx` — Loop + guides + merged polylines
- `apps/video/src/compositions/GridSymbolsV4.tsx` — 4K version
- `apps/video/src/compositions/GridSymbolsV5.tsx` — 3:5 portrait, 3 grids
- `.claude/skills/line-animation/SKILL.md` — Line animation skill

### Modified Files
- `apps/video/src/Root.tsx` — Registered V2–V5 compositions
- `apps/video/out/` — Reorganized into remotion/, screen-recordings/, previews/ subfolders

## Issues Encountered

### 1. Scale Pulse Bump
- **Problem:** Subtle scale bump at ~11s during symbol transitions
- **Resolution:** Removed `scalePulse` entirely — no scale changes during main animation

### 2. SVG clipPath Doesn't Support Strokes
- **Problem:** `<clipPath>` only uses fill geometry, so stroke-based clip paths produced empty regions (guides invisible)
- **Resolution:** Switched to `<mask>` which respects stroke luminance

### 3. 4K Resolution Made Composition Appear Smaller
- **Problem:** Doubling canvas without adjusting SCALE gave more empty space around same-sized artwork
- **Resolution:** SCALE must account for resolution change: `3.2 × 2 (4K) × 1.5 (bigger) = 9.6`

### 4. Guide Timing — Simultaneous vs Leading
- **Problem:** Guides appearing at same time as gold strokes looked like double-strokes, purpose unclear
- **Resolution:** Guides now LEAD by 15-18 frames (`lead` property), draw on before gold, stay while gold catches up, gentle fade after gold passes

### 5. Dotted Line Draw-On
- **Problem:** Can't use `strokeDasharray` for both dot pattern and draw-on offset simultaneously
- **Resolution:** Use `<mask>` with expanding white stroke to progressively reveal the dotted path underneath

## Decisions Made

- **Guides are trajectory previews, not grid references** — they show "from here → to target corner", the specific path segment the gold is about to draw, not abstract grid geometry on the opposite side
- **Guides lead, not follow** — appearing before gold starts drawing makes intent clear
- **Merged polylines over separate segments** — fixes round-cap gaps, reduces path count
- **No scale changes mid-animation** — enter/exit spring only, rock-solid during grid + symbol phases
- **Symbol order rotation for multi-instance** — simpler than frame offsets, keeps timing synchronized

## Next Steps

- Build next composition from SVG folder 2 (circle bloom / flower of life progression)
- Consider cleaning up hash-named .webm files in screen-recordings (raw Playwright intermediates)
- User will fine-tune V5 grid spacing in DaVinci Resolve
