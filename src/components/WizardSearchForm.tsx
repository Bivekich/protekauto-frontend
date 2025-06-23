import React, { useState, useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LaximoWizardStep, LaximoVehicleSearchResult } from '@/types/laximo';
import { GET_LAXIMO_WIZARD2, FIND_LAXIMO_VEHICLE_BY_WIZARD } from '@/lib/graphql';
import { Combobox } from '@headlessui/react';

interface WizardSearchFormProps {
  catalogCode: string;
  onVehicleFound: (vehicles: LaximoVehicleSearchResult[]) => void;
}

const WizardSearchForm: React.FC<WizardSearchFormProps> = ({
  catalogCode,
  onVehicleFound
}) => {
  const [wizardSteps, setWizardSteps] = useState<LaximoWizardStep[]>([]);
  const [selectedParams, setSelectedParams] = useState<Record<string, { key: string; value: string }>>({});
  const [currentSsd, setCurrentSsd] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [queries, setQueries] = useState<Record<string, string>>({});
  const buttonRefs = useRef<Record<string, React.RefObject<HTMLButtonElement | null>>>({});

  const [getWizard2] = useLazyQuery(GET_LAXIMO_WIZARD2, {
    onCompleted: (data) => {
      if (data.laximoWizard2) {
        setWizardSteps(data.laximoWizard2);
        setIsLoading(false);
      }
    },
    onError: (error) => {
      setError('Ошибка загрузки параметров поиска');
      setIsLoading(false);
      console.error('Error loading wizard:', error);
    }
  });

  const [findVehicleByWizard] = useLazyQuery(FIND_LAXIMO_VEHICLE_BY_WIZARD, {
    onCompleted: (data) => {
      if (data.laximoFindVehicleByWizard) {
        onVehicleFound(data.laximoFindVehicleByWizard);
        setIsLoading(false);
      }
    },
    onError: (error) => {
      setError('Ошибка поиска автомобилей');
      setIsLoading(false);
      console.error('Error finding vehicles:', error);
    }
  });

  // Загружаем начальные параметры при монтировании
  useEffect(() => {
    if (catalogCode) {
      setIsLoading(true);
      setError('');
      setSelectedParams({});
      setCurrentSsd('');
      getWizard2({
        variables: {
          catalogCode,
          ssd: ''
        }
      });
    }
  }, [catalogCode, getWizard2]);

  // При каждом рендере wizardSteps гарантируем наличие ref для каждого шага
  wizardSteps.forEach(step => {
    if (!buttonRefs.current[step.conditionid]) {
      buttonRefs.current[step.conditionid] = React.createRef<HTMLButtonElement>();
    }
  });

  // Обработка выбора параметра
  const handleParamSelect = async (step: LaximoWizardStep, optionKey: string, optionValue: string) => {
    setIsLoading(true);
    setError('');

    // Обновляем выбранные параметры
    const newSelectedParams = {
      ...selectedParams,
      [step.conditionid]: { key: optionKey, value: optionValue }
    };
    setSelectedParams(newSelectedParams);

    // Устанавливаем новый SSD
    const newSsd = optionKey;
    setCurrentSsd(newSsd);

    try {
      // Загружаем обновленные шаги wizard с новым SSD
      await getWizard2({
        variables: {
          catalogCode,
          ssd: newSsd
        }
      });
    } catch (error) {
      setError('Ошибка обновления параметров');
      setIsLoading(false);
    }
  };

  // Сброс параметра
  const handleParamReset = async (step: LaximoWizardStep) => {
    setIsLoading(true);
    setError('');

    // Убираем параметр из выбранных
    const newSelectedParams = { ...selectedParams };
    delete newSelectedParams[step.conditionid];
    setSelectedParams(newSelectedParams);

    // Используем SSD для сброса параметра, если он есть
    const resetSsd = step.ssd || '';
    setCurrentSsd(resetSsd);

    try {
      // Загружаем обновленные шаги wizard
      await getWizard2({
        variables: {
          catalogCode,
          ssd: resetSsd
        }
      });
    } catch (error) {
      setError('Ошибка сброса параметра');
      setIsLoading(false);
    }
  };

  // Поиск автомобилей по выбранным параметрам
  const handleFindVehicles = () => {
    if (!currentSsd) {
      setError('Выберите хотя бы один параметр для поиска');
      return;
    }

    setIsLoading(true);
    setError('');

    findVehicleByWizard({
      variables: {
        catalogCode,
        ssd: currentSsd
      }
    });
  };

  // Проверяем можно ли искать автомобили
  const canListVehicles = wizardSteps.some(step => 
    step.allowlistvehicles && (step.determined || selectedParams[step.conditionid])
  );

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => {
            setError('');
            setIsLoading(true);
            getWizard2({
              variables: { catalogCode, ssd: currentSsd }
            });
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          Поиск автомобиля по параметрам
        </h3>
        <p className="text-blue-700 text-sm">
          Выберите параметры автомобиля шаг за шагом. После выбора достаточного количества параметров станет доступен поиск автомобилей.
        </p>
      </div> */}

      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className="ml-3 text-gray-600">Загружаем параметры...</span>
        </div>
      )}

      {/* Шаги wizard */}
      {!isLoading && wizardSteps.map((step, index) => {
        const options = step.options || [];
        const query = queries[step.conditionid] || '';
        const filteredOptions = query
          ? options.filter(option => option.value.toLowerCase().includes(query.toLowerCase()))
          : options;
        const buttonRef = buttonRefs.current[step.conditionid];
        return (
          <div key={`${step.conditionid}-${index}`} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h4 className="text-lg font-medium text-gray-900">{step.name}</h4>
                {step.determined && (
                  <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full
                    ${step.automatic ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {step.automatic ? 'Авто' : 'Выбрано'}
                  </span>
                )}
              </div>
              {step.determined && !step.automatic && (
                <button
                  onClick={() => handleParamReset(step)}
                  className="text-sm text-gray-500 hover:text-red-600 underline transition"
                  disabled={isLoading}
                >
                  Сбросить
                </button>
              )}
            </div>
            {/* Показываем текущее значение для определенных параметров */}
            {step.determined && step.value && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full
                  ${step.automatic ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className={`text-sm font-medium ${step.automatic ? 'text-green-900' : 'text-blue-900'}`}>{step.automatic ? 'Авто:' : 'Выбрано:'}</span>
                <span className="font-semibold text-gray-900">{step.value}</span>
              </div>
            )}
            {/* Combobox для выбора опции */}
            {!step.determined && options.length > 0 && (
              <div className="w-full max-w-[450px]">
                <Combobox
                  value={selectedParams[step.conditionid]?.key || ''}
                  onChange={key => {
                    const option = options.find(o => o.key === key);
                    if (option) handleParamSelect(step, option.key, option.value);
                  }}
                  disabled={isLoading}
                >
                  <div className="relative">
                    <Combobox.Input
                      id={`wizard-combobox-${step.conditionid}`}
                      className="w-full px-6 py-4 bg-white rounded border border-stone-300 text-sm text-gray-950 placeholder:text-neutral-500 outline-none focus:shadow-none focus:border-stone-300 transition-colors"
                      displayValue={(key: string) => options.find(o => o.key === key)?.value || ''}
                      onChange={e => setQueries(q => ({ ...q, [step.conditionid]: e.target.value }))}
                      placeholder="Начните вводить..."
                      autoComplete="off"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none w-12">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                      </svg>
                    </Combobox.Button>
                    <Combobox.Options
                      className="absolute left-0 top-full z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg w-full max-h-60 overflow-auto scrollbar-none"
                      style={{ scrollbarWidth: 'none' }}
                      data-hide-scrollbar
                    >
                      {filteredOptions.length === 0 && (
                        <div className="px-6 py-4 text-gray-500">Нет опций</div>
                      )}
                      {filteredOptions.map(option => (
                        <Combobox.Option
                          key={option.key}
                          value={option.key}
                          className={({ active, selected }) =>
                            `px-6 py-4 cursor-pointer hover:!bg-[rgb(236,28,36)] hover:!text-white text-sm transition-colors ${selected ? 'bg-red-50 font-semibold text-gray-950' : 'text-neutral-500'}`
                          }
                        >
                          {option.value}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            )}
            {/* Когда нет опций для неопределенного параметра */}
            {!step.determined && (!options || options.length === 0) && (
              <div className="text-sm text-gray-500 italic">
                Нет доступных опций для выбора
              </div>
            )}
          </div>
        );
      })}

      {/* Кнопка поиска автомобилей */}
      {!isLoading && canListVehicles && (
        <div className="pt-4 border-t">
          <button
            onClick={handleFindVehicles}
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3 bg-red-600 !text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Найти автомобили
          </button>
          
          <div className="mt-3 text-sm text-gray-600">
            Определено параметров: {wizardSteps.filter(s => s.determined).length} из {wizardSteps.length}
          </div>
        </div>
      )}

      {/* Информация о недостаточности параметров */}
      {!isLoading && !canListVehicles && wizardSteps.length > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Выберите больше параметров для поиска автомобилей
          </p>
        </div>
      )}
    </div>
  );
};

export default WizardSearchForm; 