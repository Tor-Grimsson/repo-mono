import { motion as Motion } from 'framer-motion'
import { useState } from 'react'

export default function SectionLabel({ text, icon = '/svg/arrow-downright.svg', className = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={`flex items-center gap-1 md:gap-2 h-[18px] md:h-[22px] ${className}`} style={{ color: 'var(--color-text-primary)' }}>
      <p className="kol-label-compact">
        {text}
      </p>
      {icon && (
        <div
          className="w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center pb-0.5 relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Motion.svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 lg:w-8 lg:h-8 absolute"
            animate={{
              x: isHovered ? '100%' : '0%',
              y: isHovered ? '100%' : '0%',
            }}
            transition={{
              duration: 0.4,
              ease: [0.68, -0.55, 0.265, 1.55],
            }}
          >
            <path d="M19 17.5859V8H21V21H8V19H17.5859L7.29297 8.70703L8.70703 7.29297L19 17.5859Z"/>
          </Motion.svg>

          <Motion.svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 absolute"
            initial={{ x: '-100%', y: '-100%' }}
            animate={{
              x: isHovered ? '0%' : '-100%',
              y: isHovered ? '0%' : '-100%',
            }}
            transition={{
              duration: 0.4,
              ease: [0.68, -0.55, 0.265, 1.55],
            }}
          >
            <path d="M19 17.5859V8H21V21H8V19H17.5859L7.29297 8.70703L8.70703 7.29297L19 17.5859Z"/>
          </Motion.svg>
        </div>
      )}
    </div>
  )
}
