import { useState } from 'react'
import { SectionLabel, Slider } from '@kol/ui'
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

  return (
    <div className="h-dvh flex flex-col justify-between gap-2 pb-8 relative">
      <SectionLabel text="All work" className="mt-auto" />

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
        />
      </div>

      <h1 className="kol-heading-display">
        / projects
      </h1>

      {/* Controls Panel - Expands Up */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '0',
            zIndex: 100,
            minWidth: '320px'
          }}
          className="flex flex-col"
        >
          <div className="control-unified gap-3 shadow-none !border-none">
            <label
              className="whitespace-nowrap shrink-0 w-fit cursor-pointer"
              onClick={() => setControlMode(controlMode === 'relative' ? 'absolute' : 'relative')}
            >
              Intensity [{controlMode === 'relative' ? 'A' : 'B'}]
            </label>
            <input
              type="range"
              min={0}
              max={400}
              value={maxIntensity}
              onChange={(e) => setMaxIntensity(Number(e.target.value))}
              className="slider-black flex-1 w-full cursor-pointer"
            />
            <span className="text-right shrink-0 w-fit">
              {Math.round(maxIntensity)}
            </span>
          </div>
          <div className="control-unified gap-3 shadow-none !border-none">
            <label
              className="whitespace-nowrap shrink-0 w-fit cursor-pointer"
              onClick={() => setControlMode(controlMode === 'relative' ? 'absolute' : 'relative')}
            >
              Frequency [{controlMode === 'relative' ? 'A' : 'B'}]
            </label>
            <input
              type="range"
              min={10}
              max={200}
              value={maxFrequency}
              onChange={(e) => setMaxFrequency(Number(e.target.value))}
              className="slider-black flex-1 w-full cursor-pointer"
            />
            <span className="text-right shrink-0 w-fit">
              {Math.round(maxFrequency)}
            </span>
          </div>
          <Slider
            label="Breath Time"
            min={1}
            max={10}
            value={breathDuration}
            onChange={setBreathDuration}
            className="!border-none"
          />
          <Slider
            label="Breath Amp"
            min={0}
            max={40}
            value={breathIntensity}
            onChange={setBreathIntensity}
            className="!border-none"
          />
          <Slider
            label="Separation"
            min={0}
            max={60}
            value={separationAmount}
            onChange={setSeparationAmount}
            className="!border-none"
          />
          <Slider
            label="Global Scale"
            min={0}
            max={100}
            value={globalScale}
            onChange={setGlobalScale}
            className="!border-none"
          />
          <Slider
            label="Global Time"
            min={0}
            max={100}
            value={globalTime}
            onChange={setGlobalTime}
            className="!border-none"
          />
          <Slider
            label="Circles"
            min={1}
            max={8}
            value={circleCount}
            onChange={setCircleCount}
            className="!border-none"
          />

          {/* Snap Controls button */}
          <div
            onClick={() => {
              setMaxIntensity(362)
              setMaxFrequency(100)
              setBreathDuration(5)
              setBreathIntensity(40)
              setSeparationAmount(16)
              setGlobalScale(22)
              setGlobalTime(100)
              setCircleCount(1)
              setControlMode('absolute') // Switch to absolute mode
            }}
            className="control-unified gap-3 shadow-none justify-end cursor-pointer !border-none"
          >
            Snap Controls
          </div>

          {/* Hide Controls text button */}
          <div
            onClick={() => setShowControls(false)}
            className="control-unified gap-3 shadow-none justify-end cursor-pointer !border-none"
          >
            Hide Controls
          </div>
        </div>
      )}

      {/* Show Controls button when hidden */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '0',
            padding: '8px 16px',
            backgroundColor: 'var(--surface-inverse)',
            color: 'var(--foreground-inverse)',
            border: '1px solid var(--foreground)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'RightGroteskTightMono, monospace',
            fontSize: '12px',
            zIndex: 100
          }}
        >
          Show Controls
        </button>
      )}
    </div>
  )
}
