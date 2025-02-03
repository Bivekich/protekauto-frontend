'use client';
import { SegmentedControl } from '@/shared';
import { segmentedControlOptions } from './options';
import brandsData from '@public/mock/car_brands.json';
import { useMemo, useState } from 'react';

export const BrandsCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const handleSelectBrand = (category: string) => {
    setSelectedCategory(category);
  };

  const brands = useMemo(() => {
    if (selectedCategory === 'all') return brandsData;
    return brandsData.filter((brand) =>
      brand.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <div className={'space-y-10 w-full'}>
      <SegmentedControl
        options={segmentedControlOptions}
        onChange={handleSelectBrand}
      />
      <div className={'w-full px-10 grid grid-cols-6 gap-14'}>
        {brands.map(({ id, name }) => (
          <button
            key={id}
            className={
              'text-paragraph text-left hover:text-primary-red transition-colors'
            }
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
