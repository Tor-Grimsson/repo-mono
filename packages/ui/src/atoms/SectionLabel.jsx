import { motion as Motion } from 'framer-motion'
import { useMemo, useState } from 'react'

const defaultIcon = (
  <path d="M19 17.5859V8H21V21H8V19H17.5859L7.29297 8.70703L8.70703 7.29297L19 17.5859Z" />
)

export default function SectionLabel({ text, icon = defaultIcon, className = '', iconSize = 'w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8' }) {
  const [isHovered, setIsHovered] = useState(false)

  const iconNode = useMemo(() => {
    if (!icon) return null
    if (typeof icon === 'string') {
      return <image href={icon} xlinkHref={icon} width="24" height="24" />
    }
    return icon
  }, [icon])

  return (
    <div
      className={`flex items-center gap-1 md:gap-2 h-[18px] md:h-[22px] ${className}`}
      style={{ color: 'var(--component-fg)' }}
    >
      <p className="kol-label-compact">
        {text}
      </p>
      {iconNode && (
        <div
          className="relative flex h-4 w-4 items-center justify-center overflow-hidden pb-0.5 lg:h-6 lg:w-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Motion.svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={`${iconSize} absolute`}
            animate={{
              x: isHovered ? '100%' : '0%',
              y: isHovered ? '100%' : '0%'
            }}
            transition={{
              duration: 0.4,
              ease: [0.68, -0.55, 0.265, 1.55]
            }}
          >
            {iconNode}
          </Motion.svg>
          <Motion.svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={`${iconSize} absolute`}
            initial={{ x: '-100%', y: '-100%' }}
            animate={{
              x: isHovered ? '0%' : '-100%',
              y: isHovered ? '0%' : '-100%'
            }}
            transition={{
              duration: 0.4,
              ease: [0.68, -0.55, 0.265, 1.55]
            }}
          >
            {iconNode}
          </Motion.svg>
        </div>
      )}
    </div>
  )
}
