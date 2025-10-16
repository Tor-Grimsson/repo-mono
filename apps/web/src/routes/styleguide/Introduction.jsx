import DesPage from '../../components/styleguide/molecules/DesPage'
import DesSection from '../../components/styleguide/molecules/DesSection'
import FeatureCard from '../../components/styleguide/molecules/FeatureCard'
import { Link } from 'react-router-dom'

const featureCards = [
  {
    title: 'Design Tokens',
    description: 'Foundational color, typography, and spacing values accessible via CSS variables.',
    to: 'colors'
  },
  {
    title: 'Components',
    description: 'Composable primitives aligned with the shared Tailwind v4 token system.',
    to: 'components'
  },
  {
    title: 'Guidelines',
    description: 'Usage patterns and live previews for both light and dark modes.',
    to: 'logo'
  }
]

const Introduction = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Kolkrabbi Design System"
        subtitle="Use this styleguide to validate tokens, components, and theming behaviours without scanning the entire site."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featureCards.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      <DesSection
        name="How to use this page"
        description="Toggle the site theme, then use the sections below as a pre-flight checklist before shipping token changes."
      />

      <div className="kol-text opacity-70">
        Each module reads directly from the shared token map, so discrepancies here mirror production routes.
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link to="colors" className="btn-primary">Inspect Colors</Link>
        <Link to="typography" className="btn-secondary">Review Typography</Link>
      </div>
    </div>
  )
}

export default Introduction
