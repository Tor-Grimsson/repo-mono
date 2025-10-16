import { Icon } from '@kol/ui'

const iconSizes = [
  { id: 'sm', label: 'Small (14px)', size: 14 },
  { id: 'md', label: 'Medium (16px)', size: 16 },
  { id: 'lg', label: 'Large (18px)', size: 18 },
  { id: 'xl', label: 'Extra Large (24px)', size: 24 }
]

const icons = [
  { id: 'arrow-downright', label: 'Arrow Down Right' },
  { id: 'arrow-up', label: 'Arrow Up' }
]

export default function Icons() {
  return (
    <div className="space-y-12">
      {/* Icon Sizes */}
      <div className="space-y-6">
        <div>
          <h3 className="kol-heading-sm mb-2">Icon Sizes</h3>
          <p className="kol-mono-xs">
            Icons scale to match typography sizes with consistent sizing
          </p>
          <p className="kol-mono-xxs opacity-60 mt-2">
            Default size: 16px (matches body text)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Surface */}
          <div
            className="rounded-lg p-8 space-y-6 opacity-10-border border-auto"
            style={{
              backgroundColor: 'var(--surface-primary)',
              color: 'var(--foreground)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="kol-mono-xs uppercase opacity-60">Primary Surface</div>

            {iconSizes.map((iconSize) => (
              <div key={iconSize.id} className="space-y-3">
                <div className="kol-mono-xs opacity-60">{iconSize.label}</div>
                <div className="flex items-center gap-6">
                  <Icon name="arrow-downright" size={iconSize.size} />
                  <Icon name="arrow-up" size={iconSize.size} />
                  <span className="kol-mono-xs">Icon inherits text color</span>
                </div>
              </div>
            ))}
          </div>

          {/* Inverse Surface */}
          <div className="rounded-lg p-8 space-y-6 bg-surface-inverse">
            <div className="kol-mono-xs uppercase opacity-60">Inverse Surface</div>

            {iconSizes.map((iconSize) => (
              <div key={iconSize.id} className="space-y-3">
                <div className="kol-mono-xs opacity-60">{iconSize.label}</div>
                <div className="flex items-center gap-6">
                  <Icon name="arrow-downright" size={iconSize.size} />
                  <Icon name="arrow-up" size={iconSize.size} />
                  <span className="kol-mono-xs">Icon inherits text color</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Icon Library */}
      <div className="space-y-6">
        <div>
          <h3 className="kol-heading-sm mb-2">Icon Library</h3>
          <p className="kol-mono-xs">
            All available icons with default sizing (16px)
          </p>
          <p className="kol-mono-xxs opacity-60 mt-2">
            Add more icons to packages/ui/src/atoms/icons/svg/
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Surface */}
          <div
            className="rounded-lg p-8 space-y-4 opacity-10-border border-auto"
            style={{
              backgroundColor: 'var(--surface-primary)',
              color: 'var(--foreground)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            {icons.map((icon) => (
              <div key={icon.id} className="flex items-center gap-4">
                <Icon name={icon.id} size={16} />
                <span className="kol-mono-xs">{icon.label}</span>
              </div>
            ))}
          </div>

          {/* Inverse Surface */}
          <div className="rounded-lg p-8 space-y-4 bg-surface-inverse">
            {icons.map((icon) => (
              <div key={icon.id} className="flex items-center gap-4">
                <Icon name={icon.id} size={16} />
                <span className="kol-mono-xs">{icon.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-6">
        <div>
          <h3 className="kol-heading-sm mb-2">Usage Examples</h3>
          <p className="kol-mono-xs">
            Icons can be used inline with text or standalone
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Surface */}
          <div
            className="rounded-lg p-8 space-y-6 opacity-10-border border-auto"
            style={{
              backgroundColor: 'var(--surface-primary)',
              color: 'var(--foreground)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="space-y-3">
              <div className="kol-mono-xs opacity-60">Inline with text</div>
              <p className="kol-mono-text flex items-center gap-2">
                <Icon name="arrow-up" size={16} />
                Scroll to top
              </p>
              <p className="kol-mono-text flex items-center gap-2">
                View project
                <Icon name="arrow-downright" size={16} />
              </p>
            </div>

            <div className="space-y-3">
              <div className="kol-mono-xs opacity-60">Custom color</div>
              <div className="flex items-center gap-4">
                <Icon name="arrow-up" size={24} style={{ color: 'var(--accent-primary)' }} />
                <Icon name="arrow-downright" size={24} style={{ color: 'var(--status-danger)' }} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="kol-mono-xs opacity-60">With opacity</div>
              <div className="flex items-center gap-4">
                <Icon name="arrow-up" size={24} style={{ opacity: 0.6 }} />
                <Icon name="arrow-downright" size={24} style={{ opacity: 0.4 }} />
                <Icon name="arrow-up" size={24} style={{ opacity: 0.2 }} />
              </div>
            </div>
          </div>

          {/* Inverse Surface */}
          <div className="rounded-lg p-8 space-y-6 bg-surface-inverse">
            <div className="space-y-3">
              <div className="kol-mono-xs opacity-60">Inline with text</div>
              <p className="kol-mono-text flex items-center gap-2">
                <Icon name="arrow-up" size={16} />
                Scroll to top
              </p>
              <p className="kol-mono-text flex items-center gap-2">
                View project
                <Icon name="arrow-downright" size={16} />
              </p>
            </div>

            <div className="space-y-3">
              <div className="kol-mono-xs opacity-60">Custom color</div>
              <div className="flex items-center gap-4">
                <Icon name="arrow-up" size={24} style={{ color: 'var(--accent-primary)' }} />
                <Icon name="arrow-downright" size={24} style={{ color: 'var(--status-danger)' }} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="kol-mono-xs opacity-60">With opacity</div>
              <div className="flex items-center gap-4">
                <Icon name="arrow-up" size={24} style={{ opacity: 0.6 }} />
                <Icon name="arrow-downright" size={24} style={{ opacity: 0.4 }} />
                <Icon name="arrow-up" size={24} style={{ opacity: 0.2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-6">
        <div>
          <h3 className="kol-heading-sm mb-2">Code Examples</h3>
          <p className="kol-mono-xs">
            How to use icons in your components
          </p>
        </div>

        <div
          className="rounded-lg p-6 opacity-10-border border-auto"
          style={{
            backgroundColor: 'var(--surface-primary)',
            color: 'var(--foreground)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <pre className="kol-mono-xs">
{`import { Icon } from '@kol/ui'

// Default size (16px)
<Icon name="arrow-up" />

// Custom size
<Icon name="arrow-up" size={24} />

// With custom styling
<Icon
  name="arrow-up"
  size={20}
  style={{ color: 'var(--accent-primary)' }}
  className="custom-class"
/>

// Inline with text
<span className="flex items-center gap-2">
  <Icon name="arrow-up" size={16} />
  Scroll to top
</span>

// Add new icons: Just drop SVG in packages/ui/src/atoms/icons/svg/
// Filename becomes the name prop (e.g., close.svg → name="close")`}
          </pre>
        </div>
      </div>
    </div>
  )
}
