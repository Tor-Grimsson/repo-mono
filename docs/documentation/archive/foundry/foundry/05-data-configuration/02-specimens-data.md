# specimens.js

**Location:** `apps/web/src/data/foundry/specimens.js`

Data for specimen library and filtering.

## Structure

### specimenHubs (7)

```javascript
export const specimenHubs = [
  {
    id: 'malromur',
    name: 'TG Málrómur',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    subtitle: '11 Patterns',
    description: 'Editorial prose styles...',
    link: '/specimen/malromur',
    category: 'Editorial',
    type: 'hub'
  },
  // ... 6 more hubs
]
```

### allSpecimens (20+)

```javascript
export const allSpecimens = [
  {
    id: 'malromur-editorial',
    name: 'Editorial Layout',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    subtitle: 'Pattern 01',
    description: 'Magazine layout...',
    link: '/specimen/malromur/editorial',
    category: 'Editorial',
    hub: 'malromur',
    type: 'specimen'
  },
  // ... more specimens
]
```

### allSpecimenData

```javascript
export const allSpecimenData = [...specimenHubs, ...allSpecimens]
```

## Properties

**Required:**
- `id` - Unique identifier
- `name` - Display name
- `typeface` - Typeface name (for filtering)
- `link` - Route path
- `category` - Category for filtering
- `type` - 'hub' or 'specimen'

**Optional:**
- `fontFamily` - CSS font-family
- `fontStyle` - 'normal' or 'italic'
- `subtitle` - Pattern count or status
- `description` - Description text
- `hub` - Parent hub ID (specimens only)

## Categories

- Editorial
- Poetry
- Systems
- Layout
- Display
- Preview

## Usage

**FoundrySpecimens page:**
```javascript
import { specimenHubs, allSpecimens } from '../../data/foundry/specimens'

// Show hubs
<SpecimenGrid items={specimenHubs} />

// Show all specimens
<SpecimenGrid items={allSpecimens} />

// Filter by typeface
const filtered = allSpecimens.filter(s => s.typeface === 'TG Málrómur')
```

## Adding New Specimen

1. **Add to specimens.js:**
```javascript
{
  id: 'malromur-new-pattern',
  name: 'New Pattern',
  typeface: 'TG Málrómur',
  fontFamily: 'TGMalromur',
  fontStyle: 'italic',
  subtitle: 'Pattern 12',
  description: '...',
  link: '/specimen/malromur/new-pattern',
  category: 'Editorial',
  hub: 'malromur',
  type: 'specimen'
}
```

2. **Create component**
3. **Add route in App.jsx**

Specimen now appears in library and filters.
