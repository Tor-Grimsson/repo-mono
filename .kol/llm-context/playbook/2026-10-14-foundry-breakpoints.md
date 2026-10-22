# Playbook — foundry breakpoint audit + the five fixes

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`.

**Goal:** audit every breakpoint in `apps/web/src/components/foundry/` (one table), then fix the five issues the user named on 2026-10-14 off that table. Plan: `plans/2026-10-14-foundry-review.md`.

**Standing rules (non-negotiable):**
- The foundry copy is local (ARCHITECTURE §9) — fixes here, no tickets.
- Tailwind on the element; no new CSS. No padding or size values invented — the DS ladders.
- Audit first, report-only; fixes run off the table.
- Measure on the built app (vite preview :5199, PID noted and killed), never on the user's 5173.

---
## Entries

[02:19 GMT · 2026-10-14] · setup · playbook created
  what → /kol-goal "get it done all of it" on the foundry review   why → the user's walk of /foundry/typefaces/malromur, five items + the breakpoint audit as the goal

[02:20 GMT · 2026-10-14] · audit · static pass (18 files)
  what → rungs per file grepped: FontPreviewSection md:flex + lg:py-16 only (no pad rung, controls a flex third each) · TypefaceVariablePreview NONE + w-[960px] · PairingCard md/lg rungs on width + size (w-[128/240/320]) · TypefaceStyleSection md:w-[35%]/[65%], md:p-12, tiles height:120 fixed, sticky ×3, lg:text-[128px] · VariableFontSection h-[40vh]/md:h-[60vh] + a JS isDesktop · TypefaceAlphabet fontSize 48 fixed, no rungs · TypefaceLibraryGrid text-[140/160px] · TypefacePage hero text 48→144 ladder · GlyphMetricsGrid the one file with a real ladder
  what → web built (dist/app.html → index.html for the SPA fallback) · preview :5199 next, measured at 390 · 768 · 1024 · 1440

[02:22 GMT · 2026-10-14] · audit · measured 1440 (preview :5199, PID 66006)
  what → page pad 48 · hero 540 + mt 68 · preview card pad 24, controls row 1132 wide: 3 sliders × 356 (track 226/203, number input 48), dropdown 130 · variable plate pad 40, h 540 (60vh), word 144 · pairing card pad 24, side 320, title 36, divider 96 · styles panel 854×683 pad 48 sticky, lines 128px, 8 tiles × 120 tall in a 458 column · alphabet 48px no overflow · no section overflows · sections py 64
  note → the only console error is /_vercel/insights 404 (preview, not the app)

[02:22 GMT · 2026-10-14] · audit · measured 1024 + 768
  what → 1024: page pad 48 · preview sliders 3 × 217 (track 88 / 64 / 64, number 48) in a 716 box · variable pad 40 h 480 word 144 · pairing side 320 title 36 · styles panel 584 pad 48 lines 128, tiles 312 wide × 120
  what → 768: page pad 32 · preview sliders 130 / 153 / 153 wide with TRACK 0 — the three sliders are dead at md, the label + number eat the row · variable pad 40, h 540, word 144 (isDesktop ≥768) · pairing side 240 title 28 pad 20 · styles panel 443×355 pad 48 (md:p-12), lines 96, tiles 237 × 120 beside it

[02:24 GMT · 2026-10-14] · audit · measured 390 → table written (plan § 0) ✓
  what → 390: page pad 20 · preview pad 24, Size track 8px, Leading/Spacing hidden, sample 96px in 302 → "Rennimjú…" · variable pad 24 h 253 word 80 · pairing 2 × 128 side by side, title 20, pad 16 · styles panel 350×280 pad 24 lines 60 STICKY top 96 over the tile list, 8 tiles × 120 = 1044 · section header 175 tall · no overflow anywhere

[02:26 GMT · 2026-10-14] · fixes · five files
  what → FontPreviewSection: card p-4 md:p-6 · controls row + sliders box flex-wrap gap-4 md:gap-8 · each Slider w-56 (was flex-1 thirds)
  what → VariableFontSection: plate p-4 md:p-6, inline 60vh/30vh height gone, the word in flow between the two rows (py-8 md:py-12), wrapper flex-col gap-2 md:gap-4
  what → TypefaceStyleSection: panel md:sticky md:top-24 · tiles h-16 md:h-[120px] (inline height gone)
  what → PairingCard: sides flex-1 min-w-0, card flex-col md:flex-row, vertical Divider hidden md:flex + horizontal md:hidden, a specimen per side in its role (heading 32/40/56 · body 16/18) · FoundryTypefacePairing: leftRole/rightRole on the three house pairings, specimens = FOUNDRY_SAMPLE_TEXT (first clause · first sentence)
  verify → rebuilt, 390 re-measured: preview pad 16, Size slider 224 wide track 94 on its own line under the dropdown · variable plate h 250 pad 16 · pairing stacked, side 316, specimen 16px, no overflow · styles panel static, tiles 64, list 596 (was 1044) · no section overflows ✓

[02:27 GMT · 2026-10-14] · verify · 1440 re-measured ✓ · close
  what → preview sliders 3 × 224 on one line (tracks 94 / 71 / 71) in a 736 box, was 1132 · variable plate 378 tall (was 540), pad 24 · pairing sides 615 each, body specimen 18px, heading specimen 56px, divider 96 · styles unchanged at desktop · no overflow at either width
  what → preview :5199 killed · .playwright-mcp/ → _tmp/2026-10-14-playwright-mcp/ · dist/index.html (the SPA-fallback copy) left in dist
  note → open, listed not fixed: SpecimenSectionHeader 175px tall at 390 · TypefaceVariablePreview w-[960px] (library grid, not this page) · lobby: section-split-frame-ratio receipt synced 🟢 (DS closed it on the user's ruling)

──────────── MILESTONE: foundry breakpoints ──────────── [02:27 GMT · 2026-10-14]
  changed: 5 files in components/foundry · plan § 0 table · build ✓
  log: pending /log-work

[02:34 GMT · 2026-10-14] · next · /kol-goal on plans/2026-10-14-next.md, items 2–7, no review gate

[02:39 GMT · 2026-10-14] · next 2a/2b · foundry
  what → SpecimenSectionHeader: the dropdown group w-full md:w-auto, each Dropdown flex-1 min-w-0 md:flex-none (two rows on a phone, not three) · TypefaceVariablePreview: p-4 md:p-6, header row wraps, slider box flex-wrap, sliders w-56 (was a w-[960px] box of thirds) · parse ✓ · web rebuilt, preview :5199 up for the /foundry + /licensing audit

[02:39 GMT · 2026-10-14] · next 3 · metrics (apps/metrics/src/MetricsDashboard.jsx)
  what → section Dropdown at every width, SegmentedToggle gone · METRICS title is an <a> to kolkrabbi.io · keydown: ⌘,/Ctrl+, opens the drawer, Esc closes, 1–4 switch sections, nothing while a field has focus · parse ✓ · not rendered (metrics has its own dev server on 5176; the user reloads)

[02:39 GMT · 2026-10-14] · next 6 · ARCHITECTURE § 8 — the D1 line added

[02:39 GMT · 2026-10-14] · next 7 · R2 structure — DENIED by the auto-mode classifier ("Modify Shared Resources"): the upload of ~/dev/images (3883 files, minus _tmp and .md) through /api/upload. The script is written at the scratchpad r2-upload.sh; the user runs it or allows it. The .dev.vars password works against production (200).

[02:43 GMT · 2026-10-14] · next 4 · Monitor → HLS
  what → ffmpeg 9: monitor.mp4 (2000×1200, 50 s) → 360p/480p/720p/1080p (widths 640/854/1280/1920, 6 s segments, VOD) in the scratchpad hl-monitor/hls + master.m3u8 in the bucket's format + monitor-still.png · uploading to hls-library/video-home/hl-monitor/

[02:43 GMT · 2026-10-14] · next 5 · brand pass
  what → Labels · Bags · Packaging OFF the live site (Assets.jsx, sidebar rows, redirect rows) → _tmp/2026-10-14-brand-fashion-sections/ · the three Another Creation data files (blog · shop · collections, zero importers) → same folder
  note → DNS: the Cloudflare MCP can READ the zone (DMARC is p=none, no rua; Brevo DKIM only; SPF Google); a PATCH adding rua= was DENIED by the classifier ("DNS / Domain / Cert Changes") — the user's to allow or run

[02:45 GMT · 2026-10-14] · next 4 ✓ · Monitor on HLS
  what → 42 files to hls-library/video-home/hl-monitor/ (master 200 on the CDN) · HomeHighlights Monitor tile on the master + still · monitor.mp4 + .png → _tmp/2026-10-14-monitor-mp4/

[02:45 GMT · 2026-10-14] · next 5 · brand pass, mechanical half
  what → colour ramps: LiveSwatch takes a `value` fallback for UNDEFINED tokens; Color.jsx feeds every stop from @kolkrabbi/kol-brand's `brand.ramps` (the `--brand-*` vars never existed) · LetterheadB: the coat-order copy → a Málrómur custom-cut commission, same shape; "atelier" → "studio" · SocialMocks: AC champagne/burgundy → cream/yellow/paper/ink, taglines → the site's own words, photo tiles on brand/images/kol-photoshoot · Social.jsx on the local mocks (the DS social-04/05/06 were AC's) · Profile: paper · cream · yellow · ink
  note → licensing at 1440: FAQ card 768 wide, pad 32, secondary surface, 1px frame, mono-16 answers ✓ · /foundry 1440 no overflow ✓

[02:46 GMT · 2026-10-14] · next 2c ✓ · /foundry + /licensing measured 390 + 1440 (no overflow either; rows added to plan § 0) · web preview :5199 (PID 2076) still up for nothing — killing after the brand sweep · brand preview :5198 (PID 12534) up for the sweep

[02:48 GMT · 2026-10-14] · next 5 · brand sweep (preview :5198, 1440)
  what → /brand: no broken images, no console errors · lockups' "AC art" = kol-component's clearspace-* GRAPHIC_RAW `x` layer (a signature path at opacity .3), NOT the marks → `clearspace={false}` on the four LogoCards; ticket ClearspaceGraphicsAreAnotherCreations filed to kol-ds-ui (entry · row · receipt · our row) · hue ramps now print the package hex (#FFEA57 …) · the Combo lab link (/generators, never a route) → sentence removed from Color.jsx
  what → /assets: no broken images · "burgundy" survives only in the Branded table's stock specs (branded-assets.js — AC garment rows) · Letterhead A: the wordmark SVG rendered 384×114 in a 40px box over the body → `[&_svg]:h-full [&_svg]:w-auto` on the box · envelope: no overflow measured at 1440

[02:49 GMT · 2026-10-14] · next 5 · branded table
  what → branded-assets.js: the nine garment entries (hangtag … gift box) out; the five stationery entries stay · brand rebuilt · verifying /assets + /brand on :5198

[02:51 GMT · 2026-10-14] · close
  what → brand rebuilt + verified on :5198: lockups one SVG each (no ghost), ramps hex, no /generators link, letterhead box 40/40, social photos load, profile grounds, branded table 5 stationery rows · previews :5198 / :5199 killed · .playwright-mcp/ → _tmp/2026-10-14-playwright-mcp/ · session log + AGENT-CONTEXT written · goal closed
  note → ⛔ left for the user: the DMARC rua= PATCH (classifier) · the ~/dev/images → R2 upload (classifier) · clearspace back on when the DS ticket returns

──────────── MILESTONE: the 2026-10-14 queue ──────────── [02:51 GMT · 2026-10-14]
  changed: foundry 8 files · metrics 1 · home 1 · brand 14 · ARCHITECTURE · 2 lobby syncs + 1 ticket · build ✓ ×3
  log: session-log/2026-10-14-foundry-breakpoints-and-the-queue.md

[03:09 GMT · 2026-10-14] · return · ClearspaceGraphicsAreAnotherCreations 🟢 at kol-ds-ui (0.260.0)
  what → registry latest is 0.259.0, 0.260.0 absent (curl, twice) → the ^0.260.0 range did not resolve (installed stayed 0.257.0); package.json back to ^0.257.0, install re-synced (one copy), clearspace stays OFF with the note · receipt 🟢 with a 📌: bump when it lands, drop the four props, eyeball

[03:11 GMT · 2026-10-14] · return consumed · ClearspaceGraphicsAreAnotherCreations
  what → 0.260.0 on the registry minutes later → component ^0.260.0 (all four, one copy) · the four clearspace={false} dropped · brand rebuilt · preview :5198 (PID 58498, killed) + playwright: each lockup card = grid 0.2 · logomark-as-measure 0.3 · the mark; signature paths 0; 0 console errors · receipt 🟢 none · AGENT-CONTEXT + session log corrected

[12:12 GMT · 2026-10-14] · docs + media noindex
  what → media: <meta robots noindex,nofollow> + title "Media — Kolkrabbi" + description + public/_headers X-Robots-Tag → deployed (ef3cc2c8), live headers verified (brand + metrics already had both; media had neither)
  what → docs: 09-media/02-app/05-database.md NEW (permanent keys · list contract · adoption · decks + notes) · 01-r2-kol-media.md API table + contract + caveat on media. · 03-consuming.md adminBase media., storageKey, mediaUrl(row), no-store · 02-app/INDEX row · 05-workshop/06-dashboard.md canonical → active with a "where this stands" block + drift
