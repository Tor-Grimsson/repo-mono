import DesSection from './DesSection'
import DesCard from './DesCard'
import { Table } from '@kol/ui'

// Sample data - Page Surfaces from color system
const sampleColumns = [
  {
    header: 'Token',
    accessor: 'token',
    className: 'dt-cell-text',
    render: (row) => (
      <span className="dataTableToken bg-fg-08">{row.token}</span>
    )
  },
  {
    header: 'Light Mode',
    accessor: 'light',
    className: 'dt-cell-metaStrong',
    render: (row) => (
      <div className="flex items-center gap-3">
        <span
          className="w-6 h-6 rounded border border-auto"
          style={{ backgroundColor: row.light.hex }}
        />
        <span className="kol-mono-text text-xs">{row.light.label}</span>
      </div>
    )
  },
  {
    header: 'Dark Mode',
    accessor: 'dark',
    className: 'dt-cell-metaStrong',
    render: (row) => (
      <div className="flex items-center gap-3">
        <span
          className="w-6 h-6 rounded border border-auto"
          style={{ backgroundColor: row.dark.hex }}
        />
        <span className="kol-mono-text text-xs">{row.dark.label}</span>
      </div>
    )
  },
  {
    header: 'Usage',
    accessor: 'usage',
    className: 'dt-cell-meta',
    style: { maxWidth: '280px' }
  }
]

const sampleRows = [
  {
    id: 'surface-primary',
    token: '--kol-surface-primary',
    light: { label: '#fafafa', hex: '#fafafa' },
    dark: { label: '#121215', hex: '#121215' },
    usage: 'App background, primary containers, and hero sections.'
  },
  {
    id: 'surface-secondary',
    token: '--kol-surface-secondary',
    light: { label: '#f8f8f8', hex: '#f8f8f8' },
    dark: { label: '#19191d', hex: '#19191d' },
    usage: 'Raised cards, neutral panels, and drawer surfaces.'
  },
  {
    id: 'surface-inverse',
    token: '--kol-surface-inverse',
    light: { label: '#0e0e11', hex: '#0e0e11' },
    dark: { label: '#fcfbf8', hex: '#fcfbf8' },
    usage: 'Navigation bars, hero banners, and inverted callouts.'
  }
]

export default function TablePreview() {
  return (
    <div className="space-y-4">
      <DesSection
        name="Table"
        description="Structured data table molecule with column configuration, custom renderers, and theme-aware styling. Used for displaying tabular data with semantic HTML."
      />

      <DesCard
        name="Page Surfaces Example"
        description="Table showing color token data with custom cell renderers for swatches and labels."
        details="Columns support custom render functions, className, and inline styles. Rows can be any data structure accessed via column accessor keys."
      />

      <Table
        caption="Page surface tokens"
        columns={sampleColumns}
        rows={sampleRows}
      />
    </div>
  )
}
