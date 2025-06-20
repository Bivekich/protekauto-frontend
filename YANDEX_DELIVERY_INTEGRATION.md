# Интеграция с Яндекс доставкой

## Описание

Интеграция позволяет пользователям выбирать пункты выдачи заказов (ПВЗ) Яндекса прямо в интерфейсе приложения. Реализованы следующие возможности:

- Получение списка ПВЗ по городу
- Получение ПВЗ по координатам пользователя
- Отображение ПВЗ на интерактивной карте Яндекса
- Поиск и фильтрация ПВЗ
- Автоматическое определение местоположения пользователя

## Компоненты

### 1. YandexPickupPointsMap
Компонент интерактивной карты с отображением ПВЗ.

**Свойства:**
- `pickupPoints` - массив ПВЗ для отображения
- `selectedPoint` - выбранный ПВЗ (опционально)
- `onPointSelect` - callback для выбора ПВЗ
- `center` - центр карты [latitude, longitude]
- `zoom` - масштаб карты
- `className` - CSS классы

### 2. PickupPointSelector
Дропдаун для поиска и выбора ПВЗ.

**Свойства:**
- `selectedPoint` - выбранный ПВЗ (опционально)
- `onPointSelect` - callback для выбора ПВЗ
- `placeholder` - текст плейсхолдера
- `className` - CSS классы

### 3. AddressFormWithPickup
Форма добавления адреса с поддержкой ПВЗ.

### 4. ProfileAddressWayWithMap
Основной компонент страницы адресов с картой.

## GraphQL запросы

### yandexPickupPointsByCity
Получение ПВЗ по названию города.

```graphql
query YandexPickupPointsByCity($cityName: String!) {
  yandexPickupPointsByCity(cityName: $cityName) {
    id
    name
    address {
      fullAddress
      locality
      street
      house
    }
    position {
      latitude
      longitude
    }
    schedule {
      restrictions {
        days
        timeFrom { hours, minutes }
        timeTo { hours, minutes }
      }
    }
    formattedSchedule
    typeLabel
  }
}
```

### yandexPickupPointsByCoordinates
Получение ПВЗ по координатам в заданном радиусе.

```graphql
query YandexPickupPointsByCoordinates(
  $latitude: Float!, 
  $longitude: Float!, 
  $radiusKm: Float
) {
  yandexPickupPointsByCoordinates(
    latitude: $latitude, 
    longitude: $longitude, 
    radiusKm: $radiusKm
  ) {
    # ... те же поля что и выше
  }
}
```

## Переменные окружения

### Backend (CMS)
```bash
# Bearer токен для Яндекс доставки
YANDEX_DELIVERY_TOKEN=y0__xC_nKGfCBix9Bwg_4PExxMAIXthQ06xzK8CocXFCC4pQ8yd2w
```

### Frontend
```bash
# API ключ для Яндекс карт
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=7370dc42-acbd-463c-8302-749f9c6ec144
```

## Использование

### Базовое использование карты
```tsx
import YandexPickupPointsMap from '@/components/delivery/YandexPickupPointsMap';
import { YandexPickupPoint } from '@/lib/graphql/yandex-delivery';

const [pickupPoints, setPickupPoints] = useState<YandexPickupPoint[]>([]);
const [selectedPoint, setSelectedPoint] = useState<YandexPickupPoint>();

<YandexPickupPointsMap
  pickupPoints={pickupPoints}
  selectedPoint={selectedPoint}
  onPointSelect={setSelectedPoint}
  center={[54.7065, 20.5110]} // Калининград
  zoom={12}
/>
```

### Использование селектора ПВЗ
```tsx
import PickupPointSelector from '@/components/delivery/PickupPointSelector';

<PickupPointSelector
  selectedPoint={selectedPoint}
  onPointSelect={setSelectedPoint}
  placeholder="Выберите пункт выдачи"
/>
```

### Загрузка ПВЗ по городу
```tsx
import { useLazyQuery } from '@apollo/client';
import { YANDEX_PICKUP_POINTS_BY_CITY } from '@/lib/graphql/yandex-delivery';

const [loadPoints] = useLazyQuery(YANDEX_PICKUP_POINTS_BY_CITY, {
  onCompleted: (data) => {
    setPickupPoints(data.yandexPickupPointsByCity || []);
  }
});

// Загрузка ПВЗ
loadPoints({ variables: { cityName: 'Калининград' } });
```

## API Яндекс доставки

### Эндпоинты
- **Продакшен:** `https://b2b-authproxy.taxi.yandex.net/api/b2b/platform`
- **Тест:** `https://b2b.taxi.tst.yandex.net/api/b2b/platform`

### Используемые методы
1. `/location/detect` - определение geo_id по адресу
2. `/pickup-points/list` - получение списка ПВЗ

### Аутентификация
Используется Bearer токен в заголовке `Authorization`:
```
Authorization: Bearer y0__xC_nKGfCBix9Bwg_4PExxMAIXthQ06xzK8CocXFCC4pQ8yd2w
```

## Особенности реализации

### Безопасность
- API ключ Яндекс карт доступен в браузере (NEXT_PUBLIC_)
- Bearer токен доставки используется только на бэкенде
- Координаты пользователя запрашиваются только с разрешения

### Производительность
- Кластеризация маркеров на карте для большого количества ПВЗ
- Ленивая загрузка ПВЗ только при необходимости
- Кэширование запросов в Apollo Client

### UX/UI
- Автоматическое определение местоположения
- Поиск ПВЗ по названию и адресу
- Отображение полной информации о ПВЗ в балунах
- Адаптивный дизайн для мобильных устройств

## Структура данных ПВЗ

```typescript
interface YandexPickupPoint {
  id: string;
  name: string;
  address: {
    fullAddress: string;
    locality?: string;
    street?: string;
    house?: string;
    // ... другие поля адреса
  };
  contact: {
    phone: string;
    email?: string;
    // ... другие контакты
  };
  position: {
    latitude: number;
    longitude: number;
  };
  schedule: {
    restrictions: Array<{
      days: number[]; // 1-7 (пн-вс)
      timeFrom: { hours: number; minutes: number };
      timeTo: { hours: number; minutes: number };
    }>;
    timeZone: number;
  };
  type: 'pickup_point' | 'terminal' | 'post_office' | 'sorting_center';
  paymentMethods: ('already_paid' | 'card_on_receipt')[];
  formattedSchedule: string; // "Пн-Пт: 09:00-21:00; Сб-Вс: 10:00-18:00"
  typeLabel: string; // "Пункт выдачи"
}
```

## Отладка

### Проверка загрузки карт
```javascript
// В консоли браузера
console.log('Яндекс карты загружены:', !!window.ymaps);
```

### Проверка API ключей
```bash
# Backend
echo $YANDEX_DELIVERY_TOKEN

# Frontend
echo $NEXT_PUBLIC_YANDEX_MAPS_API_KEY
```

### Логи GraphQL
Запросы и ошибки логируются в консоль браузера и сервера. 