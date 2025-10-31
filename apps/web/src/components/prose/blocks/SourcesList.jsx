/**
 * SourcesList component for rendering bibliography/references section
 * Displays numbered citations with title, URL, and meta information
 */
const SourcesList = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null
  }

  return (
    <div className="sources-section">
      <h2 className="sources-title">Sources & References</h2>
      <ul className="sources-list">
        {sources.map((source, index) => (
          <li key={index} className="source-item">
            <div className="source-number">[{index + 1}]</div>
            <div className="source-content">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
              >
                {source.title}
              </a>
              {source.meta && (
                <div className="source-meta">{source.meta}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SourcesList
