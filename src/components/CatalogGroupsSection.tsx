import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_QUICK_GROUPS, GET_LAXIMO_CATEGORIES, GET_LAXIMO_UNITS, GET_LAXIMO_QUICK_DETAIL } from '@/lib/graphql';
import { LaximoQuickGroup, LaximoQuickDetail } from '@/types/laximo';
import GroupDetailsSection from './GroupDetailsSection';
import { mapToStandardCategories, getStaticCategories, CATEGORY_MAPPING } from '@/lib/laximo-categories';

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

interface PredefinedCategoryDetailsSectionProps {
  catalogCode: string;
  vehicleId: string;
  predefinedCategory: LaximoQuickGroup;
  ssd: string;
  onBack: () => void;
}

const PredefinedCategoryDetailsSection: React.FC<PredefinedCategoryDetailsSectionProps> = ({
  catalogCode,
  vehicleId,
  predefinedCategory,
  ssd,
  onBack
}) => {
  const [selectedChildGroup, setSelectedChildGroup] = useState<LaximoQuickGroup | null>(null);

  const handleChildGroupClick = (child: LaximoQuickGroup) => {
    // Проверяем, что ID дочерней категории является валидным числовым ID Laximo
    if (!/^\d+$/.test(child.quickgroupid)) {
      alert(`Ошибка: ID категории "${child.quickgroupid}" не является валидным ID Laximo.\n\nЭта категория пока не поддерживается для просмотра деталей.\nПопробуйте использовать другие разделы каталога.`);
      return;
    }
    
    setSelectedChildGroup(child);
  };

  if (selectedChildGroup) {
    return (
      <GroupDetailsSection
        catalogCode={catalogCode}
        vehicleId={vehicleId}
        quickGroupId={selectedChildGroup.quickgroupid}
        groupName={selectedChildGroup.name}
        ssd={ssd}
        onBack={() => setSelectedChildGroup(null)}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          ← Назад к группам
        </button>
        <h2 className="text-xl font-semibold">{predefinedCategory.name}</h2>
      </div>

      <div className="border rounded p-4">
        <h3 className="text-lg font-semibold mb-4">Подкатегории</h3>
        
        {predefinedCategory.children && predefinedCategory.children.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {predefinedCategory.children.map((child) => {
              const isValidId = /^\d+$/.test(child.quickgroupid);
              
              return (
                <div
                  key={child.quickgroupid}
                  className={`border border-gray-200 rounded-lg p-4 transition-shadow cursor-pointer ${
                    isValidId 
                      ? 'hover:shadow-md hover:border-blue-300' 
                      : 'opacity-60 cursor-not-allowed bg-gray-50'
                  }`}
                  onClick={() => handleChildGroupClick(child)}
                >
                  <h4 className="font-medium text-gray-900 mb-2">{child.name}</h4>
                  <p className="text-sm text-gray-600">ID: {child.quickgroupid}</p>
                  {isValidId ? (
                    <div className="mt-3 text-blue-600 text-sm font-medium">
                      Посмотреть детали →
                    </div>
                  ) : (
                    <div className="mt-3 text-gray-500 text-sm">
                      Пока недоступно
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>В этой категории пока нет доступных подкатегорий</p>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Совет</h4>
          <p className="text-sm text-blue-800">
            Для поиска деталей в категории "{predefinedCategory.name}" рекомендуем использовать:
          </p>
          <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc">
            <li>Поиск по артикулу (OEM номеру)</li>
            <li>Поиск по названию детали</li>
            <li>Категории оригинального каталога</li>
            <li>Группы быстрого поиска</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const GroupItem: React.FC<GroupItemProps> = ({ group, level, onGroupClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    console.log('🖱️ Клик по элементу группы:', {
      name: group.name,
      quickgroupid: group.quickgroupid,
      link: group.link,
      hasChildren: group.children && group.children.length > 0
    });
    
    // Если у группы есть дети - разворачиваем/сворачиваем
    if (group.children && group.children.length > 0) {
      console.log('📂 Разворачиваем группу с детьми');
      setIsExpanded(!isExpanded);
    } 
    // Если у группы есть ссылка - передаем клик наверх для загрузки деталей
    else if (group.link && group.quickgroupid) {
      console.log('🔗 Переходим к группе с ссылкой');
      onGroupClick(group);
    }
    // Иначе - это группа без ссылки и без детей
    else {
      console.log('⚠️ Группа без ссылки и без детей:', group.name);
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
        {/* Показываем количество дочерних элементов для предопределенных категорий */}
        {group.children && group.children.length > 0 && (
          <span className="ml-auto text-xs text-gray-500">
            ({group.children.length})
          </span>
        )}
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
  const [selectedPredefinedCategory, setSelectedPredefinedCategory] = useState<LaximoQuickGroup | null>(null);
  const [standardCategories, setStandardCategories] = useState<LaximoQuickGroup[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

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
        ...(ssd && ssd.trim() !== '' && { ssd }),
        ...(selectedCategoryId && { categoryId: selectedCategoryId })
      },
      skip: !catalogCode || catalogType !== 'units',
      errorPolicy: 'all'
    }
  );

  // Обработка данных для стандартных категорий
  useEffect(() => {
    console.log('🔄 Обработка данных стандартных категорий...');
    console.log('📊 standardCategoriesData:', standardCategoriesData);
    console.log('❌ standardCategoriesError:', standardCategoriesError);
    
    if (standardCategoriesData?.laximoCategories && standardCategoriesData.laximoCategories.length > 0) {
      console.log('📋 Получены категории от API:', standardCategoriesData.laximoCategories.length, 'категорий');
      console.log('📋 Категории:', standardCategoriesData.laximoCategories.map(c => `${c.name} (ID: ${c.quickgroupid})`));
      
      // Используем ТОЛЬКО реальные категории от API Laximo
      console.log('✅ Используем реальные категории от API Laximo');
      setStandardCategories(standardCategoriesData.laximoCategories);
    } else if (standardCategoriesError) {
      console.warn('❌ Ошибка загрузки категорий:', standardCategoriesError.message);
      console.log('📋 Используем статические категории как fallback');
      setStandardCategories(getStaticCategories());
    } else if (!standardCategoriesLoading) {
      // Только если загрузка завершена и нет данных
      console.log('📋 Нет данных от API, используем статические категории');
      setStandardCategories(getStaticCategories());
    }
    // Если идет загрузка, не устанавливаем никаких данных
  }, [standardCategoriesData, standardCategoriesError, standardCategoriesLoading]);

  const handleGroupClick = (group: LaximoQuickGroup) => {
    console.log('🔍 Клик по группе:', group);
    console.log('📂 Тип каталога:', catalogType);
    
    // Проверяем что группа имеет ссылку и валидный ID
    if (!group.link || !group.quickgroupid) {
      console.warn('⚠️ Группа не имеет ссылки или ID:', group);
      return;
    }
    
    // Проверяем что ID группы не пустой
    if (!group.quickgroupid.trim()) {
      console.error('❌ Пустой ID группы:', group.quickgroupid);
      alert(`Ошибка: Пустой ID группы для группы "${group.name}"`);
      return;
    }
    
    // Для стандартных категорий (реальные категории от API Laximo)
    if (catalogType === 'standardCategories') {
      console.log('🔍 Клик по категории API Laximo:', group.name, 'ID:', group.quickgroupid);
      
      // Для категорий от API нужно получить узлы через ListUnits
      // Переключаемся на вкладку "Узлы" и передаем categoryId
      if (ssd && ssd.trim() !== '') {
        console.log('✅ Переключаемся на узлы категории:', group.quickgroupid);
        // Переключаемся на тип 'units' и сохраняем ID категории
        setCatalogType('units');
        setSelectedCategoryId(group.quickgroupid);
        return;
      } else {
        alert('Ошибка: Для поиска узлов необходимы данные автомобиля (SSD). Пожалуйста, выберите автомобиль заново.');
        return;
      }
    }
    
    // Для групп быстрого поиска, реальных категорий и валидных дочерних категорий переходим к деталям
    if ((catalogType === 'quickGroups' || catalogType === 'categories' || catalogType === 'units' || 
         (catalogType === 'standardCategories' && (!group.children || group.children.length === 0))) && 
        ssd && ssd.trim() !== '') {
      console.log('✅ Переходим к деталям группы:', group.quickgroupid);
      setSelectedGroup({ group, type: catalogType });
    } else if (!ssd || ssd.trim() === '') {
      alert('Ошибка: Для поиска деталей необходимы данные автомобиля (SSD). Пожалуйста, выберите автомобиль заново.');
    } else {
      // Для других типов каталогов пока показываем alert
      alert(`Поиск запчастей в группе: ${group.name}\nID группы: ${group.quickgroupid}\nТип каталога: ${catalogType}`);
    }
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setSelectedPredefinedCategory(null);
  };

  // Сбрасываем selectedCategoryId при переключении типа каталога
  useEffect(() => {
    if (catalogType !== 'units') {
      setSelectedCategoryId(null);
    }
  }, [catalogType]);

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
    if (selectedCategoryId) {
      // Находим название категории
      const selectedCategory = standardCategories.find(cat => cat.quickgroupid === selectedCategoryId);
      catalogTypeTitle = selectedCategory ? `Узлы категории: ${selectedCategory.name}` : 'Узлы категории';
    } else {
      catalogTypeTitle = 'Узлы каталога';
    }
  } else if (catalogType === 'standardCategories') {
    catalogTypeTitle = 'Группы запчастей';
  }

  // Если выбрана предопределенная категория, показываем её подкатегории
  if (selectedPredefinedCategory && ssd) {
    return (
      <PredefinedCategoryDetailsSection
        catalogCode={catalogCode}
        vehicleId={vehicleId}
        predefinedCategory={selectedPredefinedCategory}
        ssd={ssd}
        onBack={handleBackToGroups}
      />
    );
  }

  // Если выбрана группа для просмотра деталей
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{catalogTypeTitle}</h3>
          {catalogType === 'units' && selectedCategoryId && (
            <button
              onClick={() => {
                setCatalogType('standardCategories');
                setSelectedCategoryId(null);
              }}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            >
              ← Назад к категориям
            </button>
          )}
        </div>
        
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
            <div className="mb-4 text-sm text-gray-600">
              Найдено категорий: {currentData.length}
            </div>
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