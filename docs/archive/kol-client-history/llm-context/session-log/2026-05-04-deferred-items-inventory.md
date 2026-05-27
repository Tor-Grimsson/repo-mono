# Session: Deferred-items inventory (post-checkpoint triage)

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** No code changes. After the docs-checkpoint, surfaced and grouped every editor work item still deferred from the 2026-05-03 audit, the consolidation log, and the 2026-05-04 photoshop-paint plan. Inventory is a triage-ready punch list.

## Changes Made

### Files Modified
- None.

### Inventory captured (in-conversation)
Grouped by theme:

**Architecture / consolidation**
1. Popover unification onto `@floating-ui/react` — Dropdown / MenuItem / LayerInspector ColorField popover / TypeBlockToolbar still on hand-rolled `position: fixed` or `position: absolute`.
2. "Edit in Pattern/Type mode" bidirectional fold-back — currently fire-and-forget; should edit the selected layer live.
3. Library item shape validation — `library.pattern[]` holds three different shapes from three save sites.
4. Lab modes (palette/pattern/type) onto the EditorShell registry — only Compose uses it today.

**Color system polish (close the photoshop-paint loop)**
5. New-layer defaults adopt app-level `paintFill` / `paintStroke` instead of `palette:dark`.
6. Stroke rendering on text / logo / pattern (data is stored, renderer ignores).
7. App-level paint persistence in autosave (resets to white/black on reload today).

**Smaller cleanups**
8. `StrokePanel` weight Input onto `useLayerEdit({ history: 'coalesce' })` for symmetry.
9. Cross-mode `bgOn` semantics still differ between pattern-mode and the per-pattern-layer flag.
10. Text typography drift — `modes/type` `newFrame` defaults `case: 'upper'` vs compose `TEXT_DEFAULTS.case = 'original'`.
11. `SelectionPalettePanel` auto-flips Palette → Inspector on every selection, including canvas-row click.
12. Inspector title is `layer.type` — doesn't distinguish logo / rect / ellipse for shape.
13. `CanvasArea`'s click-away DOM class list — hand-rolled, requires editing CanvasArea when adding new rail panels.

## Current State

### Working
- 2026-05-04 docs checkpoint stands; reference docs all-clean.
- Build green from yesterday's photoshop-paint refactor.

### Known Issues
- 13 deferred items above. None blocking; all have workarounds or are minor UX.

## Next Steps

Suggested order of attack:

1. **Close the paint loop** — items 5 + 6 + 7 (~one day). New layers adopt current paint; stroke renders on more types; paint persists.
2. **Library shape validation** (item 3) — small + data-correctness payoff.
3. **Popover unification** (item 1) — biggest aesthetic-refactor payoff.
4. **Bidirectional cross-mode + lab modes onto registry** (items 2 + 4) — pair as a multi-day architectural push.

Smaller cleanups (8-13) get folded into whichever larger pass touches their files.

If this list grows or changes shape, consider extracting it to `docs/editor/plans/2026-05-04-deferred-items.md` as a living punch list with frontmatter `status: in-flight`.
