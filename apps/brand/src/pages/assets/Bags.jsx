import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import { DressBagB, DustBag, DustBagB, GarmentBag } from '../../components/styleguide/StationeryMocks'
import AssetCard from '../../components/styleguide/AssetCard'

/* Was the `#assets-garment-bags` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
export default function Bags() {
  usePageTitle('Bags')

  return (
    <PageSection
      id="assets-garment-bags"
      label="10 — assets · garment bags"
      title="Garment bags"
      body="How the garment travels — dust bag and garment bag."
    >
      <div className="kol-grid kol-grid--tight-y mt-8">
        <div className="col-span-1 self-end"><AssetCard><GarmentBag /></AssetCard></div>
        <div className="col-span-2 col-start-3 self-end"><AssetCard><DustBag /></AssetCard></div>
      </div>

      {/* Type B variants — ported from Asset Register.html */}
      <div className="kol-grid mt-12 items-start">
        <div className="col-span-1">
          <AssetCard caption="Dress bag [B]"><DressBagB /></AssetCard>
        </div>
        <div className="col-span-2 col-start-3">
          <AssetCard caption="Dust bag [B]"><DustBagB /></AssetCard>
        </div>
      </div>
    </PageSection>
  )
}
