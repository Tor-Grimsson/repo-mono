import { SourcesItem } from '../atoms/index.js';

const SourcesSection = ({ title = 'Sources & References', sources = [] }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="sources-section">
      <h3>{title}</h3>
      <ul className="sources-list">
        {sources.map((source, index) => (
          <SourcesItem
            key={index}
            number={source.number}
            title={source.title}
            href={source.href}
            meta={source.meta}
          />
        ))}
      </ul>
    </div>
  );
};

export default SourcesSection;
