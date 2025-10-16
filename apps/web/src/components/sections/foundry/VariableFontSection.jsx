import { useState, useEffect, useRef } from 'react'
import { Slider } from '@kol/ui'

const VariableFontSection = () => {
  const [weight, setWeight] = useState(400)
  const [isAnimating, setIsAnimating] = useState(true)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!isAnimating) return

    let direction = 1
    let currentWeight = weight
    let lastTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const delta = now - lastTime

      if (delta > 16) { // ~60fps throttle
        currentWeight += direction * 2

        if (currentWeight >= 900) {
          currentWeight = 900
          direction = -1
        } else if (currentWeight <= 300) {
          currentWeight = 300
          direction = 1
        }

        setWeight(currentWeight)
        lastTime = now
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating])

  const handleSliderChange = (value) => {
    setIsAnimating(false)
    setWeight(value)
  }

  return (
    <section
      className="foundryCard foundryCardPadded foundryCardInverted w-full h-[60vh] flex flex-col items-center justify-between"
      style={{ '--card-opacity': '10%' }}
    >
      {/* Tag - Center Top */}
      <div className="w-full flex justify-center">
        <div className="fontBadge cursor-pointer whitespace-nowrap">
          Variable Font
        </div>
      </div>

      {/* Variable Text Example - Center Center */}
      <div className="flex-1 flex items-center justify-center w-full">
        <p
          className="text-[80px] md:text-[144px] transition-colors duration-300"
          style={{
            fontFamily: 'TGMalromur',
            fontWeight: weight,
            fontStyle: 'italic',
            color: 'var(--kol-surface-on-primary)'
          }}
        >
          Variable
        </p>
      </div>

      {/* Variable Slider - Center Bottom */}
      <div className="w-full flex justify-center items-center gap-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="control-unified cursor-pointer flex items-center justify-center gap-[3px] h-[28px] w-[28px] !p-0"
        >
          {isAnimating ? (
            <>
              <div className="w-[2px] h-[12px] bg-current"></div>
              <div className="w-[2px] h-[12px] bg-current"></div>
            </>
          ) : (
            <div className="w-0 h-0 border-l-[6px] border-l-current border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-[2px]"></div>
          )}
        </button>
        <div className="w-full max-w-md">
          <Slider
            label="Weight"
            min={300}
            max={900}
            value={weight}
            onChange={handleSliderChange}
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}

export default VariableFontSection
