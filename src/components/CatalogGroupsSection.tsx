import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_QUICK_GROUPS, GET_LAXIMO_CATEGORIES, GET_LAXIMO_UNITS } from '@/lib/graphql';
import { LaximoQuickGroup } from '@/types/laximo';
import GroupDetailsSection from './GroupDetailsSection';
import { mapToStandardCategories, getStaticCategories } from '@/lib/laximo-categories';

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

  const handleClick = () => {
    if (group.children && group.children.length > 0) {
      setIsExpanded(!isExpanded);
    } else if (group.link) {
      onGroupClick(group);
    }
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div 
        className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${group.link ? 'text-blue-600' : ''}`}
        onClick={handleClick}
      >
        {group.children && group.children.length > 0 && (
          <span className="mr-2">{isExpanded ? '▼' : '▶'}</span>
        )}
        <span>{group.name}</span>
      </div>
      {isExpanded && group.children && (
        <div>
          {group.children.map((child, index) => (
            <GroupItem
              key={child.quickgroupid || index}
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

type CatalogType = 'quickGroups' | 'categories' | 'units' | 'standardCategories';

const CatalogGroupsSection: React.FC<CatalogGroupsSectionProps> = ({ 
  catalogCode, 
  vehicleId, 
  ssd 
}) => {
  // По умолчанию используем стандартные категории
  const [catalogType, setCatalogType] = useState<CatalogType>('standardCategories');
  const [selectedGroup, setSelectedGroup] = useState<{ group: LaximoQuickGroup; type: CatalogType } | null>(null);
  const [standardCategories, setStandardCategories] = useState<LaximoQuickGroup[]>([]);

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

  // Запрос для стандартных категорий (используем тот же запрос, что и для обычных категорий)
  const { data: standardCategoriesData, loading: standardCategoriesLoading, error: standardCategoriesError } = useQuery<{ laximoCategories: LaximoQuickGroup[] }>(
    GET_LAXIMO_CATEGORIES,
    {
      variables: { 
        catalogCode,
        ...(vehicleId && { vehicleId }),
        ...(ssd && ssd.trim() !== '' && { ssd })
      },
      skip: !catalogCode || catalogType !== 'standardCategories',
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

  // Обработка данных для стандартных категорий
  useEffect(() => {
    if (standardCategoriesData?.laximoCategories) {
      const mappedCategories = mapToStandardCategories(standardCategoriesData.laximoCategories);
      setStandardCategories(mappedCategories.length > 0 ? mappedCategories : getStaticCategories());
    } else if (standardCategoriesError) {
      console.warn('Ошибка загрузки категорий, используем статические данные:', standardCategoriesError.message);
      setStandardCategories(getStaticCategories());
    }
  }, [standardCategoriesData, standardCategoriesError]);

  const handleGroupClick = (group: LaximoQuickGroup) => {
    if (!group.link) return;
    
    console.log('🔍 Выбрана группа для поиска:', group);
    console.log('📂 Тип каталога:', catalogType);
    
    // Для групп быстрого поиска переходим к деталям
    if ((catalogType === 'quickGroups' || catalogType === 'standardCategories') && ssd && ssd.trim() !== '') {
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
    case 'standardCategories':
      currentData = standardCategories;
      loading = standardCategoriesLoading && standardCategories.length === 0;
      error = standardCategoriesError;
      break;
  }

  // Получаем заголовок для выбранного типа каталога
  let catalogTypeTitle = '';
  if (catalogType === 'quickGroups') {
    catalogTypeTitle = 'Группы быстрого поиска';
  } else if (catalogType === 'categories') {
    catalogTypeTitle = 'Категории оригинального каталога';
  } else if (catalogType === 'units') {
    catalogTypeTitle = 'Узлы каталога';
  } else if (catalogType === 'standardCategories') {
    catalogTypeTitle = 'Группы запчастей';
  }

  if (selectedGroup) {
    return (
      <GroupDetailsSection
        catalogCode={catalogCode}
        vehicleId={vehicleId}
        quickGroupId={selectedGroup.group.quickgroupid}
        groupName={selectedGroup.group.name}
        ssd={ssd || ''}
        onBack={handleBackToGroups}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setCatalogType('standardCategories')}
          className={`px-4 py-2 rounded ${
            catalogType === 'standardCategories' ? 'bg-red-600 text-white' : 'bg-gray-200'
          }`}
        >
          Группы запчастей
        </button>
        <button
          onClick={() => setCatalogType('categories')}
          className={`px-4 py-2 rounded ${
            catalogType === 'categories' ? 'bg-red-600 text-white' : 'bg-gray-200'
          }`}
        >
          Категории каталога
        </button>
        <button
          onClick={() => setCatalogType('quickGroups')}
          className={`px-4 py-2 rounded ${
            catalogType === 'quickGroups' ? 'bg-red-600 text-white' : 'bg-gray-200'
          }`}
        >
          Быстрый поиск
        </button>
        <button
          onClick={() => setCatalogType('units')}
          className={`px-4 py-2 rounded ${
            catalogType === 'units' ? 'bg-red-600 text-white' : 'bg-gray-200'
          }`}
        >
          Узлы
        </button>
      </div>

      <div className="border rounded p-4">
        <h3 className="text-lg font-semibold mb-4">{catalogTypeTitle}</h3>
        
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="ml-2">Загрузка...</span>
          </div>
        )}

        {error && (
          <div className="text-red-600 py-4">
            Ошибка загрузки данных. Попробуйте обновить страницу.
          </div>
        )}

        {!loading && !error && currentData.length === 0 && (
          <div className="text-gray-500 py-4">
            Нет доступных групп для отображения
          </div>
        )}

        {!loading && !error && currentData.length > 0 && (
          <div className="space-y-2">
            {currentData.map((group) => (
              <GroupItem
                key={group.quickgroupid}
                group={group}
                level={0}
                onGroupClick={handleGroupClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogGroupsSection; 