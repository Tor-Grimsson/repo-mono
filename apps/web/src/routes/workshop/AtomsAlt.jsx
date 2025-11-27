import { useMemo, useState } from 'react'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesSection from '../../components/workshop/molecules/DesSection'
import {
  Button,
  ButtonBullshit,
  ButtonFixed,
  ButtonNav,
  ControlButton,
  PlayPauseButton,
  ToggleSwitch,
  ToggleCheckbox,
  ToggleBracket,
  Checkbox,
  Input,
  Dropdown,
  DropdownFixed,
  DropdownTagFilter,
  UnitSelector,
  LanguageToggle,
  Pill,
  Tag,
  Slider,
  Container,
  Divider,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SidebarMenuItem,
  SourcesItem,
  LinkWithIcon,
  ThemeToggleButton,
  Icon,
  Illustration,
  Logomark,
  Grid,
  NiftySwifty,
  TypefaceCard,
  FeatureCard,
  GlyphItem
} from '@kol/ui'

const AtomCard = ({ title, detail, preview }) => (
  <div className="space-y-3">
    <div className="rounded border border-fg-08 bg-surface-primary/80 p-4 min-h-[110px] flex items-center justify-center">
      {preview}
    </div>
    <div>
      <p className="kol-mono-text text-auto">{title}</p>
      {detail && <p className="kol-helper-xxs text-fg-64 mt-1">{detail}</p>}
    </div>
  </div>
)

