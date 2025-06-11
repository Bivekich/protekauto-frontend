import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleSearchSection from '../../components/VehicleSearchSection';
import { GET_LAXIMO_CATALOG_INFO } from '@/lib/graphql';
import { LaximoCatalogInfo } from '@/types/laximo';

const VehicleSearchPage = () => {
  const router = useRouter();
  const { brand } = router.query;
  const [searchType, setSearchType] = useState<'vin' | 'wizard' | 'parts' | 'plate'>('vin');

  // Получаем информацию о каталоге
  const { data: catalogData, loading: catalogLoading } = useQuery<{ laximoCatalogInfo: LaximoCatalogInfo }>(
    GET_LAXIMO_CATALOG_INFO,
    {
      variables: { catalogCode: brand },
      skip: !brand,
      errorPolicy: 'all'
    }
  );



  if (catalogLoading) {
    return (
      <>
        <Head>
          <title>Поиск автомобиля - {brand}</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Загружаем информацию о каталоге...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!catalogData?.laximoCatalogInfo) {
    return (
      <>
        <Head>
          <title>Каталог не найден - {brand}</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Каталог не найден</h1>
            <p className="text-gray-600 mb-8">Каталог "{brand}" не существует или временно недоступен</p>
            <button
              onClick={() => router.push('/')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Вернуться на главную
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const catalogInfo = catalogData.laximoCatalogInfo;

  return (
    <>
      <Head>
        <title>Поиск автомобиля - {catalogInfo.name}</title>
        <meta name="description" content={`Поиск автомобилей ${catalogInfo.name} для подбора запчастей`} />
      </Head>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Навигация */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="text-gray-500 hover:text-gray-700 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Назад</span>
                </button>
                <div className="text-sm text-gray-500">
                  <span>Главная</span>
                  <span className="mx-2">/</span>
                  <span>Каталог</span>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 font-medium">{catalogInfo.name}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Заголовок */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4">
              {catalogInfo.icon && (
                <img 
                  src={`/images/brands/${catalogInfo.icon}`} 
                  alt={catalogInfo.name}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{catalogInfo.name}</h1>
                <p className="text-lg text-gray-600 mt-2">
                  Поиск автомобиля для начала подбора запчастей
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Поиск автомобиля может осуществляться по различным уникальным идентификаторам, 
                  таким как VIN/Frame, специальным параметрам производителя или по артикулу оригинальной детали.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Основное содержимое */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <VehicleSearchSection
            catalogInfo={catalogInfo}
            searchType={searchType}
            onSearchTypeChange={setSearchType}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default VehicleSearchPage; 