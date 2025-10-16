import React from 'react'
import { FeatureCard } from '../../atoms/foundry/index.js'

/**
 * FeatureGrid - 2-column responsive grid of features
 *
 * Foundry molecule that composes multiple FeatureCard atoms
 * into a responsive 2-column grid layout
 *
 * @param {Object} props
 * @param {Array<{title: string, description: string}>} props.features - Array of feature objects
 * @param {string} props.className - Additional classes
 */
const FeatureGrid = ({ features, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`.trim()}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}

export default FeatureGrid
