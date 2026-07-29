import PageSection from '../components/framework/PageSection'
import { Table } from '@kol/component'
import AssetTable, { markRows, graphicRows, markWidthFor, graphicWidthFor } from '../components/styleguide/AssetTable'
import usePageTitle from '../components/hooks/usePageTitle'

const TokenName = ({ children }) => (
  <code className="kol-helper-12 text-emphasis">{children}</code>
)

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

/* Assets — the downloadable brand-asset registry, rescued from the Reference
 * page's tail (2026-07-29 brand triage) into its own nav page. */
export default function Assets() {
  usePageTitle('Assets')

  return (
    <>
      <PageSection
        id="logos"
        label="01 — logos"
        title="Logos"
        body="Every mark in src/brand/logos/svg/. Click a row to open the overlay; toggle the color dot to swap ink vs surface; download recolored on the fly."
      >
        <AssetTable caption="Logos" rows={markRows()} previewWidthFor={markWidthFor} />
      </PageSection>

      <PageSection
        id="graphics"
        label="02 — graphics"
        title="Graphics"
        body="Abstract forms in packages/component/src/graphics/svg/abstract/. Same overlay + recolor + download behavior as the logo table."
      >
        <AssetTable caption="Graphics" rows={graphicRows('abstract')} previewWidthFor={graphicWidthFor} />
      </PageSection>

      <PageSection
        id="patterns"
        label="03 — patterns"
        title="Patterns"
        body="Tileable patterns in packages/component/src/graphics/svg/patterns/."
      >
        <AssetTable caption="Patterns" rows={graphicRows('patterns')} previewWidthFor={graphicWidthFor} />
      </PageSection>

      <PageSection
        id="branded-assets"
        label="04 — branded"
        title="Branded assets"
        body="Stationery, garment-attached labels, soft goods and packaging. Mocks live in src/components/styleguide/StationeryMocks.jsx and render in /styleguide chapter 6."
      >
        <Table caption="Branded assets" columns={brandedAssetCols} rows={brandedAssetRows} className="mt-8" />
      </PageSection>
    </>
  )
}
