import { QuickLinksGrid } from '@kol/ui'

const QuickLinksGridPreview = () => {
  // Sample data
  const collectionsLinks = [
    {
      title: 'Illustrations',
      description: 'Browse the complete illustration portfolio featuring visual explorations and conceptual work.',
      to: '/collections/illustrations',
      linkLabel: 'View Gallery'
    },
    {
      title: 'Logomarks',
      description: 'Explore a curated selection of logomark designs and brand identity experiments.',
      to: '/collections/logomarks',
      linkLabel: 'View Marks'
    },
    {
      title: 'Motion Graphics',
      description: 'Discover animated design work and motion graphics showcasing dynamic visual storytelling.',
      to: '/collections/motion-graphics',
      linkLabel: 'View Motion'
    }
  ]

  const twoColumnLinks = [
    {
      title: 'Design System',
      description: 'Explore the complete design system with components, tokens, and guidelines.',
      to: '/styleguide',
      linkLabel: 'View System'
    },
    {
      title: 'Typography',
      description: 'Browse typography styles, scales, and font specimens.',
      to: '/styleguide/typography',
      linkLabel: 'View Typography'
    }
  ]

  const fourColumnLinks = [
    {
      title: 'Work',
      description: 'Client projects and case studies.',
      to: '/work',
      linkLabel: 'View Work'
    },
    {
      title: 'Collections',
      description: 'Curated design explorations.',
      to: '/collections',
      linkLabel: 'View Collections'
    },
    {
      title: 'Foundry',
      description: 'Custom typeface specimens.',
      to: '/foundry',
      linkLabel: 'View Foundry'
    },
    {
      title: 'Workshop',
      description: 'Component documentation.',
      to: '/workshop',
      linkLabel: 'View Workshop'
    }
  ]

  return (
    <div className="space-y-16">
      {/* Component Description */}
      <div className="space-y-4">
        <h2 className="kol-heading-lg text-auto">QuickLinksGrid</h2>
        <p className="kol-mono-text text-fg-80 max-w-[800px]">
          A responsive grid organism component that displays a collection of LinkCard components.
          Perfect for navigation sections, quick links, and feature highlights with flexible column configuration.
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
                <td className="py-4 pr-8">cards</td>
                <td className="py-4 pr-8">Array</td>
                <td className="py-4 pr-8">[]</td>
                <td className="py-4">Array of card data objects</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">columns</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">'md:grid-cols-3'</td>
                <td className="py-4">Grid column configuration (Tailwind classes)</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">gap</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">'gap-6'</td>
                <td className="py-4">Gap between cards (Tailwind class)</td>
              </tr>
              <tr>
                <td className="py-4 pr-8">className</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">''</td>
                <td className="py-4">Additional CSS classes for container</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Data Structure */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Card Data Structure</h3>
        <div className="bg-container-primary p-8 rounded-sm">
          <pre className="kol-mono-sm text-fg-80 overflow-x-auto">
{`{
  title: string,              // Required: Card heading
  description: string,         // Required: Card description
  to: string,                  // Required: Link destination
  linkLabel: string,           // Optional: Link text (default: "Learn More")
  titleClass: string,          // Optional: Typography class for title
  descriptionClass: string,    // Optional: Typography class for description
  className: string            // Optional: Additional classes for card
}`}
          </pre>
        </div>
      </div>

      {/* Three Columns Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Three Columns (Default)</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <QuickLinksGrid cards={collectionsLinks} />
        </div>
      </div>

      {/* Two Columns Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Two Columns</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <QuickLinksGrid
            cards={twoColumnLinks}
            columns="md:grid-cols-2"
          />
        </div>
      </div>

      {/* Four Columns Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Four Columns</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <QuickLinksGrid
            cards={fourColumnLinks}
            columns="md:grid-cols-2 lg:grid-cols-4"
          />
        </div>
      </div>

      {/* Custom Gap Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Custom Gap</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <QuickLinksGrid
            cards={twoColumnLinks}
            columns="md:grid-cols-2"
            gap="gap-12"
          />
        </div>
      </div>

      {/* Usage Code */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Usage</h3>
        <div className="bg-container-primary p-8 rounded-sm">
          <pre className="kol-mono-sm text-fg-80 overflow-x-auto">
{`import { QuickLinksGrid } from '@kol/ui'

const cards = [
  {
    title: 'Illustrations',
    description: 'Browse the complete illustration portfolio.',
    to: '/collections/illustrations',
    linkLabel: 'View Gallery'
  },
  {
    title: 'Logomarks',
    description: 'Explore curated logomark designs.',
    to: '/collections/logomarks',
    linkLabel: 'View Marks'
  }
]

// Three columns (default)
<QuickLinksGrid cards={cards} />

// Two columns
<QuickLinksGrid
  cards={cards}
  columns="md:grid-cols-2"
/>

// Four columns
<QuickLinksGrid
  cards={cards}
  columns="md:grid-cols-2 lg:grid-cols-4"
/>

// Custom gap
<QuickLinksGrid
  cards={cards}
  gap="gap-12"
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default QuickLinksGridPreview
