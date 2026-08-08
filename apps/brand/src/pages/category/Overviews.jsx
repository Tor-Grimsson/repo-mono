import PageSection from '../../components/framework/PageSection'
import CategoryIndex from '../../components/framework/CategoryIndex'
import usePageTitle from '../../components/hooks/usePageTitle'

/**
 * Overview pages for the categories whose landing page is just an index.
 *
 * Brand and Assets have their own (they carry a hero and real copy); Slide deck,
 * Library, Editor and Icons already own their bare route with a working surface,
 * so only Monitor lands here for now. One component, one export per category —
 * a category with nothing to say gets an honest index, not an invented page.
 */
function Overview({ id, label, title, body }) {
  usePageTitle(label)
  return (
    <PageSection id={`${id}-overview`} label={label} title={title} body={body}>
      <CategoryIndex categoryId={id} />
    </PageSection>
  )
}

export function MonitorOverview() {
  return (
    <Overview
      id="monitor"
      label="Monitor"
      title="Monitor"
      body="New category, 2026-08-01. Nothing under it is built yet — the pages exist so the shape is agreed before the work starts."
    />
  )
}
