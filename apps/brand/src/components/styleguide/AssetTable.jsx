import { useState, useEffect } from 'react'
import { Table, Graphic, GRAPHICS, GRAPHIC_RAW } from '@kolkrabbi/kol-component'
import { Icon } from '@kolkrabbi/kol-icons'
import { KolLogo, KOL_LOGO_VARIANTS } from '../../brand/logos'

const markUrlModules = import.meta.glob('../../brand/logos/svg/*.svg', { eager: true, import: 'default' })
const markRawModules = import.meta.glob('../../brand/logos/svg/*.svg', { eager: true, query: '?raw', import: 'default' })

const MARK_URLS = Object.fromEntries(
  Object.entries(markUrlModules).map(([p, url]) => [p.match(/([^/]+)\.svg$/)[1], url])
)

const MARK_RAW = Object.fromEntries(
  Object.entries(markRawModules).map(([p, raw]) => [p.match(/([^/]+)\.svg$/)[1], raw])
)

const TOKEN_INK     = '--kol-surface-on-primary'
const TOKEN_SURFACE = '--kol-surface-primary'

function resolveToken(token) {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
}

function downloadRecolored(raw, color, filename) {
  const recolored = raw.replace(/currentColor/gi, color)
  const blob = new Blob([recolored], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const MARK_WIDTHS = {
  'logomark':    48,
  'wordmark':    200,
  'lockup-hori': 240,
  'lockup-vert': 120,
}

const DEFAULT_MARK_WIDTH = 48
const GRAPHIC_WIDTH = 80

function buildColumns({ previewWidthFor, getToken, toggleToken, openOverlay }) {
  return [
    {
      accessor: 'preview',
      header: 'Preview',
      className: (row) => `kol-table-cell-text${getToken(row.id) !== TOKEN_INK ? ' bg-fg-04' : ''}`,
      style: { minWidth: 200 },
      render: (row) => {
        const width = previewWidthFor(row)
        const token = getToken(row.id)
        return (
          <button
            type="button"
            onClick={() => openOverlay(row)}
            className="inline-flex items-center cursor-zoom-in"
            style={{
              color: `var(${token})`,
              ...(width ? { width } : {}),
            }}
            aria-label={`Open ${row.name} overlay`}
          >
            {row.render}
          </button>
        )
      },
    },
    {
      accessor: 'name',
      header: 'Name',
      className: 'kol-table-cell-text',
      render: (row) => row.name.replace(/-/g, ' / '),
    },
    {
      accessor: 'path',
      header: 'Path',
      className: 'kol-table-cell-meta',
      render: (row) => <code>{row.path.replace(/^.*?\/svg\//, 'svg/')}</code>,
    },
    {
      accessor: 'color',
      header: 'Color',
      className: 'kol-table-cell-meta',
      render: (row) => <code>{getToken(row.id)}</code>,
    },
    {
      accessor: 'download',
      header: 'Download',
      style: { width: 96 },
      render: (row) => {
        if (!row.raw) return null
        const token = getToken(row.id)
        return (
          <span className="inline-flex items-center gap-4">
            <button
              type="button"
              onClick={() => downloadRecolored(row.raw, resolveToken(token), `${row.name}.svg`)}
              className="inline-flex items-center text-meta hover:text-[var(--kol-accent-primary)]"
              aria-label={`Download ${row.name}.svg`}
              title="Download"
            >
              <Icon name="download" size={16} />
            </button>
            <button
              type="button"
              onClick={() => toggleToken(row.id)}
              className="inline-flex items-center justify-center w-4 h-4"
              aria-label={`Toggle download color — current ${token}`}
              title={`Toggle (currently ${token})`}
            >
              <span
                className="inline-block rounded-full border"
                style={{
                  width: 8,
                  height: 8,
                  background: `var(${token})`,
                  borderColor: 'var(--kol-fg-24)',
                }}
              />
            </button>
          </span>
        )
      },
    },
  ]
}

export default function AssetTable({ rows, previewWidthFor, caption }) {
  const withId = rows.map((r, i) => ({ ...r, id: r.path ?? i }))
  const [tokens, setTokens] = useState({})
  const [overlay, setOverlay] = useState(null)
  const getToken = (id) => tokens[id] ?? TOKEN_INK
  const toggleToken = (id) => setTokens((prev) => ({
    ...prev,
    [id]: getToken(id) === TOKEN_INK ? TOKEN_SURFACE : TOKEN_INK,
  }))
  const openOverlay = (row) => setOverlay({ row, token: getToken(row.id) })
  const closeOverlay = () => setOverlay(null)

  useEffect(() => {
    if (!overlay) return
    const onKey = (e) => { if (e.key === 'Escape') closeOverlay() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overlay])

  if (withId.length === 0) {
    return <p className="text-strong">No assets yet. Drop SVGs into the <code>svg/</code> folder.</p>
  }
  const cols = buildColumns({ previewWidthFor, getToken, toggleToken, openOverlay })
  return (
    <>
      <Table caption={caption} columns={cols} rows={withId} />
      {overlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeOverlay}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-[80vw] max-h-[80vh] p-12 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeOverlay}
              className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full text-meta hover:text-emphasis bg-fg-08"
              aria-label="Close overlay"
            >
              <Icon name="x" size={14} />
            </button>
            <span
              className="inline-flex items-center"
              style={{
                color: `var(${overlay.token})`,
                width: 'min(60vw, 480px)',
              }}
            >
              {overlay.row.render}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export function markRows() {
  return KOL_LOGO_VARIANTS.map((variant) => {
    const filename = `kol-${variant}`
    return {
      name:   variant,
      render: <KolLogo variant={variant} />,
      path:   `src/brand/logos/svg/${filename}.svg`,
      url:    MARK_URLS[filename],
      raw:    MARK_RAW[filename],
    }
  })
}

export function graphicRows(category) {
  return (GRAPHICS[category] ?? []).map((name) => ({
    name,
    render: <Graphic category={category} name={name} />,
    path:   `packages/component/src/graphics/svg/${category}/${name}.svg`,
    raw:    GRAPHIC_RAW[category]?.[name],
  }))
}

export const markWidthFor = (row) => MARK_WIDTHS[row.name] ?? DEFAULT_MARK_WIDTH
export const graphicWidthFor = () => GRAPHIC_WIDTH
