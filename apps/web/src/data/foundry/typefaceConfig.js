/**
 * Typeface Configuration
 * Centralized data for all foundry typefaces
 *
 * Each typeface contains all the data needed to render its page sections
 */

const cdnBase = 'https://b2.kolkrabbi.io/website/asset-library/foundry'

export const typefaceConfig = {
  malromur: {
    id: 'malromur',
    name: 'Málrómur',
    displayName: 'Málrómur',
    fontFamily: 'TGMalromur',
    fontUrl: '/fonts/tg-foundry/TGMalromurItalicVF.ttf',
    fontUrlRoman: '/fonts/tg-foundry/TGMalromurRomanVF.ttf',
    fontUrlItalic: '/fonts/tg-foundry/TGMalromurItalicVF.ttf',
    fontStyle: 'italic',
    category: 'Variable Font',
    description: 'A contemporary italic variable font for editorial design',
    badgeText: 'Málrómur',
    specimenLink: '/foundry/specimen/malromur',

    photos: [
      `${cdnBase}/foundry-typefaces/01-malromur/typefaces-malromur/01-typefaces-hero/typefaces-hero-1200.jpg`,
      `${cdnBase}/foundry-typefaces/01-malromur/typefaces-malromur/02-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/01-malromur/typefaces-malromur/03-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/01-malromur/typefaces-malromur/04-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/01-malromur/typefaces-malromur/05-typefaces-image/typefaces-image-1200.jpg`
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
    fontUrl: '/fonts/tg-foundry/TGRotVF.ttf',
    fontStyle: 'normal',
    category: 'Variable Font',
    description: 'A precise geometric sans serif with variable weight and width axes',
    badgeText: 'Rót Aa',
    specimenLink: '/foundry/specimen/rot',

    photos: [
      `${cdnBase}/foundry-typefaces/02-raetur/typefaces-raetur/01-typefaces-hero/typefaces-hero-1200.jpg`,
      `${cdnBase}/foundry-typefaces/02-raetur/typefaces-raetur/02-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/02-raetur/typefaces-raetur/03-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/02-raetur/typefaces-raetur/04-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/02-raetur/typefaces-raetur/05-typefaces-image/typefaces-image-1200.jpg`
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
    fontUrl: '/fonts/tg-foundry/TGDylgjur.otf',
    fontStyle: 'normal',
    category: 'Display Font',
    description: 'Sharp angles and pointed character for critical discourse',
    badgeText: 'Dylgjur Aa',
    specimenLink: '/foundry/specimen/dylgjur',

    photos: [
      `${cdnBase}/foundry-typefaces/03-dylgjur/typefaces-dylgjur/01-typefaces-hero/typefaces-hero-1200.jpg`,
      `${cdnBase}/foundry-typefaces/03-dylgjur/typefaces-dylgjur/02-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/03-dylgjur/typefaces-dylgjur/03-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/03-dylgjur/typefaces-dylgjur/04-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/03-dylgjur/typefaces-dylgjur/05-typefaces-image/typefaces-image-1200.jpg`
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
    fontUrl: '/fonts/tg-foundry/TGGullhamrarVF.ttf',
    fontStyle: 'normal',
    category: 'Variable Font',
    description: 'Variable weight typeface with warm, graceful forms',
    badgeText: 'Gullhamrar Aa',
    specimenLink: '/foundry/specimen/gullhamrar',

    photos: [
      `${cdnBase}/foundry-typefaces/04-gullhamrar/typefaces-gullhamrar/01-typefaces-hero/typefaces-hero-1200.jpg`,
      `${cdnBase}/foundry-typefaces/04-gullhamrar/typefaces-gullhamrar/02-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/04-gullhamrar/typefaces-gullhamrar/03-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/04-gullhamrar/typefaces-gullhamrar/04-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/04-gullhamrar/typefaces-gullhamrar/05-typefaces-image/typefaces-image-1200.jpg`
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

  trollatunga: {
    id: 'trollatunga',
    name: 'Tröllatunga',
    displayName: 'Tröllatunga',
    fontFamily: 'TGTrollatunga',
    fontUrl: '/fonts/tg-foundry/TGTrollatunga.otf',
    fontStyle: 'normal',
    category: 'Display Font',
    description: 'Bold expressive display font for impactful messaging',
    badgeText: 'Tröllatunga Aa',
    specimenLink: '/foundry/specimen/trollatunga',

    photos: [
      `${cdnBase}/foundry-typefaces/05-trollatunga/typefaces-trollatunga/01-typefaces-hero/typefaces-hero-1200.jpg`,
      `${cdnBase}/foundry-typefaces/05-trollatunga/typefaces-trollatunga/02-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/05-trollatunga/typefaces-trollatunga/03-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/05-trollatunga/typefaces-trollatunga/04-typefaces-image/typefaces-image-1200.jpg`,
      `${cdnBase}/foundry-typefaces/05-trollatunga/typefaces-trollatunga/05-typefaces-image/typefaces-image-1200.jpg`
    ],

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
