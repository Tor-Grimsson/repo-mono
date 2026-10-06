# Session: Workshop docs-system → @kolkrabbi/kol-workshop

**Date:** 2026-07-09
**Agent:** Claude (Grim)
**Summary:** Identified the mystery "workshop nav set" as a whole new 5th DS package (`@kolkrabbi/kol-workshop@0.1.0`) and repointed `apps/web`'s `/workshop` docs system onto it — JS from the package, chrome CSS from `kol-theme@0.7.1`, all local forks deleted. Full build 5/5 green (static; render-verify is user-side).

## The blocker that got fixed first

The DS migration brief said the chrome CSS "already ships in `kol-theme/kol-components-workshop.css`, no bump needed." **False vs the registry** — verified the published `kol-theme@0.7.0` pack manifest + the installed `node_modules` copy: the file was authored *after* 0.7.0 shipped and never republished (repo still versioned 0.7.0; npm rejects same-version republish). Bumped `packages/theme/package.json` 0.7.0→0.7.1 in kol-ds, pack-verified the file ships + is aggregated (`kol-theme.css:46`), user pushed → CI (changesets, push+version-gated on `main`) published 0.7.1. Pulled it (`pnpm update -r @kolkrabbi/kol-theme --latest`).

## Changes (apps/web)

### Repointed
- `App.jsx` — 4 local imports (`ShellLayout` + `Workshop{,Default}Sidebar` + `TagModeProvider`/`TagModeGate`) → one `@kolkrabbi/kol-workshop`; added `documentationInventory` import + `docHref`/`tagHref` consts; wired `inventory`/`docHref`/`tagHref` into `TagModeProvider` and `routes`/`inventory`/`basePath` into the two sidebar compositions (package props are route-decoupled).
- 18 workshop route files — `ShellTocContext` → `@kolkrabbi/kol-workshop` (bulk sed).
- `data/workshop/navigation.js` — `parseDocsMarkdown` + `isIndexFile` → `@kolkrabbi/kol-workshop/engine` (React-free).
- `routes/workshop/Documentations.jsx` — `DocsArticle`/`useTagMode` + `parseDocsMarkdown`/`renderInlineTokens` → `@kolkrabbi/kol-workshop`.
- `components/workshop/molecules/WorkshopSidebarContent.jsx` (stays) — `DocsToc` default import from `../docs` → named from `@kolkrabbi/kol-component`.
- `routes/workshop/DocumentationReader.jsx` — **380-line file → 25-line wrapper**: keeps only the Vite `import.meta.glob('@docs/…')` (the injection seam) + `documentationInventory`, renders the package's `DocumentationReader` with `inventory`/`modules`/`docHref`/`routes{docsIndex,components,tagHref,docFilePath}`.

### CSS (index.css + packages/ui)
- `index.css` — dropped `@import "@kol/ui/css/docs.css"`; added `@import "@kolkrabbi/kol-theme/kol-components-workshop.css" layer(components)` **last** (after chess/dashboards) so the theme wins the cascade.
- `packages/ui/css/components.css` — excised the 290-line `shell-*` block (2881–3170; only `shell-*` + a `toggle-switch-label` ≥1600px bump the theme carries). 0 `shell-*` rules remain.

### Deleted
- `components/shell/` · `components/workshop/docs/` · `components/workshop/WorkshopSidebar.jsx` · `WorkshopDefaultSidebar.jsx` · `utils/parseDocsMarkdown.jsx` · `utils/docsHelpers.js` · `packages/ui/css/docs.css`.

### DS repo (kol-ds, external — user pushed)
- `packages/theme/package.json` 0.7.0 → 0.7.1.

## Current State

- `turbo run build --force` **5/5 green** (web + brand + studio + chess-data + fontviewer). Web = 9854 modules.
- Filter-free sweep: **zero** references to any deleted module.
- Theme covers the full chrome (docs-* + tag-graph-* + inline-tag-pill + shell-*), verified before excision.

## Known Issues / Next Steps

1. **Render-verify (user)** — build is static-green only; the brief shipped kol-workshop render-untested. Eyeball on `/workshop` + `/workshop/docs/:id`: shell chrome cascade, docs reader, force-directed tag graph. Watch `renderInlineTokens` tag links on the docs landing page — the package signature added a 4th `tagHref` param the old call site didn't pass.
2. **Git** — monorepo changes uncommitted (user's to commit); kol-ds theme bump already pushed + published.
3. Package `WorkshopSidebar`/`WorkshopDefaultSidebar` are "reference compositions" — if the monorepo sidebar had bespoke tweaks vs the package version, they'd surface at render-verify.
