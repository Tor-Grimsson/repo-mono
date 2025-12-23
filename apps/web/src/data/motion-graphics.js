/**
 * Motion Graphics Collection Data
 *
 * Centralized data for all motion graphics in the collection.
 * Each video includes metadata and optional Touch Designer patch information.
 *
 * Fields:
 * - title: Video title
 * - subtitle: Brief description
 * - category: Primary category
 * - type: Motion graphics type/technique
 * - year: Creation year
 * - description: Detailed description (for modal)
 * - thumbnailUrl: Path to thumbnail/poster image
 * - videoUrl: HLS stream URL (master.m3u8)
 * - featured: Boolean for featured status
 * - touchDesigner: Optional Touch Designer metadata object
 */

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/hls-library/video-library/motion-graphics'

const motionGraphics = [
  {
    id: 1,
    title: 'Geometric Patterns',
    subtitle: 'Exploration of typography distortion',
    category: 'Generative',
    type: 'Abstract',
    year: '2025',
    description: 'Exploration of geometric patterns using noise and feedback loops.',
    thumbnailUrl: `${cdnBase}/01_mg-type-abstract/trollatunga-abstract-still.png`,
    videoUrl: `${cdnBase}/01_mg-type-abstract/hls/master.m3u8`,
    featured: false,
    touchDesigner: {
      patchName: 'geometric_patterns_v01.toe',
      version: '2023.11880',
      resolution: '1920x1080',
      fps: '60',
      operators: ['Noise TOP', 'Feedback TOP', 'Displace TOP', 'Composite TOP'],
      notes: 'Uses feedback loop with displacement for organic movement'
    }
  },
  {
    id: 2,
    title: 'Tröllatunga',
    subtitle: 'Fluid typography simulation',
    category: 'Simulation',
    type: 'Fluid',
    year: '2025',
    description: 'Real-time fluid dynamics simulation with particle systems.',
    thumbnailUrl: `${cdnBase}/02_mg-type-trolla/trollatunga-still-narrow.jpg`,
    videoUrl: `${cdnBase}/02_mg-type-trolla/hls/master.m3u8`,
    featured: true,
    touchDesigner: {
      patchName: 'fluid_sim_v02.toe',
      version: '2023.11880',
      resolution: '1920x1080',
      fps: '60',
      operators: ['Particle SOP', 'Fluid Force', 'Point SOP', 'Render TOP'],
      notes: 'GPU-accelerated particle simulation with custom forces'
    }
  },
  {
    id: 3,
    title: 'Abstract Patch',
    subtitle: 'Morphing shapes',
    category: 'Abstract',
    type: 'Morphing',
    year: '2025',
    description: 'Abstract morphing forms driven by audio reactivity.',
    thumbnailUrl: `${cdnBase}/03_mg-dust/dust_still.png`,
    videoUrl: `${cdnBase}/03_mg-dust/hls/master.m3u8`,
    featured: false,
    touchDesigner: null
  },
  {
    id: 4,
    title: 'Shader Experiments',
    subtitle: 'GLSL studies',
    category: 'Shader',
    type: 'GLSL',
    year: '2025',
    description: 'Collection of custom GLSL shader experiments.',
    thumbnailUrl: `${cdnBase}/04_mg-sanid/sanid-still.png`,
    videoUrl: `${cdnBase}/04_mg-sanid/hls/master.m3u8`,
    featured: true,
    touchDesigner: null
  },
  {
    id: 5,
    title: 'Aftra Logo',
    subtitle: 'Dynamic particles',
    category: 'Simulation',
    type: 'Particle',
    year: '2025',
    description: 'Complex particle system with multiple attractors.',
    thumbnailUrl: `${cdnBase}/05_mg-aftra/aftra-still.png`,
    videoUrl: `${cdnBase}/05_mg-aftra/hls/master.m3u8`,
    featured: true,
    touchDesigner: null
  },
  {
    id: 6,
    title: 'GeoPop',
    subtitle: 'Pops experiment',
    category: 'Data',
    type: 'Visualization',
    year: '2025',
    description: 'Animated data visualization exploring complex datasets.',
    thumbnailUrl: `${cdnBase}/06_mg-field/field-still.png`,
    videoUrl: `${cdnBase}/06_mg-field/hls/master.m3u8`,
    featured: false,
    touchDesigner: null
  },
  {
    id: 7,
    title: 'Fluid light surface scatter',
    subtitle: 'Voronoi type experiment',
    category: 'Generative',
    type: 'Abstract',
    year: '2025',
    description: 'Generative art piece using algorithmic composition.',
    thumbnailUrl: `${cdnBase}/07_mg-vatn/vatn-still.png`,
    videoUrl: `${cdnBase}/07_mg-vatn/hls/master.m3u8`,
    featured: false,
    touchDesigner: null
  },
  {
    id: 8,
    title: 'Kinetic',
    subtitle: 'Typography',
    category: 'Typography',
    type: 'Kinetic',
    year: '2025',
    description: 'Kinetic typography exploring type as moving image.',
    thumbnailUrl: `${cdnBase}/08_mg-type-gr/type_gr-2k-still.png`,
    videoUrl: `${cdnBase}/08_mg-type-gr/hls/master.m3u8`,
    featured: false,
    touchDesigner: null
  },
  {
    id: 9,
    title: 'Audio Reactive',
    subtitle: 'Sound visualization',
    category: 'Audio',
    type: 'Reactive',
    year: '2025',
    description: 'Audio reactive visuals responding to music frequency data.',
    thumbnailUrl: `${cdnBase}/09_mg-textblock/mg-textblock-still.png`,
    videoUrl: `${cdnBase}/09_mg-textblock/hls/master.m3u8`,
    featured: false,
    touchDesigner: null
  }
]

// Export all data for easy importing
export { motionGraphics }

// Also export structured data for filters
export const filterData = {
  types: [...new Set(motionGraphics.map(m => m.type))].sort(),
  years: [...new Set(motionGraphics.map(m => m.year))].sort((a, b) => b - a),
  categories: [...new Set(motionGraphics.map(m => m.category))].sort(),
  featured: motionGraphics.filter(m => m.featured)
}

export default motionGraphics
