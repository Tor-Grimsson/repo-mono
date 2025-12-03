import { Icon, SectionToggle } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import SurfacePreviewGrid from '../../components/workshop/molecules/SurfacePreviewGrid'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const iconSizes = [
  { id: 'sm', label: 'Small (14px)', size: 14 },
  { id: 'md', label: 'Medium (16px)', size: 16 },
  { id: 'lg', label: 'Large (18px)', size: 18 },
  { id: 'xl', label: 'Extra Large (24px)', size: 24 }
]

const icons = [
  // Arrows
  'arrow-downright', 'arrow-left', 'arrow-right', 'arrow-up',
  'stroke-arrow-down', 'stroke-arrow-down-right',
  // Chevrons
  'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'stroke-chevron-down',
  // Actions
  'check', 'check-mark', 'cross', 'plus', 'minus',
  '12px-check', '12px-cross', '12px-minus', '12px-plus',
  'copy', 'stroke-copy', 'save', 'filter', 'rotate', 'snap',
  // Media
  'play-Play', 'play-pause', 'play-arrow-back', 'play-arrow-end', 'play-arrow-forward', 'play-arrow-start',
  // UI
  'search-16', 'search-24', 'grid', 'row', 'view-grid', 'view-list',
  'layout', 'pages', 'component', 'cone', 'wheel',
  // Design System
  'styleguide', 'foundation', 'color', 'type', 'type-foundry', 'font-03',
  'pen', 'bucket', 'contrast', 'pills', 'interactive',
  // Atomic
  'atomic-atom', 'atomic-molecule', 'atomic-organism',
  // Shapes
  'circle', 'triangle', 'diamond', 'dimond',
  // Stats
  'stat-stat', 'stat-chart-a', 'stat-chart-b', 'stat-chart-c',
  'stat-pie', 'stat-pie-c', 'stat-donut', 'stat-abacus',
  'stat-crown', 'stat-medalion', 'stat-winner', 'stat-rocket', 'stat-cycle',
  // Trending
  'trending', 'trending-up', 'trending-down', 'stroke-trending', 'bolt',
  // Dashboard
  'dashboard-roadmap', 'dashboard-book-open', 'dashboard-bookmark',
  'dashboard-dual-opponent', 'dashboard-journal', 'dashboard-manual-empty',
  // Docs
  'docs-File', 'docs-Files', 'docs-add-file', 'docs-text-01', 'docs-text-02', 'docs-text-03',
  'docs-bookmark', 'docs-clipboard-1', 'docs-clipboard-2', 'docs-edit', 'docs-write-edit',
  'docs-home-1', 'docs-home-2', 'docs-location', 'docs-user', 'docs-settings', 'docs-server',
  'docs-download', 'docs-upload', 'docs-external-link', 'docs-in-going', 'docs-out-going',
  'docs-alarm', 'docs-app', 'docs-arrow-up-down', 'docs-flag', 'docs-stop',
  'docs-heart-1', 'docs-heart-2', 'docs-layout-01', 'docs-layout-02', 'docs-layout-03',
  'docs-more-horizontal', 'docs-more-vertical', 'docs-nav-ui', 'docs-nav-ui-1',
  // Grid variants
  'grid-01', 'grid-02', 'grid-03', 'grid-04',
  // Hall of Mirrors
  'hall-of-displacement', 'hall-of-movement', 'hall-of-symphony',
  // Chess
  'chess-pawn', 'chess-rook', 'stroke-chess-pawn', 'stroke-chess-rook',
  'white-pawn', 'white-bishop', 'white-knight', 'white-hrook', 'white-queen', 'white-king',
  'black-pawn', 'black-bishop', 'black-knight', 'black-hrook', 'black-queen', 'black-king',
  // Time
  'clock', 'stopwatch',
  // Flags
  'flag-gb', 'flag-is',
  // Misc
  'logo', 'frequency', 'theme-toggle'
]

const sections = [
  { id: 'icon-sizes', label: 'Icon Sizes' },
  { id: 'icon-library', label: 'Icon Library' },
  { id: 'usage-examples', label: 'Usage Examples' },
  { id: 'code-examples', label: 'Code Examples' }
]

const SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

