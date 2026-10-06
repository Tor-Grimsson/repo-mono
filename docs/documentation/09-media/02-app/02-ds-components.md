---
title: DS components
type: reference
status: active
updated: 2026-08-27
verified: 2026-08-27
description: Every design-system part this app renders — which package and tier it lives in, its import path, and what it does here. Includes the import rule that keeps react-router-dom out of the bundle.
aliases:
  - ds-components
  - components-consumed
tags:
  - domain/design-system
  - project/kol-monorepo
covers:
  - the five KOL packages and their pinned versions
  - the deep-import rule and why the barrel is banned
  - every atom, molecule, organism and utility rendered here
  - which of them were promoted out of this repo
sources:
  - package.json
  - apps/media/src/App.jsx
  - node_modules/@kolkrabbi/kol-component/src/organisms/MediaLibraryPages.jsx
related:
  - "[[01-surfaces|surfaces]]"
  - "[[04-local-overrides|local overrides]]"
  - "[[../04-components/INDEX|04 — Components]]"
---

# DS components

The design system is **installed, not vendored**. Nothing under `src/components/` is authoritative any more; the packages in `node_modules/@kolkrabbi/` are.

## The packages

| Package | Pinned | What it gives this app |
|---|---|---|
| `@kolkrabbi/kol-component` | `^0.118.3` | Every rendered component, plus the media utilities (`mediaKinds`, `ratios`, `id3`, `frontmatter`). |
| `@kolkrabbi/kol-theme` | `^0.79.0` | All CSS — tokens, component chrome, type roles, and the `kol-sources.css` manifest. |
| `@kolkrabbi/kol-icons` | `^0.23.0` | The one icon set (`kol-icon-set-v1`). |
| `@kolkrabbi/kol-framework` | `0.29.0` | The page-width wrapper and `ThemeToggle`. Pinned exactly, not caret. |
| `@kolkrabbi/kol-media-client` | `^0.2.0` | `createMediaClient` — the listing and URL layer. See [[03-consuming\|03 — Consuming the buckets]]. |
| `gsap` | `^3.15.0` | Not KOL. Drives the resize-handle pill's trailing motion — see [[04-local-overrides\|04]]. |

New versions must be added to `minimumReleaseAgeExclude` in `pnpm-workspace.yaml` or `pnpm outdated` and `pnpm install` will not see them.

## The import rule

**Deep tier imports only.**

```js
import MediaLibrary from '@kolkrabbi/kol-component/organisms/MediaLibrary';  // ✅
import { MediaLibrary } from '@kolkrabbi/kol-component';                     // ❌
```

The barrel re-exports `ExitPreview`, which imports `react-router-dom`. This app has no router, so the barrel breaks the build. The `exports` map is:

| Subpath | Resolves to |
|---|---|
| `./atoms/*` · `./molecules/*` · `./organisms/*` · `./utilities/*` | `src/<tier>/*.jsx` |
| `./hooks/*` | `src/hooks/*.js` |
| `./utilities/{id3,frontmatter,markdownToHtml,mediaKinds,ratios}` | explicit `.js` entries |

Those five explicit entries exist because the wildcard only reaches `.jsx`. A `.js` utility without its own entry resolves to a file that does not exist — the failure is `ERR_MODULE_NOT_FOUND` at build, and it has bitten twice (`id3` on 2026-08-27, then `mediaKinds` and `ratios` the same day). If a new `.js` utility appears upstream and cannot be imported, that is the cause.

## What this app imports directly

Four things only — the rest arrives inside `MediaLibrary`.

| Import | Tier | Used for |
|---|---|---|
| `organisms/MediaLibrary` | organism | Both surfaces. |
| `atoms/IconFrame` | atom | The upload button passed in as `headerActions`. |
| `atoms/Button` | atom | `src/UploadZone.jsx`. |
| `@kolkrabbi/kol-media-client` | — | The client in `src/lib/client.js`. |

## What `MediaLibrary` renders on this app's behalf

Everything below is composed inside the organism. Listed so a reader can find the real source when something looks wrong — the file to open is in `node_modules/@kolkrabbi/kol-component/src/`, never in this repo.

