import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../components/framework/PageSection'
import { Table } from '@kol/component'
import AssetTable, { markRows, graphicRows, markWidthFor, graphicWidthFor } from '../components/styleguide/AssetTable'
import usePageTitle from '../components/hooks/usePageTitle'
import { resolveCssVar, LiveValue } from '../components/sections/ColorRamp'
import { TYPOGRAPHY_SECTIONS } from '../data/typography'
import { BRAND_COLORS_SECTIONS, UI_COLORS_SECTIONS } from '../data/color'
import { ATOMS, MOLECULES, NAVIGATION_MOLECULES, ORGANISMS } from '../data/components'
import { GENERATOR_ROWS, generatorCols } from '../data/generators'

const Chip = ({ value }) => (
  <span
    className="inline-block w-6 h-6 rounded-sm border border-fg-08 align-middle"
    style={{ background: value }}
  />
)

const TokenName = ({ children }) => (
  <code className="kol-helper-12 text-emphasis">{children}</code>
)

/** LiveHex — reads the resolved hex of a CSS custom property. Single source of
 *  truth: kol-color.css. Edit a token there, this column updates on next render. */
function LiveHex({ token }) {
  const [hex, setHex] = useState('')
  useEffect(() => { setHex(resolveCssVar(token)) }, [token])
  return <TokenName>{hex}</TokenName>
}

// ─── Routes ──────────────────────────────────────────────────────

const isNavigable = (p) => p && !p.includes(':') && p !== '*'

const routeCols = [
  { accessor: 'path',    header: 'Path',    render: (r) => <TokenName>{r.path}</TokenName> },
  { accessor: 'page',    header: 'Page',    render: (r) => isNavigable(r.path)
      ? <Link to={r.path} className="text-emphasis underline underline-offset-4 decoration-fg-24 hover:decoration-fg-64">{r.page}</Link>
      : r.page },
  { accessor: 'layout',  header: 'Layout' },
  { accessor: 'file',    header: 'File',    render: (r) => <code className="kol-helper-12 text-meta">{r.file}</code> },
]

const routeRows = [
  { path: '/',                          page: 'Landing',                  layout: 'Layout',           file: 'src/pages/Landing.jsx' },
  { path: '/styleguide',                page: 'Client guidelines',        layout: 'Layout · BrandLayout', file: 'src/pages/Styleguide.jsx' },
  { path: '/reference',                 page: 'Token + asset reference',  layout: 'Layout · BrandLayout', file: 'src/pages/Reference.jsx' },
  { path: '/generators',                page: 'Interactive tools (Combo Lab, Social Generator)', layout: 'Layout · BrandLayout', file: 'src/pages/Generators.jsx' },
  { path: '/site',                      page: 'Marketing home',           layout: 'Layout · SiteLayout',  file: 'src/pages/site/Home.jsx' },
  { path: '/site/contact',              page: 'Contact',                  layout: 'Layout · SiteLayout',  file: 'src/pages/site/Contact.jsx' },
  { path: '/site/blog',                 page: 'Blog index',               layout: 'Layout · SiteLayout',  file: 'src/pages/site/Blog.jsx' },
  { path: '/site/blog/:slug',           page: 'Blog article',             layout: 'Layout · SiteLayout',  file: 'src/pages/site/BlogArticle.jsx' },
  { path: '/site/blog/author/:slug',    page: 'Blog author',              layout: 'Layout · SiteLayout',  file: 'src/pages/site/BlogAuthor.jsx' },
  { path: '/gallery',                   page: 'Photo lookup (dev tool)',  layout: '— (no chrome)',        file: 'src/components/tools/Gallery.jsx' },
  { path: '*',                          page: '404',                      layout: 'Layout',           file: 'src/pages/NotFound.jsx' },
]

// ─── Color column factories ─────────────────────────────────────
// Bridge from string keys in src/data/color.js to JSX render funcs.

