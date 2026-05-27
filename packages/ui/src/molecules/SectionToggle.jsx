import { Divider } from '@kol/component'
import { Icon } from '@kol/component'

const SectionToggle = ({
  label,
  isExpanded = false,
  onToggle,
  className = '',
  indicator = true,
  indicatorClassName = '',
  withDivider = true,
  dividerClassName = 'w-full'
}) => {
  return (

    <>
      <div className='flex flex-col gap-4 py-8'>
         <button
         type="button"
         onClick={onToggle}
         className={`flex w-full items-center justify-between group ${className}`.trim()}
         aria-expanded={isExpanded}
         >
         <span className="kol-mono-text-label">{label}</span>
         {indicator ? (
            <span className={indicatorClassName || undefined}>
               <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={12} />
            </span>
         ) : null}
         </button>
         {withDivider ? <Divider className={dividerClassName} /> : null}
      </div>
    </>
  )
}

export default SectionToggle
