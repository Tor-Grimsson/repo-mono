import { useState } from 'react'
import { ControlPanel, ControlButton } from '@kol/ui'
import DialRotation from '../../sections/work/DialRotation'

export default function FrequencyModulationPreview() {
  const [maxIntensity, setMaxIntensity] = useState(200)
  const [maxFrequency, setMaxFrequency] = useState(100)
  const [breathDuration, setBreathDuration] = useState(3)
  const [breathIntensity, setBreathIntensity] = useState(10)
  const [separationAmount, setSeparationAmount] = useState(16)
  const [globalScale, setGlobalScale] = useState(50)
  const [globalTime, setGlobalTime] = useState(100)
  const [circleCount, setCircleCount] = useState(4)
  const [controlMode, setControlMode] = useState('relative')
  const [quantizeWaves, setQuantizeWaves] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // Mock project data for the animation to work
  const mockProjects = [
    { title: 'Project Alpha', slug: { current: 'alpha' } },
    { title: 'Project Beta', slug: { current: 'beta' } },
    { title: 'Project Gamma', slug: { current: 'gamma' } }
  ]

  return (
    <div className="relative flex h-full w-full min-h-[520px] items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        {hasStarted ? (
          <DialRotation
            projects={mockProjects}
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
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded bg-surface-primary/60 text-fg-48">
            <p className="kol-helper text-center text-fg-64">
              Frequency Modulator is idle. Start the apparatus to engage harmonic controls.
            </p>
          </div>
        )}
      </div>

      {!hasStarted && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-surface-primary/80 text-center backdrop-blur">
          <p className="kol-helper text-fg-64">Prime the instrument before adjusting controls.</p>
          <ControlButton onClick={() => setHasStarted(true)}>Start Modulator</ControlButton>
        </div>
      )}

      {hasStarted && showControls ? (
        <div
          className="pointer-events-auto absolute z-10 flex flex-col md:min-w-[320px] lg:max-w-[400px]"
          style={{
            bottom: '48px',
            right: '48px'
          }}
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
      ) : (
        hasStarted && (
          <ControlButton
            onClick={() => setShowControls(true)}
            style={{
              position: 'absolute',
              bottom: '48px',
              right: '48px',
              zIndex: 10
            }}
          >
            Show Controls
          </ControlButton>
        )
      )}
    </div>
  )
}
