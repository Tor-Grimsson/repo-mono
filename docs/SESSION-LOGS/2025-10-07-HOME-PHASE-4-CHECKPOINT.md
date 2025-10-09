# HOME MIGRATION - PHASE 4 CHECKPOINT
**Date**: 2025-10-07
**Phase**: 4 - Hero Sections Migration
**Status**: ✅ COMPLETE

---

## Phase 4 Summary
Migrated all four complex hero sections with GSAP animations, ScrollTrigger effects, and interactive features. This was the most complex phase involving video animations, mask reveals, cursor tracking, and 3D tilt effects.

---

## Files Created

### Hero Sections Directory
Created: `/apps/web/src/components/sections/home/`

### Components

1. **HeroSection.jsx** - Video Hero with GSAP Animations
   - **Location**: `/apps/web/src/components/sections/home/HeroSection.jsx`
   - **Size**: 182 lines
   - **Complexity**: HIGH
   - **GSAP Animations**:
     - Video scaling transition on click (gsap.set + gsap.to + gsap.from)
     - ScrollTrigger clip-path polygon animation
     - Loader animation (three-body spinner from Phase 1)
   - **Features**:
     - 4-video loading system with progress tracking
     - Mini video preview that scales on hover/click
     - Click triggers smooth scale + visibility transition
     - Full-screen loader until videos ready
     - Dual heading elements (one for contrast)
   - **Utilities Used**: `heroHeading`, `flexCenter`, `absoluteCenter`, `mask-clip-path`, `three-body`

2. **About.jsx** - Mask Reveal Animation
   - **Location**: `/apps/web/src/components/sections/home/About.jsx`
   - **Size**: 66 lines
   - **Complexity**: MEDIUM
   - **GSAP Animations**:
     - ScrollTrigger mask reveal timeline
     - Expands width/height from small to full viewport
     - Animates borderRadius from rounded to 0
     - Pin effect keeps section centered during animation
     - Scrub: 0.5 for smooth scroll-based animation
   - **Features**:
     - AnimatedTitle component integration
     - Image mask that grows on scroll
     - Centered layout with intro text
   - **Utilities Used**: `aboutSubtext`, `aboutImage`, `mask-clip-path`

3. **Features.jsx** - Bento Grid with Video Cards
   - **Location**: `/apps/web/src/components/sections/home/Features.jsx`
   - **Size**: 110 lines
   - **Complexity**: MEDIUM
   - **Sub-Component**: BentoCard (defined in same file)
   - **Features**:
     - BentoCard with useBentoTilt hook (3D tilt on hover)
     - Grid layout: 2 columns, 4 rows, responsive
     - Auto-playing videos in each card
     - ComingSoonCard integration
     - Offset cards (ms-32, me-32) for visual interest
     - AlignRight prop for custom positioning
   - **Utilities Used**: `bentoTitle`, `bentoItem`
   - **No GSAP**: Uses CSS transitions + useBentoTilt hook

4. **Story.jsx** - Cursor-Tracking Mask with 3D Tilt
   - **Location**: `/apps/web/src/components/sections/home/Story.jsx`
   - **Size**: 118 lines
   - **Complexity**: HIGH
   - **GSAP Animations**:
     - 3D image rotation based on mouse/touch position
     - CSS variable updates for mask position (--x, --y)
     - Smooth reset on mouse leave
   - **Features**:
     - Mouse AND touch event support
     - Mask overlay follows cursor using CSS variables
     - 3D tilt effect on image (±10 degrees rotation)
     - AnimatedTitle with mix-blend-difference
     - Responsive layout with absolute positioned text
   - **Utilities Used**: `storyImgContainer`, `storyOverlay`
   - **Technical**: Uses `storyOverlay` utility with CSS mask-image and mask-position vars

---

## Migration Details

### HeroSection.jsx

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/features/hero/components/HeroSection.jsx`

**Changes Made**:
- Updated import: `Button` → `ButtonOriginal` from `../../common/ButtonOriginal`
- Removed unused `React` import
- Fixed formatting/spacing
- **GSAP Animations PRESERVED EXACTLY**

**GSAP Animation Details**:

1. **Video Scale Animation** (useGSAP with dependencies):
   ```javascript
   useGSAP(() => {
     if (hasClicked) {
       gsap.set('#next-video', { visibility: 'visible' })
       gsap.to('#next-video', {
         transformOrigin: 'center center',
         scale: 1,
         width: '100%',
         height: '100%',
         duration: 1,
         ease: 'power1.inOut',
         onStart: () => nextVideoRef.current.play(),
       })
       gsap.from('#current-video', {
         transformOrigin: 'center center',
         scale: 0,
         duration: 1.5,
         ease: 'power1.inOut',
       })
     }
   }, { dependencies: [currentIndex], revertOnUpdate: true })
   ```

2. **ScrollTrigger Clip-Path Animation**:
   ```javascript
   useGSAP(() => {
     gsap.set('#video-frame', {
       clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
       borderRadius: '0 0 40% 10%',
     })
     gsap.from('#video-frame', {
       clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
       borderRadius: '0 0 0 0',
       ease: 'power1.inOut',
       scrollTrigger: {
         trigger: '#video-frame',
         start: 'center center',
         end: 'bottom center',
         scrub: true,
       }
     })
   })
   ```

**Video Loading System**:
- Tracks 3 videos loading (totalVideos - 1 = 3)
- Shows loader until all videos ready
- Background video autoplays immediately
- Mini preview and next video load in background

---

### About.jsx

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/features/hero/components/About.jsx`

