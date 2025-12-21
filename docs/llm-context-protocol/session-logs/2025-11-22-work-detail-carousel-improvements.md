---
date: 2025-11-22
type: session-log
status: completed
tags: [carousel, work-detail, video-support, ui-improvements]
---

# Work Detail Page: Carousel & Video Improvements

## Summary
Improved work detail page with hero video support and replaced complex GSAP carousel with a simpler, more reliable React-based carousel featuring drag/swipe functionality.

## Changes Made

### 1. Image Carousel Replacement
**File:** `apps/web/src/components/sections/work-detail/ImageCarousel.jsx`

**Problem:** Complex GSAP horizontal loop carousel was buggy, wonky, and difficult to maintain. Issues included:
- Not starting at the first image
- Infinite loop not working properly
- Complex initialization timing issues
- Empty carousel items appearing

**Solution:** Replaced with simple React state-based carousel
- Uses React useState for index tracking
- CSS transforms for smooth sliding (`translateX`)
- Added drag/swipe support for both mouse and touch events
- Added indicator dots for navigation
- Filters invalid images (missing asset or url)
- Starts at slide 6 (index 5) per user request

**Key Features:**
```jsx
// Drag implementation
const handleDragStart = (event) => {
  event.preventDefault()
  setIsDragging(true)
  setStartX(getPositionX(event))
}

const handleDragMove = (event) => {
  if (!isDragging) return
  event.preventDefault()
  const currentPosition = getPositionX(event)
  const diff = currentPosition - startX
  const containerWidth = sliderRef.current?.offsetWidth || 1
  const percentageMoved = (diff / containerWidth) * 100
  setCurrentTranslate(percentageMoved)
}

// Transform calculation
const getTransform = () => {
  const baseTranslate = -currentIndex * 100
  if (isDragging) {
    return `translateX(${baseTranslate + currentTranslate}%)`
  }
  return `translateX(${baseTranslate}%)`
}
```

**CSS Classes Added:**
- `pointer-events-none` on images to prevent default drag behavior
- `select-none` to prevent text selection while dragging
- `cursor-grab` and `cursor-grabbing` for visual feedback
- Conditional transition class (disabled during drag, enabled for snap)

**Navigation Buttons:**
- Changed from `bg-fg-04` to `bg-fg-inverse-16`
- Hover state: `bg-fg-inverse-32` (using inline style with color-mix)
- Fixed issue where Tailwind hover variants weren't working with custom utilities

### 2. Hero Video Support
**Files:**
- `packages/content/src/schemas/types/project.ts`
- `apps/web/src/components/sections/work-detail/DetailHero.jsx`
- `apps/web/src/lib/queries.js`

**Added to Sanity Schema:**
```typescript
defineField({
  name: 'heroVideo',
  title: 'Hero Video',
  type: 'file',
  group: 'media',
  description: 'Upload a video file for the hero section (will be used instead of hero image if provided)',
  options: {
    accept: 'video/*'
  }
})
```

**Video Implementation:**
```jsx
const hasVideo = project.heroVideo?.url
const hasImage = project.heroImage

{hasVideo ? (
  <video
    src={project.heroVideo.url}
    autoPlay
    muted
    loop
    playsInline
    disablePictureInPicture
    controlsList="nodownload nofullscreen noremoteplayback"
    className="w-full h-full object-cover pointer-events-none"
  />
) : hasImage ? (
  <SanityImage ... />
) : null}
```

**Video Attributes:**
- `autoPlay`, `muted`, `loop`: Auto-playing background video
- `playsInline`: Mobile compatibility
- `disablePictureInPicture`: Removes PiP button
- `controlsList`: Removes download/fullscreen/cast controls
- `pointer-events-none`: Prevents interaction

**DetailHero Label Change:**
- Changed from `{project.client}` to `"Project"`

### 3. ProjectText Component Updates
**File:** `apps/web/src/components/sections/work-detail/ProjectText.jsx`

**Typography Improvements:**
- Changed section label from "Project Overview" to "Overview"
- Increased text sizes from `kol-mono-sm` to `kol-mono-text`
- Fixed description alignment issue

**Description Alignment Fix:**
```jsx
<div className="flex flex-row items-end">
  <div className="flex-1 flex flex-col gap-2">
    <SectionLabel text="Overview" size="sm" />
    <h1 className="kol-display-section">
      / {project.slug?.current || 'project'}
    </h1>
  </div>
  {project.description && (
    <div className="hidden xl:block w-180">
      <p className="kol-mono-sm w-120">
        {project.description}
      </p>
    </div>
  )}
</div>
```
- Wrapped description in `w-180` container
- Text constrained to `w-120` inside
- Baseline aligned with project title using `items-end`

