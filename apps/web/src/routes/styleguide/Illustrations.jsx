import { useState, useMemo } from 'react'
import DesPage from '../../components/styleguide/molecules/DesPage'
import DesSection from '../../components/styleguide/molecules/DesSection'

const illustrations = [
  { id: 1, name: 'Abstract Waves', type: 'Abstract', variant: 'primary', description: 'Flowing organic wave forms' },
  { id: 2, name: 'Geometric Grid', type: 'Geometric', variant: 'secondary', description: 'Structured grid composition' },
  { id: 3, name: 'Minimal Line Art', type: 'Line Art', variant: 'tertiary', description: 'Clean line-based illustration' },
  { id: 4, name: 'Gradient Sphere', type: 'Gradient', variant: 'quaternary', description: 'Soft gradient sphere' },
  { id: 5, name: 'Paper Cut', type: 'Cutout', variant: 'primary', description: 'Layered paper cut effect' },
  { id: 6, name: 'Isometric Cube', type: '3D', variant: 'secondary', description: 'Three-dimensional cube' },
  { id: 7, name: 'Dot Pattern', type: 'Pattern', variant: 'tertiary', description: 'Repeating dot matrix' },
  { id: 8, name: 'Watercolor Wash', type: 'Watercolor', variant: 'quaternary', description: 'Soft watercolor texture' },
  { id: 9, name: 'Origami Fold', type: 'Origami', variant: 'primary', description: 'Folded paper geometry' },
  { id: 10, name: 'Mesh Gradient', type: 'Gradient', variant: 'secondary', description: 'Colorful mesh gradient' },
  { id: 11, name: 'Wireframe', type: 'Technical', variant: 'tertiary', description: 'Technical wireframe style' },
  { id: 12, name: 'Glitch Effect', type: 'Digital', variant: 'quaternary', description: 'Digital glitch aesthetic' },
  { id: 13, name: 'Low Poly', type: '3D', variant: 'primary', description: 'Low polygon surfaces' },
  { id: 14, name: 'Rorschach', type: 'Abstract', variant: 'secondary', description: 'Symmetric inkblot' },
  { id: 15, name: 'Pixel Art', type: 'Pixel', variant: 'tertiary', description: 'Retro pixel illustration' },
  { id: 16, name: 'Neon Glow', type: 'Neon', variant: 'quaternary', description: 'Electric neon glow' },
  { id: 17, name: 'Brush Stroke', type: 'Brush', variant: 'primary', description: 'Expressive brush work' },
  { id: 18, name: 'DNA Helix', type: 'Scientific', variant: 'secondary', description: 'Molecular structure' },
  { id: 19, name: 'Constellation', type: 'Astronomy', variant: 'tertiary', description: 'Star constellation map' },
  { id: 20, name: 'Topographic', type: 'Map', variant: 'quaternary', description: 'Topographic lines' },
  { id: 21, name: 'Cloud Forms', type: 'Weather', variant: 'primary', description: 'Soft cloud formations' },
  { id: 22, name: 'Circuit Board', type: 'Technical', variant: 'secondary', description: 'Electronic circuits' },
  { id: 23, name: 'Marble Texture', type: 'Texture', variant: 'tertiary', description: 'Natural marble pattern' },
  { id: 24, name: 'Liquid Metal', type: 'Metallic', variant: 'quaternary', description: 'Flowing liquid metal' }
]

