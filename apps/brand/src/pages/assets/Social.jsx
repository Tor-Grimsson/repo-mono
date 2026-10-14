import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import AssetCard from '../../components/styleguide/AssetCard'

/* Was the `#social-sizes` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
import { ContentCollection } from '@kolkrabbi/kol-component'
import { PostPhoto, PostEditorial, StoryPhoto } from '../../components/styleguide/SocialMocks'

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
        {/* the studio's own mocks (brand pass 2026-10-14) — the DS `social-04/05/06` graphics were
          * Another Creation's model photo and lockup */}
        <AssetCard caption="Post · 1:1 square"><PostPhoto /></AssetCard>
        <AssetCard caption="Post · 4:5 portrait"><div className="aspect-[4/5] overflow-hidden rounded-sm"><PostEditorial /></div></AssetCard>
        <AssetCard caption="Story · 9:16"><StoryPhoto /></AssetCard>
      </ContentCollection>
    </PageSection>
  )
}
