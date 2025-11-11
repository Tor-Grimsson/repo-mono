import { Link } from 'react-router-dom'
import Icon from './icons/Icon'

/**
 * LinkWithIcon Component
 *
 * A styled link component with an icon
 *
 * @param {string} to - The route/URL to link to
 * @param {string} children - Link text
 * @param {string} iconName - Icon name (defaults to 'arrow-right')
 * @param {number} iconSize - Icon size in pixels (defaults to 12)
 * @param {string} iconPosition - Icon position: 'left' or 'right' (defaults to 'right')
 * @param {string} className - Additional classes (optional)
 */
const LinkWithIcon = ({
  to,
  children,
  iconName = 'arrow-right',
  iconSize = 12,
  iconPosition = 'right',
  className = ''
}) => {
  const isLeft = iconPosition === 'left'
  // Auto-swap arrow-right to arrow-left when position is left
  const displayIconName = isLeft && iconName === 'arrow-right' ? 'arrow-left' : iconName

  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 kol-mono-sm text-auto hover:gap-4 transition-all ${className}`}
    >
      {isLeft && (
        <Icon
          name={displayIconName}
          size={iconSize}
          className="transition-transform group-hover:-translate-x-1"
        />
      )}
      {children}
      {!isLeft && (
        <Icon
          name={iconName}
          size={iconSize}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </Link>
  )
}

export default LinkWithIcon
