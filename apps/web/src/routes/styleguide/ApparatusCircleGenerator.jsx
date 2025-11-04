import WavyCircleEditor from '../../components/styleguide/apparatus/WavyCircleEditor'

const enhancementIdeas = [
  'Undo / redo stack for symmetric edits',
  'Keyboard shortcuts (space+drag to pan, Cmd/Ctrl+Z to undo, Cmd/Ctrl+C to copy path)',
  'Adaptive drag sensitivity tied to zoom level',
  'Visual cursor states for nodes vs. handles',
  'Live preview of exported SVG / path data',
  'Make zoom area draggable',
  'Inverse amplitude control'
]

const ApparatusCircleGenerator = () => (
  <div className="h-full w-full">
    <WavyCircleEditor enhancementIdeas={enhancementIdeas} />
  </div>
)

export default ApparatusCircleGenerator
