import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_QUICK_DETAIL } from '@/lib/graphql';
import { LaximoQuickDetail, LaximoUnit, LaximoDetail } from '@/types/laximo';

interface GroupDetailsSectionProps {
  catalogCode: string;
  vehicleId: string;
  quickGroupId: string;
  groupName: string;
  ssd: string;
  onBack: () => void;
}

interface DetailCardProps {
  detail: LaximoDetail;
}

const DetailCard: React.FC<DetailCardProps> = ({ detail }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-1">{detail.name}</h4>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">OEM:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
              {detail.oem}
            </span>
          </div>
        </div>
        
        {detail.brand && (
          <div className="flex-shrink-0 ml-4">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              {detail.brand}
            </span>
          </div>
        )}
      </div>

      {detail.description && (
        <p className="text-gray-700 text-sm mb-3">{detail.description}</p>
      )}

      {detail.applicablemodels && (
        <div className="mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Применимые модели:
          </span>
          <p className="text-sm text-gray-700 mt-1">{detail.applicablemodels}</p>
        </div>
      )}

      {detail.note && (
        <div className="mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Примечание:
          </span>
          <p className="text-sm text-gray-700 mt-1">{detail.note}</p>
        </div>
      )}

      {detail.attributes && detail.attributes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {detail.attributes.map((attr, index) => (
              <div key={index} className="text-xs">
                <span className="text-gray-500">{attr.name || attr.key}:</span>
                <span className="ml-1 text-gray-700">{attr.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          onClick={() => {
            // TODO: Добавить в корзину
            console.log('Добавить в корзину:', detail.oem);
          }}
        >
          Добавить в корзину
        </button>
        
        <button
          className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          onClick={() => {
            // TODO: Посмотреть аналоги
            console.log('Поиск аналогов:', detail.oem);
          }}
        >
          Найти аналоги
        </button>
      </div>
    </div>
  );
};

interface UnitSectionProps {
  unit: LaximoUnit;
}

const UnitSection: React.FC<UnitSectionProps> = ({ unit }) => {
  return (
    <div className="mb-8">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{unit.name}</h3>
            {unit.code && (
              <p className="text-sm text-gray-600 mt-1">Код: {unit.code}</p>
            )}
            {unit.description && (
              <p className="text-sm text-gray-700 mt-2">{unit.description}</p>
            )}
          </div>
          
          {unit.details && unit.details.length > 0 && (
            <div className="text-sm text-gray-500">
              {unit.details.length} {unit.details.length === 1 ? 'деталь' : 'деталей'}
            </div>
          )}
        </div>
      </div>

      {unit.details && unit.details.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {unit.details.map((detail) => (
            <DetailCard key={detail.detailid} detail={detail} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0H4m0 0l4-4m0 8l4-4" />
          </svg>
          <p>В этом узле пока нет доступных деталей</p>
        </div>
      )}
    </div>
  );
};

const GroupDetailsSection: React.FC<GroupDetailsSectionProps> = ({
  catalogCode,
  vehicleId,
  quickGroupId,
  groupName,
  ssd,
  onBack
}) => {
  const { data, loading, error } = useQuery<{ laximoQuickDetail: LaximoQuickDetail }>(
    GET_LAXIMO_QUICK_DETAIL,
    {
      variables: {
        catalogCode,
        vehicleId,
        quickGroupId,
        ssd
      },
      skip: !catalogCode || !vehicleId || !quickGroupId || !ssd,
      errorPolicy: 'all'
    }
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Загружаем детали группы...</p>
        <p className="text-sm text-gray-500 mt-1">{groupName}</p>
      </div>
    );
  }

  if (error) {
    console.error('Ошибка загрузки деталей группы:', error);
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-600 mb-2">Ошибка загрузки деталей</h3>
        <p className="text-gray-600 mb-4">Не удалось загрузить детали для группы "{groupName}"</p>
        <button
          onClick={onBack}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Вернуться к группам
        </button>
      </div>
    );
  }

  if (!data?.laximoQuickDetail) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0H4m0 0l4-4m0 8l4-4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">Детали не найдены</h3>
        <p className="text-gray-500 mb-4">Для группы "{groupName}" не найдено доступных деталей</p>
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Вернуться к группам
        </button>
      </div>
    );
  }

  const quickDetail = data.laximoQuickDetail;
  const totalDetails = quickDetail.units?.reduce((total, unit) => total + (unit.details?.length || 0), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Шапка */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-2 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Вернуться к группам
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900">{quickDetail.name || groupName}</h2>
            <p className="text-gray-600 mt-1">ID группы: {quickDetail.quickgroupid}</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Найдено</p>
            <p className="text-2xl font-bold text-blue-600">{totalDetails}</p>
            <p className="text-sm text-gray-500">{totalDetails === 1 ? 'деталь' : 'деталей'}</p>
          </div>
        </div>
      </div>

      {/* Список узлов и деталей */}
      {quickDetail.units && quickDetail.units.length > 0 ? (
        <div>
          {quickDetail.units.map((unit) => (
            <UnitSection key={unit.unitid} unit={unit} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0H4m0 0l4-4m0 8l4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">Узлы не найдены</h3>
          <p className="text-gray-500">В этой группе пока нет доступных узлов и деталей</p>
        </div>
      )}
    </div>
  );
};

export default GroupDetailsSection; 