const COLOR_COLUMNS = {
  alias: [
    { accessor: 'token',      header: 'Token',       render: (r) => <TokenName>{r.token}</TokenName> },
    { accessor: 'swatch',     header: 'Swatch',      render: (r) => <Chip value={`var(${r.token})`} /> },
    { accessor: 'resolvesTo', header: 'Resolves to', render: (r) => <TokenName>{r.resolvesTo}</TokenName> },
    { accessor: 'use',        header: 'Use' },
  ],
  ramp: [
    { accessor: 'token',  header: 'Token',  style: { width: 220 }, render: (r) => <TokenName>{r.token}</TokenName> },
    { accessor: 'swatch', header: 'Swatch', style: { width: 80 },  render: (r) => <Chip value={`var(${r.token})`} /> },
    { accessor: 'hex',    header: 'Hex',    style: { width: 120 }, render: (r) => <LiveHex token={r.token} /> },
    { accessor: 'note',   header: 'Note' },
  ],
  surface: [
    { accessor: 'token', header: 'Token', render: (r) => <TokenName>{r.token}</TokenName> },
    { accessor: 'light', header: 'Light', render: (r) => <span className="inline-flex items-center gap-2"><Chip value={r.light} /><TokenName>{r.light}</TokenName></span> },
    { accessor: 'dark',  header: 'Dark',  render: (r) => <span className="inline-flex items-center gap-2"><Chip value={r.dark} /><TokenName>{r.dark}</TokenName></span> },
    { accessor: 'use',   header: 'Use' },
  ],
  state: [
    { accessor: 'state',  header: 'State',  render: (r) => <TokenName>{r.state}</TokenName> },
    { accessor: 'sample', header: 'Sample', render: (r) => (
      <span style={{ color: `var(${r.token})`, fontWeight: 600 }}>{r.sample}</span>
    ) },
    { accessor: 'token',  header: 'Token',  render: (r) => <TokenName>{r.token}</TokenName> },
    { accessor: 'dark',   header: 'Dark',   render: (r) => <TokenName>{r.dark}</TokenName> },
    { accessor: 'light',  header: 'Light',  render: (r) => <TokenName>{r.light}</TokenName> },
    { accessor: 'use',    header: 'Use' },
  ],
  'fg-primitives': [
    { accessor: 'token',   header: 'Token',           render: (r) => <TokenName>{r.token}</TokenName> },
    { accessor: 'swatch',  header: 'Swatch',          render: (r) => <Chip value={`var(${r.token})`} /> },
    { accessor: 'utility', header: 'Utility classes', render: (r) => <code className="kol-helper-12 text-meta">{r.utility}</code> },
    { accessor: 'use',     header: 'Use' },
  ],
  'fg-families': [
    { accessor: 'property', header: 'Family',        render: (r) => <TokenName>.{r.property}</TokenName> },
    { accessor: 'example',  header: 'Example',       render: (r) => <TokenName>.{r.example}</TokenName> },
    { accessor: 'hover',    header: 'Hover variant', render: (r) => r.hover === '—' ? <span className="text-subtle">—</span> : <TokenName>.{r.hover}</TokenName> },
    { accessor: 'use',      header: 'Use' },
  ],
}

// ─── Typography column factories ─────────────────────────────────
// Keyed by name. Data file (src/data/typography.js) references these
// via string keys on each table's `columns` field. JSX render funcs can't live
// in pure data files; this is the bridge.

const TYPE_COLUMNS = {
  family: [
    { accessor: 'token', header: 'Token', render: (r) => <TokenName>{r.token}</TokenName> },
    { accessor: 'role',  header: 'Role' },
    { accessor: 'cut',   header: 'Cut (live)', render: (r) => <span><LiveValue token={r.token} /></span> },
  ],
  sans: [
    { accessor: 'cls',    header: 'Class',  render: (r) => <TokenName>{r.cls}</TokenName> },
    { accessor: 'sample', header: 'Sample',
      render: (r) => <span className={r.cls.replace(/^\./, '')}>Sample {r.cls.split('-').slice(-2).join('-')}</span> },
    { accessor: 'size',   header: 'Size',   render: (r) => r.tokenName ? <LiveValue token={r.tokenName} /> : '—' },
    { accessor: 'family', header: 'Family' },
    { accessor: 'weight', header: 'Weight' },
  ],
  prose: [
    { accessor: 'role',   header: 'Role',  render: (r) => <TokenName>{r.role}</TokenName> },
    { accessor: 'class',  header: 'Class', render: (r) => <TokenName>{r.class}</TokenName> },
    { accessor: 'family', header: 'Family' },
    { accessor: 'weight', header: 'Weight' },
    { accessor: 'size',   header: 'Size (live)', render: (r) => r.tokenName ? <LiveValue token={r.tokenName} /> : '—' },
  ],
  mono: [
    { accessor: 'cls',    header: 'Class',  render: (r) => <TokenName>{r.cls}</TokenName> },
    { accessor: 'sample', header: 'Sample',
      render: (r) => <span className={r.cls.replace(/^\./, '')}>{r.cls.replace(/^\./, '')}</span> },
    { accessor: 'size',   header: 'Size',   render: (r) => `${r.size}px` },
    { accessor: 'weight', header: 'Weight' },
    { accessor: 'lh',     header: 'LH',     render: (r) => typeof r.lh === 'number' ? `${r.lh}px` : r.lh },
    { accessor: 'ls',     header: 'LS' },
  ],
  descriptors: [
    { accessor: 'name',   header: 'Name',   render: (r) => <TokenName>.text-{r.name}</TokenName> },
    { accessor: 'pct',    header: '%',      render: (r) => `${r.pct}%` },
    { accessor: 'sample', header: 'Sample',
      render: (r) => <span className={`text-${r.name} font-mono`}>The quick brown fox</span> },
    { accessor: 'token',  header: 'Token',  render: (r) => <TokenName>{r.token}</TokenName> },
    { accessor: 'role',   header: 'Use' },
  ],
  cuts: [
    { accessor: 'family',  header: 'Family',  render: (r) => <TokenName>{r.family}</TokenName> },
    { accessor: 'weights', header: 'Weights' },
    { accessor: 'use',     header: 'Use' },
  ],
}

