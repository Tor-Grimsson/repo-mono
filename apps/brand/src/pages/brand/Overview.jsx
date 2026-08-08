import BrandHero from '../../components/framework/BrandHero'
import PageSection from '../../components/framework/PageSection'
import CategoryIndex from '../../components/framework/CategoryIndex'
import usePageTitle from '../../components/hooks/usePageTitle'
import { BRAND } from '../../brand/config'

/* The Brand category's landing page — it owns the bare `/brand` route so no URL
 * is orphaned by the split. It carries the hero the single-page `Brand.jsx` used
 * to open with, then indexes the seven pages that were its sections. */
export default function Overview() {
  usePageTitle('Brand')

  return (
    <>
      <BrandHero
        label="brand guidelines"
        title={BRAND.name}
        lede="Client-facing identity guidelines — chapter-structured for handoff. Mirrors the shape of the deliverable PDF."
      />

      <PageSection
        id="brand-overview"
        label="Overview"
        title="Chapters"
        body="Each chapter is its own page. They read in order, but every one stands alone for handoff."
      >
        <CategoryIndex categoryId="brand" />
      </PageSection>
    </>
  )
}
