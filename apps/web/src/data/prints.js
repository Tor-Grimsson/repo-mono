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
    name: 'Gul Blokk',
    slug: 'gul-blokk',
    description: 'Architectural study rendered with modular frames and adjustable floor plates, inspired by Reykjavik high-rises.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-gblokk/web/gul-blokk-800.jpg',
    images: [
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-gblokk/web/gul-blokk-800.jpg',
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-gblokk/web/gul-blokk-1200.jpg',
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-gblokk/web/gul-blokk-2000.jpg'
    ],
    category: 'Architectural',
    year: '2024',
    edition: 'limited-50',
    sizes: ['A2'],
    tags: ['architecture', 'minimal'],
    featured: true,
    stripePaymentLink: null, // Add Stripe payment link when ready
    printOnDemandUrl: null   // Add POD link when ready
  },
  {
    id: 'print-002',
    name: 'Biskup Skovia',
    slug: 'biskup-skovia',
    description: 'Offset print referencing vintage matchbooks, screen-printed on textured paper with registered emboss.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-skovia/web/print-skovia-800.jpg',
    images: [
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-skovia/web/print-skovia-800.jpg',
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-skovia/web/print-skovia-1200.jpg',
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-skovia/web/print-skovia-2000.jpg'
    ],
    category: 'Illustration',
    year: '2023',
    edition: 'open',
    sizes: ['A3'],
    tags: ['illustration', 'printmaking'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-003',
    name: '',
    slug: 'faust',
    description: 'Line study created from variable waveform experiments, plotted with archival ink.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-04.png',
    images: [
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-04.png',
      'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-04.jpg'
    ],
    category: 'Minimal',
    year: '2024',
    edition: 'open',
    sizes: ['A2'],
    tags: ['minimal', 'linework'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-004',
    name: '',
    slug: 'fjordvik',
    description: 'Generative composition inspired by Norwegian fjord markers, plotted with midnight ink on cotton rag.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-04.png',
    images: ['https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-04.png'],
    category: 'Generative',
    year: '2024',
    edition: 'limited-30',
    sizes: ['A2'],
    tags: ['generative', 'geometry'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-005',
    name: '',
    slug: 'grid-system-iv',
    description: 'Part of an ongoing series exploring modular grid systems. Mathematical precision meets organic variation.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-01.png',
    images: ['https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-01.png'],
    category: 'Abstract',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3'],
    tags: ['abstract', 'geometric', 'grid'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-006',
    name: '',
    slug: 'volcanic-study',
    description: 'Documenting the raw textures and forms of recent volcanic activity. A meditation on transformation.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-02.png',
    images: ['https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-02.png'],
    category: 'Landscape',
    year: '2024',
    edition: 'limited-30',
    sizes: ['A3', 'A2', 'A1'],
    tags: ['landscape', 'iceland', 'volcanic'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-007',
    name: '',
    slug: 'letterform-i',
    description: 'Deconstructed letterforms exploring the boundary between legibility and abstraction.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-04.png',
    images: ['https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-04.png'],
    category: 'Typography',
    year: '2023',
    edition: 'open',
    sizes: ['A4', 'A3'],
    tags: ['typography', 'abstract', 'minimal'],
    featured: false,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-008',
    name: '',
    slug: 'northern-light',
    description: 'Capturing the ephemeral dance of aurora borealis through abstract color fields.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-01.png',
    images: ['https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-01.png'],
    category: 'Abstract',
    year: '2024',
    edition: 'limited-15',
    sizes: ['A2', 'A1'],
    tags: ['abstract', 'color', 'aurora'],
    featured: true,
    stripePaymentLink: null,
    printOnDemandUrl: null
  },
  {
    id: 'print-009',
    name: '',
    slug: 'basalt-columns',
    description: 'Geometric patterns found in nature. Hexagonal basalt formations rendered in high contrast.',
    price: 85,
    priceISK: 12500,
    currency: 'EUR',
    image: 'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-02.png',
    images: ['https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-placeholders/print-one-02.png'],
    category: 'Landscape',
    year: '2024',
    edition: 'open',
    sizes: ['A4', 'A3', 'A2'],
    tags: ['landscape', 'geometric', 'nature'],
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
