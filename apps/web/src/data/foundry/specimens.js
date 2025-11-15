/**
 * Comprehensive specimen data for all typefaces
 * Includes both specimen hubs and individual specimen pages
 */

// Specimen Hubs (typeface collection landing pages)
export const specimenHubs = [
  {
    id: 'malromur-hub',
    name: 'Málrómur Specimens',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    subtitle: '15 Patterns',
    description: 'Fifteen typographic patterns: prose styles for editorial contexts and complete typeface specimens',
    link: '/specimen/malromur',
    category: 'Editorial',
    type: 'hub'
  },
  {
    id: 'gullhamrar-hub',
    name: 'Gullhamrar Specimens',
    typeface: 'TG Gullhamrar',
    fontFamily: 'TGGullhamrar',
    subtitle: '1 Pattern',
    description: 'Icelandic poetry demonstrating the expressive qualities of the typeface',
    link: '/specimen/gullhamrar',
    category: 'Poetry',
    type: 'hub'
  },
  {
    id: 'dylgjur-hub',
    name: 'Dylgjur Specimens',
    typeface: 'TG Dylgjur',
    fontFamily: 'TGDylgjur',
    subtitle: '1 Pattern',
    description: 'Complete typeface specimen showcasing character set and editorial applications',
    link: '/specimen/dylgjur',
    category: 'Editorial',
    type: 'hub'
  },
  {
    id: 'silfurbarki-hub',
    name: 'Silfurbarki Specimens',
    typeface: 'TG Silfurbarki',
    fontFamily: 'TGSilfurbarki',
    subtitle: '1 Pattern',
    description: 'Early preview of an elegant serif typeface currently in development',
    link: '/specimen/silfurbarki',
    category: 'Preview',
    type: 'hub'
  },
  {
    id: 'rot-hub',
    name: 'Rót Specimens',
    typeface: 'TG Rót',
    fontFamily: 'TGRoot',
    subtitle: '2 Patterns',
    description: 'Design system typography demonstrating variable font capabilities',
    link: '/specimen/rot',
    category: 'Systems',
    type: 'hub'
  },
  {
    id: 'ordspor-hub',
    name: 'Orðspor Specimens',
    typeface: 'TG Orðspor',
    fontFamily: 'TGOrdspor',
    subtitle: 'Coming Soon',
    description: 'Variable weight sans serif for impactful statements—typeface and specimens in development',
    link: '/specimen/ordspor',
    category: 'Preview',
    type: 'hub'
  },
  {
    id: 'trollatunga-hub',
    name: 'Tröllatunga Specimens',
    typeface: 'TG Tröllatunga',
    fontFamily: 'TGTrollatunga',
    subtitle: 'Coming Soon',
    description: 'Display typeface with expressive character—specimen patterns in development',
    link: '/specimen/trollatunga',
    category: 'Display',
    type: 'hub'
  }
]

// Individual Specimen Pages (all patterns across all typefaces)
export const allSpecimens = [
  // Málrómur specimens
  {
    id: 'malromur-selection',
    name: 'Complete Selection',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    description: 'All eleven prose style patterns in a single continuous specimen',
    link: '/specimen/malromur/selection',
    category: 'Editorial',
    hub: 'malromur-hub',
    type: 'specimen'
  },
  {
    id: 'malromur-editorial',
    name: 'Editorial',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    description: 'Classic editorial layout with columns and running text',
    link: '/specimen/malromur/prose',
    category: 'Editorial',
    hub: 'malromur-hub',
    type: 'specimen'
  },
  {
    id: 'malromur-specs',
    name: 'Style Specifications',
    typeface: 'TG Málrómur',
    fontFamily: 'TGMalromur',
    fontStyle: 'italic',
    description: 'Technical specifications and typographic details',
    link: '/specimen/malromur/specs',
    category: 'Editorial',
    hub: 'malromur-hub',
    type: 'specimen'
  },

  // Gullhamrar specimens
  {
    id: 'gullhamrar-poetry',
    name: 'Icelandic Poetry',
    typeface: 'TG Gullhamrar',
    fontFamily: 'TGGullhamrar',
    description: 'Icelandic poetry demonstrating expressive qualities',
    link: '/specimen/gullhamrar/poetry',
    category: 'Poetry',
    hub: 'gullhamrar-hub',
    type: 'specimen'
  },
  {
    id: 'gullhamrar-selection',
    name: 'Complete Selection',
    typeface: 'TG Gullhamrar',
    fontFamily: 'TGGullhamrar',
    description: 'Full character set and specimen showcase',
    link: '/specimen/gullhamrar/selection',
    category: 'Poetry',
    hub: 'gullhamrar-hub',
    type: 'specimen'
  },

  // Dylgjur specimens
  {
    id: 'dylgjur-selection',
    name: 'Complete Selection',
    typeface: 'TG Dylgjur',
    fontFamily: 'TGDylgjur',
    description: 'Complete typeface specimen with character set',
    link: '/specimen/dylgjur/selection',
    category: 'Editorial',
    hub: 'dylgjur-hub',
    type: 'specimen'
  },

  // Silfurbarki specimens
  {
    id: 'silfurbarki-selection',
    name: 'Complete Selection',
    typeface: 'TG Silfurbarki',
    fontFamily: 'TGSilfurbarki',
    description: 'Preview specimen of elegant serif typeface',
    link: '/specimen/silfurbarki/selection',
    category: 'Preview',
    hub: 'silfurbarki-hub',
    type: 'specimen'
  },

  // Rót specimens
  {
    id: 'rot-complete',
    name: 'Complete Specimen',
    typeface: 'TG Rót',
    fontFamily: 'TGRoot',
    description: 'Full typeface specimen with all weights and styles',
    link: '/specimen/rot/complete',
    category: 'Systems',
    hub: 'rot-hub',
    type: 'specimen'
  },
  {
    id: 'rot-design-system',
    name: 'Design System Typography',
    typeface: 'TG Rót',
    fontFamily: 'TGRoot',
    description: 'Design system typography with variable font capabilities',
    link: '/specimen/rot/design-system',
    category: 'Systems',
    hub: 'rot-hub',
    type: 'specimen'
  },

  // Orðspor specimens
  {
    id: 'ordspor-layout-l1',
    name: 'Layout Grid System L1',
    typeface: 'TG Orðspor',
    fontFamily: 'TGOrdspor',
    description: '12-column grid system with multiple layout patterns',
    link: '/specimen/ordspor/layout/l-1',
    category: 'Layout',
    hub: 'ordspor-hub',
    type: 'specimen'
  },
  {
    id: 'ordspor-layout-l2',
    name: 'Layout Grid System L2',
    typeface: 'TG Orðspor',
    fontFamily: 'TGOrdspor',
    description: 'Advanced grid layouts and editorial patterns',
    link: '/specimen/ordspor/layout/l-2',
    category: 'Layout',
    hub: 'ordspor-hub',
    type: 'specimen'
  }
]

// Combined export for filtering
export const allSpecimenData = [...specimenHubs, ...allSpecimens]
