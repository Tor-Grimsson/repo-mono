# MediaLibraryReconcile — brand /library and media.kolkrabbi.io are two renders of one bucket

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/MediaLibraryReconcile.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.69.0 · theme 0.53.0; remainder here = the bump

## Why it went there

Brand `/library` renders the DS `MediaLibrary` page variant
(`apps/brand/src/pages/Library.jsx:52`); media.kolkrabbi.io renders kol-r2b2's
`FileList`. Same bucket, same `MediaCard` / `MediaRow`, different organism —
Finder disclose-in-place, foot path bar, ~155px tiles, no sort direction / Flat /
paging / stats here; click-to-enter rows, breadcrumb + stats on top, 260px tiles,
direction, Flat, paging there. kol-r2b2 had already retired the DS `MediaBrowser`
tab on 2026-08-26 as the weaker of three renders. The DS copy is the weaker one
and this site is a consumer, never the source — the page variant converges on
FileList in the DS.

## Remainder here once it ships

bump kol-component; `Library.jsx` needs no edit unless the new props
(`pageSize` · `defaultSort`) are wanted; eyeball `/library` against
media.kolkrabbi.io

## ✅ RETURNED — 2026-08-26 · kol-component@0.69.0 · kol-theme@0.53.0

The page variant is FileList's read-only render: breadcrumb on top, the stats line (whole-bucket figures at root or in flat), folder rows that ENTER a prefix, a bare toolbar (filter + search | `Flat` · `ViewToggle` · Divider · sort labels with direction, click active flips), 260px tiles / gap 12, `Show N more · N remaining` paging, Copy URL + ghost download beside the chip. Props: `pageSize` 60 · `defaultSort` `{ by: 'date', dir: 'desc' }` · `flat`. Provider is prefix-scoped now — **BREAKING for `useMediaLibrary()` consumers** (`rows` / `expanded` / `toggleFolder` gone); `Library.jsx` uses the component only, not the hook. Finder's disclose-in-place is dropped, not a variant. Measured live in the showcase over the website bucket.

**Remainder here:** bump kol-component >=0.69.0 + kol-theme >=0.53.0 in both apps; eyeball `/library` against media.kolkrabbi.io

✅ **Remainder executed 2026-08-26 same session:** component ^0.69.1 + theme 0.53.0 in both apps. The bump exposed kol-framework 0.24.0 nesting component 0.68.1 (`dependencies` caret) → `pnpm-workspace.yaml` override + `FrameworkComponentPeer` filed; `pnpm why` → one version in web and brand. `/library` eyeball against media.kolkrabbi.io is the user's.
