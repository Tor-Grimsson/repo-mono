import { ButtonGroup } from '@kol/ui'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'

const FeaturesCardSection = ({
  features: featuresProp,
  showHeader = true,
  headerLabel,
  headerDescription,
  showActions = true,
  actions: actionsProp,
  sectionClassName = '',
  wrapperClassName = 'w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto',
  cardsWrapperClassName = 'self-stretch inline-flex flex-col md:flex-row md:h-72 justify-start items-center gap-6',
  buttonGroupClassName = 'pt-10 pb-24',
  buttonAlign = 'center',
  headerClassName = 'w-full pt-[224px]',
  headerTextWidthClass = 'w-full md:w-[30%]'
}) => {
  const defaultFeatures = [
    {
      title: 'Type Foundry',
      icon: 'type',
      description: 'Custom typefaces designed for digital and print.',
      href: '/foundry',
      visual: '/img/home/feat-1.png'
    },
    {
      title: 'Client Work',
      icon: 'diamond',
      description: 'Selected projects and collaborations.',
      href: '/work',
      visual: '/img/home/feat-2.png'
    },
    {
      title: 'Collections',
      icon: 'atomic-organism',
      description: 'Curated design explorations and experiments.',
      href: '/collections',
      visual: '/img/home/feat-3.png'
    },
    {
      title: 'Workshop',
      icon: 'triangle',
      description: 'Interactive tools and creative utilities.',
      href: '/workshop',
      visual: '/img/home/feat-4.png'
    }
  ]

  const defaultActions = [
    {
      label: 'Explore Projects',
      variant: 'primary',
      href: '/work'
    },
    {
      label: 'Get in Touch',
      variant: 'secondary',
      href: 'mailto:hello@kolkrabbi.io',
      className: 'border border-fg-08'
    }
  ]

  const features = featuresProp ?? defaultFeatures
  const actions = actionsProp ?? defaultActions
  const headerTitle = headerLabel ?? 'What We Do'
  const headerCopy = headerDescription ?? 'A design studio focused on typography, digital products, and creative technology.'
  const shouldShowActions = showActions && actions.length > 0

  return (
    <section className={`w-full ${sectionClassName}`}>
      <div className={wrapperClassName}>
        {showHeader && (
          <div className={headerClassName}>
            <div className="flex items-center h-8">
              <p className="kol-heading-md text-auto">
                {headerTitle}
              </p>
            </div>
            <p className={`kol-mono-sm text-auto opacity-60 mt-3 ${headerTextWidthClass}`}>
              {headerCopy}
            </p>
          </div>
        )}

        <div className={cardsWrapperClassName}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal flex-1"
              style={{ '--reveal-delay': `${index * 0.15}s` }}
            >
              <CardFeatureItem
                title={feature.title}
                icon={feature.icon}
                visual={feature.visual}
                description={feature.description}
                href={feature.href}
                backgroundColor={feature.backgroundColor}
              />
            </div>
          ))}
        </div>

        {shouldShowActions && (
          <div className={`reveal-group w-full flex justify-center ${buttonGroupClassName}`.trim()}>
            <ButtonGroup
              buttons={actions}
              align={buttonAlign}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturesCardSection
