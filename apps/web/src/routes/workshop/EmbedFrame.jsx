import { useContext, useLayoutEffect } from 'react'
import { ShellFullHeightContext, ShellTocCollapsedContext } from '../../workshop-system/index.js'

// Preview page: iframe only — the 'about' lives on the group Overview.
// Shell full-height mode kills page scroll (only the frame's inner content
// scrolls) and the right rail is dropped: it would only duplicate the left nav.
const EmbedFrame = ({ src, title }) => {
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

  return <iframe src={src} title={title} className="h-full w-full border-0" />
}

export default EmbedFrame
