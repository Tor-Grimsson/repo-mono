import DesPage from '../../components/workshop/molecules/DesPage'
import FrequencyModulationPreview from '../../components/workshop/animations/FrequencyModulationPreview'

const ApparatusFrequencyModulator = () => {
  return (
    <div className="flex h-full flex-col space-y-10 px-4 pb-16 pt-10 sm:px-8 lg:px-12">
      <DesPage message="Frequency Modulator – Embedded controls for harmonic wave calibration." />
      <div className="relative flex-1 overflow-hidden rounded border border-fg-08 bg-surface-secondary/40">
        <FrequencyModulationPreview />
      </div>
    </div>
  )
}

export default ApparatusFrequencyModulator
