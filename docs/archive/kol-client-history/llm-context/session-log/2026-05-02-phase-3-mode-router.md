# Session: Phase 3 — Mode router

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** New `/editor/:mode` route with mode-dispatcher. `ModeTabsPanel` lands in Compose's `right.header`. Legacy `/compose` and `/generators/*` routes still in place for backward compat (cleanup in phase 4).

## Changes Made

### New files
- `src/editor/Editor.jsx` — `/editor/:mode` route component. Reads `:mode` param via `useParams`, dispatches to:
  - `compose`  → `<Compose />` (EditorShell)
  - `palette`  → `<GeneratorsComboLab />` (legacy lab page)
  - `pattern`  → `<GeneratorsPatternLab />` (legacy lab page)
  - `type`     → `<GeneratorsTypeLab />` (legacy lab page)
  - other      → `<Navigate to="/editor/compose" replace />` (graceful default)
- `src/editor/shell/panels/ModeTabsPanel.jsx` — tab strip for `right.header`. Renders `NavLink` per mode (Compose / Palette / Pattern / Type) → `/editor/<mode>`. Active mode highlighted via `isActive`.

### Modified
- `src/App.jsx` — added `<Route path="/editor/:mode" element={<Editor />} />` alongside legacy routes. Old routes (`/compose`, `/generators/*`) still exist for backward compat.
- `src/pages/Compose.jsx` — added `ModeTabsPanel` to `COMPOSE_REGISTRY` at `right.header / order 0`.
- `src/components/framework/SideNav.jsx` — auto-collapse extends to `/editor/*` paths (was `/compose` only).
- `src/components/framework/sidebars.config.js` — Compose nav entry `to: '/compose'` → `'/editor/compose'`.

## Current state

### Working (self-verified via grep)
- New route mounts; mode dispatch resolves to existing components.
- Mode tabs visible in Compose's right rail header; clicking a tab navigates to `/editor/<mode>` and switches content.
- Sidebar auto-collapses on `/editor/*` routes.
- Compose nav entry points to new URL.

### Known issues / deferred (per implementation plan)
- **Mode tabs visible in Compose only.** Other modes (Palette/Pattern/Type) still mount their existing labs which use `GeneratorLayout`, not `EditorShell`. Tabs aren't visible there — user navigates via URL/back-button. Phase 4 lifts labs into shell + restores tabs everywhere.
- **No state preservation across mode switches.** Each lab unmounts when leaving its route, losing local state. `ComposeStateProvider` only persists while in Compose mode. Implementation-plan target was per-mode state slices in an `EditorProvider`; deferred to phase 4 where labs are restructured into mode-specific registries.
- **Legacy routes still in App.jsx.** `/compose` and `/generators/*` continue to resolve. Removing them would break any in-flight bookmarks or external links; phase 4 removes them as part of the lab-lift cleanup.
- **`getActivePage` doesn't resolve `/editor/:mode` non-Compose routes.** `Pattern`/`Palette`/`Type` modes have no sidebar nav entry, so the sidebar shows nothing highlighted from those routes. Acceptable transition.

## Next Steps
1. **Phase 4** — lift labs into the shell. ComboLab → Palette mode; PatternLab → Pattern mode; TypeLab → Type mode. Each gets a per-mode registry (canvas + tool-properties content + tool-specific structure panel for Pattern Rules). Drop `GeneratorLayout`. Social and Compositor fold into Compose with starter presets. After phase 4: legacy routes can be removed; mode tabs visible everywhere; per-mode state slices in `EditorProvider`.
