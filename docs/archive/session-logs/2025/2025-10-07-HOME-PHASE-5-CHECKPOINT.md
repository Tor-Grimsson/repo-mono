# HOME MIGRATION - PHASE 5 CHECKPOINT
**Date**: 2025-10-07
**Phase**: 5 - Supporting Components Migration
**Status**: ✅ COMPLETE

---

## Phase 5 Summary
Evaluated and migrated supporting components. Made strategic decisions to keep existing superior implementations and create placeholders where full integration not yet possible.

---

## Components Evaluated

### 1. Contact.jsx - ✅ MIGRATED

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/features/contact/pages/Contact.jsx`
**Destination**: `/apps/web/src/components/sections/contact/Contact.jsx`
**Size**: 52 lines
**Complexity**: LOW

**Changes Made**:
- Updated import: `Button` → `ButtonOriginal` from `../../common/ButtonOriginal`
- Added `alt=""` to ImageClipBox images
- Removed unused `React` import
- Fixed formatting

**Features**:
- ImageClipBox sub-component for decorative images
- Three positioned images with clip-path classes
- Centered text with large heading
- ButtonOriginal integration

**CSS Classes Used**:
- `contactClipPath1` ⚠️ NOT in Phase 1 utilities
- `contactClipPath2` ⚠️ NOT in Phase 1 utilities

**Image Assets Required**:
- `/public/img/kolk-letter-1.webp`
- `/public/img/kolk-letter-2.webp`
- `/public/img/kolk-letter-3.webp`

---

### 2. Footer.jsx - ✅ KEPT EXISTING

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/components/layout/Footer.jsx`
**Current**: `/apps/web/src/components/layout/Footer.jsx`

**Decision**: **Keep existing Footer** - much more sophisticated

**Comparison**:

| Feature | Reference | Our Existing |
|---------|-----------|--------------|
| Layout | Simple single row | Multi-section with menu |
| Links | 4 social icons | Menu + Social sections |
| Features | Basic hover | Back-to-top animation |
| Styling | Hardcoded yellow-400 | CSS variables |
| Responsive | Basic flex | Full responsive |

**Our Footer Features**:
- Menu section with route links
- Follow section with social links
- Back-to-top button with animation
- Copyright and branding
- Uses CSS variables for theming
- Smooth hover transitions
- Logo display

**No Migration Needed**: Existing implementation superior

---

### 3. FontPreview - ✅ USING EXISTING

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/features/foundry/components/FontPreview.jsx`
**Current**: `/apps/web/src/components/sections/foundry/FontPreviewSection.jsx`

**Decision**: **Use existing FontPreviewSection** - more complete

**Reference Version**:
- Simple glyph cycler (A-Z)
- Loads single font
- Clicks to navigate to `/fontviewer`
- Inline styles only
- Size: 72 lines

**Our Existing Version**:
- Integrated with foundry section
- More sophisticated display
- Already part of Foundry route
- Properly styled

**No Migration Needed**: Existing implementation more complete

---

### 4. CmsCard.jsx - ✅ PLACEHOLDER CREATED

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/features/blog/components/CmsCard.jsx`
**Destination**: `/apps/web/src/components/sections/blog/CmsCard.jsx`
**Size**: 25 lines (placeholder)

**Decision**: **Create placeholder** - requires Sanity CMS setup

**Reference Version Features**:
- Sanity client integration
- GROQ query for posts
- PortableText rendering
- Image URL builder
- 2-column grid layout
- Post preview with image

**Our Placeholder**:
- Simple visual placeholder
- "Coming Soon" message
- Basic grid layout matching reference
- No Sanity integration yet

**Why Placeholder**:
- Sanity CMS not set up in current monorepo
- Would require @sanity/client, imageUrlBuilder, @portabletext/react
- Reference uses `@lib/sanity/client` which doesn't exist
- Full blog integration is separate scope

**For Production**:
- Need to set up Sanity project
- Add Sanity dependencies
- Create Sanity client lib
- Migrate full CmsCard with queries

---

## Files Created

1. `/apps/web/src/components/sections/contact/Contact.jsx`
   - Migrated from reference
   - Updated to use ButtonOriginal

2. `/apps/web/src/components/sections/blog/CmsCard.jsx`
   - Placeholder only
   - Awaiting Sanity integration

---

## Files Kept (Existing Better)

1. `/apps/web/src/components/layout/Footer.jsx`
   - Existing version more sophisticated
   - No changes needed

2. `/apps/web/src/components/sections/foundry/FontPreviewSection.jsx`
   - Existing version more complete
   - Already integrated with Foundry

---

## Migration Details

### Contact.jsx

