'use client';

import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  discount?: number;
  stock: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  discount,
  stock,
}) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price);

  const discountedPrice = discount ? price - (price * discount) / 100 : null;

  const formattedDiscountedPrice = discountedPrice
    ? new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
      }).format(discountedPrice)
    : null;

  return (
    <div className="bg-white rounded-lg shadow p-4 transition hover:shadow-md">
      <div className="relative">
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        <div className="relative w-full h-48 mb-4">
          <Image
            src={image || '/placeholder.jpg'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2 line-clamp-2">{title}</h3>
      <div className="flex justify-between items-center">
        <div>
          {discount ? (
            <div>
              <span className="text-lg font-bold">
                {formattedDiscountedPrice}
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
                {formattedPrice}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold">{formattedPrice}</span>
          )}
        </div>
        <button
          disabled={stock === 0}
          className={`px-3 py-1 rounded text-sm ${
            stock > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {stock > 0 ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </div>
  );
};
