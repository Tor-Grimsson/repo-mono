import GuideCard from '../../components/styleguide/atoms/GuideCard'
import ComponentPreview from '../../components/styleguide/molecules/ComponentPreview'
import { componentShowcase, componentSnippets } from '../../data/styleguide/tokens'

const Components = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="kol-heading-section">Components</h2>
        <p className="kol-mono-body mt-4">Interface primitives inherit directly from the shared token palette. Inspect hover, focus, and contrast by toggling the site theme.</p>
      </div>

      <GuideCard padding="none" border={false} rounded={false} className="space-y-4">
        {componentShowcase.map((item) => (
          <ComponentPreview key={item.id} item={item} snippet={componentSnippets[item.id]} />
        ))}
      </GuideCard>
    </div>
  )
}

export default Components
