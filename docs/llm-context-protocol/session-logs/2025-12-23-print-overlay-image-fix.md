# Session Log: Print Overlay Image Height Fix

**Date:** 2025-12-23
**Duration:** ~30 minutes
**Objective:** Fix image visibility in PrintDetailOverlay - ensure full image visible top to bottom

---

## Problem

The print image in `PrintDetailOverlay.jsx` was not fully visible within the overlay container. The image was being cut off rather than scaling to fit.

## Failed Attempts

### Attempt 1: `h-full w-auto`
```jsx
className="h-full w-auto object-contain rounded"
```
**Result:** Image still cut off

### Attempt 2: `max-h-full max-w-full`
```jsx
className="max-h-full max-w-full object-contain rounded"
```
**Result:** Still didn't work

## Root Cause

CSS percentage heights (`max-h-full` = 100% of parent) require the parent to have an **explicit/definite height**. In flex layouts, `flex-1` does NOT provide an explicit height - it's computed dynamically.

```
flex-1 (no explicit height) → max-h-full fails → image overflows
```

## Solution

Use **absolute positioning** to create a containing block with definite dimensions.

### Before
```jsx
<div className="flex-1 flex items-center justify-center p-6 lg:p-10 min-h-0 overflow-hidden">
  {activeImage && (
    <img
      src={activeImage}
      alt={print.name}
      className="max-h-full max-w-full object-contain rounded"
    />
  )}
</div>
```

### After
```jsx
<div className="flex-1 relative min-h-0">
  <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-10 overflow-hidden">
    {activeImage && (
      <img
        src={activeImage}
        alt={print.name}
        className="max-h-full max-w-full object-contain rounded"
      />
    )}
  </div>
</div>
```

### Why This Works

1. `flex-1 relative min-h-0` - Outer div takes flex space, becomes positioning context
2. `absolute inset-0` - Inner div fills outer with DEFINITE dimensions
3. `max-h-full max-w-full` - Now works because parent has explicit size from absolute positioning

## Files Modified

- `apps/web/src/routes/prints/PrintDetailOverlay.jsx` (lines 124-135)

## Key Takeaway

**CSS percentage heights in flex children don't work** because the parent doesn't have a "definite" height in CSS terms. Absolute positioning creates a containing block that solves this.

---

## Status

- [x] Image now fully visible within overlay
- [x] Maintains aspect ratio with object-contain
- [x] Proper padding/margins preserved
