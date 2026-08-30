import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import AssetCard from '../../components/styleguide/AssetCard'

/* Was the `#social-sizes` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
import { Graphic, GRAPHICS, ContentCollection } from '@kolkrabbi/kol-component'

export default function Social() {
  usePageTitle('Social')

  return (
    <PageSection
      id="social-sizes"
      label="12 — social · sizes"
      title="Post sizes"
      body="One template at each of the three Instagram aspect ratios — square feed (1:1), portrait feed (4:5), and story / reel (9:16). Editorial photography, restrained typography, a deliberate cadence."
    >
      <ContentCollection cols={3} className="mt-8 items-start">
        <AssetCard caption="Post · 1:1 square"><Graphic category="social" name="social-04" /></AssetCard>
        <AssetCard caption="Post · 4:5 portrait"><Graphic category="social" name="social-05" /></AssetCard>
        <AssetCard caption="Story · 9:16"><Graphic category="social" name="social-06" /></AssetCard>
      </ContentCollection>
    </PageSection>
  )
}
