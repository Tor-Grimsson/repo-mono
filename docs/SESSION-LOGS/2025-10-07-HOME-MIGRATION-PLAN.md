# HOME MIGRATION PLAN - 2025-10-07

## Context
Migrating the original home page from `_nav-ref/kolkrabbi-home` into the current monorepo structure. This is a complex single-page application with heavy GSAP animations, video interactions, and custom mask/clip-path effects.

## Reference Location
`/Users/biskup/git/kolkrabbi/kolkrabbi-monorepo/_nav-ref/kolkrabbi-home/apps/web/`

## Analysis Summary

### What the Original Home Is
- **Architecture**: Single-page app (no routing) that imports all sections directly into App.jsx
- **Animation Engine**: Heavy use of GSAP with ScrollTrigger for scroll-based animations
- **Visual Effects**: Custom clip-path and mask animations on video/image elements
- **Key Features**:
  - Loader animation (three-body spinner)
  - Video hero with mini-preview that scales up on click
  - About section with mask reveal animation
  - Features section (bento grid)
  - Story section with cursor-tracking mask overlay
  - Contact form
  - Font preview component
  - CMS card component
  - Floating navbar with scroll show/hide behavior

### Key Dependencies
- `gsap` + `@gsap/react` + `ScrollTrigger`
- `react-icons/ti` (TiLocationArrow)
- `react-use` (useWindowScroll)
- Custom utilities in index.css with @utility syntax ✅ (already aligned with our approach!)

### Critical Functional Styles (MUST Migrate)
1. `.mask-clip-path` - clip-path polygon animation
2. `.storyOverlay` - custom mask with cursor tracking (`mask-image: url(/Svg/mask.svg)`)
3. All GSAP clip-path animations
4. Loader animations (three-body spinner with keyframes)
5. Video scaling/transformation animations
6. Navigation indicator line animations
7. Custom @utility classes:
   - `navHoverBtn` - navbar link with underline animation
   - `floatingNav` - floating navbar background
   - `absoluteCenter` - absolute centering utility
   - `flexCenter` - flex centering utility
   - `heroHeading` - hero typography style
   - `aboutSubtext` - about section text positioning
   - `aboutImage` - about section image positioning/sizing
   - `animatedTitle` - animated title text style
   - `bentoTitle` - bento grid title style
   - `bentoItem` - bento grid item base style
   - `storyImgContainer` - story image container
   - `storyImgContent` - story image content
   - `storyOverlay` - story cursor-tracking mask overlay

### Component Structure in Reference
```
apps/web/src/
├── App.jsx (imports all sections, no routing)
├── features/
│   ├── hero/
│   │   └── components/
│   │       ├── HeroSection.jsx (video hero with GSAP)
│   │       ├── About.jsx (mask reveal)
│   │       ├── Features.jsx (bento grid)
│   │       └── Story.jsx (cursor-tracking mask)
│   ├── contact/
│   │   └── pages/
│   │       └── Contact.jsx
│   ├── foundry/
│   │   └── components/
│   │       └── FontPreview.jsx
│   └── blog/
│       └── components/
│           └── CmsCard.jsx
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx (scroll behavior with GSAP)
│   │   └── Footer.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── AnimatedTitle.jsx
│       ├── VideoPreview.jsx
│       └── InteractiveImage.jsx
├── utils/
│   ├── RoundedCorners.jsx
│   ├── ClippedImage.jsx
│   └── ComingSoonCard.jsx
└── hooks/
    └── useBentoTilt.jsx
```

## Migration Strategy

### Design Principles
1. **Functionality Over Style**: Prioritize migrating behavioral CSS (masks, animations, GSAP) over purely aesthetic styles
2. **Preserve Animation Integrity**: Keep ALL GSAP animations exactly as-is
3. **No Simplification**: Don't remove "redundant" features or optimize prematurely
4. **Progressive Integration**: Create new route instead of replacing existing home
5. **Step-by-Step Approval**: Wait for user confirmation between each phase

### What We WON'T Do
- ❌ Convert video components to something else
- ❌ Simplify or remove GSAP animations
- ❌ Remove features we think are "redundant"
- ❌ Replace the existing home route immediately
- ❌ Touch the studio folder (as instructed)
- ❌ Make assumptions about missing assets

