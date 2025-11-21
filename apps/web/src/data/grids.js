/**
 * Grid Collection Data
 *
 * Centralized data for all grids in the collection.
 * Each grid maps to an SVG file in /packages/ui/src/atoms/grids/svg/
 *
 * Fields:
 * - illustrationName: SVG filename (without extension)
 * - name: Display name
 * - type: Grid type
 * - year: Creation year
 * - category: Project category for filtering
 * - industry: Industry/business sector
 * - description: Detailed description
 * - tags: Array of searchable tags
 * - featured: Boolean for featured status
 */

const grids = [
  {
    illustrationName: 'grid-01',
    gridName: 'grid-01',
    name: 'Grid 01',
    type: 'Client work',
    year: '2023',
    category: 'Client Work',
    description: 'Spot graphic illustration for Kaffistofan',
    tags: ['editorial', 'illustration', 'narrative', 'storytelling'],
    featured: true
  },
  {
    illustrationName: 'grid-02',
    gridName: 'grid-02',
    name: 'Grid 02',
    type: 'Pattern',
    year: '2024',
    category: 'Pattern',
    
    description: 'Geometrical form pattern, layered composition',
    tags: ['editorial', 'illustration', 'geometric', 'composition'],
    featured: true
  },
  {
    illustrationName: 'grid-03',
    gridName: 'grid-03',
    name: 'Grid 03',
    type: 'Client Work',
    year: '2024',
    category: 'Client Work',
    
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'minimal', 'clean'],
    featured: true
  },
  {
    illustrationName: 'grid-04',
    gridName: 'grid-04',
    name: 'Grid 04',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'bold', 'expressive'],
    featured: false
  },
  {
    illustrationName: 'grid-05',
    gridName: 'grid-05',
    name: 'Grid 05',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
   
    description: 'Product logo for a roast by Kaffistofan.',
    tags: ['editorial', 'illustration', 'intricate', 'sophisticated'],
    featured: false
  },
  {
    illustrationName: 'grid-06',
    gridName: 'grid-06',
    name: 'Grid 06',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'balanced', 'modern'],
    featured: false
  },
  {
    illustrationName: 'grid-07',
    gridName: 'grid-07',
    name: 'Grid 07',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Product logo for a roast by Kaffistofan',
    tags: ['editorial', 'illustration', 'minimalist', 'elegant'],
    featured: false
  },
  {
    illustrationName: 'grid-08',
    gridName: 'grid-08',
    name: 'Grid 08',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Casedocs logo technical specs illustration',
    tags: ['editorial', 'illustration', 'complex', 'detailed'],
    featured: false
  },
  {
    illustrationName: 'grid-09',
    gridName: 'grid-09',
    name: 'Grid 09',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Printer mark for Biskup',
    tags: ['editorial', 'illustration', 'layered', 'metaphor'],
    featured: false
  },
  {
    illustrationName: 'grid-10',
    gridName: 'grid-10',
    name: 'Grid 10',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Contemporary editorial illustration with artistic flair and creative expression.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'grid-11',
    gridName: 'grid-11',
    name: 'Grid 11',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with bold color palette and dynamic composition.',
    tags: ['editorial', 'illustration', 'bold', 'dynamic'],
    featured: false
  },
  {
    illustrationName: 'grid-12',
    gridName: 'grid-12',
    name: 'Grid 12',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with architectural elements and structured design.',
    tags: ['editorial', 'illustration', 'architectural', 'structured'],
    featured: false
  },
  {
    illustrationName: 'grid-13',
    gridName: 'grid-13',
    name: 'Grid 13',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with intricate geometric patterns and fine details.',
    tags: ['editorial', 'illustration', 'geometric', 'patterns'],
    featured: false
  },
  {
    illustrationName: 'grid-14',
    gridName: 'grid-14',
    name: 'Grid 14',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex narratives and rich visual storytelling.',
    tags: ['editorial', 'illustration', 'complex', 'rich'],
    featured: false
  },
  {
    illustrationName: 'grid-15',
    gridName: 'grid-15',
    name: 'Grid 15',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary styling and modern sensibilities.',
    tags: ['editorial', 'illustration', 'contemporary', 'modern'],
    featured: false
  },
  {
    illustrationName: 'grid-16',
    gridName: 'grid-16',
    name: 'Grid 16',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimalist approach and clean execution.',
    tags: ['editorial', 'illustration', 'minimalist', 'clean'],
    featured: false
  },
  {
    illustrationName: 'grid-17',
    gridName: 'grid-17',
    name: 'Grid 17',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with precise linework and refined aesthetics.',
    tags: ['editorial', 'illustration', 'precise', 'refined'],
    featured: false
  },
  {
    illustrationName: 'grid-18',
    gridName: 'grid-18',
    name: 'Grid 18',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed elements and sophisticated composition.',
    tags: ['editorial', 'illustration', 'detailed', 'sophisticated'],
    featured: false
  },
  {
    illustrationName: 'grid-19',
    gridName: 'grid-19',
    name: 'Grid 19',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with artistic expression and creative interpretation.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'grid-20',
    gridName: 'grid-20',
    name: 'Grid 20',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with elegant design and refined execution.',
    tags: ['editorial', 'illustration', 'elegant', 'refined'],
    featured: false
  },
  {
    illustrationName: 'grid-21',
    gridName: 'grid-21',
    name: 'Grid 21',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with bold visual language and expressive elements.',
    tags: ['editorial', 'illustration', 'bold', 'expressive'],
    featured: false
  },
  {
    illustrationName: 'grid-22',
    gridName: 'grid-22',
    name: 'Grid 22',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed craftsmanship and artistic flair.',
    tags: ['editorial', 'illustration', 'craftsmanship', 'artistic'],
    featured: false
  },
  {
    illustrationName: 'grid-23',
    gridName: 'grid-23',
    name: 'Grid 23',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex layering and narrative depth.',
    tags: ['editorial', 'illustration', 'complex', 'narrative'],
    featured: false
  },
  {
    illustrationName: 'grid-24',
    gridName: 'grid-24',
    name: 'Grid 24',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary approach and modern aesthetics.',
    tags: ['editorial', 'illustration', 'contemporary', 'modern'],
    featured: false
  },
  {
    illustrationName: 'grid-25',
    gridName: 'grid-25',
    name: 'Grid 25',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with artistic interpretation and creative vision.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'grid-26',
    gridName: 'grid-26',
    name: 'Grid 26',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with sophisticated design and elegant execution.',
    tags: ['editorial', 'illustration', 'sophisticated', 'elegant'],
    featured: false
  },
  {
    illustrationName: 'grid-27',
    gridName: 'grid-27',
    name: 'Grid 27',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimal approach and clean design.',
    tags: ['editorial', 'illustration', 'minimal', 'clean'],
    featured: false
  },
  {
    illustrationName: 'grid-28',
    gridName: 'grid-28',
    name: 'Grid 28',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed elements and fine craftsmanship.',
    tags: ['editorial', 'illustration', 'detailed', 'craftsmanship'],
    featured: false
  },
  {
    illustrationName: 'grid-29',
    gridName: 'grid-29',
    name: 'Grid 29',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary styling and modern execution.',
    tags: ['editorial', 'illustration', 'contemporary', 'modern'],
    featured: false
  },
  {
    illustrationName: 'grid-30',
    gridName: 'grid-30',
    name: 'Grid 30',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with artistic flair and creative expression.',
    tags: ['editorial', 'illustration', 'artistic', 'creative'],
    featured: false
  },
  {
    illustrationName: 'grid-31',
    gridName: 'grid-31',
    name: 'Grid 31',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex composition and layered storytelling.',
    tags: ['editorial', 'illustration', 'complex', 'layered'],
    featured: false
  },
  {
    illustrationName: 'grid-32',
    gridName: 'grid-32',
    name: 'Grid 32',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with detailed narratives and rich visual elements.',
    tags: ['editorial', 'illustration', 'detailed', 'rich'],
    featured: false
  },
  {
    illustrationName: 'grid-33',
    gridName: 'grid-33',
    name: 'Grid 33',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimal design and elegant execution.',
    tags: ['editorial', 'illustration', 'minimal', 'elegant'],
    featured: false
  },
  {
    illustrationName: 'grid-34',
    gridName: 'grid-34',
    name: 'Grid 34',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with sophisticated design and artistic interpretation.',
    tags: ['editorial', 'illustration', 'sophisticated', 'artistic'],
    featured: false
  },
  {
    illustrationName: 'grid-35',
    gridName: 'grid-35',
    name: 'Grid 35',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with contemporary approach and creative vision.',
    tags: ['editorial', 'illustration', 'contemporary', 'creative'],
    featured: false
  },
  {
    illustrationName: 'grid-36',
    gridName: 'grid-36',
    name: 'Grid 36',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with bold elements and dynamic composition.',
    tags: ['editorial', 'illustration', 'bold', 'dynamic'],
    featured: false
  },
  {
    illustrationName: 'grid-37',
    gridName: 'grid-37',
    name: 'Grid 37',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with refined aesthetics and detailed execution.',
    tags: ['editorial', 'illustration', 'refined', 'detailed'],
    featured: false
  },
  {
    illustrationName: 'grid-38',
    gridName: 'grid-38',
    name: 'Grid 38',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with complex narratives and artistic expression.',
    tags: ['editorial', 'illustration', 'complex', 'narrative'],
    featured: false
  },
  {
    illustrationName: 'grid-39',
    gridName: 'grid-39',
    name: 'Grid 39',
    type: 'Editorial',
    year: '2024',
    category: 'Editorial',
    industry: 'Publishing',
    description: 'Editorial illustration with minimal approach and contemporary styling.',
    tags: ['editorial', 'illustration', 'minimal', 'contemporary'],
    featured: false
  }
]

// Export all data for easy importing
export { grids }

// Also export structured data for filters
export const gridFilterData = {
  types: [...new Set(grids.map(i => i.type))].sort(),
  years: [...new Set(grids.map(i => i.year))].sort((a, b) => b - a),
  categories: [...new Set(grids.map(i => i.category))].sort(),
  industries: [...new Set(grids.map(i => i.industry))].sort(),
  featured: grids.filter(i => i.featured)
}

export default grids

/**
 * Client projects displayed in the Illustration collection page
 */
export const gridProjects = [
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
export const gridCollections = [
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
