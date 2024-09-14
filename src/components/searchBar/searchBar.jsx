import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Buscar..." }) => {
  return (
    <input
      type="text"
      className="form-control w-50"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;