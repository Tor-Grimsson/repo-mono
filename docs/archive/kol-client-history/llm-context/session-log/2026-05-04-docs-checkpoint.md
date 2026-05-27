# Session: docs/editor restructure + reconciliation checkpoint

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Restructured `docs/editor/` into `reference/` + `plans/` with frontmatter + nested-tag convention. Reconciled every reference doc to current reality (full rewrite of `tree.md`, partial rewrites of `ui.md` / `product.md` / `tools.md` / `frame-state.md`). Result: 2026-05-04 checkpoint — every reference doc verified clean.

## Changes Made

### File moves
- `product-description.md` → `reference/product.md`
- `product-ui.md` → `reference/ui.md`
- `product-tree.md` → `reference/tree.md`
- `tools.md` → `reference/tools.md`
- `frame-state.md` → `reference/frame-state.md`
- `roadmap.md` → `plans/2026-05-02-roadmap.md`
- `implementation-plan.md` → `plans/2026-05-02-implementation.md`
- `2026-05-03-state-audit.md` → `plans/2026-05-03-state-audit.md`
- New: `plans/2026-05-04-photoshop-paint.md` (copied from `~/.claude/plans/`)

### Frontmatter on every file
```yaml
title / status / updated / verified / verified-by / tags / drift
```

Statuses: `canonical | aspirational | shipped | superseded | snapshot | in-flight`. Tag namespace `editor/<area>/<topic>` with nested form for Obsidian.

### Reconciliation (reference → reality)
- **`tree.md`** — full rewrite. Mirrors actual `src/editor/` (provider stack in `Editor.jsx`, one big `compose/state.jsx`, Rail inlined into `EditorShell.jsx`, single `LayerInspector.jsx`, lab modes bypass registry, etc.). Added "Original target vs reality" diff table at the bottom.
- **`ui.md`** — replaced the speculative panel-arrangement diagram with the actual Compose registry (ToolPalette / ColorModal / LayersAssetsPanel / SelectionPalettePanel). Documented that lab modes bypass the registry today.
- **`product.md`** — minor edits: dropped the duplicate panel-arrangement table (deferred to ui.md), updated Mode-switching to reference MenuTop (not "right.header tabs"), updated Library section (`kol.editor.library.v3`, `library/LibraryProvider.jsx`), updated Tool concept to reflect `labs/` → `modes/` migration.
- **`tools.md`** — added a "Color shortcuts" section (D / X / Shift+X / N) since they shipped after the original tool spec; cross-refs to the photoshop-paint plan + session log.
- **`frame-state.md`** — flipped autosave from "deferred" to "shipped 2026-05-02" with pointer.

### README rewrite
Drift-status table per ref doc (now all clean). Frontmatter convention spec. Tag namespace overview.

## Current State

### Working — the 2026-05-04 checkpoint
- `docs/editor/reference/` is the canonical truth as of 2026-05-04. Every doc carries `drift: []`, `verified: 2026-05-04`.
- `docs/editor/plans/` carries dated point-in-time docs (audits, plans). Status field tells you whether they're shipped / superseded / snapshot.
- README's drift table is the at-a-glance trustworthiness map. Future sessions either bump `verified:` after a reality-check or append to a doc's `drift:` list.

### Known Issues
- None at the doc-reconciliation level. The audit (`plans/2026-05-03-state-audit.md`) still lists known editor-level work items as deferred (popover unification onto floating-ui, library-shape validation, "Edit in Pattern/Type mode" bidirectional fold-back, slider/typing sites in StrokePanel onto useLayerEdit). Those are code work, not doc work.

## Next Steps
1. Workflow protocol — going forward, every session that touches load-bearing editor code is responsible for either bumping the affected doc's `verified:` or appending to its `drift:` list.
2. When the lab modes migrate onto the EditorShell registry, both `tree.md` (Original target vs reality table) and `ui.md` will need updating — they're currently honest about the gap.
3. The remaining audit work items (popover unification, library validation, etc.) when you decide to take them on.
