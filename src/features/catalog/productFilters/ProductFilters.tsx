'use client';

import React, { useState } from 'react';

export const ProductFilters = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [availability, setAvailability] = useState('all');
  const [brands, setBrands] = useState<string[]>([]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAvailability(e.target.value);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setBrands((prev) => [...prev, value]);
    } else {
      setBrands((prev) => prev.filter((brand) => brand !== value));
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Фильтры</h3>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Цена</h4>
        <div className="flex space-x-2">
          <input
            type="number"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="w-1/2 p-2 border rounded"
            placeholder="От"
          />
          <input
            type="number"
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="w-1/2 p-2 border rounded"
            placeholder="До"
          />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Наличие</h4>
        <select
          value={availability}
          onChange={handleAvailabilityChange}
          className="w-full p-2 border rounded"
        >
          <option value="all">Все товары</option>
          <option value="inStock">В наличии</option>
          <option value="outOfStock">Нет в наличии</option>
        </select>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Бренды</h4>
        <div className="space-y-2">
          {['Бренд 1', 'Бренд 2', 'Бренд 3', 'Бренд 4', 'Бренд 5'].map(
            (brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={brand}
                  value={brand}
                  checked={brands.includes(brand)}
                  onChange={handleBrandChange}
                  className="mr-2"
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            )
          )}
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Применить
      </button>
    </div>
  );
};
