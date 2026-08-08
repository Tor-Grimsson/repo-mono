import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import { GiftBoxB, Packaging as PackagingMock } from '../../components/styleguide/StationeryMocks'
import AssetCard from '../../components/styleguide/AssetCard'

/* Was the `#assets-packaging` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
/* The StationeryMocks export is aliased — the page and the mock are both called
 * Packaging, and a default export cannot shadow its own import. */
export default function Packaging() {
  usePageTitle('Packaging')

  return (
    <PageSection
      id="assets-packaging"
      label="11 — assets · packaging"
      title="Packaging"
      body="Outer packaging — the box that carries the garment to its first owner."
    >
      <div className="kol-grid mt-8">
        <div className="col-span-2"><AssetCard><PackagingMock /></AssetCard></div>
      </div>

      {/* Type B variant — ported from Asset Register.html */}
      <div className="kol-grid mt-12 items-start">
        <div className="col-span-2">
          <AssetCard caption="Gift box · lid (top-down) [B]"><GiftBoxB /></AssetCard>
        </div>
      </div>
    </PageSection>
  )
}
