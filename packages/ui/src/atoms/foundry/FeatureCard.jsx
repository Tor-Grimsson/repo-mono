import React from 'react'

/**
 * FeatureCard - Title and description card
 *
 * Foundry atom for displaying individual OpenType features
 * Features bordered card with hover theme flip and proper padding
 *
 * @param {Object} props
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 * @param {string} props.className - Additional classes
 */
const FeatureCard = ({ title, description, className = '' }) => {
  return (
    <div
      className={`hoverFlipTheme border rounded-lg flex flex-col gap-3 p-6 transition-colors duration-300 ${className}`.trim()}
      style={{ borderColor: 'var(--kol-border-default)' }}
    >
      <h3 className="font-bold transition-colors duration-300">
        {title}
      </h3>
      <p className="transition-colors duration-300">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
