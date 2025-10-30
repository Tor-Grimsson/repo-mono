/**
 * ProjectListItemRowSimple - Simplified version with unified hover
 *
 * Single hover state triggers all effects:
 * - Arrow expands
 * - Text strikethrough
 * - Icon swap animation
 *
 * Much simpler than ProjectListItemRow - no separate arrow hover logic
 */

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCursor } from '../../../context/CursorContext'
import { NiftySwifty } from '@kol/ui'

export default function ProjectListItemRowSimple({
  title,
  service1 = '',
  service2 = '',
  year = '',
  slug = null
}) {
  const { clearCardHover } = useCursor()
  const [isHovered, setIsHovered] = useState(false)
  const closeTimeoutRef = useRef(null)

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    // Set 2.5 second delay before closing
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 2500)
  }

  const content = (
    <>
      <div
        className="flex h-[28px] items-start gap-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Arrow icon container */}
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isHovered ? '24px' : '0px',
            height: '24px',
            overflow: 'hidden',
            transition: 'width 0.3s ease',
            backgroundColor: 'rgba(255,0,0,0.1)' // Debug: red tint
          }}
        >
          <NiftySwifty
            iconName="arrow-up"
            size={24}
            isHovered={isHovered}
          />
        </span>

        <p
          className="kol-heading-sm uppercase"
          style={{
            textDecoration: isHovered ? 'line-through' : 'none',
            textDecorationThickness: isHovered ? '4px' : '0px',
            textDecorationColor: 'currentColor',
            transition: 'all 0.3s ease'
          }}
        >
          {title}
        </p>
      </div>

      <div className="flex justify-between w-[400px] items-end">
        <div className="w-32">
          <p className="kol-helper-fine-xs uppercase text-fg-80">
            {service1}
          </p>
        </div>
        <div className="w-32">
          <p className="kol-helper-fine-xs uppercase text-fg-80">
            {service2}
          </p>
        </div>
        <div className="w-8">
          <p className="kol-helper-fine-xs uppercase text-fg-80 text-right">
            {year}
          </p>
        </div>
      </div>
    </>
  )

  // If slug provided, render as Link
  if (slug) {
    return (
      <Link
        to={`/work/${slug}`}
        className="flex flex-row items-end justify-between gap-3 md:gap-4 md:h-8 transition-opacity"
        data-magnetic
        onClick={clearCardHover}
      >
        {content}
      </Link>
    )
  }

  // Otherwise render as static div
  return (
    <div className="flex flex-row items-start justify-between gap-3 md:gap-4 transition-opacity">
      {content}
    </div>
  )
}
