# Foundry Documentation

**Updated**: November 24, 2025

## Quick Reference

**Routes:**
- `/foundry` - Overview
- `/foundry/typefaces` - All typefaces
- `/foundry/specimens` - Specimen library
- `/foundry/{typeface}` - Typeface pages
- `/specimen/{typeface}` - Specimen hubs
- `/specimen/{typeface}/{pattern}` - Individual specimens

**Typefaces (7):**
Málrómur • Rót • Gullhamrar • Dylgjur • Orðspor • Silfurbarki • Tröllatunga

**Key Files:**
- `apps/web/src/data/foundry/typefaceConfig.js` - Typeface data
- `apps/web/src/data/foundry/specimens.js` - Specimen data
- `apps/web/src/components/sections/foundry/TypefacePage.jsx` - Typeface pages

## Documentation

### [01-overview/](01-overview/)
Architecture, navigation, data patterns

### [02-foundry-pages/](02-foundry-pages/)
Product pages (`/foundry/*`)

### [03-specimen-pages/](03-specimen-pages/)
Showcase pages (`/specimen/*`)

### [04-components/](04-components/)
Reusable components

### [05-data-configuration/](05-data-configuration/)
Config files and data structures

### [archive/](archive/)
Superseded documentation

## Key Concepts

**Foundry vs Specimens:**
- Foundry = product pages (specs, features)
- Specimens = showcase pages (designs, applications)

**Data-Driven:**
All typeface pages use `TypefacePage` component + `typefaceConfig.js`

**Adding Typefaces:**
1. Add to `typefaceConfig.js`
2. Create route file
3. Add route in `App.jsx`
