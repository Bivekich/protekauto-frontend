import React from "react";
import Link from "next/link";

const ContentNews = () => (
  <div className="w-layout-vflex contentnews">
    <div className="w-layout-hflex flex-block-74-copy">
      <h2 className="heading-14">Объявлен старт продаж электрических насосов</h2>
      <div>
        Бренд вывел на рынок сразу широкий ассортимент, уже на старте продаж - более 100 артикулов и включает в себя позиции для брендов-лидеров автомобильного рынка, например: артикул 77WPE080 для Mercedes-Benz S-CLASS (W221, C216), артикул 77WPE096 – Land Rover DISCOVERY V (L462) / Jaguar F-PACE (X761), артикул 77WPE014 – Audi Q5 (8RB) / Volkswagen TOUAREG (7P5, 7P6).
      </div>
      <img
        src="/images/image.png"
        loading="lazy"
        sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
        srcSet="/images/image.png 500w, /images/image.png 800w, /images/image.png 1080w, /images/image.png 1150w"
        alt=""
        className="image-19"
      />
      <h3 className="h3nrws">Преимущества электрических насосов охлаждающей жидкости MasterKit Electro:</h3>
      <ul role="list" className="list">
        <li className="list-item">Отличная производительность за счёт применения компонентов известных мировых брендов.</li>
        <li className="list-item">Герметичность и устойчивость к коррозии</li>
        <li className="list-item">Высококачественные материалы компонентов, обеспечивающие долгий срок службы</li>
        <li className="list-item">Широкий ассортимент – более 100 артикулов</li>
      </ul>
      <div>
        На электрические насосы системы охлаждения MasterKit Electro предоставляется гарантия 1 год или 30.000 км пробега, в зависимости от того, что наступит раньше. Все новинки уже внесены в каталог подбора продукции и доступны для заказа.
      </div>
      <Link href="/card" className="submit-button-copy w-button">
        Перейти к товару
      </Link>
    </div>
  </div>
);

export default ContentNews; 