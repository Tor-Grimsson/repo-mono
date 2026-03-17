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
      className={`self-stretch min-h-24 md:min-h-40 p-4 md:p-6 rounded flex items-stretch gap-4 md:gap-6 mb-4 md:mb-6 overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-surface-secondary border border-[color-mix(in_srgb,var(--kol-surface-on-primary)_24%,transparent)]'
          : 'bg-surface-primary border border-fg-08 hover:bg-surface-secondary hover:border-[color-mix(in_srgb,var(--kol-surface-on-primary)_24%,transparent)]'
      }`}
      onMouseEnter={onMouseEnter}
    >
      {/* Thumbnail */}
      {project.thumbnail?.url && (
        <div className="shrink-0 w-16 h-16 md:w-28 md:h-28 rounded-[2px] overflow-hidden border border-fg-08">
          <img
            src={project.thumbnail.url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between min-w-0 flex-1 gap-3 md:gap-4">
        {/* Header Row */}
        <div className="flex justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1 md:gap-2 min-w-0">
            <div className="kol-mono-sm uppercase truncate">
              {project.title}
            </div>
            <div className="kol-mono-xs text-fg-64 truncate">
              {project.tags?.join(' · ')}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 md:gap-2 shrink-0">
            <span className="kol-mono-xs md:kol-mono-sm capitalize">
              {project.type}
            </span>
            <span className="kol-mono-xs text-fg-64">
              {project.year}
            </span>
          </div>
        </div>

        {/* Preview Text Row */}
        <p
          className="text-auto text-xl md:text-5xl leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ fontFamily: 'TG Malromur', fontStyle: 'italic', fontWeight: 400 }}
        >
          {project.description}
        </p>
      </div>
    </div>
  )
}

export default ProjectListItem
