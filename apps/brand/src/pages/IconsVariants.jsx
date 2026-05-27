import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../components/framework/PageSection'
import ContentFilters from '../components/molecules/ContentFilters'
import MANIFEST from '../_staging/icons/_pool.json'

const loaderModules = import.meta.glob('../components/loaders/icons/svg/**/*.svg', {
  eager: true, query: '?raw', import: 'default',
})
const poolModules = import.meta.glob('../_staging/icons/_pool/*.svg', {
  eager: true, query: '?raw', import: 'default',
})

const poolByPath = {}
for (const [path, svg] of Object.entries(poolModules)) {
  const file = path.split('/').pop()
  poolByPath[`_pool/${file}`] = svg
}

// Loader stroke-by-name. 00-kol overlays others, matching Icon.jsx's resolution.
const STROKE_BY_NAME = {}
for (const [path, svg] of Object.entries(loaderModules)) {
  const parts = path.split('/')
  const folder = parts[parts.length - 2]
  const name = (parts[parts.length - 1]).replace(/\.svg$/, '')
  const existing = STROKE_BY_NAME[name]
  if (!existing || folder === '00-kol') STROKE_BY_NAME[name] = { folder, svg }
}

// Solid-by-name from pool, picking best origin.
const ORIGIN_PRIORITY = { 'claude-jsx': 0, library: 1, live: 2, unknown: 3 }
const SOLID_BY_NAME = {}
for (const e of MANIFEST.entries) {
  if (e.variant !== 'solid') continue
  const prio = ORIGIN_PRIORITY[e.origin] ?? 9
  const cur = SOLID_BY_NAME[e.name]
  if (!cur || prio < cur.prio) SOLID_BY_NAME[e.name] = { entry: e, prio }
}

// Items: loader strokes that have a solid pair in the pool.
const items = Object.entries(STROKE_BY_NAME)
  .map(([name, stroke]) => {
    const solidRec = SOLID_BY_NAME[name]
    if (!solidRec) return null
    return {
      id: name,
      name,
      folder: stroke.folder,
      strokeSvg: stroke.svg,
      solidSvg: poolByPath[solidRec.entry.poolPath],
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.folder.localeCompare(b.folder) || a.name.localeCompare(b.name))

function applySize(svg, size) {
  if (!svg) return ''
  return svg
    .replace(/width="[^"]*"/i, `width="${size}"`)
    .replace(/height="[^"]*"/i, `height="${size}"`)
}

const KeylineBg = ({ bgLight }) => {
  const diag = '#0A8DA4'
  const key  = bgLight ? '#CA3ABC' : '#F2D24B'
  return (
    <svg
      width="100%" height="100%" viewBox="0 0 24 24"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <g stroke={diag} strokeWidth="0.1" strokeDasharray="0.4 0.6" opacity="1" fill="none">
        <path d="M0 0 L24 24" />
        <path d="M24 0 L0 24" />
      </g>
      <g stroke={key} strokeWidth="0.1" strokeDasharray="0.4 0.6" opacity="1" fill="none">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <circle cx="12" cy="12" r="4" />
      </g>
    </svg>
  )
}

const SegBtn = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`kol-helper-12 px-2 py-1 rounded-sm ${active ? 'text-fg-96' : 'text-fg-48 hover:text-fg-80'}`}
    style={{
      background: active ? 'var(--kol-fg-04, rgba(255,255,255,0.04))' : 'transparent',
      border: 'none',
      cursor: 'pointer',
    }}
  >{children}</button>
)
const SegGroup = ({ label, options, value, onChange }) => (
  <div className="flex items-center gap-2">
    <span className="kol-helper-10 text-fg-48" style={{ letterSpacing: 1 }}>{label}</span>
    <div className="flex items-center gap-1">
      {options.map((o) => (
        <SegBtn key={String(o.value)} active={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </SegBtn>
      ))}
    </div>
  </div>
)

const Cell = ({ svg, size, bgLight, grid, className = '' }) => {
  const html = useMemo(() => applySize(svg ?? '', size), [svg, size])
  return (
    <div
      className={`flex items-center justify-center relative ${className}`}
      style={{
        aspectRatio: '1',
        background: bgLight ? '#FFFFFF' : '#0E0E11',
        color:      bgLight ? '#0E0E11' : '#FFFFFF',
      }}
    >
      {grid && <KeylineBg bgLight={bgLight} />}
      {svg
        ? <span dangerouslySetInnerHTML={{ __html: html }} style={{ position: 'relative', zIndex: 1 }} />
        : <span className="kol-helper-10 text-fg-32">—</span>}
    </div>
  )
}

const Card = ({ item, size, bgLight }) => (
  <div className="flex flex-col border border-fg-08 rounded-sm overflow-hidden">
    <div className="grid grid-cols-3">
      <Cell svg={item.solidSvg}  size={size} bgLight={bgLight} grid={false} className="border-r border-fg-08" />
      <Cell svg={item.strokeSvg} size={size} bgLight={bgLight} grid={false} className="border-r border-fg-08" />
      <Cell svg={item.strokeSvg} size={size} bgLight={bgLight} grid={true} />
    </div>
    <div
      className="grid grid-cols-3 border-t border-fg-04 kol-helper-10 text-fg-48 text-center"
      style={{ letterSpacing: 1, textTransform: 'uppercase' }}
    >
      <span className="py-1.5 border-r border-fg-04">Solid</span>
      <span className="py-1.5 border-r border-fg-04">Stroke</span>
      <span className="py-1.5">Grid</span>
    </div>
    <div className="flex items-center justify-between border-t border-fg-08 px-3 py-2">
      <span className="kol-helper-12 text-fg-80 truncate" title={item.name}>{item.name}</span>
      <span className="kol-helper-10 text-fg-48">{item.folder}</span>
    </div>
  </div>
)

export default function IconsVariants() {
  const [size, setSize] = useState(48)
  const [bgLight, setBgLight] = useState(false)

  const folders = useMemo(() => {
    const set = new Set(items.map((i) => i.folder))
    return [...set].sort()
  }, [])

  const filterGroups = useMemo(
    () => [{ label: 'Folder', key: 'folder', values: folders }],
    [folders],
  )

  const renderItems = (filteredItems) => (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
    >
      {filteredItems.map((item) => (
        <Card key={item.id} item={item} size={size} bgLight={bgLight} />
      ))}
    </div>
  )

  return (
    <PageSection
      id="icons-variants"
      label="Icons · Variants"
      title="Solid · stroke · stroke on grid"
      body={`${items.length} loader icons paired with their solid variant from the pool. Loader stroke is the canonical version (00-kol overlays others).`}
    >
      <div className="flex items-center flex-wrap gap-6 mt-12 mb-6">
        <Link to="/icons" className="kol-helper-12 text-fg-64 hover:text-fg-96">← back to inventory</Link>
        <SegGroup
          label="BG"
          options={[{ value: false, label: 'DARK' }, { value: true, label: 'LIGHT' }]}
          value={bgLight}
          onChange={setBgLight}
        />
        <SegGroup
          label="SIZE"
          options={[16, 24, 32, 48, 64].map((v) => ({ value: v, label: String(v) }))}
          value={size}
          onChange={setSize}
        />
      </div>

      <ContentFilters
        items={items}
        title="Variants"
        totalCount={items.length}
        filterGroups={filterGroups}
        renderItem={renderItems}
        searchKeys={['name', 'folder']}
        showCountOnlyWhenFiltering
      />
    </PageSection>
  )
}
