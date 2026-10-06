# Session: Mobile stack mode measured, the app on the home screen, and a vector sweep

**Date:** 2026-09-03 → 2026-09-04
**Agent:** Claude (Grim)
**Summary:** Bumped 30 minors and ran the DS deletions owed since 09-02, measured the new mobile stack mode on a real phone and reported two defects back, filed the follow-up the first ticket should have contained, made the app installable to the home screen, and swept 608 identity assets out of `~/dev/projects/*` into `_media/` for review.

## Changes Made

### Files Modified
- `package.json` — component 0.167.0 → **0.197.0** · theme 0.132.0 → **0.142.0** · framework 0.36.0 → **0.44.0** · icons 0.25.0 → **0.26.0** · media-client 0.3.2 → **0.4.0**. Two bumps: 0.197/0.142 mid-session, and 0.164/0.129 before that.
- `src/index.css` — **175 → 63 lines.** Every `.kol-*` block from `BrowsePageRulingsAndSeams` deleted after verifying each rule in the bumped source: the grab pill, row shape, the one-fill ruling, `.kol-overlay-close`, the `.kol-doc-page` 3:5 cap. Then the safe-area insets for standalone. What remains is `.r2b2-library`, `.r2b2-browse` (the count line the DS declined) and `.r2b2-kind-tile`.
- `src/App.jsx` — **217 → 147 lines.** The ~60-line GSAP grab tracker and its `pointermove` handler are gone (`useGrabEdge` inside the organism now, one gesture shared with the rail); the `MutationObserver` + `createPortal` footer hack is now `settingsFooter={<ThemeChip />}`. `gsap` and `createPortal` imports dropped — but **gsap stays a dependency**, the DS hook imports it.
- `index.html` — manifest, `apple-touch-icon`, `mobile-web-app-capable`, `apple-mobile-web-app-title`, `black-translucent` status bar, light/dark `theme-color`, and `viewport-fit=cover`.
- `public/manifest.webmanifest` (new), `public/touch-icons/` (new, 4 files from kol-website).
- `.gitignore` — `_media/`.
- `_media/` (new) — `svg/**`, `build-sheet.py`, `sheet.html`, `INDEX.md`, `manifest.json`.
- `lobby/` — `ColumnBrowserMobileViews` filed, `ColumnBrowserStackMode` measured and answered, both ledgers squared.

### Features Added/Removed
- **Add to Home Screen.** Standalone, KOL mark, "R2B2" as the label — about 180pt of an 844pt phone back. Safe-area insets resolve to 0 in a normal tab, so the rule costs nothing there.
- Removed: the local grab tracker and the footer portal, both now DS seams.

## Current State

### Working
- Deployed, both hosts 200, live CSS hash matches the local build. Lint, settings tests and build green.
- The mobile stack mode is live and three of its seven items verified on a device.

### Known Issues
- **The measured defects (reported to kol-ds-ui, appended to their entry).** `ColumnBrowser.jsx:487` — inline expand is *not implemented*: a flat loop, one pass per level, appends every folder then every file then descends. A loop that appends cannot insert, so an open folder's children always land after **all** its siblings. Their comment at `:485` says "spliced in directly under it"; `:494` says "nothing recursive here". The second is why the first isn't true. And `:502` — `metaOf` formats the size and passes `o.uploaded` through raw, so a row reads `2026-06-19T02:00:14.629Z`.
- **The first ticket was an underspecification, and that is the session's real lesson.** `ColumnBrowserStackMode` pulled *one navigation rule* out of eight reference screenshots. The DS built exactly that rule, correctly, and it shipped thin — *"kinda underwhelming… did you even look at the refs?"* The refs are **five views** (list · list-expanded · grid · media player · image viewer) plus a chrome constant across all of them: search pinned top, floating tab pill, `···` for view mode and sort. Item 5 said "rows carry size · date", which is why folders render bare — they have neither.
- `kol-vector`'s 20 `form-*.svg` carry **no fill at all** and render as nothing on any ground.
- `_media/svg/kol/logo/` holds 18 files; the `-2`/`-3`/`-4` suffixes are collisions (same filename, different bytes) and need the user to say which wordmark is current.
- `favicon.svg` and `logo.svg` are byte-identical in several repos — the logo has been shipping as the favicon under another name.

## Next Steps
1. **Bump to component 0.204.0 / theme 0.143.0 and measure at 390.** kol-ds-ui shipped items 11 · 12 · 14 (four-zone row, split disclosure, grid) and turned two open questions into seams — `thumbnailFor(o) => node` and `folderMeta(prefix, view) => string`, so the DS neither counts nor fetches. They are **holding 15 and 16** (pinned search, the tab pill) until that row work is measured.
2. **`thumbnailFor` needs a value from us.** Plan was the original with `loading="lazy"`, same as the grids, and see whether a 2 MB JPEG in a 44px box is actually a problem before paying for Image Resizing.
3. **`_media/` review is paused mid-flight.** Loop is: drop files into `_media/svg/**`, run `python3 _media/build-sheet.py`, open `_media/sheet.html`. Then normalise names, then decide the home — the argument landed on `@kolkrabbi/kol-marks` as the source (kol-icons already ships 320 raw SVGs, and a bucket cannot end the copying because boot icons must sit in `public/` anyway) with an R2 `svg/` mirror for browsing. **Nothing is uploaded; R2 still has zero SVGs.**
4. The user wants **only Kolkrabbi logos** kept, not client marks — `_client/`, `olina/` and `hrafn/` are parked, not deleted.
