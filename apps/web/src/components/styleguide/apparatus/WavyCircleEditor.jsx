import WavyCircleCanvas from './WavyCircleCanvas'
import WavyCircleControls from './WavyCircleControls'
import { useWavyCircleEditor } from './useWavyCircleEditor'

const WavyCircleEditor = ({ enhancementIdeas = [] }) => {
  const {
    params,
    ui,
    nodes,
    pathData,
    stats,
    svgRef,
    handleParamChange,
    handleUiToggle,
    handleMouseDown,
    handleMouseMove,
    resetDrag,
    exportSvg,
    copyPath
  } = useWavyCircleEditor()

  return (
   <div className="flex w-full min-h-dvh flex-col overflow-hidden text-auto lg:flex-row">
      <WavyCircleControls
        params={params}
        ui={ui}
        stats={stats}
        enhancementIdeas={enhancementIdeas}
        onParamChange={handleParamChange}
        onUiToggle={handleUiToggle}
        onExportSvg={exportSvg}
        onCopyPath={copyPath}
      />
    <div className="flex w-full min-h-dvh">
      <WavyCircleCanvas
        svgRef={svgRef}
        params={params}
        ui={ui}
        nodes={nodes}
        pathData={pathData}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={resetDrag}
        onMouseLeave={resetDrag}
      />
    </div>
   </div>
  )
}

export default WavyCircleEditor
