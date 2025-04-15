'use client';

import React from 'react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Создаем массив страниц для отображения
  const getPageNumbers = () => {
    const pages = [];

    // Всегда показываем первую страницу
    pages.push(1);

    // Добавляем многоточие если текущая страница > 3
    if (currentPage > 3) {
      pages.push('...');
    }

    // Показываем страницы вокруг текущей
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Добавляем многоточие если текущая страница < totalPages - 2
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Всегда показываем последнюю страницу
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-8">
      <div className="flex space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white border hover:bg-gray-50'
          }`}
        >
          &laquo;
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === 'number' ? onPageChange(page) : null
            }
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                  ? 'bg-white border cursor-default'
                  : 'bg-white border hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white border hover:bg-gray-50'
          }`}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};
