export default function FloatingNavigation({
  sections,
  activeSection,
  navVisible,
  scrollToSection,
  navAtBottom,
  navStopPosition
}) {
  return (
    <div
      id="floating-nav"
      className={`${navAtBottom ? 'absolute' : 'fixed top-24'} left-0 z-[9999]`}
      style={navAtBottom ? { top: `${navStopPosition}px` } : {}}
    >
      <div className="relative rounded p-6">
        <div
          className={`absolute inset-0 bg-fg-04 backdrop-blur-sm rounded transition-opacity duration-1000 ${
            navVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="relative flex flex-col items-start gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center gap-2"
            aria-label={section.label}
          >
            <div
              className={`w-1 h-1 rounded-full transition-all ${
                activeSection === section.id
                  ? 'bg-fg-96'
                  : 'bg-fg-24 hover:bg-fg-48'
              }`}
            />
            <span className={`kol-helper-xs transition-opacity duration-1000 ${
              activeSection === section.id
                ? 'text-fg-96 opacity-100'
                : navVisible
                ? 'text-fg-48 opacity-60 group-hover:opacity-100'
                : 'text-fg-48 opacity-40'
            }`}>
              {section.label}
            </span>
          </button>
        ))}
        </div>
      </div>
    </div>
  )
}
