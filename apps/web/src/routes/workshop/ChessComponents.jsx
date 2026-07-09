import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '../../components/shell'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import DesCard from '../../components/workshop/molecules/DesCard'
import {
  ChessBoard,
  ChessAnalysisLayout,
  AlternativeControlsMock,
  GameArchiveTable,
  ChessControlsProvider
} from '@kolkrabbi/kol-component/chess'
import * as chessData from '@kol/chess-data'
import { PageSection } from '@kolkrabbi/kol-framework'

const ChessComponents = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="chess-components"
        label="Chess"
        title="Chess Components"
        body="Standalone apparatus modules for boards, controls, archives, and the full analysis layout."
      />

      <PageSection id="full-analysis" label="Chess Components" title="Full Analysis Layout">
        <div className="mt-8 space-y-6">
          <DesCard
            name="Full Analysis Layout"
            description="Full chess analysis workflow combining GameArchiveTable and ChessAnalysisLayout."
          />
          <ChessAnalysisLayout chessData={chessData} />
        </div>
      </PageSection>

      <PageSection id="board-controls" label="Chess Components" title="Chessboard + Controls">
        <div className="mt-8 space-y-6">
          <DesCard
            name="Chessboard + Controls"
            description="Desktop board paired with the control sidebar."
          />
          <ChessControlsProvider chessData={chessData}>
            <div className="flex flex-row gap-8">
              <ChessBoard size="desktop" />
              <div className="w-[440px]">
                <AlternativeControlsMock />
              </div>
            </div>
          </ChessControlsProvider>
        </div>
      </PageSection>

      <PageSection id="controls-sidebar" label="Chess Components" title="Controls Sidebar">
        <div className="mt-8 space-y-6">
          <DesCard
            name="Controls Sidebar"
            description="Standalone control stack with notation, palette, and playback controls."
          />
          <div className="max-w-[440px]">
            <ChessControlsProvider chessData={chessData}>
              <AlternativeControlsMock />
            </ChessControlsProvider>
          </div>
        </div>
      </PageSection>

      <PageSection id="game-archive" label="Chess Components" title="Game Archive Table">
        <div className="mt-8 space-y-6">
          <DesCard
            name="Game Archive Table"
            description="Searchable table of games with filters and load buttons."
          />
          <ChessControlsProvider chessData={chessData}>
            <GameArchiveTable chessData={chessData} onGameLoad={(game) => console.log('Game loaded:', game)} />
          </ChessControlsProvider>
        </div>
      </PageSection>

      <PageSection id="baseline-board" label="Chess Components" title="Baseline Board">
        <div className="mt-8 space-y-6">
          <DesCard
            name="Baseline Board"
            description="Core renderer showing starting position across three breakpoints."
          />
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="kol-mono-xs text-fg-48 mb-3">Mobile (384px)</h3>
              <ChessBoard size="mobile" />
            </div>
            <div>
              <h3 className="kol-mono-xs text-fg-48 mb-3">Tablet (520px)</h3>
              <ChessBoard size="tablet" />
            </div>
            <div>
              <h3 className="kol-mono-xs text-fg-48 mb-3">Desktop (760px)</h3>
              <ChessBoard size="desktop" />
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="empty-board" label="Chess Components" title="Empty Board Template">
        <div className="mt-8 space-y-6">
          <DesCard
            name="Empty Board Template"
            description="Board template with grid + coordinates and no pieces."
          />
          <ChessBoard showPieces={false} />
        </div>
      </PageSection>
    </div>
  )
}

export default ChessComponents
