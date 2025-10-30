import React from 'react'
import Icon from './icons/Icon'

/**
 * Input Component
 *
 * Form input with multiple size variants matching Button styles
 *
 * @param {Object} props
 * @param {string} props.type - Input type (default: 'text')
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {'sm'|'md'|'lg'} props.size - Input size (default: 'md')
 * @param {boolean} props.uppercase - Text transform uppercase (default: false)
 * @param {string} props.iconLeft - Icon name to display on the left
 * @param {number} props.iconSize - Size of the icon in pixels (default: 20)
 * @param {string} props.className - Additional classes
 * @param {Object} props.style - Inline styles
 */
const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  size = 'md',
  uppercase = false,
  iconLeft,
  iconSize = 20,
  className = '',
  style = {},
  ...props
}) => {
  // Size classes matching button sizes
  const sizeClass = size === 'sm'
    ? 'input-sm'
    : size === 'lg'
    ? 'input-lg'
    : 'input-md'

  // Uppercase class
  const caseClass = uppercase ? 'uppercase' : ''

  // Icon padding adjustment
  const iconPaddingClass = iconLeft ? 'pl-12' : ''

  const combinedClass = `input-outline ${sizeClass} ${caseClass} ${iconPaddingClass} kol-mono-text ${className}`.trim()

  return (
    <div className="relative inline-flex items-center">
      {iconLeft && (
        <span className="absolute flex items-center text-auto opacity-50 left-6 pointer-events-none">
          <Icon name={iconLeft} size={iconSize} />
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={combinedClass}
        style={style}
        {...props}
      />
    </div>
  )
}

export default Input
