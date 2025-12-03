# Data Configuration

## typefaceConfig.js

**Location:** `apps/web/src/data/foundry/typefaceConfig.js`

Single source of truth for all typeface data.

### Structure

```javascript
export const typefaceConfig = {
  malromur: {
    id: 'malromur',
    name: 'Málrómur',
    fontFamily: 'TGMalromur',
    fontUrl: '/fonts/TGMalromurItalicVF.ttf',
    fontStyle: 'italic',
    category: 'Variable Font',
    description: '...',

    styles: {
      hasWeight: true,
      hasWidth: false,
      hasItalic: true,
      defaultStyle: 'italic',
      weights: [
        { label: 'Light', weight: 200 },
        { label: 'Regular', weight: 400 },
        // ...
      ]
    }
  },
  // ... 6 more typefaces
}
```

### Helper Functions

```javascript
// Get specific typeface
const typeface = getTypefaceConfig('malromur')

// Get all IDs
const ids = getAllTypefaceIds()

// Get all typefaces
const all = getAllTypefaces()
```

## specimens.js

**Location:** `apps/web/src/data/foundry/specimens.js`

### Structure

```javascript
// Hubs (7 typefaces)
export const specimenHubs = [
  {
    id: 'malromur',
    name: 'TG Málrómur',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    subtitle: '11 Patterns',
    description: '...',
    link: '/specimen/malromur',
    category: 'Editorial',
    type: 'hub'
  },
  // ... 6 more hubs
]

// Individual specimens (20+)
export const allSpecimens = [
  {
    id: 'malromur-editorial',
    name: 'Editorial Layout',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    subtitle: 'Pattern 01',
    description: '...',
    link: '/specimen/malromur/editorial',
    category: 'Editorial',
    hub: 'malromur',
    type: 'specimen'
  },
  // ... more specimens
]

// Combined
export const allSpecimenData = [...specimenHubs, ...allSpecimens]
```

## Variable Font Capabilities

### Weight Only
```javascript
styles: {
  hasWeight: true,
  hasWidth: false,
  weights: [...]
}
```

### Weight + Width
```javascript
styles: {
  hasWeight: true,
  hasWidth: true,
  weights: [...],
  widths: [...]
}
```

### Static Font
```javascript
styles: {
  hasWeight: false,
  weights: [{ label: 'Regular', weight: 400 }]
}
```

## Adding New Typefaces

1. **Add to typefaceConfig.js:**
```javascript
newtypeface: {
  id: 'newtypeface',
  name: 'New Typeface',
  // ... configuration
}
```

2. **Create route file:**
```javascript
// apps/web/src/routes/foundry/typefaces/FoundryNewtypeface.jsx
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'
import TypefacePage from '../../../components/sections/foundry/TypefacePage'

export default function FoundryNewtypeface() {
  const typeface = getTypefaceConfig('newtypeface')
  return <TypefacePage typeface={typeface} />
}
```

3. **Add route in App.jsx**

Done! Page renders automatically from config.
