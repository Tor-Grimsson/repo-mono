# HOME MIGRATION - PHASE 2 CHECKPOINT
**Date**: 2025-10-07
**Phase**: 2 - Utility Components Migration
**Status**: ✅ COMPLETE

---

## Phase 2 Summary
Migrated reusable utility components from `_nav-ref/kolkrabbi-home` to current monorepo structure.

---

## Files Created

### Components
1. `/apps/web/src/components/common/RoundedCorners.jsx`
   - SVG filter component for rounded corners effect
   - Invisible SVG with filter definition
   - No dependencies, pure SVG
   - Size: 32 lines

2. `/apps/web/src/components/common/ClippedImage.jsx`
   - SVG clip-path component for mouse-tracking image reveal
   - Props: `imageUrl`, `mousePos`, `size`
   - Uses foreignObject for robust HTML clipping
   - Dynamic clip path based on mouse position
   - Size: 49 lines

3. `/apps/web/src/components/common/ComingSoonCard.jsx`
   - Bento grid card with 3D tilt effect
   - Uses `bentoItem` and `bentoTitle` utilities (migrated in Phase 1)
   - Requires `react-icons/ti` for TiLocationArrow icon
   - Integrates useBentoTilt hook
   - Size: 24 lines

### Hooks
4. `/apps/web/src/hooks/useBentoTilt.js`
   - **New directory created**: `/apps/web/src/hooks/`
   - Mouse-tracking 3D tilt effect hook
   - Returns: `{ ref, style, onMouseMove, onMouseLeave }`
   - Creates perspective-based 3D rotation on mouse movement
   - Size: 27 lines

---

## Migration Details

### RoundedCorners.jsx
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/utils/RoundedCorners.jsx`
- **Destination**: `/apps/web/src/components/common/RoundedCorners.jsx`
- **Changes Made**:
  - Removed unused `React` import
  - No other changes - direct copy

### ClippedImage.jsx
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/utils/ClippedImage.jsx`
- **Destination**: `/apps/web/src/components/common/ClippedImage.jsx`
- **Changes Made**:
  - Removed unused `React` import
  - Changed `clip-path` to `clipPath` (camelCase for JSX)
  - Cleaned up spacing/formatting

### ComingSoonCard.jsx
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/utils/ComingSoonCard.jsx`
- **Destination**: `/apps/web/src/components/common/ComingSoonCard.jsx`
- **Changes Made**:
  - Updated import path: `@hooks/useBentoTilt` → `../../hooks/useBentoTilt`
  - Uses `bentoItem` and `bentoTitle` utilities (already available from Phase 1)
  - No styling changes needed

### useBentoTilt.js
- **Source**: `_nav-ref/kolkrabbi-home/apps/web/src/hooks/useBentoTilt.jsx`
- **Destination**: `/apps/web/src/hooks/useBentoTilt.js`
- **Changes Made**:
  - Created new `/hooks/` directory (didn't exist before)
  - Changed file extension from `.jsx` to `.js` (no JSX in file)
  - Removed comment header
  - Cleaned up formatting

---

## Dependencies

### External Packages Required
- ✅ `react-icons` (specifically `react-icons/ti` for TiLocationArrow)
  - Used in: ComingSoonCard.jsx
  - Need to verify this is installed in monorepo

### Internal Dependencies
- ✅ `useBentoTilt` hook (migrated in this phase)
- ✅ `bentoItem` utility class (migrated in Phase 1)
- ✅ `bentoTitle` utility class (migrated in Phase 1)

---

## Utility Classes Used

From Phase 1 migration:
- `bentoItem` - base styling for bento grid items
- `bentoTitle` - typography for bento titles

---

## Import Paths

All components use relative imports to avoid alias conflicts:
```javascript
// ComingSoonCard.jsx
import { TiLocationArrow } from 'react-icons/ti'
import { useBentoTilt } from '../../hooks/useBentoTilt'
```

No path aliases used in this phase (keeping it simple).

---

## Testing Notes

### Components to Test
1. **RoundedCorners**: Apply to elements to verify filter effect works
2. **ClippedImage**: Test with mouse movement to verify clip path follows cursor
3. **ComingSoonCard**: Test 3D tilt effect on hover
4. **useBentoTilt**: Verify smooth tilt animation on mouse movement

### Known Considerations
- ClippedImage requires `mousePos` and `size` props to function
- useBentoTilt creates 3D transforms that may affect layout
- ComingSoonCard uses hardcoded `bg-violet-300` color

---

## Issues Found

**None** - All components migrated cleanly

---

## Next Steps

**Phase 3**: UI Components Migration
- Compare existing Button with reference Button (conflict resolution)
- Migrate AnimatedTitle.jsx
- Migrate VideoPreview.jsx
- Migrate InteractiveImage.jsx

---

## File Structure After Phase 2

```
apps/web/src/
├── components/
│   └── common/
│       ├── ClippedImage.jsx ✨ NEW
│       ├── ComingSoonCard.jsx ✨ NEW
│       ├── RoundedCorners.jsx ✨ NEW
│       ├── SectionLabel.jsx (existing)
│       └── ... (other existing components)
├── hooks/
│   └── useBentoTilt.js ✨ NEW (directory created)
└── ... (other directories)
```

---

## Completion Status

- [x] RoundedCorners.jsx migrated
- [x] ClippedImage.jsx migrated
- [x] ComingSoonCard.jsx migrated
- [x] useBentoTilt hook migrated
- [x] Import paths updated
- [x] No styled-components found
- [x] All utilities from Phase 1 confirmed available

**Phase 2: COMPLETE ✅**

---

**Next Phase**: Phase 3 - UI Components Migration
**Estimated Time**: 20-30 minutes
