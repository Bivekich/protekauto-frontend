import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_QUICK_GROUPS, GET_LAXIMO_QUICK_DETAIL } from '@/lib/graphql';
import { LaximoQuickGroup, LaximoQuickDetail } from '@/types/laximo';

interface QuickGroupsSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd?: string;
}

interface QuickGroupItemProps {
  group: LaximoQuickGroup;
  level: number;
  onGroupClick: (group: LaximoQuickGroup) => void;
}

const QuickGroupItem: React.FC<QuickGroupItemProps> = ({ group, level, onGroupClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = group.children && group.children.length > 0;
  const canShowDetails = group.link; // Только группы с link=true могут показывать детали

  const handleGroupClick = () => {
    if (canShowDetails) {
      onGroupClick(group);
    } else if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleGroupClick}
        className={`
          flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors
          ${canShowDetails 
            ? 'bg-white hover:bg-red-50 border-gray-200 hover:border-red-300' 
            : hasChildren 
              ? 'bg-gray-50 hover:bg-gray-100 border-gray-200' 
              : 'bg-gray-100 border-gray-200 cursor-not-allowed'
          }
          ${level > 0 ? 'ml-4' : ''}
        `}
      >
        <div className="flex items-center space-x-3">
          {hasChildren && (
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          
          <div>
            <h3 className={`font-medium ${canShowDetails ? 'text-gray-900' : 'text-gray-600'}`}>
              {group.name}
            </h3>
            <p className="text-sm text-gray-500">
              ID: {group.quickgroupid}
              {canShowDetails && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Доступен поиск
                </span>
              )}
            </p>
          </div>
        </div>

        {canShowDetails && (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>

      {/* Дочерние группы */}
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2">
          {group.children!.map((childGroup) => (
            <QuickGroupItem
              key={childGroup.quickgroupid}
              group={childGroup}
              level={level + 1}
              onGroupClick={onGroupClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface QuickDetailSectionProps {
  catalogCode: string;
  vehicleId: string;
  selectedGroup: LaximoQuickGroup;
  ssd: string;
  onBack: () => void;
}

const QuickDetailSection: React.FC<QuickDetailSectionProps> = ({
  catalogCode,
  vehicleId,
  selectedGroup,
  ssd,
  onBack
}) => {
  const { data: quickDetailData, loading: quickDetailLoading, error: quickDetailError } = useQuery<{ laximoQuickDetail: LaximoQuickDetail }>(
    GET_LAXIMO_QUICK_DETAIL,
    {
      variables: {
        catalogCode,
        vehicleId,
        quickGroupId: selectedGroup.quickgroupid,
        ssd
      },
      errorPolicy: 'all'
    }
  );

  if (quickDetailLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Назад к группам</span>
          </button>
          <div className="text-sm text-gray-500">
            Загрузка деталей...
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quickDetailError) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Назад к группам</span>
          </button>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Ошибка загрузки деталей
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Не удалось загрузить детали для группы "{selectedGroup.name}"</p>
                <p className="mt-1">Ошибка: {quickDetailError.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const quickDetail = quickDetailData?.laximoQuickDetail;

  return (
    <div className="space-y-6">
      {/* Навигация */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Назад к группам</span>
        </button>
        
        <div className="text-sm text-gray-500">
          Группа: {selectedGroup.quickgroupid}
        </div>
      </div>

      {/* Заголовок */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {selectedGroup.name}
        </h2>
        <p className="text-gray-600">
          Детали и узлы в группе быстрого поиска
        </p>
      </div>

      {/* Детали */}
      {quickDetail && quickDetail.units ? (
        <div className="space-y-4">
          {quickDetail.units.map((unit) => (
            <div key={unit.unitid} className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{unit.name}</h3>
                  {unit.code && (
                    <p className="text-sm text-gray-500">Код: {unit.code}</p>
                  )}
                </div>
                {unit.unitid && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ID: {unit.unitid}
                  </span>
                )}
              </div>

              {unit.details && unit.details.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Детали:</h4>
                  <div className="space-y-3">
                    {unit.details.map((detail) => (
                      <div key={detail.detailid} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{detail.name}</h5>
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">OEM:</span> {detail.oem}
                            </p>
                            {detail.brand && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Бренд:</span> {detail.brand}
                              </p>
                            )}
                            {detail.note && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Примечание:</span> {detail.note}
                              </p>
                            )}
                          </div>
                          
                          {detail.attributes && detail.attributes.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {detail.attributes.map((attr, index) => (
                                <p key={index} className="text-xs text-gray-500">
                                  <span className="font-medium">{attr.name || attr.key}:</span> {attr.value}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-800 ml-4">
                          {detail.detailid}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 6v2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Нет доступных деталей</h3>
          <p className="mt-1 text-sm text-gray-500">
            В данной группе не найдено деталей или узлов.
          </p>
        </div>
      )}
    </div>
  );
};

const QuickGroupsSection: React.FC<QuickGroupsSectionProps> = ({
  catalogCode,
  vehicleId,
  ssd
}) => {
  const [selectedGroup, setSelectedGroup] = useState<LaximoQuickGroup | null>(null);

  // Получаем список групп быстрого поиска
  const { data: quickGroupsData, loading: quickGroupsLoading, error: quickGroupsError } = useQuery<{ laximoQuickGroups: LaximoQuickGroup[] }>(
    GET_LAXIMO_QUICK_GROUPS,
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

  const handleGroupClick = (group: LaximoQuickGroup) => {
    if (!ssd || ssd.trim() === '') {
      alert('Ошибка: Для поиска деталей необходимы данные автомобиля (SSD). Пожалуйста, выберите автомобиль заново.');
      return;
    }
    
    console.log('🔍 Открываем детали группы быстрого поиска:', group.quickgroupid);
    setSelectedGroup(group);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  // Если выбрана группа для просмотра деталей
  if (selectedGroup && ssd) {
    return (
      <QuickDetailSection
        catalogCode={catalogCode}
        vehicleId={vehicleId}
        selectedGroup={selectedGroup}
        ssd={ssd}
        onBack={handleBackToGroups}
      />
    );
  }

  if (quickGroupsLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quickGroupsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Ошибка загрузки групп быстрого поиска
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Не удалось загрузить группы быстрого поиска для данного автомобиля.</p>
              <p className="mt-1">Ошибка: {quickGroupsError.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const quickGroups = quickGroupsData?.laximoQuickGroups || [];

  if (quickGroups.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Группы быстрого поиска недоступны</h3>
        <p className="mt-1 text-sm text-gray-500">
          Для данного автомобиля не найдено групп быстрого поиска.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Группы быстрого поиска
        </h2>
        <p className="text-gray-600 text-sm">
          Выберите группу для поиска запчастей. Доступны только группы с активным поиском деталей.
        </p>
      </div>

      <div className="space-y-3">
        {quickGroups.map((group) => (
          <QuickGroupItem
            key={group.quickgroupid}
            group={group}
            level={0}
            onGroupClick={handleGroupClick}
          />
        ))}
      </div>

      {/* Информационная панель */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Информация о группах быстрого поиска
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Зеленая метка "Доступен поиск" указывает на возможность поиска деталей в группе</li>
                <li>Группы без метки служат для организации структуры каталога</li>
                <li>Нажмите на группу с активным поиском для просмотра деталей</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGroupsSection; 