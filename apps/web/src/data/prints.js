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

const prints = [
  {
    id: 'print-001',
    name: 'Abstract Composition I',
    slug: 'abstract-composition-i',
    description: 'A contemplative study of geometric forms and negative space. This piece explores the tension between order and chaos through carefully balanced shapes.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: '/img/prints/print-placeholder-01.jpg',
    images: [],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2'],
    tags: ['abstract', 'geometric', 'minimal'],
    featured: true,
    stripePaymentLink: null, // Add Stripe payment link when ready
    printOnDemandUrl: null   // Add POD link when ready
  },
  {
    id: 'print-002',
    name: 'Nordic Landscape',
    slug: 'nordic-landscape',
    description: 'Inspired by the stark beauty of Icelandic highlands. Limited edition giclée print on archival paper.',
    price: 120,
    priceISK: 17500,
    currency: 'EUR',
    image: '/img/prints/print-placeholder-02.jpg',
    images: [],
    category: 'Landscape',
    year: '2024',
    edition: 'limited-50',
    sizes: ['A3', 'A2'],
    tags: ['landscape', 'iceland', 'nature'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-003',
    name: 'Typography Study',
    slug: 'typography-study',
    description: 'An exploration of letterforms and visual rhythm. Perfect for design enthusiasts and typography lovers.',
    price: 65,
    priceISK: 9500,
    currency: 'EUR',
    image: '/img/prints/print-placeholder-03.jpg',
    images: [],
    category: 'Typography',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3'],
    tags: ['typography', 'design', 'black-white'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  }
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
  if (currency === 'ISK') {
    return `${price.toLocaleString('is-IS')} kr`
  }
  return `€${price}`
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
