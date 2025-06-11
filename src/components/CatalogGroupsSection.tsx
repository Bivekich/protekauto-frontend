import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_QUICK_GROUPS, GET_LAXIMO_CATEGORIES, GET_LAXIMO_UNITS } from '@/lib/graphql';
import { LaximoQuickGroup } from '@/types/laximo';
import GroupDetailsSection from './GroupDetailsSection';

interface CatalogGroupsSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd?: string;
}

interface GroupItemProps {
  group: LaximoQuickGroup;
  level: number;
  onGroupClick: (group: LaximoQuickGroup) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ group, level, onGroupClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = group.children && group.children.length > 0;
  const canSearch = group.link;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    if (canSearch) {
      onGroupClick(group);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-label={`${group.name}${hasChildren ? (isExpanded ? ' (развернуто)' : ' (свернуто)') : ''}${canSearch ? ' (доступен поиск)' : ''}`}
        className={`
          flex items-center justify-between py-3 px-4 cursor-pointer transition-colors
          ${level > 0 ? `ml-${level * 4}` : ''}
          ${canSearch 
            ? 'hover:bg-blue-50 focus:bg-blue-50 text-blue-900' 
            : 'hover:bg-gray-50 focus:bg-gray-50 text-gray-600'
          }
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset
        `}
      >
        <div className="flex items-center space-x-3">
          {hasChildren && (
            <div className="flex-shrink-0">
              <svg 
                className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
          
          <div className={`flex items-center space-x-2 ${!hasChildren ? 'ml-7' : ''}`}>
            {canSearch ? (
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            )}
            
            <span className={`text-sm font-medium ${canSearch ? 'text-blue-900' : 'text-gray-700'}`}>
              {group.name}
            </span>
          </div>
        </div>

        {canSearch && (
          <div className="flex-shrink-0">
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              Поиск
            </span>
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="bg-gray-50 border-l-2 border-gray-200 ml-4">
          {group.children!.map((child) => (
            <GroupItem
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

type CatalogType = 'quickGroups' | 'categories' | 'units';

const CatalogGroupsSection: React.FC<CatalogGroupsSectionProps> = ({ 
  catalogCode, 
  vehicleId, 
  ssd 
}) => {
  const [catalogType, setCatalogType] = useState<CatalogType>('quickGroups');
  const [selectedGroup, setSelectedGroup] = useState<{ group: LaximoQuickGroup; type: CatalogType } | null>(null);

  // Запросы для разных типов каталогов
  const { data: quickGroupsData, loading: quickGroupsLoading, error: quickGroupsError } = useQuery<{ laximoQuickGroups: LaximoQuickGroup[] }>(
    GET_LAXIMO_QUICK_GROUPS,
    {
      variables: {
        catalogCode,
        vehicleId,
        ...(ssd && ssd.trim() !== '' && { ssd })
      },
      skip: !catalogCode || !vehicleId || catalogType !== 'quickGroups',
      errorPolicy: 'all'
    }
  );

  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery<{ laximoCategories: LaximoQuickGroup[] }>(
    GET_LAXIMO_CATEGORIES,
    {
      variables: { 
        catalogCode,
        ...(vehicleId && { vehicleId }),
        ...(ssd && ssd.trim() !== '' && { ssd })
      },
      skip: !catalogCode || catalogType !== 'categories',
      errorPolicy: 'all'
    }
  );

  const { data: unitsData, loading: unitsLoading, error: unitsError } = useQuery<{ laximoUnits: LaximoQuickGroup[] }>(
    GET_LAXIMO_UNITS,
    {
      variables: {
        catalogCode,
        ...(vehicleId && { vehicleId }),
        ...(ssd && ssd.trim() !== '' && { ssd })
      },
      skip: !catalogCode || catalogType !== 'units',
      errorPolicy: 'all'
    }
  );

  const handleGroupClick = (group: LaximoQuickGroup) => {
    if (!group.link) return;
    
    console.log('🔍 Выбрана группа для поиска:', group);
    console.log('📂 Тип каталога:', catalogType);
    
    // Для групп быстрого поиска переходим к деталям
    if (catalogType === 'quickGroups' && ssd && ssd.trim() !== '') {
      setSelectedGroup({ group, type: catalogType });
    } else {
      // Для других типов каталогов пока показываем alert
      alert(`Поиск запчастей в группе: ${group.name}\nID группы: ${group.quickgroupid}\nТип каталога: ${catalogType}`);
    }
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  // Определяем текущие данные на основе выбранного типа
  let currentData: LaximoQuickGroup[] = [];
  let loading = false;
  let error = null;

  switch (catalogType) {
    case 'quickGroups':
      currentData = quickGroupsData?.laximoQuickGroups || [];
      loading = quickGroupsLoading;
      error = quickGroupsError;
      break;
    case 'categories':
      currentData = categoriesData?.laximoCategories || [];
      loading = categoriesLoading;
      error = categoriesError;
      break;
    case 'units':
      currentData = unitsData?.laximoUnits || [];
      loading = unitsLoading;
      error = unitsError;
      break;
  }

  const getCatalogTypeTitle = (type: CatalogType): string => {
    switch (type) {
      case 'quickGroups':
        return 'Группы быстрого поиска';
      case 'categories':
        return 'Категории оригинального каталога';
      case 'units':
        return 'Узлы каталога';
    }
  };

  const getCatalogTypeDescription = (type: CatalogType): string => {
    switch (type) {
      case 'quickGroups':
        return 'Быстрый поиск по предустановленным группам запчастей для конкретного автомобиля';
      case 'categories':
        return 'Оригинальные категории каталога производителя';
      case 'units':
        return 'Структура узлов и агрегатов автомобиля';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Загружаем {getCatalogTypeTitle(catalogType).toLowerCase()}...</p>
      </div>
    );
  }

  if (error) {
    console.error(`Ошибка загрузки ${catalogType}:`, error);
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-600 font-medium">Ошибка загрузки {getCatalogTypeTitle(catalogType).toLowerCase()}</p>
        <p className="text-gray-500 text-sm mt-1">Попробуйте обновить страницу или выбрать другой тип каталога</p>
      </div>
    );
  }

  // Если выбрана группа для просмотра деталей
  if (selectedGroup && selectedGroup.type === 'quickGroups') {
    return (
      <GroupDetailsSection
        catalogCode={catalogCode}
        vehicleId={vehicleId}
        quickGroupId={selectedGroup.group.quickgroupid}
        groupName={selectedGroup.group.name}
        ssd={ssd!}
        onBack={handleBackToGroups}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Переключатель типов каталогов */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Каталог запчастей</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCatalogType('quickGroups')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              catalogType === 'quickGroups'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Быстрый поиск
          </button>
          <button
            onClick={() => setCatalogType('categories')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              catalogType === 'categories'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Оригинальный каталог
          </button>
          <button
            onClick={() => setCatalogType('units')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              catalogType === 'units'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Узлы автомобиля
          </button>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">{getCatalogTypeTitle(catalogType)}</h4>
              <p className="text-sm text-blue-700 mt-1">{getCatalogTypeDescription(catalogType)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Список групп */}
      {currentData.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">{getCatalogTypeTitle(catalogType)} недоступны</p>
          <p className="text-gray-400 text-sm mt-1">Для данного автомобиля нет доступных групп этого типа</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {currentData.map((group) => (
              <GroupItem
                key={`${catalogType}-${group.quickgroupid}`}
                group={group}
                level={0}
                onGroupClick={handleGroupClick}
              />
            ))}
          </div>
          <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-t">
            Найдено {currentData.length} {currentData.length === 1 ? 'группа' : 'групп'}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogGroupsSection; 