/**
 * Logomark Collection Data
 *
 * Centralized data for all logomarks in the collection.
 * Each logomark maps to an SVG file in /packages/ui/src/atoms/logos/svg/
 * Source of truth: CDN logomarks.json
 *
 * Fields:
 * - logoName: SVG filename (without extension), matches CDN naming
 * - name: Display name
 * - type: Logo type (Logomark, Wordmark)
 * - year: Creation year
 * - category: Project category for filtering
 * - tags: Array of searchable tags
 * - featured: Boolean for featured status
 * - svgUrl: CDN URL for the SVG file
 */

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-logomarks/logomarks-svg'

const logomarks = [
  {
    logoName: 'logo-kolkrabbi',
    name: 'Kolkrabbi',
    type: 'Logomark',
    year: '2025',
    category: 'Design Studio',
    tags: ['brand-identity', 'logo', 'design-studio'],
    featured: false,
    svgUrl: `${cdnBase}/logo-kolkrabbi.svg`
  },
  {
    logoName: 'logo-biskup',
    name: 'Biskup',
    type: 'Logomark',
    year: '2024',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'tech', 'minimalist', 'geometric'],
    featured: false,
    svgUrl: `${cdnBase}/logo-biskup.svg`
  },
  {
    logoName: 'logo-canalix',
    name: 'Canalix',
    type: 'Logomark',
    year: '2023',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'tech-company', 'flow'],
    featured: true,
    svgUrl: `${cdnBase}/logo-canalix.svg`
  },
  {
    logoName: 'logo-flik',
    name: 'Flík',
    type: 'Logomark',
    year: '2024',
    category: 'Technology',
    tags: ['logomark', 'startup', 'nordic'],
    featured: true,
    svgUrl: `${cdnBase}/logo-flik.svg`
  },
  {
    logoName: 'logo-greind',
    name: 'Greind',
    type: 'Wordmark',
    year: '2023',
    category: 'Services',
    tags: ['wordmark', 'custom-type', 'typography'],
    featured: false,
    svgUrl: `${cdnBase}/logo-greind.svg`
  },
  {
    logoName: 'logo-kaffistofan',
    name: 'Kaffistofan',
    type: 'Logomark',
    year: '2024',
    category: 'Services',
    tags: ['wordmark', 'roastery', 'coffee'],
    featured: true,
    svgUrl: `${cdnBase}/logo-kaffistofan.svg`
  },
  {
    logoName: 'logo-exmon',
    name: 'Exmon',
    type: 'Logomark',
    year: '2024',
    category: 'Technology',
    tags: ['brand-identity', 'analytics', 'data', 'tech'],
    featured: true,
    svgUrl: `${cdnBase}/logo-exmon.svg`
  },
  {
    logoName: 'logo-casedoc',
    name: 'Casedocs',
    type: 'Logomark',
    year: '2022',
    category: 'Technology',
    tags: ['brand-identity', 'legal', 'trust'],
    featured: false,
    svgUrl: `${cdnBase}/logo-casedoc.svg`
  },
  {
    logoName: 'logo-servado',
    name: 'Servado',
    type: 'Logomark',
    year: '2021',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'service'],
    featured: false,
    svgUrl: `${cdnBase}/logo-servado.svg`
  },
  {
    logoName: 'logo-snjallingur',
    name: 'Snjallingur',
    type: 'Logomark',
    year: '2022',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'smart-home'],
    featured: false,
    svgUrl: `${cdnBase}/logo-snjallingur.svg`
  },
  {
    logoName: 'logo-konsulat',
    name: 'Konsulat',
    type: 'Wordmark',
    year: '2019',
    category: 'Music',
    tags: ['brand-identity', 'wordmark', 'music'],
    featured: false,
    svgUrl: `${cdnBase}/logo-konsulat.svg`
  },
  {
    logoName: 'logo-mbsk',
    name: 'MBSK — Miðbæjarskák',
    type: 'Logomark',
    year: '2021',
    category: 'Services',
    tags: ['lettermark', 'chess', 'typography', 'logomark'],
    featured: false,
    svgUrl: `${cdnBase}/logo-mbsk.svg`
  },
  {
    logoName: 'logo-mobe',
    name: 'Mobe',
    type: 'Logomark',
    year: '2019',
    category: 'Technology',
    tags: ['brand-identity', 'tech', 'dynamic'],
    featured: false,
    svgUrl: `${cdnBase}/logo-mobe.svg`
  },
  {
    logoName: 'logo-microgroove',
    name: 'Microgroove',
    type: 'Logomark',
    year: '2018',
    category: 'Event',
    tags: ['brand-identity', 'audio', 'music', 'event'],
    featured: false,
    svgUrl: `${cdnBase}/logo-microgroove.svg`
  },
  {
    logoName: 'logo-hidash',
    name: 'Hidash',
    type: 'Logomark',
    year: '2020',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'luxury'],
    featured: false,
    svgUrl: `${cdnBase}/logo-hidash.svg`
  },
  {
    logoName: 'logo-black-house',
    name: 'Black House',
    type: 'Logomark',
    year: '2021',
    category: 'Publishing',
    tags: ['brand-identity', 'logo', 'hospitality', 'modern'],
    featured: false,
    svgUrl: `${cdnBase}/logo-black-house.svg`
  },
  {
    logoName: 'logo-likhamur',
    name: 'Líkhamur',
    type: 'Wordmark',
    year: '2018',
    category: 'Publishing',
    tags: ['book', 'logo', 'publishing'],
    featured: false,
    svgUrl: `${cdnBase}/logo-likhamur.svg`
  },
  {
    logoName: 'logo-bf',
    name: 'Blindra',
    type: 'Logomark',
    year: '2018',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'composition'],
    featured: false,
    svgUrl: `${cdnBase}/logo-bf.svg`
  },
  {
    logoName: 'logo-foto',
    name: 'Foto',
    type: 'Logomark',
    year: '2022',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'symbol', 'photography'],
    featured: false,
    svgUrl: `${cdnBase}/logo-foto.svg`
  },
  {
    logoName: 'logo-type-1',
    name: 'Type 1',
    type: 'Logomark',
    year: '2024',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'minimal'],
    featured: false,
    svgUrl: `${cdnBase}/logo-type-1.svg`
  },
  {
    logoName: 'logo-type-2',
    name: 'Type 2',
    type: 'Logomark',
    year: '2024',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'minimal'],
    featured: false,
    svgUrl: `${cdnBase}/logo-type-2.svg`
  },
  {
    logoName: 'logo-type-3',
    name: 'Type 3',
    type: 'Logomark',
    year: '2023',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'minimal'],
    featured: false,
    svgUrl: `${cdnBase}/logo-type-3.svg`
  },
  {
    logoName: 'logo-type-4',
    name: 'Type 4',
    type: 'Logomark',
    year: '2023',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'minimal'],
    featured: false,
    svgUrl: `${cdnBase}/logo-type-4.svg`
  },
  {
    logoName: 'logo-type-5',
    name: 'Type 5',
    type: 'Logomark',
    year: '2023',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'minimal'],
    featured: false,
    svgUrl: `${cdnBase}/logo-type-5.svg`
  }
]

