import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_CATEGORIES, GET_LAXIMO_UNITS } from '@/lib/graphql';
import { LaximoQuickGroup } from '@/types/laximo';
import UnitsSection from './UnitsSection';

interface CategoriesSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd?: string;
}

interface LaximoCategory {
  quickgroupid: string; // categoryid в API
  name: string;
  link: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  catalogCode,
  vehicleId,
  ssd
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

  // Получаем список категорий каталога
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery<{ laximoCategories: LaximoCategory[] }>(
    GET_LAXIMO_CATEGORIES,
    {
      variables: { 
        catalogCode,
        vehicleId,
        ...(ssd && ssd.trim() !== '' && { ssd })
      },
      skip: !catalogCode || !vehicleId,
      errorPolicy: 'all'
    }
  );

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    console.log('🔍 CategoriesSection: выбрана категория', {
      categoryId,
      categoryName,
      catalogCode,
      vehicleId,
      hasSSD: !!ssd,
      ssdLength: ssd?.length,
      ssdPreview: ssd ? ssd.substring(0, 50) + '...' : 'отсутствует'
    });
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedCategoryName('');
  };

  // Если выбрана категория, показываем узлы этой категории
  if (selectedCategoryId) {
    return (
      <UnitsSection
        catalogCode={catalogCode}
        vehicleId={vehicleId}
        ssd={ssd}
        categoryId={selectedCategoryId}
        categoryName={selectedCategoryName}
        onBack={handleBackToCategories}
      />
    );
  }

  if (categoriesLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Загружаем категории каталога...</p>
      </div>
    );
  }

  if (categoriesError) {
    console.error('Ошибка загрузки категорий:', categoriesError);
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки категорий</h3>
        <p className="text-gray-600 mb-4">Не удалось загрузить категории каталога</p>
        <p className="text-sm text-gray-500">
          {categoriesError.message}
        </p>
      </div>
    );
  }

  const categories = categoriesData?.laximoCategories || [];

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Категории не найдены</h3>
        <p className="text-gray-600">
          Для данного автомобиля категории каталога недоступны
        </p>
      </div>
    );
  }

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.quickgroupid}
            onClick={() => handleCategorySelect(category.quickgroupid, category.name)}
            className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-red-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-500">
                  Нажмите для просмотра узлов
                </p>
              </div>
              <div className="ml-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-900">
              Информация о категориях
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Категории узлов оригинального каталога представляют структуру каталога производителя. 
              Каждая категория содержит узлы (агрегаты), которые в свою очередь содержат конкретные детали.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection; 