**Changes Made**:
- Updated import: `AnimatedTitle` from `../../common/AnimatedTitle`
- Removed unused `React` import
- Fixed formatting
- **GSAP Animation PRESERVED EXACTLY**

**GSAP Animation Details**:

**ScrollTrigger Mask Reveal**:
```javascript
useGSAP(() => {
  const clipAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '#clip',
      start: 'center center',
      end: '+=800 center',
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
    },
  })

  clipAnimation.to('.mask-clip-path', {
    width: '100vw',
    height: '100vh',
    borderRadius: 0,
  })
})
```

**Animation Breakdown**:
- Pins the section during scroll
- Animates `.mask-clip-path` from small (`aboutImage` size) to full viewport
- Removes borderRadius for sharp corners at full size
- Scrub 0.5 provides smooth, controlled animation tied to scroll

---

### Features.jsx

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/features/hero/components/Features.jsx`

**Changes Made**:
- Updated imports to relative paths:
  - `useBentoTilt` from `../../../hooks/useBentoTilt`
  - `ComingSoonCard` from `../../common/ComingSoonCard`
- Removed unused `React` import
- Removed invalid `webkit-playsinline` attribute (kept `playsInline`)
- Fixed formatting

**BentoCard Component**:
- Accepts: `src`, `title`, `description`, `alignRight`, `className`, `...rest`
- Applies useBentoTilt for 3D hover effect
- Auto-playing video background
- Text overlay with title and optional description
- Supports custom positioning via `alignRight` and offset classes

**Grid Layout**:
- 2 columns, 4 rows
- Height: 135vh
- Gap: 1.75rem (gap-7)
- Responsive: changes span on mobile vs desktop

**Video Assets Required**:
- `videos/videofeat-1.mp4` (Flaður)
- `videos/videofeat-2.mp4` (Silfurbarki)
- `videos/videofeat-3.mp4` (Tröllatunga)
- `videos/videofeat-4.mp4` (Gullhamrar)
- `videos/videofeat-5.mp4` (unnamed)

---

### Story.jsx

**Source**: `_nav-ref/kolkrabbi-home/apps/web/src/features/hero/components/Story.jsx`

**Changes Made**:
- Updated imports:
  - `AnimatedTitle` from `../../common/AnimatedTitle`
  - `Button` → `ButtonOriginal` from `../../common/ButtonOriginal`
- Removed unused `React` import
- Fixed formatting
- **GSAP Animations PRESERVED EXACTLY**

**GSAP Animation Details**:

1. **Initial Setup** (useLayoutEffect):
   ```javascript
   useLayoutEffect(() => {
     gsap.set(imageRef.current, {
       rotateX: 0,
       rotateY: 0,
       transformPerspective: 500
     })
     gsap.set(overlayRef.current, { '--x': '50%', '--y': '50%' })
   }, [])
   ```

2. **Mouse/Touch Move Handler**:
   ```javascript
   const handleMove = (e) => {
     // ... coordinate calculation ...

     // Update mask position via CSS variables
     gsap.set(overlayEl, {
       '--x': `${x}px`,
       '--y': `${y}px`,
     })

     // Update 3D tilt
     const rotateX = ((y - centerY) / centerY) * -10
     const rotateY = ((x - centerX) / centerX) * 10
     gsap.to(imageEl, {
       duration: 0.5,
       rotateX,
       rotateY,
       ease: 'power1.out',
     })
   }
   ```

3. **Mouse Leave Handler**:
   ```javascript
   const handleMouseLeave = () => {
     gsap.to(imageRef.current, {
       duration: 0.5,
       rotateX: 0,
       rotateY: 0,
       ease: 'power1.inOut',
     })
   }
   ```

**Technical Implementation**:
- Uses CSS custom properties (--x, --y) for mask positioning
- `storyOverlay` utility reads these vars via `mask-position: var(--x) var(--y)`
- Supports both mouse and touch events
- 3D rotation capped at ±10 degrees for subtlety

---

## GSAP Animations Summary

All animations preserved exactly as in reference:

### HeroSection
- **Type**: Video transitions + ScrollTrigger clip-path
- **Triggers**: Click (video switch) + Scroll (clip-path morph)
- **Duration**: 1s (video), scrub (clip-path)
- **Easing**: power1.inOut
- **Cleanup**: revertOnUpdate: true

### About
- **Type**: ScrollTrigger mask reveal
- **Trigger**: Scroll with pin
- **Target**: `.mask-clip-path` class
- **Properties**: width, height, borderRadius
- **Scrub**: 0.5 (tied to scroll position)
- **Special**: Pin keeps section centered

### Story
- **Type**: Mouse/touch-based 3D tilt + mask tracking
- **Trigger**: Mouse/touch movement
- **Targets**: Image (rotation) + Overlay (CSS vars)
- **Duration**: 0.5s
- **Easing**: power1.out (movement), power1.inOut (reset)
- **Max Rotation**: ±10 degrees

---

## Utility Classes Used

From Phase 1:

**HeroSection**:
- `heroHeading` - large responsive hero text
- `flexCenter` - flex centering layout
- `absoluteCenter` - absolute positioning center
- `mask-clip-path` - polygon clip path
- `three-body` + `three-body__dot` - loader animation

**About**:
- `aboutSubtext` - positioned text below fold
- `aboutImage` - positioned/sized image container
- `mask-clip-path` - animated mask container

**Features**:
- `bentoTitle` - bento card title typography
- `bentoItem` - bento card base styles

**Story**:
- `storyImgContainer` - responsive image container
- `storyOverlay` - mask overlay with cursor tracking

---

## Dependencies

### External Packages
- ✅ `gsap` (all components)
- ✅ `@gsap/react` (HeroSection, About, Story)
- ✅ `gsap/ScrollTrigger` (HeroSection, About)
- ✅ `react-icons/ti` (HeroSection, Story via ButtonOriginal)

### Internal Components
- ✅ `ButtonOriginal` (HeroSection, Story)
- ✅ `AnimatedTitle` (About, Story)
- ✅ `ComingSoonCard` (Features)
- ✅ `useBentoTilt` (Features/BentoCard)

---

## Asset Requirements

### Videos (HeroSection)
- `/public/videos/video-1.mp4`
- `/public/videos/video-2.mp4`
- `/public/videos/video-3.mp4`
- `/public/videos/video-4.mp4`

### Videos (Features)
- `/public/videos/videofeat-1.mp4`
- `/public/videos/videofeat-2.mp4`
- `/public/videos/videofeat-3.mp4`
- `/public/videos/videofeat-4.mp4`
- `/public/videos/videofeat-5.mp4`

### Images
- `/public/img/kolk-about-1.webp` (About section)
- `/public/img/trollatunga-2.png` (Story section)

### SVG
- `/public/Svg/mask.svg` (Story overlay mask)

---

## Testing Notes

### HeroSection
- [ ] Verify all 4 videos load
- [ ] Test loader disappears when videos ready
- [ ] Test mini video preview hover effect
- [ ] Test click to switch videos (scaling animation)
- [ ] Test ScrollTrigger clip-path animation
- [ ] Test on different screen sizes

### About
- [ ] Test ScrollTrigger mask reveal
- [ ] Verify pin effect works correctly
- [ ] Test AnimatedTitle scroll animation
- [ ] Check image loads properly

### Features
- [ ] Test all videos autoplay
- [ ] Test BentoCard tilt effect on hover
- [ ] Verify grid layout responsive behavior
- [ ] Test ComingSoonCard displays correctly

### Story
- [ ] Test mouse tracking (mask follows cursor)
- [ ] Test touch tracking on mobile
- [ ] Test 3D tilt effect
- [ ] Test reset on mouse/touch leave
- [ ] Verify mask image loads

---

## Known Considerations

1. **HeroSection Video Loading**:
   - Requires 4 video files to exist
   - Loader shows until 3 videos loaded (totalVideos - 1)
   - Background video autoplays regardless

2. **About Mask Reveal**:
   - Pin effect may conflict with other scroll-based animations
   - Scrub value (0.5) controls smoothness

3. **Story Cursor Tracking**:
   - Uses CSS custom properties (--x, --y)
   - Mask SVG must exist at `/public/Svg/mask.svg`
   - Touch events supported for mobile

4. **Features Video Performance**:
   - 5+ videos auto-playing may impact performance
   - Consider lazy loading or intersection observer

---

## Issues Found

**None** - All components migrated cleanly with GSAP preserved exactly

---

## Next Steps

**Phase 5**: Supporting Components Migration
- Check if Contact component exists (may already be migrated)
- Check Footer component (may already exist)
- Evaluate FontPreview component (may overlap with Foundry)
- Evaluate CmsCard component (blog-related)

---

## File Structure After Phase 4

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
│   └── sections/
│       └── home/ ✨ NEW
│           ├── About.jsx ✨ NEW
│           ├── Features.jsx ✨ NEW
│           ├── HeroSection.jsx ✨ NEW
│           └── Story.jsx ✨ NEW
├── hooks/
│   └── useBentoTilt.js (Phase 2)
└── ... (other directories)
```

---

## Completion Status

- [x] HeroSection.jsx migrated (GSAP video + clip-path preserved)
- [x] About.jsx migrated (GSAP mask reveal preserved)
- [x] Features.jsx migrated (BentoCard with useBentoTilt)
- [x] Story.jsx migrated (GSAP 3D tilt + cursor tracking preserved)
- [x] All imports updated to relative paths
- [x] ButtonOriginal used instead of Button
- [x] AnimatedTitle integrated from common
- [x] All GSAP animations verified preserved
- [x] Asset requirements documented

**Phase 4: COMPLETE ✅**

---

**Next Phase**: Phase 5 - Supporting Components Migration
**Estimated Time**: 20-30 minutes
