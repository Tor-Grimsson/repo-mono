import React from 'react'
import Button from '../atoms/Button'

/**
 * ButtonGroup Component
 *
 * Container for multiple buttons with consistent spacing and alignment
 * Accepts an array of button configurations with all Button props
 *
 * @param {Object} props
 * @param {string} props.title - Optional title/heading above buttons
 * @param {Array} props.buttons - Array of button objects with Button props
 * @param {string} props.align - Horizontal alignment: 'left' | 'center' | 'right' (default: 'center')
 * @param {string} props.className - Additional classes for container
 */
const ButtonGroup = ({
  title,
  buttons = [],
  align = 'center',
  className = ''
}) => {
  const alignClass = align === 'left'
    ? 'justify-start'
    : align === 'right'
    ? 'justify-end'
    : 'justify-center'

  const displayClass = align === 'center' ? 'inline-flex' : 'flex'
  const widthClass = align === 'center' ? '' : 'w-full'
  const marginClass = align === 'center' ? 'mx-auto' : ''

  return (
    <div className={`${displayClass} flex-col ${widthClass} ${marginClass} ${className}`.trim()}>
      {title && (
        <h3 className="kol-heading-md mb-6 text-auto">{title}</h3>
      )}
      <div className={`flex flex-row gap-4 ${alignClass}`.trim()}>
        {buttons.map((button, index) => {
          const { label, children, ...buttonProps } = button
          return (
            <Button key={index} {...buttonProps}>
              {label || children}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default ButtonGroup
