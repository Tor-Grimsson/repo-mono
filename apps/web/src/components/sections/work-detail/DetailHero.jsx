import SectionLabel from '../../ui/SectionLabel'

export default function DetailHero({ project }) {
  return (
    <div className="h-dvh flex flex-col justify-end gap-2 pb-8">
      <SectionLabel text={project.client} />
      <h1 className="kol-heading-display">
        / {project.title}
      </h1>
    </div>
  )
}
