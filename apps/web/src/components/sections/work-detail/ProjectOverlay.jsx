import { useEffect } from 'react'
import { createPortal } from 'react-dom'

function blocksToParagraphs(blocks) {
  if (!Array.isArray(blocks)) return []
  return blocks
    .filter((block) => block?._type === 'block' && Array.isArray(block.children))
    .map((block) =>
      block.children
        .map((child) => (typeof child.text === 'string' ? child.text : ''))
        .join('')
        .trim()
    )
    .filter(Boolean)
}

export default function ProjectOverlay({ isOpen, onClose, project }) {
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const contentParagraphs = blocksToParagraphs(project?.content)

  return createPortal(
    <div
      className="fixed inset-0 z-[200] overflow-y-auto transition-opacity duration-300"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div className="min-h-full px-6 py-10 md:px-12 md:py-16 lg:px-20 lg:py-20">
        {/* Header: × Project Name */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-3 mb-16 md:mb-24 group cursor-pointer"
        >
          <span className="text-white/60 text-lg group-hover:text-white transition-colors">×</span>
          <span className="kol-mono-text text-white/90 text-base">{project?.title}</span>
        </button>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 max-w-[1200px]">
          {/* Left column: metadata */}
          <div className="flex flex-col gap-10 lg:w-[35%]">
            {project?.client && (
              <div className="flex flex-col gap-2">
                <p className="kol-helper-fine-xs text-white/40 uppercase">Client</p>
                <p className="kol-mono-text text-white/80">{project.client}</p>
              </div>
            )}

            {project?.year && (
              <div className="flex flex-col gap-2">
                <p className="kol-helper-fine-xs text-white/40 uppercase">Year</p>
                <p className="kol-mono-text text-white/80">{project.year}</p>
              </div>
            )}

            {project?.services?.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="kol-helper-fine-xs text-white/40 uppercase">What we did</p>
                <div className="flex flex-col gap-1">
                  {project.services.map((service, index) => (
                    <p key={index} className="kol-mono-text text-white/80">{service}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: description + about */}
          <div className="flex flex-col gap-10 lg:w-[65%]">
            {project?.description && (
              <div className="flex flex-col gap-3">
                <p className="kol-helper-fine-xs text-white/40 uppercase">Description</p>
                <p className="kol-mono-text text-white/80 text-base leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {contentParagraphs.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="kol-helper-fine-xs text-white/40 uppercase">About</p>
                <div className="flex flex-col gap-4">
                  {contentParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="kol-mono-text text-white/80 text-base leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
