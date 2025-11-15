import { useState } from 'react'
import { CollectionCard } from '@kol/ui'

export default function CollectionCardPreview() {
  const [selectedCard, setSelectedCard] = useState(null)

  // Sample illustration item
  const sampleIllustration = {
    id: 1,
    name: 'Cyber Fox',
    description: 'Digital illustration exploring neon aesthetics',
    illustrationName: 'cyber-fox',
    type: 'Digital',
    year: '2024'
  }

  // Sample logomark item
  const sampleLogomark = {
    id: 2,
    name: 'Flík',
    description: 'Brand identity for Icelandic design studio',
    logoName: 'flik',
    type: 'Symbol',
    year: '2023'
  }

  // Sample video item
  const sampleVideo = {
    id: 3,
    title: 'Geometric Patterns',
    subtitle: 'Procedural animation study',
    description: 'Exploration of geometric patterns using noise and feedback loops',
    type: 'Generative',
    year: '2024',
    touchDesigner: {
      patchName: 'geometric_patterns_v01.toe',
      version: '2023.11880'
    }
  }

  return (
    <div className="space-y-8">
      {/* Component Info */}
      <div className="space-y-4">
        <div>
          <h2 className="kol-heading-lg mb-2">CollectionCard</h2>
          <p className="kol-mono-sm text-fg-64">
            Versatile card molecule for displaying collection items (illustrations, logomarks, videos) with hover interactions and metadata overlay.
          </p>
        </div>

        {/* Props Table */}
        <div className="bg-container-primary p-6 rounded-sm space-y-4">
          <h3 className="kol-heading-sm">Props</h3>
          <div className="space-y-3 kol-mono-xs">
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">item</span>
              <span className="text-fg-64">Item data object (required)</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">type</span>
              <span className="text-fg-64">'illustration' | 'logomark' | 'video' (default: 'illustration')</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">onClick</span>
              <span className="text-fg-64">Optional click handler function</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2 border-b border-fg-08">
              <span className="text-auto font-medium">renderPreview</span>
              <span className="text-fg-64">Custom preview renderer function (item, isHovered) =&gt; JSX</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-4 py-2">
              <span className="text-auto font-medium">backgroundColor</span>
              <span className="text-fg-64">Optional background class override</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example 1: Illustration Card */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Illustration Card</h3>
          <p className="kol-mono-xs text-fg-64">
            Square aspect ratio with centered illustration, scales on hover
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <div className="max-w-[400px]">
            <CollectionCard
              item={sampleIllustration}
              type="illustration"
            />
          </div>
        </div>
      </div>

      {/* Example 2: Logomark Card */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Logomark Card</h3>
          <p className="kol-mono-xs text-fg-64">
            Square aspect ratio with centered logomark, scales on hover
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <div className="max-w-[400px]">
            <CollectionCard
              item={sampleLogomark}
              type="logomark"
            />
          </div>
        </div>
      </div>

      {/* Example 3: Video Card */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Video Card (Placeholder)</h3>
          <p className="kol-mono-xs text-fg-64">
            Video aspect ratio (16:9) with play button placeholder, shows TD pill badge
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <div className="max-w-[500px]">
            <CollectionCard
              item={sampleVideo}
              type="video"
              onClick={() => setSelectedCard(sampleVideo)}
              backgroundColor="bg-surface-secondary"
            />
          </div>
        </div>
      </div>

      {/* Example 4: Grid Layout */}
      <div className="space-y-4">
        <div>
          <h3 className="kol-heading-md mb-2">Grid Layout</h3>
          <p className="kol-mono-xs text-fg-64">
            Multiple cards in a responsive grid
          </p>
        </div>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CollectionCard
              item={sampleIllustration}
              type="illustration"
            />
            <CollectionCard
              item={sampleLogomark}
              type="logomark"
            />
            <CollectionCard
              item={sampleVideo}
              type="video"
              onClick={() => console.log('Video clicked')}
              backgroundColor="bg-surface-secondary"
            />
          </div>
        </div>
      </div>

      {/* Usage Code */}
      <div className="space-y-4">
        <h3 className="kol-heading-md">Usage</h3>
        <pre className="bg-container-primary p-6 rounded-sm overflow-x-auto">
          <code className="kol-mono-xs text-fg-64">{`import { CollectionCard } from '@kol/ui'

// Illustration
const illustration = {
  name: 'Cyber Fox',
  description: 'Digital illustration exploring neon aesthetics',
  illustrationName: 'cyber-fox',
  type: 'Digital',
  year: '2024'
}

<CollectionCard
  item={illustration}
  type="illustration"
/>

// Logomark
const logomark = {
  name: 'Flík',
  description: 'Brand identity for studio',
  logoName: 'flik',
  type: 'Symbol',
  year: '2023'
}

<CollectionCard
  item={logomark}
  type="logomark"
/>

// Video with custom preview
<CollectionCard
  item={video}
  type="video"
  onClick={() => console.log('Video clicked')}
  backgroundColor="bg-surface-secondary"
  renderPreview={(item, isHovered) => (
    <VideoThumbnail
      videoUrl={item.videoUrl}
      isHovered={isHovered}
    />
  )}
/>`}</code>
        </pre>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="kol-heading-md">Features</h3>
        <ul className="space-y-2 kol-mono-sm text-fg-64 list-disc list-inside">
          <li>Supports three types: illustration, logomark, video</li>
          <li>Hover overlay with smooth opacity transition</li>
          <li>Scale animation on hover (illustrations & logomarks)</li>
          <li>Automatic aspect ratio based on type (square or video)</li>
          <li>Optional click handler for interactive cards</li>
          <li>Custom preview renderer for complex content</li>
          <li>Metadata display: title/name, description/subtitle, tags</li>
          <li>Optional badge support (e.g., TD pill for Touch Designer)</li>
          <li>Accessible button or div wrapper based on interaction</li>
        </ul>
      </div>

      {/* Data Structure */}
      <div className="space-y-4">
        <h3 className="kol-heading-md">Data Structure</h3>
        <pre className="bg-container-primary p-6 rounded-sm overflow-x-auto">
          <code className="kol-mono-xs text-fg-64">{`// Illustration item
{
  id: number,
  name: string,
  description: string,
  illustrationName: string,  // for <Illustration> component
  type: string,
  year: string
}

// Logomark item
{
  id: number,
  name: string,
  description: string,
  logoName: string,           // for <Logomark> component
  type: string,               // 'Wordmark' gets special sizing
  year: string
}

// Video item
{
  id: number,
  title: string,
  subtitle: string,
  type: string,
  year: string,
  touchDesigner?: object      // optional, shows TD pill badge
}`}</code>
        </pre>
      </div>
    </div>
  )
}
