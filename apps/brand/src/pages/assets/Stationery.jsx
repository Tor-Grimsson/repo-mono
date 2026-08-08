import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import { BusinessCardBack, BusinessCardFront, EmailSignature, Envelope, Letterhead, LetterheadB } from '../../components/styleguide/StationeryMocks'
import AssetCard from '../../components/styleguide/AssetCard'

/* Was the `#assets-stationery` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
export default function Stationery() {
  usePageTitle('Stationery')

  return (
    <PageSection
      id="assets-stationery"
      label="08 — assets · stationery"
      title="Stationery"
      body="Standard correspondence — business card, envelope, letterhead, email signature. Quiet typography, generous space, monochrome restraint."
    >
      <div className="kol-grid mt-8">
        <div className="col-span-2"><AssetCard><BusinessCardFront /></AssetCard></div>
        <div className="col-span-2"><AssetCard><Envelope /></AssetCard></div>
        <div className="col-span-2 flex flex-col gap-3">
          <AssetCard><BusinessCardBack /></AssetCard>
          <AssetCard><EmailSignature /></AssetCard>
        </div>
        <div className="col-span-2"><AssetCard><Letterhead /></AssetCard></div>
      </div>

      <div className="kol-grid mt-12">
        <div className="col-span-2">
          <AssetCard caption="Letterhead · A4 [B]"><LetterheadB /></AssetCard>
        </div>
      </div>
    </PageSection>
  )
}
