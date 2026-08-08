import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'

/* Was the `#voice` PageSection inside `pages/Brand.jsx` until 2026-08-01, when
 * the nav went category → page and every section became its own route. The
 * block below is that section verbatim — extracted, not re-authored. */
export default function Tone() {
  usePageTitle('Tone')

  return (
    <PageSection
      id="voice"
      label="02 — tone"
      title="Tone"
      body="How the studio sounds — clear, structured, quietly confident."
    >
      <div className="kol-prose mt-12">
        <p>Kolkrabbi speaks quietly and deliberately. The voice is clear, structured, and craft-driven — it favours specifics over claims, systems over slogans, the considered phrase over the loud one. It shows the thinking, not just the outcome, and it addresses the reader who wants to understand, never the one being sold to.</p>
      </div>
    </PageSection>
  )
}
