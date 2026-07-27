import { useMemo } from 'react'
import { Button, ButtonGroup } from '@kolkrabbi/kol-component'
import { useThemeAttr } from '../../../hooks/useThemeAttr'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/homepage'

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
  const theme = useThemeAttr()

  // -w suffix for light/white variant
  const variant = theme === 'dark' ? '' : '-w'

  const defaultFeatures = useMemo(() => [
    {
      title: 'Type Foundry',
      icon: 'type',
      description: 'Custom typefaces',
      href: '/foundry',
      visual: `${cdnBase}/home-feat-kol/feat-kol-foundry/feat-kol-foundry${variant}-600.jpg`
    },
    {
      title: 'Client Work',
      icon: 'diamond',
      description: 'Selected projects and collaborations',
      href: '/work',
      visual: `${cdnBase}/home-feat-kol/feat-kol-client/feat-kol-client${variant}-600.jpg`
    },
    {
      title: 'Collections',
      icon: 'atomic-organism',
      description: 'Collection of design explorations',
      href: '/work?view=list',
      visual: `${cdnBase}/home-feat-kol/feat-kol-collections/feat-kol-collections${variant}-600.jpg`
    },
    {
      title: 'Workshop',
      icon: 'triangle',
      description: 'Interactive tools and utilities',
      href: '/workshop',
      visual: `${cdnBase}/home-feat-kol/feat-kol-workshop/feat-kol-workshop${variant}-600.jpg`
    }
  ], [variant])

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
  const headerTitle = headerLabel ?? 'Typefaces & Design Systems'
  const headerCopy = headerDescription ?? 'A design studio focused on typography, digital products, and creative technology.'
  const shouldShowActions = showActions && actions.length > 0

  return (
    <section className={`w-full ${sectionClassName}`}>
      <div className={wrapperClassName}>
        {showHeader && (
          <div className={headerClassName}>
            <div className="flex items-center h-8">
              <p className="kol-sans-heading-02 text-auto">
                {headerTitle}
              </p>
            </div>
            <p className={`kol-mono-12 text-auto opacity-60 mt-3 ${headerTextWidthClass}`}>
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
                imageAspectRatio={feature.imageAspectRatio}
              />
            </div>
          ))}
        </div>

        {shouldShowActions && (
          <div className={`reveal-group w-full flex justify-center ${buttonGroupClassName}`.trim()}>
            <ButtonGroup align={buttonAlign}>
              {actions.map((a, i) => (
                <Button key={i} variant={a.variant} href={a.href} onClick={a.onClick} className={a.className}>
                  {a.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturesCardSection
