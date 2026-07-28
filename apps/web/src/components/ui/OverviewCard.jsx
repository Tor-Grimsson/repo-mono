import { Link } from 'react-router-dom'
import { Icon } from '@kolkrabbi/kol-component'

// ponytail: vendored verbatim from elder @kol/ui (no DS twin as of kol-dashboards 0.2.0);
// lobby to the DS or fold into kol-dashboards if a second consumer app appears
const OverviewCard = ({ label, subtitle, description, icon, image, href, target, rel, className = '' }) => {
  const internal = href?.startsWith('/')
  const Tag = internal ? Link : 'a'
  const linkProps = internal ? { to: href } : { href, target, rel }
  return (
    <Tag {...linkProps} className={`group flex aspect-[4/3] flex-col gap-3 rounded bg-surface-inverse p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="kol-helper-uc-s">{label}</h3>
          {subtitle && <p className="kol-helper-regular-xxs mt-1 italic text-fg-64">{subtitle}</p>}
        </div>
        <Icon name={icon} size={16} />
      </div>

      <div className="flex flex-1 items-center justify-center overflow-hidden rounded border border-fg-08">
        {image ? (
          <img
            src={image}
            alt={label}
            className="h-full w-full scale-100 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Icon name={icon} size={64} className="text-auto transition-transform duration-300 group-hover:scale-105" />
        )}
      </div>

      {description && <p className="kol-helper-xxs line-clamp-1 text-fg-48">{description}</p>}
    </Tag>
  )
}

export default OverviewCard
