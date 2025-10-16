import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useNavigate } from 'react-router-dom'
import Logomark from '../../ui/Logomark'

gsap.registerPlugin(Draggable, InertiaPlugin)

const DialRotation = ({
  projects = [],
  maxIntensity = 200,
  maxFrequency = 100,
  breathDuration = 3,
  breathIntensity = 10,
  separationAmount = 16,
  globalScale = 50,
  globalTime = 100,
  circleCount = 1,
  controlMode = 'relative',
  quantizeWaves = false
}) => {
  const circleRef = useRef(null)
  const spinRef = useRef(null)
  const centerContentRef = useRef(null)
  const svgCacheRef = useRef({})
  const circlePathRef = useRef(null)
  const circlePathsRef = useRef([]) // Array of refs for all circles
  const driftRef = useRef(0)
  const rotationCountRef = useRef(0)
  const lastRotationRef = useRef(0)
  const waveIntensityRef = useRef(0) // Starts at 0, drag will build this up
  const waveFrequencyRef = useRef(0) // Starts at 0, drag will build this up
  const velocityOffsetRef = useRef(0) // For inertia-based separation
  const breathingRef = useRef(0) // For continuous breathing effect
  const breathSeparationRef = useRef(0) // For breath-based automatic separation
  const globalScaleRef = useRef(globalScale) // Always has current globalScale value
  const globalTimeRef = useRef(globalTime) // Always has current globalTime value
  const separationAmountRef = useRef(separationAmount) // Always has current separationAmount value
  const maxIntensityRef = useRef(maxIntensity) // Always has current maxIntensity value (for drag caps)
  const maxFrequencyRef = useRef(maxFrequency) // Always has current maxFrequency value (for drag caps)
  const baseIntensityRef = useRef(maxIntensity) // Base intensity visible at all times
  const baseFrequencyRef = useRef(maxFrequency) // Base frequency visible at all times
  const breathIntensityRef = useRef(breathIntensity) // Breath amplitude
  const controlModeRef = useRef(controlMode) // Control mode: 'relative' or 'absolute'
  const quantizeWavesRef = useRef(quantizeWaves) // Manual quantization toggle
  const breathingAnimationRef = useRef(null) // Reference to breathing animation
  const navigate = useNavigate()

  // Keep refs in sync with props
  globalScaleRef.current = globalScale
  globalTimeRef.current = globalTime
  separationAmountRef.current = separationAmount
  maxIntensityRef.current = maxIntensity
  maxFrequencyRef.current = maxFrequency
  baseIntensityRef.current = maxIntensity
  baseFrequencyRef.current = maxFrequency
  breathIntensityRef.current = breathIntensity
  controlModeRef.current = controlMode
  quantizeWavesRef.current = quantizeWaves

  // Generate warped circle path with sine wave - smooth curve
  const generateCirclePath = (radius, amp = 0, freq = 20, damp = 60, centerX = 200, centerY = 200, phaseOffset = 0) => {
    const points = []
    const numPoints = 180 // Reduced points for smoother curve

    // Quantize if manually enabled, OR automatically when we have multiple circles AND high modulation
    const shouldQuantize = quantizeWavesRef.current || (circleCount > 2 && amp > 10)

    let wavePhaseCalc
    if (shouldQuantize) {
      // Quantize frequency to ensure it completes full cycles around the circle
      const cyclesPerCircle = Math.round(freq / 10)
      wavePhaseCalc = (angle) => angle * cyclesPerCircle + ((driftRef.current + phaseOffset) * 0.1)
    } else {
      // Use smooth continuous wave (original behavior)
      wavePhaseCalc = (angle, i) => ((i + driftRef.current + phaseOffset) / damp) * freq
    }

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      // Apply sine wave to radius
      const wavePhase = shouldQuantize ? wavePhaseCalc(angle) : wavePhaseCalc(angle, i)
      const waveOffset = amp * Math.sin(wavePhase)
      const r = radius + waveOffset

      const x = centerX + Math.cos(angle) * r
      const y = centerY + Math.sin(angle) * r

      points.push({ x, y })
    }

    // Build smooth path using quadratic curves that wraps around
    let pathData = `M ${points[0].x},${points[0].y}`

    for (let i = 0; i < points.length; i++) {
      const current = points[i]
      const next = points[(i + 1) % points.length] // Wrap around to first point
      const midX = (current.x + next.x) / 2
      const midY = (current.y + next.y) / 2

      pathData += ` Q ${current.x},${current.y} ${midX},${midY}`
    }

    pathData += ' Z'
    return pathData
  }

  // Update circle path animation
  const updateCirclePath = (amp = 0, freq = 20) => {
    if (!circlePathRef.current) return

    const centerX = 200 // Center of 400px container
    const centerY = 200
    const radius = 200 // Base radius

    // Main circle - always at base radius, no phase offset
    const path = generateCirclePath(radius, amp, freq, 60, centerX, centerY, 0)
    circlePathRef.current.setAttribute('d', path)

    // Generate additional circle pairs with temporal offset
    circlePathsRef.current.forEach((pathRef, index) => {
      if (!pathRef) return

      const pairIndex = Math.floor(index / 2) + 1 // Which pair (1, 2, 3, etc.)
      const isInner = index % 2 === 0 // Even indices are inner circles

      // Each pair is offset by separationAmount pixels from the previous
      const baseOffset = pairIndex * separationAmountRef.current * (globalScaleRef.current / 100)
      // Combine velocity-based and breath-based separation (both already scaled by globalScale)
      const totalSeparation = (velocityOffsetRef.current * (pairIndex / circleCount)) +
                             (breathSeparationRef.current * pairIndex)

      const circleRadius = isInner
        ? radius - baseOffset - totalSeparation
        : radius + baseOffset + totalSeparation

      // Temporal phase offset: each pair is slightly behind/ahead in "time"
      // Creates a ripple/echo effect
      const phaseOffset = pairIndex * 15 // Each pair is 15 units behind in phase

      // Slight variation in amplitude and frequency based on pair position
      const ampVariation = amp * (1 + (pairIndex * 0.1))
      const freqVariation = freq * (1 + (pairIndex * 0.05))

      const circlePath = generateCirclePath(
        circleRadius,
        ampVariation,
        freqVariation,
        60,
        centerX,
        centerY,
        phaseOffset
      )
      pathRef.setAttribute('d', circlePath)
    })
  }

  // Place items around the circle - Animate divs, not buttons
  const placeItems = (itemURLs) => {
    const circle = circleRef.current
    if (!circle) return []

    const angleIncrement = Math.PI * 2 / itemURLs.length
    const radius = circle.offsetWidth / 2
    const items = []

    // Preload and cache all SVGs
    itemURLs.forEach(async (item) => {
      if (item.svg?.url && !svgCacheRef.current[item.svg.url]) {
        try {
          const response = await fetch(item.svg.url)
          const svgText = await response.text()
          // Cache the themed SVG
          svgCacheRef.current[item.svg.url] = svgText
            .replace(/fill="[^"]*"/g, 'fill="currentColor"')
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
        } catch (error) {
          console.error('Failed to preload SVG:', error)
        }
      }
    })

    itemURLs.forEach((item, i) => {
      // Wrapper div - this gets animated by GSAP
      const wrapper = document.createElement('div')
      wrapper.className = 'dial-item-wrapper'

      // Button with styling - stays static inside wrapper
      const button = document.createElement('button')
      button.className = 'dial-item'
      button.style.display = 'flex'
      button.style.alignItems = 'center'
      button.style.justifyContent = 'center'
      button.style.backgroundColor = 'var(--kol-surface-primary)'
      button.style.color = 'var(--kol-surface-on-primary)'
      button.style.padding = '8px 16px'
      button.style.borderRadius = '9999px'
      button.style.border = '1px solid var(--kol-surface-on-primary)'
      button.style.whiteSpace = 'nowrap'
      button.style.transition = 'background-color 0.2s, color 0.2s'

      // Hover state - change button colors and show project SVG
      button.addEventListener('mouseenter', async () => {
        button.style.backgroundColor = 'var(--kol-surface-inverse)'
        button.style.color = 'var(--kol-surface-on-inverse)'

        const svgPreview = circle.querySelector('.svg-preview')
        const svgContainer = circle.querySelector('.svg-container')

        if (svgPreview && item.svg?.url) {
          // Check cache first, otherwise fetch
          let themedSvg = svgCacheRef.current[item.svg.url]

          if (!themedSvg) {
            try {
              const response = await fetch(item.svg.url)
              const svgText = await response.text()
              themedSvg = svgText
                .replace(/fill="[^"]*"/g, 'fill="currentColor"')
                .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
              svgCacheRef.current[item.svg.url] = themedSvg
            } catch (error) {
              console.error('Failed to load SVG:', error)
              return
            }
          }

          svgPreview.innerHTML = themedSvg
          svgPreview.style.color = 'var(--kol-surface-on-primary)'
          svgPreview.style.display = 'flex'
          svgPreview.style.alignItems = 'center'
          svgPreview.style.justifyContent = 'center'
        }

        if (svgContainer) {
          svgContainer.style.opacity = '1'
        }
      })
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'var(--kol-surface-primary)'
        button.style.color = 'var(--kol-surface-on-primary)'

        const svgContainer = circle.querySelector('.svg-container')
        if (svgContainer) {
          svgContainer.style.opacity = '0'
        }
      })

      const textDiv = document.createElement('div')
      textDiv.textContent = item.title.toUpperCase()
      textDiv.style.fontFamily = 'RightGrotesk, sans-serif'
      textDiv.style.fontSize = '24px'
      textDiv.style.lineHeight = '1'

      button.appendChild(textDiv)
      button.onclick = () => {
        if (item.slug?.current) {
          navigate(`/work/${item.slug.current}`)
        }
      }

      wrapper.appendChild(button)
      items.push(wrapper)
      circle.appendChild(wrapper)

      const angle = angleIncrement * i
      gsap.set(wrapper, {
        position: "absolute",
        top: 0,
        left: 0,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        x: radius + Math.cos(angle) * radius,
        y: radius + Math.sin(angle) * radius
      })
    })

    return items
  }

  useEffect(() => {
    if (projects.length === 0 || !circleRef.current) return

    // Place items around circle
    const items = placeItems(projects)

    // Create spin timeline - circle rotates, items and center content counter-rotate
    spinRef.current = gsap.timeline({
      repeat: -1,
      defaults: { duration: 50, ease: "none" }
    })
      .to(circleRef.current, { rotation: 360 })
      .to(items, { rotation: -360 }, 0)
      .to(centerContentRef.current, { rotation: -360 }, 0) // Counter-rotate center content (logo + thumbnail)

    // Initialize circle path
    updateCirclePath(0)

    // Continuous breathing effect - runs even during auto-rotation
    breathingAnimationRef.current = gsap.to(breathingRef, {
      current: 1,
      duration: breathDuration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        // Skip all effects if globalScale is 0
        if (globalScaleRef.current === 0) {
          breathSeparationRef.current = 0
          updateCirclePath(0, 20)
          return
        }

        // Breathing adds to drift
        driftRef.current += breathingRef.current * 0.5

        let totalAmp, totalFreq

        if (controlModeRef.current === 'absolute') {
          // ABSOLUTE MODE: Sliders directly control wave intensity/frequency
          // Breathing still modulates on top
          const breathModulation = breathingRef.current * breathIntensityRef.current
          const dragAmp = waveIntensityRef.current
          const dragFreq = waveFrequencyRef.current

          totalAmp = (baseIntensityRef.current * 0.1 + breathModulation + dragAmp) * (globalScaleRef.current / 100)
          totalFreq = (baseFrequencyRef.current * 0.2 + dragFreq) * (globalScaleRef.current / 100)
        } else {
          // RELATIVE MODE: Sliders provide subtle base layer
          const baseAmp = baseIntensityRef.current * 0.05
          const baseFreq = baseFrequencyRef.current * 0.15
          const breathModulation = breathingRef.current * breathIntensityRef.current
          const dragAmp = waveIntensityRef.current
          const dragFreq = waveFrequencyRef.current

          totalAmp = (baseAmp + breathModulation + dragAmp) * (globalScaleRef.current / 100)
          totalFreq = (baseFreq + dragFreq) * (globalScaleRef.current / 100)
        }

        // Auto-separate first pair at peak of breathing cycle
        // Use the absolute breath value directly - peaks at 1.0, valleys at 0
        const breathProgress = Math.abs(breathingRef.current)
        // Map breath progress to separation: 0 at valleys, full separation at peaks
        breathSeparationRef.current = breathProgress * separationAmountRef.current * (globalScaleRef.current / 100)

        updateCirclePath(totalAmp, totalFreq)
      }
    })

    // Create draggable with wave effects
    const draggable = Draggable.create(circleRef.current, {
      type: 'rotation',
      inertia: true,
      dragClickables: true,
      onClick: function(e) {
        if (this.isDragging || Math.abs(this.deltaX) > 3 || Math.abs(this.deltaY) > 3) {
          e.stopPropagation()
          e.preventDefault()
        }
      },
      onPressInit: () => {
        spinRef.current.pause()
        // Separate circles on grab with ease in
        gsap.to(velocityOffsetRef, {
          current: separationAmountRef.current * (globalScaleRef.current / 100),
          duration: 0.3,
          ease: "power2.in",
          onUpdate: () => updateCirclePath(waveIntensityRef.current * (globalScaleRef.current / 100), waveFrequencyRef.current * (globalScaleRef.current / 100))
        })
      },
      onDrag: function() {
        const angle = (this.rotation + 360 * 100000) % 360
        const currentRotation = this.rotation / 360

        // Track full rotations
        const fullRotations = Math.floor(Math.abs(currentRotation))
        if (fullRotations !== rotationCountRef.current) {
          rotationCountRef.current = fullRotations

          // Build intensity up to max, then decrease
          if (waveIntensityRef.current < maxIntensityRef.current) {
            // Double the intensity each rotation until max
            waveIntensityRef.current = Math.min(
              waveIntensityRef.current === 0 ? 2 : waveIntensityRef.current * 2,
              maxIntensityRef.current
            )
          } else {
            // After max, halve the intensity each rotation
            waveIntensityRef.current = Math.max(waveIntensityRef.current / 2, 0.5)
          }

          // Build frequency up to max, then decrease (same pattern)
          if (waveFrequencyRef.current < maxFrequencyRef.current) {
            waveFrequencyRef.current = Math.min(
              waveFrequencyRef.current === 0 ? 10 : waveFrequencyRef.current * 2,
              maxFrequencyRef.current
            )
          } else {
            waveFrequencyRef.current = Math.max(waveFrequencyRef.current / 2, 0)
          }
        }

        spinRef.current.progress(angle / 360)

        // Update drift and apply cumulative wave intensity and frequency
        driftRef.current += 0.5

        // Update velocity offset based on drag velocity
        const velocity = Math.sqrt(this.deltaX ** 2 + this.deltaY ** 2)
        velocityOffsetRef.current = Math.min(velocity * 0.3, separationAmountRef.current) * (globalScaleRef.current / 100) // Cap at separation amount

        updateCirclePath(waveIntensityRef.current * (globalScaleRef.current / 100), waveFrequencyRef.current * (globalScaleRef.current / 100))
      },
      onThrowUpdate: function() {
        const angle = (this.rotation + 360 * 100000) % 360
        const currentRotation = this.rotation / 360

        // Track full rotations during throw
        const fullRotations = Math.floor(Math.abs(currentRotation))
        if (fullRotations !== rotationCountRef.current) {
          rotationCountRef.current = fullRotations

          if (waveIntensityRef.current < maxIntensityRef.current) {
            waveIntensityRef.current = Math.min(
              waveIntensityRef.current === 0 ? 2 : waveIntensityRef.current * 2,
              maxIntensityRef.current
            )
          } else {
            waveIntensityRef.current = Math.max(waveIntensityRef.current / 2, 0.5)
          }

          if (waveFrequencyRef.current < maxFrequencyRef.current) {
            waveFrequencyRef.current = Math.min(
              waveFrequencyRef.current === 0 ? 10 : waveFrequencyRef.current * 2,
              maxFrequencyRef.current
            )
          } else {
            waveFrequencyRef.current = Math.max(waveFrequencyRef.current / 2, 0)
          }
        }

        spinRef.current.progress(angle / 360)

        driftRef.current += 0.5

        // Continue velocity offset during throw
        const velocity = Math.abs(this.velocityX || 0) + Math.abs(this.velocityY || 0)
        velocityOffsetRef.current = Math.min(velocity * 0.05, separationAmountRef.current) * (globalScaleRef.current / 100)

        updateCirclePath(waveIntensityRef.current * (globalScaleRef.current / 100), waveFrequencyRef.current * (globalScaleRef.current / 100))
      },
      onThrowComplete: () => {
        spinRef.current.resume()
        gsap.fromTo(spinRef.current, { timeScale: 0 }, { duration: 1, timeScale: 1, ease: "power1.in" })

        // Ease wave back to zero over time
        gsap.to(waveIntensityRef, {
          current: 0,
          duration: 3,
          ease: "power2.out",
          onUpdate: function() {
            updateCirclePath(waveIntensityRef.current * (globalScaleRef.current / 100), waveFrequencyRef.current * (globalScaleRef.current / 100))
          }
        })
        gsap.to(waveFrequencyRef, {
          current: 0,
          duration: 3,
          ease: "power2.out",
          onUpdate: function() {
            updateCirclePath(waveIntensityRef.current * (globalScaleRef.current / 100), waveFrequencyRef.current * (globalScaleRef.current / 100))
          }
        })
        // Ease velocity offset back to 0
        gsap.to(velocityOffsetRef, {
          current: 0,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            updateCirclePath(waveIntensityRef.current * (globalScaleRef.current / 100), waveFrequencyRef.current * (globalScaleRef.current / 100))
          }
        })
      }
    })

    return () => {
      if (draggable[0]) draggable[0].kill()
      if (spinRef.current) spinRef.current.kill()
      if (breathingAnimationRef.current) breathingAnimationRef.current.kill()
      // Clean up DOM
      items.forEach(item => item.remove())
    }
  }, [projects, navigate])

  // Update timeScale on all animations when globalTime changes
  useEffect(() => {
    const timeScale = globalTime / 100 // Convert 0-100 to 0-1 scale

    if (spinRef.current) {
      spinRef.current.timeScale(timeScale)
    }
    if (breathingAnimationRef.current) {
      breathingAnimationRef.current.timeScale(timeScale)
    }
  }, [globalTime])

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="kol-mono-text opacity-50">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12 w-full">
      <div
        ref={circleRef}
        className="main-circle"
        style={{
          width: '400px',
          height: '400px',
          position: 'relative',
          cursor: 'grab'
        }}
      >
        {/* SVG circles with wave effect */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible'
          }}
          viewBox="0 0 400 400"
        >
          {/* Additional circle pairs (inner/outer for each count) */}
          {Array.from({ length: (circleCount - 1) * 2 }).map((_, index) => (
            <path
              key={`circle-${index}`}
              ref={(el) => (circlePathsRef.current[index] = el)}
              fill="none"
              stroke="var(--kol-surface-on-primary)"
              strokeWidth="2"
              opacity="1"
            />
          ))}
          {/* Main circle - always rendered on top */}
          <path
            ref={circlePathRef}
            fill="none"
            stroke="var(--kol-surface-on-primary)"
            strokeWidth="2"
          />
        </svg>
        {/* Center content wrapper - counter-rotates to keep logo and thumbnail upright */}
        <div ref={centerContentRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ pointerEvents: 'none' }}>
          {/* Hidden logo */}
          <div className="logo-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 hidden" style={{ width: '40px', height: '40px' }}>
            <Logomark className="w-full h-full" />
          </div>

          {/* SVG container - handles show/hide */}
          <div className="svg-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300" style={{ width: '64px', height: '64px' }}>
            <div className="svg-preview" style={{ width: '64px', height: '64px' }}>
              {/* SVG will be injected here on hover */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialRotation
