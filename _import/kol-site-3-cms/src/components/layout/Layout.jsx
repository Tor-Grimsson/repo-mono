import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { filters } from '../../data/content';

const Layout = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app-layout">
      <div className="progress" id="progress" />
      <div className="app">
        <Sidebar
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <div>
          <Topbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          <main>
            <div className="container">
              <Outlet context={{ selectedFilter, searchQuery }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
