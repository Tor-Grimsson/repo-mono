import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const DocsRailDrawer = ({
  isOpen,
  onClose,
  anchor = 'left',
  title,
  children
}) => {
  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  if (!isOpen) return null

  const anchorClass = anchor === 'right' ? 'right-0' : 'left-0'

  return createPortal(
    <div className="lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`fixed inset-y-0 ${anchorClass} z-[200] flex w-full max-w-[28rem] flex-col bg-surface-primary border-r border-fg-08 px-5 py-6 shadow-2xl`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="kol-mono-xs uppercase tracking-[0.2em] text-fg-48">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex items-center justify-center w-8 h-8 rounded-md text-fg-64 hover:text-fg hover:bg-fg-08 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DocsRailDrawer