// ─── Components inventory columns ────────────────────────────────

const componentCols = [
  { accessor: 'name', header: 'Name', render: (r) => (
    r.demo
      ? <Link to={`/components#${r.demo}`} className="text-emphasis underline underline-offset-4 decoration-fg-24 hover:decoration-fg-64">{r.name}</Link>
      : <span className="text-emphasis">{r.name}</span>
  ) },
  { accessor: 'file', header: 'JSX', render: (r) => <code className="kol-helper-12 text-meta">{r.file}</code> },
  { accessor: 'css',  header: 'CSS', render: (r) => r.css
      ? <code className="kol-helper-12 text-meta">{r.css}</code>
      : <span className="text-subtle">— Tailwind only</span> },
  { accessor: 'description', header: 'Description', className: 'kol-table-cell-meta' },
]

// ─── Assets: branded-asset placeholder ───────────────────────────

const brandedAssetCols = [
  { accessor: 'item',   header: 'Item',   render: (r) => <TokenName>{r.item}</TokenName> },
  { accessor: 'aspect', header: 'Aspect' },
  { accessor: 'surface', header: 'Surface' },
  { accessor: 'status', header: 'Status', render: (r) => <span className="kol-helper-12 text-meta uppercase tracking-widest">{r.status}</span> },
  { accessor: 'note',   header: 'Note' },
]

