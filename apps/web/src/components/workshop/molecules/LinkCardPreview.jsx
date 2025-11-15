import { LinkCard } from '@kol/ui'

const LinkCardPreview = () => {
  return (
    <div className="space-y-16">
      {/* Component Description */}
      <div className="space-y-4">
        <h2 className="kol-heading-lg text-auto">LinkCard</h2>
        <p className="kol-mono-text text-fg-80 max-w-[800px]">
          A card molecule component with heading, description, and call-to-action link.
          Used for navigation sections, quick links, and feature highlights.
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
                <td className="py-4 pr-8">title</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">-</td>
                <td className="py-4">Card heading</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">description</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">-</td>
                <td className="py-4">Card description text</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">to</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">-</td>
                <td className="py-4">Link destination (route or URL)</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">linkLabel</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">'Learn More'</td>
                <td className="py-4">Link text</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">titleClass</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">'kol-heading-xs'</td>
                <td className="py-4">Typography class for title</td>
              </tr>
              <tr className="border-b border-fg-12">
                <td className="py-4 pr-8">descriptionClass</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">'kol-mono-xs'</td>
                <td className="py-4">Typography class for description</td>
              </tr>
              <tr>
                <td className="py-4 pr-8">className</td>
                <td className="py-4 pr-8">String</td>
                <td className="py-4 pr-8">''</td>
                <td className="py-4">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Default Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Default</h3>
        <div className="bg-surface-secondary p-8 rounded-sm max-w-[400px]">
          <LinkCard
            title="Illustrations"
            description="Browse the complete illustration portfolio featuring visual explorations and conceptual work."
            to="/collections/illustrations"
            linkLabel="View Gallery"
          />
        </div>
      </div>

      {/* Custom Typography Example */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Custom Typography</h3>
        <div className="bg-surface-secondary p-8 rounded-sm max-w-[400px]">
          <LinkCard
            title="Featured Work"
            description="Explore our latest projects and design explorations."
            to="/work"
            linkLabel="Explore Work"
            titleClass="kol-heading-narrow-sm"
            descriptionClass="kol-text-sm"
          />
        </div>
      </div>

      {/* Three Cards Layout */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Example: Three Card Layout</h3>
        <div className="bg-surface-secondary p-8 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LinkCard
              title="Illustrations"
              description="Browse the complete illustration portfolio."
              to="/collections/illustrations"
              linkLabel="View Gallery"
            />
            <LinkCard
              title="Logomarks"
              description="Explore curated logomark designs."
              to="/collections/logomarks"
              linkLabel="View Marks"
            />
            <LinkCard
              title="Motion Graphics"
              description="Discover animated design work."
              to="/collections/motion-graphics"
              linkLabel="View Motion"
            />
          </div>
        </div>
      </div>

      {/* Usage Code */}
      <div className="space-y-4">
        <h3 className="kol-heading-sm text-auto">Usage</h3>
        <div className="bg-container-primary p-8 rounded-sm">
          <pre className="kol-mono-sm text-fg-80 overflow-x-auto">
{`import { LinkCard } from '@kol/ui'

<LinkCard
  title="Illustrations"
  description="Browse the complete illustration portfolio featuring visual explorations."
  to="/collections/illustrations"
  linkLabel="View Gallery"
/>

// With custom typography
<LinkCard
  title="Featured Work"
  description="Explore our latest projects."
  to="/work"
  linkLabel="Explore Work"
  titleClass="kol-heading-narrow-sm"
  descriptionClass="kol-text-sm"
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default LinkCardPreview
