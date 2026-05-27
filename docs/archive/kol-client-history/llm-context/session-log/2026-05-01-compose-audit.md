# Session: /compose UI audit (thin)

**Date:** 2026-05-01
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Read-only audit of `/compose` against the sibling 2D editor at `/Users/biskup/dev/projects/kol-apparat/kol-editor/kol-editor`. Output landed in `docs/kol-migration/compose-audit.md`. Quality is thin — kol-editor research was delegated to an Explore agent and the findings rubber-stamped, not deeply verified by reading source. User flagged it as weak research. Logging as-is; deeper pass needed if Phase 8 actually starts.

## Changes Made

### Files Modified
- `docs/kol-migration/compose-audit.md` — new. 10-section audit: layout chrome, layer stack, inspector, canvas, topbar, state mgmt, atoms/molecules, missing-patterns table, recommended Phase 8 (UX polish, ~3–4 hrs surgical work), what NOT to lift from kol-editor.

### Features Added/Removed
- None — read-only research session.

## Current State

### Working
- Audit doc shipped. Captures the obvious gaps: cramped 220px left rail, tall pattern/text inspectors after 6f, visibility-eye gated behind expand chevron, no composition name input, empty 56px drawer.
- Captures the "don't lift" list — Konva Stage, vector node editing, nested frames, flat-useState, full-state-copy undo.

### Known Issues
- **Audit is shallow.** kol-editor's UI was surveyed by an Explore agent (single tool call, ~600 word report); I never read its actual source code. The findings are pattern-list-style (visibility eye, panel groups, etc.) — generic editor-feature-list, not insight from cross-reading both codebases line-by-line.
- **Recommendations are surface-level.** Phase 8 list is "obvious from a glance" UX wins. Anything genuinely architectural — kol-editor's specific Konva integration patterns, its asset/color/pattern panel internals, its dnd-kit setup — not actually examined.
- **No screenshots, no flow walkthroughs.** The audit names patterns but doesn't show them. A serious audit would have specific UX moments documented (e.g. how the kol-editor Type panel structures its controls vs compose's TextFields).
- User comment: *"hmm thats pretty weak reserach"* — accurate read.

## Next Steps
1. If Phase 8 starts and the audit's recommendations need real grounding: do a deeper kol-editor read directly — open `KolEditor.jsx`, `Inspector.jsx`, `LayersSidebar.jsx`, `ColorPicker.jsx`, `PanelGroup.jsx` in this repo's session and cross-reference against compose's equivalents. Document specific patterns + line refs, not vibes.
2. Otherwise, the audit doc is fine as a starting punch list — Phase 8 ranked recommendations are still directionally correct (visibility eye, filename, collapsible sections, drawer repurpose, IconButton atom) even if the underlying research was thin.
