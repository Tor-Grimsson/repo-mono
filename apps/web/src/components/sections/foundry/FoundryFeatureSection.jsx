import TiltCard from '../../animation/TiltCard'
import { Button, SectionLabel } from '@kol/ui'
import { Link } from 'react-router-dom'

const FoundryFeatureSection = ({
  imageSrc,
  imageAlt = '',
  imageClassName = 'w-full aspect-[5/4] rounded-[4px]',
  imagePosition = 'left',
  label,
  labelSize = 'md',
  title,
  description,
  sectionClassName = '',
  titleClassName = 'kol-heading-lg mb-6',
  descriptionClassName = 'kol-mono text-auto mb-6',
  cta,
  children,
  graphic,
  graphicWrapperClassName = 'w-full lg:flex-1',
  contentWrapperClassName = 'w-full lg:flex-1 py-16',
}) => {
  const isImageRight = imagePosition === 'right'

  const renderVisual = () => {
    if (graphic) {
      return graphic
    }

    if (imageSrc) {
      return (
        <TiltCard
          src={imageSrc}
          alt={imageAlt}
          className={imageClassName}
        />
      )
    }

    return null
  }

  return (
    <div className={`flex flex-col gap-16 py-16 ${isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${sectionClassName}`}>
      <div className={graphicWrapperClassName}>
        {renderVisual()}
      </div>

      <div className={contentWrapperClassName}>
        {label && (
          <div className="inline-flex w-auto mb-2">
            <SectionLabel className="inline-flex w-auto whitespace-nowrap" text={label} size={labelSize} />
          </div>
        )}

        {title && (
          <h2 className={titleClassName}>
            {title}
          </h2>
        )}

        {description && (
          <p className={descriptionClassName}>
            {description}
          </p>
        )}

        {children}

        {cta?.label && cta?.to && (
          <Link to={cta.to} className="inline-flex">
            <Button
              id={cta.id}
              iconLeft={cta.icon}
              size={cta.size || 'md'}
              variant={cta.variant || 'primary'}
              className={cta.className || 'mt-12 mb-3'}
            >
              {cta.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default FoundryFeatureSection
