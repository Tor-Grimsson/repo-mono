import React from 'react'

/**
 * Button Component
 *
 * Unified button component supporting both link and button variants
 * Uses design system classes from theme.css
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Button content
 * @param {'primary'|'secondary'|'accent'|'outline'} props.variant - Visual variant
 * @param {string} props.href - Link destination (makes it an <a>)
 * @param {Function} props.onClick - Click handler (makes it a <button>)
 * @param {string} props.className - Additional classes
 * @param {Object} props.style - Inline styles
 */
const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  style = {}
}) => {
  const baseClass = variant === 'primary'
    ? 'btn-primary'
    : variant === 'accent'
    ? 'btn-accent'
    : variant === 'outline'
    ? 'btn-outline'
    : 'btn-secondary'

  const combinedClass = `${baseClass} ${className}`

  if (onClick || !href) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={combinedClass}
        style={style}
      >
        {children}
      </button>
    )
  }

  return (
    <a
      href={href}
      className={combinedClass}
      style={style}
    >
      {children}
    </a>
  )
}

export default Button
