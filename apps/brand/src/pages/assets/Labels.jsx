import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import { CareLabel, CareLabelB, EditionCard, EditionCardB, Hangtag, HangtagB, NeckLabel, NeckLabelB, SizeLabel, SizeLabelB, SwingTag, SwingTagB } from '../../components/styleguide/StationeryMocks'
import AssetCard from '../../components/styleguide/AssetCard'

/* Was the `#assets-labels-tags` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
export default function Labels() {
  usePageTitle('Labels')

  return (
    <PageSection
      id="assets-labels-tags"
      label="09 — assets · labels & tags"
      title="Labels & tags"
      body="Sewn into the garment, tied to it, or bundled with it on arrival."
    >
      <div className="kol-grid mt-8">
        <div className="col-span-1"><AssetCard><Hangtag side="front" /></AssetCard></div>
        <div className="col-span-1"><AssetCard><Hangtag side="back" /></AssetCard></div>
        <div className="col-span-1"><AssetCard><SwingTag /></AssetCard></div>
        <div className="col-span-1"><AssetCard><EditionCard /></AssetCard></div>
      </div>

      <div className="kol-grid mt-6">
        <div className="col-span-1"><AssetCard><NeckLabel /></AssetCard></div>
        <div className="col-span-1"><AssetCard><SizeLabel /></AssetCard></div>
        <div className="col-span-1"><AssetCard><CareLabel /></AssetCard></div>
      </div>

      {/* Type B variants — ported from Asset Register.html */}
      <div className="kol-grid mt-12 items-start">
        <AssetCard caption="Hangtag · front [B]"><HangtagB side="front" /></AssetCard>
        <AssetCard caption="Hangtag · back [B]"><HangtagB side="back" /></AssetCard>
        <AssetCard caption="Swing tag [B]"><SwingTagB /></AssetCard>
        <AssetCard caption="Edition card [B]"><EditionCardB /></AssetCard>
      </div>
      <div className="kol-grid mt-6 items-start">
        <AssetCard caption="Neck · cream [B]"><NeckLabelB variant="cream" /></AssetCard>
        <AssetCard caption="Neck · burgundy [B]"><NeckLabelB variant="dark" /></AssetCard>
        <AssetCard caption="Size · S [B]"><SizeLabelB size="S" /></AssetCard>
        <AssetCard caption="Size · M [B]"><SizeLabelB size="M" /></AssetCard>
      </div>
      <div className="kol-grid mt-6 items-start">
        <AssetCard caption="Size · L [B]"><SizeLabelB size="L" /></AssetCard>
        <AssetCard caption="Care · A minimal [B]"><CareLabelB tier="A" /></AssetCard>
        <AssetCard caption="Care · B standard [B]"><CareLabelB tier="B" /></AssetCard>
        <AssetCard caption="Care · C long [B]"><CareLabelB tier="C" /></AssetCard>
      </div>
    </PageSection>
  )
}
