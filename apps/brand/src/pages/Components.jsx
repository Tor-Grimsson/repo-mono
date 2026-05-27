import { useState } from 'react'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { Button } from '@kol/component'
import { Input } from '@kol/component'
import Stepper from '../components/atoms/Stepper'
import Textarea from '../components/atoms/Textarea'
import TransparentX from '../components/atoms/TransparentX'
import ColorSwatch from '../components/atoms/ColorSwatch'
import { Slider } from '@kol/component'
import { ToggleSwitch } from '@kol/component'
import { ToggleCheckbox } from '@kol/component'
import { ToggleBracket } from '@kol/component'
import ViewToggle from '../components/molecules/ViewToggle'
import PropertyInput from '../components/molecules/PropertyInput'
import LabeledControl from '../components/molecules/LabeledControl'
import { Pill } from '@kol/component'
import { Tag } from '@kol/component'
import { Badge } from '@kol/component'
import ThemeToggle from '../components/framework/ThemeToggle'
import { ATOMS, MOLECULES, NAVIGATION_MOLECULES, ORGANISMS } from '../data/components'

const VARIANTS = ['primary', 'secondary', 'accent', 'outline']
const SIZES    = ['sm', 'md', 'lg']

/* Look up a component entry by name across all tier inventories. */
const COMPONENT_INDEX = [...ATOMS, ...MOLECULES, ...NAVIGATION_MOLECULES, ...ORGANISMS]
const findComponent = (name) => COMPONENT_INDEX.find(c => c.name === name)

/**
 * ComponentMeta — small file/css badge for /components subsections. Looks up the
 * component by name in src/data/components.js. Renders inline mono
 * code chips for the JSX path + (optional) CSS path.
 */
