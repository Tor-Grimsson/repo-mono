import React from 'react';

const Hero = ({ primary, secondary }) => {
  return (
    <div className="hero">
      <article className="hero-card">
        <div className="eyebrow">{primary.eyebrow}</div>
        <h1>{primary.title}</h1>
        <p className="summary" style={{ fontSize: 'var(--lead)', color: 'var(--muted)' }}>
          {primary.summary}
        </p>
        <div className="meta">
          {primary.meta.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </article>

      <article className="card">
        <div className="card-media" style={{ aspectRatio: secondary.aspect }}>
          <img src={secondary.image} alt="Abstract typographic scene" />
        </div>
        <div className="card-body">
          <div className="kicker">{secondary.kicker}</div>
          <div className="title" style={{ fontSize: 'var(--h2)' }}>{secondary.title}</div>
          <p className="summary">{secondary.summary}</p>
          <div className="meta">
            {secondary.meta.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Hero;
