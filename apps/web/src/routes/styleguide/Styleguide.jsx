import { Pill, Button, Checkbox } from '@kol/ui'
import { Link } from 'react-router-dom'

const StyleguideMain = () => {
  // Most used typography classes with their specs
  const topTypography = [
    { class: 'kol-mono-xs', font: 'RG Mono', weight: 470, sizeMin: '10px', sizeMax: '14px', lh: '120%', uses: 413 },
    { class: 'kol-mono-text', font: 'RG Mono', weight: 470, sizeMin: '14px', sizeMax: '18px', lh: '125%', uses: 86 },
    { class: 'kol-mono-sm', font: 'RG Mono', weight: 470, sizeMin: '12px', sizeMax: '16px', lh: '125%', uses: 86 },
    { class: 'kol-heading-sm', font: 'RG Tight', weight: 500, sizeMin: '20px', sizeMax: '32px', lh: '100%', uses: 78 },
    { class: 'kol-helper-xs', font: 'RG Mono', weight: 470, size: '12px', lh: '100%', uses: 73 },
    { class: 'kol-heading-lg', font: 'RG Narrow', weight: 500, sizeMin: '32px', sizeMax: '48px', lh: '110%', uses: 33 },
    { class: 'kol-text-lg', font: 'Inter Tight', weight: 400, sizeMin: '18px', sizeMax: '20px', lh: '160%', uses: 22 },
    { class: 'kol-text-md', font: 'Inter Tight', weight: 400, sizeMin: '14px', sizeMax: '18px', lh: '160%', uses: 14 },
    { class: 'kol-heading-md', font: 'RG Narrow', weight: 500, sizeMin: '28px', sizeMax: '40px', lh: '120%', uses: 20 },
    { class: 'kol-display-section', font: 'RG Tight', weight: 500, sizeMin: '40px', sizeMax: '64px', lh: '100%', uses: 11 },
    { class: 'kol-mono-xxs', font: 'RG Mono', weight: 470, sizeMin: '8px', sizeMax: '12px', lh: '120%', uses: 57 },
    { class: 'kol-label-mono-xs', font: 'RG Mono', weight: 470, sizeMin: '10px', sizeMax: '14px', lh: '100%', uses: 21 },
    { class: 'kol-text-sm', font: 'Inter Tight', weight: 400, sizeMin: '12px', sizeMax: '16px', lh: '150%', uses: 34 },
    { class: 'kol-helper-uc-md', font: 'RG Mono', weight: 470, size: '16px', lh: '100%', uses: 10 },
    { class: 'kol-mono-sm-fine', font: 'RG Mono', weight: 300, sizeMin: '12px', sizeMax: '16px', lh: '125%', uses: 24 }
  ]

  const uiColors = [
    { name: 'Surface Primary', var: '--kol-surface-primary', dark: '#121215', light: '#fafafa' },
    { name: 'Surface Secondary', var: '--kol-surface-secondary', dark: '#19191d', light: '#f8f8f8' },
    { name: 'Container Primary', var: '--kol-container-primary', dark: '#19191d', light: '#f5f5f5' },
    { name: 'Container Secondary', var: '--kol-container-secondary', dark: '#202026', light: '#eeeeee' },
    { name: 'Border Default', var: '--kol-border-default', dark: '8% fg', light: '8% fg' },
    { name: 'Accent Primary', var: '--kol-accent-primary', dark: '#f5d245', light: '#f5d245' }
  ]

  const opacityScale = [
    { level: 'fg-88', usage: 'Primary text' },
    { level: 'fg-64', usage: 'Secondary text' },
    { level: 'fg-48', usage: 'Tertiary text' },
    { level: 'fg-24', usage: 'Borders, dividers' },
    { level: 'fg-16', usage: 'Subtle borders' },
    { level: 'fg-08', usage: 'Backgrounds, hover' },
    { level: 'fg-04', usage: 'Very subtle fills' }
  ]

  return (
    <main className="min-h-screen w-full bg-surface-primary">
      {/* Header */}
      <section className="w-full px-8 py-16 border-b border-fg-08">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="kol-display-section text-auto mb-2">Styleguide</h1>
              <p className="kol-text-lg text-fg-64 mb-3">Quick reference for typography, colors, and components</p>
              <div className="flex gap-3">
                <Link to="/sheet/visual">
                  <Button variant="ghost" size="sm">Visual →</Button>
                </Link>
                <Link to="/sheet/comprehensive">
                  <Button variant="ghost" size="sm">Comprehensive →</Button>
                </Link>
              </div>
            </div>
            <Pill variant="subtle" size="sm">v1.0</Pill>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="kol-heading-lg text-auto mb-2">Typography</h2>
            <p className="kol-text-md text-fg-64">Most used text classes (sorted by usage)</p>
          </div>

          <div className="space-y-3">
            {topTypography.map(type => (
              <div key={type.class} className="bg-container-primary p-6 rounded grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Preview */}
                <div className="lg:col-span-5">
                  <p className={`${type.class} text-auto`}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>

                {/* Specs */}
                <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  <div>
                    <div className="kol-mono-xxs text-fg-48 mb-1">CLASS</div>
                    <div className="kol-mono-xs text-auto">.{type.class}</div>
                  </div>
                  <div>
                    <div className="kol-mono-xxs text-fg-48 mb-1">FONT</div>
                    <div className="kol-mono-xs text-auto">{type.font}</div>
                  </div>
                  <div>
                    <div className="kol-mono-xxs text-fg-48 mb-1">WEIGHT</div>
                    <div className="kol-mono-xs text-auto">{type.weight}</div>
                  </div>
                  <div>
                    <div className="kol-mono-xxs text-fg-48 mb-1">SIZE</div>
                    <div className="kol-mono-xs text-auto">{type.size || `${type.sizeMin}→${type.sizeMax}`}</div>
                  </div>
                  <div>
                    <div className="kol-mono-xxs text-fg-48 mb-1">LINE-H</div>
                    <div className="kol-mono-xs text-auto">{type.lh}</div>
                  </div>
                  <div>
                    <div className="kol-mono-xxs text-fg-48 mb-1">USES</div>
                    <div className="kol-mono-xs text-accent-primary">{type.uses}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="kol-heading-lg text-auto mb-2">UI Colors</h2>
            <p className="kol-text-md text-fg-64">Core color tokens (brand colors excluded)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {uiColors.map(color => (
              <div key={color.var} className="bg-surface-primary rounded overflow-hidden">
                <div className="h-32" style={{ backgroundColor: `var(${color.var})` }} />
                <div className="p-4">
                  <div className="kol-text-md text-auto mb-2">{color.name}</div>
                  <div className="kol-mono-xs text-fg-64 mb-1">{color.var}</div>
                  <div className="flex gap-4 kol-mono-xxs text-fg-48">
                    <span>Dark: {color.dark}</span>
                    <span>Light: {color.light}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Opacity Scale */}
          <div className="mb-8">
            <h3 className="kol-heading-sm text-auto mb-4">Opacity Scale</h3>
            <p className="kol-text-sm text-fg-64 mb-6">Foreground-based opacity levels (most common)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Text opacity */}
            <div className="bg-surface-primary p-6 rounded">
              <div className="kol-mono-xs text-fg-64 mb-4">TEXT OPACITY</div>
              <div className="space-y-3">
                {opacityScale.map(o => (
                  <div key={o.level} className="flex items-center justify-between">
                    <span className={`kol-text-md text-${o.level}`}>
                      .text-{o.level}
                    </span>
                    <span className="kol-mono-xxs text-fg-48">{o.usage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Background opacity */}
            <div className="bg-surface-primary p-6 rounded">
              <div className="kol-mono-xs text-fg-64 mb-4">BACKGROUND OPACITY</div>
              <div className="space-y-3">
                {opacityScale.map(o => (
                  <div key={o.level} className={`bg-${o.level} p-3 rounded flex items-center justify-between`}>
                    <span className="kol-text-md text-auto">
                      .bg-{o.level}
                    </span>
                    <span className="kol-mono-xxs text-fg-64">{o.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="w-full px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="kol-heading-lg text-auto mb-2">Components</h2>
            <p className="kol-text-md text-fg-64">Common UI elements</p>
          </div>

          {/* Buttons */}
          <div className="mb-12">
            <h3 className="kol-heading-sm text-auto mb-4">Buttons</h3>
            <div className="bg-container-primary p-8 rounded">
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </div>
          </div>

          {/* Pills */}
          <div className="mb-12">
            <h3 className="kol-heading-sm text-auto mb-4">Pills</h3>
            <div className="bg-container-primary p-8 rounded">
              <div className="flex flex-wrap gap-3">
                <Pill>Default</Pill>
                <Pill variant="subtle">Subtle</Pill>
                <Pill variant="success">Success</Pill>
                <Pill variant="warning">Warning</Pill>
                <Pill variant="danger">Danger</Pill>
                <Pill size="sm">Small</Pill>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="mb-12">
            <h3 className="kol-heading-sm text-auto mb-4">Form Elements</h3>
            <div className="bg-container-primary p-8 rounded space-y-6">
              <div>
                <label className="kol-text-md text-auto mb-2 block">Text Input</label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-2 bg-surface-primary text-auto border border-fg-24 rounded focus:border-accent-primary outline-none"
                />
              </div>

              <div>
                <label className="kol-text-md text-auto mb-2 block">Textarea</label>
                <textarea
                  placeholder="Enter long text..."
                  rows={4}
                  className="w-full px-4 py-2 bg-surface-primary text-auto border border-fg-24 rounded focus:border-accent-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="check1" />
                <label htmlFor="check1" className="kol-text-md text-auto">Checkbox option</label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Constants */}
      <section className="w-full px-8 py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="kol-heading-lg text-auto mb-2">Layout</h2>
            <p className="kol-text-md text-fg-64">Core constants and spacing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Constants */}
            <div className="bg-surface-primary p-6 rounded">
              <h3 className="kol-text-lg text-auto mb-4">Constants</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="kol-mono-xs text-fg-64">Max Width</span>
                  <span className="kol-mono-xs text-auto">1400px</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="kol-mono-xs text-fg-64">Border Radius</span>
                  <span className="kol-mono-xs text-auto">4px (global)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="kol-mono-xs text-fg-64">Base Grid</span>
                  <span className="kol-mono-xs text-auto">4px</span>
                </div>
              </div>
            </div>

            {/* Spacing Scale */}
            <div className="bg-surface-primary p-6 rounded">
              <h3 className="kol-text-lg text-auto mb-4">Spacing Scale (4px base)</h3>
              <div className="space-y-2">
                {[4, 8, 12, 16, 24, 32, 40, 48, 64, 80].map(px => (
                  <div key={px} className="flex items-center gap-4">
                    <div className="w-12 kol-mono-xs text-fg-64">{px}px</div>
                    <div className="h-6 bg-accent-primary" style={{ width: `${px}px` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default StyleguideMain
