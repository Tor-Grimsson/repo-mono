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
    name: 'ETH Master',
    slug: 'eth-master',
    description: 'Ethereum-inspired geometric artwork. A study in digital minimalism and blockchain aesthetics.',
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
    description: 'Midday light study. Capturing the intensity of noon sun through abstract forms.',
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
    description: 'Midnight study. The counterpart to Midday, exploring darkness and negative space.',
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
    name: 'Gul Blokk',
    slug: 'gul-blokk',
    description: 'Gul Blokk poster. Description TBD.',
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
    category: 'Architectural',
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
    name: 'Biskup Skovia',
    slug: 'biskup-skovia',
    description: 'Biskup Skovia poster. Description TBD.',
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
