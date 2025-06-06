import React from 'react';

const SearchForm: React.FC = () => (
  <div className="w-container">
    <h1>Search results</h1>
    <form action="/search" className="w-form">
      <label htmlFor="search">Search</label>
      <input
        className="w-input"
        maxLength={256}
        name="query"
        placeholder="Search…"
        type="search"
        id="search"
        required
      />
      <input type="submit" className="w-button" value="Search" />
    </form>
  </div>
);

export default SearchForm; 