import React, { useState } from 'react';

interface PartsSearchFormProps {
  onSearch: (partNumber: string) => void;
  isLoading: boolean;
}

const PartsSearchForm: React.FC<PartsSearchFormProps> = ({
  onSearch,
  isLoading
}) => {
  const [partNumber, setPartNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partNumber.trim()) {
      onSearch(partNumber.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            placeholder="Введите артикул (OEM)"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-gray-500">
            Введите артикул оригинальной детали для поиска применимых автомобилей
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !partNumber.trim()}
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
      
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Примеры артикулов:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <span>11427525333</span>
          <span>51718208317</span>
          <span>32414037820</span>
          <span>12317565026</span>
          <span>51177286520</span>
          <span>63127165711</span>
        </div>
      </div>
    </form>
  );
};

export default PartsSearchForm; 