### Atoms

| Component | Role on screen |
|---|---|
| `Button` | The filter and search triggers in the wall's toolbar. |
| `Divider` | Rules inside the settings drawer. |
| `Input` | Inline rename, and the search field. |
| `IconFrame` | The lock, the settings gear, playback glyphs, row actions. |
| `ActionButton` | The download chip on a card, and in the lightbox caption. |
| `SizeOrDownload` | The card's size slot — turns into a download affordance on hover. |
| `ToggleCheckbox` | Selection checkbox, `variant="media"` so it reads over artwork. |
| `ViewToggle` | ROW \| COLUMN, and grid \| list \| off. |

### Molecules

| Component | Role on screen |
|---|---|
| `Dropdown` | The bucket switcher, and every one-of-N row in the settings drawer. |
| `ContentCard` / `ContentRow` | The wall, `variant="default"`. |
| `SortControls` | NAME · DATE · SIZE · KIND with direction. |
| `KindPreview` | The column's preview pane — routes by kind to an image, a tile, a document page or a placeholder. |
| `AudioSheet` / `VideoSheet` | The lightbox players. `AudioSheet` has `cover` and `sheet` variants. |
| `PlaybackBar` | The QuickTime transport inside both sheets. |
| `DocPage` / `DocFrontmatter` | Markdown · text · code · JSON · YAML on one page plate, frontmatter above the prose. |
| `AudioTile` / `VideoTile` | Finder-style column tiles with the play disc. |
| `LabeledControl` | The label-plus-control row the settings drawer is built from. |

### Organisms and utilities

| Component | Role on screen |
|---|---|
| `ContentFilters` | The whole filter wall chrome. |
| `ColumnBrowser` | The Finder columns, preview pane, keyboard cursor, resize handles. |
| `SettingsPanel` + `LabeledControlSection` · `SettingsRow` · `SettingsSwitch` · `SettingsChoice` · `SettingsMulti` · `SettingsFooter` | The display-settings drawer. |
| `FullscreenOverlay` | The lightbox shell — scrim, Esc, backdrop close, scroll lock. |
| `utilities/mediaKinds` | `kindOf` · `KINDS` · `KIND_LABEL` · `partition` · `groupVariants` · `groupSegments` · `posterFor` · `isSystemFile` · `isSegment`. |
| `utilities/ratios` | `nearestRatio` — snaps a preview frame to the nearest export-specs ratio. |
| `utilities/id3` · `utilities/frontmatter` | Embedded cover art; YAML frontmatter parsing. |

## Promoted out of this repo

Most of the above was written here first and moved upstream, which is why it fits so exactly. Filed via `lobby/outbox/`, all closed 2026-08-26 → 27:

| Went up as | Shipped in |
|---|---|
| `ContentFilters` collection, `SortControls`, `SizeOrDownload`, `ToggleCheckbox variant="media"` | component 0.93.0 |
| `ColumnBrowser` (+ cursor, crumb and media-facts follow-ups) | component 0.96.0 → 0.106.0 |
| `SettingsPanel` drawer, then its section/dropdown/chip rulings | component 0.69.0 → 0.104.0 |
| `KindPreview` markdown, then `DocPage` + `DocFrontmatter` | component 0.101.0, 0.114.0 |
| The play disc, `AudioTile` / `VideoTile`, `VideoSheet`, `PlaybackBar`, `AudioSheet` | component 0.107.0, 0.114.0 |
| `ColumnBrowser` height and per-column width drags | component 0.113.0, 0.115.0 |
| `SettingsSection` → `LabeledControlSection` rename | component 0.112.0 (BREAKING) |
| `MediaLibrary variant="browse" \| "library"` — the whole of `FileList.jsx` | component 0.118.0 |
| `lib/media.js` → `utilities/mediaKinds`, `lib/ratios.js` → `utilities/ratios` | component 0.118.0 |

**Consequence for a reader:** a bug in how a card, a column or a player behaves is almost never fixable here. Reproduce it, then file to `kol-ds-ui/lobby/` — the round trip took hours, not days, on 2026-08-27.
