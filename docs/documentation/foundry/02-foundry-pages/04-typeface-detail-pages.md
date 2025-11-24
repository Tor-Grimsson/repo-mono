# Typeface Detail Pages

**Routes:** `/foundry/{typeface}` (7 pages)
**Component:** `apps/web/src/components/sections/foundry/TypefacePage.jsx`

## Pages

1. `/foundry/malromur` - Málrómur
2. `/foundry/root` - Rót
3. `/foundry/gullhamrar` - Gullhamrar
4. `/foundry/dylgjur` - Dylgjur
5. `/foundry/ordspor` - Orðspor
6. `/foundry/silfurbarki` - Silfurbarki
7. `/foundry/trollatunga` - Tröllatunga

## Shared Structure

All pages use `TypefacePage` component + `typefaceConfig.js`. Layout identical, content differs based on config.

### Sections

1. **TypefaceHero** - Name, category, description
2. **Images** - Showcase images
3. **TypefaceStyleSection** - Weight/width previews
4. **FontPreviewSection** - Interactive previews
5. **VariableFontSection** - Variable font demo (if applicable)
6. **GlyphMetricsGrid** - Font metrics inspector
7. **FoundryCharacterSets** - Character set display
8. **FoundryOpentypeFeatures** - OpenType features
9. **FoundryTypefaceDetails** - Technical details
10. **LicenseSection** - License info
11. **FoundryTypefacePairing** - Pairing suggestions
12. **FoundryOtherTypefaces** - More typefaces

## Route Files

Minimal wrappers:

```javascript
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'
import TypefacePage from '../../../components/sections/foundry/TypefacePage'

export default function FoundryMalromur() {
  const typeface = getTypefaceConfig('malromur')
  return <TypefacePage typeface={typeface} />
}
```

## Conditional Rendering

- **VariableFontSection**: Only if hasWeight or hasWidth
- **Italic Toggle**: Only if hasItalic
- **Weight/Width Dropdown**: Only for Rót (hasWeight && hasWidth)

## Adding New Typeface Page

1. Add config to `typefaceConfig.js`
2. Create route file (copy template above)
3. Add route in `App.jsx`

Page renders automatically.
