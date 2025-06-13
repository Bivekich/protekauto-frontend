import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Поиск"
    className="w-full bg-transparent outline-none text-gray-400 text-base"
    style={{ border: "none", padding: 0, margin: 0 }}
  />
);

export default SearchInput; 