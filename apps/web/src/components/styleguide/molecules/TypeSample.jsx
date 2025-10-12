const sampleText = {
  display: 'Kolkrabbi Display',
  section: 'Kolkrabbi Section',
  'h1': 'Kolkrabbi Heading 1',
  'h2': 'Kolkrabbi Heading 2',
  'h3': 'Kolkrabbi Heading 3',
  body: 'Body copy demonstrates spacing and legibility.',
  'body-sm': 'Supporting copy with smaller size.',
  'mono-body': 'Monospace body text for technical content.',
  label: 'UI LABEL',
  mono: 'Monospace metadata text'
}

const TypeSample = ({ className, label, usage, id }) => {
  return (
    <div
      className="surface-panel rounded-2xl border p-5 space-y-2"
      style={{ borderColor: 'var(--surface-border)' }}
    >
      <div className={`mb-2 ${className}`}>{sampleText[id] ?? sampleText.body}</div>
      <div className="text-xs uppercase tracking-[0.2em] opacity-60">{label}</div>
      {usage ? <div className="text-xs opacity-60">{usage}</div> : null}
      <code className="mt-2 block text-[10px] opacity-40">class: {className}</code>
    </div>
  )
}

export default TypeSample
