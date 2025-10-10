import { motion as Motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TextPressure from '../react-bits/TextPressure'
import CursorTrail from '../overlay/CursorTrail'
import CursorTrailColor from '../overlay/CursorTrailColor'

export default function ColorLoader({ message = 'Loading', onEnter }) {
  const [showEnter, setShowEnter] = useState(false)

  useEffect(() => {
    // Show Enter text after 2 seconds
    const timer = setTimeout(() => {
      setShowEnter(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <CursorTrail />
      <CursorTrailColor />

      {/* Main container - fills parent, flex column layout */}
      <div className="w-full h-full flex flex-col">
        {/* Top third - empty */}
        <div className="self-stretch flex-1 flex justify-center items-end" />

        {/* Middle third - TextPressure ENTER */}
        <div className="self-stretch flex-1 pb-24 flex flex-col">
          <Motion.div
            className="self-stretch flex-1 inline-flex justify-center items-end cursor-pointer"
            onClick={onEnter}
            initial={{ opacity: 0 }}
            animate={{ opacity: showEnter ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-96 h-32">
              <TextPressure
                text="ENTER"
                fontFamily="TG Root-Tune"
                fontUrl="/fonts/TGRoot-TuneVF.ttf"
                textColor="#ffffff"
                flex={true}
                width={true}
                weight={true}
                italic={false}
                minFontSize={36}
              />
            </div>
          </Motion.div>
        </div>

        {/* Bottom third - empty */}
        <div className="self-stretch flex-1 flex justify-center items-end" />
      </div>
    </>
  )
}
