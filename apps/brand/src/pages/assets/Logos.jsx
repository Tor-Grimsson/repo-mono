import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import AssetTable, { markRows, graphicRows, markWidthFor, graphicWidthFor } from '../../components/styleguide/AssetTable'

/* Was the `#logos` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
export default function Logos() {
  usePageTitle('Logos')

  return (
    <PageSection
      id="logos"
      label="01 — logos"
      title="Logos"
      body="Every mark in src/brand/logos/svg/. Click a row to open the overlay; toggle the color dot to swap ink vs surface; download recolored on the fly."
    >
      <AssetTable caption="Logos" rows={markRows()} previewWidthFor={markWidthFor} />
    </PageSection>
  )
}