const brandedAssetRows = [
  { item: 'Business card · front',  aspect: '85.6 / 53.85 (ID-1)', surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.BusinessCardFront' },
  { item: 'Business card · back',   aspect: '85.6 / 53.85',         surface: 'ink',       status: 'mocked',  note: 'StationeryMocks.BusinessCardBack' },
  { item: 'Envelope · DL',           aspect: '220 / 110',           surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.Envelope' },
  { item: 'Letterhead · A4',         aspect: '210 / 297',           surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.Letterhead' },
  { item: 'Email signature',         aspect: 'free',                surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.EmailSignature' },
  { item: 'Neck label · woven',      aspect: '5 / 2',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.NeckLabel' },
  { item: 'Size label · seam',       aspect: '3 / 1',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.SizeLabel' },
  { item: 'Hangtag · front',         aspect: '3 / 5',               surface: 'champagne', status: 'mocked',  note: 'StationeryMocks.Hangtag side="front"' },
  { item: 'Hangtag · back',          aspect: '3 / 5',               surface: 'burgundy',  status: 'mocked',  note: 'StationeryMocks.Hangtag side="back"' },
  { item: 'Swing tag',               aspect: '3 / 5',               surface: 'sand',      status: 'mocked',  note: 'StationeryMocks.SwingTag' },
  { item: 'Edition card',            aspect: '3 / 4',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.EditionCard' },
  { item: 'Care label',              aspect: '1 / 2',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.CareLabel' },
  { item: 'Dust bag',                aspect: '5 / 6',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.DustBag' },
  { item: 'Garment bag',             aspect: '3 / 8',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.GarmentBag' },
  { item: 'Packaging · box face',    aspect: '1 / 1',               surface: 'maroon',    status: 'mocked',  note: 'StationeryMocks.Packaging' },
]

// ─── Section renderer ────────────────────────────────────────────
// Shared by color + typography sections — same shape, same renderer.

function SystemSection({ section, columnsDict }) {
  return (
    <PageSection
      key={section.id}
      id={section.id}
      label={section.label}
      title={section.title}
      body={section.intro}
      divider={section.divider === true}
    >
      {section.reasoning && (
        <div className="kol-prose mt-8 max-w-[60ch]">
          <p className="text-meta">{section.reasoning}</p>
        </div>
      )}
      {section.tables.map((t, i) => (
        <Table
          key={`${section.id}-${i}`}
          caption={t.caption}
          columns={typeof t.columns === 'string' ? columnsDict[t.columns] : t.columns}
          rows={t.rows}
          variant="simple"
          className="mt-8"
        />
      ))}
    </PageSection>
  )
}

// ─── Page ────────────────────────────────────────────────────────

export default function Reference() {
  usePageTitle('Reference')

  return (
    <>
      <PageSection
        id="routes"
        label="00 — routes"
        title="Routes"
        body="Every URL the app serves. Wired in src/App.jsx via react-router."
      >
        <Table caption="Routes" columns={routeCols} rows={routeRows} className="mt-8" />
      </PageSection>

      {/* Brand colors — identity layer (aliases · hue ramps · cream · grey) */}
      {BRAND_COLORS_SECTIONS.map((section) => (
        <SystemSection key={section.id} section={section} columnsDict={COLOR_COLUMNS} />
      ))}

      {/* UI colors — chrome layer (surface · state · absolute · fg-* opacity) */}
      {UI_COLORS_SECTIONS.map((section) => (
        <SystemSection key={section.id} section={section} columnsDict={COLOR_COLUMNS} />
      ))}

      {/* Typography — data-driven from src/data/typography.js. Each
       * section carries its own label, intro, reasoning prose, and tables
       * (with a string `columns` key that resolves to TYPE_COLUMNS above). */}
      {TYPOGRAPHY_SECTIONS.map((section) => (
        <SystemSection key={section.id} section={section} columnsDict={TYPE_COLUMNS} />
      ))}

      <PageSection
        id="components-atoms"
        label="16 — components · atoms"
        title="Atoms"
        body="Lowest-tier components. Most use the .kol-control shell or are custom-shape primitives (slide switch, slide toggle). Click a name to jump to its /components showcase."
      >
        <Table caption="Atoms" columns={componentCols} rows={ATOMS} variant="simple" className="mt-8" />
      </PageSection>

      <PageSection
        id="components-molecules"
        label="17 — components · molecules"
        title="Molecules"
        body="Composed components. Some compose atoms (PropertyInput, LabeledControl); others ship their own chrome (Pill / Tag / Badge). Project-specific navigation molecules listed at the bottom."
      >
        <Table caption="Molecules" columns={componentCols} rows={MOLECULES} variant="simple" className="mt-8" />
        <Table caption="Navigation molecules" columns={componentCols} rows={NAVIGATION_MOLECULES} variant="simple" className="mt-8" />
      </PageSection>

      <PageSection
        id="components-organisms"
        label="18 — components · organisms"
        title="Organisms"
        body="Higher-tier components. Table is the only one with formal CSS extraction so far; the asset family + visualization organisms are presentational and don't reach for ad-hoc chrome."
      >
        <Table caption="Organisms" columns={componentCols} rows={ORGANISMS} variant="simple" className="mt-8" />
      </PageSection>

      <PageSection
        id="logos"
        label="19 — assets · logos"
        title="Logos"
        body="Every mark in src/brand/logos/svg/. Click a row to open the overlay; toggle the color dot to swap ink vs surface; download recolored on the fly."
      >
        <AssetTable caption="Logos" rows={markRows()} previewWidthFor={markWidthFor} />
      </PageSection>

      <PageSection
        id="graphics"
        label="20 — assets · graphics"
        title="Graphics"
        body="Abstract forms in src/components/loaders/graphics/svg/abstract/. Same overlay + recolor + download behavior as the logo table."
      >
        <AssetTable caption="Graphics" rows={graphicRows('abstract')} previewWidthFor={graphicWidthFor} />
      </PageSection>

      <PageSection
        id="patterns"
        label="21 — assets · patterns"
        title="Patterns"
        body="Tileable patterns in src/components/loaders/graphics/svg/patterns/."
      >
        <AssetTable caption="Patterns" rows={graphicRows('patterns')} previewWidthFor={graphicWidthFor} />
      </PageSection>

      <PageSection
        id="branded-assets"
        label="22 — assets · branded"
        title="Branded assets"
        body="Stationery, garment-attached labels, soft goods and packaging. Mocks live in src/components/styleguide/StationeryMocks.jsx and render in /styleguide chapter 6."
      >
        <Table caption="Branded assets" columns={brandedAssetCols} rows={brandedAssetRows} className="mt-8" />
      </PageSection>

      <PageSection
        id="generators"
        label="23 — generators"
        title="Generators"
        body="Interactive tools available at /generators. Each opens in its own full-viewport workspace; click the arrow column to launch in a new tab."
      >
        <Table caption="Generators" columns={generatorCols} rows={GENERATOR_ROWS} className="mt-8" />
      </PageSection>
    </>
  )
}