const AtomsAlt = () => {
  const [isToggleOn, setIsToggleOn] = useState(true)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true)
  const [dropdownValue, setDropdownValue] = useState('alpha')
  const [dropdownFixedValue, setDropdownFixedValue] = useState('alpha')
  const [dropdownTagValues, setDropdownTagValues] = useState(new Set(['alpha', 'beta']))
  const [unit, setUnit] = useState('px')
  const [sliderValue, setSliderValue] = useState(42)
  const [themeOn, setThemeOn] = useState(false)
  const [bracketActive, setBracketActive] = useState(false)

  const dropdownOptions = useMemo(
    () => [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
      { label: 'Gamma', value: 'gamma' }
    ],
    []
  )

  const tagOptions = dropdownOptions

  const atomCategories = useMemo(() => [
    {
      title: 'Buttons & Toggles',
      description: 'Action primitives for CTAs, binary states, and transport controls.',
      items: [
        {
          name: 'Button',
          detail: 'Primary CTA with semantic tokens',
          preview: <Button variant="primary">Primary</Button>
        },
        {
          name: 'ButtonFixed',
          detail: 'Fixed width CTA for uniform layouts',
          preview: <ButtonFixed>Continue</ButtonFixed>
        },
        {
          name: 'ButtonBullshit',
          detail: 'Utility button for light/dark experiments',
          preview: <ButtonBullshit>Aux Button</ButtonBullshit>
        },
        {
          name: 'ButtonNav',
          detail: 'Navigation CTA used in hero sliders',
          preview: <ButtonNav direction="next">Next section</ButtonNav>
        },
        {
          name: 'ControlButton',
          detail: 'Circular toolbar control',
          preview: <ControlButton>Ctrl</ControlButton>
        },
        {
          name: 'PlayPauseButton',
          detail: 'Media toggle button',
          preview: <PlayPauseButton isPlaying />
        },
        {
          name: 'ToggleSwitch',
          detail: 'Binary switch with labels',
          preview: (
            <ToggleSwitch
              isOn={isToggleOn}
              onToggle={() => setIsToggleOn((prev) => !prev)}
              label="Live"
            />
          )
        },
        {
          name: 'ToggleCheckbox',
          detail: 'Checkbox-style toggle',
          preview: (
            <ToggleCheckbox
              label="Notifications"
              checked={isCheckboxChecked}
              onChange={(checked) => setIsCheckboxChecked(checked)}
            />
          )
        },
        {
          name: 'ToggleBracket',
          detail: 'Bracketed toggle used in inspectors',
          preview: (
            <ToggleBracket
              label="Bracket"
              value={bracketActive}
              onToggle={setBracketActive}
              onLabel="ON"
              offLabel="OFF"
            />
          )
        },
        {
          name: 'Checkbox',
          detail: 'Base checkbox field',
          preview: (
            <Checkbox
              label="Enable guides"
              checked={isCheckboxChecked}
              onChange={(checked) => setIsCheckboxChecked(checked)}
            />
          )
        }
      ]
    },
    {
      title: 'Inputs & Selection',
      description: 'Form primitives for data entry and filtering.',
      items: [
        {
          name: 'Input',
          detail: 'Text input with label',
          preview: <Input label="Label" placeholder="Enter value" />
        },
        {
          name: 'Dropdown',
          detail: 'Responsive select menu',
          preview: (
            <Dropdown
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
            />
          )
        },
        {
          name: 'DropdownFixed',
          detail: 'Fixed-width dropdown',
          preview: (
            <DropdownFixed
              options={dropdownOptions}
              value={dropdownFixedValue}
              onChange={setDropdownFixedValue}
            />
          )
        },
        {
          name: 'DropdownTagFilter',
          detail: 'Tag multi-select control',
          preview: (
            <DropdownTagFilter
              options={tagOptions}
              selectedValues={dropdownTagValues}
              onChange={(value) => {
                if (value === null) {
                  setDropdownTagValues(new Set())
                  return
                }
                setDropdownTagValues((prev) => {
                  const next = new Set(prev)
                  next.has(value) ? next.delete(value) : next.add(value)
                  return next
                })
              }}
            />
          )
        },
        {
          name: 'UnitSelector',
          detail: 'Axis/unit selector for inspectors',
          preview: <UnitSelector activeUnit={unit} onUnitChange={setUnit} />
        },
        {
          name: 'LanguageToggle',
          detail: 'IS/EN switch in nav',
          preview: <LanguageToggle />
        },
        {
          name: 'Pill',
          detail: 'Label chip for status/meta',
          preview: <Pill variant="subtle">Variable</Pill>
        },
        {
          name: 'Tag',
          detail: 'Filter tag with removable states',
          preview: <Tag variant="default">Grid Systems</Tag>
        },
        {
          name: 'Slider',
          detail: 'Continuous slider control',
          preview: (
            <Slider
              label="Weight"
              min={0}
              max={100}
              value={sliderValue}
              onChange={setSliderValue}
            />
          )
        }
      ]
    },
    {
      title: 'Layout & Structure',
      description: 'Structural atoms enforcing spacing, hierarchy, and navigation behaviors.',
      items: [
        {
          name: 'Container',
          detail: 'Width-constrained wrapper',
          preview: (
            <Container>
              <div className="rounded-xl border border-fg-08 bg-surface-secondary/30 p-4">
                Constrained content
              </div>
            </Container>
          )
        },
        {
          name: 'Divider',
          detail: 'Semantic divider line',
          preview: (
            <div className="w-full space-y-2">
              <p className="kol-helper-xxs text-fg-64">Content above</p>
              <Divider className="w-full" />
              <p className="kol-helper-xxs text-fg-64">Content below</p>
            </div>
          )
        },
        {
          name: 'SectionHeader',
          detail: 'Section heading with overline',
          preview: (
            <SectionHeader
              kicker="Components"
              title="Atoms Overview"
              description="Canonical heading stack"
            />
          )
        },
        {
          name: 'SectionTitle',
          detail: 'Display section heading',
          preview: <SectionTitle>Workshop Components</SectionTitle>
        },
        {
          name: 'SectionLabel',
          detail: 'Uppercase label for groupings',
          preview: <SectionLabel text="Source" />
        },
        {
          name: 'SidebarMenuItem',
          detail: 'Navigation row with icon',
          preview: (
            <SidebarMenuItem
              label="Atoms"
              icon="atomic-atom"
              to="/workshop/components/atoms"
            />
          )
        },
        {
          name: 'SourcesItem',
          detail: 'Source list entry',
          preview: (
            <ul className="sources-list space-y-2">
              <SourcesItem
                number="01"
                title="Kolkrabbi Voice & Tone"
                href="/docs"
                meta="Documentation"
              />
            </ul>
          )
        }
      ]
    },
    {
      title: 'Links & Utility',
      description: 'Inline helpers and theme utilities.',
      items: [
        {
          name: 'LinkWithIcon',
          detail: 'Inline link with trailing icon',
          preview: (
            <LinkWithIcon to="/work">
              View Work
            </LinkWithIcon>
          )
        },
        {
          name: 'ThemeToggleButton',
          detail: 'Compact theme toggle',
          preview: (
            <ThemeToggleButton
              variant="compact"
              isToggled={themeOn}
              onClick={() => setThemeOn((prev) => !prev)}
            />
          )
        }
      ]
    },
    {
      title: 'Visual Media',
      description: 'Atoms that render icons, illustrations, and motion canvases.',
      items: [
        {
          name: 'Icon',
          detail: 'SVG icon atom',
          preview: <Icon name="styleguide" size={32} />
        },
        {
          name: 'Illustration',
          detail: 'Hero illustration renderer',
          preview: <Illustration name="illustration-01" size={200} />
        },
        {
          name: 'Logomark',
          detail: 'Logomark renderer',
          preview: <Logomark name="canalix" size={120} />
        },
        {
          name: 'Grid',
          detail: 'Grid study renderer',
          preview: <Grid name="grid-01" size={160} />
        },
        {
          name: 'NiftySwifty',
          detail: 'Experimental motion canvas',
          preview: <NiftySwifty />
        }
      ]
    },
    {
      title: 'Foundry Atoms',
      description: 'Atoms dedicated to type specimen layouts.',
      items: [
        {
          name: 'TypefaceCard',
          detail: 'Typeface summary card',
          preview: (
            <TypefaceCard
              name="TG Málrómur"
              subtitle="Variable Serif"
              description="Italic variable serif for editorial layouts."
              fontFamily="TGMalromur"
              specimenText="Málrómur"
            />
          )
        },
        {
          name: 'FeatureCard',
          detail: 'OpenType feature callout',
          preview: (
            <FeatureCard
              title="Contextual Alternates"
              description="Automatically swaps glyphs based on context."
              icon="foundation"
            />
          )
        },
        {
          name: 'GlyphItem',
          detail: 'Single glyph preview',
          preview: (
            <GlyphItem glyph="Å" fontFamily="TGMalromur" isSelected />
          )
        }
      ]
    }
  ], [
    bracketActive,
    dropdownFixedValue,
    dropdownOptions,
    dropdownTagValues,
    dropdownValue,
    isCheckboxChecked,
    isToggleOn,
    sliderValue,
    tagOptions,
    themeOn,
    unit
  ])

  return (
    <div className="min-h-screen w-full bg-surface-primary space-y-10">
      <DesPage
        title="Atoms Alt"
        subtitle="Inventory of shared UI atoms grouped by functional category."
        meta="Scope: Workshop — Components"
      />

      <div className="space-y-8">
        {atomCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <DesSection name={category.title} description={category.description} />
            <div className="grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => (
                <AtomCard
                  key={item.name}
                  title={item.name}
                  detail={item.detail}
                  preview={item.preview}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AtomsAlt
