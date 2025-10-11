import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="search">
      <input
        id="search"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={value}
        onChange={onChange}
      />
      <Search size={20} className="search-icon" aria-hidden="true" />
    </div>
  );
};

export default SearchInput;
