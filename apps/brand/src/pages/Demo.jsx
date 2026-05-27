import { useEffect, useState } from 'react'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { ComposeStateProvider, useComposeState } from '../editor/compose/state'
import { ToolProvider } from '../editor/state/tools'
import {
  PanelTabs, StrokePanel, ColourPanel, SwatchesPanel, ColorModal,
  PanelTabsRef, StrokePanelRef, ColourPanelRef, SwatchesPanelRef,
} from '../editor/color'
import { SwatchStack } from '../editor/color/SwatchControls'

export default function Demo() {
  usePageTitle('Demo')

  const [tab, setTab]       = useState('Colour')
  const [tabRef, setTabRef] = useState('Colour')
  const [variant, setVariant] = useState('a')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'x' || e.key === 'X') {
        setVariant(v => v === 'a' ? 'b' : 'a')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="bg-fg-08 min-h-screen">
    <PageSection
      id="color-modal"
      label="Demo"
      title="Color modal"
      body="Top row is the pinned reference (macOS port — frozen). Bottom row is the working set — point at any panel and direct the change; I edit only that file."
    >
      <div className="mt-6 flex flex-col gap-10 items-start">

        <div style={{ width: 500, height: 300, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 100 }}>
          <CirclesA />
          <CirclesB />
        </div>

        <div style={{ width: 500, height: 300, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {variant === 'a' ? <CirclesA /> : <CirclesB />}
        </div>

        <div style={{ width: 500, height: 300, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SwatchStack
            fillColor="#FFFFFF"
            strokeColor="#000000"
            activePaint={variant === 'a' ? 'fill' : 'stroke'}
            onSwap={() => setVariant(v => v === 'a' ? 'b' : 'a')}
            onClear={() => {}}
          />
        </div>

        <div style={{ width: 500, height: 300, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 100 }}>
          <SwatchStack fillColor="#FFFFFF" strokeColor="#000000" activePaint="fill"   onSwap={() => {}} onClear={() => {}} />
          <SwatchStack fillColor="#FFFFFF" strokeColor="#000000" activePaint="stroke" onSwap={() => {}} onClear={() => {}} />
        </div>

        <div className="flex flex-col gap-4">
          <p className="kol-helper-10 text-meta uppercase tracking-widest">Reference</p>
          <PanelTabsRef active={tabRef} onChange={setTabRef} />
          <div className="flex flex-wrap gap-6 items-start">
            <Labelled n="1" name="Stroke"><StrokePanelRef /></Labelled>
            <Labelled n="2" name="Colour"><ColourPanelRef /></Labelled>
            <Labelled n="3" name="Swatches"><SwatchesPanelRef /></Labelled>
          </div>
        </div>

        <ToolProvider>
          <ComposeStateProvider>
            <div className="flex flex-col gap-4">
              <p className="kol-helper-10 text-meta uppercase tracking-widest">Working</p>
              <PanelTabs active={tab} onChange={setTab} />
              <div className="flex flex-wrap gap-6 items-start">
                <Labelled n="1" name="Stroke"><StrokePanel /></Labelled>
                <Labelled n="2" name="Colour"><ColourPanel /></Labelled>
                <Labelled n="3" name="Swatches"><SwatchesPanel /></Labelled>
                <Labelled n="4" name="Combined"><ColorModal /></Labelled>
              </div>
            </div>
          </ComposeStateProvider>
        </ToolProvider>

      </div>
    </PageSection>
    </div>
  )
}

function CirclesA() {
  return (
    <div style={{ position: 'relative', width: 45, height: 45 }}>
      <div style={{ position: 'absolute', top: 0,  left: 0,  width: 30, height: 30, borderRadius: '50%', background: 'black' }} />
      <div style={{ position: 'absolute', top: 15, left: 15, width: 30, height: 30, borderRadius: '50%', background: 'blue' }} />
    </div>
  )
}

function CirclesB() {
  return (
    <div style={{ position: 'relative', width: 45, height: 45 }}>
      <div style={{ position: 'absolute', top: 15, left: 15, width: 30, height: 30, borderRadius: '50%', background: 'blue' }} />
      <div style={{ position: 'absolute', top: 0,  left: 0,  width: 30, height: 30, borderRadius: '50%', background: 'black' }} />
    </div>
  )
}

function Labelled({ n, name, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="kol-helper-10 text-meta uppercase tracking-widest">{n}. {name}</p>
      {children}
    </div>
  )
}
