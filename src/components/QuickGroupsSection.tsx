import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_QUICK_GROUPS, GET_LAXIMO_QUICK_DETAIL } from '@/lib/graphql';
import { LaximoQuickGroup, LaximoQuickDetail } from '@/types/laximo';

interface QuickGroupsSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd?: string;
}

const QuickGroupsSection: React.FC<QuickGroupsSectionProps> = ({
  catalogCode,
  vehicleId,
  ssd
}) => {
  const [selectedGroup, setSelectedGroup] = useState<LaximoQuickGroup | null>(null);
  const [groupHierarchy, setGroupHierarchy] = useState<LaximoQuickGroup[]>([]);

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
      errorPolicy: 'all',
      onCompleted: (data) => {
        console.log('🔍 Получены данные QuickGroups:', data);
        if (data.laximoQuickGroups) {
          console.log('📊 Структура групп:');
          data.laximoQuickGroups.forEach((group, index) => {
            console.log(`  [${index}] ${group.name} (ID: ${group.quickgroupid}, Link: ${group.link})`);
            if (group.children && group.children.length > 0) {
              console.log(`    └─ Дочерних групп: ${group.children.length}`);
              group.children.forEach((child, childIndex) => {
                console.log(`       [${childIndex}] ${child.name} (ID: ${child.quickgroupid}, Link: ${child.link})`);
              });
            }
          });
        }
      }
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

  // Функция для получения текущих групп для отображения
  const getCurrentGroups = (): LaximoQuickGroup[] => {
    const allGroups = quickGroupsData?.laximoQuickGroups || [];
    
    console.log('🔍 getCurrentGroups вызвана. Всего групп:', allGroups.length);
    console.log('📊 Иерархия групп:', groupHierarchy.length, 'уровней');
    
    if (groupHierarchy.length === 0) {
      // Ищем главную группу "Легковые автомобили (NEW)" с ID=0
      console.log('🔍 Поиск главной группы "Легковые автомобили (NEW)" с ID=0...');
      
      const mainGroup = allGroups.find(group => 
        group.quickgroupid === '0' && 
        group.name.includes('Легковые автомобили')
      );
      
      if (mainGroup && mainGroup.children && mainGroup.children.length > 0) {
        console.log(`✅ Найдена главная группа "${mainGroup.name}" с ${mainGroup.children.length} дочерними элементами:`);
        mainGroup.children.forEach((child, index) => {
          console.log(`  [${index}] ${child.name} (ID: ${child.quickgroupid}, Link: ${child.link}, Children: ${child.children?.length || 0})`);
        });
        return mainGroup.children;
      } else {
        console.log('❌ Главная группа "Легковые автомобили (NEW)" не найдена или у неё нет дочерних элементов');
        console.log('🔄 Пробуем альтернативный поиск основных систем...');
        
                 // Маппинг требуемых категорий к точным названиям из логов backend
         const systemMapping: Record<string, string | string[]> = {
           // Требуемое название -> точное название из backend
           'Детали для ТО': 'Детали для сервиса / проверки / ухода',  // ID: 10119
           'Двигатель': 'Двигатель',                                   // ID: 10102  
           'Топливная система': 'Система подачи топлива',              // ID: 10314
           'Система охлаждения': 'Система охлаждения',                 // ID: 10107
           'Система выпуска': 'Система выпуска',                       // ID: 10104
           'Трансмиссия': ['Коробка передач', 'Автоматическая коробка передач', 'Система сцепления / навесные части'], // ID: 10338, 10340, 10150
           'Ходовая часть': ['Подвеска / амортизация', 'Подвеска оси / система подвески / колеса'], // ID: 10111, 10113
           'Рулевое управление': 'Рулевое управление',                 // ID: 10112
           'Тормозная система': 'Тормозная система',                   // ID: 10106
           'Электрооборудование': ['Электрика', 'Система зажигания / накаливания'], // ID: 10110, 10108
           'Отопление / кондиционирование': ['Отопление / вентиляция', 'Кондиционер'], // ID: 10341, 10343
           'Детали салона': 'Внутренняя отделка',                      // ID: 10441
           'Детали кузова': ['Детали кузова/крыло/бампер', 'Легковые автомобили'],   // Из логов
           'Дополнительное оборудование': ['Система очистки окон', 'Прицепное оборудование / комплектующие', 'Дополнительные удобства'] // ID: 10118, 10115, 10435
         };
        
        // Все возможные точные названия групп из backend логов
        const allExpectedGroups = [
          'Детали для сервиса / проверки / ухода',
          'Двигатель',
          'Система подачи топлива',
          'Система охлаждения', 
          'Система выпуска',
          'Коробка передач',
          'Автоматическая коробка передач',
          'Система сцепления / навесные части',
          'Подвеска / амортизация',
          'Подвеска оси / система подвески / колеса',
          'Рулевое управление',
          'Тормозная система',
          'Электрика',
          'Система зажигания / накаливания',
          'Отопление / вентиляция',
          'Кондиционер',
          'Внутренняя отделка',
          'Детали кузова/крыло/бампер',
          'Кузов',
          'Система очистки окон',
          'Прицепное оборудование / комплектующие',
          'Дополнительные удобства',
          'Фильтр',
          'Ременный привод',
          'Привод колеса',
          'Главная передача',
          'Система безопасности'
        ];
        
        // Функция для создания виртуальных категорий
        const createVirtualCategories = (): LaximoQuickGroup[] => {
          const virtualCategories: LaximoQuickGroup[] = [];
          
          // Требуемый порядок категорий
          const requiredCategories = [
            'Детали для ТО',
            'Двигатель', 
            'Топливная система',
            'Система охлаждения',
            'Система выпуска',
            'Трансмиссия',
            'Ходовая часть',
            'Рулевое управление',
            'Тормозная система',
            'Электрооборудование',
            'Отопление / кондиционирование',
            'Детали салона',
            'Детали кузова',
            'Дополнительное оборудование'
          ];
          
          requiredCategories.forEach((categoryName, index) => {
            const mappedNames = systemMapping[categoryName];
            const matchingGroups: LaximoQuickGroup[] = [];
            
            // Ищем соответствующие группы в backend данных
            if (Array.isArray(mappedNames)) {
              mappedNames.forEach(mappedName => {
                const found = allGroups.find(group => group.name === mappedName);
                if (found) {
                  matchingGroups.push(found);
                  console.log(`🎯 Найдена группа для "${categoryName}": "${found.name}" (ID: ${found.quickgroupid})`);
                }
              });
            } else {
              const found = allGroups.find(group => group.name === mappedNames);
              if (found) {
                matchingGroups.push(found);
                console.log(`🎯 Найдена группа для "${categoryName}": "${found.name}" (ID: ${found.quickgroupid})`);
              }
            }
            
            if (matchingGroups.length > 0) {
              // Создаем виртуальную категорию
              const virtualCategory: LaximoQuickGroup = {
                quickgroupid: `virtual_${index}`,
                name: categoryName,
                link: false,
                children: matchingGroups.length === 1 ? matchingGroups[0].children : matchingGroups.flatMap(g => g.children || [])
              };
              
              virtualCategories.push(virtualCategory);
              console.log(`✅ Создана виртуальная категория: "${categoryName}" с ${virtualCategory.children?.length || 0} элементами`);
            } else {
              console.log(`❌ Не найдены группы для категории: "${categoryName}"`);
            }
          });
          
          return virtualCategories;
        };
        
        const foundSystems = createVirtualCategories();
        
        if (foundSystems.length > 0) {
          console.log(`✅ Создано ${foundSystems.length} виртуальных категорий:`);
          
          foundSystems.forEach((system, index) => {
            console.log(`  [${index}] ${system.name} (ID: ${system.quickgroupid}, Link: ${system.link}, Children: ${system.children?.length || 0})`);
          });
          
          return foundSystems;
        } else {
          console.log('❌ Основные системы не найдены, показываем все группы с наибольшим количеством дочерних элементов');
          
          // В крайнем случае показываем группы с наибольшим количеством дочерних элементов
          const groupsWithChildren = allGroups.filter(group => 
            group.children && group.children.length > 0
          ).sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0));
          
          const topGroups = groupsWithChildren.slice(0, 15);
          console.log(`📋 Показываем топ-${topGroups.length} групп с дочерними элементами:`);
          topGroups.forEach((group, index) => {
            console.log(`  [${index}] ${group.name} (ID: ${group.quickgroupid}, Children: ${group.children?.length || 0})`);
          });
          
          return topGroups;
        }
      }
    } else {
      // Показываем дочерние группы последней выбранной группы
      const lastGroup = groupHierarchy[groupHierarchy.length - 1];
      console.log('📂 Показываем дочерние группы для:', lastGroup.name);
      console.log('📊 Дочерних групп:', lastGroup.children?.length || 0);
      
      if (lastGroup.children) {
        lastGroup.children.forEach((child, index) => {
          console.log(`  [${index}] ${child.name} (ID: ${child.quickgroupid}, Link: ${child.link})`);
        });
      }
      
      return lastGroup.children || [];
    }
  };

  const handleGroupClick = (group: LaximoQuickGroup) => {
    console.log('🔍 Клик по группе:', group.name, 'Link:', group.link, 'Children:', group.children?.length);
    
    // Если это виртуальная категория, показываем её дочерние элементы
    if (group.quickgroupid.startsWith('virtual_')) {
      console.log('🔍 Переходим в виртуальную категорию:', group.name);
      setGroupHierarchy(prev => [...prev, group]);
      return;
    }
    
    if (group.link) {
      // Это конечная группа с поиском - показываем детали
      console.log('🔍 Выбрана группа быстрого поиска для поиска:', group.name, 'ID:', group.quickgroupid);
      setSelectedGroup(group);
    } else if (group.children && group.children.length > 0) {
      // Это группа с подгруппами - добавляем в иерархию
      console.log('🔍 Переходим в подгруппы:', group.name);
      setGroupHierarchy(prev => [...prev, group]);
    }
  };

  const handleBackToLevel = (index: number) => {
    // Возвращаемся к уровню с индексом index
    setGroupHierarchy(prev => prev.slice(0, index + 1));
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  // Если выбрана группа для поиска, показываем детали
  if (selectedGroup) {
    return (
      <div className="flex h-full">
        {/* Левая боковая панель с группами */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleBackToGroups}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к группам
            </button>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              {selectedGroup.name}
            </h3>
            <p className="text-sm text-gray-600">
              Результаты поиска в выбранной группе
            </p>
          </div>
        </div>

        {/* Основная область с результатами */}
        <div className="flex-1 p-6">
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Детали в группе "{selectedGroup.name}"
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Найдено узлов: {quickDetailData.laximoQuickDetail.units?.length || 0}
              </p>

              <div className="space-y-6">
                {quickDetailData.laximoQuickDetail.units?.map((unit, unitIndex) => (
                  <div key={`${unit.unitid || 'unit'}-${unitIndex}`} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{unit.name}</h4>
                    {unit.code && (
                      <p className="text-sm text-gray-500 mb-4">Код: {unit.code}</p>
                    )}
                    
                    {unit.details && unit.details.length > 0 && (
                      <div className="space-y-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Детали:</h5>
                        <div className="grid gap-3">
                          {unit.details.map((detail, detailIndex) => (
                            <div key={`${detail.detailid || 'detail'}-${detailIndex}`} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                              <p className="font-medium text-gray-900 mb-2">{detail.name}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {detail.oem && (
                                  <span>OEM: <span className="font-mono">{detail.oem}</span></span>
                                )}
                                {detail.brand && (
                                  <span>Бренд: <span className="font-medium">{detail.brand}</span></span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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

  const allQuickGroups = quickGroupsData?.laximoQuickGroups || [];
  const currentGroups = getCurrentGroups();

  if (allQuickGroups.length === 0) {
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
    <div className="flex h-full min-h-[600px]">
      {/* Левая боковая панель с группами */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Заголовок панели */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Группы</h3>
          <p className="text-sm text-gray-600 mt-1">
            Быстрый поиск категорий
          </p>
        </div>

        {/* Отладочная информация */}
        <div className="p-3 border-b border-gray-200 bg-yellow-50">
          <details className="text-xs">
            <summary className="cursor-pointer text-yellow-800 font-medium">🔧 Отладка (всего групп: {allQuickGroups.length})</summary>
            <div className="mt-2 space-y-1 text-yellow-700">
              <div>Показываем: {currentGroups.length} групп</div>
              <div>Иерархия: {groupHierarchy.length} уровней</div>
              {allQuickGroups.length > 0 && (
                <div className="text-xs">
                  Корневые группы: {allQuickGroups.map(g => `"${g.name}" (${g.quickgroupid})`).join(', ')}
                </div>
              )}
            </div>
          </details>
        </div>

        {/* Хлебные крошки навигации */}
        {groupHierarchy.length > 0 && (
          <div className="p-3 border-b border-gray-200 bg-blue-50">
            <nav className="flex items-center space-x-1 text-sm text-gray-600">
              <button
                onClick={() => setGroupHierarchy([])}
                className="hover:text-red-600 transition-colors"
              >
                Главная
              </button>
              {groupHierarchy.map((group, index) => (
                <React.Fragment key={group.quickgroupid}>
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <button
                    onClick={() => handleBackToLevel(index)}
                    className="hover:text-red-600 transition-colors truncate max-w-24"
                    title={group.name}
                  >
                    {group.name}
                  </button>
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}

        {/* Список групп */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <div className="space-y-1">
              {currentGroups.map((group) => (
                <button
                  key={group.quickgroupid}
                  onClick={() => handleGroupClick(group)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-red-50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {group.link ? (
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                        <span className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-700">
                          {group.name}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 ml-6">
                        ID: {group.quickgroupid} • {group.children?.length || 0} подгрупп
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Кнопка "Назад" если мы не на верхнем уровне */}
        {groupHierarchy.length > 0 && (
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => setGroupHierarchy(prev => prev.slice(0, -1))}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к предыдущему уровню
            </button>
          </div>
        )}
      </div>

      {/* Правая область с полем поиска */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Быстрый поиск категорий
          </h2>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Быстрый поиск категорий"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Выберите группу из списка слева
              </h3>
              <p className="text-gray-600">
                Кликните на любую группу в левой панели, чтобы перейти к подгруппам или начать поиск деталей
              </p>
              {currentGroups.length > 0 && (
                <div className="mt-4 text-sm text-gray-500">
                  Доступно групп: {currentGroups.length}
                </div>
              )}
            </div>
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
                  Навигация по группам
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  🔍 Зеленые иконки - группы с поиском деталей<br/>
                  ➡️ Синие иконки - группы с подкатегориями<br/>
                  Используйте хлебные крошки для быстрого перехода между уровнями.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGroupsSection; 