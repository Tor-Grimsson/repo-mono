import DesPage from '../../components/workshop/molecules/DesPage'
import FrequencyModulationPreview from '../../components/workshop/animations/FrequencyModulationPreview'

const ApparatusFrequencyModulator = () => {
  return (
    <div className="flex flex-col space-y-10 px-4 sm:px-8 lg:px-12" style={{ height: 'calc(100dvh - 64px)' }}>
      <DesPage message="Frequency Modulator – Embedded controls for harmonic wave calibration." />
      <div className="relative flex-1 overflow-hidden rounded border border-fg-08 bg-surface-secondary/40">
        <FrequencyModulationPreview />
      </div>
    </div>
  )
}

export default ApparatusFrequencyModulator
