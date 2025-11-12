import { ButtonGroup, SectionLabel } from '@kol/ui'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'
import { useLanguage } from '../../../contexts/LanguageContext'

const HomeCardFeatures = () => {
  const { t } = useLanguage()
  const features = [
    {
      title: t('home.features.typeFoundry.title'),
      icon: 'foundation',
      description: t('home.features.typeFoundry.description'),
      href: '/foundry'
    },
    {
      title: t('home.features.clientWork.title'),
      icon: 'component',
      description: t('home.features.clientWork.description'),
      href: '/work'
    },
    {
      title: t('home.features.collections.title'),
      icon: 'styleguide',
      description: t('home.features.collections.description'),
      href: '/collections'
    },
    {
      title: t('home.features.workshop.title'),
      icon: 'arrow-up',
      description: t('home.features.workshop.description'),
      href: '/workshop'
    }
  ]

  const actions = [
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

  return (
    <section className="w-full">
      <div className='w-full flex flex-col gap-8 md:gap-10 max-w-[1400px] mx-auto'>
            {/* Header */}
            <div className="w-full pt-[224px]">
               <SectionLabel text={t('home.features.label')} size="lg" />
               <p className="kol-mono-sm text-auto opacity-60 mt-3 w-[30%]">
                  {t('home.features.intro')}
               </p>
            </div>

            {/* Features Grid */}
            <div className="self-stretch inline-flex flex-col md:flex-row md:h-72 justify-start items-center gap-6">
               {features.map((feature, index) => (
                  <CardFeatureItem
                  key={index}
                  title={feature.title}
                  icon={feature.icon}
                  visual={feature.visual}
                  description={feature.description}
                  href={feature.href}
                  />
               ))}
            </div>

            {/* Actions */}
            {actions.length > 0 && (
               <ButtonGroup buttons={actions} align="center" className="pt-10 pb-24" />
            )}
      </div>
    </section>
  )
}

export default HomeCardFeatures
