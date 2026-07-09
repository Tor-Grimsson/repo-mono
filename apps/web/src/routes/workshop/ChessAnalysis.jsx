import { PageSection } from '@kolkrabbi/kol-framework'
import { ChessAnalysisLayout } from '@kolkrabbi/kol-component/chess'
import * as chessData from '@kol/chess-data'

const ChessAnalysis = () => {
  return (
    <div>
      <PageSection
        id="chess-analysis"
        label="Scope: Interactive board playback, control surface, analysis tooling."
        title="Chess Analysis"
        body="Review recent games, scrub through moves, and explore evaluation states."
      />

      <PageSection id="analysis-board">
        <ChessAnalysisLayout chessData={chessData} />
      </PageSection>
    </div>
  )
}

export default ChessAnalysis
