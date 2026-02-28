# Workshop Shell → `@kol/ui/layout` + Search Overlay

## Context
The workshop layout shell (header, sidebar, tabs, drawer) is currently hardwired to workshop-specific data and lives in `apps/web`. The goal is to:
1. Generalise all shell components so they're reusable for a future docs app (same layout, different brand logo + different route tree)
2. Move them into `@kol/ui/layout` (the export slot already exists in package.json)
3. Replace the always-visible SearchInput in the tabs row with a search icon that opens a command-palette overlay (⌘K / Ctrl+K, Opt+B / Alt+B)
4. Rename `docs.css` → `workshop.css` (class names stay `.docs-*` — file rename only, no churn)

**Note:** Item 3 (search overlay) is already complete as of 2026-02-28. See `workshop-search-overlay-plan.md`.

---

## Phase 1 — CSS rename (independent, simplest)

- Rename `packages/ui/css/docs.css` → `packages/ui/css/workshop.css`
- Update `packages/ui/package.json` export key: `"./css/docs.css"` → `"./css/workshop.css"`
- Update `apps/web/src/index.css`: `@import "@kol/ui/css/docs.css"` → `@import "@kol/ui/css/workshop.css"`

Class names inside the file are **unchanged** (`.docs-*` stays).

---

## Phase 2 — Add `react-router-dom` peer dep to `@kol/ui`

Layout components use `NavLink`, `useLocation`, `useNavigate` from react-router-dom.

Add to `packages/ui/package.json` peerDependencies:
```json
"react-router-dom": "^6.0.0 || ^7.0.0"
```

---

## Phase 3 — Create `packages/ui/src/layout/` components

The `"./layout": "./src/layout/index.js"` export already exists in package.json — just populate it.

### Route shape (prop all components share)
Same shape as existing `WORKSHOP_ROUTES`:
```js
[{ id, label, icon, path, children: [{ id, label, path, icon }] }]
```
Components also accept `basePath` (e.g. `"/workshop"` or `"/docs"`) replacing the hardcoded `/workshop` in path helpers.

---

### `DocsPageHeader.jsx` — from `WorkshopPageHeader.jsx`
Props: `brandLogoSrc`, `brandLogoAlt`, `routes`, `basePath`, `onMenuOpen`, `onSidebarToggle`, `onSearchOpen`

Key changes vs current:
- Brand `<img src>` → `brandLogoSrc` prop
- `WORKSHOP_ROUTES` → `routes` prop
- Path helper uses `basePath` prop instead of hardcoded `/workshop`
- **Tab row**: `SearchInput` removed; replaced by search icon `<button>` that calls `onSearchOpen`
- Controls order (right side): `[search icon] [theme toggle] [hamburger / sidebar toggle]`

---

### `DocsSidebar.jsx` — from `WorkshopSidebar.jsx`
Props: `routes`, `basePath`, `onNavigate`, `label`

Key changes: `WORKSHOP_ROUTES` → `routes` prop; `/workshop` → `basePath` prop. Logic identical.

---

### `DocsRailDrawer.jsx` — from `WorkshopRailDrawer.jsx`
Already generic (children, isOpen, onClose, anchor). Direct move, no logic changes.

---

### `DocsSearchOverlay.jsx` — from `WorkshopSearchOverlay.jsx`
Props: `isOpen`, `onClose`, `routes`, `basePath`

Same behaviour as the already-implemented `WorkshopSearchOverlay`, generalised:
- `routes` prop instead of direct `WORKSHOP_ROUTES` import
- `basePath` prop instead of hardcoded `/workshop` in navigate call

---

### `DocsLayout.jsx` — from `WorkshopLayout.jsx`
Props: `routes`, `basePath`, `brandLogoSrc`, `brandLogoAlt`

Key changes vs current:
- `WORKSHOP_ROUTES` → `routes` prop; passed to header, sidebar, overlay
- `isSearchOpen` / `setIsSearchOpen` state + `⌘K` / `Ctrl+K` / `Alt+B` shortcut listener (already implemented in WorkshopLayout — just generalised)
- Passes `onSearchOpen` to `DocsPageHeader`
- Renders `<DocsSearchOverlay isOpen={isSearchOpen} onClose={...} routes={routes} basePath={basePath} />`
- Keeps `WorkshopTocContext` and `WorkshopFullHeightContext` (names unchanged, exported)

---

### `packages/ui/src/layout/index.js`
```js
export { default as DocsLayout } from './DocsLayout.jsx'
export { default as DocsPageHeader } from './DocsPageHeader.jsx'
export { default as DocsSidebar } from './DocsSidebar.jsx'
export { default as DocsRailDrawer } from './DocsRailDrawer.jsx'
export { default as DocsSearchOverlay } from './DocsSearchOverlay.jsx'
export { WorkshopTocContext, WorkshopFullHeightContext } from './DocsLayout.jsx'
```

---

## Phase 4 — Update `apps/web` to consume `@kol/ui/layout`

```jsx
// Before
import WorkshopLayout from './components/workshop/layout/WorkshopLayout'

// After
import { DocsLayout } from '@kol/ui/layout'
import { WORKSHOP_ROUTES } from './data/workshop/navigation'

// Usage
<DocsLayout
  routes={WORKSHOP_ROUTES}
  basePath="/workshop"
  brandLogoSrc="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/workshop/workshop-docs/workshop-logo.svg"
  brandLogoAlt="Workshop"
/>
```

Update any page that imports `WorkshopTocContext` or `WorkshopFullHeightContext` from the local layout file → `@kol/ui/layout`.

**Delete** the now-replaced local files:
- `apps/web/src/components/workshop/layout/WorkshopLayout.jsx`
- `apps/web/src/components/workshop/layout/WorkshopPageHeader.jsx`
- `apps/web/src/components/workshop/layout/WorkshopSidebar.jsx`
- `apps/web/src/components/workshop/layout/WorkshopRailDrawer.jsx`
- `apps/web/src/components/workshop/layout/WorkshopSearchOverlay.jsx`

---

## File summary

| File | Action |
|---|---|
| `packages/ui/css/docs.css` | Rename → `workshop.css` |
| `packages/ui/package.json` | CSS export key rename + react-router-dom peer dep |
| `apps/web/src/index.css` | Update CSS import |
| `packages/ui/src/layout/DocsLayout.jsx` | Create (from WorkshopLayout) |
| `packages/ui/src/layout/DocsPageHeader.jsx` | Create (from WorkshopPageHeader) |
| `packages/ui/src/layout/DocsSidebar.jsx` | Create (from WorkshopSidebar) |
| `packages/ui/src/layout/DocsRailDrawer.jsx` | Create (from WorkshopRailDrawer) |
| `packages/ui/src/layout/DocsSearchOverlay.jsx` | Create (from WorkshopSearchOverlay) |
| `packages/ui/src/layout/index.js` | Create |
| `apps/web/src/App.jsx` (or router) | Swap WorkshopLayout → DocsLayout with props |
| Workshop pages using context | Update import path to `@kol/ui/layout` |
| Local layout files (5) | Delete |

## Unchanged
- `apps/web/src/data/workshop/navigation.js` — stays in app, passed as prop
- `packages/ui/src/atoms/SearchInput.jsx` — used inside DocsSearchOverlay
- All workshop page components — no changes
