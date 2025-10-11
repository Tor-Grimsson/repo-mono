import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const progressBar = document.getElementById('progress');
    if (progressBar) {
      progressBar.style.width = '0%';
    }
  }, []);

  return (
    <article className="post">
      <header>
        <div className="eyebrow">About</div>
        <h1>About Typical Type</h1>
        <div className="meta">
          <span>Last updated Oct 8, 2025</span>
        </div>
      </header>
      <div className="body">
        <p>
          Typical Type is a demonstration of how Apple Newsroom's editorial clarity can meet
          the high-contrast, type-forward aesthetic of Ohno Type Co.
        </p>
        <h2>Design Philosophy</h2>
        <p>
          We believe in clean typography, generous white space, and letting content breathe.
          Every element serves a purpose, and every decision is intentional.
        </p>
        <h3>Technology Stack</h3>
        <p>
          Built with React, Vite, Tailwind CSS 4, and React Router. Optimized for performance
          and accessibility.
        </p>
        <blockquote>
          Good design is as little design as possible.
        </blockquote>
        <p>
          This project showcases component-driven architecture with atomic design principles,
          making it easy to maintain and scale.
        </p>
      </div>
    </article>
  );
};

export default About;
