import React, { useState, useRef, useEffect } from "react";
import { useMutation, useLazyQuery } from '@apollo/client';
import CustomCheckbox from './CustomCheckbox';
import PickupPointSelector from '../delivery/PickupPointSelector';
import { YandexPickupPoint } from '@/lib/graphql/yandex-delivery';
import { CREATE_CLIENT_DELIVERY_ADDRESS, UPDATE_CLIENT_DELIVERY_ADDRESS, GET_CLIENT_DELIVERY_ADDRESSES, GET_ADDRESS_SUGGESTIONS } from '@/lib/graphql';

interface AddressFormWithPickupProps {
  onDetectLocation: () => void;
  address: string;
  setAddress: (address: string) => void;
  onBack: () => void;
  onCityChange: (cityName: string) => void;
  onPickupPointSelect: (point: YandexPickupPoint) => void;
  selectedPickupPoint?: YandexPickupPoint;
  editingAddress?: any; // Для редактирования существующего адреса
}

// Компонент автокомплита адресов
interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [getAddressSuggestions] = useLazyQuery(GET_ADDRESS_SUGGESTIONS, {
    onCompleted: (data) => {
      console.log('Автокомплит: получены данные', data);
      if (data.addressSuggestions) {
        console.log('Автокомплит: установка предложений', data.addressSuggestions);
        setSuggestions(data.addressSuggestions);
        setShowSuggestions(true);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Ошибка автокомплита:', error);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    console.log('Автокомплит: значение изменилось', value);
    if (!value || value.length < 3) {
      console.log('Автокомплит: значение слишком короткое, очистка');
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delayedSearch = setTimeout(() => {
      console.log('Автокомплит: запуск поиска для', value);
      setIsLoading(true);
      getAddressSuggestions({
        variables: { query: value }
      });
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [value, getAddressSuggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        onFocus={() => {
          console.log('Автокомплит: фокус на поле');
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
        onBlur={() => {
          console.log('Автокомплит: потеря фокуса');
          setTimeout(() => setShowSuggestions(false), 200);
        }}
      />
      {isLoading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
        </div>
      )}
      {/* Отладочная информация */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
          {suggestions.length > 0 ? `${suggestions.length} подсказок` : 'Нет подсказок'}
        </div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
              onClick={() => {
                console.log('Автокомплит: выбор предложения', suggestion);
                handleSuggestionClick(suggestion);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Tabs = ({ deliveryType, setDeliveryType }: { 
  deliveryType: string; 
  setDeliveryType: (type: string) => void;
}) => (
  <div className="flex gap-1 items-center self-stretch p-1 bg-gray-100 rounded-lg">
    <button
      onClick={() => setDeliveryType('COURIER')}
      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        deliveryType === 'COURIER'
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Курьер
    </button>
    <button
      onClick={() => setDeliveryType('PICKUP')}
      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        deliveryType === 'PICKUP'
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      Самовывоз
    </button>
  </div>
);

// Компонент фильтра по типу ПВЗ
const PickupTypeFilter = ({ selectedType, onTypeChange }: { 
  selectedType: string; 
  onTypeChange: (type: string) => void;
}) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-medium text-gray-700">Тип пункта выдачи *</label>
    <div className="flex gap-2">
      <button
        onClick={() => onTypeChange('pickup_point')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
          selectedType === 'pickup_point'
            ? 'bg-red-600 text-white border-red-600'
            : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
        }`}
      >
        ПВЗ
      </button>
      <button
        onClick={() => onTypeChange('terminal')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
          selectedType === 'terminal'
            ? 'bg-red-600 text-white border-red-600'
            : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
        }`}
      >
        Постомат
      </button>
    </div>
  </div>
);

// Компонент детальной информации о ПВЗ
const PickupPointDetails = ({ point, onConfirm, onCancel }: {
  point: YandexPickupPoint;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="flex flex-col gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold text-gray-900">Подтверждение выбора ПВЗ</h3>
      <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    
    <div className="space-y-3">
      <div>
        <h4 className="font-medium text-gray-900">{point.name}</h4>
        <p className="text-sm text-gray-600">{point.address.fullAddress}</p>
        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
          {point.typeLabel}
        </span>
      </div>

      <div>
        <h5 className="font-medium text-gray-900 mb-2">Режим работы:</h5>
        <div className="text-sm text-gray-600 whitespace-pre-line">
          {point.formattedSchedule}
        </div>
      </div>

      {point.contact.phone && (
        <div>
          <h5 className="font-medium text-gray-900">Телефон:</h5>
          <p className="text-sm text-gray-600">{point.contact.phone}</p>
        </div>
      )}

      {point.instruction && (
        <div>
          <h5 className="font-medium text-gray-900">Дополнительная информация:</h5>
          <p className="text-sm text-gray-600">{point.instruction}</p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <div className="flex items-center gap-2">
          {point.paymentMethods.includes('card_on_receipt') && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
              Оплата картой
            </span>
          )}
          {point.isYandexBranded && (
            <span className="flex items-center gap-1 text-xs text-blue-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
              Яндекс ПВЗ
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="flex gap-3 pt-2">
      <button
        onClick={onCancel}
        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Изменить выбор
      </button>
      <button
        onClick={onConfirm}
        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        Подтвердить выбор
      </button>
    </div>
  </div>
);

const AddressFormWithPickup = ({ 
  onDetectLocation, 
  address, 
  setAddress, 
  onBack,
  onCityChange,
  onPickupPointSelect,
  selectedPickupPoint,
  editingAddress
}: AddressFormWithPickupProps) => {
  const [deliveryType, setDeliveryType] = useState(editingAddress?.deliveryType || 'COURIER');
  const [pickupTypeFilter, setPickupTypeFilter] = useState<string>('pickup_point');
  const [showPickupDetails, setShowPickupDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: editingAddress?.name || '',
    address: editingAddress?.address || '',
    entrance: editingAddress?.entrance || '',
    floor: editingAddress?.floor || '',
    apartment: editingAddress?.apartment || '',
    intercom: editingAddress?.intercom || '',
    deliveryTime: editingAddress?.deliveryTime || '',
    contactPhone: editingAddress?.contactPhone || '',
    comment: editingAddress?.comment || ''
  });

  const [createAddress] = useMutation(CREATE_CLIENT_DELIVERY_ADDRESS, {
    onCompleted: () => {
      alert('Адрес доставки сохранен!');
      onBack();
    },
    onError: (error) => {
      console.error('Ошибка сохранения адреса:', error);
      alert('Ошибка сохранения адреса: ' + error.message);
    },
    refetchQueries: [{ query: GET_CLIENT_DELIVERY_ADDRESSES }]
  });

  const [updateAddress] = useMutation(UPDATE_CLIENT_DELIVERY_ADDRESS, {
    onCompleted: () => {
      alert('Адрес доставки обновлен!');
      onBack();
    },
    onError: (error) => {
      console.error('Ошибка обновления адреса:', error);
      alert('Ошибка обновления адреса: ' + error.message);
    },
    refetchQueries: [{ query: GET_CLIENT_DELIVERY_ADDRESSES }]
  });

  const handlePickupPointSelect = (point: YandexPickupPoint) => {
    // Проверяем соответствие выбранному типу
    if (point.type !== pickupTypeFilter) {
      alert(`Выбранный пункт не соответствует типу "${pickupTypeFilter === 'pickup_point' ? 'ПВЗ' : 'Постомат'}". Пожалуйста, выберите другой пункт.`);
      return;
    }
    
    onPickupPointSelect(point);
    setShowPickupDetails(true);
  };

  const handleSave = async () => {
    if (deliveryType === 'COURIER') {
      if (!formData.name || !formData.address) {
        alert('Пожалуйста, заполните обязательные поля: название и адрес');
        return;
      }

      const addressInput = {
        name: formData.name,
        address: formData.address,
        deliveryType: 'COURIER',
        comment: formData.comment,
        entrance: formData.entrance || null,
        floor: formData.floor || null,
        apartment: formData.apartment || null,
        intercom: formData.intercom || null,
        deliveryTime: formData.deliveryTime || null,
        contactPhone: formData.contactPhone || null
      };

      try {
        if (editingAddress) {
          // Обновляем существующий адрес
          await updateAddress({
            variables: {
              id: editingAddress.id,
              input: addressInput
            }
          });
        } else {
          // Создаем новый адрес
          await createAddress({
            variables: {
              input: addressInput
            }
          });
        }
      } catch (error) {
        console.error('Ошибка сохранения:', error);
      }
    } else if (deliveryType === 'PICKUP' && selectedPickupPoint) {
      // Для самовывоза показываем детали перед сохранением
      if (!showPickupDetails) {
        setShowPickupDetails(true);
        return;
      }
      
      const pickupInput = {
        name: selectedPickupPoint.name,
        address: selectedPickupPoint.address.fullAddress,
        deliveryType: 'PICKUP',
        comment: formData.comment || null,
        entrance: null,
        floor: null,
        apartment: null,
        intercom: null,
        deliveryTime: null,
        contactPhone: null
      };

      try {
        if (editingAddress) {
          // Обновляем существующий адрес
          await updateAddress({
            variables: {
              id: editingAddress.id,
              input: pickupInput
            }
          });
        } else {
          // Создаем новый адрес
          await createAddress({
            variables: {
              input: pickupInput
            }
          });
        }
      } catch (error) {
        console.error('Ошибка сохранения ПВЗ:', error);
      }
    } else {
      alert('Пожалуйста, выберите пункт выдачи соответствующего типа');
    }
  };

  const timeSlots = [
    '9:00 - 12:00',
    '12:00 - 15:00',
    '15:00 - 18:00',
    '18:00 - 21:00',
    'Любое время'
  ];

  return (
    <div className="flex flex-col px-8 pt-8 bg-white rounded-2xl w-[480px] max-md:w-full max-md:px-5 max-md:pb-8">
      <div className="flex relative flex-col gap-8 items-start h-[730px] w-[420px] max-md:w-full max-md:h-auto max-sm:gap-5">
        <div className="flex relative flex-col gap-5 items-start self-stretch max-sm:gap-4">
          <div className="flex relative gap-2.5 justify-center items-center self-stretch pr-10 max-md:pr-5">
            <div className="text-3xl font-bold leading-9 flex-[1_0_0] text-gray-950 max-md:text-2xl max-sm:text-2xl">
              {editingAddress ? 'Редактировать адрес' : 'Адрес доставки'}
            </div>
            <div onClick={onBack} className="cursor-pointer absolute right-0 top-1">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z" fill="#000814"/>
              </svg>
            </div>
          </div>

          <Tabs deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
        </div>

        {deliveryType === 'COURIER' ? (
          <div className="flex flex-col gap-4 items-start self-stretch">
            {/* Название адреса */}
            <div className="flex flex-col gap-2 items-start self-stretch">
              <label className="text-sm font-medium text-gray-700">Название адреса *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Например: Дом, Офис, Дача"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Адрес с автокомплитом */}
            <div className="flex flex-col gap-2 items-start self-stretch">
              <label className="text-sm font-medium text-gray-700">Адрес доставки *</label>
              <AddressAutocomplete
                value={formData.address}
                onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                placeholder="Введите адрес"
              />
            </div>

            {/* Дополнительные поля */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Подъезд</label>
                <input
                  type="text"
                  value={formData.entrance}
                  onChange={(e) => setFormData(prev => ({ ...prev, entrance: e.target.value }))}
                  placeholder="1"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Этаж</label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                  placeholder="5"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Квартира/офис</label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => setFormData(prev => ({ ...prev, apartment: e.target.value }))}
                  placeholder="25"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Домофон</label>
                <input
                  type="text"
                  value={formData.intercom}
                  onChange={(e) => setFormData(prev => ({ ...prev, intercom: e.target.value }))}
                  placeholder="25К"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Время доставки */}
            <div className="flex flex-col gap-2 items-start self-stretch">
              <label className="text-sm font-medium text-gray-700">Желаемое время доставки</label>
              <select
                value={formData.deliveryTime}
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Выберите время</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Контактный телефон */}
            <div className="flex flex-col gap-2 items-start self-stretch">
              <label className="text-sm font-medium text-gray-700">Контактный телефон</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="+7 (999) 123-45-67"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Комментарий */}
            <div className="flex flex-col gap-2 items-start self-stretch">
              <label className="text-sm font-medium text-gray-700">Комментарий для курьера</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Дополнительная информация для курьера"
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-start self-stretch">
            <PickupTypeFilter 
              selectedType={pickupTypeFilter} 
              onTypeChange={setPickupTypeFilter} 
            />
            
            {showPickupDetails && selectedPickupPoint ? (
              <PickupPointDetails
                point={selectedPickupPoint}
                onConfirm={() => {
                  setShowPickupDetails(false);
                  handleSave();
                }}
                onCancel={() => setShowPickupDetails(false)}
              />
            ) : (
              <PickupPointSelector
                selectedPoint={selectedPickupPoint}
                onPointSelect={handlePickupPointSelect}
                onCityChange={onCityChange}
                placeholder={`Выберите ${pickupTypeFilter === 'pickup_point' ? 'ПВЗ' : 'постомат'}`}
                typeFilter={pickupTypeFilter}
              />
            )}

            {/* Комментарий для самовывоза */}
            <div className="flex flex-col gap-2 items-start self-stretch">
              <label className="text-sm font-medium text-gray-700">Комментарий</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Дополнительная информация"
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full px-5 py-3.5 text-base font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
          disabled={deliveryType === 'PICKUP' && !selectedPickupPoint}
        >
          {deliveryType === 'PICKUP' && selectedPickupPoint && !showPickupDetails 
            ? 'Показать детали и сохранить' 
            : editingAddress ? 'Сохранить изменения' : 'Сохранить адрес доставки'
          }
        </button>
      </div>
    </div>
  );
};

export default AddressFormWithPickup; 