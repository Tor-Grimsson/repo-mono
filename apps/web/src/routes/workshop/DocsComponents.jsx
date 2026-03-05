import { useState } from 'react'
import { Button, Tag, ToggleSwitch, Input } from '@kol/ui'
import { DocsArticle } from '../../components/workshop/docs'
import DesCard from '../../components/workshop/molecules/DesCard'

function ButtonPreview() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" onClick={() => {}}>Primary</Button>
      <Button variant="secondary" onClick={() => {}}>Secondary</Button>
      <Button variant="outline" onClick={() => {}}>Outline</Button>
    </div>
  )
}

function TagPreview() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Tag>Design</Tag>
      <Tag>Typography</Tag>
      <Tag>Color</Tag>
      <Tag variant="inverse">Inverse</Tag>
    </div>
  )
}

function ToggleSwitchPreview() {
  const [on, setOn] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <ToggleSwitch label="Dark mode" checked={on} onToggle={setOn} />
      <ToggleSwitch label="Always on" checked={true} onToggle={() => {}} />
    </div>
  )
}

function InputPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Input placeholder="Search…" iconLeft="search-16" />
      <Input placeholder="Enter value…" />
    </div>
  )
}

const COMPONENT_CARDS = [
  {
    id: 'button',
    name: 'Button',
    description: 'Primary action element supporting multiple variants and icon slots.',
    Preview: ButtonPreview
  },
  {
    id: 'tag',
    name: 'Tag',
    description: 'Compact label for categorisation and filtering.',
    Preview: TagPreview
  },
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    description: 'Binary on/off control for settings and preferences.',
    Preview: ToggleSwitchPreview
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Single-line text field with optional leading icon.',
    Preview: InputPreview
  }
]

const ComponentCard = ({ card }) => {
  const { Preview } = card

  return (
    <div className="flex flex-col rounded-lg border border-fg-08 overflow-hidden">
      <div className="bg-surface-primary border-b border-auto">
        <div className="min-h-[140px] flex items-center justify-center p-6">
          <Preview />
        </div>
      </div>
      <div className="px-4 pb-4 pt-3">
        <DesCard name={card.name} description={card.description} />
      </div>
    </div>
  )
}

const DocsComponents = () => {
  return (
    <DocsArticle>
      <h1 className="docs-title">Components</h1>
      <p className="kol-mono-xs text-fg-48 mb-8">
        Live previews of shared UI components from the <code>@kol/ui</code> package.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {COMPONENT_CARDS.map((card) => (
          <ComponentCard key={card.id} card={card} />
        ))}
      </div>
    </DocsArticle>
  )
}

export default DocsComponents
