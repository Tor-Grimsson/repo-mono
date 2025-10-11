import FeatureCard from '../../components/styleguide/molecules/FeatureCard'
import GuideCard from '../../components/styleguide/atoms/GuideCard'
import { SectionHeader } from '@kol/ui'
import { Link } from 'react-router-dom'

const featureCards = [
  {
    title: 'Design Tokens',
    description: 'Foundational color, typography, and spacing values accessible via CSS variables.'
  },
  {
    title: 'Components',
    description: 'Composable primitives aligned with the shared Tailwind v4 token system.'
  },
  {
    title: 'Guidelines',
    description: 'Usage patterns and live previews for both light and dark modes.'
  }
]

const Introduction = () => {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Kolkrabbi Design System"
        description="Use this styleguide to validate tokens, components, and theming behaviours without scanning the entire site."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featureCards.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      <GuideCard padding="lg" className="space-y-4">
        <h2 className="text-2xl font-semibold textAbsoluteBlack">How to use this page</h2>
        <p className="kol-body textAbsoluteBlack opacity-70">
          Switch your theme with the site toggle, then review the sections below. Each module reads directly from the
          shared token map, so discrepancies here will mirror production routes. Use this as a pre-flight checklist before
          shipping layout or token changes.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link to="colors" className="btn-secondary">
            Inspect Colors
          </Link>
          <Link to="typography" className="btn-outline">
            Review Typography
          </Link>
        </div>
      </GuideCard>
    </div>
  )
}

export default Introduction
