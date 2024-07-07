import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ marginBottom: '20px', padding: '10px', width: 'calc(100% - 22px)' }}
    />
  );
};

export default SearchBar;