# Session Log - 2025-12-26 CDN Migration & Collections Update

## Session Metadata
- **Date**: 2025-12-26
- **LLM Used**: Claude Opus 4.5
- **Session Duration**: ~60 minutes
- **Main Objectives**: CDN migration cleanup, Collections Explore section unification

## Work Completed

### 1. CDN Migration - Image Replacements

**Local images migrated to CDN:**
- `HallOfDisplacement.jsx` → `workshop/workshop-halls/halls-img`
- `ApparatusHallOfMirrors.jsx` → `workshop/workshop-halls/halls-img`
- `HallOfMovement.jsx` → `workshop/workshop-halls/halls-img`
- `HallOfSymphony.jsx` → `workshop/workshop-halls/halls-img`
- `StackHero.jsx` → `cms/stack/stack-hero` (with srcSet)
- `Work.jsx` → `cms/work/work-hero` (with srcSet, custom styling)
- `WorkshopIntroduction.jsx` → `workshop/workshop-images/ws-img-01`
- `DocsPageHeader.jsx` → `workshop/workshop-docs/workshop-docs.svg`
- `fallbackProjects.js` → `fallback/hz/image-01` and `hz/image-02`

### 2. Double Scrollbar Fix
- **Stack.jsx**: Removed `min-h-screen w-full overflow-x-hidden` from main element
- **SiteLayout.jsx**: Changed `/stack` to `startsWith('/stack')` for full bleed

### 3. Work Page Image Styling
Replaced `ImageSection` with custom styled section:
- Max width 1400px
- Aspect ratio 2:1
- Rounded with `border-fg-08`
- Full srcSet support (400, 800, 1200, 1600, 2560)

### 4. CardFeatureItem Enhancement
Added `imagePosition` prop to `CardFeatureItem.jsx`:
```jsx
imagePosition = 'center' // default
style={{ objectPosition: imagePosition }}
```
Applied `imagePosition="top"` in `WorkshopFeatures.jsx`

### 5. Unused Asset Identification
**Still in use:**
- `mask.svg` - Used only by unused `TiltingImageCard` and `storyOverlay` CSS
- `logo.svg`, `wordmark.svg`, `logo-full.svg` - Used in multiple components

**Deleted:**
- `storyOverlay` CSS utility from `index.css`

**To move to unused-assets (manual):**
- `apps/web/public/svg/mask.svg`
- `apps/web/public/svg/docs-documentation.svg`
- `apps/web/public/svg/arrow-up.svg`
- `apps/web/src/components/animation/TiltingImageCard.jsx`
- `apps/web/public/img/work/`
- `apps/web/public/img/workshop/`
- `apps/web/public/img/features/`
- `apps/web/public/img/Kolk-img/`

### 6. CDN Manifest Updates
Updated `docs/documentation/08-operations/cdn-manifest.json`:
- Added `cms` section (stack-hero, work-hero)
- Added `workshop` section (workshop-docs, workshop-halls, workshop-images)
- Added `collection-overview/ql-card` section with 4 ql-* folders
- Updated stats: 358 directories, 1064 files

### 7. Collections Explore Section Unification
Updated all 5 collection pages to use unified "Explore Collections" component:

**Files modified:**
- `CollectionsOverview.jsx`
- `Grids.jsx`
- `Illustrations.jsx`
- `Logomarks.jsx`
- `MotionGraphics.jsx`

**Changes:**
- All 4 collection cards displayed (was 3, excluding current)
- Theme-aware CDN SVGs from `ql-card/ql-*/ql-{dark|light}/ql-{dark|light}.svg`
- 4-column grid on large screens (`lg:grid-cols-4`)
- Unified text content:
  - Header: "Explore Collections" / "Jump into each collection"
  - Illustrations: "Illustration portfolio"
  - Grids: "Modular grid systems"
  - Motion Graphics: "Motion graphics lab"
  - Logomarks: "Logomark design gallery"

## Technical Details

### srcSet Pattern for CDN Images
```jsx
const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/stack/stack-hero'

<img
  src={`${cdnBase}/stack-hero-1200.jpg`}
  srcSet={`${cdnBase}/stack-hero-400.jpg 400w, ${cdnBase}/stack-hero-800.jpg 800w, ${cdnBase}/stack-hero-1200.jpg 1200w, ${cdnBase}/stack-hero-1600.jpg 1600w, ${cdnBase}/stack-hero-2560.jpg 2560w`}
  sizes="100vw"
/>
```

### Theme-Aware SVG Pattern
```jsx
const { theme } = useTheme()
const variant = theme === 'dark' ? 'dark' : 'light'

<img src={`${cdnBase}/ql-grid/ql-${variant}/ql-${variant}.svg`} />
```

### CDN Path Structure
```
collection-overview/
  ql-card/
    ql-grid/ql-dark/ql-dark.svg
    ql-grid/ql-light/ql-light.svg
    ql-illustration/...
    ql-logomark/...
    ql-motion-graphics/...
```

## Issues & Solutions

### Bash Tool Not Working
- All bash commands returned exit code 1
- Workaround: Provided manual commands for user to run file moves

### Wrong CDN Path for ql-cards
- Initially used `collection-overview/ql-grid/...`
- Fixed to `collection-overview/ql-card/ql-grid/...`

## Files Changed

### Created
- None

### Modified
- `apps/web/src/routes/workshop/HallOfDisplacement.jsx`
- `apps/web/src/routes/workshop/ApparatusHallOfMirrors.jsx`
- `apps/web/src/routes/workshop/HallOfMovement.jsx`
- `apps/web/src/routes/workshop/HallOfSymphony.jsx`
- `apps/web/src/components/sections/stack-detail/StackHero.jsx`
- `apps/web/src/routes/Stack.jsx`
- `apps/web/src/routes/Work.jsx`
- `apps/web/src/routes/workshop/WorkshopIntroduction.jsx`
- `apps/web/src/components/workshop/docs/DocsPageHeader.jsx`
- `apps/web/src/components/workshop/molecules/CardFeatureItem.jsx`
- `apps/web/src/components/sections/home/WorkshopFeatures.jsx`
- `apps/web/src/components/layout/SiteLayout.jsx`
- `apps/web/src/data/fallbackProjects.js`
- `apps/web/src/index.css` (removed storyOverlay utility)
- `apps/web/src/routes/collections/CollectionsOverview.jsx`
- `apps/web/src/routes/collections/Grids.jsx`
- `apps/web/src/routes/collections/Illustrations.jsx`
- `apps/web/src/routes/collections/Logomarks.jsx`
- `apps/web/src/routes/collections/MotionGraphics.jsx`
- `docs/documentation/08-operations/cdn-manifest.json`

## Next Steps

### Manual Tasks (Bash broken)
```bash
mkdir -p docs/a-torg/unused-assets
mv apps/web/public/svg/mask.svg docs/a-torg/unused-assets/
mv apps/web/public/svg/docs-documentation.svg docs/a-torg/unused-assets/
mv apps/web/public/svg/arrow-up.svg docs/a-torg/unused-assets/
mv apps/web/src/components/animation/TiltingImageCard.jsx docs/a-torg/unused-assets/
mv apps/web/public/img/work docs/a-torg/unused-assets/img-work
mv apps/web/public/img/workshop docs/a-torg/unused-assets/img-workshop
mv apps/web/public/img/features docs/a-torg/unused-assets/img-features
mv apps/web/public/img/Kolk-img docs/a-torg/unused-assets/img-kolk
```

### Future Improvements
- Add srcSet support to card components that render images
- Consider extracting Explore Collections section into shared component
