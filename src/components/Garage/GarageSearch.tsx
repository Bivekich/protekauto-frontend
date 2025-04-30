'use client';

import { useState } from 'react';

type GarageSearchProps = {
  onSearch: (query: string) => void;
};

const GarageSearch = ({ onSearch }: GarageSearchProps) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[8px] flex items-center py-[12px] px-[30px] border border-[#F0F0F0]"
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Поиск по гаражу"
        className="flex-grow text-[16px] outline-none text-[#8E9AAC]"
      />
      <button type="submit" className="ml-[10px]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="#8E9AAC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 17.5L13.875 13.875"
            stroke="#8E9AAC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
};

export default GarageSearch;
