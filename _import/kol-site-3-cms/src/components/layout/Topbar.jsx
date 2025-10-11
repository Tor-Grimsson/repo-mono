import React from 'react';
import SearchInput from '../atoms/SearchInput';

const Topbar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="topbar">
      <div className="eyebrow">Newsroom</div>
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search articles, e.g. 'type', 'camera', 'WWDC'"
      />
    </div>
  );
};

export default Topbar;
