import { useState } from 'react'
import TitlePageCard from './cards/TitlePageCard'
import AmpersandCard from './cards/AmpersandCard'
import LongSCard from './cards/LongSCard'
import WordListDualCard from './cards/WordListDualCard'
import AaSpecimenCard from './cards/AaSpecimenCard'
import WordListStackedCard from './cards/WordListStackedCard'
import DynkurCard from './cards/DynkurCard'
import SpecialCharactersCard from './cards/SpecialCharactersCard'
import SlarkCard from './cards/SlarkCard'
import PoetryCard from './cards/PoetryCard'
import LigaturesCard from './cards/LigaturesCard'
import ExtendedWordListCard from './cards/ExtendedWordListCard'
import SignageCard from './cards/SignageCard'
import WordBrokenCard from './cards/WordBrokenCard'
import OrganicShapesCard from './cards/OrganicShapesCard'
import WordListDark2Card from './cards/WordListDark2Card'
import AlphabetDualCard from './cards/AlphabetDualCard'
import PoemPage1Card from './cards/PoemPage1Card'
import CharacterSetCard from './cards/CharacterSetCard'
import PoemPage2Card from './cards/PoemPage2Card'
import FinalTitleCard from './cards/FinalTitleCard'

export default function GullhamrarSelection() {
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
      <AmpersandCard columns={columns} gutter={gutter} marginX={marginX} />
      <LongSCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListDualCard columns={columns} gutter={gutter} marginX={marginX} />
      <AaSpecimenCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListStackedCard columns={columns} gutter={gutter} marginX={marginX} />
      <DynkurCard columns={columns} gutter={gutter} marginX={marginX} />
      <SpecialCharactersCard columns={columns} gutter={gutter} marginX={marginX} />
      <SlarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordBrokenCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoetryCard columns={columns} gutter={gutter} marginX={marginX} />
      <LigaturesCard columns={columns} gutter={gutter} marginX={marginX} />
      <ExtendedWordListCard columns={columns} gutter={gutter} marginX={marginX} />
      <OrganicShapesCard columns={columns} gutter={gutter} marginX={marginX} />
      <SignageCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListDark2Card columns={columns} gutter={gutter} marginX={marginX} />
      <AlphabetDualCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage1Card columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage2Card columns={columns} gutter={gutter} marginX={marginX} />
      <CharacterSetCard columns={columns} gutter={gutter} marginX={marginX} />
      <FinalTitleCard columns={columns} gutter={gutter} marginX={marginX} />
    </div>
  )
}
