# Foundry Architecture

## Structure

```
Foundry
├── /foundry/*          Product pages (typefaces, specs, licensing)
└── /specimen/*         Showcase pages (typography demos)
```

## Why Separate?

**Foundry** = What you can buy (product catalog)
**Specimens** = What you can create (design inspiration)

## Routes

### Foundry Pages
- `/foundry` - Overview with featured carousel
- `/foundry/typefaces` - Library with filters
- `/foundry/specimens` - Specimen index
- `/foundry/malromur` - Typeface detail page
- ...6 more typeface pages

### Specimen Pages
- `/specimen/malromur` - Málrómur hub
- `/specimen/malromur/selection` - 11 prose patterns
- `/specimen/malromur/editorial` - Editorial layout
- ...more specimens per typeface

## Data Flow

```
typefaceConfig.js
  → TypefacePage component
    → TypefaceHero
    → TypefaceStyleSection
    → VariableFontSection
    → FoundryCharacterSets
```

## Component Pattern

All 7 typeface pages share one component (`TypefacePage`). Configuration determines rendering:

```jsx
// Route file (minimal wrapper)
import { getTypefaceConfig } from '../../data/foundry/typefaceConfig'
import TypefacePage from '../../components/sections/foundry/TypefacePage'

export default function FoundryMalromur() {
  const typeface = getTypefaceConfig('malromur')
  return <TypefacePage typeface={typeface} />
}
```

## Key Files

**Data:**
- `apps/web/src/data/foundry/typefaceConfig.js`
- `apps/web/src/data/foundry/specimens.js`

**Pages:**
- `apps/web/src/routes/foundry/` - Foundry pages
- `apps/web/src/routes/specimens/` - Specimen pages

**Components:**
- `apps/web/src/components/sections/foundry/TypefacePage.jsx`
- `apps/web/src/components/sections/foundry/TypefaceHero.jsx`
- `apps/web/src/components/sections/foundry/TypefaceStyleSection.jsx`
