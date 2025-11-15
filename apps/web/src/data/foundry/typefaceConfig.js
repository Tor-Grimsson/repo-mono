/**
 * Typeface Configuration
 * Centralized data for all foundry typefaces
 *
 * Each typeface contains all the data needed to render its page sections
 */

export const typefaceConfig = {
  malromur: {
    id: 'malromur',
    name: 'Málrómur',
    displayName: 'Málrómur',
    fontFamily: 'TGMalromur',
    fontUrl: '/fonts/TGMalromurItalicVF.ttf',
    fontStyle: 'italic',
    category: 'Variable Font',
    description: 'A contemporary italic variable font for editorial design',
    badgeText: 'Málrómur Aa',
    specimenLink: '/specimen/malromur',

    photos: [
      '/img/typefaces/malromur/set-a-01.png',
      '/img/typefaces/malromur/set-a-02.png',
      '/img/typefaces/malromur/set-a-04.png',
      '/img/typefaces/malromur/set-a-05.png',
      '/img/typefaces/malromur/set-a-06.png',
      '/img/typefaces/malromur/set-a-07.png'
    ],

    // Style section config
    styles: {
      hasWeight: true,
      hasWidth: false,
      hasItalic: true,
      defaultStyle: 'italic',
      weights: [
        { label: 'Thin', weight: 100 },
        { label: 'Extralight', weight: 200 },
        { label: 'Light', weight: 300 },
        { label: 'Regular', weight: 400 },
        { label: 'Medium', weight: 500 },
        { label: 'Semibold', weight: 600 },
        { label: 'Bold', weight: 700 },
        { label: 'Extrabold', weight: 800 }
      ]
    }
  },

  rot: {
    id: 'rot',
    name: 'Rót',
    displayName: 'Rót',
    fontFamily: 'TGRoot',
    fontUrl: '/fonts/TGRotVF.ttf',
    fontStyle: 'normal',
    category: 'Variable Font',
    description: 'A precise geometric sans serif with variable weight and width axes',
    badgeText: 'Rót Aa',
    specimenLink: '/specimen/rot',

    photos: [
      '/img/typefaces/rot/set-g-01.png',
      '/img/typefaces/rot/set-g-02.png',
      '/img/typefaces/rot/set-g-03.png',
      '/img/typefaces/rot/set-g-04.png',
      '/img/typefaces/rot/set-g-05.png',
      '/img/typefaces/rot/set-g-06.png',
      '/img/typefaces/rot/set-g-07.png',
      '/img/typefaces/rot/set-g-08.png',
      '/img/typefaces/rot/set-g-09.png'
    ],

    styles: {
      hasWeight: true,
      hasWidth: true,
      hasItalic: false,
      defaultStyle: 'weight',
      weights: [
        { label: 'Thin', weight: 100 },
        { label: 'Extralight', weight: 200 },
        { label: 'Light', weight: 300 },
        { label: 'Regular', weight: 400 },
        { label: 'Medium', weight: 500 },
        { label: 'Semibold', weight: 600 },
        { label: 'Bold', weight: 700 },
        { label: 'Extrabold', weight: 800 },
        { label: 'Black', weight: 900 }
      ],
      widths: [
        { label: 'Narrow', width: 100 },
        { label: 'Semi-Narrow', width: 175 },
        { label: 'Normal', width: 250 },
        { label: 'Semi-Extended', width: 325 },
        { label: 'Extended', width: 400 }
      ]
    }
  },

  dylgjur: {
    id: 'dylgjur',
    name: 'Dylgjur',
    displayName: 'Dylgjur',
    fontFamily: 'TGDylgjur',
    fontUrl: '/fonts/TGDylgjur-Regular.otf',
    fontStyle: 'normal',
    category: 'Display Font',
    description: 'Sharp angles and pointed character for critical discourse',
    badgeText: 'Dylgjur Aa',
    specimenLink: '/specimen/dylgjur',

    photos: [
      '/img/typefaces/dylgjur/set-b-01.png',
      '/img/typefaces/dylgjur/set-b-02.png',
      '/img/typefaces/dylgjur/set-b-03.png',
      '/img/typefaces/dylgjur/set-b-04.png'
    ],

    styles: {
      hasWeight: false,
      hasWidth: false,
      hasItalic: false,
      weights: [
        { label: 'Regular', weight: 400 }
      ]
    }
  },

  gullhamrar: {
    id: 'gullhamrar',
    name: 'Gullhamrar',
    displayName: 'Gullhamrar',
    fontFamily: 'TGGullhamrar',
    fontUrl: '/fonts/TGGullhamrarVF.ttf',
    fontStyle: 'normal',
    category: 'Variable Font',
    description: 'Variable weight typeface with warm, graceful forms',
    badgeText: 'Gullhamrar Aa',
    specimenLink: '/specimen/gullhamrar',

    photos: [
      '/img/typefaces/gullhamrar/set-f-01.png',
      '/img/typefaces/gullhamrar/set-f-02.png',
      '/img/typefaces/gullhamrar/set-f-03.png',
      '/img/typefaces/gullhamrar/set-f-04.png',
      '/img/typefaces/gullhamrar/set-f-05.png',
      '/img/typefaces/gullhamrar/set-f-06.png',
      '/img/typefaces/gullhamrar/set-f-07.png',
      '/img/typefaces/gullhamrar/set-f-08.png'
    ],

    styles: {
      hasWeight: true,
      hasWidth: false,
      hasItalic: false,
      weights: [
        { label: 'Thin', weight: 100 },
        { label: 'Extralight', weight: 200 },
        { label: 'Light', weight: 300 },
        { label: 'Regular', weight: 400 },
        { label: 'Medium', weight: 500 },
        { label: 'Semibold', weight: 600 },
        { label: 'Bold', weight: 700 },
        { label: 'Extrabold', weight: 800 }
      ]
    }
  },

  ordspor: {
    id: 'ordspor',
    name: 'Orðspor',
    displayName: 'Orðspor',
    fontFamily: 'TGOrdspor',
    fontUrl: '/fonts/TGOrdsporVF.ttf',
    fontStyle: 'normal',
    category: 'Variable Font',
    description: 'Variable typeface tracing linguistic roots and etymology',
    badgeText: 'Orðspor Aa',
    specimenLink: '/specimen/ordspor',

    styles: {
      hasWeight: true,
      hasWidth: false,
      hasItalic: false,
      weights: [
        { label: 'Thin', weight: 100 },
        { label: 'Extralight', weight: 200 },
        { label: 'Light', weight: 300 },
        { label: 'Regular', weight: 400 },
        { label: 'Medium', weight: 500 },
        { label: 'Semibold', weight: 600 },
        { label: 'Bold', weight: 700 },
        { label: 'Extrabold', weight: 800 }
      ]
    }
  },

  silfurbarki: {
    id: 'silfurbarki',
    name: 'Silfurbarki',
    displayName: 'Silfurbarki',
    fontFamily: 'TGSilfurbarki',
    fontUrl: '/fonts/TGSilfurbarki-Regular.otf',
    fontStyle: 'normal',
    category: 'Display Font',
    description: 'Elegant display typeface inspired by birch bark textures',
    badgeText: 'Silfurbarki Aa',
    specimenLink: '/specimen/silfurbarki',

    photos: [
      '/img/typefaces/silfurbarki/set-d-01.png',
      '/img/typefaces/silfurbarki/set-d-02.png',
      '/img/typefaces/silfurbarki/set-d-03.png',
      '/img/typefaces/silfurbarki/set-d-04.png'
    ],

    styles: {
      hasWeight: false,
      hasWidth: false,
      hasItalic: false,
      weights: [
        { label: 'Regular', weight: 400 }
      ]
    }
  },

  trollatunga: {
    id: 'trollatunga',
    name: 'Tröllatunga',
    displayName: 'Tröllatunga',
    fontFamily: 'TGTrollatunga',
    fontUrl: '/fonts/TGTrollatunga-Regular.otf',
    fontStyle: 'normal',
    category: 'Display Font',
    description: 'Bold expressive display font for impactful messaging',
    badgeText: 'Tröllatunga Aa',
    specimenLink: '/specimen/trollatunga',

    styles: {
      hasWeight: false,
      hasWidth: false,
      hasItalic: false,
      weights: [
        { label: 'Regular', weight: 400 }
      ]
    }
  }
}

/**
 * Helper to get typeface config by ID
 * @param {string} id - Typeface ID (malromur, rot, dylgjur, etc.)
 * @returns {object} Typeface configuration object
 */
export function getTypefaceConfig(id) {
  const config = typefaceConfig[id]
  if (!config) {
    console.warn(`Typeface config not found for: ${id}`)
    return typefaceConfig.malromur // fallback
  }
  return config
}

/**
 * Get all typeface IDs
 * @returns {string[]} Array of typeface IDs
 */
export function getAllTypefaceIds() {
  return Object.keys(typefaceConfig)
}

/**
 * Get all typefaces
 * @returns {object[]} Array of typeface configuration objects
 */
export function getAllTypefaces() {
  return Object.values(typefaceConfig)
}
