import Icon from './icons/Icon.jsx'
import ButtonBullshit from './ButtonBullshit.jsx'

/**
 * SidebarMenuItem - A menu item component using ButtonBullshit
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} props.icon - Icon name for left side
 * @param {string} [props.iconRight] - Icon name for right side (optional)
 * @param {boolean} [props.isActive=false] - Whether item is currently active
 * @param {boolean} [props.isCollapsed=false] - Whether sidebar is collapsed
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional classes
 * @param {Object} [props...props] - Additional props spread
 */
const SidebarMenuItem = ({
  children,
  icon,
  iconRight,
  isActive = false,
  isCollapsed = false,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <ButtonBullshit
      onClick={onClick}
      className={`
        inline-flex items-center justify-between h-8 px-4 py-2 w-full
        ${isCollapsed ? 'w-10 justify-center' : ''}
        ${isActive ? 'opacity-80' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Icon Left */}
      <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <Icon name={icon || 'foundations'} size={16} />
        {!isCollapsed && <span className="kol-mono-text text-[14px]">{children}</span>}
      </div>

      {/* Icon Right */}
      {iconRight && !isCollapsed && (
        <Icon name={iconRight} size={14} />
      )}
    </ButtonBullshit>
  )
}

export default SidebarMenuItem
