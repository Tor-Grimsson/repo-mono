import { Icon } from '@kol/ui/atoms'

const CardFeatureItem = ({ title, icon, visual, description, backgroundColor = 'bg-surface-on-inverse' }) => {
  return (
    <div className={`w-full flex-1 h-[304px] md:h-auto md:self-stretch p-4 md:p-6 gap-6 ${backgroundColor} rounded border border-auto inline-flex flex-col justify-between items-start overflow-hidden`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-2">
        <h3 className="kol-helper-uc-md text-auto text-[16px]">{title}</h3>
        {icon && <Icon name={icon} size={16} className="flex-shrink-0 text-auto" />}
      </div>

      {/* Visual */}
      <div className="self-stretch flex-1 hidden md:flex items-center justify-center">
        <div className="w-16 h-16 lg:w-24 lg:h-24">
          {visual || <Icon name={icon} size={96} className="text-auto w-full h-full" />}
        </div>
      </div>

      {/* Description */}
      <p className="kol-mono-xs text-auto opacity-50">{description}</p>
    </div>
  )
}

export default CardFeatureItem
