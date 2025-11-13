import { useState } from 'react'
import TitlePageCard from './cards/TitlePageCard'
import WordGridBadgesCard from './cards/WordGridBadgesCard'
import WordListDarkCard from './cards/WordListDarkCard'
import AmpersandCard from './cards/AmpersandCard'
import AaSpecimenCard from './cards/AaSpecimenCard'
import WordListStackedCard from './cards/WordListStackedCard'
import DynkurCard from './cards/DynkurCard'
import SlarkCard from './cards/SlarkCard'
import LigatureCard from './cards/LigatureCard'
import KarpBusinessCard from './cards/KarpBusinessCard'
import WordBrokenCard from './cards/WordBrokenCard'
import UppercaseAlphabetCard from './cards/UppercaseAlphabetCard'
import LowercaseAlphabetCard from './cards/LowercaseAlphabetCard'
import RaftjanCard from './cards/RaftjanCard'
import PoemPage1Card from './cards/PoemPage1Card'
import GridLayoutLightCard from './cards/GridLayoutLightCard'
import PoemPage2Card from './cards/PoemPage2Card'
import GridLayoutDarkCard from './cards/GridLayoutDarkCard'
import PoemPage3Card from './cards/PoemPage3Card'
import IcelandicCharSetCard from './cards/IcelandicCharSetCard'
import PoemPage1DarkCard from './cards/PoemPage1DarkCard'
import FladurTitleCard from './cards/FladurTitleCard'
import GridLigaturesCard from './cards/GridLigaturesCard'

export default function DylgjurSelection() {
  const [showGrid, setShowGrid] = useState(true)
  const columns = 12
  const gutter = 24
  const marginX = 48
  const baselineGrid = 24

  return (
    <div className="w-full min-h-screen relative">
      {/* Grid Toggle Button */}
      <button
        onClick={() => setShowGrid(!showGrid)}
        className="fixed top-8 right-8 z-50 px-6 py-3 bg-black text-white text-sm font-['TGMalromur'] uppercase tracking-wider hover:bg-black/80 transition-colors"
      >
        {showGrid ? 'Hide Grid' : 'Show Grid'}
      </button>

      {/* Column Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-40" style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
          <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gutter}px` }}>
            {[...Array(columns)].map((_, i) => (
              <div key={i} className="bg-blue-500/5 border-l border-r border-blue-500/20"></div>
            ))}
          </div>
        </div>
      )}

      {/* Baseline Grid Overlay - 24px with faint 8px subdivisions */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-40" style={{
          backgroundImage: `
            repeating-linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 0px, rgba(239, 68, 68, 0.1) 1px, transparent 1px, transparent ${baselineGrid}px),
            repeating-linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 0px, rgba(200, 200, 200, 0.2) 1px, transparent 1px, transparent 8px)
          `
        }}></div>
      )}

      {/* Cards */}
      <TitlePageCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordGridBadgesCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListDarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <AmpersandCard columns={columns} gutter={gutter} marginX={marginX} />
      <AaSpecimenCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListStackedCard columns={columns} gutter={gutter} marginX={marginX} />
      <DynkurCard columns={columns} gutter={gutter} marginX={marginX} />
      <SlarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <LigatureCard columns={columns} gutter={gutter} marginX={marginX} />
      <KarpBusinessCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordBrokenCard columns={columns} gutter={gutter} marginX={marginX} />
      <UppercaseAlphabetCard columns={columns} gutter={gutter} marginX={marginX} />
      <LowercaseAlphabetCard columns={columns} gutter={gutter} marginX={marginX} />
      <RaftjanCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage1Card columns={columns} gutter={gutter} marginX={marginX} />
      <GridLayoutLightCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage2Card columns={columns} gutter={gutter} marginX={marginX} />
      <GridLayoutDarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage3Card columns={columns} gutter={gutter} marginX={marginX} />
      <IcelandicCharSetCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage1DarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <FladurTitleCard columns={columns} gutter={gutter} marginX={marginX} />
      <GridLigaturesCard columns={columns} gutter={gutter} marginX={marginX} />
    </div>
  )
}
