# HOME MIGRATION - PHASE 3 CHECKPOINT
**Date**: 2025-10-07
**Phase**: 3 - UI Components Migration
**Status**: ✅ COMPLETE

---

## Phase 3 Summary
Migrated core UI components from `_nav-ref/kolkrabbi-home` and resolved Button component conflict.

---

## Files Created

### Components
1. `/apps/web/src/components/common/ButtonOriginal.jsx`
   - Original home button component
   - Props: `title`, `id`, `rightIcon`, `leftIcon`, `containerClass`
   - Always renders `<button>` element
   - Uses `font-right-grotesk-tight` for text
   - Rounded full design with icon support
   - Size: 19 lines

2. `/apps/web/src/components/common/AnimatedTitle.jsx`
   - GSAP ScrollTrigger animated title component
   - Props: `title`, `containerClass`
   - Splits title by `<br />` and spaces
   - Stagger animation on scroll (opacity + 3D transform)
   - Uses `animatedTitle` utility (Phase 1)
   - Uses `flexCenter` utility (Phase 1)
   - Size: 61 lines

3. `/apps/web/src/components/common/VideoPreview.jsx`
   - GSAP hover parallax wrapper component
   - Props: `children` (wrapper component)
   - 3D rotation effect on mouse movement
   - Parallax effect (container moves one way, content moves opposite)
   - Resets on mouse leave
   - Size: 82 lines

4. `/apps/web/src/components/common/InteractiveImage.jsx`
   - GSAP 3D tilt with SVG clip-path
   - Props: `imageUrl`
   - Mouse-tracking 3D rotation
   - Blurred background layer + clipped sharp foreground
   - Uses ResizeObserver for responsive sizing
   - Custom SVG clip path that follows mouse
   - Size: 128 lines

---

## Button Conflict Resolution

### The Problem
Two completely different Button components exist:

**Reference Button** (`_nav-ref/kolkrabbi-home`):
```jsx
<Button
  title="Get in Touch"
  leftIcon={<Icon />}
  containerClass="bg-violet-50"
/>
```
- Props: `title`, `id`, `rightIcon`, `leftIcon`, `containerClass`
- Always renders `<button>`
- Specific layout for icons + text
- Uses `font-right-grotesk-tight`

**Our Button** (`@kol/ui`):
```jsx
<Button variant="primary" href="/link">
  Get in Touch
</Button>
```
- Props: `children`, `variant`, `href`, `onClick`, `className`, `style`
- Can render `<a>` or `<button>`
- Uses theme.css classes (`btn-primary`, etc.)
- Designed for work/foundry pages

### The Solution
**Created ButtonOriginal.jsx** - Separate component for home page
- Preserved reference Button exactly as-is
- Renamed to avoid conflict
- Home page components will import ButtonOriginal
- Work/Foundry pages continue using @kol/ui Button
- No merging attempted (too different)

### Decision Reasoning
- Components serve different purposes
- Different prop APIs
- Different styling approaches
- Merging would break existing work/foundry pages
- Keeping separate maintains clarity

---

## Migration Details

### ButtonOriginal.jsx
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/components/ui/Button.jsx`
- **Destination**: `/apps/web/src/components/common/ButtonOriginal.jsx`
- **Changes Made**:
  - Removed unused `React` import
  - Fixed JSX attribute: `is={id}` → `id={id}` (was likely typo in original)
  - Cleaned up formatting

### AnimatedTitle.jsx
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/components/ui/AnimatedTitle.jsx`
- **Destination**: `/apps/web/src/components/common/AnimatedTitle.jsx`
- **Changes Made**:
  - Added `gsap.registerPlugin(ScrollTrigger)` at top level
  - Cleaned up comments
  - Removed unused `React` import
  - **GSAP Animation PRESERVED exactly**

### VideoPreview.jsx
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/components/ui/VideoPreview.jsx`
- **Destination**: `/apps/web/src/components/common/VideoPreview.jsx`
- **Changes Made**:
  - Removed unused `React` import
  - Cleaned up formatting
  - **GSAP Animation PRESERVED exactly**

### InteractiveImage.jsx
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/components/ui/InteractiveImage.jsx`
- **Destination**: `/apps/web/src/components/common/InteractiveImage.jsx`
- **Changes Made**:
  - Removed unused `React` import
  - Changed `clip-path` to `clipPath` (JSX camelCase)
  - Cleaned up formatting
  - **GSAP Animation PRESERVED exactly**

---

## GSAP Animations Preserved

All GSAP animations migrated exactly as written in reference:

### AnimatedTitle
- **ScrollTrigger Configuration**:
  - Trigger: container element
  - Start: "100 bottom"
  - End: "center bottom"
  - Toggle actions: "play none none reverse"
- **Animation**:
  - Target: `.animatedWord` class
  - Properties: opacity, translate3d, rotateY, rotateX
  - Easing: power2.inOut
  - Stagger: 0.02s between words

### VideoPreview
- **Mouse Movement Animation**:
  - Container: translates + 3D rotation (rotationY, rotationX)
  - Content: translates in opposite direction (parallax)
  - Transform perspective: 500px
  - Duration: 1s
  - Easing: power1.out
