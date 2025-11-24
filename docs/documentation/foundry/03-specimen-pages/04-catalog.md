# Specimen Catalog

Complete list of all specimen routes organized by typeface.

## Málrómur (14 routes)

**Hub:** `/specimen/malromur`

**Routes:**
- `/specimen/malromur/selection` - All 11 patterns
- `/specimen/malromur/specs` - Technical specs
- `/specimen/malromur/editorial` - Pattern 01
- `/specimen/malromur/data-table` - Pattern 02
- `/specimen/malromur/menu` - Pattern 03
- `/specimen/malromur/newsletter` - Pattern 04
- `/specimen/malromur/index` - Pattern 05
- `/specimen/malromur/chapter` - Pattern 06
- `/specimen/malromur/toc` - Pattern 07
- `/specimen/malromur/title-page` - Pattern 08
- `/specimen/malromur/scientific` - Pattern 09
- `/specimen/malromur/legislative` - Pattern 10
- `/specimen/malromur/variable-axis` - Pattern 11

## Gullhamrar (2 routes)

**Hub:** `/specimen/gullhamrar`

**Routes:**
- `/specimen/gullhamrar/poetry` - Icelandic poetry
- `/specimen/gullhamrar/selection` - Curated selection (23 cards)

## Dylgjur (2 routes)

**Hub:** `/specimen/dylgjur`

**Routes:**
- `/specimen/dylgjur/selection` - Curated selection (23 cards)

## Silfurbarki (1 route)

**Hub:** `/specimen/silfurbarki`

**Routes:**
- `/specimen/silfurbarki/selection` - Preview specimen

## Rót (2 routes)

**Hub:** `/specimen/rot`

**Routes:**
- `/specimen/rot/design-systems` - Design system typography
- `/specimen/rot/selection` - Curated selection (14 sections)

## Orðspor (2 routes)

**Hub:** `/specimen/ordspor`

**Routes:**
- `/specimen/ordspor/layout/l-1` - Layout system 1 (8 cards)
- `/specimen/ordspor/layout/l-2` - Layout system 2

## Rest Specimens (8 routes)

**Mixed typeface demonstrations:**

- `/specimen/rest/complete-1-selection` - 4 pages
- `/specimen/rest/complete-2-selection` - 4 pages
- `/specimen/rest/complete-3-selection` - 5 pages
- `/specimen/rest/complete-4-selection` - 5 pages

## File Organization

```
apps/web/src/routes/specimens/
├── malromur/
│   ├── routes/          (Hub, Selection, Specs)
│   ├── comps/           (MalromurSpecimens)
│   └── cards/           (11 pattern cards)
├── gullhamrar/
│   └── cards/           (23 cards)
├── dylgjur/
│   └── cards/           (23 cards)
├── silfurbarki/
├── rot/
└── rest/
    └── cards/           (18 cards)
```

## Card-Based Specimens

**Large specimens use card architecture:**
- GullhamrarSelection (23 cards)
- DylgjurSelection (23 cards)
- RestComplete1Selection (4 cards)
- RestComplete2Selection (4 cards)
- RestComplete3Selection (5 cards)
- RestComplete4Selection (5 cards)

**Benefits:**
- Individual files (20-50 lines each)
- Easy to edit, reorder, remove
- Clear separation
- Better Git diffs
