import { ButtonGroup } from '@kol/ui'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'
import { useLanguage } from '../../../contexts/LanguageContext'

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
  const { t } = useLanguage()

  const defaultFeatures = [
    {
      title: t('home.features.typeFoundry.title'),
      icon: 'type',
      description: t('home.features.typeFoundry.description'),
      href: '/foundry',
      visual: '/img/home/feat-1.png'
    },
    {
      title: t('home.features.clientWork.title'),
      icon: 'diamond',
      description: t('home.features.clientWork.description'),
      href: '/work',
      visual: '/img/home/feat-2.png'
    },
    {
      title: t('home.features.collections.title'),
      icon: 'atomic-organism',
      description: t('home.features.collections.description'),
      href: '/collections',
      visual: '/img/home/feat-3.png'
    },
    {
      title: t('home.features.workshop.title'),
      icon: 'triangle',
      description: t('home.features.workshop.description'),
      href: '/workshop',
      visual: '/img/home/feat-4.png'
    }
  ]

  const defaultActions = [
    {
      label: t('home.features.actions.explore'),
      variant: 'primary',
      href: '/work'
    },
    {
      label: t('home.features.actions.contact'),
      variant: 'secondary',
      href: 'mailto:hello@kolkrabbi.io'
    }
  ]

  const features = featuresProp ?? defaultFeatures
  const actions = actionsProp ?? defaultActions
  const headerTitle = headerLabel ?? t('home.features.label')
  const headerCopy = headerDescription ?? t('home.features.intro')
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
            <CardFeatureItem
              key={index}
              title={feature.title}
              icon={feature.icon}
              visual={feature.visual}
              description={feature.description}
              href={feature.href}
              backgroundColor={feature.backgroundColor}
            />
          ))}
        </div>

{shouldShowActions && (
  <div className={`w-full flex justify-center ${buttonGroupClassName}`.trim()}>
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
