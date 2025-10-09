# HOME MIGRATION - PHASE 6 CHECKPOINT
**Date**: 2025-10-07
**Phase**: 6 - Integration & Routing
**Status**: ✅ COMPLETE

---

## Phase 6 Summary
Wired all migrated components together in HomeOriginal.jsx route and integrated into the application routing system with temporary navbar link for testing.

---

## Files Modified

### 1. HomeOriginal.jsx - ✅ COMPLETE INTEGRATION

**File**: `/apps/web/src/routes/HomeOriginal.jsx`
**Changes**: Complete rewrite from placeholder to full page

**Imports Added**:
```javascript
import HeroSection from '../components/sections/home/HeroSection'
import About from '../components/sections/home/About'
import Features from '../components/sections/home/Features'
import Story from '../components/sections/home/Story'
import Contact from '../components/sections/contact/Contact'
import Footer from '../components/layout/Footer'
import FontPreviewSection from '../components/sections/foundry/FontPreviewSection'
import CmsCard from '../components/sections/blog/CmsCard'
```

**Component Stack** (in order):
1. `<HeroSection />` - Video hero with GSAP animations
2. `<About />` - Mask reveal with ScrollTrigger
3. `<Features />` - Bento grid with video cards
4. `<Story />` - Cursor-tracking mask with 3D tilt
5. `<Contact />` - Contact section with images
6. `<FontPreviewSection />` - Font preview (existing component)
7. `<CmsCard />` - Blog placeholder
8. `<Footer />` - Site footer (existing component)

**Container**:
- `<main className="min-h-screen w-screen overflow-x-hidden">`
- Matches reference App.jsx structure exactly

---

### 2. App.jsx - ✅ ROUTE ADDED

**File**: `/apps/web/src/App.jsx`
**Changes**: Added HomeOriginal import and route

**Import Added**:
```javascript
import HomeOriginal from './routes/HomeOriginal'
```

**Route Added**:
```javascript
<Route path="home-original" element={<HomeOriginal />} />
```

**Route Structure**:
- Nested under `<SiteLayout />` wrapper
- Accessible at: `/home-original`
- Includes Navbar and standard site structure

---

### 3. Navbar.jsx - ✅ LINK ADDED

**File**: `/apps/web/src/components/layout/Navbar.jsx`
**Changes**: Added temporary navigation link

**NAV_ITEMS Updated**:
```javascript
const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/work-index', label: 'Work Index' },
  { to: '/fonts', label: 'Fonts' },
  { to: '/foundry', label: 'Foundry' },
  { to: '/home-original', label: 'Home Original' }, // ✨ NEW
  { to: '/#story', label: 'Studio' },
]
```

**Positioning**:
- Added before Studio link
- Visible in desktop and mobile menu
- Uses existing Navbar styling

---

## Integration Flow

### Page Load Sequence

1. **User navigates to** `/home-original`
2. **SiteLayout renders** (Navbar + Outlet + Footer)
3. **HomeOriginal mounts** in Outlet
4. **Sections render in order**:
   - HeroSection starts video loading
   - About section with ScrollTrigger
   - Features bento grid with videos
   - Story with cursor tracking
   - Contact section
   - FontPreviewSection
   - CmsCard placeholder
   - Footer

### GSAP Animation Timeline

**On Mount**:
1. HeroSection: Loader shows while videos load
2. HeroSection: Video clip-path ScrollTrigger registers
3. About: Mask reveal ScrollTrigger registers
4. Story: GSAP initial setup (3D transform)

**On Scroll**:
1. HeroSection clip-path animates (scrubbed to scroll)
2. About mask expands (pinned + scrubbed)
3. AnimatedTitle words stagger in (both About and Story)

**On Interaction**:
1. HeroSection: Click mini video → scale animation
2. Features: Hover BentoCard → 3D tilt
3. Story: Mouse move → 3D tilt + mask tracking

---

## Access Information

**Route**: `/home-original`
**Full URL**: `http://localhost:5173/home-original` (dev server)
**Navbar Link**: "Home Original"

**Testing Access**:
1. Start dev server: `yarn dev` or `yarn dev:web`
2. Navigate to: `http://localhost:5173/home-original`
3. OR click "Home Original" in navbar

---

## Component Dependencies Verified

All components properly imported with relative paths:

### HomeOriginal Dependencies
✅ HeroSection → Phase 4
✅ About → Phase 4
✅ Features → Phase 4
✅ Story → Phase 4
✅ Contact → Phase 5
✅ Footer → Existing (kept)
✅ FontPreviewSection → Existing (kept)
✅ CmsCard → Phase 5 (placeholder)

### Nested Dependencies (automatically resolved)
✅ ButtonOriginal (used by HeroSection, Story, Contact)
✅ AnimatedTitle (used by About, Story)
✅ ComingSoonCard (used by Features)
✅ useBentoTilt (used by Features)
✅ All GSAP imports
✅ react-icons/ti

---

## Known Issues / Warnings

### 1. Missing CSS Classes
**Issue**: Contact section uses `contactClipPath1` and `contactClipPath2`
**Status**: Classes NOT in Phase 1 utilities
**Impact**: Contact images may not display correctly
**Solution**: Add to index.css or accept visual difference

### 2. Missing Assets
**Issue**: Multiple video and image files expected
**Status**: Files may not exist in `/public`
**Impact**: Broken images/videos, console errors
**Solution**: Phase 8 will document all missing assets

### 3. FontPreviewSection Integration
**Issue**: Component designed for Foundry route
**Status**: May have duplicate IDs or context issues
**Impact**: Possible visual glitches if used twice
**Solution**: Monitor for issues, may need separate component

### 4. CmsCard Placeholder
**Issue**: Not functional, shows dummy content
**Status**: Expected until Sanity integrated
**Impact**: No blog content displays
**Solution**: Full Sanity integration (future work)

---

## Testing Checklist

### Route Access
- [ ] Navigate to `/home-original` loads page
- [ ] Navbar "Home Original" link works
- [ ] SiteLayout renders (Navbar visible)
- [ ] No route errors in console

### Component Rendering
- [ ] HeroSection renders with videos
- [ ] About section visible
- [ ] Features bento grid displays
- [ ] Story section renders
- [ ] Contact section appears
- [ ] FontPreviewSection shows
- [ ] CmsCard placeholder displays
- [ ] Footer renders at bottom

### GSAP Animations (Phase 7)
- [ ] HeroSection loader appears
- [ ] Video clip-path animation on scroll
- [ ] About mask reveal works
- [ ] Story cursor tracking works
- [ ] All ScrollTriggers fire

### Console Errors
- [ ] Check for missing asset errors
- [ ] Check for GSAP errors
- [ ] Check for import errors
- [ ] Check for React errors

---

## Next Steps

**Phase 7**: Animation Verification
- Test HeroSection video loading
- Test HeroSection click animation
- Test HeroSection ScrollTrigger clip-path
- Test About ScrollTrigger mask reveal
- Test Story cursor tracking
- Test Features BentoCard tilt
- Verify all GSAP contexts clean up properly

**Phase 8**: Asset & Final Verification
- Document all missing videos
- Document all missing images
- Document all missing SVGs
- Check GSAP package installation
- Check react-icons installation
- Final console error check

---

## File Structure After Phase 6

```
apps/web/src/
├── App.jsx (modified - route added)
├── routes/
│   ├── Home.jsx (existing)
│   ├── HomeOriginal.jsx (modified - complete) ✨
│   ├── Work.jsx (existing)
│   ├── WorkDetail.jsx (existing)
│   ├── WorkIndex.jsx (existing)
│   ├── Fonts.jsx (existing)
│   └── Foundry.jsx (existing)
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx (modified - link added) ✨
│   │   ├── Footer.jsx (existing)
│   │   └── SiteLayout.jsx (existing)
│   └── sections/
│       ├── blog/
│       │   └── CmsCard.jsx (Phase 5)
│       ├── contact/
│       │   └── Contact.jsx (Phase 5)
│       ├── foundry/
│       │   └── FontPreviewSection.jsx (existing)
│       └── home/
│           ├── About.jsx (Phase 4)
│           ├── Features.jsx (Phase 4)
│           ├── HeroSection.jsx (Phase 4)
│           └── Story.jsx (Phase 4)
└── ... (other directories)
```

---

## Completion Status

- [x] HomeOriginal.jsx fully wired
- [x] All 8 sections imported
- [x] App.jsx route added
- [x] Navbar link added
- [x] Access URL documented
- [x] Dependencies verified
- [x] Known issues documented

**Phase 6: COMPLETE ✅**

---

**Next Phase**: Phase 7 - Animation Verification
**Estimated Time**: 30-40 minutes
**Focus**: Test all GSAP animations, ScrollTrigger, video functionality
