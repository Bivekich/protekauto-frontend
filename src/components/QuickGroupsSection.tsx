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
  const canSearch = group.link;

  const handleClick = () => {
    if (canSearch) {
      onGroupClick(group);
    } else if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-4 border-l border-gray-200 pl-4' : ''}`}>
      <button
        onClick={handleClick}
        className={`
          w-full text-left p-3 rounded-lg border transition-all duration-200
          ${canSearch 
            ? 'border-gray-200 hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500' 
            : hasChildren 
              ? 'border-gray-100 hover:bg-gray-50' 
              : 'border-gray-100 bg-gray-50 cursor-not-allowed'
          }
        `}
        disabled={!canSearch && !hasChildren}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {hasChildren && (
              <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
            <div>
              <h4 className={`font-medium ${canSearch ? 'text-gray-900' : 'text-gray-500'}`}>
                {group.name}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                ID: {group.quickgroupid}
                {canSearch && ' • Доступен поиск'}
                {!canSearch && hasChildren && ' • Содержит подгруппы'}
                {!canSearch && !hasChildren && ' • Недоступен'}
              </p>
            </div>
          </div>
          
          {canSearch && (
            <div className="text-red-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>
      </button>

      {/* Дочерние группы */}
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2">
          {group.children!.map((child) => (
            <QuickGroupItem
              key={child.quickgroupid}
              group={child}
              level={level + 1}
              onGroupClick={onGroupClick}
            />
          ))}
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

  // Получаем детали выбранной группы
  const { data: quickDetailData, loading: quickDetailLoading, error: quickDetailError } = useQuery<{ laximoQuickDetail: LaximoQuickDetail }>(
    GET_LAXIMO_QUICK_DETAIL,
    {
      variables: {
        catalogCode,
        vehicleId,
        quickGroupId: selectedGroup?.quickgroupid || '',
        ssd: ssd || ''
      },
      skip: !selectedGroup || !ssd,
      errorPolicy: 'all'
    }
  );

  const handleGroupClick = (group: LaximoQuickGroup) => {
    console.log('🔍 Выбрана группа быстрого поиска:', group.name, 'ID:', group.quickgroupid);
    setSelectedGroup(group);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  // Если выбрана группа, показываем детали
  if (selectedGroup) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToGroups}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к группам
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            {selectedGroup.name}
          </h3>
        </div>

        {quickDetailLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загружаем детали группы...</p>
          </div>
        )}

        {quickDetailError && (
          <div className="text-center py-8">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки деталей</h3>
            <p className="text-gray-600 mb-4">Не удалось загрузить детали группы</p>
            <p className="text-sm text-gray-500">
              {quickDetailError.message}
            </p>
          </div>
        )}

        {quickDetailData?.laximoQuickDetail && (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Найдено узлов: {quickDetailData.laximoQuickDetail.units?.length || 0}
            </p>

            {quickDetailData.laximoQuickDetail.units?.map((unit, unitIndex) => (
              <div key={`${unit.unitid || 'unit'}-${unitIndex}`} className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{unit.name}</h4>
                {unit.code && (
                  <p className="text-sm text-gray-500 mb-3">Код: {unit.code}</p>
                )}
                
                {unit.details && unit.details.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">Детали:</h5>
                    {unit.details.map((detail, detailIndex) => (
                      <div key={`${detail.detailid || 'detail'}-${detailIndex}`} className="bg-gray-50 rounded p-3">
                        <p className="font-medium text-gray-900">{detail.name}</p>
                        {detail.oem && (
                          <p className="text-sm text-gray-600">OEM: {detail.oem}</p>
                        )}
                        {detail.brand && (
                          <p className="text-sm text-gray-600">Бренд: {detail.brand}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (quickGroupsLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Загружаем группы быстрого поиска...</p>
      </div>
    );
  }

  if (quickGroupsError) {
    console.error('Ошибка загрузки групп быстрого поиска:', quickGroupsError);
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки групп</h3>
        <p className="text-gray-600 mb-4">Не удалось загрузить группы быстрого поиска</p>
        <p className="text-sm text-gray-500">
          {quickGroupsError.message}
        </p>
      </div>
    );
  }

  const quickGroups = quickGroupsData?.laximoQuickGroups || [];

  if (quickGroups.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Группы быстрого поиска недоступны</h3>
        <p className="text-gray-600">
          Для данного автомобиля группы быстрого поиска не найдены
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Найдено групп: {quickGroups.length}. Выберите группу для поиска запчастей.
      </p>

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

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-900">
              О группах быстрого поиска
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Группы быстрого поиска - это иерархическая структура каталога, позволяющая быстро найти нужные запчасти. 
              Только группы с пометкой "Доступен поиск" содержат детали для просмотра.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGroupsSection; 