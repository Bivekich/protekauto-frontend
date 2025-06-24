import React, { useState } from "react";
import AddressFormWithPickup from "./AddressFormWithPickup";
import AddressDetails from "./AddressDetails";
import YandexPickupPointsMap from "../delivery/YandexPickupPointsMap";
import { useLazyQuery } from '@apollo/client';
import { 
  YANDEX_PICKUP_POINTS_BY_CITY, 
  YANDEX_PICKUP_POINTS_BY_COORDINATES,
  YandexPickupPoint 
} from '@/lib/graphql/yandex-delivery';

interface ProfileAddressWayWithMapProps {
  onBack: () => void;
  editingAddress?: any; // Для редактирования существующего адреса
}

// Координаты городов для центрирования карты
const cityCoordinates: Record<string, [number, number]> = {
  'Москва': [55.7558, 37.6176],
  'Санкт-Петербург': [59.9311, 30.3609],
  'Новосибирск': [55.0084, 82.9357],
  'Екатеринбург': [56.8431, 60.6454],
  'Казань': [55.8304, 49.0661],
  'Нижний Новгород': [56.2965, 43.9361],
  'Челябинск': [55.1644, 61.4368],
  'Самара': [53.2001, 50.15],
  'Омск': [54.9885, 73.3242],
  'Ростов-на-Дону': [47.2357, 39.7015],
  'Уфа': [54.7388, 55.9721],
  'Красноярск': [56.0184, 92.8672],
  'Воронеж': [51.6720, 39.1843],
  'Пермь': [58.0105, 56.2502],
  'Волгоград': [48.7080, 44.5133],
  'Краснодар': [45.0355, 38.9753],
  'Саратов': [51.5924, 46.0348],
  'Тюмень': [57.1522, 65.5272],
  'Тольятти': [53.5303, 49.3461],
  'Ижевск': [56.8527, 53.2118],
  'Барнаул': [53.3606, 83.7636],
  'Ульяновск': [54.3142, 48.4031],
  'Иркутск': [52.2978, 104.2964],
  'Хабаровск': [48.4827, 135.0839],
  'Ярославль': [57.6261, 39.8845],
  'Владивосток': [43.1056, 131.8735],
  'Махачкала': [42.9849, 47.5047],
  'Томск': [56.4977, 84.9744],
  'Оренбург': [51.7727, 55.0988],
  'Кемерово': [55.3331, 86.0833],
  'Новокузнецк': [53.7557, 87.1099],
  'Рязань': [54.6269, 39.6916],
  'Набережные Челны': [55.7558, 52.4069],
  'Астрахань': [46.3497, 48.0408],
  'Пенза': [53.2001, 45.0000],
  'Липецк': [52.6031, 39.5708],
  'Тула': [54.1961, 37.6182],
  'Киров': [58.6035, 49.6679],
  'Чебоксары': [56.1439, 47.2517],
  'Калининград': [54.7065, 20.5110],
  'Брянск': [53.2434, 34.3640],
  'Курск': [51.7373, 36.1873],
  'Иваново': [57.0000, 40.9737],
  'Магнитогорск': [53.4078, 59.0647],
  'Тверь': [56.8587, 35.9176],
  'Ставрополь': [45.0428, 41.9734],
  'Симферополь': [44.9572, 34.1108],
  'Белгород': [50.5951, 36.5804],
  'Архангельск': [64.5401, 40.5433],
  'Владимир': [56.1366, 40.3966],
  'Сочи': [43.6028, 39.7342],
  'Курган': [55.4500, 65.3333],
  'Смоленск': [54.7818, 32.0401],
  'Калуга': [54.5293, 36.2754],
  'Чита': [52.0307, 113.5006],
  'Орёл': [52.9651, 36.0785],
  'Волжский': [48.7854, 44.7759],
  'Череповец': [59.1374, 37.9097],
  'Владикавказ': [43.0370, 44.6830],
  'Мурманск': [68.9792, 33.0925],
  'Сургут': [61.2500, 73.4167],
  'Вологда': [59.2239, 39.8840],
  'Тамбов': [52.7319, 41.4520],
  'Стерлитамак': [53.6241, 55.9504],
  'Грозный': [43.3181, 45.6942],
  'Якутск': [62.0355, 129.6755],
  'Кострома': [57.7665, 40.9265],
  'Комсомольск-на-Амуре': [50.5496, 137.0067],
  'Петрозаводск': [61.7849, 34.3469],
  'Таганрог': [47.2362, 38.8969],
  'Нижневартовск': [60.9344, 76.5531],
  'Йошкар-Ола': [56.6372, 47.8753],
  'Братск': [56.1326, 101.6140],
  'Новороссийск': [44.7209, 37.7677],
  'Дзержинск': [56.2342, 43.4582],
  'Шахты': [47.7090, 40.2060],
  'Нижнекамск': [55.6367, 51.8209],
  'Орск': [51.2045, 58.5434],
  'Ангарск': [52.5406, 103.8887],
  'Старый Оскол': [51.2965, 37.8411],
  'Великий Новгород': [58.5218, 31.2756],
  'Благовещенск': [50.2941, 127.5405],
  'Прокопьевск': [53.9058, 86.7194],
  'Химки': [55.8970, 37.4296],
  'Энгельс': [51.4827, 46.1124],
  'Рыбинск': [58.0446, 38.8486],
  'Балашиха': [55.7969, 37.9386],
  'Подольск': [55.4297, 37.5547],
  'Королёв': [55.9226, 37.8251],
  'Петропавловск-Камчатский': [53.0446, 158.6483],
  'Мытищи': [55.9116, 37.7307],
  'Люберцы': [55.6758, 37.8939],
  'Магадан': [59.5638, 150.8063],
  'Норильск': [69.3558, 88.1893],
  'Южно-Сахалинск': [46.9588, 142.7386]
};

