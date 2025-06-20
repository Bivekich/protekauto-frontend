import React, { useEffect, useRef, useState } from 'react';
import { YandexPickupPoint } from '@/lib/graphql/yandex-delivery';

interface YandexPickupPointsMapProps {
  pickupPoints: YandexPickupPoint[];
  selectedPoint?: YandexPickupPoint;
  onPointSelect: (point: YandexPickupPoint) => void;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

declare global {
  interface Window {
    ymaps: any;
    selectPickupPoint?: (pointId: string) => void;
  }
}

const YandexPickupPointsMap: React.FC<YandexPickupPointsMapProps> = ({
  pickupPoints,
  selectedPoint,
  onPointSelect,
  center = [55.76, 37.64], // Москва по умолчанию
  zoom = 10,
  className = "w-full h-full"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [clusterer, setClusterer] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка Яндекс карт API
  useEffect(() => {
    if (window.ymaps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.onload = () => {
      window.ymaps.ready(() => {
        setIsLoaded(true);
      });
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Инициализация карты
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const ymap = new window.ymaps.Map(mapRef.current, {
      center,
      zoom,
      controls: ['zoomControl', 'searchControl', 'trafficControl', 'fullscreenControl']
    });

    const clstr = new window.ymaps.Clusterer({
      preset: 'islands#redClusterIcons',
      groupByCoordinates: false,
      clusterDisableClickZoom: false,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false
    });

    ymap.geoObjects.add(clstr);
    setMap(ymap);
    setClusterer(clstr);
  }, [isLoaded, center, zoom, map]);

  // Обновление точек на карте
  useEffect(() => {
    if (!map || !clusterer) return;

    clusterer.removeAll();

    const placemarks = pickupPoints.map(point => {
      const placemark = new window.ymaps.Placemark(
        [point.position.latitude, point.position.longitude],
        {
          balloonContentHeader: `<strong>${point.name}</strong>`,
          balloonContentBody: `
            <div style="max-width: 300px;">
              <p><strong>Адрес:</strong> ${point.address.fullAddress}</p>
              <p><strong>Тип:</strong> ${point.typeLabel}</p>
              <p><strong>Телефон:</strong> ${point.contact.phone}</p>
              <p><strong>Режим работы:</strong><br/>${point.formattedSchedule}</p>
              ${point.instruction ? `<p><strong>Инструкция:</strong> ${point.instruction}</p>` : ''}
              <button 
                onclick="window.selectPickupPoint('${point.id}')" 
                style="
                  background: #dc2626; 
                  color: white; 
                  border: none; 
                  padding: 8px 16px; 
                  border-radius: 6px; 
                  cursor: pointer; 
                  margin-top: 10px;
                  font-size: 14px;
                "
              >
                Выбрать этот пункт
              </button>
            </div>
          `,
          hintContent: point.name
        },
        {
          preset: selectedPoint?.id === point.id ? 'islands#redIcon' : 'islands#blueIcon',
          iconColor: selectedPoint?.id === point.id ? '#dc2626' : '#3b82f6'
        }
      );

      placemark.events.add('click', () => {
        onPointSelect(point);
      });

      return placemark;
    });

    clusterer.add(placemarks);

    // Если есть точки, подгоняем карту под них
    if (pickupPoints.length > 0) {
      map.setBounds(clusterer.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 20
      });
    }
  }, [map, clusterer, pickupPoints, selectedPoint, onPointSelect]);

  // Глобальная функция для выбора точки из балуна
  useEffect(() => {
    window.selectPickupPoint = (pointId: string) => {
      const point = pickupPoints.find(p => p.id === pointId);
      if (point) {
        onPointSelect(point);
      }
    };

    return () => {
      delete window.selectPickupPoint;
    };
  }, [pickupPoints, onPointSelect]);

  // Центрирование на выбранной точке
  useEffect(() => {
    if (map && selectedPoint) {
      map.setCenter([selectedPoint.position.latitude, selectedPoint.position.longitude], 15);
    }
  }, [map, selectedPoint]);

  if (!isLoaded) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-600">Загрузка карты...</div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};

export default YandexPickupPointsMap; 