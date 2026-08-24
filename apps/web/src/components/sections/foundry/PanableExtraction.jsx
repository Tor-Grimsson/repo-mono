import { useCallback, useEffect, useRef, useState } from 'react'
import Extraction from './Extraction.jsx'

const FRICTION = 0.92
const BOUNCE_DAMPING = 0.35

const clamp = (value, limit) => {
  if (limit <= 0) return 0
  return Math.max(-limit, Math.min(limit, value))
}

const computeBounds = (rect, overscan) => {
  const maxX = (rect.width * (overscan - 1)) / 2
  const maxY = (rect.height * (overscan - 1)) / 2
  return { maxX, maxY }
}

const PanableExtraction = ({
  height = 628,
  overscan = 2,
  className = '',
  glyph = 'æ',
  showMetricLabels = true,
  showBearingLabels = true,
  disableSelection = true,
  ...extractionProps
}) => {
  const containerRef = useRef(null)
  const pointerStateRef = useRef({ active: false, x: 0, y: 0, time: 0, pointerId: null })
  const velocityRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)
  const lastFrameRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const stopInertia = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    lastFrameRef.current = null
  }, [])

  useEffect(() => () => stopInertia(), [stopInertia])

  const updatePosition = useCallback(
    (dx, dy) => {
      setPosition((prev) => {
        const container = containerRef.current
        const rect = container ? container.getBoundingClientRect() : { width: 0, height: 0 }
        const { maxX, maxY } = computeBounds(rect, overscan)
        const nextX = clamp(prev.x + dx, maxX)
        const nextY = clamp(prev.y + dy, maxY)
        return nextX === prev.x && nextY === prev.y ? prev : { x: nextX, y: nextY }
      })
    },
    [overscan]
  )

  const startInertia = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const step = (timestamp) => {
      if (lastFrameRef.current == null) {
        lastFrameRef.current = timestamp
        animationRef.current = requestAnimationFrame(step)
        return
      }

      const dt = timestamp - lastFrameRef.current
      lastFrameRef.current = timestamp

      velocityRef.current = {
        x: velocityRef.current.x * FRICTION,
        y: velocityRef.current.y * FRICTION
      }

      const velocityMagnitude = Math.hypot(velocityRef.current.x, velocityRef.current.y)
      if (velocityMagnitude < 0.01) {
        stopInertia()
        return
      }

      const dx = velocityRef.current.x * dt
      const dy = velocityRef.current.y * dt

      setPosition((prev) => {
        const container = containerRef.current
        const rect = container ? container.getBoundingClientRect() : { width: 0, height: 0 }
        const { maxX, maxY } = computeBounds(rect, overscan)

        let nextX = prev.x + dx
        let nextY = prev.y + dy

        if (Math.abs(nextX) > maxX && maxX > 0) {
          nextX = Math.sign(nextX) * maxX
          velocityRef.current = { ...velocityRef.current, x: velocityRef.current.x * -BOUNCE_DAMPING }
        }

        if (Math.abs(nextY) > maxY && maxY > 0) {
          nextY = Math.sign(nextY) * maxY
          velocityRef.current = { ...velocityRef.current, y: velocityRef.current.y * -BOUNCE_DAMPING }
        }

        return { x: nextX, y: nextY }
      })

      animationRef.current = requestAnimationFrame(step)
    }

    animationRef.current = requestAnimationFrame(step)
  }, [overscan, stopInertia])

  const handlePointerDown = (event) => {
    if (!containerRef.current) return

    stopInertia()

    pointerStateRef.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      pointerId: event.pointerId
    }

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const state = pointerStateRef.current
    if (!state.active) return

    const now = performance.now()
    const dx = event.clientX - state.x
    const dy = event.clientY - state.y
    const dt = now - state.time || 16

    updatePosition(dx, dy)

    velocityRef.current = {
      x: dx / dt,
      y: dy / dt
    }

    pointerStateRef.current = {
      ...state,
      x: event.clientX,
      y: event.clientY,
      time: now
    }
  }

  const endInteraction = (event) => {
    const state = pointerStateRef.current
    if (!state.active) return

    pointerStateRef.current = { active: false, x: 0, y: 0, time: 0, pointerId: null }

    if (event.pointerId != null) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    startInertia()
  }

  const stageTransform = `translate3d(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px), 0)`
  const stageWidth = `${overscan * 100}%`
  const stageHeight = `${overscan * 100}%`
  const extractionHeight = height * overscan

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden touch-pan-y touch-pan-x ${className}`}
      style={{ height }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endInteraction}
      onPointerLeave={endInteraction}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: stageWidth,
          height: stageHeight,
          transform: stageTransform,
          willChange: 'transform'
        }}
      >
        <Extraction
          {...extractionProps}
          glyph={glyph}
          height={extractionHeight}
          showMetricLabels={showMetricLabels}
          showBearingLabels={showBearingLabels}
          disableSelection={disableSelection}
          className="pointer-events-none w-full h-full"
        />
      </div>
    </div>
  )
}

export default PanableExtraction
