import { FontViewerComponent } from '@kolkrabbi/kol-foundry'
const defaultFontUrl = '/fonts/TGMalromurItalicVF.ttf'

/**
 * Wrapper around the legacy FontViewerComponent so we can embed
 * the full control suite (buttons, metrics overlay, etc.) inside apps/web.
 */
export default function FontViewerSuperSuite({
  fontUrl = defaultFontUrl,
  showControls = true,
  showMetrics = true,
  initialFontSize = 480,
  autoStart = false,
  animationDelay = 250,
  initialSample = 'sentence',
  height = 720,
  className = ''
}) {
  return (
    <div
      className={`relative overflow-hidden rounded border border-auto bg-surface-inverse text-auto ${className}`}
      style={{ minHeight: height, height }}
      data-fontviewer-suite
    >
      <FontViewerComponent
        fontUrl={fontUrl}
        showControls={showControls}
        showMetrics={showMetrics}
        initialFontSize={initialFontSize}
        autoStart={autoStart}
        animationDelay={animationDelay}
        controlsAnchor="container"
        initialSample={initialSample}
        config={{
          showControls,
          showMetrics,
          initialFontSize,
          autoStart,
          animationDelay,
          initialSample
        }}
      />
    </div>
  )
}
