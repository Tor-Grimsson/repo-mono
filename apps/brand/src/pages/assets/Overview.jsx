import PageSection from '../../components/framework/PageSection'
import CategoryIndex from '../../components/framework/CategoryIndex'
import usePageTitle from '../../components/hooks/usePageTitle'

/* The Assets category's landing page — it owns the bare `/assets` route so no
 * URL is orphaned by the split, and indexes the ten pages that were its
 * sections. */
export default function Overview() {
  usePageTitle('Assets')

  return (
    <PageSection
      id="assets-overview"
      label="Assets"
      title="Downloads and reproduction"
      body="Everything you download or reproduce. Brand documents the identity; this holds the files and the specs for making them."
    >
      <CategoryIndex categoryId="assets" />
    </PageSection>
  )
}
