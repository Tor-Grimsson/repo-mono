import { useState, useContext, useLayoutEffect } from 'react'
import { Icon } from '@kol/ui'
import { ShellFullHeightContext, ShellTocCollapsedContext } from '../../components/shell'

const iframeProps = {
  title: 'Kol Radial',
  src: 'https://radial.kolkrabbi.io/',
  loading: 'lazy',
  allowFullScreen: true,
  referrerPolicy: 'no-referrer'
}

const ApparatusRadialEditor = () => {
  const [showStandalone, setShowStandalone] = useState(false)
  const setFullHeight = useContext(ShellFullHeightContext)
  const setTocCollapsed = useContext(ShellTocCollapsedContext)

  useLayoutEffect(() => {
    setFullHeight(true)
    setTocCollapsed(true)
    return () => {
      setFullHeight(false)
      setTocCollapsed(false)
    }
  }, [setFullHeight, setTocCollapsed])

  return (
    <>
      <div className="flex-1 min-h-0 py-4">
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

export default ApparatusRadialEditor
