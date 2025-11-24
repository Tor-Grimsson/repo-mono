import { motion as Motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'
import TextPressure from '../react-bits/TextPressure'
import CursorTrail from '../overlay/CursorTrail'

export default function ColorLoader({ onEnter }) {
  const [showKolkrabbi, setShowKolkrabbi] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    // Show KOLKRABBI after 1 second
    const kolkrabbiTimer = setTimeout(() => {
      setShowKolkrabbi(true)
    }, 1000)

    // Show Scroll arrow after 2 seconds
    const scrollTimer = setTimeout(() => {
      setShowScroll(true)
    }, 2000)

    return () => {
      clearTimeout(kolkrabbiTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  useEffect(() => {
    if (!showScroll || isExiting) return

    const handleScroll = (e) => {
      // Detect scroll down
      if (e.deltaY > 0) {
        setIsExiting(true)
        // Slide loader up - longer duration for more scroll feel
        controls.start({
          y: '-100%',
          transition: { duration: 1.8, ease: 'easeInOut' }
        }).then(() => {
          if (onEnter) onEnter()
        })
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: true })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [showScroll, isExiting, controls, onEnter])

  return (
    <>
      <CursorTrail />

      {/* Main container - fills parent, flex column layout, hide cursor */}
      <Motion.div
        className="w-full h-full flex flex-col bg-surface-primary"
        style={{ cursor: 'none' }}
        animate={controls}
        initial={{ y: 0 }}
      >
        {/* Top third - empty */}
        <div className="self-stretch flex-1 flex justify-center items-end" />

        {/* Middle third - Kolkrabbi + Scroll Arrow */}
        <div className="self-stretch flex-1 flex flex-col items-center justify-center gap-12">
          {/* KOLKRABBI - Fades in after 1 second */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showKolkrabbi ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-[600px] h-32">
              <TextPressure
                text="KOLKRABBI"
                fontFamily="TG Root-Tune"
                fontUrl="/fonts/TGRoot-TuneVF.ttf"
                textColor="#ffffff"
                flex={true}
                width={true}
                weight={true}
                italic={false}
                minFontSize={64}
              />
            </div>
          </Motion.div>

          {/* Scroll Arrow - Fades in after 2 seconds with bounce animation */}
          <Motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: showScroll ? 0.6 : 0,
              y: showScroll ? [0, 12, 0] : 0
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="mt-12"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Motion.div>
        </div>

        {/* Bottom third - empty */}
        <div className="self-stretch flex-1 flex justify-center items-end" />
      </Motion.div>
    </>
  )
}
