import { FeaturedItemsCarousel, Logomark, Illustration, Grid } from '@kol/ui'

const FeaturedItemsCarouselPreview = () => {
  // Sample items for demonstration
  const sampleItems = [
    {
      name: 'Kolkrabbi Logo',
      type: 'Logomark',
      subtitle: 'Brand Identity',
      description: 'Primary brand logomark featuring geometric shapes and bold typography.',
      route: '/collections/logomarks',
      logoName: 'kolkrabbi-logo',
      badgeVariant: 'subtle',
      badgeSize: 'sm'
    },
    {
      name: 'Abstract Composition',
      type: 'Illustration',
      subtitle: 'Digital Art',
      description: 'Experimental illustration exploring color theory and geometric patterns.',
      route: '/collections/illustrations',
      illustrationName: '01',
      badgeVariant: 'subtle',
      badgeSize: 'sm'
    },
    {
      name: 'Typography System',
      type: 'Design System',
      subtitle: 'Interface Design',
      description: 'Comprehensive typography system with fluid responsive scaling.',
      route: '/styleguide/typography',
      badgeVariant: 'inverse',
      badgeSize: 'sm'
    }
  ]

  const heroPreviewItems = [
    {
      name: 'Flík Wordmark',
      type: 'Logomark',
      subtitle: 'Directional identity',
      description: 'Wordmark set on a monochrome gallery background.',
      route: '/collections/logomarks',
      logoName: 'flik',
      layout: {
        backgroundImage: '/img/carousel/logos/collection-logo-flik.png'
      }
    },
    {
      name: 'Alternate Grid',
      type: 'Grid',
      subtitle: 'System preview',
      description: 'Grid layouts with responsive spacing tokens.',
      route: '/collections/grids',
      itemType: 'grid',
      gridName: 'grid-01',
      layout: { reverse: true }
    }
  ]

  // Render content based on item type
  const renderContent = (item) => {
    if (item.logoName) {
      return (
        <Logomark
          name={item.logoName}
          size={item.subtitle === 'Wordmark' ? 200 : 160}
        />
      )
    }
    if (item.illustrationName) {
      return (
        <Illustration
          name={item.illustrationName}
          size={400}
        />
      )
    }
    if (item.gridName) {
      return (
        <Grid
          name={item.gridName}
          size={400}
        />
      )
    }
    // Fallback content
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center space-y-4">
          <div className="kol-display-subsection text-auto opacity-20">
            {item.type}
          </div>
          <p className="kol-mono-sm text-fg-64">Preview content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      {/* Component Description */}
      <div className="space-y-4">
        <h2 className="kol-heading-lg text-auto">FeaturedItemsCarousel</h2>
        <p className="kol-mono-text text-fg-80 max-w-[800px]">
          A rotating carousel organism for showcasing featured items with auto-rotation,
          manual navigation, and flexible content rendering. Displays metadata, preview content,
          and call-to-action for each item.
        </p>
      </div>

      {/* Props Documentation */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Props</h3>
        <div className="bg-container-primary p-8 rounded-sm overflow-x-auto">
          <table className="w-full kol-mono-sm text-auto">
            <thead>
              <tr className="border-b border-fg-24">
                <th className="text-left pb-4 pr-8">Prop</th>
                <th className="text-left pb-4 pr-8">Type</th>
                <th className="text-left pb-4 pr-8">Default</th>
                <th className="text-left pb-4">Description</th>
              </tr>
            </thead>
            <tbody className="text-fg-80">
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">items</td>
                <td className="py-4 pr-8">Array</td>
                <td className="py-4 pr-8">[]</td>
                <td className="py-4">Array of items to display in carousel</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">renderContent</td>
                <td className="py-4 pr-8">Function</td>
                <td className="py-4 pr-8">-</td>
                <td className="py-4">Function to render item content: (item) =&gt; ReactNode</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">autoRotate</td>
                <td className="py-4 pr-8">Boolean</td>
                <td className="py-4 pr-8">true</td>
                <td className="py-4">Enable auto-rotation</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">interval</td>
                <td className="py-4 pr-8">Number</td>
                <td className="py-4 pr-8">5000</td>
                <td className="py-4">Auto-rotation interval in milliseconds</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">counterLabel</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">'Featured Work'</td>
                <td className="py-4">Label for the counter section</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">className</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">''</td>
                <td className="py-4">Additional CSS classes for container</td>
              </tr>
              <tr>
                <td className="py-4 pr-8">layout</td>
                <td className="py-4 pr-8">Object</td>
                <td className="py-4 pr-8">{`{contentHeight: '500px', variant: 'classic'}`}</td>
                <td className="py-4">Layout configuration (contentHeight, variant, background image, etc.)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Structure Documentation */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Item Structure</h3>
        <div className="bg-container-primary p-8 rounded-sm">
          <pre className="kol-mono-sm text-fg-80 overflow-x-auto">
{`{
  name: string,           // Item title
  type: string,           // Item type (for badge)
  subtitle: string,       // Item subtitle
  description: string,    // Item description
  route: string,          // Link destination
  linkLabel: string,      // Optional: Custom link text
  badgeVariant: string,   // Optional: Pill variant
  badgeSize: string,      // Optional: Pill size
  // ... any custom fields for renderContent
  layout: {
    variant?: 'classic' | 'hero',
    reverse?: boolean,
    backgroundImage?: string,
    mediaFill?: boolean,
    mediaShift?: string
  }
}`}
          </pre>
        </div>
      </div>

      {/* Default Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Default Configuration</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <FeaturedItemsCarousel
            items={sampleItems}
            renderContent={renderContent}
            autoRotate={true}
            interval={5000}
          />
        </div>
      </div>

      {/* Fast Rotation Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Fast Rotation (2s)</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <FeaturedItemsCarousel
            items={sampleItems}
            renderContent={renderContent}
            autoRotate={true}
            interval={2000}
            counterLabel="Quick Rotation"
          />
        </div>
      </div>

      {/* Manual Only Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Manual Navigation Only</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <FeaturedItemsCarousel
            items={sampleItems}
            renderContent={renderContent}
            autoRotate={false}
            counterLabel="Manual Control"
          />
        </div>
      </div>

      {/* Hero Variant Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Hero Layout Variant</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <FeaturedItemsCarousel
            items={heroPreviewItems}
            renderContent={renderContent}
            autoRotate={false}
            counterLabel="Hero Layout"
            layout={{ variant: 'hero', contentHeight: '520px' }}
          />
        </div>
      </div>

      {/* Usage Code */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Usage</h3>
        <div className="bg-container-primary p-8 rounded-sm">
          <pre className="kol-mono-sm text-fg-80 overflow-x-auto">
{`import { FeaturedItemsCarousel } from '@kol/ui'

const items = [
  {
    name: 'Item Title',
    type: 'Category',
    subtitle: 'Item Subtitle',
    description: 'Item description text...',
    route: '/path/to/collection',
    // ... custom fields for rendering
  }
]

const renderContent = (item) => {
  // Render item content based on type
  return <div>{item.name}</div>
}

<FeaturedItemsCarousel
  items={items}
  renderContent={renderContent}
  autoRotate={true}
  interval={5000}
  counterLabel="Featured Work"
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default FeaturedItemsCarouselPreview
