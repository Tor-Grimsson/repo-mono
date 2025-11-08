import { useState } from 'react'
import { ControlPanel } from '@kol/ui'
import DialRotation from '../../sections/work/DialRotation'
import DesSection from '../molecules/DesSection'
import DesCard from '../molecules/DesCard'
import SurfacePreviewGrid from '../molecules/SurfacePreviewGrid'

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

  // Mock project data for the animation to work
  const mockProjects = [
    { title: 'Project Alpha', slug: { current: 'alpha' } },
    { title: 'Project Beta', slug: { current: 'beta' } },
    { title: 'Project Gamma', slug: { current: 'gamma' } }
  ]

  const renderAnimation = () => (
    <div className="relative w-full overflow-hidden" style={{ height: '80vh' }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateY(-100px)' }}>
        <div className="flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
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
        </div>
      </div>

      <div className="absolute bottom-4 right-4 w-full max-w-[400px] z-10 bg-auto rounded-lg p-4">
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
            }
          }}
        />
      </div>
    </div>
  )

  return (
    <>
      <DesSection
        name="Frequency Modulation [Controls]"
        description="Interactive multi-circle wave animation with real-time parameter controls for intensity, frequency, breathing, and separation."
      />
      <SurfacePreviewGrid>
        <SurfacePreviewGrid.Surface label="Default surface">
          {renderAnimation()}
        </SurfacePreviewGrid.Surface>
        <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
          {renderAnimation()}
        </SurfacePreviewGrid.Surface>
      </SurfacePreviewGrid>
    </>
  )
}
