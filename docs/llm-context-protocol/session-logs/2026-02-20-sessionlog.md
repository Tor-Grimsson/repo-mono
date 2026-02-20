# Session Log - 2026-02-20

## Agent Info
- **LLM Used**: Claude Opus 4.6
- **Session Started**: 2026-02-20
- **Session Ended**: 2026-02-20
- **Message Count**: ~16

## What Was Accomplished

### 1. Fixed Tags sidebar showing documents instead of tags
The "Tags" section in the documentation home page sidebar list view was showing the first 20 documents from `documentationInventory` instead of actual tags. Replaced document links with extracted unique tag chips.

- Added `allTags` useMemo that extracts and sorts unique tags from all docs
- Replaced `documentationInventory.slice(0, 20).map(...)` with `allTags.map(...)` rendering clickable `docs-tag` chips
- Tags link to `?tag=<tagname>` filtered view

### 2. Made Tags sidebar section collapsed by default
- Added `tagsExpanded` state (default `false`)
- Wrapped Tags section content in collapsible toggle with chevron-right/chevron-down icon
- List/graph toggle buttons only visible when expanded

### 3. Restructured tagged view (activeTag page)
The sidebar was duplicating the main view content (showing doc cards) and the list/graph toggle controlled the sidebar instead of the main view.

**Sidebar now shows:**
- All tag chips (clickable, with active tag highlighted)
- "Clear filter" button
- No more document list duplication

**Main view now controlled by toggle:**
- List mode (default): document cards with tags
- Graph mode: full-size TagGraph in main content area

### 4. Removed sidebar graph toggle from home Tags section
The list/graph toggle in the home sidebar Tags section was rendering the TagGraph inside the sidebar. Changed so:
- Sidebar Tags always shows tag chips when expanded
- Graph toggle button controls the main view (shows TagGraph full-size in main content)

### 5. Made TagGraph render as 1:1 square
- CSS: replaced `height: 280px` with `aspect-ratio: 1` on `.tag-graph-sidebar`
- JS: initial dimensions `300x300` (was `300x400`)
- Resize observer sets `height = width` for square SVG

### 6. Improved "Node graph" toggle button in tagged view
- Changed from icon-only button to text button reading "Node graph" / "List"
- Positioned with `justify-between` from the "Tagged: X (n docs)" heading
- Added `style={{ width: 'auto' }}` to override `width: 100%` from shared `docs-sidebar-action` class

### 7. Fixed Vercel deploy: rollup binary missing
Vercel build failed with `Cannot find module @rollup/rollup-linux-x64-gnu` because an untracked `package-lock.json` in the repo root caused Vercel to auto-detect npm instead of yarn. npm has a known bug with optional platform-specific dependencies.

- Deleted `package-lock.json` from repo root
- Added `package-lock.json` to `.gitignore` to prevent recurrence

## Files Changed
- `apps/web/src/routes/workshop/Documentations.jsx` - Major restructure of Tags sidebar and tagged view
- `apps/web/src/components/workshop/docs/TagGraph.jsx` - Square aspect ratio (1:1 dimensions)
- `packages/ui/css/docs.css` - `.tag-graph-sidebar` height replaced with `aspect-ratio: 1`
- `.gitignore` - Added `package-lock.json`
- `package-lock.json` - Deleted (was causing Vercel to use npm instead of yarn)

## Current State
**What's Working:**
- Home page sidebar Tags section: collapsed by default, shows tag chips when expanded
- Home page graph toggle: switches main content between landing page and full TagGraph
- Tagged view sidebar: shows all tags as clickable chips
- Tagged view main: list/graph toggle via "Node graph" button in header
- TagGraph renders as 1:1 square
- Tag navigation via `?tag=<tagname>` URL params

**What's In Progress:**
- None

**What's Broken/Blocked:**
- None known

## Next Steps
1. Consider adding a `docs-tag--active` CSS class for highlighted active tag in sidebar
2. Visual polish pass on TagGraph at full main-view size
3. Test tag filtering across all documentation categories

## Open Questions/Blockers
- None

## Notes
- The `docs-sidebar-action` class has `width: 100%` which caused the "Node graph" button to fill available space; overridden with inline `width: auto` rather than modifying the shared class
- `sidebarViewMode` controls the home page main view (list vs graph), `tagViewMode` controls the tagged page main view
- All changes build on previous session (2026-02-19) which added TagGraph, sidebar toggles, and quick actions
- **Vercel deploy fix**: presence of `package-lock.json` causes Vercel to use npm instead of yarn, which breaks rollup native binary resolution. Always ensure only `yarn.lock` exists in the repo root
