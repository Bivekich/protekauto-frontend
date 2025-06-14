import { LaximoQuickGroup } from '@/types/laximo';

// Предопределенные категории, аналогичные демо Laximo
export const PREDEFINED_CATEGORIES: LaximoQuickGroup[] = [
  {
    quickgroupid: 'to',
    name: 'Детали для ТО',
    link: true,
    children: []
  },
  {
    quickgroupid: 'engine',
    name: 'Двигатель',
    link: true,
    children: []
  },
  {
    quickgroupid: 'fuel',
    name: 'Топливная система',
    link: true,
    children: []
  },
  {
    quickgroupid: 'cooling',
    name: 'Система охлаждения',
    link: true,
    children: []
  },
  {
    quickgroupid: 'exhaust',
    name: 'Система выпуска',
    link: true,
    children: []
  },
  {
    quickgroupid: 'transmission',
    name: 'Трансмиссия',
    link: true,
    children: []
  },
  {
    quickgroupid: 'chassis',
    name: 'Ходовая часть',
    link: true,
    children: []
  },
  {
    quickgroupid: 'steering',
    name: 'Рулевое управление',
    link: true,
    children: []
  },
  {
    quickgroupid: 'brakes',
    name: 'Тормозная система',
    link: true,
    children: []
  },
  {
    quickgroupid: 'electrical',
    name: 'Электрооборудование',
    link: true,
    children: []
  },
  {
    quickgroupid: 'climate',
    name: 'Отопление / кондиционирование',
    link: true,
    children: []
  },
  {
    quickgroupid: 'interior',
    name: 'Детали салона',
    link: true,
    children: []
  },
  {
    quickgroupid: 'body',
    name: 'Детали кузова',
    link: true,
    children: []
  },
  {
    quickgroupid: 'accessories',
    name: 'Дополнительное оборудование',
    link: true,
    children: []
  }
];

// Соответствие между предопределенными категориями и реальными категориями Laximo
export const CATEGORY_MAPPING: Record<string, string[]> = {
  'to': ['10119', '10698', '10697'], // Детали для ТО
  'engine': ['10101', '10102', '10103', '10104', '10105', '10107'], // Двигатель
  'fuel': ['10109'], // Топливная система
  'cooling': ['10117'], // Система охлаждения
  'exhaust': ['10115'], // Система выпуска
  'transmission': ['10114', '10500', '10515', '10171'], // Трансмиссия
  'chassis': ['10111', '10113', '10306', '10307', '10310', '10311', '10312', '10313'], // Ходовая часть
  'steering': ['10112', '10297', '10298', '10299', '10301', '10302'], // Рулевое управление
  'brakes': ['10106', '10127', '10130', '10132', '10135', '10136', '10125', '10126'], // Тормозная система
  'electrical': ['10110', '10141', '10142', '10143', '10108'], // Электрооборудование
  'climate': ['10341', '10343'], // Отопление / кондиционирование
  'interior': ['10441', '10833'], // Детали салона
  'body': ['10785', '10517'], // Детали кузова
  'accessories': ['10443', '10118', '10435', '13199'] // Дополнительное оборудование
};

/**
 * Группирует категории Laximo по предопределенным категориям
 */
export function mapToStandardCategories(laximoCategories: LaximoQuickGroup[]): LaximoQuickGroup[] {
  console.log('🗂️ Начинаем сопоставление категорий Laximo с предопределенными');
  console.log('📋 Входные категории Laximo:', laximoCategories.length);
  console.log('📋 Первые 5 категорий:', laximoCategories.slice(0, 5));
  
  // Создаем копию предопределенных категорий
  const standardCategories = JSON.parse(JSON.stringify(PREDEFINED_CATEGORIES)) as LaximoQuickGroup[];
  console.log('📋 Предопределенные категории:', standardCategories.length);
  
  // Проходим по всем категориям Laximo
  laximoCategories.forEach(category => {
    console.log(`🔍 Обрабатываем категорию: ${category.name} (ID: ${category.quickgroupid})`);
    
    // Ищем, к какой предопределенной категории относится текущая
    for (const [predefinedId, mappedIds] of Object.entries(CATEGORY_MAPPING)) {
      if (mappedIds.includes(category.quickgroupid)) {
        console.log(`✅ Найдено соответствие: ${category.quickgroupid} -> ${predefinedId}`);
        
        // Находим соответствующую предопределенную категорию
        const predefinedCategory = standardCategories.find(c => c.quickgroupid === predefinedId);
        
        if (predefinedCategory) {
          // Добавляем текущую категорию как дочернюю к предопределенной
          if (!predefinedCategory.children) {
            predefinedCategory.children = [];
          }
          
          predefinedCategory.children.push(category);
          console.log(`📂 Добавлена подкатегория "${category.name}" в "${predefinedCategory.name}"`);
          break;
        }
      }
    }
  });
  
  // Возвращаем только категории, у которых есть дочерние элементы
  const result = standardCategories.filter(category => category.children && category.children.length > 0);
  console.log('🎯 Результат сопоставления:', result.length, 'категорий с подкатегориями');
  result.forEach(cat => {
    console.log(`📂 ${cat.name}: ${cat.children?.length || 0} подкатегорий`);
  });
  
  return result;
}

/**
 * Использует статические категории, если API вернуло ошибку
 */
export function getStaticCategories(): LaximoQuickGroup[] {
  return PREDEFINED_CATEGORIES;
} 