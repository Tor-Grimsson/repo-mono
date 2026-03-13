/**
 * ProjectListItem
 *
 * Horizontal list item for Work V2 projects.
 * Based on TypefaceLibraryItem list variant from foundry.
 *
 * Header row: project name + services (left), type + year (right)
 * Preview row: project description text, no image
 *
 * @param {Object} props
 * @param {Object} props.project - Project data object
 * @param {boolean} props.isActive - Whether this item is currently active (last hovered)
 * @param {Function} props.onMouseEnter - Callback fired on mouse enter
 */
const ProjectListItem = ({ project, isActive = false, onMouseEnter }) => {
  return (
    <div
      className={`self-stretch min-h-40 p-6 rounded flex flex-col justify-start items-start gap-6 mb-6 overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-surface-secondary border border-[color-mix(in_srgb,var(--kol-surface-on-primary)_24%,transparent)]'
          : 'bg-surface-primary border border-fg-08 hover:bg-surface-secondary hover:border-[color-mix(in_srgb,var(--kol-surface-on-primary)_24%,transparent)]'
      }`}
      onMouseEnter={onMouseEnter}
    >
      {/* Header Row */}
      <div className="self-stretch flex justify-between items-center">
        {/* Left: Project Name & Services */}
        <div className="flex flex-col gap-2">
          <div className="kol-mono-sm uppercase">
            {project.title}
          </div>
          <div className="kol-mono-xs text-fg-64">
            {project.tags?.join(' · ')}
          </div>
        </div>

        {/* Right: Type & Year */}
        <div className="flex flex-col items-end gap-2">
          <span className="kol-mono-sm capitalize">
            {project.type}
          </span>
          <span className="kol-mono-xs text-fg-64">
            {project.year}
          </span>
        </div>
      </div>

      {/* Preview Text Row */}
      <div className="self-stretch">
        <p
          className="text-auto text-3xl md:text-5xl leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ fontFamily: 'TG Malromur', fontStyle: 'italic', fontWeight: 400 }}
        >
          {project.description}
        </p>
      </div>
    </div>
  )
}

export default ProjectListItem
