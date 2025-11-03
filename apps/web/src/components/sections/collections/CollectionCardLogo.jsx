import { useState } from 'react'
import { Tag, Logomark } from '@kol/ui'

export default function CollectionCardLogo({ logomark }) {
  const [isHovered, setIsHovered] = useState(false)

  // Auto-size wordmarks larger since they're wide
  const logoSize = logomark.type === 'Wordmark' ? 160 : 96

  return (
    <div
      className="group relative aspect-square bg-surface-primary border border-auto rounded overflow-hidden hover:border-hover transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logomark fills entire card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          <Logomark name={logomark.logoName} size={logoSize} />
        </div>
      </div>

      {/* Text overlay - absolutely positioned */}
      <div className="relative z-10 p-6 flex flex-col justify-end h-full min-h-[200px]">
        {/* Info Panel - Only visible on hover */}
        <div
          className={`space-y-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="kol-mono-text mb-1">
                {logomark.name}
              </h3>
              <p className="kol-mono-sm-fine text-fg-48">
                {logomark.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Tag variant="light" size="sm">
              {logomark.type}
            </Tag>
            <Tag variant="muted" size="sm">
              {logomark.year}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  )
}
