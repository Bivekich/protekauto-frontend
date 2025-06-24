import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_CATALOG_INFO, GET_LAXIMO_QUICK_GROUPS_WITH_XML } from '@/lib/graphql';
import { LaximoCatalogInfo, LaximoQuickGroup } from '@/types/laximo';

interface LaximoDiagnosticProps {
  catalogCode: string;
  vehicleId: string;
  ssd?: string;
}

const LaximoDiagnostic: React.FC<LaximoDiagnosticProps> = ({
  catalogCode,
  vehicleId,
  ssd
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showRawData, setShowRawData] = useState(false);
  const [showRawXML, setShowRawXML] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(`${type} скопирован в буфер обмена!`);
      setTimeout(() => setCopySuccess(null), 3000);
    } catch (err) {
      console.error('Ошибка копирования в буфер обмена:', err);
      setCopySuccess(`Ошибка копирования ${type}`);
      setTimeout(() => setCopySuccess(null), 3000);
    }
  };

  // Получаем информацию о каталоге
  const { data: catalogData, loading: catalogLoading, error: catalogError } = useQuery<{ laximoCatalogInfo: LaximoCatalogInfo }>(
    GET_LAXIMO_CATALOG_INFO,
    {
      variables: { catalogCode },
      errorPolicy: 'all'
    }
  );

  // Получаем группы быстрого поиска с RAW XML
  const { data: quickGroupsData, loading: quickGroupsLoading, error: quickGroupsError } = useQuery<{ 
    laximoQuickGroupsWithXML: { 
      groups: LaximoQuickGroup[], 
      rawXML: string 
    } 
  }>(
    GET_LAXIMO_QUICK_GROUPS_WITH_XML,
    {
      variables: { 
        catalogCode,
        vehicleId,
        ...(ssd && ssd.trim() !== '' && { ssd })
      },
      skip: !expanded,
      errorPolicy: 'all'
    }
  );

  const catalogInfo = catalogData?.laximoCatalogInfo;
  const quickGroups = quickGroupsData?.laximoQuickGroupsWithXML?.groups || [];
  const rawXML = quickGroupsData?.laximoQuickGroupsWithXML?.rawXML || '';

  if (!expanded) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium">🔧 Показать диагностику Laximo</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">🔧 Диагностика Laximo</h3>
        <button
          onClick={() => setExpanded(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Уведомление о копировании */}
      {copySuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-green-800">{copySuccess}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Информация о каталоге */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-900 mb-3">📋 Информация о каталоге</h4>
          
          {catalogLoading && (
            <div className="text-sm text-gray-500">Загрузка информации о каталоге...</div>
          )}
          
          {catalogError && (
            <div className="text-sm text-red-600">
              Ошибка загрузки каталога: {catalogError.message}
            </div>
          )}
          
          {catalogInfo && (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-700">Код:</span>
                  <span className="ml-2">{catalogInfo.code}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Название:</span>
                  <span className="ml-2">{catalogInfo.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Бренд:</span>
                  <span className="ml-2">{catalogInfo.brand}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">QuickGroups:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    catalogInfo.supportquickgroups 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {catalogInfo.supportquickgroups ? 'Поддерживается' : 'Не поддерживается'}
                  </span>
                </div>
              </div>
              
              {/* Поддерживаемые функции */}
              <div className="mt-3">
                <span className="font-medium text-gray-700">Поддерживаемые функции:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {catalogInfo.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {feature.name}
                      {feature.example && (
                        <span className="ml-1 text-blue-600">({feature.example})</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Параметры запроса */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">🔗 Параметры запроса</h4>
            <button
              onClick={() => {
                const diagnosticInfo = {
                  catalogCode,
                  vehicleId,
                  ssd: ssd ? ssd : 'отсутствует',
                  ssdLength: ssd?.length || 0,
                  catalogInfo: catalogInfo ? {
                    code: catalogInfo.code,
                    name: catalogInfo.name,
                    brand: catalogInfo.brand,
                    supportquickgroups: catalogInfo.supportquickgroups,
                    features: catalogInfo.features
                  } : 'не загружена',
                  quickGroupsCount: quickGroups.length,
                  timestamp: new Date().toISOString()
                };
                handleCopyToClipboard(JSON.stringify(diagnosticInfo, null, 2), 'Диагностическая информация');
              }}
              className="text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
            >
              📋 Скопировать все
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-700">Каталог:</span>
              <span className="ml-2 font-mono">{catalogCode}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">ID автомобиля:</span>
              <span className="ml-2 font-mono">{vehicleId}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">SSD:</span>
              <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                ssd && ssd.trim() !== '' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {ssd && ssd.trim() !== '' 
                  ? `Доступен (${ssd.length} символов)` 
                  : 'Отсутствует'
                }
              </span>
            </div>
            {ssd && ssd.trim() !== '' && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">SSD (первые 100 символов):</span>
                  <button
                    onClick={() => handleCopyToClipboard(ssd, 'SSD')}
                    className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    📋 Скопировать полный SSD
                  </button>
                </div>
                <div className="mt-1 p-2 bg-gray-100 rounded text-xs font-mono break-all">
                  {ssd.substring(0, 100)}...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Результат запроса групп быстрого поиска */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">⚡ Группы быстрого поиска</h4>
            {quickGroups.length > 0 && (
              <div className="flex space-x-2 flex-wrap">
                <button
                  onClick={() => {
                    setShowRawData(!showRawData);
                    setShowRawXML(false);
                  }}
                  className={`text-sm px-3 py-1 rounded transition-colors ${
                    showRawData 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  🔍 JSON данные
                </button>
                <button
                  onClick={() => {
                    setShowRawXML(!showRawXML);
                    setShowRawData(false);
                  }}
                  className={`text-sm px-3 py-1 rounded transition-colors ${
                    showRawXML 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  📄 RAW XML
                </button>
                {(showRawData || showRawXML) && (
                  <>
                    <button
                      onClick={() => {
                        setShowRawData(false);
                        setShowRawXML(false);
                      }}
                      className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      📊 Таблица
                    </button>
                    <button
                      onClick={() => {
                        const content = showRawXML ? rawXML : JSON.stringify(quickGroups, null, 2);
                        const type = showRawXML ? 'RAW XML' : 'JSON данные';
                        handleCopyToClipboard(content, type);
                      }}
                      className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                    >
                      📋 Скопировать
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          
          {quickGroupsLoading && (
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Загрузка групп быстрого поиска...</div>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <div className="text-xs text-blue-800">
                  <div>🌐 Выполняется SOAP запрос к Laximo API...</div>
                  <div>📝 Команда: ListQuickGroup:Locale=ru_RU|Catalog={catalogCode}|VehicleId={vehicleId}|ssd=...</div>
                  <div>🔗 URL: https://ws.laximo.ru/ec.Kito.WebCatalog/services/Catalog.CatalogHttpSoap11Endpoint/</div>
                  <div>⏱️ Ожидание ответа от сервера...</div>
                </div>
              </div>
            </div>
          )}
          
          {quickGroupsError && (
            <div className="space-y-2">
              <div className="text-sm text-red-600">
                Ошибка загрузки групп: {quickGroupsError.message}
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <div className="text-xs text-red-800">
                  <div>❌ SOAP запрос завершился с ошибкой</div>
                  <div>🔍 Проверьте консоль браузера для детальной информации</div>
                  <div>💡 Убедитесь, что SSD корректен и каталог поддерживает quickgroups</div>
                </div>
              </div>
            </div>
          )}
          
          {quickGroups.length > 0 ? (
            <div className="space-y-4">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Всего групп верхнего уровня:</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                  {quickGroups.length}
                </span>
              </div>
              
              {showRawXML ? (
                /* RAW XML ответ от Laximo */
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    📄 RAW XML ответ от Laximo SOAP API (оригинальный):
                  </div>
                  <div className="bg-gray-900 text-yellow-400 rounded-lg p-4 max-h-96 overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap font-mono">
                      {rawXML || 'XML данные недоступны'}
                    </pre>
                  </div>
                  
                  {/* Информация о XML */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <div className="text-sm font-medium text-yellow-900 mb-2">📋 Информация о XML:</div>
                    <div className="text-xs text-yellow-800 space-y-1">
                      <div>• Длина XML: <strong>{rawXML.length} символов</strong></div>
                      <div>• Кодировка: UTF-8</div>
                      <div>• Формат: SOAP XML Response</div>
                      <div>• API: Laximo WebCatalog</div>
                      <div>• Команда: ListQuickGroup:Locale=ru_RU|Catalog=...|VehicleId=...|ssd=...</div>
                    </div>
                  </div>
                </div>
              ) : showRawData ? (
                /* RAW JSON данные от Laximo */
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    🔍 Обработанные JSON данные от Laximo API (ListQuickGroup):
                  </div>
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4 max-h-96 overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap font-mono">
                      {JSON.stringify(quickGroups, null, 2)}
                    </pre>
                  </div>
                  
                  {/* Дополнительная информация о структуре */}
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <div className="text-sm font-medium text-blue-900 mb-2">📊 Анализ структуры данных:</div>
                    <div className="text-xs text-blue-800 space-y-1">
                      <div>• Общее количество групп: <strong>{quickGroups.length}</strong></div>
                      <div>• Групп с поддержкой деталей (link=true): <strong>{quickGroups.filter(g => g.link).length}</strong></div>
                      <div>• Групп с дочерними элементами: <strong>{quickGroups.filter(g => g.children && g.children.length > 0).length}</strong></div>
                      <div>• Общее количество всех групп (включая дочерние): <strong>{
                        quickGroups.reduce((total, group) => {
                          const countChildren = (g: LaximoQuickGroup): number => {
                            let count = 1;
                            if (g.children) {
                              count += g.children.reduce((childTotal, child) => childTotal + countChildren(child), 0);
                            }
                            return count;
                          };
                          return total + countChildren(group);
                        }, 0)
                      }</strong></div>
                    </div>
                  </div>
                  
                  {/* Backend Debug Info */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <div className="text-sm font-medium text-yellow-900 mb-2">🔧 Backend Debug Info:</div>
                    <div className="text-xs text-yellow-800 space-y-1">
                      <div>💡 <strong>Для полной отладки откройте консоль сервера (backend)</strong></div>
                      <div>📥 В консоли сервера будет виден полный RAW XML ответ от Laximo SOAP API</div>
                      <div>🌐 SOAP URL: https://ws.laximo.ru/ec.Kito.WebCatalog/services/Catalog.CatalogHttpSoap11Endpoint/</div>
                      <div>📝 Команда: ListQuickGroup:Locale=ru_RU|Catalog={catalogCode}|VehicleId={vehicleId}|ssd=...</div>
                      <div>🔐 Login используется из переменной окружения LAXIMO_LOGIN</div>
                      <div>🎯 SOAPAction: "urn:QueryDataLogin"</div>
                      <div>📦 Content-Type: text/xml; charset=utf-8</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Табличное представление */
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-1">ID</th>
                        <th className="text-left py-1">Название</th>
                        <th className="text-left py-1">Link</th>
                        <th className="text-left py-1">Дочерние</th>
                        <th className="text-left py-1">Code</th>
                        <th className="text-left py-1">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quickGroups.map((group, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-1 font-mono">{group.quickgroupid}</td>
                          <td className="py-1">{group.name}</td>
                          <td className="py-1">
                            <span className={`px-1 py-0.5 rounded text-xs ${
                              group.link 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {group.link ? 'true' : 'false'}
                            </span>
                          </td>
                          <td className="py-1">{group.children?.length || 0}</td>
                          <td className="py-1 font-mono text-xs">{group.code || '-'}</td>
                          <td className="py-1">
                            {group.imageurl ? (
                              <span className="text-green-600 text-xs">✓</span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            !quickGroupsLoading && !quickGroupsError && (
              <div className="text-sm text-gray-500">
                Группы быстрого поиска не найдены
              </div>
            )
          )}
        </div>

        {/* Рекомендации */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Рекомендации</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {catalogInfo?.supportquickgroups ? (
              <div>✅ Каталог поддерживает группы быстрого поиска</div>
            ) : (
              <div>⚠️ Каталог не поддерживает группы быстрого поиска - используйте категории</div>
            )}
            
            {ssd && ssd.trim() !== '' ? (
              <div>✅ SSD доступен - все функции активны</div>
            ) : (
              <div>⚠️ SSD отсутствует - некоторые функции могут быть недоступны</div>
            )}
            
            {quickGroups.length > 0 ? (
              <div>✅ Группы быстрого поиска загружены успешно</div>
            ) : (
              quickGroupsError ? (
                <div>❌ Ошибка загрузки групп быстрого поиска</div>
              ) : (
                <div>ℹ️ Группы быстрого поиска пусты или еще загружаются</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaximoDiagnostic; 