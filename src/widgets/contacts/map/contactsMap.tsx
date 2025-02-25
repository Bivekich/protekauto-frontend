'use client';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

export const ContactsMap = () => {
  return (
    <YMaps query={{ lang: 'ru_RU' }}>
      <div
        className={'h-[450px] w-full max-h-[450px] rounded-2xl overflow-hidden'}
      >
        <Map
          defaultState={{
            center: [56.339223, 37.532502],
            zoom: 9,
          }}
          className={'h-full w-full'}
        >
          <Placemark defaultGeometry={[56.339223, 37.532502]} />
        </Map>
      </div>
    </YMaps>
  );
};
