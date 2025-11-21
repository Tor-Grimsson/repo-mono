import { ButtonGroup } from '@kol/ui'
import CardFeatureItem from '../../workshop/molecules/CardFeatureItem'
import { useLanguage } from '../../../contexts/LanguageContext'

const HomeCardFeatures = () => {
  const { t } = useLanguage()
  const features = [
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
               <div className="flex items-center h-8">
                  <p className="kol-heading-md text-auto">
                     {t('home.features.label')}
                  </p>
               </div>
               <p className="kol-mono-sm text-auto opacity-60 mt-3 w-full md:w-[30%]">
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
