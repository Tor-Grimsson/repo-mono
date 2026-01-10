/**
 * Print Store Data
 *
 * Centralized data for all prints available for purchase.
 * Pricing is defined in printPricing (by size/edition).
 * Payment links are in paypalLinks (by size/edition/region).
 *
 * Print fields:
 * - id: Unique identifier
 * - name: Display name
 * - slug: URL slug for detail page
 * - description: Detailed description
 * - image: Primary image path
 * - detailImages: Detail crop images
 * - images: Responsive image sizes
 * - category: Product category for filtering
 * - year: Creation year
 * - tags: Searchable tags
 * - featured: Boolean for featured status
 */

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints'

// PayPal payment links by size + edition + shipping region
export const paypalLinks = {
  'A3-open-eu': 'https://www.paypal.com/ncp/payment/78EW9SNGUMUTQ',
  'A3-open-intl': 'https://www.paypal.com/ncp/payment/FK7FX2CSLTZ8S',
  'A3-limited-eu': 'https://www.paypal.com/ncp/payment/L6VA34TEV3K9L',
  'A3-limited-intl': 'https://www.paypal.com/ncp/payment/CQYLQRG6375YA',
  'A2-limited-eu': 'https://www.paypal.com/ncp/payment/ZWHCDFVV6F67U',
  'A2-limited-intl': 'https://www.paypal.com/ncp/payment/DXXYNSP3KFHQJ',
  'A1-limited-eu': 'https://www.paypal.com/ncp/payment/PLBBB4TN2E5EA',
  'A1-limited-intl': 'https://www.paypal.com/ncp/payment/XJJ73CFEJG3K8'
}

// Pricing by size + edition (EUR) - art price + shipping
export const printPricing = {
  'A3-open': { art: 140, shippingEU: 20, shippingIntl: 32 },
  'A3-limited': { art: 220, shippingEU: 20, shippingIntl: 32 },
  'A2-limited': { art: 320, shippingEU: 35, shippingIntl: 55 },
  'A1-limited': { art: 650, shippingEU: 60, shippingIntl: 95 }
}

// Static content for print detail overlay
export const printInfo = {
  overview: {
    description: 'This is an unframed archival art print, produced using museum-grade materials and professional printing standards. Each print is made to order, carefully inspected, signed, and shipped with protective packaging.'
  },
  edition: {
    intro: 'Each print is part of a limited edition. Once an edition is sold out, it will not be produced again in any size.',
    counts: {
      'A3-limited': 30,
      'A2-limited': 20,
      'A1-limited': 8
    },
    artistProofs: 'Not for sale'
  },
  materials: {
    process: 'Archival Giclée (Pigment Ink)',
    papers: {
      'german-etching': 'Hahnemühle German Etching — 100% cotton rag, textured matte, 310gr',
      'baryta': 'Hahnemühle FineArt Baryta — fibre-based, semi-gloss, 325gr'
    },
    certificate: 'Signed with Certificate of Authenticity & embossed seal'
  },
  shipping: {
    intro: 'Prints ship in protective tubes within 5-10 business days. If you are based in Iceland, please reach out directly to arrange pickup or delivery and skip shipping charges.',
    vatNote: 'Artwork is VAT-exempt (Iceland).'
  }
}

