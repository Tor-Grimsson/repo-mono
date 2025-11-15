import { CollectionGrid } from '@kol/ui'

export default function CollectionGridPreview() {
  // Sample illustration items
  const sampleIllustrations = [
    {
      id: 1,
      name: 'Abstract Composition',
      description: 'Geometric forms in vibrant colors',
      illustrationName: 'abstract-composition',
      type: 'Digital',
      year: '2024'
    },
    {
      id: 2,
      name: 'Urban Landscape',
      description: 'City architecture study',
      illustrationName: 'urban-landscape',
      type: 'Vector',
      year: '2024'
    },
    {
      id: 3,
      name: 'Nature Series',
      description: 'Organic forms and patterns',
      illustrationName: 'nature-series',
      type: 'Digital',
      year: '2023'
    },
    {
      id: 4,
      name: 'Portrait Study',
      description: 'Character design exploration',
      illustrationName: 'portrait-study',
      type: 'Digital',
      year: '2024'
    },
    {
      id: 5,
      name: 'Tech Concept',
      description: 'Futuristic technology visualization',
      illustrationName: 'tech-concept',
      type: 'Vector',
      year: '2023'
    },
    {
      id: 6,
      name: 'Minimal Forms',
      description: 'Clean geometric design',
      illustrationName: 'minimal-forms',
      type: 'Vector',
      year: '2024'
    },
    {
      id: 7,
      name: 'Color Study',
      description: 'Exploration of color theory',
      illustrationName: 'color-study',
      type: 'Digital',
      year: '2023'
    },
    {
      id: 8,
      name: 'Space Theme',
      description: 'Cosmic exploration',
      illustrationName: 'space-theme',
      type: 'Digital',
      year: '2024'
    },
    {
      id: 9,
      name: 'Retro Wave',
      description: '80s aesthetic design',
      illustrationName: 'retro-wave',
      type: 'Vector',
      year: '2023'
    },
    {
      id: 10,
      name: 'Organic Shapes',
      description: 'Flowing natural forms',
      illustrationName: 'organic-shapes',
      type: 'Digital',
      year: '2024'
    },
    {
      id: 11,
      name: 'Architectural',
      description: 'Building structure study',
      illustrationName: 'architectural',
      type: 'Vector',
      year: '2023'
    },
    {
      id: 12,
      name: 'Pattern Design',
      description: 'Repeating motifs',
      illustrationName: 'pattern-design',
      type: 'Digital',
      year: '2024'
    }
  ]

  // Sample logomark items
  const sampleLogomarks = [
    {
      id: 1,
      name: 'Tech Startup',
      description: 'Modern technology logo',
      logoName: 'tech-startup',
      type: 'Symbol',
      year: '2024'
    },
    {
      id: 2,
      name: 'Coffee Shop',
      description: 'Friendly cafe branding',
      logoName: 'coffee-shop',
      type: 'Wordmark',
      year: '2023'
    },
    {
      id: 3,
      name: 'Fitness Brand',
      description: 'Active lifestyle logo',
      logoName: 'fitness-brand',
      type: 'Symbol',
      year: '2024'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Component Info */}
      <div className="space-y-4">
        <div>
          <h2 className="kol-heading-lg mb-2">CollectionGrid</h2>
          <p className="kol-mono-sm text-fg-64">
            Responsive grid organism for displaying collection items (illustrations, logomarks) with built-in "load more" functionality.
          </p>
        </div>

        {/* Props Table */}
        <div className="bg-container-primary p-6 rounded-sm space-y-4">
          <h3 className="kol-heading-sm">Props</h3>
          <div className="space-y-3 kol-mono-xs">
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">illustrations</span>
              <span className="text-fg-64">Array of illustration items (mutually exclusive with logomarks)</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">logomarks</span>
              <span className="text-fg-64">Array of logomark items (mutually exclusive with illustrations)</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">initialLimit</span>
              <span className="text-fg-64">Number of items to show initially (default: 9)</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2">
              <span className="text-auto font-medium">showLoadMore</span>
              <span className="text-fg-64">Enable "Show all" button (default: true)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example 1: Default with 12 illustrations (shows 9) */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Default Behavior (9 items, with load more)</h3>
          <p className="kol-mono-xs text-fg-64">
            Shows 9 items initially with "Show all" button when more items exist
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <CollectionGrid illustrations={sampleIllustrations} />
        </div>
      </div>

      {/* Example 2: Custom initial limit */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Custom Initial Limit (6 items)</h3>
          <p className="kol-mono-xs text-fg-64">
            Shows 6 items initially instead of default 9
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <CollectionGrid illustrations={sampleIllustrations} initialLimit={6} />
        </div>
      </div>

      {/* Example 3: Logomarks */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Logomarks Grid</h3>
          <p className="kol-mono-xs text-fg-64">
            Works with logomarks, no load more button (only 3 items)
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <CollectionGrid logomarks={sampleLogomarks} />
        </div>
      </div>

      {/* Example 4: Load more disabled */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Load More Disabled</h3>
          <p className="kol-mono-xs text-fg-64">
            Shows all 12 items at once with showLoadMore=false
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <CollectionGrid illustrations={sampleIllustrations} showLoadMore={false} />
        </div>
      </div>

      {/* Usage Code */}
      <div className="space-y-4">
        <h3 className="kol-heading-md">Usage</h3>
        <pre className="bg-container-primary p-6 rounded-sm overflow-x-auto">
          <code className="kol-mono-xs text-fg-64">{`import { CollectionGrid } from '@kol/ui'

// With illustrations
const illustrations = [
  {
    id: 1,
    name: 'Abstract Composition',
    description: 'Geometric forms in vibrant colors',
    illustrationName: 'abstract-composition',
    type: 'Digital',
    year: '2024'
  },
  // ... more items
]

<CollectionGrid illustrations={illustrations} />

// With logomarks
const logomarks = [
  {
    id: 1,
    name: 'Tech Startup',
    description: 'Modern technology logo',
    logoName: 'tech-startup',
    type: 'Symbol',
    year: '2024'
  },
  // ... more items
]

<CollectionGrid logomarks={logomarks} />

// Custom settings
<CollectionGrid
  illustrations={illustrations}
  initialLimit={12}
  showLoadMore={true}
/>`}</code>
        </pre>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="kol-heading-md">Features</h3>
        <ul className="space-y-2 kol-mono-sm text-fg-64 list-disc list-inside">
          <li>Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)</li>
          <li>Built-in "Show all" button when items exceed initial limit</li>
          <li>Automatic type detection (illustrations vs logomarks)</li>
          <li>Customizable initial item limit</li>
          <li>Optional load more functionality</li>
          <li>Uses CollectionCard molecule for consistent item rendering</li>
          <li>Smooth state management for expanding/collapsing</li>
        </ul>
      </div>
    </div>
  )
}
