import GuideCard from '../../components/styleguide/atoms/GuideCard'
import { SectionHeader } from '@kol/ui'
import ComponentPreview from '../../components/styleguide/molecules/ComponentPreview'
import { componentShowcase, componentSnippets } from '../../data/styleguide/tokens'

const Components = () => {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Components"
        description="Interface primitives inherit directly from the shared token palette. Inspect hover, focus, and contrast by toggling the site theme."
      />

      <GuideCard padding="lg" className="space-y-4">
        {componentShowcase.map((item) => (
          <ComponentPreview key={item.id} item={item} snippet={componentSnippets[item.id]} />
        ))}
      </GuideCard>
    </div>
  )
}

export default Components
