import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { GET_PARTSAPI_CATEGORIES } from '@/lib/graphql';
import { PartsAPICategoriesData, PartsAPICategoriesVariables, PartsAPICategory } from '@/types/partsapi';

function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}



// Fallback статичные данные
const fallbackTabData = [
  {
    label: "Оригинальные каталоги",
    heading: "Оригинальные каталоги",
    links: [
      "Моторные масла",
      "Трансмиссионные масла",
      "Тормозные жидкости",
      "Смазки",
      "Дистиллированная вода",
      "Жидкости для стеклоомывателей",
      "Индустриальные жидкости",
      "Антифриз и охлаждающие жидкости",
      "Промывочные жидкости",
    ],
  },
  {
    label: "Масла и технические жидкости",
    heading: "Масла и технические жидкости",
    links: [
      "Моторные масла",
      "Трансмиссионные масла",
      "Тормозные жидкости",
      "Смазки",
      "Дистиллированная вода",
      "Жидкости для стеклоомывателей",
      "Индустриальные жидкости",
      "Антифриз и охлаждающие жидкости",
      "Промывочные жидкости",
    ],
  },
  {
    label: "Оборудование",
    heading: "Оборудование",
    links: [
      "Моторные масла",
      "Трансмиссионные масла",
      "Тормозные жидкости",
      "Смазки",
      "Дистиллированная вода",
      "Жидкости для стеклоомывателей",
      "Индустриальные жидкости",
      "Антифриз и охлаждающие жидкости",
      "Промывочные жидкости",
    ],
  },
];

// Преобразуем данные PartsAPI в формат нашего меню
const transformPartsAPIToTabData = (categories: PartsAPICategory[]) => {
  console.log('🔄 Преобразуем категории PartsAPI:', categories.length, 'элементов');
  
  // Фильтруем только корневые категории (без parentId - это корневые)
  const rootCategories = categories.filter(cat => !cat.parentId);
  console.log('🔍 Найдено корневых категорий:', rootCategories.length);
  
  // Если корневых категорий нет, берем все категории (возможно, API возвращает только корневые)
  const categoriesToUse = rootCategories.length > 0 ? rootCategories : categories;
  console.log('🎯 Используем категории:', categoriesToUse.length);
  
  const transformed = categoriesToUse.slice(0, 12).map(category => {
    const childrenCount = category.children?.length || 0;
    console.log(`📝 Категория: "${category.name}" (уровень ${category.level}, ${childrenCount} подкатегорий)`);
    
    // Используем реальные подкатегории (уже переведенные на бэкенде) или fallback
    const links = category.children && category.children.length > 0 
      ? category.children.slice(0, 9).map(child => child.name)
      : [
          "Масла",
          "Фильтры", 
          "Свечи зажигания",
          "Тормозные колодки",
          "Амортизаторы",
          "Приводные ремни",
          "Подшипники",
          "Уплотнения",
          "Прокладки",
        ];
    
    console.log(`🔗 Подкатегории для "${category.name}":`, links);
    
    return {
      label: category.name,
      heading: category.name,
      links: links
    };
  });
  
  console.log('✅ Преобразование завершено:', transformed.length, 'табов');
  return transformed;
};

