import FeatureCard from '../../components/styleguide/molecules/FeatureCard'
import GuideCard from '../../components/styleguide/atoms/GuideCard'
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
      <div>
        <h2 className="kol-heading-section">Kolkrabbi Design System</h2>
        <p className="kol-mono-body mt-4">Use this styleguide to validate tokens, components, and theming behaviours without scanning the entire site.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featureCards.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      <GuideCard padding="lg" className="space-y-4">
        <h2 className="text-2xl font-semibold">How to use this page</h2>
        <p className="kol-body opacity-70">
          Switch your theme with the site toggle, then review the sections below. Each module reads directly from the
          shared token map, so discrepancies here will mirror production routes. Use this as a pre-flight checklist before
          shipping layout or token changes.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link to="colors" className="btn-primary">
            Inspect Colors
          </Link>
          <Link to="typography" className="btn-secondary">
            Review Typography
          </Link>
        </div>
      </GuideCard>
    </div>
  )
}

export default Introduction