### What We WILL Prioritize
- ✅ Preserve ALL mask and clip-path behavior
- ✅ Preserve ALL GSAP animations exactly as written
- ✅ Maintain video functionality completely
- ✅ Keep loader animation
- ✅ Ensure ScrollTrigger works correctly
- ✅ Migrate functional utilities first, style utilities second
- ✅ Test each component individually

## 8-Phase Migration Plan

---

### PHASE 1: Foundation Setup ⚙️
**Goal**: Prepare the environment and extract critical utilities

**Tasks:**
1. Create `/routes/HomeOriginal.jsx` (new route for migrated home)
2. Extract critical CSS from reference `index.css`:
   - All @utility classes (heroHeading, aboutSubtext, animatedTitle, bentoTitle, bentoItem, storyImgContainer, storyImgContent, storyOverlay, etc.)
   - `.mask-clip-path` class
   - `.storyOverlay` with mask behavior
   - `.three-body` loader animation classes
   - `.indicator-line` animation
   - All keyframe animations (@keyframes spin78236, wobble1, wobble2, indicator-line)
3. Add to our `apps/web/src/index.css` (preserving existing utilities)
4. Verify no naming conflicts with existing utilities
5. Document any conflicts found

**Deliverables:**
- Updated `index.css` with new utilities
- Empty `HomeOriginal.jsx` route file
- Conflict report (if any)

**Status Report Format:**
```
✅ Phase 1 Complete
- Extracted X utility classes
- Added Y animation keyframes
- Conflicts found: [list or "none"]
- Ready for component migration
```

---

### PHASE 2: Component Migration - Utilities 🧩
**Goal**: Migrate reusable utility components

**Tasks:**
1. Copy and adapt utility components to our structure:
   - `RoundedCorners.jsx` → `/apps/web/src/components/common/`
   - `ClippedImage.jsx` → `/apps/web/src/components/common/`
   - `ComingSoonCard.jsx` → `/apps/web/src/components/common/`

2. For each component:
   - Update import paths to match monorepo structure
   - Convert any styled-components to Tailwind (if present)
   - Update to use our camelCase utility classes
   - Verify no external dependencies are missing

3. Create index files for clean imports if needed

**Deliverables:**
- 3 migrated utility components
- Updated import paths
- No styled-components dependencies

**Status Report Format:**
```
✅ Phase 2 Complete
- RoundedCorners.jsx migrated
- ClippedImage.jsx migrated
- ComingSoonCard.jsx migrated
- Import paths updated
- Dependencies: [list any new ones needed]
```

---

### PHASE 3: UI Components Migration 🎨
**Goal**: Migrate core UI building blocks

**Tasks:**
1. **Handle Button conflict**:
   - Compare our existing `/packages/ui/src/atoms/Button.jsx` with reference Button
   - Options:
     a) Merge features if compatible
     b) Rename reference as `ButtonOriginal.jsx`
     c) Use our existing Button and update references
   - Document decision and reasoning

2. **Migrate new UI components**:
   - `AnimatedTitle.jsx` → `/apps/web/src/components/common/`
   - `VideoPreview.jsx` → `/apps/web/src/components/common/`
   - `InteractiveImage.jsx` → `/apps/web/src/components/common/`

3. For each component:
   - Update import paths
   - Convert to use our utilities
   - Check for GSAP animations (preserve exactly)
   - Verify dependencies

