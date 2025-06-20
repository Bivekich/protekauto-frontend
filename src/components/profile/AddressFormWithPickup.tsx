import React, { useState, useRef, useEffect } from "react";
import { useMutation, useLazyQuery } from '@apollo/client';
import CustomCheckbox from './CustomCheckbox';
import PickupPointSelector from '../delivery/PickupPointSelector';
import { YandexPickupPoint } from '@/lib/graphql/yandex-delivery';
import { CREATE_CLIENT_DELIVERY_ADDRESS, GET_CLIENT_DELIVERY_ADDRESSES, GET_ADDRESS_SUGGESTIONS } from '@/lib/graphql';

interface AddressFormWithPickupProps {
  onDetectLocation: () => void;
  address: string;
  setAddress: (address: string) => void;
  onBack: () => void;
  onCityChange: (cityName: string) => void;
  onPickupPointSelect: (point: YandexPickupPoint) => void;
  selectedPickupPoint?: YandexPickupPoint;
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

const AddressFormWithPickup = ({ 
  onDetectLocation, 
  address, 
  setAddress, 
  onBack,
  onCityChange,
  onPickupPointSelect,
  selectedPickupPoint
}: AddressFormWithPickupProps) => {
  const [deliveryType, setDeliveryType] = useState('COURIER');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    entrance: '',
    floor: '',
    apartment: '',
    intercom: '',
    deliveryTime: '',
    contactPhone: '',
    comment: ''
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

  const handleSave = async () => {
    if (deliveryType === 'COURIER') {
      if (!formData.name || !formData.address) {
        alert('Пожалуйста, заполните обязательные поля: название и адрес');
        return;
      }

      try {
        await createAddress({
          variables: {
            input: {
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
            }
          }
        });
      } catch (error) {
        console.error('Ошибка сохранения:', error);
      }
    } else if (deliveryType === 'PICKUP' && selectedPickupPoint) {
      try {
        await createAddress({
          variables: {
            input: {
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
            }
          }
        });
      } catch (error) {
        console.error('Ошибка сохранения ПВЗ:', error);
      }
    } else {
      alert('Пожалуйста, выберите пункт выдачи');
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
              Адрес доставки
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
          <PickupPointSelector
            selectedPoint={selectedPickupPoint}
            onPointSelect={onPickupPointSelect}
            onCityChange={onCityChange}
            placeholder="Выберите пункт выдачи"
          />
        )}

        <button
          onClick={handleSave}
          className="w-full px-5 py-3.5 text-base font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
        >
          Сохранить адрес доставки
        </button>
      </div>
    </div>
  );
};

export default AddressFormWithPickup; 