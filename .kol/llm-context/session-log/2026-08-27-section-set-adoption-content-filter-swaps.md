# Session: Section set adoption across the site + content-filter swaps (Stack · Prints · Foundry bar)

**Date:** 2026-08-27 (arc ran 2026-08-26 → 27)
**Agent:** Grim
**Summary:** The website's sections now run on ONE DS family (`SectionText` + `SectionHero` · `SectionSplit` · `SectionCards` · `SectionCta` · `SectionFaq` · `SectionNewsletter`), filed as `SectionSet` and grown through ~30 same-day lobby round-trips. `/stack` and `/prints` moved onto the content-card system (`ContentFilters` bar with LIST/GRID, `ContentCollection cols`, `ContentCard`/`ContentRow`); the foundry library got the bar swap and a TEMP DS card/row comparison. Every hand-built hero, the studio text card, `StackHero`, the featured `ListingCard` and 31 hardcoded container caps are gone. Packages: component 0.68.1 → **0.94.0**, theme 0.52.1 → **0.63.0** (0.63.0 / 0.94.0 not yet bumped — see Next Steps), framework → 0.27.1, content → 0.10.2. **Nothing deployed.** Working order ruled by the user mid-arc: **local first, get the look right, then ONE ticket with the final values.**

## Changes Made

