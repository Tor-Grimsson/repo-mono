import { useEffect, useRef, useState } from 'react'
import DesPage from '../../components/workshop/molecules/DesPage'
import DistortionControlsPanel from '../../components/workshop/molecules/DistortionControlsPanel'
const OfflineVariantCard = ({ title, description }) => (
  <div className="flex flex-col gap-4 rounded border border-fg-16 bg-fg-02/30 p-4 text-center text-fg-64">
    <div className="kol-helper-xs uppercase tracking-[0.2em] text-fg-48">
      {title} · OFFLINE
    </div>
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded bg-fg-02/20">
      <p className="kol-helper text-fg-48">PixiJS variant temporarily disabled</p>
    </div>
    {description && (
      <p className="kol-mono-xs text-fg-40">
        {description}
      </p>
    )}
  </div>
)

const HallOfCopies = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(false)
  const [scale, setScale] = useState(25)
  const [baseFrequency, setBaseFrequency] = useState(0.01)
  const [numOctaves, setNumOctaves] = useState(2)

  // Draggable control panel
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isActuallyDragging, setIsActuallyDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
  const [isPanelLocked, setIsPanelLocked] = useState(false)
  const panelRef = useRef(null)
  const velocityRef = useRef({ x: 0, y: 0 })
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 })
  const animationFrameRef = useRef(null)

  // Drag handlers
  const handleMouseDown = (e) => {
    if (!panelRef.current || isPanelLocked) return

    // Cancel any ongoing momentum animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    const rect = panelRef.current.getBoundingClientRect()
    setIsDragging(true)
    setIsActuallyDragging(false)
    setDragStartPos({ x: e.clientX, y: e.clientY })
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })

    // Reset velocity tracking
    velocityRef.current = { x: 0, y: 0 }
    lastPosRef.current = { x: 0, y: 0, time: 0 }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    const currentTime = Date.now()

    // Calculate distance moved from start
    const distanceMoved = Math.sqrt(
      Math.pow(e.clientX - dragStartPos.x, 2) +
      Math.pow(e.clientY - dragStartPos.y, 2)
    )

    // Only trigger animation after moving 10px
    if (distanceMoved > 10 && !isActuallyDragging) {
      setIsActuallyDragging(true)
    }

    // Calculate velocity for momentum
    if (lastPosRef.current.time) {
      const dt = (currentTime - lastPosRef.current.time) / 16 // normalize to ~60fps
      if (dt > 0) {
        velocityRef.current = {
          x: (newX - lastPosRef.current.x) / dt,
          y: (newY - lastPosRef.current.y) / dt
        }
      }
    }

    lastPosRef.current = { x: newX, y: newY, time: currentTime }
    setPanelPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    if (!isDragging) return

    setIsDragging(false)

    // Only apply momentum if we actually dragged
    if (isActuallyDragging) {
      // Apply momentum
      const friction = 0.92
      const minVelocity = 0.1

      const animate = () => {
        velocityRef.current.x *= friction
        velocityRef.current.y *= friction

        const speed = Math.sqrt(
          velocityRef.current.x ** 2 + velocityRef.current.y ** 2
        )

        if (speed < minVelocity) {
          animationFrameRef.current = null
          setIsActuallyDragging(false)
          return
        }

        setPanelPosition(prev => ({
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y
        }))

        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      setIsActuallyDragging(false)
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, dragStartPos, isActuallyDragging])

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl space-y-12">
        <DesPage
          title="Hall of Copies"
          subtitle="PixiJS TilingSprite effects for repeating patterns, glitch aesthetics, and morphing tiles. WebGL-accelerated with precise control over delays, repetition, and transformation."
        />

        <div
          ref={panelRef}
          className="fixed z-50 w-80"
          style={{
            left: `${panelPosition.x}px`,
            top: `${panelPosition.y}px`,
            cursor: isPanelLocked ? 'default' : (isDragging ? 'grabbing' : 'grab')
          }}
          onMouseDown={handleMouseDown}
        >
          <DistortionControlsPanel
            enabled={animationsEnabled}
            onEnabledChange={setAnimationsEnabled}
            scale={scale}
            onScaleChange={setScale}
            baseFrequency={baseFrequency}
            onBaseFrequencyChange={setBaseFrequency}
            numOctaves={numOctaves}
            onNumOctavesChange={setNumOctaves}
            isLocked={isPanelLocked}
            onLockChange={setIsPanelLocked}
          />
        </div>

        {/* Grid of PixiJS variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OfflineVariantCard
            title="PixiJS Slices"
            description="Pending external deployment (scale + frequency controls inactive)."
          />
          <OfflineVariantCard
            title="PixiJS Glitch"
            description="WebGL glitch effect disabled until Pixi bundle is extracted."
          />
          <OfflineVariantCard
            title="PixiJS Morph"
            description="Morph variant temporarily offline – coming back via external app."
          />
          <OfflineVariantCard
            title="PixiJS Radial"
            description="Radial orbit effect available soon in standalone build."
          />

          {/* Empty Slot 1 */}
          <div className="flex flex-col gap-4 opacity-40">
            <div className="flex items-center justify-between">
              <div className="kol-helper-s text-fg-32">—</div>
              <div className="flex gap-2">
                <div className="kol-helper-xs text-fg-32">[OFF]</div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-fg-08 bg-surface-secondary" style={{ borderRadius: '4px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="kol-helper-s text-fg-32">Available slot</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="kol-helper-xs text-fg-32 font-mono">—</div>
            </div>
          </div>

          {/* Empty Slot 2 */}
          <div className="flex flex-col gap-4 opacity-40">
            <div className="flex items-center justify-between">
              <div className="kol-helper-s text-fg-32">—</div>
              <div className="flex gap-2">
                <div className="kol-helper-xs text-fg-32">[OFF]</div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-fg-08 bg-surface-secondary" style={{ borderRadius: '4px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="kol-helper-s text-fg-32">Available slot</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="kol-helper-xs text-fg-32 font-mono">—</div>
            </div>
          </div>

          {/* Empty Slot 3 */}
          <div className="flex flex-col gap-4 opacity-40">
            <div className="flex items-center justify-between">
              <div className="kol-helper-s text-fg-32">—</div>
              <div className="flex gap-2">
                <div className="kol-helper-xs text-fg-32">[OFF]</div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-fg-08 bg-surface-secondary" style={{ borderRadius: '4px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="kol-helper-s text-fg-32">Available slot</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="kol-helper-xs text-fg-32 font-mono">—</div>
            </div>
          </div>

          {/* Empty Slot 4 */}
          <div className="flex flex-col gap-4 opacity-40">
            <div className="flex items-center justify-between">
              <div className="kol-helper-s text-fg-32">—</div>
              <div className="flex gap-2">
                <div className="kol-helper-xs text-fg-32">[OFF]</div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-fg-08 bg-surface-secondary" style={{ borderRadius: '4px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="kol-helper-s text-fg-32">Available slot</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="kol-helper-xs text-fg-32 font-mono">—</div>
            </div>
          </div>

          {/* Empty Slot 5 */}
          <div className="flex flex-col gap-4 opacity-40">
            <div className="flex items-center justify-between">
              <div className="kol-helper-s text-fg-32">—</div>
              <div className="flex gap-2">
                <div className="kol-helper-xs text-fg-32">[OFF]</div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-fg-08 bg-surface-secondary" style={{ borderRadius: '4px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="kol-helper-s text-fg-32">Available slot</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="kol-helper-xs text-fg-32 font-mono">—</div>
            </div>
          </div>
        </div>

        <div className="rounded border border-fg-08 bg-surface-secondary p-6 space-y-4">
          <h2 className="kol-heading-s">Implementation Notes</h2>
          <ul className="kol-helper-s text-fg-64 space-y-2 list-disc pl-6">
            <li><strong>PixiJS TilingSprite:</strong> WebGL-accelerated repeating texture effects. GPU-based rendering for smooth performance.</li>
            <li><strong>Scale Slider:</strong> Maps to different parameters per variant - Slices: tile width, Glitch: max offset, Morph: intensity, Radial: orbit radius.</li>
            <li><strong>Base Frequency Slider:</strong> Controls animation speed multiplier (0.001-0.05). All PixiJS variants use this for speed.</li>
            <li><strong>Octaves Slider:</strong> Glitch: slice count (octaves × 5). Radial: tile scale (octaves / 8). Slices/Morph: not used.</li>
            <li><strong>Animation Toggle:</strong> Enable/disable real-time WebGL animations via PixiJS ticker.</li>
            <li><strong>Control Panel:</strong> Draggable with momentum physics. Lock button prevents accidental movement.</li>
            <li><strong>Per-Variant Upload:</strong> Test effects with your own images. Each variant stores its uploaded image independently.</li>
            <li><strong>Vite Compatibility:</strong> All variants use IIFE pattern to avoid top-level await conflicts with Vite build.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HallOfCopies
