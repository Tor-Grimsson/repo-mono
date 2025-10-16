import DesSection from './DesSection'
import DesCard from './DesCard'
import DataTable from './DataTable'

const sampleColumns = [
  { header: 'Column', accessor: 'column', className: 'kol-mono-text text-xs opacity-80' },
  { header: 'Description', accessor: 'description', className: 'kol-mono-text text-xs opacity-80' },
  { header: 'Example', accessor: 'example', className: 'kol-mono-text text-xs' }
]

const sampleRows = [
  {
    column: 'Token',
    description: 'Semantic name you reference in components',
    example: '--surface-primary'
  },
  {
    column: 'Dark Mode Value',
    description: 'Resolved value in default dark theme',
    example: '#121215'
  },
  {
    column: 'Light Mode Value',
    description: 'Resolved value when inverted to light mode',
    example: '#fcfbf8'
  }
]

const TablePreview = () => (
  <div className="space-y-4">
    <DesSection
      name="Table"
      description="Reusable molecule for rendering styleguide tables with consistent shell and overflow behaviour."
    />
    <DesCard
      name="<DataTable />"
      description="Molecule for data-heavy tables with shared shell, overflow handling, and consistent header typography."
      code="<DataTable caption='…' columns={columns} rows={rows} />"
    />
    <p className="kol-mono-text opacity-70">
      Use this component when you need scrollable tables with standard spacing. Pass column metadata and rows as shown below.
    </p>
    <DataTable caption="Sample semantic token table" columns={sampleColumns} rows={sampleRows} />
  </div>
)

export default TablePreview
