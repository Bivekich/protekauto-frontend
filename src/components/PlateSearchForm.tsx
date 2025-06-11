import React, { useState } from 'react';

interface PlateSearchFormProps {
  onSearch: (plateNumber: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const PlateSearchForm: React.FC<PlateSearchFormProps> = ({
  onSearch,
  isLoading,
  placeholder = 'А123БВ177'
}) => {
  const [plateNumber, setPlateNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plateNumber.trim()) {
      onSearch(plateNumber.trim().toUpperCase());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Убираем пробелы и дефисы, приводим к верхнему регистру
    const value = e.target.value.replace(/[\s-]/g, '').toUpperCase();
    setPlateNumber(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={plateNumber}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg font-mono"
            disabled={isLoading}
            maxLength={9}
          />
          <p className="mt-2 text-sm text-gray-500">
            Введите государственный номер автомобиля без пробелов и дефисов
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Поддерживаются все виды государственных номеров, действующие в РФ
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !plateNumber.trim()}
          className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Поиск...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Найти
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PlateSearchForm; 