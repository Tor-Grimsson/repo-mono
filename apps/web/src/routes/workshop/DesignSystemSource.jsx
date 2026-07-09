import { PageSection } from '@kolkrabbi/kol-framework'
import { Icon } from '@kolkrabbi/kol-component'

// Source-of-truth page for the KOL design system. The workshop only introduces —
// the canonical, exhaustive reference is the live site + the published packages + GitHub.
const LIVE_URL = 'https://ui.kolkrabbi.io'
const REPO_URL = 'https://github.com/Tor-Grimsson/kol-ds'

const PACKAGES = [
  { name: '@kolkrabbi/kol-theme', version: '0.7.1', blurb: 'Design tokens + base CSS — the canonical cascade layer every other package builds on.' },
  { name: '@kolkrabbi/kol-component', version: '0.7.0', blurb: 'Core UI components — atoms, molecules, organisms.' },
  { name: '@kolkrabbi/kol-framework', version: '0.3.2', blurb: 'App shell + page/section layout primitives.' },
  { name: '@kolkrabbi/kol-icons', version: '0.5.0', blurb: 'The KOL icon set (currentColor SVGs).' },
  { name: '@kolkrabbi/kol-dashboards', version: '0.1.0', blurb: 'Dashboard cards + charts (histogram, candlestick, sparkline…).' },
  { name: '@kolkrabbi/kol-chess', version: '0.1.0', blurb: 'Chess board, controls, engine + dataset.' },
  { name: '@kolkrabbi/kol-workshop', version: '0.1.0', blurb: 'The docs system powering this workshop.' },
]

const PackageCard = ({ name, version, blurb }) => (
  <div className="flex flex-col gap-3 rounded-[4px] border border-fg-08 bg-fg-04 p-5">
    <div className="flex items-baseline justify-between gap-3">
      <code className="kol-helper-12 text-fg-88">{name}</code>
      <span className="kol-helper-12 text-fg-48">v{version}</span>
    </div>
    <p className="kol-sans-body-02 text-fg-64">{blurb}</p>
    <pre className="kol-helper-12 mt-auto overflow-x-auto rounded-[3px] bg-fg-08 px-3 py-2 text-fg-88">pnpm add {name}</pre>
  </div>
)

const DesignSystemSource = () => (
  <div>
    <PageSection
      id="ds-source-intro"
      label="Scope: Design System — Source"
      title="Source & Packages"
      body="The workshop only introduces the design system. The source of truth is the live reference site, the published npm packages, and the GitHub monorepo — everything below points there."
    />

    <PageSection id="live" label="Live reference" title="Browse the design system">
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={LIVE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[4px] border border-fg-08 bg-fg-04 px-4 py-3 kol-sans-body-02 text-fg-88 hover:bg-fg-08">
          <Icon name="interactive" size={16} />
          ui.kolkrabbi.io
          <Icon name="arrow-up-right" size={14} />
        </a>
        <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[4px] border border-fg-08 bg-fg-04 px-4 py-3 kol-sans-body-02 text-fg-88 hover:bg-fg-08">
          <Icon name="code" size={16} />
          GitHub — Tor-Grimsson/kol-ds
          <Icon name="arrow-up-right" size={14} />
        </a>
      </div>
    </PageSection>

    <PageSection id="packages" label="npm" title="Packages">
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg) => (
          <PackageCard key={pkg.name} {...pkg} />
        ))}
      </div>
    </PageSection>
  </div>
)

export default DesignSystemSource
