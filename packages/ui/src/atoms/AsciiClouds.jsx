import { useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

const CHARS = [' ', '·', '∙', '░', '▒', '▓', '█']

function AsciiLayer({ scale = 1, duration = 25, opacity = 0.3, fields = [], startOffset = 0, zIndex = 0 }) {
  const driftX = useMotionValue(startOffset)

  useEffect(() => {
    const controls = animate(driftX, [startOffset, startOffset - window.innerWidth], {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    })
    return () => controls.stop()
  }, [driftX, duration, startOffset])

  const cols = Math.round(400 * scale)
  const rows = Math.round(40 * scale)
  const doubleCols = cols * 2

  const getCharAt = (col, row) => {
    const x = (col % (doubleCols / 2)) / (doubleCols / 2) * 2
    const y = row / rows

    let density = 0
    for (const field of fields) {
      const dx = x - field.x
      const dy = (y - field.y) * 2
      const dist = Math.sqrt(dx * dx + dy * dy)
      const fieldDensity = Math.max(0, 1 - dist / field.r) * field.intensity
      density = Math.max(density, fieldDensity)
    }

    const charIndex = Math.min(CHARS.length - 1, Math.floor(density * CHARS.length))
    return CHARS[charIndex]
  }

  const pattern = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: doubleCols }, (_, col) => getCharAt(col, row)).join('')
  )

  const fontSize = 12 / scale

  return (
    <motion.div
      style={{ x: driftX, zIndex }}
      className="absolute inset-y-0 left-0 w-[400vw] pointer-events-none overflow-hidden select-none flex items-center"
    >
      <pre
        className="font-mono leading-[1.2]"
        style={{
          color: 'var(--kol-surface-on-primary)',
          opacity,
          fontSize: `${fontSize}px`
        }}
      >
        {pattern.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
      </pre>
    </motion.div>
  )
}

const BACK_FIELDS = [
  { x: 0.1, y: 0.5, r: 0.17, intensity: 1 },
  { x: 0.5, y: 0.4, r: 0.15, intensity: 0.85 },
  { x: 1.0, y: 0.6, r: 0.18, intensity: 0.8 },
  { x: 1.5, y: 0.35, r: 0.16, intensity: 0.9 },
]

const FRONT_FIELDS = [
  { x: 0.3, y: 0.65, r: 0.22, intensity: 0.9 },
  { x: 0.75, y: 0.3, r: 0.24, intensity: 1 },
  { x: 1.25, y: 0.55, r: 0.28, intensity: 0.85 },
  { x: 1.75, y: 0.45, r: 0.25, intensity: 0.8 },
]

function AsciiCloudsParallax({ className, layers }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="sticky overflow-hidden" style={{ top: '-100vh', height: '200vh' }}>
        <div className="relative h-screen overflow-hidden">
          {layers}
        </div>
        <div className="relative h-screen overflow-hidden">
          {layers}
        </div>
      </div>
    </div>
  )
}

function AsciiCloudsDrift({ className, layers }) {
  const driftY = useMotionValue(0)

  useEffect(() => {
    const vh = window.innerHeight
    const controls = animate(driftY, [-vh, 0], {
      duration: 120,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    })
    return () => controls.stop()
  }, [driftY])

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div style={{ y: driftY, height: '200vh' }}>
        <div className="relative h-screen overflow-hidden">
          {layers}
        </div>
        <div className="relative h-screen overflow-hidden">
          {layers}
        </div>
      </motion.div>
    </div>
  )
}

export default function AsciiClouds({ className = '', variant = 'fixed' }) {
  const layers = (
    <>
      <AsciiLayer scale={1.4} duration={80} opacity={0.2} fields={BACK_FIELDS} startOffset={-300} />
      <AsciiLayer scale={1} duration={50} opacity={0.35} fields={FRONT_FIELDS} startOffset={0} zIndex={1} />
    </>
  )

  if (variant === 'parallax') {
    return <AsciiCloudsParallax className={className} layers={layers} />
  }

  if (variant === 'drift') {
    return <AsciiCloudsDrift className={className} layers={layers} />
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {layers}
    </div>
  )
}
