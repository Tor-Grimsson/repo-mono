import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import AssetTable, { markRows, graphicRows, markWidthFor, graphicWidthFor } from '../../components/styleguide/AssetTable'

/* Was the `#graphics` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */


export default function Graphics() {
  usePageTitle('Graphics')

  return (
    <PageSection
      id="graphics"
      label="02 — graphics"
      title="Graphics"
      body="Abstract forms in packages/component/src/graphics/svg/abstract/. Same overlay + recolor + download behavior as the logo table."
    >
      <AssetTable caption="Graphics" rows={graphicRows('abstract')} previewWidthFor={graphicWidthFor} />
    </PageSection>
  )
}
