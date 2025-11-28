import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import DesPage from '../../components/workshop/molecules/DesPage'
import DistortionControlsPanel from '../../components/workshop/molecules/DistortionControlsPanel'

const PixiOfflineCard = ({ title, description }) => (
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

const MirrorVariant = ({
  title,
  children,
  baseFrequency = 0.01,
  numOctaves = 2,
  scale = 20,
  seed = 0,
  animate = false,
  isEnabled = true,
  isSelected = false,
  onToggleEnabled,
  onToggleSelect,
  description = '',
  onImageUpload
}) => {
  const filterRef = useRef(null)
  const filterId = `distortion-${title.replace(/\s+/g, '-').toLowerCase()}`
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    if (!animate || !filterRef.current) return

    const turbulence = filterRef.current.querySelector('feTurbulence')

    // Animate turbulence baseFrequency for dynamic effect
    gsap.to(turbulence, {
      attr: { baseFrequency: baseFrequency * 1.5 },
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [animate, baseFrequency])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div
          className="kol-helper-s text-fg-64 cursor-help"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          {title}
        </div>
        <div className="flex gap-2">
          <div
            className={`kol-helper-xs cursor-pointer select-none ${isEnabled ? 'accentYellow' : 'text-fg-64'} hover:text-fg-96`}
            onClick={onToggleEnabled}
          >
            [{isEnabled ? 'ON' : 'OFF'}]
          </div>
          <div
            className={`kol-helper-xs cursor-pointer select-none ${isSelected ? 'accentYellowStrong' : 'text-fg-64'} hover:text-fg-96`}
            onClick={onToggleSelect}
          >
            [{isSelected ? 'SELECT' : 'UNSELECT'}]
          </div>
        </div>
      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id={filterId} ref={filterRef}>
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            result="turbulence"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        className="relative aspect-[4/3] overflow-hidden border border-fg-08"
        style={{ borderRadius: '4px' }}
      >
        {showInfo && (
          <div className="absolute top-0 left-0 right-0 kol-helper-xs textAbsoluteWhite p-3 space-y-1 z-10" style={{ backgroundColor: 'color-mix(in srgb, var(--kol-surface-primary) 60%, transparent)' }}>
            <div><strong>Base Frequency:</strong> {baseFrequency} - {baseFrequency < 0.01 ? 'Large, slow waves' : baseFrequency < 0.02 ? 'Medium waves' : 'Small, tight waves'}</div>
            <div><strong>Octaves:</strong> {numOctaves} - {numOctaves === 1 ? 'Simple pattern' : numOctaves === 2 ? 'Moderate detail' : numOctaves === 3 ? 'Complex detail' : 'Very intricate'}</div>
            <div><strong>Scale:</strong> {scale} - {scale < 20 ? 'Subtle displacement' : scale < 40 ? 'Moderate displacement' : 'Heavy displacement'}</div>
            {description && <div className="pt-1 border-t border-fg-08 mt-2">{description}</div>}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div style={{
            transform: 'scale(1.3)',
            width: '100%',
            height: '100%',
            filter: isEnabled ? `url(#${filterId})` : 'none'
          }}>
            {children}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="kol-helper-xs text-fg-48 font-mono">
          baseFrequency: {baseFrequency} | octaves: {numOctaves} | scale: {scale}
        </div>
        <label className="kol-helper-s textAbsoluteWhite cursor-pointer hover:opacity-80">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
          [UPLOAD]
        </label>
      </div>
    </div>
  )
}

const ApparatusHallOfMirrors = () => {
  const defaultImageSrc = '/img/features/card-item-base-7.png'
  const [variantImages, setVariantImages] = useState({})
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

  // Track enabled state (on/off) for each variant
  const [variantEnabled, setVariantEnabled] = useState({
    'subtle-ripple': false,
    'medium-wave': false,
    'heavy-distortion': false,
    'fine-grain': false,
    'liquid-surface': false,
    'animated-turbulence': false,
    'extreme-warp': false,
    'glass-refraction': false
  })

  // Track which variant is selected for control panel
  const [selectedVariant, setSelectedVariant] = useState('liquid-surface')

  const handleToggleEnabled = (variantId) => {
    setVariantEnabled(prev => ({
      ...prev,
      [variantId]: !prev[variantId]
    }))
  }

  const handleToggleSelect = (variantId) => {
    if (selectedVariant === variantId) {
      setSelectedVariant(null) // Deselect
    } else {
      setSelectedVariant(variantId) // Select this one
    }
  }

  const handleImageUpload = (variantId) => (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setVariantImages(prev => ({
          ...prev,
          [variantId]: event.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

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

  const applyMomentum = () => {
    const friction = 0.92
    const minVelocity = 0.1

    const step = () => {
      // Apply friction
      velocityRef.current.x *= friction
      velocityRef.current.y *= friction

      // Stop if velocity is too small
      if (Math.abs(velocityRef.current.x) < minVelocity && Math.abs(velocityRef.current.y) < minVelocity) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        return
      }

      // Update position
      setPanelPosition(prev => ({
        x: prev.x + velocityRef.current.x,
        y: prev.y + velocityRef.current.y
      }))

      animationFrameRef.current = requestAnimationFrame(step)
    }

    step()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsActuallyDragging(false)

    // Apply momentum if moving fast enough
    const speed = Math.sqrt(
      velocityRef.current.x ** 2 + velocityRef.current.y ** 2
    )

    if (speed > 1) {
      applyMomentum()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging])

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-surface-primary p-12">
      <div className="mx-auto max-w-7xl space-y-12">
        <DesPage
          title="Hall of Mirrors"
          subtitle="SVG displacement effects using GSAP AttrPlugin to animate turbulence and displacement parameters. Each variant demonstrates different combinations of baseFrequency, numOctaves, and scale values."
        />

        <div
          ref={panelRef}
          className="fixed z-50 w-80"
          style={{
            right: panelPosition.x === 0 ? '2rem' : 'auto',
            bottom: panelPosition.y === 0 ? '2rem' : 'auto',
            left: panelPosition.x !== 0 ? `${panelPosition.x}px` : 'auto',
            top: panelPosition.y !== 0 ? `${panelPosition.y}px` : 'auto',
            cursor: isPanelLocked ? 'default' : (isDragging ? 'grabbing' : 'grab'),
            transform: isActuallyDragging ? 'scale(1.02) rotate(-1deg)' : 'scale(1) rotate(0deg)',
            transition: isActuallyDragging ? 'transform 0.15s ease-out' : 'transform 0.2s ease-out',
            boxShadow: isActuallyDragging
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
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

        <div className="grid grid-cols-2 gap-8">
          {/* Subtle Ripple */}
          <MirrorVariant
            title="Subtle Ripple"
            baseFrequency={selectedVariant === 'subtle-ripple' ? baseFrequency : 0.005}
            numOctaves={selectedVariant === 'subtle-ripple' ? numOctaves : 1}
            scale={selectedVariant === 'subtle-ripple' ? scale : 10}
            seed={1}
            animate={selectedVariant === 'subtle-ripple' && animationsEnabled}
            isEnabled={variantEnabled['subtle-ripple']}
            isSelected={selectedVariant === 'subtle-ripple'}
            onToggleEnabled={() => handleToggleEnabled('subtle-ripple')}
            onToggleSelect={() => handleToggleSelect('subtle-ripple')}
            onImageUpload={handleImageUpload('subtle-ripple')}
          >
            <img src={variantImages['subtle-ripple'] || defaultImageSrc} alt="Subtle ripple effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          {/* Medium Wave */}
          <MirrorVariant
            title="Medium Wave"
            baseFrequency={selectedVariant === 'medium-wave' ? baseFrequency : 0.01}
            numOctaves={selectedVariant === 'medium-wave' ? numOctaves : 2}
            scale={selectedVariant === 'medium-wave' ? scale : 20}
            seed={2}
            animate={selectedVariant === 'medium-wave' && animationsEnabled}
            isEnabled={variantEnabled['medium-wave']}
            isSelected={selectedVariant === 'medium-wave'}
            onToggleEnabled={() => handleToggleEnabled('medium-wave')}
            onToggleSelect={() => handleToggleSelect('medium-wave')}
            onImageUpload={handleImageUpload('medium-wave')}
          >
            <img src={variantImages['medium-wave'] || defaultImageSrc} alt="Medium wave effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          {/* Heavy Distortion */}
          <MirrorVariant
            title="Heavy Distortion"
            baseFrequency={selectedVariant === 'heavy-distortion' ? baseFrequency : 0.02}
            numOctaves={selectedVariant === 'heavy-distortion' ? numOctaves : 3}
            scale={selectedVariant === 'heavy-distortion' ? scale : 40}
            seed={3}
            animate={selectedVariant === 'heavy-distortion' && animationsEnabled}
            isEnabled={variantEnabled['heavy-distortion']}
            isSelected={selectedVariant === 'heavy-distortion'}
            onToggleEnabled={() => handleToggleEnabled('heavy-distortion')}
            onToggleSelect={() => handleToggleSelect('heavy-distortion')}
            onImageUpload={handleImageUpload('heavy-distortion')}
          >
            <img src={variantImages['heavy-distortion'] || defaultImageSrc} alt="Heavy distortion effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          {/* Fine Grain */}
          <MirrorVariant
            title="Fine Grain"
            baseFrequency={selectedVariant === 'fine-grain' ? baseFrequency : 0.05}
            numOctaves={selectedVariant === 'fine-grain' ? numOctaves : 4}
            scale={selectedVariant === 'fine-grain' ? scale : 15}
            seed={4}
            animate={selectedVariant === 'fine-grain' && animationsEnabled}
            isEnabled={variantEnabled['fine-grain']}
            isSelected={selectedVariant === 'fine-grain'}
            onToggleEnabled={() => handleToggleEnabled('fine-grain')}
            onToggleSelect={() => handleToggleSelect('fine-grain')}
            onImageUpload={handleImageUpload('fine-grain')}
          >
            <img src={variantImages['fine-grain'] || defaultImageSrc} alt="Fine grain effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          {/* Liquid Surface */}
          <MirrorVariant
            title="Liquid Surface"
            baseFrequency={selectedVariant === 'liquid-surface' ? baseFrequency : 0.008}
            numOctaves={selectedVariant === 'liquid-surface' ? numOctaves : 2}
            scale={selectedVariant === 'liquid-surface' ? scale : 30}
            seed={5}
            animate={selectedVariant === 'liquid-surface' && animationsEnabled}
            isEnabled={variantEnabled['liquid-surface']}
            isSelected={selectedVariant === 'liquid-surface'}
            onToggleEnabled={() => handleToggleEnabled('liquid-surface')}
            onToggleSelect={() => handleToggleSelect('liquid-surface')}
            onImageUpload={handleImageUpload('liquid-surface')}
          >
            <img src={variantImages['liquid-surface'] || defaultImageSrc} alt="Liquid surface effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          {/* Animated Turbulence */}
          <MirrorVariant
            title="Animated Turbulence"
            baseFrequency={selectedVariant === 'animated-turbulence' ? baseFrequency : 0.01}
            numOctaves={selectedVariant === 'animated-turbulence' ? numOctaves : 2}
            scale={selectedVariant === 'animated-turbulence' ? scale : 25}
            seed={6}
            animate={selectedVariant === 'animated-turbulence' && animationsEnabled}
            isEnabled={variantEnabled['animated-turbulence']}
            isSelected={selectedVariant === 'animated-turbulence'}
            onToggleEnabled={() => handleToggleEnabled('animated-turbulence')}
            onToggleSelect={() => handleToggleSelect('animated-turbulence')}
            onImageUpload={handleImageUpload('animated-turbulence')}
          >
            <img src={variantImages['animated-turbulence'] || defaultImageSrc} alt="Animated turbulence effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          {/* Extreme Warp */}
          <MirrorVariant
            title="Extreme Warp"
            baseFrequency={selectedVariant === 'extreme-warp' ? baseFrequency : 0.03}
            numOctaves={selectedVariant === 'extreme-warp' ? numOctaves : 4}
            scale={selectedVariant === 'extreme-warp' ? scale : 60}
            seed={7}
            animate={selectedVariant === 'extreme-warp' && animationsEnabled}
            isEnabled={variantEnabled['extreme-warp']}
            isSelected={selectedVariant === 'extreme-warp'}
            onToggleEnabled={() => handleToggleEnabled('extreme-warp')}
            onToggleSelect={() => handleToggleSelect('extreme-warp')}
            onImageUpload={handleImageUpload('extreme-warp')}
          >
            <img src={variantImages['extreme-warp'] || defaultImageSrc} alt="Extreme warp effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          {/* Glass Refraction */}
          <MirrorVariant
            title="Glass Refraction"
            baseFrequency={selectedVariant === 'glass-refraction' ? baseFrequency : 0.015}
            numOctaves={selectedVariant === 'glass-refraction' ? numOctaves : 3}
            scale={selectedVariant === 'glass-refraction' ? scale : 35}
            seed={8}
            animate={selectedVariant === 'glass-refraction' && animationsEnabled}
            isEnabled={variantEnabled['glass-refraction']}
            isSelected={selectedVariant === 'glass-refraction'}
            onToggleEnabled={() => handleToggleEnabled('glass-refraction')}
            onToggleSelect={() => handleToggleSelect('glass-refraction')}
            onImageUpload={handleImageUpload('glass-refraction')}
          >
            <img src={variantImages['glass-refraction'] || defaultImageSrc} alt="Glass refraction effect" className="h-full w-full object-cover pointer-events-none" />
          </MirrorVariant>

          <PixiOfflineCard
            title="PixiJS Slices"
            description="Pending migration to standalone tooling."
          />
          <PixiOfflineCard
            title="PixiJS Glitch"
            description="Glitch orbits will return once Pixi bundle is externalized."
          />
          <PixiOfflineCard
            title="PixiJS Morph"
            description="Morph variant temporarily offline."
          />
          <PixiOfflineCard
            title="PixiJS Radial"
            description="Radial motion moving to the dedicated Pixi playground."
          />
        </div>

        <div className="rounded border border-fg-08 bg-surface-secondary p-6 space-y-4">
          <h2 className="kol-heading-s">Implementation Notes</h2>
          <ul className="kol-helper-s text-fg-64 space-y-2 list-disc pl-6">
            <li><strong>SVG Displacement (Variants 1-8):</strong> Uses feTurbulence and feDisplacementMap for organic distortion effects.</li>
            <li><strong>baseFrequency:</strong> Controls the size/frequency of distortion (0.001-0.1). Lower = larger waves. For PixiJS variants: controls animation speed.</li>
            <li><strong>numOctaves:</strong> Complexity/detail level (1-4). Higher = more intricate patterns. For Glitch: controls slice count (numOctaves × 5). For Radial: controls tile scale.</li>
            <li><strong>scale:</strong> Intensity of displacement (1-100+). Higher = more extreme distortion. For Glitch: max offset. For Morph: scale intensity. For Radial: orbit radius.</li>
            <li><strong>seed:</strong> Random seed for turbulence pattern. Different values create unique patterns.</li>
            <li><strong>Animation:</strong> GSAP AttrPlugin animates SVG filter attributes in real-time.</li>
            <li><strong>PixiJS TilingSprite (Variant 9):</strong> WebGL-powered vertical slice effect. Controllable tile scale and horizontal shift speed.</li>
            <li><strong>PixiJS Glitch (Variant 10):</strong> WebGL-powered horizontal glitch effect. Random horizontal offsets for image slices (scan line corruption aesthetic).</li>
            <li><strong>PixiJS Morph (Variant 11):</strong> WebGL-powered breathing/pulsing effect. Sin/cos scale animation with diagonal shift creates organic morphing pattern.</li>
            <li><strong>PixiJS Radial (Variant 12):</strong> WebGL-powered circular orbit effect. Tiles shift in circular motion creating orbital kaleidoscope pattern.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ApparatusHallOfMirrors
