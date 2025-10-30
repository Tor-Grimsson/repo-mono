import { useState } from 'react'
import DesSection from './DesSection'
import DesCard from './DesCard'
import SurfacePreviewGrid from './SurfacePreviewGrid'
import { Slider, PlayPauseButton, Dropdown, Pill } from '@kol/ui'
import WorkControlsPanel from './WorkControlsPanel'

const breakpoints = [
  { id: 'mobile', label: 'Mobile', padding: '8px 24px', gap: '12px', playPauseSize: 28, sliderValue: 340, fontSize: '11px' },
  { id: 'tablet', label: 'Tablet', padding: '8px 24px', gap: '16px', playPauseSize: 32, sliderValue: 470, fontSize: '12px' },
  { id: 'desktop', label: 'Desktop', padding: '8px 24px', gap: '20px', playPauseSize: 40, sliderValue: 620, fontSize: '14px' }
]

export default function ControlsPanelsPreview() {
  // State for Play/Pause panels
  const [playStates, setPlayStates] = useState({
    mobile: false,
    tablet: false,
    desktop: false,
    'mobile-inverse': false,
    'tablet-inverse': false,
    'desktop-inverse': false
  })

  // State for Play/Pause slider values
  const [playPauseSliderValues, setPlayPauseSliderValues] = useState({
    'mobile-default': 340,
    'mobile-inverse': 340,
    'tablet-default': 470,
    'tablet-inverse': 470,
    'desktop-default': 620,
    'desktop-inverse': 620
  })

  // State for FontPreview controls
  const [fontPreviewState, setFontPreviewState] = useState({
    mobile: { weight: 'Black', size: 96, leading: 10, spacing: 0 },
    tablet: { weight: 'Black', size: 96, leading: 10, spacing: 0 },
    desktop: { weight: 'Black', size: 96, leading: 10, spacing: 0 }
  })

  // State for Work controls
  const [workControlsState, setWorkControlsState] = useState({
    mobile: {
      intensity: 75,
      frequency: 50,
      breathTime: 50,
      breathAmp: 50,
      separation: 50,
      globalScale: 75,
      globalTime: 50,
      circles: 8,
      quantize: true,
      hideControls: false
    },
    tablet: {
      intensity: 75,
      frequency: 50,
      breathTime: 50,
      breathAmp: 50,
      separation: 50,
      globalScale: 75,
      globalTime: 50,
      circles: 8,
      quantize: true,
      hideControls: false
    },
    desktop: {
      intensity: 75,
      frequency: 50,
      breathTime: 50,
      breathAmp: 50,
      separation: 50,
      globalScale: 75,
      globalTime: 50,
      circles: 8,
      quantize: true,
      hideControls: false
    }
  })

  const weightOptions = ['Thin', 'Extralight', 'Light', 'Regular', 'Medium', 'Semibold', 'Bold', 'Extrabold', 'Black'].map(label => ({
    label,
    value: label
  }))

  const togglePlayPause = (breakpoint) => {
    setPlayStates(prev => ({
      ...prev,
      [breakpoint]: !prev[breakpoint]
    }))
  }

  const updateFontPreview = (breakpoint, field, value) => {
    setFontPreviewState(prev => ({
      ...prev,
      [breakpoint]: {
        ...prev[breakpoint],
        [field]: value
      }
    }))
  }

  const updateWorkControls = (breakpoint, field, value) => {
    setWorkControlsState(prev => ({
      ...prev,
      [breakpoint]: {
        ...prev[breakpoint],
        [field]: value
      }
    }))
  }

  return (
    <div className="space-y-8">
      <DesSection
        name="Controls Panels"
        description="Interactive control panel molecules showing responsive layouts and component composition."
      />

      {/* 1. Play/Pause Slider Panel */}
      <div className="space-y-4">
        <DesCard
          name="Play/Pause Slider Panel"
          description="Variable font animation control with play/pause toggle and weight slider. Used in VariableFontDisplay molecule."
          details="Simple layout: PlayPauseButton + Slider with gap-4."
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="flex flex-col gap-6">
              {breakpoints.map((bp) => (
                <div key={bp.id} className="space-y-2">
                  <div className="kol-mono-xs opacity-60">{bp.label}</div>
                  {/* Play/Pause + Slider */}
                  <div className="flex items-center gap-4">
                    <PlayPauseButton
                      isPlaying={playStates[bp.id]}
                      onToggle={() => togglePlayPause(bp.id)}
                      size={bp.playPauseSize}
                    />
                    <Slider
                      min={300}
                      max={900}
                      value={playPauseSliderValues[`${bp.id}-default`]}
                      onChange={(value) => setPlayPauseSliderValues(prev => ({ ...prev, [`${bp.id}-default`]: value }))}
                      className="w-full"
                      variant="minimal"
                      fontSize={bp.fontSize}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="flex flex-col gap-6">
              {breakpoints.map((bp) => (
                <div key={bp.id} className="space-y-2">
                  <div className="kol-mono-xs opacity-60">{bp.label}</div>
                  {/* Play/Pause + Slider */}
                  <div className="flex items-center gap-4">
                    <PlayPauseButton
                      isPlaying={playStates[`${bp.id}-inverse`]}
                      onToggle={() => togglePlayPause(`${bp.id}-inverse`)}
                      size={bp.playPauseSize}
                    />
                    <Slider
                      min={300}
                      max={900}
                      value={playPauseSliderValues[`${bp.id}-inverse`]}
                      onChange={(value) => setPlayPauseSliderValues(prev => ({ ...prev, [`${bp.id}-inverse`]: value }))}
                      className="w-full"
                      variant="minimal"
                      fontSize={bp.fontSize}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* 2. FontPreviewItem Controls - Mobile */}
      <div className="space-y-4">
        <DesCard
          name="Font Preview Controls - Mobile"
          description="Compact font control panel for mobile viewports. Shows Weight dropdown and Size slider only."
          details="Used in FontPreviewItem organism. Leading and Spacing sliders hidden on mobile via fpsHideCompact class."
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="flex flex-col gap-6">
              {breakpoints.map((bp) => {
                const state = fontPreviewState[bp.id]
                return (
                  <div key={bp.id} className="space-y-2">
                    <div className="kol-mono-xs opacity-60">{bp.label}</div>
                    <div className="control-panel w-full" style={{ padding: bp.padding }}>
                      <div className="flex flex-col gap-3 w-full">
                        <div className="fpsMainWrapper pb-12">
                          {/* Weight Dropdown */}
                          <div className="fpsButtonsWrapper">
                            <Dropdown
                              options={weightOptions}
                              value={state.weight}
                              onChange={(value) => updateFontPreview(bp.id, 'weight', value)}
                              className="min-w-[140px]"
                              fontSize={bp.fontSize}
                            />
                          </div>

                          {/* Size Slider Only (mobile) */}
                          <div className="fpsSlidersWrapper pt-4">
                            <Slider
                              label="Size"
                              min={12}
                              max={300}
                              value={state.size}
                              onChange={(value) => updateFontPreview(bp.id, 'size', value)}
                              displayWidth={12}
                              className="w-full"
                              variant="minimal"
                              fontSize={bp.fontSize}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="flex flex-col gap-6">
              {breakpoints.map((bp) => {
                const state = fontPreviewState[bp.id]
                return (
                  <div key={bp.id} className="space-y-2">
                    <div className="kol-mono-xs opacity-60">{bp.label}</div>
                    <div className="control-panel w-full" style={{ padding: bp.padding }}>
                      <div className="flex flex-col gap-3 w-full">
                        <div className="fpsMainWrapper pb-12">
                          {/* Weight Dropdown */}
                          <div className="fpsButtonsWrapper">
                            <Dropdown
                              options={weightOptions}
                              value={state.weight}
                              onChange={(value) => updateFontPreview(bp.id, 'weight', value)}
                              className="min-w-[140px]"
                              fontSize={bp.fontSize}
                            />
                          </div>

                          {/* Size Slider Only (mobile) */}
                          <div className="fpsSlidersWrapper pt-4">
                            <Slider
                              label="Size"
                              min={12}
                              max={300}
                              value={state.size}
                              onChange={(value) => updateFontPreview(bp.id, 'size', value)}
                              displayWidth={12}
                              className="w-full"
                              variant="minimal"
                              fontSize={bp.fontSize}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* 3. FontPreviewItem Controls - Desktop */}
      <div className="space-y-4">
        <DesCard
          name="Font Preview Controls - Desktop"
          description="Full font control panel for desktop viewports. Shows Weight dropdown with all three sliders (Size, Leading, Spacing)."
          details="Used in FontPreviewItem organism. All sliders visible on desktop with fpsDesktopLayout class."
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <div className="flex flex-col gap-6">
              {breakpoints.map((bp) => {
                const state = fontPreviewState[bp.id]
                return (
                  <div key={bp.id} className="space-y-2">
                    <div className="kol-mono-xs opacity-60">{bp.label}</div>
                    <div
                      className="control-panel w-full"
                      style={{ padding: bp.padding }}
                    >
                      <div className="flex flex-col gap-3 w-full">
                        <div className="fpsMainWrapper pb-12 lg:pb-16 fpsDesktopLayout">
                          {/* Weight Dropdown */}
                          <div className="fpsButtonsWrapper">
                            <Dropdown
                              options={weightOptions}
                              value={state.weight}
                              onChange={(value) => updateFontPreview(bp.id, 'weight', value)}
                              className="min-w-[140px]"
                            />
                          </div>

                          {/* All Sliders (desktop) */}
                          <div className="fpsSlidersWrapper pt-4">
                            <Slider
                              label="Size"
                              min={12}
                              max={300}
                              value={state.size}
                              onChange={(value) => updateFontPreview(bp.id, 'size', value)}
                              displayWidth={12}
                              className="w-full"
                              variant="minimal"
                            />
                            <Slider
                              label="Leading"
                              min={0}
                              max={50}
                              value={state.leading}
                              onChange={(value) => updateFontPreview(bp.id, 'leading', value)}
                              className="w-full"
                              variant="minimal"
                            />
                            <Slider
                              label="Spacing"
                              min={-20}
                              max={20}
                              value={state.spacing}
                              onChange={(value) => updateFontPreview(bp.id, 'spacing', value)}
                              className="w-full"
                              variant="minimal"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <div className="flex flex-col gap-6">
              {breakpoints.map((bp) => {
                const state = fontPreviewState[bp.id]
                return (
                  <div key={bp.id} className="space-y-2">
                    <div className="kol-mono-xs opacity-60">{bp.label}</div>
                    <div
                      className="control-panel w-full"
                      style={{ padding: bp.padding }}
                    >
                      <div className="flex flex-col gap-3 w-full">
                        <div className="fpsMainWrapper pb-12 lg:pb-16 fpsDesktopLayout">
                          {/* Weight Dropdown */}
                          <div className="fpsButtonsWrapper">
                            <Dropdown
                              options={weightOptions}
                              value={state.weight}
                              onChange={(value) => updateFontPreview(bp.id, 'weight', value)}
                              className="min-w-[140px]"
                            />
                          </div>

                          {/* All Sliders (desktop) */}
                          <div className="fpsSlidersWrapper pt-4">
                            <Slider
                              label="Size"
                              min={12}
                              max={300}
                              value={state.size}
                              onChange={(value) => updateFontPreview(bp.id, 'size', value)}
                              displayWidth={12}
                              className="w-full"
                              variant="minimal"
                            />
                            <Slider
                              label="Leading"
                              min={0}
                              max={50}
                              value={state.leading}
                              onChange={(value) => updateFontPreview(bp.id, 'leading', value)}
                              className="w-full"
                              variant="minimal"
                            />
                            <Slider
                              label="Spacing"
                              min={-20}
                              max={20}
                              value={state.spacing}
                              onChange={(value) => updateFontPreview(bp.id, 'spacing', value)}
                              className="w-full"
                              variant="minimal"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      {/* 4. Work Controls Panel */}
      <div className="space-y-4">
        <DesCard
          name="Work Controls Panel"
          description="Complex control panel with 8 sliders. Used in Work page for animation controls."
          details="Responsive control panel showing as it appears in /work"
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface>
            <WorkControlsPanel />
          </SurfacePreviewGrid.Surface>

          <SurfacePreviewGrid.Surface inverse>
            <WorkControlsPanel />
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>
    </div>
  )
}
