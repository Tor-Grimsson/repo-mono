import React from 'react';
import NavLink from '../atoms/NavLink';
import Chip from '../atoms/Chip';

const Sidebar = ({ filters, selectedFilter, onFilterChange }) => {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">Typical Type™</div>
        <p className="tagline">
          A crisp, type-forward blog layout inspired by Apple Newsroom and the brutal elegance of ohnotype.co.
        </p>
      </div>

      <nav className="nav" aria-label="Primary">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/post">Sample Post</NavLink>
        <NavLink to="/styles">Style Guide</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <div>
        <div className="eyebrow" style={{ marginBottom: '10px' }}>
          Filter Topics
        </div>
        <div className="filters">
          {filters.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              active={selectedFilter === filter.id}
              onClick={() => onFilterChange(filter.id)}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', color: 'var(--muted)', fontSize: '13px' }}>
        © 2025 Typical Type. Set in variable Inter. Built with love &amp; super-clean CSS.
      </div>
    </aside>
  );
};

export default Sidebar;
