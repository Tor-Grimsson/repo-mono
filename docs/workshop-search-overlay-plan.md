# Workshop Search — Icon + Command-Palette Overlay

## Context
The search input currently lives inline in the tabs row of `WorkshopPageHeader`. Moving it to a command-palette overlay declutters the tab row, gives search more room to breathe, and enables a power-user keyboard shortcut. The overall shell restructure (moving to `@kol/ui/layout`) is a separate follow-on task.

---

## Scope — 4 files

| File | Action |
|---|---|
| `packages/ui/src/atoms/SearchInput.jsx` | Add `iconOnly` + `onClick` props |
| `apps/web/src/components/workshop/layout/WorkshopLayout.jsx` | Add search state + shortcut listener + render overlay |
| `apps/web/src/components/workshop/layout/WorkshopPageHeader.jsx` | Move SearchInput to controls row as `iconOnly` |
| `apps/web/src/components/workshop/layout/WorkshopSearchOverlay.jsx` | **Create** |

Everything else unchanged.

---

## 1. `WorkshopLayout.jsx`

- Add `isSearchOpen` / `setIsSearchOpen` state
- Register keyboard shortcut in `useEffect` on `window`:
  - `⌘K` / `Ctrl+K` — primary
  - `Opt+B` / `Alt+B` — bonus
- Pass `onSearchOpen={() => setIsSearchOpen(true)}` to `WorkshopPageHeader`
- Render `<WorkshopSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />` at layout root
- Remove `searchQuery` / `setSearchQuery` state and all references (search state now lives inside the overlay)

---

## 2. `packages/ui/src/atoms/SearchInput.jsx`

Add `iconOnly` + `onClick` props. When `iconOnly={true}`, render a plain icon button (same size/hover pattern as the other header buttons) instead of the full input wrapper. `value`, `onChange`, `placeholder` are ignored in icon-only mode.

```jsx
// icon-only variant renders:
<button type="button" onClick={onClick} aria-label="Search" className="flex h-9 w-9 items-center justify-center rounded-md text-fg-64 transition-colors hover:bg-fg-08 hover:text-fg">
  <Icon name="search-16" size={18} />
</button>
```

Also add `bare` prop — renders icon + full-width input with no pill border/background, for use inside the overlay card. Layout via inline styles.

Default behaviour (no `iconOnly`, no `bare`) unchanged.

---

## 3. `WorkshopPageHeader.jsx`

- Remove props: `onSearch`, `searchQuery`
- Add prop: `onSearchOpen`
- Tab row: remove `<SearchInput … />` entirely
- Controls row — new order on the right:
  ```
  [SearchInput iconOnly]  [theme toggle]  [hamburger / sidebar toggle]
  ```
  Usage: `<SearchInput iconOnly onClick={onSearchOpen} />`

---

## 4. `WorkshopSearchOverlay.jsx` (new)

Props: `isOpen`, `onClose`

Internal state: `query` string — resets to `''` when `isOpen` becomes `false`.

Data: imports `WORKSHOP_ROUTES` directly.

### Layout
```
fixed inset-0 z-300
  backdrop (rgba(0,0,0,0.6) + backdropFilter: blur(1px), full area, click → onClose)
  card (centered, ~top-1/5 of screen, max-w-lg, bg-surface-primary, border border-fg-08, border-radius: 22px, shadow)
    SearchInput bare (autofocus on open, value=query, onChange, onKeyDown)
    results list (only when query.length > 0)
```

### Filtering
Flatten all `children` from `WORKSHOP_ROUTES`. Filter where `label.toLowerCase().includes(query.toLowerCase())`. Show parent section label as dimmed secondary text on each row.

### Result rows
Use `.docs-nav-item` class. Matched substring highlighted via `HighlightMatch` component (full opacity + 2px underline, 3px offset). Section label at 11px, 48% opacity, pushed right. On click:
```js
navigate(`/workshop/${child.path}`)
onClose()
```

### Keyboard
- `Escape` → `onClose()`
- `Enter` → navigate to first result + `onClose()` (when results exist)
- Global shortcut listener lives in `WorkshopLayout` (`⌘K` / `Ctrl+K` / `Alt+B`)

---

## Status

**Complete** — implemented 2026-02-28. See session log.
