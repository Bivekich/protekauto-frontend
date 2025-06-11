import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LaximoWizardStep, LaximoVehicleSearchResult } from '@/types/laximo';
import { GET_LAXIMO_WIZARD2, FIND_LAXIMO_VEHICLE_BY_WIZARD } from '@/lib/graphql';

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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          Поиск автомобиля по параметрам
        </h3>
        <p className="text-blue-700 text-sm">
          Выберите параметры автомобиля шаг за шагом. После выбора достаточного количества параметров станет доступен поиск автомобилей.
        </p>
      </div>

      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className="ml-3 text-gray-600">Загружаем параметры...</span>
        </div>
      )}

      {/* Шаги wizard */}
      {!isLoading && wizardSteps.map((step, index) => (
        <div key={`${step.conditionid}-${index}`} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h4 className="text-lg font-medium text-gray-900">{step.name}</h4>
              {step.determined && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {step.automatic ? 'Авто' : 'Выбрано'}
                </span>
              )}
            </div>
            
            {step.determined && !step.automatic && (
              <button
                onClick={() => handleParamReset(step)}
                className="text-sm text-red-600 hover:text-red-700"
                disabled={isLoading}
              >
                Сбросить
              </button>
            )}
          </div>

          {/* Показываем текущее значение для определенных параметров */}
          {step.determined && step.value && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-sm font-medium text-gray-900">
                {step.automatic ? '✓ Автоматически определено:' : '✓ Выбрано:'} {step.value}
              </div>
            </div>
          )}

          {/* Опции для выбора */}
          {!step.determined && step.options && step.options.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {step.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleParamSelect(step, option.key, option.value)}
                  disabled={isLoading}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-sm font-medium">{option.value}</div>
                </button>
              ))}
            </div>
          )}

          {/* Когда нет опций для неопределенного параметра */}
          {!step.determined && (!step.options || step.options.length === 0) && (
            <div className="text-sm text-gray-500 italic">
              Нет доступных опций для выбора
            </div>
          )}
        </div>
      ))}

      {/* Кнопка поиска автомобилей */}
      {!isLoading && canListVehicles && (
        <div className="pt-4 border-t">
          <button
            onClick={handleFindVehicles}
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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