export default function Icons() {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('foundations-icons', SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Icons"
        subtitle="SVG icons that scale with typography and inherit text color. Add more icons to packages/ui/src/atoms/icons/svg/"
      />

      <div className="space-y-8">
        <div className="space-y-4">
          <SectionToggle
            label="Icon Sizes"
            isExpanded={expandedSections['icon-sizes']}
            onToggle={() => toggleSection('icon-sizes')}
          />
          {expandedSections['icon-sizes'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Icon Sizes"
                description="Icons scale to match typography sizes with consistent sizing. Default size: 16px (matches body text)."
              />
              <SurfacePreviewGrid>
                <SurfacePreviewGrid.Surface label="Default surface">
                  <div className="space-y-6 py-4">
                    {iconSizes.map((iconSize) => (
                      <div key={iconSize.id} className="space-y-2">
                        <div className="kol-mono-xs text-fg-48">{iconSize.label}</div>
                        <div className="flex items-center gap-6">
                          <Icon name="arrow-downright" size={iconSize.size} />
                          <Icon name="arrow-up" size={iconSize.size} />
                          <span className="kol-mono-xs text-fg-64">Icon inherits text color</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </SurfacePreviewGrid.Surface>
                <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
                  <div className="space-y-6 py-4">
                    {iconSizes.map((iconSize) => (
                      <div key={iconSize.id} className="space-y-2">
                        <div className="kol-mono-xs text-fg-48">{iconSize.label}</div>
                        <div className="flex items-center gap-6">
                          <Icon name="arrow-downright" size={iconSize.size} />
                          <Icon name="arrow-up" size={iconSize.size} />
                          <span className="kol-mono-xs text-fg-64">Icon inherits text color</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </SurfacePreviewGrid.Surface>
              </SurfacePreviewGrid>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <SectionToggle
            label="Icon Library"
            isExpanded={expandedSections['icon-library']}
            onToggle={() => toggleSection('icon-library')}
          />
          {expandedSections['icon-library'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Icon Library"
                description="All available icons with default sizing (16px)"
              />
              <SurfacePreviewGrid>
                <SurfacePreviewGrid.Surface label="Default surface">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 py-4">
                    {icons.map((icon) => (
                      <div key={icon} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-fg-04 transition-colors">
                        <Icon name={icon} size={20} />
                        <span className="kol-mono-xs text-fg-48 text-center break-all text-[9px]">{icon}</span>
                      </div>
                    ))}
                  </div>
                </SurfacePreviewGrid.Surface>
                <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 py-4">
                    {icons.map((icon) => (
                      <div key={icon} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-fg-04 transition-colors">
                        <Icon name={icon} size={20} />
                        <span className="kol-mono-xs text-fg-48 text-center break-all text-[9px]">{icon}</span>
                      </div>
                    ))}
                  </div>
                </SurfacePreviewGrid.Surface>
              </SurfacePreviewGrid>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <SectionToggle
            label="Usage Examples"
            isExpanded={expandedSections['usage-examples']}
            onToggle={() => toggleSection('usage-examples')}
          />
          {expandedSections['usage-examples'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Usage Examples"
                description="Icons can be used inline with text or standalone"
              />
              <SurfacePreviewGrid>
                <SurfacePreviewGrid.Surface label="Default surface">
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <div className="kol-mono-xs text-fg-48">Inline with text</div>
                      <p className="kol-mono-text flex items-center gap-2">
                        <Icon name="arrow-up" size={16} />
                        Scroll to top
                      </p>
                      <p className="kol-mono-text flex items-center gap-2">
                        View project
                        <Icon name="arrow-downright" size={16} />
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="kol-mono-xs text-fg-48">Custom color</div>
                      <div className="flex items-center gap-4">
                        <Icon name="arrow-up" size={24} className="text-accent-primary" />
                        <Icon name="arrow-downright" size={24} className="text-status-danger" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="kol-mono-xs text-fg-48">With opacity</div>
                      <div className="flex items-center gap-4">
                        <Icon name="arrow-up" size={24} className="opacity-60" />
                        <Icon name="arrow-downright" size={24} className="opacity-40" />
                        <Icon name="arrow-up" size={24} className="opacity-20" />
                      </div>
                    </div>
                  </div>
                </SurfacePreviewGrid.Surface>
                <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <div className="kol-mono-xs text-fg-48">Inline with text</div>
                      <p className="kol-mono-text flex items-center gap-2">
                        <Icon name="arrow-up" size={16} />
                        Scroll to top
                      </p>
                      <p className="kol-mono-text flex items-center gap-2">
                        View project
                        <Icon name="arrow-downright" size={16} />
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="kol-mono-xs text-fg-48">Custom color</div>
                      <div className="flex items-center gap-4">
                        <Icon name="arrow-up" size={24} className="text-accent-primary" />
                        <Icon name="arrow-downright" size={24} className="text-status-danger" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="kol-mono-xs text-fg-48">With opacity</div>
                      <div className="flex items-center gap-4">
                        <Icon name="arrow-up" size={24} className="opacity-60" />
                        <Icon name="arrow-downright" size={24} className="opacity-40" />
                        <Icon name="arrow-up" size={24} className="opacity-20" />
                      </div>
                    </div>
                  </div>
                </SurfacePreviewGrid.Surface>
              </SurfacePreviewGrid>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <SectionToggle
            label="Code Examples"
            isExpanded={expandedSections['code-examples']}
            onToggle={() => toggleSection('code-examples')}
          />
          {expandedSections['code-examples'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Code Examples"
                description="How to use icons in your components"
              />
              <div className="rounded-lg p-6 bg-fg-02 border border-fg-08">
                <pre className="kol-mono-xs text-auto">
{`import { Icon } from '@kol/ui'

// Default size (16px)
<Icon name="arrow-up" />

// Custom size
<Icon name="arrow-up" size={24} />

// With custom styling
<Icon
  name="arrow-up"
  size={20}
  className="text-accent-primary"
/>

// Inline with text
<span className="flex items-center gap-2">
  <Icon name="arrow-up" size={16} />
  Scroll to top
</span>

// Add new icons: Drop SVG in packages/ui/src/atoms/icons/svg/
// Filename becomes the name prop (e.g., close.svg → name="close")`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
