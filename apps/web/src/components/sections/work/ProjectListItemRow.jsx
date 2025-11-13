/**
 * ProjectListItemRow - Reusable row component for project list items
 *
 * Can be used as a link (when slug provided) or static div (no slug)
 * Handles both CMS-driven projects and hardcoded archive entries
 *
 * Hover effect: Arrow icon animates in on left, text shifts right with strikethrough
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCursor } from '../../../context/CursorContext'
import { Icon, NiftySwifty } from '@kol/ui'

export default function ProjectListItemRow({
  title,
  service1 = '',
  service2 = '',
  year = '',
  slug = null,
  href = null,
  useNiftySwifty = false
}) {
  const { clearCardHover } = useCursor()
  const [isHovered, setIsHovered] = useState(false)
  const [isArrowHovered, setIsArrowHovered] = useState(false)

  const content = (
    <>
      <div
        className="flex h-[28px] items-start gap-4"
        onMouseLeave={() => {
          setIsHovered(false)
          setIsArrowHovered(false)
        }}
      >
        {/* Arrow icon container - hidden by default, visible on hover */}
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isHovered ? '24px' : '0px',
            height: '24px',
            overflow: 'hidden',
            transition: isHovered
              ? 'width 0.3s ease, pointer-events 0s 0.3s'
              : 'width 0.3s ease, pointer-events 0s 0s',
            pointerEvents: isHovered ? 'auto' : 'none',
            zIndex: 10
          }}
          onMouseEnter={() => {
            setIsHovered(true)
            setIsArrowHovered(true)
          }}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          {useNiftySwifty ? (
            <NiftySwifty
              iconName="arrow-down"
              size={24}
              isHovered={isArrowHovered}
            />
          ) : (
            <>
              <Icon
                name="arrow-downright"
                size={24}
                className="icon-default"
                style={{ position: 'absolute' }}
              />
              <Icon
                name="arrow-downright"
                size={24}
                className="icon-hover"
                style={{ position: 'absolute' }}
              />
            </>
          )}
        </span>

        <p
          className="kol-heading-sm uppercase"
          style={{
            textDecoration: isHovered ? 'line-through' : 'none',
            textDecorationThickness: isHovered ? '4px' : '0px',
            textDecorationColor: 'currentColor',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={() => setIsHovered(true)}
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

  // If href or slug provided, render as Link
  const linkTo = href || (slug ? `/work/${slug}` : null)

  if (linkTo) {
    return (
      <Link
        to={linkTo}
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