**Navigation Updates:**
- Replaced `ButtonNav` with `LinkWithIcon` component
- Removed background, padding, border-radius from navigation
- Increased text size by one level

### 4. Studio Page Updates
**File:** `apps/web/src/components/sections/studio/StudioApproach.jsx`
- Updated with new systematic approach copy
- Fixed text alignment to match services section layout

**File:** `apps/web/src/components/sections/studio/StudioServices.jsx`
- Added imagery to service cards (feat-1.png through feat-4.png)
- Changed "View Our Work" to "View Work"
- Updated button to use diamond icon

### 5. Work Page Updates
**File:** `apps/web/src/routes/Work.jsx`
- Changed work page image to `work.png`

**File:** `apps/web/src/components/sections/work/ProjectsGrid.jsx`
- Made all featured work cards uniform size
- Removed hero card special sizing

**File:** `apps/web/src/components/sections/work/ProjectsList.jsx`
- Changed "Archive" to "Collections"

### 6. CMS Schema Updates
**File:** `packages/content/src/schemas/types/project.ts`
- Removed unused `summary` field from project schema

### 7. UI Component Fixes
**File:** `packages/ui/src/atoms/ButtonNav.jsx`
- Fixed back arrow to point left instead of up

**New Icons Added:**
- `packages/ui/src/atoms/icons/svg/diamond.svg`
- `packages/ui/src/atoms/icons/svg/frequency.svg`
- `packages/ui/src/atoms/icons/svg/layout.svg`

## Technical Decisions

### Why Replace GSAP Carousel?
1. **Complexity:** 300+ lines of complex helper function
2. **Maintenance:** Difficult to debug and modify
3. **Reliability:** Initialization timing issues
4. **Overhead:** Required InertiaPlugin and Draggable
5. **Simplicity:** React state + CSS transforms = 95 lines total

### Carousel Drag Implementation
- **Event Prevention:** `event.preventDefault()` stops default image drag
- **Pointer Events:** `pointer-events-none` on images prevents interference
- **Smooth Feedback:** Transitions disabled during drag, enabled for snap
- **Threshold:** 20% drag threshold to advance to next/prev slide
- **Support:** Both mouse (desktop) and touch (mobile) events

### Color Token Investigation
- Discovered that Tailwind JIT doesn't auto-generate hover variants for custom CSS utilities
- Solution: Used inline `<style jsx>` with CSS hover pseudo-class
- Properly used `bg-fg-inverse-*` tokens with `color-mix()` for context-aware colors

## Files Modified
```
apps/web/src/components/sections/work-detail/ImageCarousel.jsx
apps/web/src/components/sections/work-detail/DetailHero.jsx
apps/web/src/components/sections/work-detail/ProjectText.jsx
apps/web/src/components/sections/studio/StudioApproach.jsx
apps/web/src/components/sections/studio/StudioServices.jsx
apps/web/src/components/sections/work/ProjectsGrid.jsx
apps/web/src/components/sections/work/ProjectsList.jsx
apps/web/src/routes/Work.jsx
apps/web/src/lib/queries.js
packages/content/src/schemas/types/project.ts
packages/ui/src/atoms/ButtonNav.jsx
packages/ui/src/atoms/icons/svg/diamond.svg (new)
packages/ui/src/atoms/icons/svg/frequency.svg (new)
packages/ui/src/atoms/icons/svg/layout.svg (new)
apps/web/public/img/work/work.png (new)
```

## Testing Notes
- Carousel drag works smoothly in both directions
- Video autoplay works correctly with all controls disabled
- Navigation buttons have proper hover states
- Indicator dots accurately reflect current slide
- Carousel starts at slide 6 as requested
- Invalid images are filtered out
- Infinite looping works correctly

## User Feedback
- "ok this works" - after fixing drag implementation
- Initial attempts with absolute positioning broke the carousel
- Drag was initially "buggy" when images could be grabbed
- Fixed by adding `event.preventDefault()` and `pointer-events-none`

## Next Steps
- Monitor carousel performance with large image sets
- Consider adding keyboard navigation (arrow keys)
- Consider adding swipe gesture indicators for mobile
- Test video performance on slower connections
