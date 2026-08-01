import { useParams } from 'react-router-dom'
import EmbedFrame from '../components/framework/EmbedFrame'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'

const EDITOR_URL = 'https://editor.kolkrabbi.io/'

/* PLACEHOLDER SET — the user's own list, verbatim, from 2026-08-01: "video vs
 * image vs. input vs. camera vs modular source vs. vector edit vs. photo filter.
 * just to say something". His words mark it as a direction, not a spec, so these
 * are here to make the shape real, not to claim the presets exist.
 *
 * ⚠ kol-ds-fxr has NO preset URL contract — nothing in its source reads a
 * preset from the query string. So every route below embeds the SAME editor and
 * says so. Faking a deep link would be worse than an honest placeholder.
 * When fxr grows one, `presetUrl` below is the single line that changes. */
export const EDITOR_PRESETS = {
  video:            { label: 'Video',          body: 'Video source and timeline editing.' },
  image:            { label: 'Image',          body: 'Raster image composition.' },
  input:            { label: 'Input',          body: 'Live input as a canvas source.' },
  camera:           { label: 'Camera',         body: 'Camera capture into the canvas.' },
  'modular-source':  { label: 'Modular source', body: 'Generative and modular sources.' },
  'vector-edit':     { label: 'Vector edit',    body: 'Vector authoring and path editing.' },
  'photo-filter':    { label: 'Photo filter',   body: 'Filter chains over a photographic source.' },
}

/* One line to change when fxr accepts a preset. */
const presetUrl = (_preset) => EDITOR_URL

/**
 * EditorPreset — `/editor/:preset`.
 *
 * Same `EmbedFrame` the plain `/editor` row uses, onto the same deployed
 * kol-ds-fxr. The only thing a preset changes today is the page title and the
 * note above the frame, because the editor cannot yet be told which preset to
 * open. That limitation is stated on the page rather than hidden.
 */
export default function EditorPreset() {
  const { preset } = useParams()
  const meta = EDITOR_PRESETS[preset]
  usePageTitle(meta?.label ?? 'Editor')

  if (!meta) {
    return (
      <PageSection id="editor-preset" label="Editor" title="Unknown preset">
        <p className="kol-mono-12 text-fg-48 mt-6">No preset named “{preset}”.</p>
      </PageSection>
    )
  }

  return (
    <div className="flex flex-col h-dvh">
      <header className="px-6 py-4 border-b border-fg-08 shrink-0">
        <p className="kol-helper-10 text-meta">Editor · {meta.label}</p>
        <p className="kol-mono-12 text-fg-48 mt-1">
          {meta.body} Placeholder — the editor does not yet accept a preset, so this opens the
          full editor.
        </p>
      </header>
      {/* `h-full`, not the default `h-dvh` — this page already spent part of the
          viewport on its header, so the frame must fill the remainder. */}
      <div className="flex-1 min-h-0">
        <EmbedFrame src={presetUrl(preset)} title={`Design editor — ${meta.label}`} className="h-full" />
      </div>
    </div>
  )
}
