/**
 * Print Store Data
 *
 * Centralized data for all prints available for purchase.
 * Each print includes pricing, fulfillment options, and metadata.
 *
 * Fields:
 * - id: Unique identifier
 * - name: Display name
 * - slug: URL slug for detail page
 * - description: Detailed description
 * - price: Base price in EUR
 * - priceISK: Optional price in Icelandic Króna
 * - currency: Primary currency (EUR)
 * - image: Primary image path
 * - images: Additional gallery images
 * - category: Product category for filtering
 * - year: Creation year
 * - edition: 'open' | 'limited-50' | 'limited-10' etc.
 * - sizes: Available print sizes
 * - tags: Searchable tags
 * - featured: Boolean for featured status
 * - stripePaymentLink: Stripe payment link (self-fulfilled)
 * - printOnDemandUrl: POD service link (e.g., Gelato)
 */

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints'

const prints = [
  {
    id: 'print-eth',
    name: 'Eth',
    slug: 'eth',
    description: 'Tröllatunga Eth "ð" type design.',
    price: 95,
    priceISK: 14000,
    currency: 'EUR',
    image: `${cdnBase}/print-eth/web/eth-master-800.jpg`,
    images: [
      `${cdnBase}/print-eth/web/eth-master-400.jpg`,
      `${cdnBase}/print-eth/web/eth-master-800.jpg`,
      `${cdnBase}/print-eth/web/eth-master-1200.jpg`,
      `${cdnBase}/print-eth/web/eth-master-2000.jpg`
    ],
    category: 'Digital',
    year: '2024',
    edition: 'limited-50',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['digital', 'geometric', 'minimal'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-midday',
    name: 'Midday',
    slug: 'midday',
    description: 'Midday print',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-midday/web/print-midday-800.jpg`,
    images: [
      `${cdnBase}/print-midday/web/print-midday-400.jpg`,
      `${cdnBase}/print-midday/web/print-midday-800.jpg`,
      `${cdnBase}/print-midday/web/print-midday-1200.jpg`,
      `${cdnBase}/print-midday/web/print-midday-2000.jpg`
    ],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['abstract', 'light', 'minimal'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-midnight',
    name: 'Midnight',
    slug: 'midnight',
    description: 'Midnight print.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-midnight/web/midnight-800.jpg`,
    images: [
      `${cdnBase}/print-midnight/web/midnight-400.jpg`,
      `${cdnBase}/print-midnight/web/midnight-800.jpg`,
      `${cdnBase}/print-midnight/web/midnight-1200.jpg`,
      `${cdnBase}/print-midnight/web/midnight-2000.jpg`
    ],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['abstract', 'dark', 'minimal'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-001',
    name: 'Blokk',
    slug: 'blokk',
    description: 'Gul Blokk poster.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-gblokk/web/gul-blokk-800.jpg`,
    images: [
      `${cdnBase}/print-gblokk/web/gul-blokk-400.jpg`,
      `${cdnBase}/print-gblokk/web/gul-blokk-800.jpg`,
      `${cdnBase}/print-gblokk/web/gul-blokk-1200.jpg`,
      `${cdnBase}/print-gblokk/web/gul-blokk-2000.jpg`
    ],
    category: 'Print',
    year: '2024',
    edition: 'limited-50',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['architecture', 'minimal'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-002',
    name: 'Skovia',
    slug: 'skovia',
    description: 'Skovia poster',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-skovia/web/print-skovia-800.jpg`,
    images: [
      `${cdnBase}/print-skovia/web/print-skovia-400.jpg`,
      `${cdnBase}/print-skovia/web/print-skovia-800.jpg`,
      `${cdnBase}/print-skovia/web/print-skovia-1200.jpg`,
      `${cdnBase}/print-skovia/web/print-skovia-2000.jpg`
    ],
    category: 'Illustration',
    year: '2023',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['illustration', 'printmaking'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-borg-01',
    name: 'Borg 01',
    slug: 'borg-01',
    description: 'Borg 01 poster. Description TBD.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-borg-01/web/print-borg-01-800.jpg`,
    images: [
      `${cdnBase}/print-borg-01/web/print-borg-01-400.jpg`,
      `${cdnBase}/print-borg-01/web/print-borg-01-800.jpg`,
      `${cdnBase}/print-borg-01/web/print-borg-01-1200.jpg`,
      `${cdnBase}/print-borg-01/web/print-borg-01-2000.jpg`
    ],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['abstract', 'geometric'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-faust',
    name: 'Faust',
    slug: 'faust',
    description: 'Faust poster. Description TBD.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-faust/web/print-faust-800.jpg`,
    images: [
      `${cdnBase}/print-faust/web/print-faust-400.jpg`,
      `${cdnBase}/print-faust/web/print-faust-800.jpg`,
      `${cdnBase}/print-faust/web/print-faust-1200.jpg`,
      `${cdnBase}/print-faust/web/print-faust-2000.jpg`
    ],
    category: 'Illustration',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['illustration', 'narrative'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-fvv',
    name: 'FVV',
    slug: 'fvv',
    description: 'FVV poster. Description TBD.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-fvv/web/print-fvv-800.jpg`,
    images: [
      `${cdnBase}/print-fvv/web/print-fvv-400.jpg`,
      `${cdnBase}/print-fvv/web/print-fvv-800.jpg`,
      `${cdnBase}/print-fvv/web/print-fvv-1200.jpg`,
      `${cdnBase}/print-fvv/web/print-fvv-2000.jpg`
    ],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['abstract', 'geometric'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-pattern',
    name: 'Pattern',
    slug: 'pattern',
    description: 'Pattern poster. Description TBD.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-pattern/web/print-pattern-alt-800.jpg`,
    images: [
      `${cdnBase}/print-pattern/web/print-pattern-alt-400.jpg`,
      `${cdnBase}/print-pattern/web/print-pattern-alt-800.jpg`,
      `${cdnBase}/print-pattern/web/print-pattern-alt-1200.jpg`,
      `${cdnBase}/print-pattern/web/print-pattern-alt-2000.jpg`
    ],
    category: 'Pattern',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['pattern', 'geometric'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-tangents',
    name: 'Tangents',
    slug: 'tangents',
    description: 'Tangents poster. Description TBD.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-tangents/web/print-tangents-800.jpg`,
    images: [
      `${cdnBase}/print-tangents/web/print-tangents-400.jpg`,
      `${cdnBase}/print-tangents/web/print-tangents-800.jpg`,
      `${cdnBase}/print-tangents/web/print-tangents-1200.jpg`,
      `${cdnBase}/print-tangents/web/print-tangents-2000.jpg`
    ],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['abstract', 'geometric', 'lines'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-timi-01',
    name: 'Tími 01',
    slug: 'timi-01',
    description: 'Tími 01 poster. Description TBD.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-timi-01/web/print-timi-01-800.jpg`,
    images: [
      `${cdnBase}/print-timi-01/web/print-timi-01-400.jpg`,
      `${cdnBase}/print-timi-01/web/print-timi-01-800.jpg`,
      `${cdnBase}/print-timi-01/web/print-timi-01-1200.jpg`,
      `${cdnBase}/print-timi-01/web/print-timi-01-2000.jpg`
    ],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['abstract', 'time', 'series'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-timi-02',
    name: 'Tími 02',
    slug: 'timi-02',
    description: 'Tími 02 poster. Description TBD.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: `${cdnBase}/print-timi-02/web/print-timi-02-800.jpg`,
    images: [
      `${cdnBase}/print-timi-02/web/print-timi-02-400.jpg`,
      `${cdnBase}/print-timi-02/web/print-timi-02-800.jpg`,
      `${cdnBase}/print-timi-02/web/print-timi-02-1200.jpg`,
      `${cdnBase}/print-timi-02/web/print-timi-02-2000.jpg`
    ],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2', 'A1'],
    tags: ['abstract', 'time', 'series'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
]

// Export all data
export { prints }

// Export structured data for filters
export const filterData = {
  categories: [...new Set(prints.map(p => p.category))].sort(),
  years: [...new Set(prints.map(p => p.year))].sort((a, b) => b - a),
  editions: [...new Set(prints.map(p => p.edition))].sort(),
  featured: prints.filter(p => p.featured)
}

// Helper to get print by slug
export const getPrintBySlug = (slug) => prints.find(p => p.slug === slug)

// Helper to format price
export const formatPrice = (price, currency = 'EUR') => {
  if (typeof price !== 'number') return ''
  try {
    return new Intl.NumberFormat(
      currency === 'ISK' ? 'is-IS' : 'en-US',
      {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
      }
    ).format(price)
  } catch {
    return currency === 'ISK' ? `${price} kr` : `${currency} ${price}`
  }
}

// Helper to format edition
export const formatEdition = (edition) => {
  if (edition === 'open') return 'Open Edition'
  if (edition.startsWith('limited-')) {
    const num = edition.replace('limited-', '')
    return `Limited Edition of ${num}`
  }
  return edition
}

export default prints
