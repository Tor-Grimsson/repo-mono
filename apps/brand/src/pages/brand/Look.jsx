import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'

/* Was the `#look` PageSection inside `pages/Brand.jsx` until 2026-08-01, when
 * the nav went category → page and every section became its own route. The
 * block below is that section verbatim — extracted, not re-authored. */
export default function Look() {
  usePageTitle('Look')

  return (
    <PageSection
      id="look"
      label="03 — look"
      title="Look"
      body="How the brand appears — editorial, restrained, photo-driven."
    >
      <div className="kol-prose mt-12">
        <p>Visually, the brand sits in restraint. Photography leans editorial — landscape, material, figure — with natural light over studio gloss. Compositions are direct, not styled. Type is set quietly, with deliberate spacing. Color holds to a small, confident palette anchored on burgundy and cream. The brand never ornaments where it can let the garment speak.</p>
      </div>
    </PageSection>
  )
}
