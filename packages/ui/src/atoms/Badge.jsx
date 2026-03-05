import Icon from './icons/Icon'

const Badge = ({ children, icon, size = 20, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border border-fg-08 bg-fg-inverse-04 ${className}`.trim()}>
      {icon && <Icon name={icon} size={size} className="text-fg-64" />}
      <span className="dash-body font-medium" style={{ textBoxTrim: 'both', textBoxEdge: 'cap alphabetic' }}>{children}</span>
    </div>
  )
}

export default Badge