const ProfileAddressWayWithMap: React.FC<ProfileAddressWayWithMapProps> = ({ onBack, editingAddress }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [address, setAddress] = useState("");
  const [pickupPoints, setPickupPoints] = useState<YandexPickupPoint[]>([]);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<YandexPickupPoint | undefined>();
  const [mapCenter, setMapCenter] = useState<[number, number]>([55.7558, 37.6176]); // Москва

  const [loadPointsByCity] = useLazyQuery(YANDEX_PICKUP_POINTS_BY_CITY, {
    onCompleted: (data) => {
      const points = data.yandexPickupPointsByCity || [];
      setPickupPoints(points);
      
      // Если есть точки, центрируем карту на первой
      if (points.length > 0) {
        setMapCenter([points[0].position.latitude, points[0].position.longitude]);
      }
    },
    onError: (error) => {
      console.error('Ошибка загрузки ПВЗ по городу:', error);
      setPickupPoints([]);
    },
    errorPolicy: 'all'
  });

  const [loadPointsByCoordinates] = useLazyQuery(YANDEX_PICKUP_POINTS_BY_COORDINATES, {
    onCompleted: (data) => {
      const points = data.yandexPickupPointsByCoordinates || [];
      setPickupPoints(points);
    },
    onError: (error) => {
      console.error('Ошибка загрузки ПВЗ по координатам:', error);
      setPickupPoints([]);
    },
    errorPolicy: 'all'
  });

  // Загружаем ПВЗ для Москвы при первой загрузке (где есть много ПВЗ)
  React.useEffect(() => {
    loadPointsByCity({ variables: { cityName: 'Москва' } });
  }, [loadPointsByCity]);

  const handlePickupPointSelect = (point: YandexPickupPoint) => {
    setSelectedPickupPoint(point);
    setAddress(point.address.fullAddress);
    setMapCenter([point.position.latitude, point.position.longitude]);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          setMapCenter([lat, lon]);
          
          loadPointsByCoordinates({
            variables: {
              latitude: lat,
              longitude: lon,
              radiusKm: 15
            }
          });
        },
        (error) => {
          console.error('Ошибка определения местоположения:', error);
          alert('Не удалось определить местоположение');
        }
      );
    } else {
      alert('Геолокация не поддерживается браузером');
    }
  };

  const handleCityChange = (cityName: string) => {
    // Сначала центрируем карту на выбранном городе
    const coordinates = cityCoordinates[cityName];
    if (coordinates) {
      setMapCenter(coordinates);
    }
    
    // Затем загружаем ПВЗ для города
    loadPointsByCity({ variables: { cityName } });
  };

  return (
    <div className="flex relative gap-8 items-start bg-white rounded-2xl flex-[1_0_0] max-md:flex-col max-md:gap-5">
      {/* Левая часть */}
      {showDetails ? (
        <AddressDetails
          onClose={() => setShowDetails(false)}
          onBack={onBack}
          address={address}
          setAddress={setAddress}
        />
      ) : (
        <AddressFormWithPickup 
          onDetectLocation={handleDetectLocation} 
          address={address} 
          setAddress={setAddress} 
          onBack={onBack}
          onCityChange={handleCityChange}
          onPickupPointSelect={handlePickupPointSelect}
          selectedPickupPoint={selectedPickupPoint}
          editingAddress={editingAddress}
        />
      )}
      
      {/* Правая часть: карта */}
      <div className="flex-1 min-w-0 w-full rounded-2xl md:w-full max-md:h-[320px] max-md:min-h-0">
        <YandexPickupPointsMap
          pickupPoints={pickupPoints}
          selectedPoint={selectedPickupPoint}
          onPointSelect={handlePickupPointSelect}
          center={mapCenter}
          zoom={12}
          className="w-full h-[220px] md:min-h-[990px] md:h-full"
        />
      </div>
    </div>
  );
};

export default ProfileAddressWayWithMap; 