const prints = [
  {
    id: 'trollatunga',
    name: 'Tröllatunga',
    slug: 'trollatunga',
    description: 'Tröllatunga Eth',
    image: `${cdnBase}/print-eth/web/eth-master-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-eth/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-eth/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-eth/web/eth-master-400.jpg`,
      `${cdnBase}/print-eth/web/eth-master-800.jpg`,
      `${cdnBase}/print-eth/web/eth-master-1200.jpg`,
      `${cdnBase}/print-eth/web/eth-master-2000.jpg`
    ],
    category: 'Typography',
    year: '2025',
    tags: ['digital', 'geometric', 'minimal'],
    featured: true
  },
  {
    id: 'midday',
    name: 'Midday',
    slug: 'midday',
    description: 'Midday print',
    image: `${cdnBase}/print-midday/web/print-midday-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-midday/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-midday/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-midday/web/print-midday-400.jpg`,
      `${cdnBase}/print-midday/web/print-midday-800.jpg`,
      `${cdnBase}/print-midday/web/print-midday-1200.jpg`,
      `${cdnBase}/print-midday/web/print-midday-2000.jpg`
    ],
    category: 'Abstract',
    year: '2014',
    tags: ['abstract', 'light', 'minimal'],
    featured: true
  },
  {
    id: 'midnight',
    name: 'Midnight',
    slug: 'midnight',
    description: 'Midnight print',
    image: `${cdnBase}/print-midnight/web/midnight-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-midnight/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-midnight/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-midnight/web/midnight-400.jpg`,
      `${cdnBase}/print-midnight/web/midnight-800.jpg`,
      `${cdnBase}/print-midnight/web/midnight-1200.jpg`,
      `${cdnBase}/print-midnight/web/midnight-2000.jpg`
    ],
    category: 'Abstract',
    year: '2014',
    tags: ['abstract', 'dark', 'minimal'],
    featured: true
  },
  {
    id: 'blokk',
    name: 'Blokk',
    slug: 'blokk',
    description: 'Blokk print',
    image: `${cdnBase}/print-gblokk/web/gul-blokk-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-gblokk/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-gblokk/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-gblokk/web/gul-blokk-400.jpg`,
      `${cdnBase}/print-gblokk/web/gul-blokk-800.jpg`,
      `${cdnBase}/print-gblokk/web/gul-blokk-1200.jpg`,
      `${cdnBase}/print-gblokk/web/gul-blokk-2000.jpg`
    ],
    category: 'Illustration',
    year: '2020',
    tags: ['architecture', 'minimal'],
    featured: true
  },
  {
    id: 'skovia',
    name: 'Skovia',
    slug: 'skovia',
    description: 'Skovia print',
    image: `${cdnBase}/print-skovia/web/print-skovia-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-skovia/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-skovia/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-skovia/web/print-skovia-400.jpg`,
      `${cdnBase}/print-skovia/web/print-skovia-800.jpg`,
      `${cdnBase}/print-skovia/web/print-skovia-1200.jpg`,
      `${cdnBase}/print-skovia/web/print-skovia-2000.jpg`
    ],
    category: 'Illustration',
    year: '2021',
    tags: ['illustration', 'printmaking'],
    featured: true
  },
  {
    id: 'borg',
    name: 'Borg',
    slug: 'borg',
    description: 'Borg print',
    image: `${cdnBase}/print-borg-01/web/print-borg-01-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-borg-01/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-borg-01/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-borg-01/web/print-borg-01-400.jpg`,
      `${cdnBase}/print-borg-01/web/print-borg-01-800.jpg`,
      `${cdnBase}/print-borg-01/web/print-borg-01-1200.jpg`,
      `${cdnBase}/print-borg-01/web/print-borg-01-2000.jpg`
    ],
    category: 'Abstract',
    year: '2021',
    tags: ['abstract', 'geometric'],
    featured: false
  },
  {
    id: 'faust',
    name: 'Faust',
    slug: 'faust',
    description: 'Faust print',
    image: `${cdnBase}/print-faust/web/print-faust-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-faust/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-faust/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-faust/web/print-faust-400.jpg`,
      `${cdnBase}/print-faust/web/print-faust-800.jpg`,
      `${cdnBase}/print-faust/web/print-faust-1200.jpg`,
      `${cdnBase}/print-faust/web/print-faust-2000.jpg`
    ],
    category: 'Geometric',
    year: '2016',
    tags: ['illustration', 'narrative'],
    featured: false
  },
  {
    id: 'fvv',
    name: 'FVV',
    slug: 'fvv',
    description: 'FVV print',
    image: `${cdnBase}/print-fvv/web/print-fvv-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-fvv/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-fvv/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-fvv/web/print-fvv-400.jpg`,
      `${cdnBase}/print-fvv/web/print-fvv-800.jpg`,
      `${cdnBase}/print-fvv/web/print-fvv-1200.jpg`,
      `${cdnBase}/print-fvv/web/print-fvv-2000.jpg`
    ],
    category: 'Abstract',
    year: '2012',
    tags: ['abstract', 'geometric'],
    featured: false
  },
  {
    id: 'weissensee',
    name: 'Weissensee',
    slug: 'weissensee',
    description: 'Prenzlauer Weissensee pattern',
    image: `${cdnBase}/print-pattern/web/print-pattern-alt-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-pattern/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-pattern/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-pattern/web/print-pattern-alt-400.jpg`,
      `${cdnBase}/print-pattern/web/print-pattern-alt-800.jpg`,
      `${cdnBase}/print-pattern/web/print-pattern-alt-1200.jpg`,
      `${cdnBase}/print-pattern/web/print-pattern-alt-2000.jpg`
    ],
    category: 'Pattern',
    year: '2014',
    tags: ['pattern', 'geometric'],
    featured: false
  },
  {
    id: 'tangents',
    name: 'Tangents',
    slug: 'tangents',
    description: 'Tangents print',
    image: `${cdnBase}/print-tangents/web/print-tangents-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-tangents/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-tangents/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-tangents/web/print-tangents-400.jpg`,
      `${cdnBase}/print-tangents/web/print-tangents-800.jpg`,
      `${cdnBase}/print-tangents/web/print-tangents-1200.jpg`,
      `${cdnBase}/print-tangents/web/print-tangents-2000.jpg`
    ],
    category: 'Geometric',
    year: '2021',
    tags: ['abstract', 'geometric', 'lines'],
    featured: false
  },
  {
    id: 'timi-01',
    name: 'Tími 01',
    slug: 'timi-01',
    description: 'Tími 01 print',
    image: `${cdnBase}/print-timi-01/web/print-timi-01-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-timi-01/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-timi-01/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-timi-01/web/print-timi-01-400.jpg`,
      `${cdnBase}/print-timi-01/web/print-timi-01-800.jpg`,
      `${cdnBase}/print-timi-01/web/print-timi-01-1200.jpg`,
      `${cdnBase}/print-timi-01/web/print-timi-01-2000.jpg`
    ],
    category: 'Time visualization',
    year: '2013',
    tags: ['abstract', 'time', 'series'],
    featured: false
  },
  {
    id: 'timi-02',
    name: 'Tími 02',
    slug: 'timi-02',
    description: 'Tími 02 print',
    image: `${cdnBase}/print-timi-02/web/print-timi-02-2000.jpg`,
    detailImages: [
      `${cdnBase}/print-timi-02/detail/thumbnail-01.jpg`,
      `${cdnBase}/print-timi-02/detail/thumbnail-02.jpg`
    ],
    images: [
      `${cdnBase}/print-timi-02/web/print-timi-02-400.jpg`,
      `${cdnBase}/print-timi-02/web/print-timi-02-800.jpg`,
      `${cdnBase}/print-timi-02/web/print-timi-02-1200.jpg`,
      `${cdnBase}/print-timi-02/web/print-timi-02-2000.jpg`
    ],
    category: 'Time visualization',
    year: '2013',
    tags: ['abstract', 'time', 'series'],
    featured: false
  },
]

// Export all data
export { prints }

// Export structured data for filters
export const filterData = {
  categories: [...new Set(prints.map(p => p.category))].sort(),
  years: [...new Set(prints.map(p => p.year))].sort((a, b) => b - a),
  featured: prints.filter(p => p.featured)
}

// Helper to get print by slug
export const getPrintBySlug = (slug) => prints.find(p => p.slug === slug)

// Helper to format price (EUR only)
export const formatPrice = (price) => {
  if (typeof price !== 'number') return ''
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(price)
}

export default prints