function ComponentMeta({ name, names }) {
  const list = names ?? (name ? [name] : [])
  const entries = list.map(findComponent).filter(Boolean)
  if (entries.length === 0) return null
  return (
    <div className="flex flex-col gap-1 mt-3">
      {entries.map(entry => (
        <div key={entry.name} className="flex flex-wrap items-center gap-2 kol-helper-10 text-meta">
          <span className="text-emphasis uppercase tracking-widest">{entry.name}</span>
          <span className="text-subtle">·</span>
          <code className="kol-helper-10 text-meta normal-case tracking-normal">{entry.file}</code>
          {entry.css && (
            <>
              <span className="text-subtle">·</span>
              <code className="kol-helper-10 text-meta normal-case tracking-normal">{entry.css}</code>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

function Cell({ label, children }) {
  return (
    <div className="flex flex-col items-start gap-3 p-5">
      <span className="text-fg-60 text-[11px] uppercase tracking-widest font-mono">{label}</span>
      <div className="flex items-center gap-6 flex-wrap">{children}</div>
    </div>
  )
}

function ToggleShowcase() {
  const [sw1, setSw1] = useState(false)
  const [sw2, setSw2] = useState(true)
  const [cb1, setCb1] = useState(false)
  const [cb2, setCb2] = useState(true)
  const [br1, setBr1] = useState(false)
  const [br2, setBr2] = useState(true)
  const [brP, setBrP] = useState(true)
  const [view, setView] = useState('grid')

  return (
    <div className="flex flex-col gap-12 mt-12">

      <ComponentMeta names={['ToggleSwitch', 'ToggleCheckbox', 'ToggleBracket', 'ViewToggle', 'ThemeToggle']} />

      {/* ── Atoms · ToggleSwitch ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Atoms · ToggleSwitch</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            On-state: <code>bg-fg-04</code> pill + white slidey indicator —
            matches Button primary's quiet daily-chrome look. Plain variant
            drops the bordered shell for compact contexts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <ToggleSwitch label="Off state" checked={sw1} onChange={setSw1} />
          <ToggleSwitch label="On state"  checked={sw2} onChange={setSw2} />
          <ToggleSwitch label="Off · plain" checked={sw1} onChange={setSw1} variant="plain" />
          <ToggleSwitch label="On · plain"  checked={sw2} onChange={setSw2} variant="plain" />
        </div>
      </div>

      {/* ── Atoms · ToggleCheckbox ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Atoms · ToggleCheckbox</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Active state: <code>bg-fg-04</code> + white check stroke. Same
            quiet-chrome treatment as ToggleSwitch.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <ToggleCheckbox label="Off state" checked={cb1} onChange={setCb1} />
          <ToggleCheckbox label="On state"  checked={cb2} onChange={setCb2} />
        </div>
      </div>

      {/* ── Molecules · ToggleBracket ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Molecules · ToggleBracket</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            On-state stays accent-yellow for identity (it's a more prominent
            toggle than the small switch / checkbox). Text flips to
            <code> --kol-accent-on-primary</code> (navy) for contrast against
            the yellow fill.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <ToggleBracket label="Default off"  value={br1} onToggle={setBr1} />
          <ToggleBracket label="Default on"   value={br2} onToggle={setBr2} />
          <ToggleBracket label="Plain variant" value={brP} onToggle={setBrP} variant="plain" />
        </div>
      </div>

      {/* ── Molecules · ViewToggle ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Molecules · ViewToggle</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Segmented control. Text variant: active uses
            <code> kol-control--filled</code>; inactive is bare text-meta with
            text-emphasis on hover (no border-reveal). Icon variant: bordered
            chip-container with inset "well" pattern.
          </p>
          <p>
            Works for binary on/off too — pass two options. The whole
            generator surface migrated from inline aria-pressed buttons to
            this 2-option form 2026-05-01.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-6">
          <ViewToggle viewMode={view} onViewChange={setView} />
          <ViewToggle viewMode={view} onViewChange={setView} variant="icon" />
          <ViewToggle
            options={[{ value: 'off', label: 'Off' }, { value: 'on', label: 'On' }]}
            viewMode={sw1 ? 'on' : 'off'}
            onViewChange={(v) => setSw1(v === 'on')}
          />
        </div>
      </div>

      {/* ── Navigation · ThemeToggle ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Navigation · ThemeToggle</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Two variants. <code>icon</code> — minimal 32×32 button for
            top-bar use. <code>hop</code> — full-width Button-primary-styled
            row for sidenav, with collapse-aware label hiding via
            <code> .kol-sidenav-hop</code>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-6">
          <ThemeToggle variant="icon" />
          <div className="w-[260px]">
            <ThemeToggle variant="hop" />
          </div>
        </div>
      </div>

    </div>
  )
}

function ControlSystemShowcase() {
  const [filled, setFilled] = useState('Editable value')
  const [ghost, setGhost]   = useState('FFCF33')
  const [hex, setHex]       = useState('AD5038')
  const [pct, setPct]       = useState(48)
  const [stepSm, setStepSm] = useState(8)
  const [stepMd, setStepMd] = useState(16)
  const [stepLg, setStepLg] = useState(24)
  const [x, setX]           = useState(707)
  const [y, setY]           = useState(499)
  const [w, setW]           = useState(251)
  const [h, setH]           = useState(202)
  const [rot, setRot]       = useState(0)

  return (
    <div className="flex flex-col gap-12 mt-12">

      <ComponentMeta names={['Input', 'Stepper', 'Textarea', 'PropertyInput']} />

      {/* ── Shell primer — bare divs styled with .kol-control + variants ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Shell — three variants × three sizes</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Every chromed control composes from <code>.kol-control</code> +
            a variant + a size + a paired type class. Atoms (Input, Stepper,
            etc.) wrap their inner markup in a shell instead of reinventing
            bg/border/padding.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6 max-w-2xl">
          <div className="kol-control kol-control--filled  kol-control-md kol-mono-14">filled</div>
          <div className="kol-control kol-control--ghost   kol-control-md kol-mono-14">ghost</div>
          <div className="kol-control kol-control--outline kol-control-md kol-mono-14">outline</div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3 max-w-2xl">
          <div className="kol-control kol-control--filled kol-control-sm kol-mono-12">sm · mono-12</div>
          <div className="kol-control kol-control--filled kol-control-md kol-mono-14">md · mono-14</div>
          <div className="kol-control kol-control--filled kol-control-lg kol-mono-16">lg · mono-16</div>
        </div>
      </div>

      {/* ── Input atom — filled variant ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Input atom · filled (default)</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Persistent chrome. Prefix / suffix props render at <code>text-meta</code>
            inside the shell — aria-hidden because they're affordances (#, %), not labels.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Input value={filled} onChange={(e) => setFilled(e.target.value)} />
          <Input prefix="#" value={hex} onChange={(e) => setHex(e.target.value)} uppercase chars={6} />
          <Input type="number" suffix="%" value={pct} onChange={(e) => setPct(Number(e.target.value))} chars={3} />
          <Input value="disabled" onChange={() => {}} disabled />
        </div>
      </div>

      {/* ── Input atom — ghost / outline ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Input atom · ghost & outline</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            <strong>Ghost</strong> — inline editable values that disappear
            into context until reached for. Border reveals on hover / focus.
          </p>
          <p>
            <strong>Outline</strong> — same border, persistent. For always-
            visible bordered controls, or as the "is-edited" / "active"
            state of a ghost field (just swap the variant).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Input variant="ghost"   value={ghost} onChange={(e) => setGhost(e.target.value)} prefix="#" uppercase chars={6} />
          <Input variant="outline" value={ghost} onChange={(e) => setGhost(e.target.value)} prefix="#" uppercase chars={6} />
          <span className="kol-helper-10 text-subtle">← ghost · outline (active / edited state)</span>
        </div>
      </div>

      {/* ── Stepper atom — three sizes ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Stepper atom · sm / md / lg</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Number input + chevron buttons. For inspector position / size /
            rotation fields where click-to-bump is wanted alongside typing.
            Native browser spinners suppressed via <code>.hide-number-spinners</code>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Stepper size="sm" value={stepSm} onChange={(e) => setStepSm(Number(e.target.value))} min={0} max={100} style={{ width: 120 }} />
          <Stepper size="md" value={stepMd} onChange={(e) => setStepMd(Number(e.target.value))} min={0} max={100} style={{ width: 140 }} />
          <Stepper size="lg" value={stepLg} onChange={(e) => setStepLg(Number(e.target.value))} min={0} max={100} style={{ width: 160 }} />
        </div>
      </div>

      {/* ── Textarea atom — multi-line on the same shell ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Textarea atom · multi-line on .kol-control</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Same shell as Input + a <code>--textarea</code> modifier that
            flips display to block. Default <code>rows=3</code> — long
            content gets scrollbars rather than dominating the panel. Custom
            resize-corner icon in the bottom-right (kol/resize-corner via
            the loader); native webkit resizer is suppressed.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-6 max-w-3xl">
          <Textarea variant="filled"  size="sm" placeholder="filled · sm" />
          <Textarea variant="ghost"   size="sm" placeholder="ghost · sm" />
          <Textarea variant="outline" size="sm" placeholder="outline · sm" />
        </div>
      </div>

      {/* ── PropertyInput molecule — kol-editor InspectorPanel pattern ── */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">PropertyInput molecule · transform inspector grid</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Composes Label + (Stepper for numbers / Input for everything else).
            Drop into a <code>grid grid-cols-2 gap-4</code> for an x/y/width/height/rotation panel.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 max-w-md">
          <PropertyInput label="X"        type="number" value={x}   onChange={(e) => setX(Number(e.target.value))}   step={5} />
          <PropertyInput label="Y"        type="number" value={y}   onChange={(e) => setY(Number(e.target.value))}   step={5} />
          <PropertyInput label="WIDTH"    type="number" value={w}   onChange={(e) => setW(Number(e.target.value))}   step={5} />
          <PropertyInput label="HEIGHT"   type="number" value={h}   onChange={(e) => setH(Number(e.target.value))}   step={5} />
          <PropertyInput label="ROTATION" type="number" value={rot} onChange={(e) => setRot(Number(e.target.value))} step={1} />
        </div>
      </div>
    </div>
  )
}

function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-12 mt-12">

      <ComponentMeta name="Button" />

      {/* Variants × sizes */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Variants × sizes</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Four variants share the same padding scale as <code>.kol-control</code>
            (sm 4/12 · md 6/16 · lg 8/20). Heavier-background variants
            (secondary, accent) use font-weight 500 for ink punch; primary
            and outline stay at the kol-mono default 400.
          </p>
        </div>
        <div
          className="grid gap-x-4 gap-y-3 mt-6 items-center"
          style={{ gridTemplateColumns: '6rem repeat(3, max-content)' }}
        >
          {VARIANTS.map(v => (
            <div key={v} className="contents">
              <span className="kol-helper-10 uppercase tracking-widest text-meta">{v}</span>
              {SIZES.map(s => (
                <div key={s} className="justify-self-start">
                  <Button variant={v} size={s}>
                    {v.charAt(0).toUpperCase() + v.slice(1)} {s}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* With icons */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">With icons</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            <code>iconLeft</code> / <code>iconRight</code> render alongside
            the label at full opacity — icons are co-equal content with the
            text, not affordances.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Button variant="primary"   iconLeft="plus">Add layer</Button>
          <Button variant="secondary" iconLeft="check">Confirmed</Button>
          <Button variant="accent"    iconRight="arrow-right">Continue</Button>
          <Button variant="outline"   iconRight="arrow-right">Read more</Button>
        </div>
      </div>

      {/* Icon only */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Icon only</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            <code>iconOnly</code> drops the label entirely — the icon IS
            the action. Full opacity. Pass <code>aria-label</code> for
            accessibility.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Button variant="primary"   iconOnly="plus"        aria-label="Add" />
          <Button variant="secondary" iconOnly="check"       aria-label="Confirm" />
          <Button variant="accent"    iconOnly="settings-01" aria-label="Settings" />
          <Button variant="outline"   iconOnly="arrow-right" aria-label="Next" />
        </div>
      </div>
    </div>
  )
}

function SliderShowcase() {
  const [a, setA] = useState(50)
  const [b, setB] = useState(60)
  const [c, setC] = useState(35)
  return (
    <div className="flex flex-col gap-12 mt-12">
      <ComponentMeta name="Slider" />
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Slider · default</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            No outer chrome — bare track with the value boxed at the right.
            Used by Pattern Lab cols/rows, Compositor sliders, Type Lab.
            Track defaults to <code>--kol-fg-64</code>; override via the
            <code> --kol-slider-track</code> CSS variable.
          </p>
        </div>
        <div className="mt-6 max-w-md">
          <Slider label="Columns · 4" min={1} max={32} value={a} onChange={setA} />
        </div>
      </div>

      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Slider · subtle</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Filled rounded chip — for inspector-style controls. Track
            uses <code>--kol-surface-on-primary</code> (full ink) for
            higher contrast against the chip's tinted background.
          </p>
        </div>
        <div className="mt-6 max-w-md">
          <Slider label="Saturation" min={0} max={100} value={b} onChange={setB} variant="subtle" />
        </div>
      </div>

      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Slider · custom track tone</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Override <code>--kol-slider-track</code> per instance for a
            different track contrast. Useful when a Slider sits on a
            non-default surface.
          </p>
        </div>
        <div className="mt-6 max-w-md" style={{ '--kol-slider-track': 'var(--kol-accent-primary)' }}>
          <Slider label="Accent track" min={0} max={100} value={c} onChange={setC} />
        </div>
      </div>
    </div>
  )
}

function LabeledControlShowcase() {
  const [n, setN] = useState(8)
  const [hex, setHex] = useState('AD5038')
  const [width, setWidth] = useState(251)

  return (
    <div className="flex flex-col gap-12 mt-12">
      <ComponentMeta name="LabeledControl" />
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">LabeledControl · slot pattern</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Generic slot for a small uppercase label above any control
            body (Slider, Input, Stepper, Dropdown). Replaces inline
            <code> &lt;div className="flex flex-col gap-2"&gt;&lt;label&gt;X&lt;/label&gt;...</code>
            patterns scattered across generators.
          </p>
          <p>
            For typed inputs (number → Stepper, text → Input) prefer the
            more opinionated <code>&lt;PropertyInput&gt;</code> molecule.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6 max-w-3xl">
          <LabeledControl label={`Columns · ${n}`}>
            <Slider min={1} max={32} value={n} onChange={setN} />
          </LabeledControl>
          <LabeledControl label="Hex" hint="6-char">
            <Input prefix="#" value={hex} onChange={(e) => setHex(e.target.value)} uppercase chars={6} />
          </LabeledControl>
          <LabeledControl label="Width" hint="px">
            <Stepper value={width} onChange={(e) => setWidth(Number(e.target.value))} step={5} />
          </LabeledControl>
        </div>
      </div>
    </div>
  )
}

function PillTagBadgeShowcase() {
  return (
    <div className="flex flex-col gap-12 mt-12">

      <ComponentMeta names={['Pill', 'Tag', 'Badge']} />

      {/* Pills */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Pill · variants × sizes</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Small pill-shaped indicators. Three variants (outline /
            subtle / inverse) × three sizes (sm / md / lg). Currently
            ad-hoc CSS — pending future shell migration.
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          {['outline', 'subtle', 'inverse'].map(v => (
            <div key={v} className="flex items-center gap-3 flex-wrap">
              <span className="kol-helper-10 uppercase tracking-widest text-meta w-20 shrink-0">{v}</span>
              {['sm', 'md', 'lg'].map(s => (
                <Pill key={s} variant={v} size={s}>{v} {s}</Pill>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Tag · clickable filter</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>Tag-style controls with click + active states. Used in ContentFilters.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <Tag hash={false}>typography</Tag>
          <Tag hash={false}>color</Tag>
          <Tag hash={false}>layout</Tag>
          <Tag variant="inverse" hash={false}>selected</Tag>
        </div>
      </div>

      {/* Badges */}
      <div>
        <span className="kol-helper-10 uppercase tracking-widest text-meta">Badge · semantic variants</span>
        <div className="kol-prose max-w-[60ch] mt-3 text-meta">
          <p>
            Status / categorization indicators. Eight semantic variants
            (default / secondary / outline / success / warning / critical /
            destructive / info) × three sizes.
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          {['default', 'secondary', 'outline', 'success', 'warning', 'critical', 'destructive', 'info'].map(v => (
            <div key={v} className="flex items-center gap-3 flex-wrap">
              <span className="kol-helper-10 uppercase tracking-widest text-meta w-24 shrink-0">{v}</span>
              {['sm', 'md', 'lg'].map(s => (
                <Badge key={s} variant={v} size={s}>{v} {s}</Badge>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default function Demo() {
  usePageTitle('Demo')

  return (
    <>
      <PageSection
        id="control-system"
        label="00 — control system"
        title="Control system"
        body="Three chrome variants × three sizes for interactive controls. Atoms (Input, Stepper, PropertyInput) compose from a shared .kol-control shell instead of reinventing bg/border/padding. ViewToggle's icon variant uses 4px radius to match the rest of the system."
      >
        <ControlSystemShowcase />
      </PageSection>

      <PageSection
        id="atoms-button"
        label="01 — atoms/Button"
        title="Button"
        body="Four variants × three sizes. Padding scale shared with .kol-control. Heavier-background variants (secondary, accent) get font-weight 500. Icons via iconLeft / iconRight / iconOnly — all rendered at full opacity, since icons are content, not affordances."
      >
        <ButtonShowcase />
      </PageSection>

      <PageSection
        id="atoms-toggles"
        label="02 — toggles"
        title="Toggles"
        body="Every toggle component in the repo, in one view. Atoms: ToggleSwitch, ToggleCheckbox (both with bg-fg-04 quiet on-state). Molecules: ToggleBracket (accent-yellow ON identity), ViewToggle (text + icon segmented control). Navigation: ThemeToggle (icon + hop variants — compact dropped 2026-04-30)."
      >
        <ToggleShowcase />
      </PageSection>

      <PageSection
        id="atoms-slider"
        label="03 — atoms · Slider"
        title="Slider"
        body="Range-input atom with three variants — default (bordered shell), subtle (filled chip), minimal (bare track + boxed value)."
      >
        <SliderShowcase />
      </PageSection>

      <PageSection
        id="molecules-labeled-control"
        label="04 — molecules · LabeledControl"
        title="LabeledControl"
        body="Generic slot — small uppercase label above any control body. Replaces inline label-above-input layout used across generators."
      >
        <LabeledControlShowcase />
      </PageSection>

      <PageSection
        id="molecules-pill-tag-badge"
        label="05 — molecules · Pill / Tag / Badge"
        title="Pill, Tag, Badge"
        body="Three pill-shaped molecules. Currently ad-hoc CSS in kol-components-molecules.css; future consolidation candidate (per docs/kol-migration/components/02-components-molecules.md §6)."
      >
        <PillTagBadgeShowcase />
      </PageSection>

      <PageSection
        id="atoms-primitives"
        label="06 — atoms · primitives"
        title="Visual primitives"
        body="Tiny atomic visuals — no chrome, no API surface beyond what's needed. TransparentX is the diagonal warning stroke; ColorSwatch is the fixed-size color chip used by the swatch grids."
      >
        <div className="flex flex-col gap-12 mt-12">
          <ComponentMeta names={['TransparentX', 'ColorSwatch']} />

          <div>
            <span className="kol-helper-10 uppercase tracking-widest text-meta">TransparentX · 24×24 stroke X</span>
            <div className="kol-prose max-w-[60ch] mt-3 text-meta">
              <p>
                Stroke uses <code>var(--ui-warning)</code>. Used inside palette
                swatches to indicate the slot is unused / transparent. Three
                consumers post-migration: combo-lab/ComboLab,
                social/ColorPicker, compose/SwatchRow.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <span className="relative inline-flex border border-fg-08 rounded overflow-hidden" style={{ width: 24, height: 24 }}>
                <TransparentX />
              </span>
              <span className="relative inline-flex border border-fg-08 rounded overflow-hidden" style={{ width: 32, height: 32 }}>
                <TransparentX />
              </span>
            </div>
          </div>

          <div>
            <span className="kol-helper-10 uppercase tracking-widest text-meta">ColorSwatch · preview + interactive · transparent</span>
            <div className="kol-prose max-w-[60ch] mt-3 text-meta">
              <p>
                Polymorphic — renders as <code>{'<button>'}</code> when{' '}
                <code>onClick</code> is passed (with hover + selected states),
                otherwise <code>{'<span aria-hidden>'}</code> as a non-interactive
                preview chip. <code>size={'{number}'}</code> sets fixed px;{' '}
                <code>size="fill"</code> uses <code>w-full aspect-square</code>{' '}
                so the chip flexes into a grid cell. Pass{' '}
                <code>showTransparent</code> for null / unset color slots.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <ColorSwatch hex="#FFCF33" />
              <ColorSwatch hex="#FFCF33" selected onClick={() => {}} />
              <ColorSwatch hex="#CE4646" onClick={() => {}} />
              <ColorSwatch hex="#0E0E11" onClick={() => {}} />
              <ColorSwatch showTransparent />
              <ColorSwatch hex="#FFCF33" size={32} onClick={() => {}} />
            </div>
            <div className="kol-helper-10 text-subtle mt-3">
              Preview · selected · default · default · transparent · 32px
            </div>
          </div>
        </div>
      </PageSection>

    </>
  )
}
