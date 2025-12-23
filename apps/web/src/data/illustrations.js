/**
 * Illustration Collection Data
 *
 * Centralized data for all illustrations in the collection.
 * SVGs loaded from CDN.
 *
 * Fields:
 * - illustrationName: SVG filename (without extension)
 * - name: Display name
 * - type: Illustration type
 * - year: Creation year
 * - category: Project category for filtering
 * - industry: Industry/business sector
 * - description: Detailed description
 * - tags: Array of searchable tags
 * - featured: Boolean for featured status
 * - svgUrl: CDN URL for the SVG file
 */

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-illustrations/illustrations-svg'

const illustrations = [
  {
    illustrationName: 'illustration-01',
    name: 'Coffee brewer',
    type: 'Client work',
    year: '2023',
    category: 'Client Work',
    description: 'Spot graphic illustration for Kaffistofan',
    tags: ['editorial', 'illustration', 'narrative', 'storytelling'],
    featured: true
  },
  {
    illustrationName: 'illustration-02',
    name: 'Geometric',
    type: 'Pattern',
    year: '2024',
    category: 'Pattern',
    
    description: 'Geometrical form pattern, layered composition',
    tags: ['editorial', 'illustration', 'geometric', 'composition'],
    featured: true
  },
  {
    illustrationName: 'illustration-03',
    name: 'Product Logo',
    type: 'Client Work',
    year: '2024',
    category: 'Client Work',
    
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'minimal', 'clean'],
    featured: true
  },
  {
    illustrationName: 'illustration-04',
    name: 'Product Logo',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'bold', 'expressive'],
    featured: false
  },
  {
    illustrationName: 'illustration-05',
    name: 'Product Logo',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
   
    description: 'Product logo for a roast by Kaffistofan.',
    tags: ['editorial', 'illustration', 'intricate', 'sophisticated'],
    featured: false
  },
  {
    illustrationName: 'illustration-06',
    name: 'Product Logo',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'balanced', 'modern'],
    featured: false
  },
  {
    illustrationName: 'illustration-07',
    name: 'Copacara',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'minimalist', 'elegant'],
    featured: false
  },
  {
    illustrationName: 'illustration-08',
    name: 'Cacedocs',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Casedocs logo technical specs illustration',
    tags: ['editorial', 'illustration', 'complex', 'detailed'],
    featured: false
  },
  {
    illustrationName: 'illustration-09',
    name: 'Printer mark',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Printer mark for Biskup',
    tags: ['editorial', 'illustration', 'layered', 'metaphor'],
    featured: false
  },
  {
    illustrationName: 'illustration-10',
    name: 'Illustration 10',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Contemporary editorial illustration with artistic flair and creative expression.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'illustration-11',
    name: 'Illustration 11',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with bold color palette and dynamic composition.',
    tags: ['editorial', 'illustration', 'bold', 'dynamic'],
    featured: false
  },
  {
    illustrationName: 'illustration-12',
    name: 'Illustration 12',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with architectural elements and structured design.',
    tags: ['editorial', 'illustration', 'architectural', 'structured'],
    featured: false
  },
  {
    illustrationName: 'illustration-13',
    name: 'Illustration 13',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with intricate geometric patterns and fine details.',
    tags: ['editorial', 'illustration', 'geometric', 'patterns'],
    featured: false
  },
  {
    illustrationName: 'illustration-14',
    name: 'Illustration 14',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex narratives and rich visual storytelling.',
    tags: ['editorial', 'illustration', 'complex', 'rich'],
    featured: false
  },
  {
    illustrationName: 'illustration-15',
    name: 'Illustration 15',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary styling and modern sensibilities.',
    tags: ['editorial', 'illustration', 'contemporary', 'modern'],
    featured: false
  },
  {
    illustrationName: 'illustration-16',
    name: 'Illustration 16',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimalist approach and clean execution.',
    tags: ['editorial', 'illustration', 'minimalist', 'clean'],
    featured: false
  },
  {
    illustrationName: 'illustration-17',
    name: 'Illustration 17',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with precise linework and refined aesthetics.',
    tags: ['editorial', 'illustration', 'precise', 'refined'],
    featured: false
  },
  {
    illustrationName: 'illustration-18',
    name: 'Illustration 18',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed elements and sophisticated composition.',
    tags: ['editorial', 'illustration', 'detailed', 'sophisticated'],
    featured: false
  },
  {
    illustrationName: 'illustration-19',
    name: 'Illustration 19',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with artistic expression and creative interpretation.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'illustration-20',
    name: 'Illustration 20',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with elegant design and refined execution.',
    tags: ['editorial', 'illustration', 'elegant', 'refined'],
    featured: false
  },
  {
    illustrationName: 'illustration-21',
    name: 'Illustration 21',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with bold visual language and expressive elements.',
    tags: ['editorial', 'illustration', 'bold', 'expressive'],
    featured: false
  },
  {
    illustrationName: 'illustration-22',
    name: 'Illustration 22',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed craftsmanship and artistic flair.',
    tags: ['editorial', 'illustration', 'craftsmanship', 'artistic'],
    featured: false
  },
  {
    illustrationName: 'illustration-23',
    name: 'Illustration 23',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex layering and narrative depth.',
    tags: ['editorial', 'illustration', 'complex', 'narrative'],
    featured: false
  },
  {
    illustrationName: 'illustration-24',
    name: 'Illustration 24',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary approach and modern aesthetics.',
    tags: ['editorial', 'illustration', 'contemporary', 'modern'],
    featured: false
  },
  {
    illustrationName: 'illustration-25',
    name: 'Illustration 25',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with artistic interpretation and creative vision.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'illustration-26',
    name: 'Illustration 26',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with sophisticated design and elegant execution.',
    tags: ['editorial', 'illustration', 'sophisticated', 'elegant'],
    featured: false
  },
  {
    illustrationName: 'illustration-27',
    name: 'Illustration 27',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimal approach and clean design.',
    tags: ['editorial', 'illustration', 'minimal', 'clean'],
    featured: false
  },
  {
    illustrationName: 'illustration-28',
    name: 'Illustration 28',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed elements and fine craftsmanship.',
    tags: ['editorial', 'illustration', 'detailed', 'craftsmanship'],
    featured: false
  },
  {
    illustrationName: 'illustration-29',
    name: 'Illustration 29',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary styling and modern execution.',
    tags: ['editorial', 'illustration', 'contemporary', 'modern'],
    featured: false
  },
  {
    illustrationName: 'illustration-30',
    name: 'Illustration 30',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with artistic flair and creative expression.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'illustration-31',
    name: 'Illustration 31',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex composition and layered storytelling.',
    tags: ['editorial', 'illustration', 'complex', 'layered'],
    featured: false
  },
  {
    illustrationName: 'illustration-32',
    name: 'Illustration 32',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed narratives and rich visual elements.',
    tags: ['editorial', 'illustration', 'detailed', 'rich'],
    featured: false
  },
  {
    illustrationName: 'illustration-33',
    name: 'Illustration 33',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimal design and elegant execution.',
    tags: ['editorial', 'illustration', 'minimal', 'elegant'],
    featured: false
  },
  {
    illustrationName: 'illustration-34',
    name: 'Illustration 34',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with sophisticated design and artistic interpretation.',
    tags: ['editorial', 'illustration', 'sophisticated', 'artistic'],
    featured: false
  },
  {
    illustrationName: 'illustration-35',
    name: 'Illustration 35',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary approach and creative vision.',
    tags: ['editorial', 'illustration', 'contemporary', 'creative'],
    featured: false
  },
  {
    illustrationName: 'illustration-36',
    name: 'Illustration 36',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with bold elements and dynamic composition.',
    tags: ['editorial', 'illustration', 'bold', 'dynamic'],
    featured: false
  },
  {
    illustrationName: 'illustration-37',
    name: 'Illustration 37',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with refined aesthetics and detailed execution.',
    tags: ['editorial', 'illustration', 'refined', 'detailed'],
    featured: false
  },
  {
    illustrationName: 'illustration-38',
    name: 'Illustration 38',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex narratives and artistic expression.',
    tags: ['editorial', 'illustration', 'complex', 'narrative'],
    featured: false
  },
  {
    illustrationName: 'illustration-39',
    name: 'Illustration 39',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimal approach and contemporary styling.',
    tags: ['editorial', 'illustration', 'minimal', 'contemporary'],
    featured: false
  }
]

