import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import LogoCard from '../../components/styleguide/LogoCard'

/* Was the `#logos-types` PageSection inside `pages/Brand.jsx` until 2026-08-01, when
 * the nav went category → page and every section became its own route. The
 * block below is that section verbatim — extracted, not re-authored. */
export default function Lockups() {
  usePageTitle('Lockups')

  return (
    <PageSection
      id="logos-types"
      label="05 — logos · types"
      title="Marks and lockups"
      body="Logomark, wordmark, and two primary lockups."
    >
      {/* clearspace is the DS diagram again (2026-10-14): kol-component 0.260.0's `clearspace-*`
        * graphics carry the KOL marks and the clearspace measure — through 0.259.0 the `x` layer was
        * Another Creation's signature ghost (ClearspaceGraphicsAreAnotherCreations). */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <LogoCard variant="logomark"    caption="Logomark" />
        <LogoCard variant="wordmark"    caption="Wordmark" />
        <LogoCard variant="lockup-hori" caption="Horizontal lockup" />
        <LogoCard variant="lockup-vert" caption="Vertical lockup" />
      </div>
    </PageSection>
  )
}
