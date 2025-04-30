'use client';

import { useState } from 'react';

type GarageAutoSearchProps = {
  onSearch: (query: string) => void;
};

const GarageAutoSearch = ({ onSearch }: GarageAutoSearchProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    <form onSubmit={handleSubmit} className="mb-[10px]">
      <div
        className={`relative flex-grow flex items-center bg-white rounded-[8px] px-[20px] py-[12px] shadow-sm ${
          isFocused ? 'ring-2 ring-[#EC1C24]' : ''
        } transition-all`}
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Поиск по гаражу"
          className={`w-full outline-none ${
            query ? 'text-black' : 'text-[#8893A1]'
          } bg-transparent text-[16px]`}
        />
        <button
          type="submit"
          className={`absolute right-[20px] ${
            query ? 'text-black' : 'text-[#8893A1]'
          } hover:text-[#EC1C24] transition-colors`}
          aria-label="Поиск"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors"
          >
            <path
              d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default GarageAutoSearch;
