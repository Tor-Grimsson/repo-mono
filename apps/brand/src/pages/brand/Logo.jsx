import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import LogoCard from '../../components/styleguide/LogoCard'

/* Was the `#logos-concept` PageSection inside `pages/Brand.jsx` until 2026-08-01, when
 * the nav went category → page and every section became its own route. The
 * block below is that section verbatim — extracted, not re-authored. */
export default function Logo() {
  usePageTitle('Logo')

  return (
    <PageSection
      id="logos-concept"
      label="04 — logos · concept"
      title="The mark"
      body="Two distinct marks — a wordmark and a signature — used alone or in lockup."
    >
      <div className="kol-prose mt-12">
        <p>The current mark system replaces the previous brand mark with a pair: the wordmark, set in Right Grotesk Compact Medium (the earlier Baskerville-set wordmark is retired), and the signature — a personal trace from Ýr Þrastardóttir herself. Used alone, each carries the brand; together as a lockup, they form the primary application.</p>
      </div>
      <div className="kol-grid mt-12">
        <LogoCard variant="wordmark" clearspace={false} frame={false} />
        <LogoCard variant="logomark" clearspace={false} frame={false} />
      </div>
    </PageSection>
  )
}
