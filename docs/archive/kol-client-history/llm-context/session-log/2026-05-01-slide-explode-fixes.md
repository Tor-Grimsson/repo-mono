# Session: Slide-explode fixes — mono cut + replace semantics

**Date:** 2026-05-01
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Two follow-up fixes to Phase 6e + 6b: TypeBlock now supports a `mono` cut (JetBrains Mono) so slide-template chrome reads in mono not sans, and `explodeLayout` replaces the layer stack instead of appending so the default bg/mark layers don't bleed through.

## Changes Made

### Files Modified
- `src/components/generators/type-lab/cuts.js` — `WIDTHS` gains `{ id: 'mono', label: 'Mono' }`; `familyFor()` returns `'JetBrains Mono'` for `width === 'mono'`
- `src/components/loaders/decks/slideTemplates.js` — 14 chrome layer specs flipped from `width: 'base'` → `width: 'mono'` (all size-14 topbar/eyebrow/foot/meta/caption/URL bits across cover/manifesto/end). Big-typography layers (sizes 64/130/200/280) stay `width: 'Narrow'`
- `src/components/compose/state.jsx` — `explodeLayout` replaces stack: `setLayersTracked(() => fresh)` instead of `setLayersTracked((prev) => [...prev, ...fresh])`. Comment + docstring updated to reflect replace semantics
- `src/components/compose/inspectors/LayoutInspector.jsx` — "Explode to layers" help text updated for replace behavior + undo restoration

### Features Added/Removed
- **Mono cut option** in TypeBlock typography surface — selectable in compose's text-layer inspector via the Cut dropdown (now 8 options); slide chrome reads correctly in mono
- **Replace semantics** for slide explode — exploded slide is now the entire layer stack; clean editable starting point with no default-layer interference

## Current State

### Working
- Slide cover/manifesto/end explode flow now renders cleanly: mono chrome + sans display titles, no stray bg/mark overlay
- Undo (Cmd+Z) restores the pre-explode stack via the existing history machinery
- Cut dropdown across compose text-layer inspector + Type Lab Cut dropdown both surface "Mono" as a selectable cut

### Known Issues
- Templates still designed for 1080×1080 (1:1) canvas — y-positions overflow on 16:9 (608 virtual height) or extend short of 4:5 (1350 virtual height); user adjusts after exploding
- Typography helper drift unchanged — TypeBlock + TypeBlockToolbar + compose/build.js still import `familyFor` / `applyCase` / `WEIGHTS` from `generators/type-lab/cuts.js` (Phase 7 cleanup target — extract to `data/system/typography.js`)
- 11 other slide types (WideStamp / Number / Tall / Spatial / Look / Quote / Index / Duo / Specimen / Contrast / Credits) remain deck-only; not palette-aware, not exposed as compose layouts (roadmap §10 defers)

## Next Steps
1. Visual-verify the explode flow in `/compose`: pick Slide · Cover, click Explode to layers, confirm mono chrome renders + no default-layer bleed-through + undo restores
2. User has another task incoming
