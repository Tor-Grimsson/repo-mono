import React from 'react'

/**
 * FontBadge - Small label badge for categorization
 *
 * Foundry atom for displaying category labels and font names
 * Features pill shape with accent background and monospace font
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Badge content (typically text)
 * @param {string} props.className - Additional classes
 * @param {Function} props.onClick - Optional click handler
 */
const FontBadge = ({ children, className = '', onClick }) => {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      onClick={onClick}
      className={`fontBadge ${onClick ? 'cursor-pointer' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}

export default FontBadge
