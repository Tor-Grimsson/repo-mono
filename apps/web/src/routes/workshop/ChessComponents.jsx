import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesCard from '../../components/workshop/molecules/DesCard'
import ChessBoard from '../../components/workshop/chess/apparatus/ChessBoard'
import ChessAnalysisLayout from '../../components/workshop/chess/apparatus/ChessAnalysisLayout'
import AlternativeControlsMock from '../../components/workshop/chess/apparatus/AlternativeControlsMock'
import GameArchiveTable from '../../components/workshop/chess/apparatus/GameArchiveTable'
import { ChessControlsProvider } from '../../components/workshop/chess/context/ChessControlsContext'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/workshop/WorkshopExpansionContext'

const sections = [
  { id: 'full-analysis', label: 'Full Analysis Layout' },
  { id: 'board-controls', label: 'Chessboard + Controls' },
  { id: 'controls-sidebar', label: 'Controls Sidebar' },
  { id: 'game-archive', label: 'Game Archive Table' },
  { id: 'baseline-board', label: 'Baseline Board' },
  { id: 'empty-board', label: 'Empty Board Template' }
]

const CHESS_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const ChessComponents = () => {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('chess-components', CHESS_SECTION_DEFAULTS)
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent sections={sections} />)
    return () => setTocContent(null)
  }, [setTocContent])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-10">
      <DesPage
        title="Chess Components"
        subtitle="Standalone apparatus modules for boards, controls, archives, and the full analysis layout."
      />

      <div className="space-y-8">
        {/* Full Analysis Layout */}
        <div id="full-analysis" className="space-y-4">
          <SectionToggle
            label="Full Analysis Layout"
            isExpanded={expandedSections['full-analysis']}
            onToggle={() => toggleSection('full-analysis')}
          />
          {expandedSections['full-analysis'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Full Analysis Layout"
                description="Full chess analysis workflow combining GameArchiveTable and ChessAnalysisLayout."
              />
              <ChessAnalysisLayout />
            </div>
          )}
        </div>

        {/* Chessboard + Controls */}
        <div id="board-controls" className="space-y-4">
          <SectionToggle
            label="Chessboard + Controls"
            isExpanded={expandedSections['board-controls']}
            onToggle={() => toggleSection('board-controls')}
          />
          {expandedSections['board-controls'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Chessboard + Controls"
                description="Desktop board paired with the control sidebar."
              />
              <ChessControlsProvider>
                <div className="flex flex-row gap-8">
                  <ChessBoard size="desktop" />
                  <div className="w-[440px]">
                    <AlternativeControlsMock />
                  </div>
                </div>
              </ChessControlsProvider>
            </div>
          )}
        </div>

        {/* Controls Sidebar */}
        <div id="controls-sidebar" className="space-y-4">
          <SectionToggle
            label="Controls Sidebar"
            isExpanded={expandedSections['controls-sidebar']}
            onToggle={() => toggleSection('controls-sidebar')}
          />
          {expandedSections['controls-sidebar'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Controls Sidebar"
                description="Standalone control stack with notation, palette, and playback controls."
              />
              <div className="max-w-[440px]">
                <ChessControlsProvider>
                  <AlternativeControlsMock />
                </ChessControlsProvider>
              </div>
            </div>
          )}
        </div>

        {/* Game Archive Table */}
        <div id="game-archive" className="space-y-4">
          <SectionToggle
            label="Game Archive Table"
            isExpanded={expandedSections['game-archive']}
            onToggle={() => toggleSection('game-archive')}
          />
          {expandedSections['game-archive'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Game Archive Table"
                description="Searchable table of games with filters and load buttons."
              />
              <ChessControlsProvider>
                <GameArchiveTable onGameLoad={(game) => console.log('Game loaded:', game)} />
              </ChessControlsProvider>
            </div>
          )}
        </div>

        {/* Baseline Board */}
        <div id="baseline-board" className="space-y-4">
          <SectionToggle
            label="Baseline Board"
            isExpanded={expandedSections['baseline-board']}
            onToggle={() => toggleSection('baseline-board')}
          />
          {expandedSections['baseline-board'] && (
            <div className="space-y-4 pt-2">
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
          )}
        </div>

        {/* Empty Board Template */}
        <div id="empty-board" className="space-y-4">
          <SectionToggle
            label="Empty Board Template"
            isExpanded={expandedSections['empty-board']}
            onToggle={() => toggleSection('empty-board')}
          />
          {expandedSections['empty-board'] && (
            <div className="space-y-4 pt-2">
              <DesCard
                name="Empty Board Template"
                description="Board template with grid + coordinates and no pieces."
              />
              <ChessBoard showPieces={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChessComponents
