import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import { brandedAssetCols, brandedAssetRows } from '../../components/sections/assets-bits'
import { Table, Graphic, GRAPHICS } from '@kolkrabbi/kol-component'

/* Was the `#branded-assets` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
export default function Branded() {
  usePageTitle('Branded')

  return (
    <PageSection
      id="branded-assets"
      label="04 — branded"
      title="Branded assets"
      body="Stationery, garment-attached labels, soft goods and packaging. Mocks live in src/components/styleguide/StationeryMocks.jsx and render in /styleguide chapter 6."
    >
      <Table caption="Branded assets" columns={brandedAssetCols} rows={brandedAssetRows} className="mt-8" />
    </PageSection>
  )
}