// Export all data for easy importing
export { logomarks }

// Also export structured data for filters
export const filterData = {
  types: [...new Set(logomarks.map(l => l.type))].sort(),
  years: [...new Set(logomarks.map(l => l.year))].sort((a, b) => b - a),
  categories: [...new Set(logomarks.map(l => l.category))].sort(),
  featured: logomarks.filter(l => l.featured)
}

export default logomarks

/**
 * Client projects displayed in the Logomarks collection page
 */
export const projects = [
  {
    title: 'FLÍK',
    category: 'Micro Roastery',
    type: 'Visual Identity',
    year: '2024'
  },
  {
    title: 'Kaffistofan',
    category: 'Micro Roastery',
    type: 'Visual Identity',
    year: '2024'
  },
  {
    title: 'Kolkrabbi',
    category: 'Micro Roastery',
    type: 'Visual Identity',
    year: '2024'
  },
  {
    title: 'Canalix',
    category: 'Tech Startup',
    type: 'Brand Identity',
    year: '2024'
  },
  {
    title: 'Exmon',
    category: 'Analytics Platform',
    type: 'Product Branding',
    year: '2024'
  },
  {
    title: 'Logo Folio',
    category: 'Design Collection',
    type: 'Identity System',
    year: '2024'
  },
  {
    title: 'Logo Folio 2',
    category: 'Design Collection',
    type: 'Identity System',
    year: '2024'
  }
]

/**
 * Collection categories displayed in the Logomarks collection page
 */
export const logomarkCollections = [
  {
    title: 'Logomarks',
    count: '24',
    items: ['Logomarks', 'Illustration']
  },
  {
    title: 'Wordmarks',
    count: '18',
    items: ['Typography', 'Lettermarks']
  },
  {
    title: 'Abstract',
    count: '31',
    items: ['Abstract Forms', 'Geometry']
  },
  {
    title: 'Symbols',
    count: '42',
    items: ['Icons', 'Pictorial Marks']
  }
]
