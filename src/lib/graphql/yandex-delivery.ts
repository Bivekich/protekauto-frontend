import { gql } from '@apollo/client';

// Фрагмент для ПВЗ
export const YANDEX_PICKUP_POINT_FRAGMENT = gql`
  fragment YandexPickupPointFragment on YandexPickupPoint {
    id
    name
    address {
      fullAddress
      locality
      street
      house
      building
      apartment
      postalCode
      comment
    }
    contact {
      phone
      email
      firstName
      lastName
    }
    position {
      latitude
      longitude
    }
    schedule {
      restrictions {
        days
        timeFrom {
          hours
          minutes
        }
        timeTo {
          hours
          minutes
        }
      }
      timeZone
    }
    type
    paymentMethods
    instruction
    isDarkStore
    isMarketPartner
    isPostOffice
    isYandexBranded
    formattedSchedule
    typeLabel
  }
`;

// Запрос для определения местоположения
export const YANDEX_DETECT_LOCATION = gql`
  query YandexDetectLocation($location: String!) {
    yandexDetectLocation(location: $location) {
      address
      geoId
    }
  }
`;

// Запрос для получения всех ПВЗ с фильтрами
export const YANDEX_PICKUP_POINTS = gql`
  ${YANDEX_PICKUP_POINT_FRAGMENT}
  query YandexPickupPoints($filters: YandexPickupPointFilters) {
    yandexPickupPoints(filters: $filters) {
      ...YandexPickupPointFragment
    }
  }
`;

// Запрос для получения ПВЗ по городу
export const YANDEX_PICKUP_POINTS_BY_CITY = gql`
  ${YANDEX_PICKUP_POINT_FRAGMENT}
  query YandexPickupPointsByCity($cityName: String!) {
    yandexPickupPointsByCity(cityName: $cityName) {
      ...YandexPickupPointFragment
    }
  }
`;

// Запрос для получения ПВЗ по координатам
export const YANDEX_PICKUP_POINTS_BY_COORDINATES = gql`
  ${YANDEX_PICKUP_POINT_FRAGMENT}
  query YandexPickupPointsByCoordinates($latitude: Float!, $longitude: Float!, $radiusKm: Float) {
    yandexPickupPointsByCoordinates(latitude: $latitude, longitude: $longitude, radiusKm: $radiusKm) {
      ...YandexPickupPointFragment
    }
  }
`;

// Типы для TypeScript
export interface YandexLocationVariant {
  address: string;
  geoId: number;
}

export interface YandexPickupPointAddress {
  fullAddress: string;
  locality?: string;
  street?: string;
  house?: string;
  building?: string;
  apartment?: string;
  postalCode?: string;
  comment?: string;
}

export interface YandexPickupPointContact {
  phone: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface YandexPickupPointPosition {
  latitude: number;
  longitude: number;
}

export interface YandexPickupPointScheduleTime {
  hours: number;
  minutes: number;
}

export interface YandexPickupPointScheduleRestriction {
  days: number[];
  timeFrom: YandexPickupPointScheduleTime;
  timeTo: YandexPickupPointScheduleTime;
}

export interface YandexPickupPointSchedule {
  restrictions: YandexPickupPointScheduleRestriction[];
  timeZone: number;
}

export type YandexPickupPointType = 'pickup_point' | 'terminal' | 'post_office' | 'sorting_center';
export type YandexPaymentMethod = 'already_paid' | 'card_on_receipt';

export interface YandexPickupPoint {
  id: string;
  name: string;
  address: YandexPickupPointAddress;
  contact: YandexPickupPointContact;
  position: YandexPickupPointPosition;
  schedule: YandexPickupPointSchedule;
  type: YandexPickupPointType;
  paymentMethods: YandexPaymentMethod[];
  instruction?: string;
  isDarkStore: boolean;
  isMarketPartner: boolean;
  isPostOffice: boolean;
  isYandexBranded: boolean;
  formattedSchedule: string;
  typeLabel: string;
}

export interface YandexPickupPointFilters {
  geoId?: number;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  isYandexBranded?: boolean;
  isPostOffice?: boolean;
  type?: YandexPickupPointType;
} 