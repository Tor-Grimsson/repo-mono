import { motion as Motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TextPressure from '../../react-bits/TextPressure'
import CursorTrail from '../../overlay/CursorTrail'
import CursorTrailColor from '../../overlay/CursorTrailColor'
import MagnetLines from '../../react-bits/MagnetLines'

export default function SpinnerLoader({ message = 'Loading', onEnter }) {
  const [showEnter, setShowEnter] = useState(false)

  // MagnetLines props
  const magnetLinesProps = {
    rows: 12,
    columns: 48,
    containerSize: undefined,
    lineColor: '#ffffff',
    lineWidth: '0.5vmin',
    lineHeight: '3vmin',
    baseAngle: -10,
    style: {
      width: '100%',
      height: '100%'
    }
  }

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
        {/* Top third - MagnetLines sky/weather */}
        <div className="self-stretch flex-1 flex justify-center items-end">
          <MagnetLines {...magnetLinesProps} />
        </div>

        {/* Spinner - centered in middle third */}
        <div className="self-stretch flex-1 inline-flex justify-center items-center">
          <Motion.div
            className="text-display uppercase text-white"
            style={{ fontFamily: 'var(--font-family-rgrot-narrow)', fontSize: '400%' }}
            animate={{ rotate: 720 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            KOLKRABBI
          </Motion.div>
        </div>

        {/* TextPressure ENTER - bottom third with nested structure */}
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
      </div>
    </>
  )
}
