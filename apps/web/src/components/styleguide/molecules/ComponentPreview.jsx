import { useState } from 'react'
import { Button, Tag, Dropdown, Slider, SectionLabel, SectionHeader, ThemeToggle } from '@kol/ui'
import Wordmark from '../../ui/Wordmark'
import FontPreviewItem from '../../sections/foundry-atoms/FontPreviewItem'

const ComponentPreview = ({ item, snippet }) => {
  const { id, label, type, variant, props = {}, description } = item
  const [dropdownValue, setDropdownValue] = useState(props.value ?? props.options?.[0]?.value)
  const [sliderValue, setSliderValue] = useState(props.value ?? props.min ?? 0)

  const renderComponent = (tone = 'default') => {
    switch (type) {
      case 'button':
        return (
          <Button variant={variant} {...props}>
            {props.children}
          </Button>
        )
      case 'tag':
        return <Tag {...props}>{props.children}</Tag>
      case 'dropdown':
        return (
          <Dropdown
            {...props}
            value={dropdownValue}
            onChange={setDropdownValue}
          />
        )
      case 'slider':
        return (
          <Slider
            {...props}
            value={sliderValue}
            onChange={setSliderValue}
          />
        )
      case 'pill':
        return <span className="pill-inverse">Pill Example</span>
      case 'card':
        return <div className="card w-52 text-sm">Card body leveraging surface tokens.</div>
      case 'foundry-card':
        return (
          <div className="flex w-full flex-col gap-4">
            {(item.variants ?? []).map((variant) => (
              <div key={variant.id} className="flex flex-col gap-2">
                <span className="text-control uppercase tracking-[0.2em] opacity-70">{variant.label}</span>
                <div
                  className={`${variant.className} min-h-[140px] w-full flex items-center justify-center text-control`}
                >
                  Foundry card surface
                </div>
              </div>
            ))}
          </div>
        )
      case 'foundry-preview': {
        const cardClass = tone === 'inverse'
          ? 'foundryCard foundryCardPadded foundryCardInverted'
          : 'foundryCard foundryCardPadded'

        const preview = (
          <FontPreviewItem
            cardClassName={cardClass}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."
            initialSize={72}
            initialWeight="Black"
            bgOpacity={100}
          />
        )

        if (tone === 'inverse') {
          return (
            <div className="w-full min-h-[520px]" data-theme="dark">
              <div className="dark">{preview}</div>
            </div>
          )
        }

        return <div className="w-full min-h-[520px]">{preview}</div>
      }
      case 'toggle':
        if (item.variants && item.variants.length > 0) {
          return (
            <div className="flex flex-wrap items-center gap-6">
              {item.variants.map(({ id: variantId, label: variantLabel }) => (
                <div key={variantId} className="flex flex-col items-center gap-2">
                  <span className="text-control text-[10px] uppercase tracking-[0.2em] opacity-60">{variantLabel}</span>
                  <ThemeToggle variant={variantId} previewOnly />
                </div>
              ))}
            </div>
          )
        }
        return <ThemeToggle {...props} previewOnly />
      case 'section-label':
        return <SectionLabel {...props} />
      case 'section-header':
        return <SectionHeader {...props} />
      case 'wordmark':
        return <Wordmark className="h-6" />
      default:
        return null
    }
  }

  return (
    <div
      className="surface-panel rounded-2xl border p-4 space-y-4"
      style={{ borderColor: 'var(--surface-border)' }}
    >
      <div className="max-w-md space-y-2">
        <div className="text-control uppercase tracking-[0.2em] opacity-80">{label}</div>
        {description ? <p className="text-control opacity-70">{description}</p> : null}
        {snippet ? (
          <code className="mt-2 block whitespace-pre text-[10px] opacity-50">
            {snippet}
          </code>
        ) : null}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div
          className="surface-panel rounded-2xl border p-4"
          style={{ borderColor: 'var(--surface-border)' }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">Default surface</div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {renderComponent('default')}
          </div>
        </div>
        <div
          className="surface-panel surface-inverse rounded-2xl border p-4"
          style={{ borderColor: 'color-mix(in srgb, var(--foreground-inverse) 30%, transparent)' }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">Inverse surface</div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {renderComponent('inverse')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentPreview
