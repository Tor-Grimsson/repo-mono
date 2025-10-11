const sampleText = {
  display: 'Kolkrabbi Display',
  section: 'Kolkrabbi Section',
  'h1': 'Kolkrabbi Heading 1',
  'h2': 'Kolkrabbi Heading 2',
  'h3': 'Kolkrabbi Heading 3',
  body: 'Body copy demonstrates spacing and legibility.',
  'body-sm': 'Supporting copy with smaller size.',
  label: 'UI LABEL'
}

const TypeSample = ({ className, label, usage, id }) => {
  return (
    <div className="rounded-2xl border borderAbsoluteBlack20 bgAbsoluteWhite p-5">
      <div className={`mb-4 ${className}`}>{sampleText[id] ?? sampleText.body}</div>
      <div className="text-xs textAbsoluteBlack uppercase tracking-[0.2em] opacity-60">{label}</div>
      {usage ? <div className="text-xs textAbsoluteBlack opacity-60">{usage}</div> : null}
      <code className="mt-2 block text-[10px] textAbsoluteBlack opacity-40">class: {className}</code>
    </div>
  )
}

export default TypeSample