**ImageClipBox Sub-Component**:
```javascript
const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="" />
  </div>
)
```

**Layout**:
- Container with rounded black background
- Three absolutely positioned images with clip paths
- Centered text content
- ButtonOriginal at bottom

**Positioning**:
- Left images: `-left-20` hidden on mobile, visible sm+
- Right image: `-top-20 left-60` with responsive positioning
- Uses `lg:left-20`, `md:left-auto`, `md:right-10`, etc.

---

## Issues Found

### Missing CSS Classes

**contactClipPath1** and **contactClipPath2** are NOT in Phase 1 utilities!

These classes need to be added to `index.css` or Contact component will have visual issues.

**Recommendation**: Add to Phase 6 or Phase 8 as needed for visual correctness.

---

## Dependencies

### Contact.jsx
- ✅ `ButtonOriginal` (from Phase 3)

### CmsCard.jsx (Placeholder)
- None (placeholder has no dependencies)

### CmsCard.jsx (Full Version - Future)
- ❌ `@sanity/client` (not installed)
- ❌ `@sanity/image-url` (not installed)
- ❌ `@portabletext/react` (not installed)
- ❌ `@lib/sanity/client` (doesn't exist)

---

## Asset Requirements

### Contact Section
- `/public/img/kolk-letter-1.webp`
- `/public/img/kolk-letter-2.webp`
- `/public/img/kolk-letter-3.webp`

---

## Testing Notes

### Contact
- [ ] Verify images load properly
- [ ] Test clip-path classes work (may fail if classes missing)
- [ ] Test ButtonOriginal click
- [ ] Test responsive layout (images hide on mobile)

### Footer
- [ ] Already tested in existing app
- [ ] No changes made

### FontPreview
- [ ] Already tested in Foundry section
- [ ] No changes made

### CmsCard
- [ ] Placeholder displays correctly
- [ ] Full integration TBD

---

## Known Considerations

1. **Contact Clip-Path Classes Missing**:
   - `contactClipPath1` and `contactClipPath2` not in Phase 1
   - May cause visual issues
   - Need to add or component won't look correct

2. **Footer Decision**:
   - Kept existing instead of reference
   - Means reference Footer never used
   - Our version is superior, so correct decision

3. **FontPreview Decision**:
   - Using existing FontPreviewSection
   - Reference FontPreview not used
   - Already integrated in Foundry route

4. **CmsCard Placeholder**:
   - Not functional until Sanity set up
   - Placeholder prevents errors
   - Full migration requires separate Sanity integration work

---

## Next Steps

**Phase 6**: Integration & Routing
- Wire all components into HomeOriginal.jsx
- Update App.jsx with route
- Add temporary navbar link
- Add missing CSS classes (contactClipPath1/2)
- Test initial page load

---

## File Structure After Phase 5

```
apps/web/src/
├── components/
│   ├── common/
│   │   ├── AnimatedTitle.jsx (Phase 3)
│   │   ├── ButtonOriginal.jsx (Phase 3)
│   │   ├── ClippedImage.jsx (Phase 2)
│   │   ├── ComingSoonCard.jsx (Phase 2)
│   │   ├── InteractiveImage.jsx (Phase 3)
│   │   ├── RoundedCorners.jsx (Phase 2)
│   │   ├── SectionLabel.jsx (existing)
│   │   ├── Tag.jsx (existing)
│   │   └── VideoPreview.jsx (Phase 3)
│   ├── layout/
│   │   ├── Footer.jsx (existing - kept)
│   │   ├── Navbar.jsx (existing)
│   │   └── SiteLayout.jsx (existing)
│   └── sections/
│       ├── blog/ ✨ NEW
│       │   └── CmsCard.jsx ✨ NEW (placeholder)
│       ├── contact/ ✨ NEW
│       │   └── Contact.jsx ✨ NEW
│       ├── foundry/
│       │   └── FontPreviewSection.jsx (existing - kept)
│       └── home/ (Phase 4)
│           ├── About.jsx
│           ├── Features.jsx
│           ├── HeroSection.jsx
│           └── Story.jsx
├── hooks/
│   └── useBentoTilt.js (Phase 2)
└── ... (other directories)
```

---

## Completion Status

- [x] Contact.jsx migrated
- [x] Footer.jsx evaluated (kept existing)
- [x] FontPreview evaluated (using existing)
- [x] CmsCard.jsx placeholder created
- [x] All imports updated
- [x] ButtonOriginal integration
- [x] Missing CSS classes identified

**Phase 5: COMPLETE ✅**

---

**Next Phase**: Phase 6 - Integration & Routing
**Estimated Time**: 15-20 minutes