4. **Migrate custom hook**:
   - `useBentoTilt.jsx` → `/apps/web/src/hooks/` (if doesn't exist already)

**Deliverables:**
- Button conflict resolved with documentation
- 3 new UI components migrated
- useBentoTilt hook migrated (if needed)
- All imports updated

**Status Report Format:**
```
✅ Phase 3 Complete
- Button handled: [decision made]
- AnimatedTitle.jsx migrated
- VideoPreview.jsx migrated
- InteractiveImage.jsx migrated
- useBentoTilt.jsx migrated
- Issues found: [list or "none"]
```

---

### PHASE 4: Hero Sections Migration 🎬
**Goal**: Migrate the complex animated hero sections with GSAP

**Tasks:**
1. Create `/apps/web/src/components/sections/home/` folder

2. Migrate hero components **ONE BY ONE** (wait for confirmation between each):

   **4a. HeroSection.jsx** (video hero):
   - Copy component
   - Preserve ALL GSAP animations:
     - Video scaling animation
     - clip-path polygon animation with ScrollTrigger
     - Mini video preview scale/visibility
   - Update class names to our utilities
   - Update import paths
   - Keep video paths (`videos/video-${index}.mp4`)
   - Preserve loader animation

   **4b. About.jsx** (mask reveal):
   - Copy component
   - Preserve GSAP clip-path timeline animation
   - Preserve mask-clip-path class usage
   - Update imports and utilities

   **4c. Features.jsx** (bento grid):
   - Copy component
   - Check for any GSAP animations
   - Preserve useBentoTilt hook usage
   - Update imports and utilities

   **4d. Story.jsx** (cursor-tracking mask):
   - Copy component
   - Preserve storyOverlay behavior
   - Check for cursor tracking event listeners
   - Update imports and utilities

3. For each component:
   - Test GSAP animations individually
   - Verify ScrollTrigger works
   - Check responsive behavior
   - Document any issues

**Deliverables:**
- `/components/sections/home/` folder created
- 4 hero section components migrated with animations intact
- Asset checklist (videos, SVG masks needed)

**Status Report Format:**
```
✅ Phase 4 Complete
- HeroSection.jsx migrated - video animations preserved ✓
- About.jsx migrated - mask reveal animation preserved ✓
- Features.jsx migrated - bento grid working ✓
- Story.jsx migrated - cursor tracking preserved ✓
- Assets needed: [list]
- Issues: [list or "none"]
```

---

### PHASE 5: Supporting Components Migration 🔧
**Goal**: Migrate contact, footer, and other supporting components

**Tasks:**
1. Check if Contact component exists in current structure
   - If yes: Compare and decide whether to use existing or migrate reference
   - If no: Migrate from reference

2. Check Footer component
   - Compare with existing if present
   - Merge or migrate as needed

3. Check FontPreview component (may overlap with Foundry work)
   - Coordinate with existing Foundry components
   - Migrate or link as appropriate

4. Check CmsCard component (blog related)
   - Migrate if needed for home page

**Deliverables:**
- Contact component handled
- Footer component handled
- FontPreview component handled
- CmsCard component handled
- Documentation of any overlaps with existing components

**Status Report Format:**
```
✅ Phase 5 Complete
- Contact: [migrated / using existing / skipped]
- Footer: [migrated / using existing / skipped]
- FontPreview: [migrated / linked to Foundry / skipped]
- CmsCard: [migrated / skipped]
- Notes: [any important decisions]
```

---

### PHASE 6: Integration & Routing 🔌
**Goal**: Wire everything together in the new route

**Tasks:**
1. Build out `/routes/HomeOriginal.jsx`:
   ```jsx
   import HeroSection from '@/components/sections/home/HeroSection'
   import About from '@/components/sections/home/About'
   import Features from '@/components/sections/home/Features'
   import Story from '@/components/sections/home/Story'
   import Contact from '@/components/sections/contact/Contact'
   import Footer from '@/components/layout/Footer'
   import FontPreview from '@/components/sections/foundry/FontPreview'
   import CmsCard from '@/components/sections/blog/CmsCard'

   const HomeOriginal = () => {
     return (
       <main className='min-h-screen w-screen overflow-x-hidden'>
         <HeroSection />
         <About />
         <Features />
         <Story />
         <Contact />
         <FontPreview />
         <CmsCard />
         <Footer />
       </main>
     )
   }

   export default HomeOriginal
   ```

2. Add route to App.jsx:
   ```jsx
   <Route path="home-original" element={<HomeOriginal />} />
   ```

3. Add temporary navbar link for testing:
   - Update Navbar component
   - Add "Home Original" link to nav items

4. Verify routing works

**Deliverables:**
- Complete HomeOriginal.jsx route
- Updated App.jsx routing
- Temporary navbar link added
- Access URL documented

**Status Report Format:**
```
✅ Phase 6 Complete
- HomeOriginal.jsx route created
- App.jsx routing updated
- Navbar link added
- Access URL: http://localhost:5173/home-original
- Initial load test: [pass / issues found]
```

---

### PHASE 7: GSAP & Animation Verification ✨
**Goal**: Ensure all animations work correctly

**Tasks:**
1. **ScrollTrigger Setup**:
   - Verify ScrollTrigger is registered
   - Check for any initialization issues
   - Test scroll-based triggers

2. **HeroSection Animations**:
   - [ ] Video scaling on click works
   - [ ] Mini preview appears on hover
   - [ ] clip-path animation on scroll works
   - [ ] Loader animation displays correctly

3. **About Section**:
   - [ ] Mask reveal animation triggers on scroll
   - [ ] Timeline animation completes correctly

4. **Story Section**:
   - [ ] Cursor-tracking mask follows mouse
   - [ ] Mask overlay displays correctly

5. **Navbar**:
   - [ ] Scroll show/hide behavior works
   - [ ] Background appears/disappears correctly
   - [ ] Mobile menu animations work

6. **General**:
   - [ ] No GSAP errors in console
   - [ ] Smooth scroll behavior
   - [ ] Performance is acceptable

**Deliverables:**
- Animation checklist completed
- Console errors documented (if any)
- Performance notes

**Status Report Format:**
```
✅ Phase 7 Complete
Animation Checklist:
- HeroSection: [✓ all working / issues: X, Y, Z]
- About: [✓ all working / issues: X, Y, Z]
- Story: [✓ all working / issues: X, Y, Z]
- Navbar: [✓ all working / issues: X, Y, Z]
- Console errors: [none / list]
- Performance: [smooth / needs optimization]
```

---

### PHASE 8: Asset & Final Verification 📦
**Goal**: Ensure all assets exist and final polish

**Tasks:**
1. **Asset Audit**:
   - [ ] Check for video files in `/public/videos/video-1.mp4` through `video-4.mp4`
   - [ ] Check for SVG mask in `/public/Svg/mask.svg`
   - [ ] Verify logo at `/public/img/logo.svg`
   - [ ] Check all font files referenced in index.css
   - [ ] Verify all other images/assets

2. **Dependency Verification**:
   - [ ] GSAP installed in monorepo root
   - [ ] @gsap/react installed
   - [ ] react-icons installed
   - [ ] react-use installed
   - [ ] All other dependencies present

3. **Responsive Testing**:
   - [ ] Mobile view (< 768px)
   - [ ] Tablet view (768px - 1024px)
   - [ ] Desktop view (> 1024px)
   - [ ] Test animations on different screen sizes

4. **Final Cleanup**:
   - [ ] Remove any unused imports
   - [ ] Check for console warnings
   - [ ] Verify no broken links/routes
   - [ ] Document any known issues

5. **Documentation**:
   - Create list of missing assets (if any)
   - Document any workarounds implemented
   - Note any features not migrated
   - List next steps for production readiness

**Deliverables:**
- Complete asset checklist
- Dependency verification report
- Responsive testing results
- Known issues documentation
- Missing assets list

**Status Report Format:**
```
✅ Phase 8 Complete - Migration Finished!

Assets Status:
- Videos: [✓ present / missing: X, Y, Z]
- SVG mask: [✓ present / missing]
- Fonts: [✓ all present / missing: X, Y, Z]
- Images: [✓ all present / missing: X, Y, Z]

Dependencies:
- [✓ all installed / missing: X, Y, Z]

Responsive Testing:
- Mobile: [✓ working / issues: X, Y, Z]
- Tablet: [✓ working / issues: X, Y, Z]
- Desktop: [✓ working / issues: X, Y, Z]

Known Issues:
- [list or "none"]

Missing Assets:
- [list or "none - ready for production!"]

Next Steps:
- [list remaining work if any]
```

---

## Potential Challenges & Solutions

### Challenge 1: Button Component Conflict
**Problem**: We have an existing Button component, reference has its own
**Solutions**:
- Option A: Merge features if compatible (preferred)
- Option B: Rename reference Button to ButtonOriginal
- Option C: Use existing Button, update all references in migrated components

### Challenge 2: Missing Video Assets
**Problem**: Reference code expects video files that may not exist
**Solutions**:
- Provide placeholder videos for testing
- Document required videos for user to provide
- Create fallback to images if videos unavailable

### Challenge 3: GSAP Version Differences
**Problem**: Reference may use different GSAP version than monorepo
**Solutions**:
- Check versions first
- Update monorepo GSAP if needed (ask permission)
- Test all animations after version change

### Challenge 4: Cursor-Tracking Mask
**Problem**: Story section's cursor-tracking mask needs window event listeners
**Solutions**:
- Ensure event listeners are properly set up
- Test on different devices/browsers
- Add fallback for touch devices

### Challenge 5: Component Overlaps
**Problem**: Contact/Footer/FontPreview might overlap with existing components
**Solutions**:
- Compare implementations before migrating
- Merge features where possible
- Document which version is being used and why

### Challenge 6: Scroll Behavior Conflicts
**Problem**: Multiple ScrollTrigger instances might conflict
**Solutions**:
- Ensure proper cleanup in useEffect
- Use unique trigger IDs
- Test scroll behavior thoroughly

### Challenge 7: Mobile Menu Behavior
**Problem**: Reference navbar has custom mobile menu logic
**Solutions**:
- Test mobile menu thoroughly
- Ensure no conflicts with existing navbar (if any)
- Verify touch interactions work

## Success Criteria

The migration is successful when:

- [ ] All 8 phases completed
- [ ] HomeOriginal route accessible at `/home-original`
- [ ] All GSAP animations working correctly
- [ ] Video hero scales and plays correctly
- [ ] Mask reveal animations work
- [ ] Cursor-tracking mask follows mouse
- [ ] Navbar scroll behavior works
- [ ] Loader animation displays
- [ ] Page is responsive on all screen sizes
- [ ] No console errors
- [ ] All assets accounted for (or documented as missing)
- [ ] User can navigate and interact with all sections

## Post-Migration Tasks

After migration is complete:

1. **Testing Period**:
   - Use home-original route for testing
   - Compare with reference version
   - Gather feedback

2. **Decision Point**:
   - Keep both routes or replace original home?
   - Remove temporary navbar link
   - Archive or delete reference code

3. **Optimization** (if needed):
   - Optimize video loading
   - Improve GSAP performance
   - Reduce bundle size

4. **Documentation**:
   - Update README with home page architecture
   - Document animation patterns for future reference
   - Create component usage guide

## Notes & Considerations

- **No TypeScript**: Maintaining JavaScript as per project rules
- **No Git Commits**: Will not create commits, user maintains control
- **Preserve Functionality**: Functionality over aesthetics
- **Ask Before Modifying**: Will always ask before changing master documents
- **Studio Folder**: Completely ignored as instructed
- **Step-by-Step**: User approval required between phases
- **Asset Dependencies**: User responsible for providing videos/images
- **GSAP License**: Ensure project has proper GSAP licensing for production

## Timeline Estimate

This is a complex migration. Estimated time per phase:

- Phase 1: 20-30 minutes (CSS extraction)
- Phase 2: 15-20 minutes (utility components)
- Phase 3: 20-30 minutes (UI components + Button conflict)
- Phase 4: 45-60 minutes (hero sections with GSAP)
- Phase 5: 20-30 minutes (supporting components)
- Phase 6: 15-20 minutes (routing integration)
- Phase 7: 30-40 minutes (animation testing)
- Phase 8: 30-40 minutes (asset verification + final polish)

**Total: 3-4 hours** (with user approval pauses between phases)

## Migration Workflow

1. I announce: **"Starting Phase X: [Name]"**
2. I complete all tasks in that phase
3. I report: **"Phase X Complete - Status: [detailed report]"**
4. **I WAIT for your approval** before proceeding
5. You review and say "continue" or provide feedback
6. I proceed to next phase

This ensures we work **together step-by-step**, maintaining control and visibility throughout the entire migration process.

---

**Document Created**: 2025-10-07
**Status**: Planning Complete - Ready for Execution
**Next Step**: Await user approval to begin Phase 1
