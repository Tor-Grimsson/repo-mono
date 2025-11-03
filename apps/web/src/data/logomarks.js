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
 * - industry: Industry/business sector
 * - description: Detailed description
 * - tags: Array of searchable tags
 * - featured: Boolean for featured status
 */

const logomarks = [
  {
    logoName: 'kolkrabbi',
    name: 'Kolkrabbi',
    type: 'Brand Mark',
    year: '2024',
    category: 'Food & Beverage',
    industry: 'Coffee Roastery',
    description: 'Custom brand mark for Kolkrabbi micro roastery with maritime influences and coastal identity.',
    tags: ['brand-identity', 'logo', 'roastery', 'custom-type', 'seagull'],
    featured: true
  },
  {
    logoName: 'biskup',
    name: 'Biskup',
    type: 'Brand Mark',
    year: '2024',
    category: 'Technology',
    industry: 'Tech Startup',
    description: 'Minimalist brand mark with geometric precision and modern tech aesthetic.',
    tags: ['brand-identity', 'logo', 'tech', 'minimalist', 'geometric'],
    featured: true
  },
  {
    logoName: 'canalix',
    name: 'Canalix',
    type: 'Tech Mark',
    year: '2024',
    category: 'Technology',
    industry: 'Tech Startup',
    description: 'Tech startup brand mark with modern aesthetics and scalable identity system.',
    tags: ['brand-identity', 'logo', 'tech-startup', 'canal', 'flow'],
    featured: true
  },
  {
    logoName: 'flik',
    name: 'FLÍK',
    type: 'Wordmark',
    year: '2024',
    category: 'Food & Beverage',
    industry: 'Coffee Roastery',
    description: 'Micro roastery wordmark with character and distinctive Nordic letterforms.',
    tags: ['wordmark', 'roastery', 'coffee', 'typography', 'nordic'],
    featured: true
  },
  {
    logoName: 'greind',
    name: 'GREIND',
    type: 'Wordmark',
    year: '2024',
    category: 'Custom Type',
    industry: 'Brand Identity',
    description: 'Custom lettermark with distinctive character and strong typographic presence.',
    tags: ['lettermark', 'custom-type', 'typography', 'logo'],
    featured: true
  },
  {
    logoName: 'kaffistofan',
    name: 'Kaffistofan',
    type: 'Wordmark',
    year: '2024',
    category: 'Food & Beverage',
    industry: 'Coffee Roastery',
    description: 'Coffee roastery brand with Nordic influences and traditional craftsmanship.',
    tags: ['wordmark', 'roastery', 'coffee', 'nordic', 'traditional'],
    featured: true
  },
  {
    logoName: 'exmon',
    name: 'Exmon',
    type: 'Tech Mark',
    year: '2024',
    category: 'Technology',
    industry: 'Analytics Platform',
    description: 'Analytics platform with dynamic elements and data visualization aesthetic.',
    tags: ['brand-identity', 'logo', 'analytics', 'data', 'tech'],
    featured: true
  },
  {
    logoName: 'casedoc',
    name: 'CaseDoc',
    type: 'Brand Mark',
    year: '2024',
    category: 'Professional Services',
    industry: 'Legal Tech',
    description: 'Legal tech platform with professional appeal and trustworthy design.',
    tags: ['brand-identity', 'logo', 'legal', 'professional', 'trust'],
    featured: false
  },
  {
    logoName: 'servado',
    name: 'Servado',
    type: 'Brand Mark',
    year: '2024',
    category: 'Professional Services',
    industry: 'Service Industry',
    description: 'Service industry brand with clean lines and professional aesthetics.',
    tags: ['brand-identity', 'logo', 'service', 'professional', 'clean'],
    featured: false
  },
  {
    logoName: 'snjallingur',
    name: 'Snjallingur',
    type: 'Brand Mark',
    year: '2024',
    category: 'Lifestyle',
    industry: 'Heritage Brand',
    description: 'Icelandic heritage brand with modern twist and cultural references.',
    tags: ['brand-identity', 'logo', 'heritage', 'icelandic', 'nordic'],
    featured: false
  },
  {
    logoName: 'konsulat',
    name: 'Konsulat',
    type: 'Wordmark',
    year: '2024',
    category: 'Professional Services',
    industry: 'Consulting',
    description: 'Professional services with elegant simplicity and corporate appeal.',
    tags: ['brand-identity', 'logo', 'consulting', 'professional', 'elegant'],
    featured: false
  },
  {
    logoName: 'mbsk',
    name: 'MBSK',
    type: 'Lettermark',
    year: '2024',
    category: 'Professional Services',
    industry: 'Financial Services',
    description: 'Financial services with strong typography and trustworthy appearance.',
    tags: ['lettermark', 'financial', 'typography', 'logo', 'trust'],
    featured: false
  },
  {
    logoName: 'mobe-3',
    name: 'Mobe',
    type: 'Brand Mark',
    year: '2024',
    category: 'Technology',
    industry: 'Mobile Tech',
    description: 'Mobile technology brand with dynamic form and movement.',
    tags: ['brand-identity', 'logo', 'mobile', 'tech', 'dynamic'],
    featured: false
  },
  {
    logoName: 'microgroove',
    name: 'Microgroove',
    type: 'Wordmark',
    year: '2024',
    category: 'Creative',
    industry: 'Audio/Music',
    description: 'Audio brand with rhythmic letterforms and music-inspired design.',
    tags: ['wordmark', 'audio', 'music', 'rhythmic', 'creative'],
    featured: false
  },
  {
    logoName: 'hidash-1',
    name: 'Hidash',
    type: 'Brand Mark',
    year: '2024',
    category: 'Luxury',
    industry: 'Premium Goods',
    description: 'Premium goods with sophisticated geometry and luxury aesthetic.',
    tags: ['brand-identity', 'logo', 'luxury', 'premium', 'sophisticated'],
    featured: false
  },
  {
    logoName: 'hidash-2',
    name: 'Hidash',
    type: 'Icon Mark',
    year: '2024',
    category: 'Luxury',
    industry: 'Premium Goods',
    description: 'Premium goods icon with elegant curves and refined details.',
    tags: ['icon-mark', 'luxury', 'premium', 'elegant', 'sophisticated'],
    featured: false
  },
  {
    logoName: 'black house',
    name: 'Black House',
    type: 'Brand Mark',
    year: '2024',
    category: 'Hospitality',
    industry: 'Hospitality',
    description: 'Hospitality brand with distinctive presence and modern elegance.',
    tags: ['brand-identity', 'logo', 'hospitality', 'modern', 'elegant'],
    featured: false
  },
  {
    logoName: 'likhamur',
    name: 'Likhamur',
    type: 'Brand Mark',
    year: '2024',
    category: 'Lifestyle',
    industry: 'Fashion/Lifestyle',
    description: 'Fashion brand with artistic expression and contemporary design.',
    tags: ['brand-identity', 'logo', 'fashion', 'artistic', 'contemporary'],
    featured: false
  },
  {
    logoName: 'logo-1',
    name: 'Abstract Mark 1',
    type: 'Symbol',
    year: '2024',
    category: 'Abstract',
    industry: 'Generic',
    description: 'Abstract geometric form with clean lines and minimal aesthetic.',
    tags: ['abstract', 'geometric', 'symbol', 'minimal', 'clean'],
    featured: false
  },
  {
    logoName: 'logo-2',
    name: 'Abstract Mark 2',
    type: 'Symbol',
    year: '2024',
    category: 'Abstract',
    industry: 'Generic',
    description: 'Modern geometric composition with balanced proportions.',
    tags: ['abstract', 'geometric', 'composition', 'modern', 'balanced'],
    featured: false
  },
  {
    logoName: 'logo-3',
    name: 'Abstract Mark 3',
    type: 'Symbol',
    year: '2024',
    category: 'Abstract',
    industry: 'Generic',
    description: 'Clean geometric symbol with universal appeal.',
    tags: ['abstract', 'geometric', 'symbol', 'clean', 'universal'],
    featured: false
  },
  {
    logoName: 'logo-4',
    name: 'Abstract Mark 4',
    type: 'Symbol',
    year: '2024',
    category: 'Abstract',
    industry: 'Generic',
    description: 'Minimal geometric form with versatile application.',
    tags: ['abstract', 'geometric', 'symbol', 'minimal', 'versatile'],
    featured: false
  },
  {
    logoName: 'logo-5',
    name: 'Abstract Mark 5',
    type: 'Symbol',
    year: '2024',
    category: 'Abstract',
    industry: 'Generic',
    description: 'Dynamic geometric shape with energy and movement.',
    tags: ['abstract', 'geometric', 'symbol', 'dynamic', 'energy'],
    featured: false
  },
  {
    logoName: 'logo-6',
    name: 'Lettermark 6',
    type: 'Lettermark',
    year: '2024',
    category: 'Typography',
    industry: 'Generic',
    description: 'Custom lettermark design with distinctive character.',
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
  industries: [...new Set(logomarks.map(l => l.industry))].sort(),
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
