import React from 'react';

interface CatalogEmptyStateProps {
  categoryName?: string;
  hasFilters?: boolean;
  onResetFilters?: () => void;
}

const CatalogEmptyState: React.FC<CatalogEmptyStateProps> = ({ 
  categoryName = "товаров", 
  hasFilters = false,
  onResetFilters
}) => {
  return (
    <div className="flex flex-col items-center justify-center   px-4 mx-auto">
      {/* Иконка */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-red-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-16 h-16 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
        </div>
        {/* Анимированные точки */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 -right-4 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Заголовок */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {hasFilters ? "По вашему запросу ничего не найдено" : `Пока нет ${categoryName} в наличии`}
      </h3>

      {/* Описание */}
      <div className="text-center max-w-md mb-8">
        {hasFilters ? (
          <p className="text-gray-600 leading-relaxed">
            Попробуйте изменить параметры поиска или фильтры. 
            Возможно, нужные товары появятся в ближайшее время!
          </p>
        ) : (
          <p className="text-gray-600 leading-relaxed">
            Мы активно работаем над расширением ассортимента. 
            Скоро здесь появятся новые товары с лучшими ценами!
          </p>
        )}
      </div>

      {/* Действия */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {hasFilters && (
          <button 
            onClick={onResetFilters}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Сбросить фильтры
          </button>
        )}
        
        <a 
          href="/"
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium"
        >
          На главную
        </a>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Хотите узнать о поступлениях первыми?</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
          <span className="text-sm text-gray-600">Подпишитесь на уведомления:</span>
          <div className="flex gap-3">
            <a 
              href="https://t.me/protekauto" 
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/tg_icon.svg" alt="Telegram" className="w-4 h-4" />
              Telegram
            </a>
            <a 
              href="https://wa.me/79991234567" 
              className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/wa_icon.svg" alt="WhatsApp" className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogEmptyState; 