'use client';

import React from 'react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  count: number;
  image?: string;
}

const demoCategories: Category[] = [
  {
    id: '1',
    name: 'Запчасти для ТО',
    count: 145,
    image: '/categories/maintenance.jpg',
  },
  {
    id: '2',
    name: 'Масла и технические жидкости',
    count: 89,
    image: '/categories/oil.jpg',
  },
  { id: '3', name: 'Шины и диски', count: 76, image: '/categories/tires.jpg' },
  {
    id: '4',
    name: 'Аксессуары',
    count: 112,
    image: '/categories/accessories.jpg',
  },
  {
    id: '5',
    name: 'Автоэлектроника',
    count: 57,
    image: '/categories/electronics.jpg',
  },
  { id: '6', name: 'Инструменты', count: 63, image: '/categories/tools.jpg' },
];

export const ProductCategories = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {demoCategories.map((category) => (
        <div
          key={category.id}
          className="relative bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition cursor-pointer"
        >
          <div className="h-32 bg-gray-200 relative">
            {category.image && (
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.count} товаров</p>
          </div>
        </div>
      ))}
    </div>
  );
};
