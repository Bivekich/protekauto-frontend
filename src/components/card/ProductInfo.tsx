import React from "react";

const ProductInfo = () => {
  return (
    <div className="w-layout-hflex info-block-search">
      <div className="w-layout-hflex raiting-copy">
        <div className="div-block-27">
          <div className="code-embed-12 w-embed">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.3158 0.643914C10.4674 0.365938 10.8666 0.365938 11.0182 0.643914L14.0029 6.11673C14.0604 6.22222 14.1623 6.29626 14.2804 6.31838L20.4077 7.46581C20.7189 7.52409 20.8423 7.9037 20.6247 8.13378L16.3421 12.6636C16.2595 12.7509 16.2206 12.8707 16.2361 12.9899L17.0382 19.1718C17.079 19.4858 16.7561 19.7204 16.47 19.5847L10.8385 16.9114C10.73 16.8599 10.604 16.8599 10.4955 16.9114L4.86394 19.5847C4.5779 19.7204 4.25499 19.4858 4.29573 19.1718L5.0979 12.9899C5.11336 12.8707 5.07444 12.7509 4.99189 12.6636L0.709252 8.13378C0.491728 7.9037 0.615069 7.52409 0.926288 7.46581L7.05357 6.31838C7.17168 6.29626 7.27358 6.22222 7.33112 6.11673L10.3158 0.643914Z" fill="CurrentColor"></path>
            </svg>
          </div>
        </div>
        <div className="text-block-22">4,8</div>
      </div>
      <div className="w-layout-hflex info-block-product-card-search">
        <div className="w-layout-hflex item-recommend-copy">
          <img loading="lazy" src="images/ri_refund-fill_1.svg" alt="" />
        </div>
        <div className="w-layout-hflex item-recommend-copy">
          <img loading="lazy" src="images/mdi_approve.svg" alt="" />
        </div>
        <div className="w-layout-hflex item-recommend-copy">
          <img loading="lazy" src="images/ri_refund-fill.svg" alt="" className="image-16" />
        </div>
      </div>
      <div className="delivery-time-search">Сегодня с 18:00</div>
      <div className="adress-card">Москва ЦС (Новая Рига)</div>
    </div>
  );
};

export default ProductInfo; 