# Session Log: Prints Pricing Refactor & Grid Hover Overlay

**Date:** 2025-12-29
**Duration:** ~2 hours
**Branch:** main

---

## Session Objectives

1. Centralize print pricing and PayPal links in single source of truth
2. Add shipping region selection (EU vs International)
3. Clean up deprecated fields from print data
4. Redesign print grid cards with hover overlay

---

## Work Completed

### 1. Centralized Pricing Structure (`prints.js`)

**Before:** Each print had individual `price`, `priceISK`, `currency`, `edition`, `sizes` fields.

**After:** Centralized exports at top of file:

```js
// PayPal payment links by size + edition + shipping region
export const paypalLinks = {
  'A3-open-eu': 'https://www.paypal.com/ncp/payment/78EW9SNGUMUTQ',
  'A3-open-intl': 'https://www.paypal.com/ncp/payment/FK7FX2CSLTZ8S',
  'A3-limited-eu': 'https://www.paypal.com/ncp/payment/L6VA34TEV3K9L',
  'A3-limited-intl': 'https://www.paypal.com/ncp/payment/CQYLQRG6375YA',
  'A2-limited-eu': 'https://www.paypal.com/ncp/payment/ZWHCDFVV6F67U',
  'A2-limited-intl': 'https://www.paypal.com/ncp/payment/DXXYNSP3KFHQJ',
  'A1-limited-eu': 'https://www.paypal.com/ncp/payment/PLBBB4TN2E5EA',
  'A1-limited-intl': 'https://www.paypal.com/ncp/payment/XJJ73CFEJG3K8'
}

// Pricing by size + edition (EUR) - art price + shipping
export const printPricing = {
  'A3-open': { art: 140, shippingEU: 20, shippingIntl: 32 },
  'A3-limited': { art: 220, shippingEU: 20, shippingIntl: 32 },
  'A2-limited': { art: 320, shippingEU: 35, shippingIntl: 55 },
  'A1-limited': { art: 650, shippingEU: 60, shippingIntl: 95 }
}

// Static content for print detail overlay
export const printInfo = {
  overview: { description: '...' },
  edition: { intro: '...', counts: {...}, artistProofs: 'Not for sale' },
  materials: { process: '...', papers: {...}, certificate: '...' },
  shipping: { intro: '...', vatNote: '...' }
}
```

### 2. Removed Deprecated Fields from Print Data

Removed from all 12 print entries:
- `price` - now in `printPricing`
- `priceISK` - no longer used
- `currency` - always EUR
- `edition` - now in `printInfo.edition.counts`
- `sizes` - fixed at A3/A2/A1
- `stripePaymentLink` - replaced with PayPal
- `printOnDemandUrl` - not used

Also removed:
- `filterData.editions` - no longer needed
- `formatEdition()` helper - unused
- Simplified `formatPrice()` to EUR only

### 3. PrintDetailOverlay Enhancements

- Added shipping region dropdown (EU/International)
- Dynamic price calculation: `art + shipping = total`
- PayPal link changes based on size + edition + region selection
- Hidden tags below title (cleaner look)
- Updated Iceland pickup message

### 4. PrintGridCard Hover Overlay

**Before:** Title and price displayed below image.

**After:** Clean gallery view with hover overlay:

```jsx
// Hover state management
const [isHovered, setIsHovered] = useState(false)

// Dark overlay + title - revealed on hover
<div
  className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
  style={{
    backgroundColor: 'rgba(0,0,0,0.7)',
    opacity: isHovered ? 1 : 0
  }}
>
  <h3 className="kol-heading-sm text-white">{print.name}</h3>
  <p className="kol-mono-xs text-white/70">From €140</p>
</div>
```

---

## Issues & Solutions

### Issue 1: App Crash After Removing `editions`

**Error:** `Uncaught TypeError: React2.useContext(...) is null`

**Cause:** `prints/index.jsx` still referenced `filterData.editions` which was removed.

**Fix:** Removed the Edition filter group from `filterGroups`:

```jsx
// Before
const filterGroups = useMemo(() => [
  { label: 'Category', key: 'category', values: filterData.categories },
  { label: 'Edition', key: 'edition', values: filterData.editions }, // BROKEN
  { label: 'Year', key: 'year', values: filterData.years }
], [])

// After
const filterGroups = useMemo(() => [
  { label: 'Category', key: 'category', values: filterData.categories },
  { label: 'Year', key: 'year', values: filterData.years }
], [])
```

### Issue 2: Invalid Locale in formatPrice

**Error:** `en-EU` is not a valid locale for `Intl.NumberFormat`.

**Fix:** Changed to `de-DE` for EUR formatting:

```js
return new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0
}).format(price)
```

### Issue 3: Tailwind Group Hover Not Working

**Problem:** `group-hover:opacity-100` wasn't triggering on grid cards.

**Solution:** Switched to React state-based hover:

```jsx
const [isHovered, setIsHovered] = useState(false)

<div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  ...
  <div style={{ opacity: isHovered ? 1 : 0 }}>
```

### Issue 4: mix-blend-difference Not Working

**Problem:** Tried `mix-blend-difference` for text overlay but it didn't render.

**Cause:** Stacking context created by `perspective` and `transform` properties blocked blend mode.

**Solution:** Abandoned blend mode, used solid dark overlay instead (`rgba(0,0,0,0.7)`).

---

## Files Modified

| File | Changes |
|------|---------|
| `apps/web/src/data/prints.js` | Centralized pricing, PayPal links, printInfo; removed deprecated fields |
| `apps/web/src/routes/prints/PrintDetailOverlay.jsx` | Shipping region selector, dynamic pricing, hidden tags |
| `apps/web/src/routes/prints/index.jsx` | Removed Edition filter group |
| `apps/web/src/routes/Prints.jsx` | New route component |
| `packages/ui/src/molecules/PrintGridCard.jsx` | Hover overlay with title/price |
| `apps/web/src/routes/prints/PrintsLayout.jsx` | Deleted (consolidated) |

---

## Commits

1. `72b287d` - `refactor(prints): centralize pricing with PayPal integration and hover overlay`
2. `1d5ea7c` - `chore(prints): add reference data files and clean up routes`
3. `ed50e76` - `docs: update CDN manifest and add prints documentation`

---

## Testing & Verification

- Manual testing of print grid hover states
- Verified PayPal link changes with size/edition/region selection
- Confirmed price calculation (art + shipping = total)
- Tested filter functionality after removing Edition filter

---

## Next Steps

- Push commits to origin
- Test PayPal checkout flow end-to-end
- Consider adding "Sold out" states for editions
- Mobile testing for hover interactions (touch devices)

---

## Technical Decisions

1. **React state over CSS hover:** More reliable across nested components with transforms
2. **Solid overlay over gradient:** Cleaner, more intentional design
3. **Single source of truth:** All pricing/links in `prints.js` top-level exports for easy updates
4. **Removed ISK pricing:** Simplified to EUR-only for international sales
