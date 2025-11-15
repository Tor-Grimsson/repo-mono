/**
 * Logomark Collection Data
 *
 * Centralized data for all logomarks in the collection.
 * Each logomark maps to an SVG file in /packages/ui/src/atoms/logos/svg/
 *
 * Fields:
 * - logoName: SVG filename (without extension)
 * - name: Display name
 * - type: Logo type (Brand Mark, Wordmark, Lettermark, Symbol, etc.)
 * - year: Creation year
 * - category: Project category for filtering
 * - tags: Array of searchable tags
 * - featured: Boolean for featured status
 */

const logomarks = [
  {
    logoName: 'kolkrabbi',
    name: 'Kolkrabbi',
    type: 'Logomark',
    year: '2024',
    category: 'Food & Beverage',
    tags: ['brand-identity', 'logo', 'roastery', 'custom-type', 'seagull'],
    featured: false
  },
  {
    logoName: 'biskup',
    name: 'Biskup',
    type: 'Logomark',
    year: '2024',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'tech', 'minimalist', 'geometric'],
    featured: false
  },
  {
    logoName: 'canalix',
    name: 'Canalix',
    type: 'Logomark',
    year: '2023',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'tech-startup', 'canal', 'flow'],
    featured: true
  },
  {
    logoName: 'flik',
    name: 'Flík',
    type: 'Logomark',
    year: '2024',
    category: 'Food & Beverage',
    tags: ['wordmark', 'roastery', 'coffee', 'typography', 'nordic'],
    featured: true
  },
  {
    logoName: 'greind',
    name: 'Greind',
    type: 'Wordmark',
    year: '2023',
    category: 'Custom Type',
    tags: ['lettermark', 'custom-type', 'typography', 'logo'],
    featured: false
  },
  {
    logoName: 'kaffistofan',
    name: 'Kaffistofan',
    type: 'Logomark',
    year: '2024',
    category: 'Food & Beverage',
    tags: ['wordmark', 'roastery', 'coffee', 'nordic', 'traditional'],
    featured: true
  },
  {
    logoName: 'exmon',
    name: 'Exmon',
    type: 'Logomark',
    year: '2024',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'analytics', 'data', 'tech'],
    featured: true
  },
  {
    logoName: 'casedoc',
    name: 'Casedocs',
    type: 'Logomark',
    year: '2022',
    category: 'Professional Services',
    tags: ['brand-identity', 'logo', 'legal', 'professional', 'trust'],
    featured: false
  },
  {
    logoName: 'servado',
    name: 'Servado',
    type: 'Logomark',
    year: '2024',
    category: 'Professional Services',
    tags: ['brand-identity', 'logo', 'service', 'professional', 'clean'],
    featured: false
  },
  {
    logoName: 'snjallingur',
    name: 'Snjallingur',
    type: 'Logomark',
    year: '2024',
    category: 'Lifestyle',
    tags: ['brand-identity', 'logo', 'heritage', 'icelandic', 'nordic'],
    featured: false
  },
  {
    logoName: 'konsulat',
    name: 'Konsulat',
    type: 'Wordmark',
    year: '2024',
    category: 'Professional Services',
    tags: ['brand-identity', 'logo', 'consulting', 'professional', 'elegant'],
    featured: false
  },
  {
    logoName: 'mbsk',
    name: 'MBSK — Miðbæjarskák',
    type: 'Logomark',
    year: '2024',
    category: 'Professional Services',
    tags: ['lettermark', 'financial', 'typography', 'logo', 'trust'],
    featured: false
  },
  {
    logoName: 'mobe-3',
    name: 'Mobe',
    type: 'Logomark',
    year: '2024',
    category: 'Technology',
    tags: ['brand-identity', 'logo', 'mobile', 'tech', 'dynamic'],
    featured: false
  },
  {
    logoName: 'microgroove',
    name: 'Microgroove',
    type: 'Logomark',
    year: '2024',
    category: 'Creative',
    tags: ['wordmark', 'audio', 'music', 'rhythmic', 'creative'],
    featured: false
  },
  {
    logoName: 'hidash-1',
    name: 'Hidash',
    type: 'Logomark',
    year: '2024',
    category: 'Luxury',
    tags: ['brand-identity', 'logo', 'luxury', 'premium', 'sophisticated'],
    featured: false
  },
  {
    logoName: 'hidash-2',
    name: 'Hidash',
    type: 'Logomark',
    year: '2024',
    category: 'Luxury',
    tags: ['icon-mark', 'luxury', 'premium', 'elegant', 'sophisticated'],
    featured: false
  },
  {
    logoName: 'black house',
    name: 'Black House',
    type: 'Logomark',
    year: '2024',
    category: 'Hospitality',
    tags: ['brand-identity', 'logo', 'hospitality', 'modern', 'elegant'],
    featured: false
  },
  {
    logoName: 'likhamur',
    name: 'Líkhamur',
    type: 'Wordmark',
    year: '2024',
    category: 'Lifestyle',
    tags: ['brand-identity', 'logo', 'fashion', 'artistic', 'contemporary'],
    featured: false
  },
  {
    logoName: 'logo-1',
    name: 'Mobe',
    type: 'Logomark',
    year: '2024',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'symbol', 'minimal', 'clean'],
    featured: false
  },
  {
    logoName: 'logo-2',
    name: 'BF',
    type: 'Logomark',
    year: '2024',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'composition', 'modern', 'balanced'],
    featured: false
  },
  {
    logoName: 'logo-3',
    name: 'Foto',
    type: 'Logomark',
    year: '2024',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'symbol', 'clean', 'universal'],
    featured: false
  },
  {
    logoName: 'logo-4',
    name: 'Mark',
    type: 'Logomark',
    year: '2024',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'symbol', 'minimal', 'versatile'],
    featured: false
  },
  {
    logoName: 'logo-5',
    name: 'Mark',
    type: 'Logomark',
    year: '2024',
    category: 'Abstract',
    tags: ['abstract', 'geometric', 'symbol', 'dynamic', 'energy'],
    featured: false
  },
  {
    logoName: 'logo-6',
    name: 'Foto',
    type: 'Logomark',
    year: '2024',
    category: 'Typography',
    tags: ['lettermark', 'typography', 'custom-type', 'character', 'design'],
    featured: false
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
