import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { DraggableControlPanel } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'
import DistortionControlsPanel from '../../components/workshop/molecules/DistortionControlsPanel'

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

const HallOfDisplacement = () => {
  const defaultImageSrc = '/img/features/card-item-base-7.png'
  const [variantImages, setVariantImages] = useState({})
  const [animationsEnabled, setAnimationsEnabled] = useState(false)
  const [scale, setScale] = useState(25)
  const [baseFrequency, setBaseFrequency] = useState(0.01)
  const [numOctaves, setNumOctaves] = useState(2)

  // Panel state
  const [isPanelLocked, setIsPanelLocked] = useState(false)
  const [isSnapped, setIsSnapped] = useState(false)
  const [snappedState, setSnappedState] = useState(null)

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

  const handleSnapChange = (snap) => {
    if (snap) {
      // Capture current state
      setSnappedState({
        scale,
        baseFrequency,
        numOctaves
      })
      console.log('Snapped state:', { scale, baseFrequency, numOctaves })
    } else {
      setSnappedState(null)
    }
    setIsSnapped(snap)
  }

  return (
    <div className="min-h-screen w-full bg-surface-primary p-12">
      <div className="mx-auto max-w-7xl space-y-12">
        <DesPage
          title="Hall of Displacement"
          subtitle="SVG displacement effects using GSAP AttrPlugin to animate turbulence and displacement parameters. Each variant demonstrates different combinations of baseFrequency, numOctaves, and scale values creating organic, wavy distortions."
        />

        <DraggableControlPanel
          isLocked={isPanelLocked}
          resizable={true}
          initialWidth={320}
          minWidth={240}
          maxWidth={600}
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
            isSnapped={isSnapped}
            onSnapChange={handleSnapChange}
          />
        </DraggableControlPanel>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Empty Slot */}
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
            <li><strong>SVG Displacement:</strong> Uses feTurbulence and feDisplacementMap for organic distortion effects. CPU-based rendering with predictable performance.</li>
            <li><strong>baseFrequency:</strong> Controls the size/frequency of distortion (0.001-0.1). Lower = larger waves, higher = finer grain.</li>
            <li><strong>numOctaves:</strong> Complexity/detail level (1-4). Higher = more intricate patterns with layered noise.</li>
            <li><strong>scale:</strong> Intensity of displacement (1-100+). Higher = more extreme distortion and warping.</li>
            <li><strong>seed:</strong> Random seed for turbulence pattern. Different values create unique distortion patterns.</li>
            <li><strong>Animation:</strong> GSAP AttrPlugin animates SVG filter attributes in real-time for smooth transitions.</li>
            <li><strong>Control Panel:</strong> Draggable with momentum physics. Lock button prevents accidental movement during adjustment.</li>
            <li><strong>Per-Variant Upload:</strong> Test effects with your own images. Each variant stores its uploaded image independently.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HallOfDisplacement
