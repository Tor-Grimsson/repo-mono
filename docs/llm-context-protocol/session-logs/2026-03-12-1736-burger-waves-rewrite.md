# Session Log: Burger & Waves Composition Rewrite

**Date:** 2026-03-12
**Status:** In Progress

## Overview

Rewrote all 6 Burger/Waves Remotion compositions from scratch. Created shared `burger-shared.ts` with actual SVG path data, proper gap-close math (CLOSE_OFFSET=44 for interlocking scalloped halves), and `pathLength=1` draw-on approach. Each composition now starts as a closed circle that splits open with waves drawing on via strokeDashoffset.

## Key Accomplishments

### 1. Shared Data File
**File:** `apps/video/src/compositions/redo/burger-shared.ts`

Created centralized constants and helpers:
- Exact TOP_HALF and BOTTOM_HALF path data from `svgs-to-animate/5/320.svg`
- Wave centerline path at absolute coordinates (x=64→256, 6 scallops matching SVG geometry)
- `CLOSE_OFFSET = 44` calculated so scalloped edges of both halves interlock at y=160 forming a complete circle
- `WAVE_Y = [137, 160, 183]` — original SVG wave row positions
- Shared `ease()` smoothstep and `progress()` helper with monotonicity guard (`if (start >= end) return frame >= start ? 1 : 0`)

### 2. Gap Animation System
**Files:** All 6 composition files

Replaced the broken gap system. New approach:
- `gap` factor 0→1: at 0, halves overlap at center (closed circle); at 1, halves at original SVG positions
- Top half: `translateY = CLOSE_OFFSET * (1 - gap)` (positive = toward center)
- Bottom half: `translateY = -CLOSE_OFFSET * (1 - gap)` (negative = toward center)
- Wave Y positions track the gap: `adjustedY = 160 + (originalY - 160) * gap` — at gap=0 all waves at center, at gap=1 at their SVG positions

### 3. Wave Draw-On with pathLength=1
**Files:** All 6 composition files

Replaced the broken `strokeDasharray={WAVE_LENGTH}` approach with `pathLength={1}`:
- `pathLength={1}` normalizes path length, no estimation needed
- `strokeDasharray={1}`, `strokeDashoffset={1 - drawn}` — trivial math
- `drawn = Math.max(0, waveOn - waveOff)` — clean on/off interaction
- Wave order: center (y=160) first, then top (y=137), then bottom (y=183)
- strokeWidth=4 for visibility at 2.8x+ scale

### 4. Six Distinct Compositions
**Burger V1** (`Burger.tsx`): Standard landscape 1920×1080, 600f. Smooth open→hold→close with breathing + wave undulation during hold.

**Burger V2** (`BurgerV2.tsx`): Portrait 2160×3600, 600f. Same animation as V1, scale=4.5.

**Burger V3** (`BurgerV3.tsx`): Creative variant 1920×1080, 600f. Slow 180° global rotation, halves counter-tilt 6° as they separate, waves draw from alternating directions (±strokeDashoffset), gaussian blur glow filter on waves during hold.

**Burger V4** (`BurgerV4.tsx`): Portrait of V3, 2160×3600, 600f. Same creative animation.

**Waves V1** (`Waves.tsx`): Standalone 1920×1080, 450f. Shorter/punchier — faster open, quicker wave draw-on, longer hold with pronounced undulation + subtle scale pulse.

**Waves V2** (`WavesV2.tsx`): Portrait of Waves, 2160×3600, 450f.

## Files Modified

### New Files
- `apps/video/src/compositions/redo/burger-shared.ts` — Shared SVG path data, constants, helpers
- `docs/llm-context-protocol/session-logs/2026-03-12-1736-burger-waves-rewrite.md` — This session log

### Modified Files
- `apps/video/src/compositions/redo/Burger.tsx` — Full rewrite: closed→open gap, pathLength=1 waves, breathing
- `apps/video/src/compositions/redo/BurgerV2.tsx` — Full rewrite: portrait version of V1
- `apps/video/src/compositions/redo/BurgerV3.tsx` — Full rewrite: rotation, tilt, glow, alternating draw directions
- `apps/video/src/compositions/redo/BurgerV4.tsx` — Full rewrite: portrait of V3
- `apps/video/src/compositions/redo/Waves.tsx` — Full rewrite: shorter, punchier, scale pulse
- `apps/video/src/compositions/redo/WavesV2.tsx` — Full rewrite: portrait of Waves

## Issues Encountered

### 1. Pre-existing TypeScript errors in scripts-ark/
- **Problem:** `tsc --noEmit` shows 7 errors, all in archived `scripts-ark/` files (broken relative imports for `flikc-shared`, `VideoUI`, `FontPreviewItem`, `@kol/ui/common`)
- **Resolution:** Not addressed — these are archived files, not active compositions. Active redo/ files compile clean.

### 2. Previous wave rendering failure
- **Problem:** Old code used `makeWavePath()` centered at y=0 (x=-96 to x=96) with `translate(160, waveY)` and `strokeDasharray={WAVE_LENGTH}` where WAVE_LENGTH=210 was an approximation. Waves never appeared in render.
- **Resolution:** New approach: wave path uses absolute SVG coordinates (x=64→256), `pathLength={1}` eliminates path length guessing, `translate(0, adjustedY)` for positioning. Verified Remotion studio loads (HTTP 200).

## Next Steps

- Preview all 6 compositions in Remotion player, verify wave visibility and animation quality
- Export Burger V1-V4 and Waves V1-V2 as mp4
- Archive exported compositions to `scripts-ark/`
- Review first-round FlikC (8) + Kaleidoscope (1) — still in player for reference
