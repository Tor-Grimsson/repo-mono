# typefaceConfig.js

**Location:** `apps/web/src/data/foundry/typefaceConfig.js`

Single source of truth for all typeface data. All 7 typeface pages use this config.

## Structure

```javascript
export const typefaceConfig = {
  malromur: {
    // Identity
    id: 'malromur',
    name: 'Málrómur',
    displayName: 'Málrómur',
    fontFamily: 'TGMalromur',

    // Files
    fontUrl: '/fonts/TGMalromurItalicVF.ttf',
    fontStyle: 'italic',

    // Meta
    category: 'Variable Font',
    description: 'Contemporary italic variable font...',
    badgeText: 'Málrómur Aa',

    // Capabilities
    styles: {
      hasWeight: true,
      hasWidth: false,
      hasItalic: true,
      defaultStyle: 'italic',

      weights: [
        { label: 'Light', weight: 200 },
        { label: 'Regular', weight: 400 },
        { label: 'Medium', weight: 500 },
        { label: 'SemiBold', weight: 600 },
        { label: 'Bold', weight: 700 },
        { label: 'ExtraBold', weight: 800 }
      ]
    }
  },

  // ... 6 more typefaces
}
```

## Helper Functions

```javascript
// Get specific typeface
import { getTypefaceConfig } from './typefaceConfig'
const typeface = getTypefaceConfig('malromur')

// Get all typeface IDs
import { getAllTypefaceIds } from './typefaceConfig'
const ids = getAllTypefaceIds()  // ['malromur', 'rot', ...]

// Get all typefaces
import { getAllTypefaces } from './typefaceConfig'
const all = getAllTypefaces()    // [malromur config, rot config, ...]
```

## Font Capabilities

### Variable (Weight Only)
```javascript
styles: {
  hasWeight: true,
  hasWidth: false,
  hasItalic: false,  // or true for Málrómur
  weights: [...]
}
```

### Variable (Weight + Width)
```javascript
// Rót only
styles: {
  hasWeight: true,
  hasWidth: true,
  defaultStyle: 'weight',
  weights: [...],
  widths: [
    { label: 'Narrow', width: 75 },
    { label: 'Normal', width: 100 },
    { label: 'Wide', width: 125 }
  ]
}
```

### Static
```javascript
styles: {
  hasWeight: false,
  hasWidth: false,
  weights: [{ label: 'Regular', weight: 400 }]
}
```

## Adding New Typeface

1. **Add to config:**
```javascript
newtypeface: {
  id: 'newtypeface',
  name: 'New Typeface',
  displayName: 'New Typeface',
  fontFamily: 'TGNewTypeface',
  fontUrl: '/fonts/TGNewTypeface-Regular.otf',
  fontStyle: 'normal',
  category: 'Display Font',
  description: '...',
  badgeText: 'New Typeface Aa',
  styles: {
    hasWeight: false,
    hasWidth: false,
    hasItalic: false,
    weights: [{ label: 'Regular', weight: 400 }]
  }
}
```

2. **Create route file:**
```javascript
// routes/foundry/typefaces/FoundryNewtypeface.jsx
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'
import TypefacePage from '../../../components/sections/foundry/TypefacePage'

export default function FoundryNewtypeface() {
  const typeface = getTypefaceConfig('newtypeface')
  return <TypefacePage typeface={typeface} />
}
```

3. **Add route in App.jsx**

Done! Page renders automatically.
