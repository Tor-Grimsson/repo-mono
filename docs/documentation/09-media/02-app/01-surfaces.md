---
title: Surfaces
type: reference
status: active
updated: 2026-08-27
verified: 2026-08-27
description: The two MediaLibrary pages the app renders, the props each one takes, why they are stacked rather than tabbed, and the three-unit layout they sit in.
aliases:
  - surfaces
  - pages
tags:
  - domain/design-system
  - project/kol-monorepo
covers:
  - the browse and library page variants and their props
  - the stacked-not-tabbed decision and what it costs
  - the three-unit page layout and its spacing
  - the two hostnames and how read-only is decided
sources:
  - apps/media/src/App.jsx
  - apps/media/src/lib/client.js
  - node_modules/@kolkrabbi/kol-component/src/organisms/MediaLibraryPages.jsx
related:
  - "[[INDEX|the app]]"
  - "[[02-ds-components|DS components]]"
  - "[[04-local-overrides|local overrides]]"
---

# Surfaces

The app is one page showing one bucket. That page is assembled from **two** design-system organisms stacked on top of each other, sharing a single set of state.

## The two variants

`MediaLibrary` (kol-component, organism) dispatches on `variant`. Two of its four are used here.

| Variant | Renders | Used here as |
|---|---|---|
| `browse` | The header (title · bucket dropdown · lock or upload · settings gear), the breadcrumb row with the ROW \| COLUMN toggle, the `ColumnBrowser` with its preview column, and the folder/file count line. | The top surface. Renders the header for the whole page. |
| `library` | `ContentFilters` (FILES · kind chips · search · SELECT / FLAT · grid \| list \| off · sort · the selection bar), the card or row wall, paging, the stats line, and the inspector lightbox. | The bottom surface, with `header={false}`. |
| `modal` | The picker overlay. | Not used. |
| `page` | Deprecated alias of `library`. | Not used — pass `library` explicitly. |

### What the app passes

Both get the same object, so the two surfaces cannot disagree about which bucket is open:

```jsx
const shared = {
  client: mediaClient,          // src/lib/client.js — see 03-consuming
  title: 'KOL-R2B2',
  bucket: bucketId,             // controlled; App owns it
  onBucketChange: switchBucket,
  settings,                     // controlled; App persists per bucket
  onSettingsChange: applySettings,
  refreshKey,                   // bump to force a re-list
};

<MediaLibrary variant="browse"  {...shared} prefix={prefix} onPrefix={setPrefix}
              folderTree={folderTree} headerActions={headerActions} />
<MediaLibrary variant="library" {...shared} prefix={prefix} header={false}
              className="r2b2-library" />
```

| Prop | Why this app passes it |
|---|---|
| `client` | The pages never import an API. Everything they fetch or link to comes through this object — see [[03-consuming\|03 — Consuming the buckets]]. |
| `bucket` / `onBucketChange` | Controlled, because App also writes the choice to `localStorage` and resets the prefix. |
| `prefix` / `onPrefix` | Controlled, because the folder path lives in the URL hash so Back/Forward walk folders. |
| `settings` / `onSettingsChange` | The per-bucket display model in `src/lib/settings.js`. The DS ships the same shape as `SETTINGS_BASE`. |
| `folderTree` | The baked tree (`src/data/folder-tree.json`) so the columns draw with no fetch and no spinner. |
| `headerActions` | The app's own upload button, slotted into the DS header beside the lock and gear. |
| `header={false}` | Suppresses the second header — see below. |

## Stacked, not tabbed

The DS splits browsing into two *pages*. This app deliberately renders both at once, one above the other, because **one view** is a standing ruling (2026-08-26): the Admin | Library | Gallery tabs were removed that day and the tab components retired. Stacking reproduces exactly what the old `FileList` did — folder navigator on top, file wall below — without reintroducing navigation.

Two consequences, both real:

- **The library's header is suppressed** with `header={false}`, or the page would show two identical headers.
- **The bucket is listed twice per load.** Each variant runs its own `useBucketLibrary`, and the pages have no shared provider seam. The server sends `cache-control: public, max-age=30`, so the second request is usually a cache hit — this is waste, not breakage. Fixing it means a provider that both pages can sit inside, which is a DS change.

The library's own stats line is also hidden locally, because stacking shows the file count twice — see [[04-local-overrides\|04 — Local overrides]].

## The three units

The page reads as three blocks, and the spacing belongs **between** them, never inside one:

```
┌─ NAV ──────────────────── title · bucket dropdown · upload/lock · settings
│                                                                    ↕ 40px
├─ COLUMN VIEW ──────────── breadcrumb · ROW|COLUMN
│                           the column browser (800px tall)
│                           N folders · N files · size
│                                                                    ↕ 40px + 40px
└─ CONTENT FILTERS ─────── FILES · chips · search · SELECT|FLAT · sort
                           the card / row wall
```

The column view is **one unit**: its breadcrumb, browser and count are spaced by the DS's own `gap-3` and are not to be pulled apart. Two earlier attempts put the air inside that unit (a margin on the browser, then a wider gap on its stack) and both read wrong.

## The two hostnames

Same bundle, same Pages project, different capability:

| Host | What it is |
|---|---|
| `admin.kolkrabbi.io` | The admin surface and the API base. Writable on R2. |
| `media.kolkrabbi.io` | The same app, read-only. `READ_ONLY_HOST` in `src/lib/api.js` flips `BUCKETS.r2.writable` to `false` on this hostname. |

Read-only is decided twice over, and both must hold for a write control to appear: the bucket's own `writable` flag, **and** whether the client carries write seams. The DS computes `writable = bucketMeta.writable && (client.deleteObject || client.renameObject)`. Both B2 buckets are read-only through this app in every case — writes there go through the `bucket` CLI.