const getIllustrationShape = (id) => {
  const shapes = {
    1: (
      <div className="w-32 h-32 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60" />
          <div className="absolute inset-2 bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 rounded-full" />
        </div>
      </div>
    ),
    2: (
      <div className="w-32 h-32 relative">
        <div className="grid grid-cols-8 gap-1 w-full h-full p-2">
          {[...Array(64)].map((_, i) => (
            <div key={i} className={`${i % 3 === 0 ? 'bg-foreground' : 'bg-foreground/20'} aspect-square rounded-sm`} />
          ))}
        </div>
      </div>
    ),
    3: (
      <div className="w-32 h-32 flex items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
          <path d="M20 64C20 35.88 35.88 20 64 20S108 35.88 108 64" stroke="currentColor" strokeWidth="3" />
          <path d="M44 64C44 48 56 44 64 44S84 48 84 64" stroke="currentColor" strokeWidth="3" />
          <path d="M64 44V64" stroke="currentColor" strokeWidth="3" />
          <circle cx="64" cy="64" r="4" fill="currentColor" />
        </svg>
      </div>
    ),
    4: (
      <div className="w-32 h-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full" />
        <div className="absolute inset-4 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 rounded-full opacity-70" />
        <div className="absolute inset-8 bg-background rounded-full" />
      </div>
    ),
    5: (
      <div className="w-32 h-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 clip-path-polygon" />
        <div className="absolute inset-2 bg-gradient-to-br from-pink-400 to-orange-400 clip-path-polygon" />
        <div className="absolute inset-4 bg-gradient-to-br from-purple-400 to-pink-400 clip-path-polygon" />
      </div>
    ),
    6: (
      <div className="w-32 h-32 relative">
        <div className="w-24 h-24 absolute top-4 left-4 bg-gradient-to-br from-blue-400 to-purple-500" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
        <div className="w-24 h-24 absolute top-6 left-6 bg-gradient-to-br from-cyan-400 to-blue-400 opacity-80" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      </div>
    ),
    7: (
      <div className="w-32 h-32 relative">
        {[...Array(8)].map((_, row) => (
          <div key={row} className="absolute w-full flex justify-center gap-1" style={{ top: `${row * 12 + 10}px` }}>
            {[...Array(8)].map((_, col) => (
              <div key={col} className="w-2 h-2 bg-foreground/30 rounded-full" />
            ))}
          </div>
        ))}
      </div>
    ),
    8: (
      <div className="w-32 h-32 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-yellow-200/40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)' }} />
      </div>
    ),
    9: (
      <div className="w-32 h-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500" style={{ clipPath: 'polygon(50% 10%, 80% 40%, 50% 80%, 20% 40%)' }} />
        <div className="absolute inset-2 bg-gradient-to-br from-orange-400 to-rose-400 opacity-90" style={{ clipPath: 'polygon(50% 20%, 75% 45%, 50% 75%, 25% 45%)' }} />
      </div>
    ),
    10: (
      <div className="w-32 h-32 relative">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)' }} />
        <div className="absolute inset-2 bg-background/20 rounded-full" />
      </div>
    ),
    11: (
      <div className="w-32 h-32 relative">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
          <rect x="20" y="20" width="88" height="88" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="32" y="32" width="64" height="64" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="20" y1="64" x2="108" y2="64" stroke="currentColor" strokeWidth="2" />
          <line x1="64" y1="20" x2="64" y2="108" stroke="currentColor" strokeWidth="2" />
          <circle cx="64" cy="64" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    ),
    12: (
      <div className="w-32 h-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-2 bg-pink-400 top-8 left-0 transform rotate-12" />
          <div className="absolute w-full h-2 bg-yellow-400 top-16 left-0 transform -rotate-12" />
          <div className="absolute w-full h-2 bg-purple-400 top-24 left-0 transform rotate-45" />
        </div>
      </div>
    ),
    13: (
      <div className="w-32 h-32 relative">
        <div className="w-full h-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-500" />
        </div>
        <div className="absolute inset-1" style={{ clipPath: 'polygon(50% 10%, 90% 30%, 90% 70%, 50% 90%, 10% 70%, 10% 30%)' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-teal-400" />
        </div>
      </div>
    ),
    14: (
      <div className="w-32 h-32 flex items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
          <path d="M64 20C64 20 40 32 40 64C40 96 64 108 64 108C64 108 88 96 88 64C88 32 64 20 64 20Z" fill="currentColor" />
          <path d="M64 20C64 20 40 32 40 64C40 96 64 108 64 108" stroke="background" strokeWidth="2" />
        </svg>
      </div>
    ),
    15: (
      <div className="w-32 h-32 relative">
        <div className="grid grid-cols-16 gap-px w-full h-full p-2 bg-background">
          {[...Array(256)].map((_, i) => (
            <div key={i} className={`${Math.random() > 0.7 ? 'bg-foreground' : 'bg-foreground/10'}`} />
          ))}
        </div>
      </div>
    ),
    16: (
      <div className="w-32 h-32 relative">
        <div className="absolute inset-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 rounded-full blur-sm" />
        <div className="absolute inset-6 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-300 rounded-full blur-none" />
        <div className="absolute inset-8 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
      </div>
    ),
    17: (
      <div className="w-32 h-32 relative overflow-hidden">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
          <path d="M20 80C40 40 60 60 80 20" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M28 84C48 44 68 64 88 24" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M36 88C56 48 76 68 96 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      </div>
    ),
    18: (
      <div className="w-32 h-32 flex items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
          <path d="M64 20C64 20 40 40 40 64C40 88 64 108 64 108" stroke="currentColor" strokeWidth="3" />
          <path d="M64 20C64 20 88 40 88 64C88 88 64 108 64 108" stroke="currentColor" strokeWidth="3" />
          <line x1="52" y1="44" x2="76" y2="44" stroke="currentColor" strokeWidth="2" />
          <line x1="52" y1="64" x2="76" y2="64" stroke="currentColor" strokeWidth="2" />
          <line x1="52" y1="84" x2="76" y2="84" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    ),
    19: (
      <div className="w-32 h-32 relative">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-foreground rounded-full"
            style={{
              left: `${50 + 30 * Math.cos((i * 30 * Math.PI) / 180)}px`,
              top: `${50 + 30 * Math.sin((i * 30 * Math.PI) / 180)}px`,
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 w-16 h-px bg-foreground/50 transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
        <div className="absolute top-1/2 left-1/2 w-16 h-px bg-foreground/50 transform -translate-x-1/2 -translate-y-1/2 -rotate-12" />
      </div>
    ),
    20: (
      <div className="w-32 h-32 relative">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-foreground/20"
            style={{ top: `${i * 12 + 10}px` }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-foreground/20"
            style={{ left: `${i * 12 + 10}px` }}
          />
        ))}
      </div>
    ),
    21: (
      <div className="w-32 h-32 relative">
        <div className="absolute top-8 left-4 w-12 h-6 bg-foreground/20 rounded-full" />
        <div className="absolute top-10 left-10 w-10 h-5 bg-foreground/30 rounded-full" />
        <div className="absolute top-12 left-16 w-8 h-4 bg-foreground/40 rounded-full" />
        <div className="absolute top-14 left-6 w-6 h-3 bg-foreground/50 rounded-full" />
      </div>
    ),
    22: (
      <div className="w-32 h-32 relative">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
          <rect x="20" y="40" width="20" height="8" stroke="currentColor" strokeWidth="2" />
          <rect x="88" y="40" width="20" height="8" stroke="currentColor" strokeWidth="2" />
          <rect x="20" y="80" width="20" height="8" stroke="currentColor" strokeWidth="2" />
          <rect x="88" y="80" width="20" height="8" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="44" x2="88" y2="44" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="84" x2="88" y2="84" stroke="currentColor" strokeWidth="2" />
          <circle cx="64" cy="44" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="64" cy="84" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    ),
    23: (
      <div className="w-32 h-32 relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute w-full h-1 bg-gray-600/30 top-4 transform rotate-12" />
          <div className="absolute w-full h-1 bg-gray-600/30 top-12 transform -rotate-12" />
          <div className="absolute w-full h-1 bg-gray-600/30 top-20 transform rotate-45" />
          <div className="absolute w-full h-1 bg-gray-600/30 top-28 transform -rotate-45" />
        </div>
      </div>
    ),
    24: (
      <div className="w-32 h-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 rounded-t-[100px]" />
        <div className="absolute inset-2 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500 rounded-t-[80px]" />
        <div className="absolute inset-4 bg-gradient-to-br from-white/60 via-gray-100/60 to-gray-400/60 rounded-t-[60px]" />
      </div>
    ),
  }
  return shapes[id] || shapes[1]
}

const getVariantClass = (variant) => {
  const variants = {
    primary: 'bg-surface-secondary',
    secondary: 'bg-surface-secondary',
    tertiary: 'bg-surface-inverse',
    quaternary: 'bg-surface-secondary'
  }
  return variants[variant] || variants.primary
}

const Illustrations = () => {
  const [selectedType, setSelectedType] = useState('all')

  const types = ['all', 'Abstract', 'Geometric', '3D', 'Gradient', 'Technical', 'Pattern']

  const filteredIllustrations = useMemo(() => {
    if (selectedType === 'all') return illustrations
    return illustrations.filter(item => item.type === selectedType)
  }, [selectedType])

  return (
    <div className="space-y-10">
      <DesPage
        title="Illustration Collection"
        subtitle="A curated selection of illustration styles, techniques, and visual approaches"
        meta="24 variations · Filterable · Multiple techniques"
      />

      <DesSection
        name="Filter Controls"
        description="Filter illustrations by style to explore different approaches"
        details="Use the filter buttons to show all illustrations or filter by specific styles."
      />

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`
              px-6 py-2 rounded-full border transition-all duration-200 text-sm font-medium
              ${
                selectedType === type
                  ? 'bg-fg text-auto border-fg'
                  : 'bg-transparent text-auto border-fg-08 hover:border-hover'
              }
            `}
          >
            {type === 'all' ? 'All Styles' : type}
          </button>
        ))}
      </div>

      <DesSection
        name={`Illustration Grid (${filteredIllustrations.length} of ${illustrations.length})`}
        description="Interactive grid of illustration styles"
        details="Each illustration demonstrates a different visual technique or aesthetic approach."
      />

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredIllustrations.map((item) => (
          <div
            key={item.id}
            className="group relative bg-surface-inverse p-2 rounded-lg border border-fg-08 hover:border-fg-16 transition-colors"
          >
            <div className="flex flex-col items-center justify-center gap-3 py-6 min-h-[200px]">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {getIllustrationShape(item.id)}
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="kol-mono-xs text-center text-auto/60">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      <DesSection
        name="Usage Guidelines"
        description="Best practices for illustration implementation"
        details="Choose styles that align with brand voice, consider readability, test at various sizes."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface-secondary rounded border border-fg-08">
          <h4 className="kol-text-sm font-medium mb-2">Style Selection</h4>
          <p className="kol-mono-xs text-fg-64">Match illustration style to brand personality</p>
        </div>
        <div className="p-4 bg-surface-secondary rounded border border-fg-08">
          <h4 className="kol-text-sm font-medium mb-2">Scalability</h4>
          <p className="kol-mono-xs text-fg-64">Test designs at multiple sizes</p>
        </div>
        <div className="p-4 bg-surface-secondary rounded border border-fg-08">
          <h4 className="kol-text-sm font-medium mb-2">Color Usage</h4>
          <p className="kol-mono-xs text-fg-64">Ensure sufficient contrast in all themes</p>
        </div>
      </div>
    </div>
  )
}

export default Illustrations
