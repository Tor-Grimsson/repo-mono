import { useState } from 'react'
import { Tag, Illustration } from '@kol/ui'

export default function CollectionCardIllustration({ illustration }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative aspect-square bg-opacity-hex-fixed-88 border border-auto rounded overflow-hidden hover:border-hover transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Illustration fills entire card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          <Illustration name={illustration.illustrationName} size={320} />
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
                {illustration.name}
              </h3>
              <p className="kol-mono-sm-fine text-fg-48">
                {illustration.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Tag variant="light" size="sm">
              {illustration.type}
            </Tag>
            <Tag variant="muted" size="sm">
              {illustration.year}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  )
}
