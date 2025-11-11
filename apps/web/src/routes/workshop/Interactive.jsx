import { LinkWithIcon } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const Interactive = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Interactive Components"
        subtitle="Reusable interactive elements and patterns"
      />

      {/* LinkWithIcon Section */}
      <section className="space-y-6">
        <div>
          <h2 className="kol-heading-md text-auto mb-2">LinkWithIcon</h2>
          <p className="kol-text-md text-fg-64">
            A styled link component with an animated icon
          </p>
        </div>

        <div className="bg-container-primary p-8 rounded space-y-6">
          <div>
            <div className="kol-mono-xs text-fg-48 mb-4">Default (arrow-right)</div>
            <LinkWithIcon to="/workshop/foundations">
              Explore Typeface
            </LinkWithIcon>
          </div>

          <div className="w-full h-[1px] bg-fg-08" />

          <div>
            <div className="kol-mono-xs text-fg-48 mb-4">Custom Icon (arrow-downright)</div>
            <LinkWithIcon to="/workshop/foundations" iconName="arrow-downright">
              View Documentation
            </LinkWithIcon>
          </div>

          <div className="w-full h-[1px] bg-fg-08" />

          <div>
            <div className="kol-mono-xs text-fg-48 mb-4">Larger Icon (16px)</div>
            <LinkWithIcon to="/workshop/foundations" iconSize={16}>
              Learn More
            </LinkWithIcon>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Props</div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-fg-64 pb-2 border-b border-fg-16">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>to</div>
              <div className="text-fg-64">string</div>
              <div className="text-fg-48">required</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>children</div>
              <div className="text-fg-64">ReactNode</div>
              <div className="text-fg-48">required</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>iconName</div>
              <div className="text-fg-64">string</div>
              <div className="text-fg-48">'arrow-right'</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>iconSize</div>
              <div className="text-fg-64">number</div>
              <div className="text-fg-48">12</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>className</div>
              <div className="text-fg-64">string</div>
              <div className="text-fg-48">''</div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
          <pre className="kol-mono-sm text-auto overflow-x-auto">
{`import { LinkWithIcon } from '@kol/ui'

<LinkWithIcon to="/path">
  Explore Typeface
</LinkWithIcon>

<LinkWithIcon to="/path" iconName="arrow-downright" iconSize={16}>
  View Documentation
</LinkWithIcon>`}
          </pre>
        </div>
      </section>
    </div>
  )
}

export default Interactive