### Files Modified
- `apps/web/package.json` · `apps/brand/package.json` — component ^0.93.1 (web/brand), theme 0.61.0, framework ^0.27.1, content ^0.10.2, workshop ^0.24.1, foundry ^0.6.2, store ^0.2.1; **`kol-chess` removed from web** (zero imports — the embeds are iframes) with its `@source` line and `optimizeDeps` stub. `pnpm-workspace.yaml` override came and went (framework declares component as a peer since 0.25.0)
- `routes/Studio.jsx` — `SectionHero variant="split" theme="inverse"` (mood-05 still, focal `70% 50%`, `overlayOpacity` 80, label "Kolkrabbi Vinnustofa", headline "Design studio & Atelier based in Reykjavík", no body/button) · `SectionCards` · `StudioProcessCard` on `SectionSplit height="40"`, no Stack button · `ProfileCard` fills the slot and owns its square. `StudioAboutCard.jsx` → `_tmp/2026-08-26-studio-sectionset/`
- `routes/Stack.jsx` — `SectionHero height="h-[90vh]" justify="end" veil overlayOpacity={80} fullBleed`, image focus centre, `SectionText` panel (display-01 uppercase, mono lede, 720 column) with the Featured card in `foot`; featured = `ContentCard variant="article" hero`; `ContentFilters` (Type `stack: true` · Tags, `mutuallyExclusiveFilters=['type']`, LIST/GRID strip on `kol-helper-14`); `ContentCollection cols={{ md: 3, xl: 4 }}` of `ContentCard`/`ContentRow` article (kicker `kol-card-kicker`, title display-03 uppercase truncate, clamp 2, no tags/date). `StackHero.jsx` → `_tmp/2026-08-26-sectionhero-round2/`. `lib/queries.js` BLOG_FIELDS + `type`
- `routes/prints/PrintsGrid.jsx` — `ContentFilters` (Category `stack: true` · Year, LIST/GRID) → `ContentCollection cols={{ md: 2, lg: 4 }}`; grid `ContentCard variant="print"` (image only, `selected`, rect via `onClick`), list `ContentRow variant="article"` with Stack's exact slot voices. `PrintGridCard` import gone from this route (still in `PrintsGridGsap.jsx`)
- Foundry — `FoundryTypefaces.jsx` on `SectionHero media=[…] height="80"` (carousel mode); `TypefacePage.jsx` `SectionHero height="60"` + `SectionCta centered`; `FoundryLicensing.jsx` text-only `SectionHero` + `SectionFaq` + `SectionCta`; `InDevelopmentSection.jsx` → `SectionCards`. `TypefaceLibraryGridWithVariables.jsx`: bar swapped (LIST/GRID in the layout strip, Kind `stack: true`, DS exclusivity, `titleIcon` prop — set only by `FoundryOtherTypefaces` on the slug pages) + **TEMP** DS `ContentCard`/`ContentRow typeface` as the first item for comparison; new `TypefaceAlphabet.jsx` (the local card's measured alphabet, extracted)
- Home — `Home.jsx` `SectionCards` (+ reveal stamps, `actions`); `HomeFoundry.jsx` `SectionSplit mediaClip={false}` with `TiltCard` restored; `HomeWorkshop.jsx` `SectionCardItem`; `HomeSignup.jsx` `SectionNewsletter` on `bg-fg-absolute-16`. Page gutters (`breakpoint-padding`) off the mains on Home / Stack / Studio / Licensing — set sections gutter themselves; local blocks keep it
- `components/ui/TiltCard.jsx` — `backface-hidden will-change-transform outline-1 outline-transparent` (stair-stepped tilt edge fixed) · `ProfileCard.jsx` lg-h fluid, card owns the square
- `components/layout/Navbar.jsx` — hamburger `Tooltip` removed · `TakeoverMenu.jsx` — heading split into 3 lines (approved), open/close tweens trimmed
- `styles/ui.css` — **two local rules live** (row thumb = fixed square, no thumb zoom on rows) — delete on the 0.94.0 bump; hero `--kol-section-pb` overrides removed
- Site-wide — 31 hardcoded `max-w-[1400/1600/1800px]` → `max-w-[var(--kol-container-max)]` (20 files); 19 elder type classes (`kol-display-lg/section/section-sm`, dead `kol-heading-lg/md/xs`) → numbered roles; all six section reveals re-stamped from the retired locals' delays
- Lobby — `lobby/outbox/` +26 receipts (all 🟢 except the one below), `lobby/INDEX.md` rows + history; kol-ds-ui ledger rows/history for each; two stale stubs squared (`DashboardIconCoverage`, `FontFolderNaming`, `TableMobileScroll`)

### Features Added/Removed
- **Added (DS, via this repo's tickets, all shipped 08-26/27):** SectionSet · vh height ladder `full/80/60/40` on every section · `justify="end"`, `veil`, `foot`/`overlap` (+ clearance = overlap + 32/48) · carousel media with all seams · text-only hero · `theme="inverse"` · `SectionText` bare in the hero · one eyebrow voice · mono-16 body default · `slotClass`/`slotStyle` + `itemClassName`/`itemStyle` + `partClassName` (reveal seams) · `ContentCollection cols` (number + breakpoint map) · `SectionSplit mediaClip` + media bounded by the rung · `ListingCard frame`, article frame off by default · hero zoom rung 1.02 · article title hover dim · `ContentCard article hero` · ContentFilters title `pr-4` · ThemeToggle label = target mode · MediaLibrary page = FileList render · Tight 500 display ramp (`display-lg` etc. aliased) · framework/component peers · `FeaturedCarousel fullWidth`
- **Removed here:** `StudioAboutCard`, `StackHero`, the `ListingCard`/`FeaturedCarousel`/`FullBleedHero`/`FeatureSplit`/`FeaturesCardSection`/`CtaGlobal`/`FoundryCTA`/`CardFeatureItem` imports (zero alias call sites left in web), `kol-chess` dep

## Current State

### Working
- Both apps build green on every step; one `kol-component` in the tree (peers everywhere)
- `/stack` fully on the set — zero page-specific CSS. `/prints` on the set except the 3D flip (returned in 0.94.0, unexecuted). `/studio`, Home, foundry pages, licensing on the section family
- Lobby watch (Monitor `b2magzdpj`, returns on this repo's own receipts only) ran the whole session; dies with it

### Known Issues
- **`ContentRowsAndPrintCard` came back (kol-theme 0.63.0 · kol-component 0.94.0) and is NOT executed** — bump, delete the two `ui.css` rules, then renames at your pace: `kicker`→`eyebrow`, `kickerClass`→`eyebrowClass`, section `label`→`eyebrow`, `kol-card-kicker`→`kol-eyebrow` (all aliased for now)
- Typeface library: TEMP DS card/row comparison is the first item in both layouts — the user is judging `ContentCard typeface` against the local card; DS row's title/year on `text-auto` (ink only), alphabet via `TypefaceAlphabet`. Nothing filed yet (local-first order)
- `/work` swap scoped, not started — two rulings owed: shelf on the navbar toggle vs the bar's strip; does `ContentRow work` carry the hover preview
- Brand `/library` on the reconciled `MediaLibrary` — never eyeballed. `PrintsGridGsap.jsx` still on `PrintGridCard`
- Dev on port 5174 = Sanity CORS blocks `/stack` + `/work` data locally (5173 works)
- The user's dev server must be restarted after package bumps — several "unchanged" reports were a stale module graph

## Next Steps
1. Execute `ContentRowsAndPrintCard`: bump theme 0.63.0 + component 0.94.0, delete the two `ui.css` rules, verify `/prints` flip; renames per the receipt
2. Typeface library: rule the DS `typeface` card/row against the local one (comparison is live), then swap the cards, retire `TypefaceLibraryItem.jsx`, file one ticket with the final values
3. `/work`: get the two rulings, then bar + rows + grid onto the set
4. Eyeballs still owed: studio split hero, brand `/library`, prints flip, foundry hero at 80

**Standing order from the user (2026-08-27):** answer the question asked and stop; act only on an instruction; local first, DS ticket only with approved values; no "laws" written anywhere.
