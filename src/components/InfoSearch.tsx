import React from "react";

interface InfoSearchProps {
  brand: string;
  articleNumber: string;
  name: string;
  offersCount: number;
  minPrice: string;
}

const InfoSearch: React.FC<InfoSearchProps> = ({
  brand,
  articleNumber,
  name,
  offersCount,
  minPrice,
}) => (
  <section className="section-info">
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <div className="text-block-53">{brand} {articleNumber}</div>
          <div className="fsfav">
            <div className="icon-setting w-embed">
              <svg width="currentwidth" height="currentheight" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 25L13.405 23.5613C7.74 18.4714 4 15.1035 4 10.9946C4 7.6267 6.662 5 10.05 5C11.964 5 13.801 5.88283 15 7.26703C16.199 5.88283 18.036 5 19.95 5C23.338 5 26 7.6267 26 10.9946C26 15.1035 22.26 18.4714 16.595 23.5613L15 25Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">{name}</h1>
            <div className="text-block-4">
              Найдено {offersCount} предложений от {minPrice}
            </div>
          </div>
          {/* <div className="w-layout-hflex flex-block-11">
            <img src="/images/qwestions.svg" loading="lazy" alt="" className="image-4" />
            <div className="text-block-5">Как правильно подобрать запчасть?</div>
          </div> */}
        </div>
      </div>
    </div>
  </section>
);

export default InfoSearch; 