const BottomHead = ({ menuOpen, onClose }: { menuOpen: boolean; onClose: () => void }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [mobileCategory, setMobileCategory] = useState<null | any>(null);
  const [tabData, setTabData] = useState(fallbackTabData);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // --- Overlay animation state ---
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      setShowOverlay(true);
    } else {
      // Ждём окончания transition перед удалением из DOM
      const timeout = setTimeout(() => setShowOverlay(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);
  // --- End overlay animation state ---

  // Получаем категории PartsAPI для примера автомобиля (carId: 9877 - пример из документации)
  const { data: categoriesData, loading, error } = useQuery<PartsAPICategoriesData, PartsAPICategoriesVariables>(
    GET_PARTSAPI_CATEGORIES,
    {
      variables: { 
        carId: 9877, // Пример ID автомобиля из документации PartsAPI
        carType: 'PC' 
      },
      errorPolicy: 'all'
    }
  );

  // Обновляем данные табов когда получаем данные от API
  useEffect(() => {
    if (categoriesData?.partsAPICategories && categoriesData.partsAPICategories.length > 0) {
      console.log('✅ Обновляем меню с данными PartsAPI:', categoriesData.partsAPICategories.length, 'категорий');
      console.log('🔍 Первые 3 категории:', categoriesData.partsAPICategories.slice(0, 3).map(cat => ({
        name: cat.name,
        level: cat.level,
        childrenCount: cat.children?.length || 0,
        children: cat.children?.slice(0, 3).map(child => child.name)
      })));
      
      const apiTabData = transformPartsAPIToTabData(categoriesData.partsAPICategories);
      setTabData(apiTabData);
      // Сбрасываем активный таб на первый при обновлении данных
      setActiveTabIndex(0);
    } else if (error) {
      console.warn('⚠️ Используем fallback данные из-за ошибки PartsAPI:', error);
      setTabData(fallbackTabData);
      setActiveTabIndex(0);
    }
  }, [categoriesData, error]);

  // Логирование для отладки
  useEffect(() => {
    if (loading) {
      console.log('🔄 Загружаем категории PartsAPI...');
    }
    if (error) {
      console.error('❌ Ошибка загрузки категорий PartsAPI:', error);
    }
  }, [loading, error]);

  // Обработка клика по категории для перехода в каталог с артикулами
  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    console.log('🔍 Клик по категории:', { categoryId, categoryName });
    
    // Закрываем меню
    onClose();
    
    // Переходим на страницу каталога с параметрами категории PartsAPI
    router.push({
      pathname: '/catalog',
      query: {
        partsApiCategory: categoryId,
        categoryName: encodeURIComponent(categoryName),
        carId: 9877, // ID автомобиля из PartsAPI
        carType: 'PC'
      }
    });
  };

  // Только мобильный UX
  if (isMobile && menuOpen) {
    // Оверлей для мобильного меню
    return (
      <>
        {showOverlay && (
          <div
            className={`fixed inset-0 bg-black/7 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
            aria-label="Закрыть меню"
          />
        )}
        {/* Экран подкатегорий */}
        {mobileCategory ? (
          <div className="mobile-category-overlay z-50">
            <div className="mobile-header">
              <button className="mobile-back-btn" onClick={() => setMobileCategory(null)}>
                ←
              </button>
              <span>{mobileCategory.label}</span>
            </div>
            <div className="mobile-subcategories">
              {mobileCategory.links.map((link: string, index: number) => (
                <div 
                  className="mobile-subcategory" 
                  key={link} 
                  onClick={() => {
                    // Если есть подкатегория с ID, используем её, иначе создаем временный ID
                    const subcategoryId = mobileCategory.children?.[index]?.id || `${mobileCategory.categoryId}_${index}`;
                    handleCategoryClick(subcategoryId, link);
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Экран выбора категории
          <div className="mobile-category-overlay z-50">
            <div className="mobile-header">
              <button className="mobile-back-btn" onClick={onClose} aria-label="Закрыть меню">
                <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="currentColor"></path>
                </svg>
              </button>
              <span>Категории</span>
              {loading && <span className="text-sm text-gray-500 ml-2">(загрузка...)</span>}
            </div>
            <div className="mobile-subcategories">
              {tabData.map((cat, index) => {
                // Получаем ID категории из данных PartsAPI или создаем fallback ID
                const categoryId = categoriesData?.partsAPICategories?.[index]?.id || `fallback_${index}`;
                
                return (
                  <div
                    className="mobile-subcategory"
                    key={cat.label}
                    onClick={() => {
                      // Добавляем categoryId и children для правильной обработки
                      const categoryWithData = {
                        ...cat,
                        categoryId,
                        children: categoriesData?.partsAPICategories?.[index]?.children
                      };
                      setMobileCategory(categoryWithData);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {cat.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  // Десктоп: оставить всё как есть, но добавить оверлей
  return (
    <>
      {showOverlay && (
        <div
          className={`fixed inset-0 bg-black/7 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
          aria-label="Закрыть меню"
        />
      )}
      {showOverlay && (
        <div
          className={`fixed inset-0 bg-black/7 z-1900 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
          aria-label="Закрыть меню"
        />
      )}
      <nav
        role="navigation"
        className="nav-menu-3 w-nav-menu z-2000"
        style={{ display: menuOpen ? "block" : "none" }}
        onClick={e => e.stopPropagation()} // чтобы клик внутри меню не закрывал его
      >
        <div className="div-block-28">
          <div className="w-layout-hflex flex-block-90">
            <div className="w-layout-vflex flex-block-88">
              {/* Меню с иконками - показываем все категории из API */}
              {tabData.map((tab, idx) => (
                <a
                  href="#"
                  className={`link-block-7 w-inline-block${activeTabIndex === idx ? " w--current" : ""}`}
                  key={tab.label}
                  onClick={() => {
                    setActiveTabIndex(idx);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="div-block-29">
                    <div className="code-embed-12 w-embed">
                      {/* SVG-звезда */}
                      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3158 0.643914C10.4674 0.365938 10.8666 0.365938 11.0182 0.643914L14.0029 6.11673C14.0604 6.22222 14.1623 6.29626 14.2804 6.31838L20.4077 7.46581C20.7189 7.52409 20.8423 7.9037 20.6247 8.13378L16.3421 12.6636C16.2595 12.7509 16.2206 12.8707 16.2361 12.9899L17.0382 19.1718C17.079 19.4858 16.7561 19.7204 16.47 19.5847L10.8385 16.9114C10.73 16.8599 10.604 16.8599 10.4955 16.9114L4.86394 19.5847C4.5779 19.7204 4.25499 19.4858 4.29573 19.1718L5.0979 12.9899C5.11336 12.8707 5.07444 12.7509 4.99189 12.6636L0.709252 8.13378C0.491728 7.9037 0.615069 7.52409 0.926288 7.46581L7.05357 6.31838C7.17168 6.29626 7.27358 6.22222 7.33112 6.11673L10.3158 0.643914Z" fill="CurrentColor"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="text-block-47">{tab.label}</div>
                </a>
              ))}
            </div>
            {/* Правая часть меню с подкатегориями и картинками */}
            <div className="w-layout-vflex flex-block-89">
              <h3 className="heading-16">{tabData[activeTabIndex]?.heading || tabData[0].heading}{loading && <span className="text-sm text-gray-500 ml-2">(обновление...)</span>}</h3>
              <div className="w-layout-hflex flex-block-92">
                <div className="w-layout-vflex flex-block-91">
                  {(tabData[activeTabIndex]?.links || tabData[0].links).map((link, index) => {
                    const activeCategory = categoriesData?.partsAPICategories?.[activeTabIndex];
                    const subcategoryId = activeCategory?.children?.[index]?.id || `${activeCategory?.id}_${index}` || `fallback_${activeTabIndex}_${index}`;
                    return (
                      <div
                        className="link-2"
                        key={link}
                        onClick={() => handleCategoryClick(subcategoryId, link)}
                        style={{ cursor: "pointer" }}
                      >
                        {link}
                      </div>
                    );
                  })}
                </div>
                <div className="w-layout-vflex flex-block-91-copy">
                  <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
                  <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
                </div>
              </div>
            </div>
          </div>
          {/* Табы */}
          <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="tabs w-tabs">
            <div className="tabs-menu w-tab-menu">
              {tabData.map((tab, idx) => (
                <a
                  key={tab.label}
                  data-w-tab={`Tab ${idx + 1}`}
                  className={`tab-link w-inline-block w-tab-link${activeTabIndex === idx ? " w--current" : ""}`}
                  onClick={() => {
                    setActiveTabIndex(idx);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="div-block-29">
                    <div className="code-embed-12 w-embed">
                      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3158 0.643914C10.4674 0.365938 10.8666 0.365938 11.0182 0.643914L14.0029 6.11673C14.0604 6.22222 14.1623 6.29626 14.2804 6.31838L20.4077 7.46581C20.7189 7.52409 20.8423 7.9037 20.6247 8.13378L16.3421 12.6636C16.2595 12.7509 16.2206 12.8707 16.2361 12.9899L17.0382 19.1718C17.079 19.4858 16.7561 19.7204 16.47 19.5847L10.8385 16.9114C10.73 16.8599 10.604 16.8599 10.4955 16.9114L4.86394 19.5847C4.5779 19.7204 4.25499 19.4858 4.29573 19.1718L5.0979 12.9899C5.11336 12.8707 5.07444 12.7509 4.99189 12.6636L0.709252 8.13378C0.491728 7.9037 0.615069 7.52409 0.926288 7.46581L7.05357 6.31838C7.17168 6.29626 7.27358 6.22222 7.33112 6.11673L10.3158 0.643914Z" fill="CurrentColor"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="text-block-49">{tab.label}</div>
                </a>
              ))}
            </div>
            <div className="tabs-content w-tab-content">
              {tabData.map((tab, idx) => (
                <div
                  key={tab.label}
                  data-w-tab={`Tab ${idx + 1}`}
                  className={`tab-pane w-tab-pane${activeTabIndex === idx ? " w--tab-active" : ""}`}
                  style={{ display: activeTabIndex === idx ? "block" : "none" }}
                >
                  <div className="w-layout-vflex flex-block-89">
                    <h3 className="heading-16">{tab.heading}</h3>
                    <div className="w-layout-hflex flex-block-92">
                      <div className="w-layout-vflex flex-block-91">
                        {tab.links.map((link, linkIndex) => {
                          const category = categoriesData?.partsAPICategories?.[idx];
                          const subcategoryId = category?.children?.[linkIndex]?.id || `${category?.id}_${linkIndex}` || `fallback_${idx}_${linkIndex}`;
                          return (
                            <div
                              className="link-2"
                              key={link}
                              onClick={() => handleCategoryClick(subcategoryId, link)}
                              style={{ cursor: "pointer" }}
                            >
                              {link}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-layout-vflex flex-block-91-copy">
                        <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
                        <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomHead; 