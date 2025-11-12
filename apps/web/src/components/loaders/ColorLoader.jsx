import { motion as Motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TextPressure from '../react-bits/TextPressure'
import CursorTrail from '../overlay/CursorTrail'

export default function ColorLoader({ message = 'Loading', onEnter }) {
  const [showKolkrabbi, setShowKolkrabbi] = useState(false)
  const [showEnter, setShowEnter] = useState(false)

  useEffect(() => {
    // Show KOLKRABBI after 1 second
    const kolkrabbiTimer = setTimeout(() => {
      setShowKolkrabbi(true)
    }, 1000)

    // Show Enter text after 2 seconds
    const enterTimer = setTimeout(() => {
      setShowEnter(true)
    }, 2000)

    return () => {
      clearTimeout(kolkrabbiTimer)
      clearTimeout(enterTimer)
    }
  }, [])

  return (
    <>
      <CursorTrail />

      {/* Main container - fills parent, flex column layout, hide cursor */}
      <div className="w-full h-full flex flex-col" style={{ cursor: 'none' }}>
        {/* Top third - empty */}
        <div className="self-stretch flex-1 flex justify-center items-end" />

        {/* Middle third - TextPressure KOLKRABBI + ENTER */}
        <div className="self-stretch flex-1 flex flex-col items-center justify-center gap-8">
          {/* KOLKRABBI - Fades in after 1 second */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showKolkrabbi ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-[600px] h-48">
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

          {/* ENTER - Fades in after 2 seconds */}
          <Motion.div
            className="cursor-pointer mt-8"
            onClick={onEnter}
            initial={{ opacity: 0 }}
            animate={{ opacity: showEnter ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center font-['TGMalromur'] italic text-[64px] text-white leading-none relative nav-link-underline opacity-60 hover:opacity-100 transition-opacity duration-300">
              enter
            </div>
          </Motion.div>
        </div>

        {/* Bottom third - empty */}
        <div className="self-stretch flex-1 flex justify-center items-end" />
      </div>
    </>
  )
}
