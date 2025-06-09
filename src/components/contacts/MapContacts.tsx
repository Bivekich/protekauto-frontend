import React from "react";

const MapContacts = () => (
  <div className="w-layout-vflex map-contacts">
    <div className="map w-widget w-widget-map" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=37.532502%2C56.339223&mode=whatshere&whatshere%5Bpoint%5D=37.532502%2C56.339223&whatshere%5Bzoom%5D=17&z=16"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0 }}
        title="Карта"
      ></iframe>
    </div>
  </div>
);

export default MapContacts; 