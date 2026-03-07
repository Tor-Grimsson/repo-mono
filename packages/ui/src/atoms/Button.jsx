import React from 'react'
import Icon from './icons/Icon'

/**
 * Button Component
 *
 * Unified button component supporting both link and button variants with optional icons
 * Uses design system classes from theme.css
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Button content
 * @param {'primary'|'secondary'|'accent'|'outline'|'control'} props.variant - Visual variant
 * @param {'sm'|'md'|'lg'} props.size - Button size (default: 'md')
 * @param {boolean} props.uppercase - Text transform uppercase (default: true)
 * @param {string} props.iconLeft - Icon name to display on the left
 * @param {string} props.iconRight - Icon name to display on the right
 * @param {string} props.iconLeftHover - Icon to show on hover (left position)
 * @param {string} props.iconRightHover - Icon to show on hover (right position)
 * @param {string} props.iconOnly - Icon name for icon-only button
 * @param {string} props.iconOnlyHover - Icon to show on hover (icon-only)
 * @param {boolean} props.animateIcon - Disable default hover states to focus on icon animation
 * @param {number} props.iconSize - Size of the icon in pixels (default: auto by size)
 * @param {string} props.href - Link destination (makes it an <a>)
 * @param {Function} props.onClick - Click handler (makes it a <button>)
 * @param {string} props.className - Additional classes
 * @param {Object} props.style - Inline styles
 * @param {string} props.type - Button type attribute (default: 'button')
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.selected - Selected/active state (toggle highlight)
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  uppercase = false,
  iconLeft,
  iconRight,
  iconLeftHover,
  iconRightHover,
  iconOnly,
  iconOnlyHover,
  animateIcon = false,
  iconSize,
  iconGap,
  href,
  onClick,
  className = '',
  style = {},
  type = 'button',
  disabled = false,
  selected = false,
  ...props
}) => {
  const resolvedIconSize = iconSize ?? (size === 'sm' ? 14 : size === 'lg' ? 18 : 16)

  const baseClass = variant === 'primary'
    ? 'btn-primary'
    : variant === 'accent'
    ? 'btn-accent'
    : variant === 'outline'
    ? 'btn-outline'
    : variant === 'control'
    ? 'btn-control'
    : 'btn-secondary'

  // Add size class
  const sizeClass = size === 'sm'
    ? 'btn-sm'
    : size === 'lg'
    ? 'btn-lg'
    : 'btn-md'

  // Add button-animate class if animateIcon is true to disable default hover states
  const animateClass = animateIcon ? 'button-animate' : ''

  // Add selected state class
  const selectedClass = selected ? 'btn-selected' : ''

  // Add uppercase class if needed
  const caseClass = uppercase ? '' : 'normal-case'

  // For icon-only buttons, don't add kol-mono-text to avoid line-height issues
  const combinedClass = iconOnly
    ? `${baseClass} ${sizeClass} ${caseClass} ${animateClass} ${selectedClass} ${className}`.trim()
    : `${baseClass} ${sizeClass} ${caseClass} kol-mono-text ${animateClass} ${selectedClass} ${className}`.trim()

  // Render icon with optional hover state
  const renderIcon = (iconName, iconHoverName) => {
    if (!iconName && !iconHoverName) return null

    // If no hover icon, render single icon
    if (!iconHoverName) {
      return <Icon name={iconName} size={resolvedIconSize} />
    }

    // Render both default and hover icons with positioning
    return (
      <span className="icon-swap-container" style={{ position: 'relative', display: 'inline-flex', width: resolvedIconSize, height: resolvedIconSize, overflow: 'hidden' }}>
        <Icon
          name={iconName}
          size={resolvedIconSize}
          className="icon-default"
          style={{ position: 'absolute' }}
        />
        <Icon
          name={iconHoverName}
          size={resolvedIconSize}
          className="icon-hover"
          style={{ position: 'absolute' }}
        />
      </span>
    )
  }

  // Render content with icons
  const renderContent = () => {
    // Icon-only button
    if (iconOnly) {
      return renderIcon(iconOnly, iconOnlyHover)
    }

    // Button with icon(s) and text
    if (iconLeft || iconRight || iconLeftHover || iconRightHover) {
      return (
        <span className="flex items-center" style={{ gap: iconGap ?? 6 }}>
          {(iconLeft || iconLeftHover) && <span style={{ marginLeft: -2 }}>{renderIcon(iconLeft, iconLeftHover)}</span>}
          {children}
          {(iconRight || iconRightHover) && <span style={{ marginRight: -2 }}>{renderIcon(iconRight, iconRightHover)}</span>}
        </span>
      )
    }

    // Text-only button
    return children
  }

  // Merge icon-only specific styles with user-provided styles
  const mergedStyle = iconOnly
    ? { lineHeight: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }
    : style

  // Render as button
  if (onClick || !href) {
    return (
      <button
        onClick={onClick}
        type={type}
        className={combinedClass}
        style={mergedStyle}
        disabled={disabled}
        aria-pressed={selected ? true : undefined}
        aria-label={iconOnly ? (props['aria-label'] || 'Button') : undefined}
        {...props}
      >
        {renderContent()}
      </button>
    )
  }

  // Render as link
  return (
    <a
      href={href}
      className={combinedClass}
      style={mergedStyle}
      aria-label={iconOnly ? (props['aria-label'] || 'Link') : undefined}
      {...props}
    >
      {renderContent()}
    </a>
  )
}

export default Button
