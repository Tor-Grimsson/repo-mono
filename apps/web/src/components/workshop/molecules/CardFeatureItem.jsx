import { Icon } from '@kol/ui/atoms'
import { Link } from 'react-router-dom'

const CardFeatureItem = ({ title, icon, visual, description, backgroundColor = 'bg-surface-on-inverse', href }) => {
  const CardContent = (
    <>
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-2">
        <h3 className="kol-helper-uc-md text-auto text-[16px]">{title}</h3>
        {icon && <Icon name={icon} size={16} className="flex-shrink-0 text-auto" />}
      </div>

      {/* Visual */}
      <div className="self-stretch flex-1 flex items-center justify-center overflow-hidden">
        {visual ? (
          typeof visual === 'string' ? (
            <img src={visual} alt={title} className="w-full h-full object-cover rounded" />
          ) : (
            visual
          )
        ) : (
          <Icon name={icon} size={96} className="text-auto" />
        )}
      </div>

      {/* Description */}
      <p className="kol-mono-xs text-auto opacity-50">{description}</p>
    </>
  )

  const baseClasses = `w-full flex-1 h-[304px] md:h-auto md:self-stretch p-4 md:p-6 gap-6 ${backgroundColor} rounded border inline-flex flex-col justify-between items-start overflow-hidden`

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto')

    if (isExternal) {
      return (
        <a
          href={href}
          className={`${baseClasses} border-auto hover:border-fg-64 transition-all duration-300`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {CardContent}
        </a>
      )
    }

    return (
      <Link
        to={href}
        className={`${baseClasses} border-auto hover:border-fg-64 transition-all duration-300`}
      >
        {CardContent}
      </Link>
    )
  }

  return (
    <div className={`${baseClasses} border-auto`}>
      {CardContent}
    </div>
  )
}

export default CardFeatureItem
