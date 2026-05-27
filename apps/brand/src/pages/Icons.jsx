import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../components/framework/PageSection'
import { ContentFilters } from '@kol/component'

// Read the curated staging stroke set directly — the canonical inventory.
const strokeModules = import.meta.glob('../_staging/icons/stroke/**/*.svg', {
  eager: true, query: '?raw', import: 'default',
})
const iconEntries = Object.entries(strokeModules).map(([path, svg]) => {
  const after = path.split('/stroke/')[1]
  const slash = after.lastIndexOf('/')
  const folder = slash >= 0 ? after.slice(0, slash) : '_root'
  const name = after.slice(slash + 1).replace(/\.svg$/, '')
  return { id: `${folder}/${name}`, folder, name, svg }
})

function applySize(svg, size) {
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

const ListRow = ({ entry, size, bgLight, gridOverlay }) => {
  const html = useMemo(() => applySize(entry.svg ?? '', size), [entry.svg, size])
  const cell = Math.max(40, size + 16)
  return (
    <div
      className="flex items-center gap-4 py-1.5 border-b border-fg-04"
      title={`${entry.folder}/${entry.name}`}
    >
      <div
        className="flex items-center justify-center rounded-sm relative flex-shrink-0"
        style={{
          width: cell,
          height: cell,
          background: bgLight ? '#FFFFFF' : '#0E0E11',
          color:      bgLight ? '#0E0E11' : '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {gridOverlay && <KeylineBg bgLight={bgLight} />}
        <span dangerouslySetInnerHTML={{ __html: html }} style={{ position: 'relative', zIndex: 1 }} />
      </div>
      <span className="kol-helper-12 text-fg-80 flex-1 truncate">{entry.name}</span>
      <span className="kol-helper-10 text-fg-48">{entry.folder}</span>
    </div>
  )
}

const Tile = ({ entry, size, bgLight, gridOverlay }) => {
  const html = useMemo(() => applySize(entry.svg ?? '', size), [entry.svg, size])
  const cell = size + 16
  return (
    <div className="flex flex-col items-center gap-1" title={`${entry.folder}/${entry.name}`}>
      <div
        className="flex items-center justify-center rounded-sm relative"
        style={{
          width: cell,
          height: cell,
          background: bgLight ? '#FFFFFF' : '#0E0E11',
          color:      bgLight ? '#0E0E11' : '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {gridOverlay && <KeylineBg bgLight={bgLight} />}
        <span dangerouslySetInnerHTML={{ __html: html }} style={{ position: 'relative', zIndex: 1 }} />
      </div>
      <div className="kol-helper-10 text-fg-80 truncate w-full text-center px-1">{entry.name}</div>
    </div>
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

export default function Icons() {
  const [size, setSize] = useState(24)
  const [bgLight, setBgLight] = useState(false)
  const [gridOverlay, setGridOverlay] = useState(false)

  const folders = useMemo(() => {
    const set = new Set(iconEntries.map((e) => e.folder))
    return [...set].sort()
  }, [])

  const filterGroups = useMemo(
    () => [{ label: 'Folder', key: 'folder', values: folders }],
    [folders],
  )

  const renderItems = (filteredItems, viewMode) => {
    const map = {}
    for (const e of filteredItems) {
      if (!map[e.folder]) map[e.folder] = []
      map[e.folder].push(e)
    }
    for (const list of Object.values(map)) list.sort((a, b) => a.name.localeCompare(b.name))
    const sections = Object.entries(map).sort(
      (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
    )
    return (
      <>
        {sections.map(([folder, list]) => (
          <section key={folder} className="mb-12">
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-fg-08">
              <h2 className="kol-helper-14 text-fg-96">{folder}</h2>
              <span
                className="kol-helper-10 text-fg-48"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >{list.length}</span>
            </div>
            {viewMode === 'list' ? (
              <div className="flex flex-col">
                {list.map((e) => (
                  <ListRow
                    key={e.id}
                    entry={e}
                    size={size}
                    bgLight={bgLight}
                    gridOverlay={gridOverlay}
                  />
                ))}
              </div>
            ) : (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(64, size + 28)}px, 1fr))`,
                }}
              >
                {list.map((e) => (
                  <Tile
                    key={e.id}
                    entry={e}
                    size={size}
                    bgLight={bgLight}
                    gridOverlay={gridOverlay}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </>
    )
  }

  return (
    <PageSection
      id="icons"
      label="Icons"
      title="Icon inventory"
      body={`${iconEntries.length} stroke icons across ${folders.length} categories. Sourced live from the canonical staging set (apps/brand/src/_staging/icons/stroke/). See the variants page for stroke + solid pairs.`}
    >
      <div className="mt-6">
        <Link
          to="/icons/variants"
          className="kol-btn kol-btn-primary kol-btn-md kol-mono-14"
        >
          View variants →
        </Link>
      </div>

      <div className="flex items-center flex-wrap gap-6 mt-12 mb-6">
        <SegGroup
          label="BG"
          options={[{ value: false, label: 'DARK' }, { value: true, label: 'LIGHT' }]}
          value={bgLight}
          onChange={setBgLight}
        />
        <SegGroup
          label="SIZE"
          options={[16, 20, 24, 32, 48, 64].map((v) => ({ value: v, label: String(v) }))}
          value={size}
          onChange={setSize}
        />
        <SegGroup
          label="GRID"
          options={[{ value: false, label: 'OFF' }, { value: true, label: 'ON' }]}
          value={gridOverlay}
          onChange={setGridOverlay}
        />
      </div>

      <ContentFilters
        items={iconEntries}
        title="Icons"
        totalCount={iconEntries.length}
        filterGroups={filterGroups}
        renderItem={renderItems}
        searchKeys={['name', 'folder']}
        viewModeOptions={[
          { value: 'grid', label: 'Grid' },
          { value: 'list', label: 'List' },
        ]}
        defaultViewMode="grid"
        showCountOnlyWhenFiltering
      />
    </PageSection>
  )
}
