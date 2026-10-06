# Deprecation ledger — monorepo

> Living list of what is deprecated and slated for removal from the monorepo. One line per item:
> what · why · replacement · status. Update the same turn something gets deprecated or deleted.
> Sibling: `02-dead-code.md` (found-dead code), `migration-status-board.md` (brand migration).

## Removed (done)

| What | Replaced by | When |
|---|---|---|
| `useSectionExpansion.js` + `WorkshopExpansionContext.jsx` + `StyleguideExpansionProvider` | open PageSections (no accordion) | 2026-07-09 |
| `SectionToggle` (`@kol/ui` molecule + export + tokens registry + showcase demo + `SectionTogglePreview.jsx`) | nothing — pattern retired | 2026-07-09 |
| `DesPage.jsx` (workshop page header) | framework `PageSection` intro | 2026-07-09 |
| EXPAND-ALL toggle (`allExpanded`/`onToggleAll` on `WorkshopSidebarContent`) | nothing | 2026-07-09 |
| ComponentPreview per-block Show/Hide chrome | demos render always | 2026-07-09 |
| `dashboard/chess` nav child + route | redirect → `chess/metrics` | 2026-07-09 |
| `RightGroteskMono` as `--kol-font-family-mono` value (web legacy `theme.css`) | JetBrains Mono (canon) | 2026-07-09 |
| ≥1600 shell width bumps (rails 320/256, logo 320 in `components.css`) | base widths everywhere | 2026-07-09 |
| `max-w-[1800px]` shell clamps (ShellLayout + ShellHeader ×2) | full-bleed shell + `.kol-page` container model | 2026-07-09 |
| Local dashboards fork (`@kol/ui/dashboards` + `dashboard.css` + exports) | `@kolkrabbi/kol-component@0.7.0/dashboards` + `kol-theme@0.7.0/kol-components-dashboards.css` — 4 consumers + `index.css` repointed, published & consumed, build green | 2026-07-09 |
| `@kolkrabbi/kol-component/dashboards` subpath (interim host) | standalone **`@kolkrabbi/kol-dashboards@0.1.0`** (JS-only; chrome CSS stays `kol-theme@0.7.1/kol-components-dashboards.css`, unchanged) — 4 import sites (`Metrics` + workshop `DashboardComponents`/`DashboardMetricsSetup` + `ChessMetrics`) specifier-swapped, all 17 imported symbols verified against the new export set, build green | 2026-07-09 |
| Local chess fork (`components/workshop/chess/`, `@kol/ui/chess` + `./chess`/`./css/chess.css` exports, `packages/ui/css/chess.css`) | `@kolkrabbi/kol-component@0.7.0/chess` (props-based `chessData` adapter from `@kol/chess-data`) + `kol-theme@0.7.0/kol-components-chess.css` — ChessAnalysis + ChessComponents repointed, CSS centralized in `index.css`, both local trees deleted, build green | 2026-07-09 |
| `@kolkrabbi/kol-component/chess` subpath + local `@kol/chess-data` pkg | standalone **`@kolkrabbi/kol-chess@0.1.0`** (components + engine + data: `./data` = sample + bucket-loaders for the big set; 16-fn interface **identical** to `@kol/chess-data`). CSS stays `kol-theme@0.7.1/kol-components-chess.css`. Repointed: 2 component sites (`ChessComponents`/`ChessAnalysis`) → `@kolkrabbi/kol-chess`, 3 data sites (`+ChessMetrics`) → `@kolkrabbi/kol-chess/data`; `@kol/chess-data` dep removed from web; build green. ⚠️ `packages/chess-data/` still on disk (orphaned — deletion needs user OK). Render-verify the big-set **bucket URL** (package loader vs old local). | 2026-07-09 |
| Local workshop docs-system fork (`components/shell/*`, `components/workshop/docs/*`, `Workshop{,Default}Sidebar.jsx`, `utils/parseDocsMarkdown.jsx` + `docsHelpers.js`, `packages/ui/css/docs.css`, 290 lines `shell-*` in `components.css`) | `@kolkrabbi/kol-workshop@0.1.0` (shell/docs/tags/engine/compositions) + `@kolkrabbi/kol-theme@0.7.1/kol-components-workshop.css` (imported last → wins cascade) — `App.jsx` + 18 routes + `Documentations`/`WorkshopSidebarContent` repointed; `DocumentationReader.jsx` → 25-line wrapper feeding the package via the Vite `import.meta.glob` injection seam; `DocsToc`→`@kolkrabbi/kol-component`; `parseDocsMarkdown`/`isIndexFile`→`/engine`; build **5/5 green** (static only — render-verify pending) | 2026-07-09 |

## Deprecated (in place, removal pending)

| What | Why | Replacement | Blocker |
|---|---|---|---|
| `DesSection.jsx` | page-level role dead; 38 preview components still use it as internal sub-header | PageSection headers / preview rework | preview-component sweep |
| Legacy type system in `packages/ui/theme.css` (`RightGrotesk`/`RightGroteskCompact` no-space families, flat `.woff`; dupe `RightGrotesk`@500) | superseded by canon kol-theme families (spaced names, full cuts, woff2) | `@kolkrabbi/kol-theme` typography | legacy→canon convergence slice |
| `.kol-prose` in web `prose.css` (blog prose) — NAME CONTESTED with canon | two systems share one class; web's wins (unlayered) | rename one side | convergence slice (decide owner of the name) |
| `docs-*` / `DocsArticle` idiom on non-reader pages | superseded by PageSection anatomy | canonical anatomy | DocumentationReader mapping (owner call) |
