import { useState } from 'react'
import { SectionLabel, ControlPanel, ControlButton } from '@kol/ui'
import DialRotation from './DialRotation'

export default function WorkHeroSection({ projects = [] }) {
  const [showControls, setShowControls] = useState(false)
  const [maxIntensity, setMaxIntensity] = useState(200)
  const [maxFrequency, setMaxFrequency] = useState(100)
  const [breathDuration, setBreathDuration] = useState(3)
  const [breathIntensity, setBreathIntensity] = useState(10)
  const [separationAmount, setSeparationAmount] = useState(16)
  const [globalScale, setGlobalScale] = useState(50)
  const [globalTime, setGlobalTime] = useState(100)
  const [circleCount, setCircleCount] = useState(1) // Start with just main circle
  const [controlMode, setControlMode] = useState('relative') // 'relative' or 'absolute'
  const [quantizeWaves, setQuantizeWaves] = useState(false) // Manual wave quantization toggle

  return (
    <div className="py-12 h-dvh flex flex-col justify-between gap-2 relative full-bleed">

      <div className="flex-1 flex items-center justify-center">
        <DialRotation
          projects={projects}
          maxIntensity={maxIntensity}
          maxFrequency={maxFrequency}
          breathDuration={breathDuration}
          breathIntensity={breathIntensity}
          separationAmount={separationAmount}
          globalScale={globalScale}
          globalTime={globalTime}
          circleCount={circleCount}
          controlMode={controlMode}
          quantizeWaves={quantizeWaves}
        />
      </div>

      <div>
         <SectionLabel text="All work" className="mt-auto" />
         <div className="flex items-end justify-between">
           <h1 className="kol-heading-display">
           / projects
           </h1>
           {/* Show Controls button when hidden */}
           {!showControls && (
             <ControlButton
               onClick={() => setShowControls(true)}
               className="z-[100]"
             >
               Show Controls
             </ControlButton>
           )}
         </div>
      </div>

      {/* Controls Panel - Expands Up */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '48px',
            zIndex: 100,
            width: '65%'
          }}
          className="flex flex-col md:min-w-[320px] md:w-auto lg:max-w-[400px]"
        >
          <ControlPanel
            controls={[
              {
                id: 'intensity',
                type: 'slider',
                label: 'Intensity',
                hasToggle: true,
                toggleStates: ['A', 'B'],
                min: 0,
                max: 400,
                defaultValue: maxIntensity
              },
              {
                id: 'frequency',
                type: 'slider',
                label: 'Frequency',
                hasToggle: true,
                toggleStates: ['A', 'B'],
                min: 10,
                max: 200,
                defaultValue: maxFrequency
              },
              {
                id: 'breathTime',
                type: 'slider',
                label: 'Breath Time',
                min: 1,
                max: 10,
                defaultValue: breathDuration
              },
              {
                id: 'breathAmp',
                type: 'slider',
                label: 'Breath Amp',
                min: 0,
                max: 40,
                defaultValue: breathIntensity
              },
              {
                id: 'separation',
                type: 'slider',
                label: 'Separation',
                min: 0,
                max: 60,
                defaultValue: separationAmount
              },
              {
                id: 'globalScale',
                type: 'slider',
                label: 'Global Scale',
                min: 0,
                max: 100,
                defaultValue: globalScale
              },
              {
                id: 'globalTime',
                type: 'slider',
                label: 'Global Time',
                min: 0,
                max: 100,
                defaultValue: globalTime
              },
              {
                id: 'circles',
                type: 'slider',
                label: 'Circles',
                min: 1,
                max: 8,
                defaultValue: circleCount
              },
              {
                id: 'quantize',
                type: 'toggle-button',
                label: 'Quantize',
                toggleStates: ['OFF', 'ON']
              },
              {
                id: 'snap',
                type: 'button',
                label: 'Snap'
              },
              {
                id: 'hide',
                type: 'button',
                label: 'Hide'
              }
            ]}
            onControlChange={(id, value, toggleState) => {
              switch (id) {
                case 'intensity':
                  setMaxIntensity(value)
                  if (toggleState === 'A') {
                    setControlMode('relative')
                  } else if (toggleState === 'B') {
                    setControlMode('absolute')
                  }
                  break
                case 'frequency':
                  setMaxFrequency(value)
                  if (toggleState === 'A') {
                    setControlMode('relative')
                  } else if (toggleState === 'B') {
                    setControlMode('absolute')
                  }
                  break
                case 'breathTime':
                  setBreathDuration(value)
                  break
                case 'breathAmp':
                  setBreathIntensity(value)
                  break
                case 'separation':
                  setSeparationAmount(value)
                  break
                case 'globalScale':
                  setGlobalScale(value)
                  break
                case 'globalTime':
                  setGlobalTime(value)
                  break
                case 'circles':
                  setCircleCount(value)
                  break
                case 'quantize':
                  setQuantizeWaves(toggleState === 'ON')
                  break
                case 'snap':
                  setMaxIntensity(362)
                  setMaxFrequency(100)
                  setBreathDuration(5)
                  setBreathIntensity(40)
                  setSeparationAmount(16)
                  setGlobalScale(22)
                  setGlobalTime(100)
                  setCircleCount(1)
                  setControlMode('absolute')
                  break
                case 'hide':
                  setShowControls(false)
                  break
              }
            }}
          />
        </div>
      )}

    </div>
  )
}