- **Mouse Leave Animation**:
  - Resets all transforms to 0
  - Same duration and easing

### InteractiveImage
- **Setup**:
  - Initial GSAP set: rotateX: 0, rotateY: 0, transformPerspective: 500
- **Mouse Movement Animation**:
  - Calculates rotation based on mouse position relative to center
  - Max rotation: ±10 degrees
  - Duration: 0.5s
  - Easing: power1.out
- **Mouse Leave Animation**:
  - Resets rotation to 0
  - Duration: 0.5s
  - Easing: power1.inOut
- **Additional Features**:
  - ResizeObserver for responsive sizing
  - SVG clip-path follows mouse
  - Blurred background + sharp clipped foreground

---

## Dependencies

### External Packages Required
- ✅ `gsap` (all three components)
- ✅ `gsap/ScrollTrigger` (AnimatedTitle)
- ✅ `react-icons/ti` (ButtonOriginal - from Phase 2)

### Internal Dependencies
- ✅ `animatedTitle` utility class (from Phase 1)
- ✅ `flexCenter` utility class (from Phase 1)

### Browser APIs Used
- `ResizeObserver` (InteractiveImage)
- `getBoundingClientRect()` (VideoPreview, InteractiveImage)

---

## Utility Classes Used

From Phase 1 migration:
- `animatedTitle` - animated title text style
- `flexCenter` - flex centering layout
- `font-right-grotesk-tight` - font family (via Tailwind)

---

## Component Usage Patterns

### AnimatedTitle
```jsx
<AnimatedTitle
  title="Welcome<br />to<br />Kolkrabbi"
  containerClass="py-10"
/>
```
- Splits by `<br />` for lines
- Splits by spaces for words
- Each word animates individually with stagger

### VideoPreview
```jsx
<VideoPreview>
  <video src="/path/to/video.mp4" />
</VideoPreview>
```
- Wrapper component
- Adds 3D parallax effect to any children

### InteractiveImage
```jsx
<InteractiveImage imageUrl="/path/to/image.jpg" />
```
- Self-contained image display
- Creates blurred bg + clipped fg automatically

### ButtonOriginal
```jsx
<ButtonOriginal
  title="Get in Touch"
  leftIcon={<TiLocationArrow />}
  containerClass="bg-yellow-400"
/>
```
- Used in hero sections
- Different from @kol/ui Button

---

## Testing Notes

### Components to Test
1. **ButtonOriginal**: Click interaction, icon positioning
2. **AnimatedTitle**: Scroll trigger activation, stagger timing
3. **VideoPreview**: Hover parallax, mouse leave reset
4. **InteractiveImage**: Mouse tracking, clip path following cursor, 3D tilt

### Animation Testing
- Verify ScrollTrigger fires at correct scroll position
- Check GSAP transforms work on different screen sizes
- Test performance with multiple animated components
- Verify cleanup on unmount (GSAP context revert)

### Known Considerations
- AnimatedTitle uses `dangerouslySetInnerHTML` for word rendering
- InteractiveImage creates unique IDs that may conflict if multiple instances used
- VideoPreview assumes children can handle transforms

---

## Issues Found

**None** - All components migrated cleanly with GSAP preserved

---

## Next Steps

**Phase 4**: Hero Sections Migration (THE BIG ONE)
- Migrate HeroSection.jsx (video hero with complex GSAP)
- Migrate About.jsx (mask reveal animation)
- Migrate Features.jsx (bento grid)
- Migrate Story.jsx (cursor-tracking mask overlay)

This is the most complex phase with:
- Multiple video elements
- ScrollTrigger clip-path animations
- Mask animations with cursor tracking
- Loader animations

---

## File Structure After Phase 3

```
apps/web/src/
├── components/
│   └── common/
│       ├── AnimatedTitle.jsx ✨ NEW
│       ├── ButtonOriginal.jsx ✨ NEW
│       ├── ClippedImage.jsx (Phase 2)
│       ├── ComingSoonCard.jsx (Phase 2)
│       ├── InteractiveImage.jsx ✨ NEW
│       ├── RoundedCorners.jsx (Phase 2)
│       ├── SectionLabel.jsx (existing)
│       ├── Tag.jsx (existing)
│       └── VideoPreview.jsx ✨ NEW
├── hooks/
│   └── useBentoTilt.js (Phase 2)
└── ... (other directories)
```

---

## Completion Status

- [x] Button conflict identified and resolved
- [x] ButtonOriginal.jsx created
- [x] AnimatedTitle.jsx migrated (GSAP preserved)
- [x] VideoPreview.jsx migrated (GSAP preserved)
- [x] InteractiveImage.jsx migrated (GSAP preserved)
- [x] All import paths updated
- [x] No styled-components found
- [x] All GSAP animations preserved exactly
- [x] ScrollTrigger registered

**Phase 3: COMPLETE ✅**

---

**Next Phase**: Phase 4 - Hero Sections Migration
**Estimated Time**: 45-60 minutes (most complex phase)
