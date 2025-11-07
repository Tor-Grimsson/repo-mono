import ChessBoardFullscreen from '../../components/styleguide/chess/apparatus/ChessBoardFullscreen'

const ChessHome = () => {
  return (
    <main className="relative h-dvh">
      <ChessBoardFullscreen
        wrapperClassName="h-full"
        boardProps={{
          size: 'desktop',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        }}
        sidebarProps={{
          size: 'desktop',
          variant: 'minimal',
          className: 'w-full h-full bg-fg-04 text-auto'
        }}
      />
    </main>
  )
}

export default ChessHome
