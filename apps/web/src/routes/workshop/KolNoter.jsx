import { useState, useContext, useEffect } from 'react'
import { Icon } from '@kol/ui'
import { WorkshopFullHeightContext } from '@kol/ui/layout'

const iframeProps = {
  title: 'Kol Noter',
  src: 'https://kol-noter.vercel.app/',
  loading: 'lazy',
  allowFullScreen: true,
  referrerPolicy: 'no-referrer'
}

const KolNoter = () => {
  const [showStandalone, setShowStandalone] = useState(false)
  const setFullHeight = useContext(WorkshopFullHeightContext)

  useEffect(() => {
    setFullHeight(true)
    return () => setFullHeight(false)
  }, [setFullHeight])

  return (
    <>
      <div className="h-full py-4">
        <div className="relative h-full w-full overflow-hidden rounded border border-fg-08">
          <button
            type="button"
            onClick={() => setShowStandalone(true)}
            className="absolute right-4 bottom-4 z-20 flex items-center gap-2 rounded-full border border-fg-16 bg-surface-primary/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-auto hover:border-fg focus:outline-none focus:ring-2 focus:ring-fg"
          >
            <Icon name="docs-external-link" size={14} />
            <span>Standalone</span>
          </button>
          <iframe {...iframeProps} className="absolute inset-0 h-full w-full" />
        </div>
      </div>

      {showStandalone && (
        <div className="fixed inset-0 z-[200] bg-surface-primary">
          <button
            type="button"
            onClick={() => setShowStandalone(false)}
            className="absolute right-6 bottom-6 z-[201] flex items-center gap-2 rounded-full border border-fg-16 bg-surface-primary px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-auto hover:border-fg focus:outline-none focus:ring-2 focus:ring-fg"
          >
            <Icon name="close" size={14} />
            <span>Close</span>
          </button>
          <iframe {...iframeProps} className="absolute inset-0 h-full w-full" />
        </div>
      )}
    </>
  )
}

export default KolNoter
