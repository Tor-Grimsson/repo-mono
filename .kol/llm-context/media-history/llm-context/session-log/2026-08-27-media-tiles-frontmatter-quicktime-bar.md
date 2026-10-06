# Session: Frontmatter in previews, Finder media tiles, QuickTime overlay bar, three DS rounds

**Date:** 2026-08-27
**Agent:** Claude (Grim)
**Summary:** Markdown previews show their frontmatter; audio and video get Finder-style column tiles (cover / poster, hover disc) and the overlay gets an audio player with cover and a QuickTime-style video bar; three DS tickets closed same-day (facts + tiles 0.106.0, filled pause icon 0.21.0) and one compiled ticket is open.

## Changes Made

### Files Modified
- `src/DocFrontmatter.jsx` (new), `src/lib/frontmatter.js` (new) — the workshop's `DocsFrontmatter` ported (icon + label keys, mono values, tags as `Tag`, arrays stacked); parser verbatim from the workshop engine. Rendered above `KindPreview`'s prose in a `.r2b2-doc` page (overlay: 1:√2 page, 24px; column: zoomed 0.5, 24px).
- `src/AudioTile.jsx` (new) — `AudioTile` / `VideoTile` (full-bleed cover or poster, media element hidden, `PlayDisc` on hover), `AudioSheet` (cover above the DS `AudioPreview`), `VideoSheet` (QuickTime bar: skip ±15 · play · elapsed · DS `Slider` with remaining readout · volume popover; `bg-fg-absolute-64`, radius 4).
- `src/lib/id3.js` (new) — ID3v2.3/2.4 `APIC` reader, one ranged fetch, front cover preferred.
- `src/FileList.jsx` — `renderPreview` on `ColumnBrowser` (images cover the square; markdown page; audio / video tiles; rest `KindPreview`); lightbox: audio → `AudioSheet`, video → `VideoSheet`, markdown → page; caption shows dimensions + length; `formatLength` from the DS.
- `src/SettingsPanel.jsx` — footer composed locally: framework `ThemeToggle` (`fill="subtle"`, icon-only, sm) beside reset. `index.html` carries the framework theme boot script.
- `src/index.css` — `.r2b2-doc` page rules; `.r2b2-play` disc (user-tuned: `bg-fg-inverse-64`, `border-fg-96` 2px, shadow `0 0 4px 3.5px .4`, white glyph, hover-only, no backdrop-filter); column preview: top-start only for prose/code, codeblock border + wrapper margin zeroed; `KindPreview`'s 70ch wrapper neutralised in the page.
- `pnpm-workspace.yaml` / `package.json` — kol-component **0.106.0**, kol-icons **0.21.0**.
- `lobby/` — receipts: `ColumnBrowserMediaFacts` 🟢, `PauseIconFilled` 🟢, `PlayDiscAndVideoBar` 🔵.
- `_tmp/2026-08-27-audiopreview-local/`, `_tmp/2026-08-27-theme-local/` — retired locals; `cf-swap-3.png` → `_tmp/2026-08-26-root-screenshots/`.

### Features Added/Removed
- Frontmatter block in markdown previews (overlay + column).
- Finder tiles for audio / video in the column; embedded cover art for audio.
- Overlay: audio with cover + DS player; video with the QuickTime bar (native controls off).
- Theme toggle in the settings footer.
- DS: `ColumnBrowser` facts now carry Dimensions (video) + Length (audio / video); `AudioPreview` / `AudioTile` / `VideoTile` / `formatLength` live in the DS; `pause` is the filled glyph.

## Current State

### Working
- All of the above on the user's server; lint green.

### Known Issues
- The user reports a saturation shift on hover over the video tile; the disc's backdrop-filter was removed for it — unverified. Isolation check pending: does an **image** file shift on hover too (DS frame) or only the tiles (disc)?
- `slider-01` knobs are stroked in the icon set (no filled version exists) — in the open ticket.
- `kol-framework.css` overlay clash still overridden locally, not filed.
- Prod is behind (last deploy = the local drawer).

## Next Steps
1. Hover isolation check on an image file; then `PlayDiscAndVideoBar` return → bump, drop `src/AudioTile.jsx`, `.r2b2-play`, the `renderPreview` audio / video branches.
2. File the framework overlay clash + overlay page + frontmatter block to the DS after the verdict; bump; drop overrides.
3. `pnpm deploy`.
