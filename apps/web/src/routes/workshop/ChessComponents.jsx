import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import ChessBoard from '../../components/workshop/chess/apparatus/ChessBoard'
import ChessAnalysisLayout from '../../components/workshop/chess/apparatus/ChessAnalysisLayout'
import AlternativeControlsMock from '../../components/workshop/chess/apparatus/AlternativeControlsMock'
import GameArchiveTable from '../../components/workshop/chess/apparatus/GameArchiveTable'
import { ChessControlsProvider } from '../../components/workshop/chess/context/ChessControlsContext'

const ChessComponents = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Chess Components"
        subtitle="Standalone apparatus modules for boards, controls, archives, and the full analysis layout."
        meta="Scope: Chess — Components"
      />

      <div className="flex flex-col gap-6">
        <DesCard
          name="Full Analysis Layout"
          description="Full chess analysis workflow combining GameArchiveTable and ChessAnalysisLayout."
        />
        <div className="bg-fg-02 border border-fg-08 rounded">
          <ChessAnalysisLayout />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <DesCard
          name="Chessboard + Controls"
          description="Desktop board paired with the control sidebar."
        />
        <div className="bg-fg-02 border border-fg-08 rounded p-6">
          <ChessControlsProvider>
            <div className="flex flex-row gap-8">
              <ChessBoard size="desktop" />
              <div className="w-[440px]">
                <AlternativeControlsMock />
              </div>
            </div>
          </ChessControlsProvider>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <DesCard
          name="Controls Sidebar"
          description="Standalone control stack with notation, palette, and playback controls."
        />
        <div className="bg-fg-02 border border-fg-08 rounded p-6 max-w-[440px]">
          <ChessControlsProvider>
            <AlternativeControlsMock />
          </ChessControlsProvider>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <DesCard
          name="Game Archive Table"
          description="Searchable table of games with filters and load buttons."
        />
        <div className="bg-fg-02 border border-fg-08 rounded p-6">
          <ChessControlsProvider>
            <GameArchiveTable onGameLoad={(game) => console.log('Game loaded:', game)} />
          </ChessControlsProvider>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <DesCard
          name="Baseline Board"
          description="Core renderer showing starting position across three breakpoints."
        />
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="kol-helper-sm text-foreground-muted mb-3">Mobile (384px)</h3>
            <ChessBoard size="mobile" />
          </div>
          <div>
            <h3 className="kol-helper-sm text-foreground-muted mb-3">Tablet (520px)</h3>
            <ChessBoard size="tablet" />
          </div>
          <div>
            <h3 className="kol-helper-sm text-foreground-muted mb-3">Desktop (760px)</h3>
            <ChessBoard size="desktop" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <DesCard
          name="Empty Board Template"
          description="Board template with grid + coordinates and no pieces."
        />
        <ChessBoard showPieces={false} />
      </div>
    </div>
  )
}

export default ChessComponents
