import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_BRANDS_BY_CODE } from '@/lib/graphql';

interface BrandSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleNumber: string;
  detailName: string;
}

const BrandSelectionModal: React.FC<BrandSelectionModalProps> = ({
  isOpen,
  onClose,
  articleNumber,
  detailName
}) => {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const { data, loading, error } = useQuery(GET_BRANDS_BY_CODE, {
    variables: { code: articleNumber },
    skip: !isOpen || !articleNumber,
    errorPolicy: 'all'
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedBrand('');
    }
  }, [isOpen]);

  const handleBrandSelect = (brand: string) => {
    console.log('🎯 Выбран бренд:', { articleNumber, brand });
    router.push(`/search-result?article=${encodeURIComponent(articleNumber)}&brand=${encodeURIComponent(brand)}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const brandsData = data?.getBrandsByCode;
  const brands = brandsData?.brands || [];
  const hasError = brandsData?.error || error;
  const hasNoBrands = brandsData?.success && brands.length === 0;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Заголовок */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Выберите производителя
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Артикул: <span className="font-medium">{articleNumber}</span>
          </p>
          <p className="text-sm text-gray-600">
            Деталь: <span className="font-medium">{detailName}</span>
          </p>
        </div>

        {/* Содержимое */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <span className="ml-3 text-gray-600">Загружаем производителей...</span>
            </div>
          )}

          {hasError && (
            <div className="text-center py-8">
              <div className="text-red-500 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h4>
              <p className="text-gray-600 mb-4">
                {brandsData?.error || error?.message || 'Не удалось загрузить список производителей'}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Закрыть
              </button>
            </div>
          )}

          {hasNoBrands && (
            <div className="text-center py-8">
              <div className="text-yellow-500 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Производители не найдены</h4>
              <p className="text-gray-600 mb-4">
                К сожалению, по данному артикулу производители не найдены
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Попробуйте изменить параметры поиска или обратитесь к нашим менеджерам
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Телефон: <span className="font-medium">+7 (495) 123-45-67</span></p>
                <p>Email: <span className="font-medium">info@protek.ru</span></p>
              </div>
            </div>
          )}

          {!loading && !hasError && brands.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-4">
                Найдено производителей: <span className="font-medium">{brands.length}</span>
              </p>
              {brands.map((brand: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleBrandSelect(brand.brand)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-red-700">
                        {brand.brand}
                      </div>
                      {brand.name && brand.name !== brand.brand && (
                        <div className="text-sm text-gray-600 group-hover:text-red-600">
                          {brand.name}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 group-hover:text-red-500">
                        Код: {brand.code}
                      </div>
                    </div>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Футер */}
        {!loading && !hasError && brands.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSelectionModal; 