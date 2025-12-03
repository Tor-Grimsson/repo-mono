# Navigation Structure

## URL Patterns

### Foundry (Product)
```
/foundry                    Overview
/foundry/typefaces          All typefaces
/foundry/specimens          Specimen library
/foundry/{typeface}         Typeface detail (7 pages)
/foundry/licensing          License info
```

### Specimens (Showcase)
```
/specimen/{typeface}                Hub page
/specimen/{typeface}/{pattern}      Individual specimen
```

## Navigation Flow

```
FoundryOverview
  ↓ Featured Carousel
  ↓ Navigation Cards
  ├→ All Typefaces (/foundry/typefaces)
  ├→ Specimens (/foundry/specimens)
  └→ Individual Typeface (/foundry/malromur)
      ↓
      └→ Specimen Hub (/specimen/malromur)
          ↓
          └→ Individual Specimen (/specimen/malromur/editorial)
```

## Typeface Pages (7)

1. Málrómur - `/foundry/malromur`
2. Rót - `/foundry/root`
3. Gullhamrar - `/foundry/gullhamrar`
4. Dylgjur - `/foundry/dylgjur`
5. Orðspor - `/foundry/ordspor`
6. Silfurbarki - `/foundry/silfurbarki`
7. Tröllatunga - `/foundry/trollatunga`

## Specimen Hubs (7)

1. Málrómur - `/specimen/malromur` (11 patterns)
2. Gullhamrar - `/specimen/gullhamrar` (poetry)
3. Dylgjur - `/specimen/dylgjur` (selection)
4. Silfurbarki - `/specimen/silfurbarki` (preview)
5. Rót - `/specimen/rot` (design systems)
6. Orðspor - `/specimen/ordspor` (layout)
7. Tröllatunga - (coming soon)

## Current Implementation

**Navbar dropdown:**
```
Foundry ▾
├── Overview → /foundry
├── All Typefaces → /foundry/typefaces
├── Specimens → /foundry/specimens
└── Licensing → /foundry/licensing
```

**Future expansion:**
- `/foundry/serif` - Serif collection index
- `/foundry/sans` - Sans collection index
- `/foundry/display` - Display collection index