// Add svgUrl to each item
const illustrationsWithUrls = illustrations.map(item => ({
  ...item,
  svgUrl: `${cdnBase}/${item.illustrationName}.svg`
}))

// Export all data for easy importing
export { illustrationsWithUrls as illustrations }

// Also export structured data for filters
export const filterData = {
  types: [...new Set(illustrationsWithUrls.map(i => i.type))].sort(),
  years: [...new Set(illustrationsWithUrls.map(i => i.year))].sort((a, b) => b - a),
  categories: [...new Set(illustrationsWithUrls.map(i => i.category))].sort(),
  industries: [...new Set(illustrationsWithUrls.map(i => i.industry))].sort(),
  featured: illustrationsWithUrls.filter(i => i.featured)
}

export default illustrationsWithUrls

/**
 * Client projects displayed in the Illustration collection page
 */
export const projects = [
  {
    title: 'Editorial Illustration 1',
    category: 'Publishing',
    type: 'Editorial Illustration',
    year: '2024'
  },
  {
    title: 'Editorial Illustration 2',
    category: 'Publishing',
    type: 'Editorial Illustration',
    year: '2024'
  },
  {
    title: 'Editorial Illustration 3',
    category: 'Publishing',
    type: 'Editorial Illustration',
    year: '2024'
  },
  {
    title: 'Editorial Illustration 4',
    category: 'Publishing',
    type: 'Editorial Illustration',
    year: '2024'
  },
  {
    title: 'Editorial Illustration 5',
    category: 'Publishing',
    type: 'Editorial Illustration',
    year: '2024'
  }
]

/**
 * Collection categories displayed in the Illustration collection page
 */
export const illustrationCollections = [
  {
    title: 'Illustrations',
    count: '39',
    items: ['Editorial', 'Publishing']
  },
  {
    title: 'Editorial',
    count: '39',
    items: ['Editorial', 'Publishing']
  },
  {
    title: 'Publishing',
    count: '39',
    items: ['Editorial', 'Publishing']
  }
]
