import DesPage from '../../components/workshop/molecules/DesPage'
import ChessAnalysisLayout from '../../components/workshop/chess/apparatus/ChessAnalysisLayout'
import '@kol/ui/css/chess.css'

const ChessAnalysis = () => {
  return (
    <div className="space-y-12">
      <DesPage
        title="Chess Analysis"
        subtitle="Review recent games, scrub through moves, and explore evaluation states."
        meta="Scope: Interactive board playback, control surface, analysis tooling."
      />

      <ChessAnalysisLayout />
    </div>
  )
}

export default ChessAnalysis
