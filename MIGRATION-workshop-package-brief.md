# Migration brief — repoint `apps/web` onto `@kolkrabbi/kol-workshop`

**From:** the kol-design-system agent (2026-07-09)
**To:** the kol-monorepo agent
**Status:** package built + **render-verified** in the DS showcase (`/workshop-docs` — shell + engine + docs viewer, 0 console errors); **not yet published.** Do not start the repoint until the DS side confirms publish (this brief is so you know what's coming).

---

## What shipped

The whole workshop docs subsystem was lifted out of `apps/web` into a new 5th DS UI package, **`@kolkrabbi/kol-workshop`**. It is **not self-contained** — it reuses the shell chrome that already lives in the DS. See the full reference: `kol-design-system/docs/documentation/04-compositions/04-workshop-system.md`.

**The package owns:** the engine (`parseDocsMarkdown`, `parseFrontmatter`, `buildInventory`, `matchSearchItems`, tag math, doc-helpers), the docs viewer (`DocumentationReader` + `DocsArticle`/`DocsHeader`/`DocsFrontmatter` + `render-tokens`), the tag system (`TagMode*`, `TagGraph`), the shell composition (`ShellLayout`, `ShellSidebar`), and the example compositions (`WorkshopSidebar`, `WorkshopDefaultSidebar`).

**The package REUSES (import from the DS, do NOT keep local copies):**

| Symbol | Import from |
|---|---|
| `AppShell`, `SideNav`, `ShellHeader`, `ThemeToggle` | `@kolkrabbi/kol-framework` |
| `ShellDrawer`, `ShellSearchOverlay`, `SearchInput`, `DocsToc`, `Icon`/`Button`/`Input`/`Tag`/`CodeBlock`/`Divider` | `@kolkrabbi/kol-component` |
| chrome CSS (`.shell-*`, `.docs-*`) | `@kolkrabbi/kol-theme` (`kol-components-workshop.css`, already in the theme aggregate) |

## The repoint

1. **Add the dep:** `@kolkrabbi/kol-workshop` (+ ensure `kol-framework`/`kol-component`/`kol-theme` are current). `d3` rides in transitively.
2. **Delete the now-migrated `apps/web` sources** (they moved into the package or are reused from the DS): `components/shell/*`, `components/workshop/docs/*` + `components/workshop/Workshop*Sidebar.jsx`, `routes/workshop/DocumentationReader.jsx`, `utils/parseDocsMarkdown.jsx`, `utils/docsHelpers.js`. Keep `data/workshop/*` (your content/nav data — that's the injected input, see below).
3. **Repoint imports** to `@kolkrabbi/kol-workshop` (+ the DS shell primitives above).

## The content-injection seam — `apps/web` now provides the content

The package **never globs docs.** `apps/web` keeps the `@docs` Vite alias + `import.meta.glob` and feeds them in:

```js
import { buildInventory, parseDocsMarkdown } from '@kolkrabbi/kol-workshop/engine'
const modules   = import.meta.glob('@docs/documentation/0[0-9]-*/*.md', { eager: true, query: '?raw', import: 'default' })
const inventory = buildInventory(modules)
// pass to the components: inventory, routes/basePath, docHref(id), tagHref(tag)
```

The components take **props** where they used to import app singletons: `inventory`, `routes`, `basePath` (default `/workshop`), `docHref(id)`, `tagHref(tag)`. `TagModeProvider` carries `inventory`/`docHref`/`tagHref` on its context. Your `WORKSHOP_ROUTES` + `buildWorkshopSearchItems()` become the `routes`/`searchItems` you pass in.

## Gotchas

- **`ShellHeader` API changed.** The DS `ShellHeader` is `brand`/`nav`/`isActive`/`onNavigate`/`actions`/`onMenuClick` (not the old `routes`/`brandLogoSrc`/`onSearchOpen`/`onMenuOpen`). The package's `ShellLayout` already adapts it — if you were calling `ShellHeader` directly anywhere else, adapt those call sites too.
- **Icon gaps.** 5 frontmatter field icons (`type`, `calendar`, `layers`, `tag`, `clock`) have no `kol-icon-set-v1` equivalent → dropped (label kept). `share-2` (graph-view toggle) → remapped to `polygon`. If you want them back, register custom icons via `registerIcons()` or author them into v1.
- **Render-verified in the DS**, not in *your* app. The DS proved shell + engine + docs viewer at `/workshop-docs` (0 console errors, title-case labels — the package CSS is clean). Still eyeball after the repoint with *your* content + routes; watch the `.shell-*` / `.kol-btn` cascade on the reverted chrome buttons.
- **`useTheme`/`KolWordmark`/`KolLogomark`** don't exist in the DS — the shell uses the `ThemeToggle` component + a `brand` node. If `apps/web` relied on those hooks/components elsewhere, replace them.

## Reference

- Full system map: `kol-design-system/docs/documentation/04-compositions/04-workshop-system.md`
- Package: `kol-design-system/packages/workshop/`
- Engine self-check: `node packages/workshop/src/engine/__check.mjs`
