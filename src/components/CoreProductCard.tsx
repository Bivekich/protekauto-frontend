import React from "react";

interface CoreProductCardProps {
  brand: string;
  article: string;
  name: string;
  image: string;
}

const CoreProductCard: React.FC<CoreProductCardProps> = ({ brand, article, name, image }) => (
  <>
    <div className="w-layout-vflex core-product">
      <div className="w-layout-vflex flex-block-47">
        <div className="div-block-19">
          <img src="/images/info.svg" loading="lazy" alt="info" className="image-9" />
        </div>
        <div className="w-layout-vflex flex-block-50">
          <div className="w-layout-hflex flex-block-79">
            <h3 className="heading-10 name">{brand}</h3>
            <h3 className="heading-10">{article}</h3>
          </div>
          <div className="text-block-21">{name}</div>
        </div>
      </div>
      <div className="div-block-20">
        <img src={image} loading="lazy" alt={name} className="image-10" />
      </div>
    </div>
    <div className="w-layout-vflex flex-block-48">
      <div className="w-layout-hflex sort-list">
        <div className="w-layout-hflex flex-block-49">
          <div className="sort-item first">Рейтинг</div>
          <div className="sort-item">Наличие</div>
          <div className="sort-item">Доставка</div>
        </div>
        <div className="sort-item price">Цена</div>
      </div>
      <div className="w-layout-vflex product-list-search">
        {/* --- Пример карточки товара --- */}
        <div className="w-layout-hflex product-item-search">
          <div className="w-layout-hflex flex-block-81">
            <div className="w-layout-hflex info-block-search-copy">
              <div className="w-layout-hflex raiting"><img src="/images/Star-1.svg" loading="lazy" alt="" className="image-8" />
                <div className="text-block-22">4,8</div>
              </div>
              <div className="pcs-search">444 шт</div>
              <div className="pcs-search">5 дней</div>
            </div>
            <div className="w-layout-hflex info-block-product-card-search">
              <div className="w-layout-hflex item-recommend"><img src="/images/ri_refund-fill.svg" loading="lazy" alt="" /></div>
              <div className="text-block-25">Рекомендуем</div>
            </div>
            <div className="price">от 17 323 ₽</div>
          </div>
          <div className="w-layout-hflex add-to-cart-block">
            <div className="w-layout-hflex flex-block-82">
              <div className="w-layout-hflex pcs">
                <div className="minus-plus"><img src="/images/minus_icon.svg" loading="lazy" alt="" /></div>
                <div className="input-pcs">
                  <div className="text-block-26">1</div>
                </div>
                <div className="minus-plus"><img src="/images/plus_icon.svg" loading="lazy" alt="" /></div>
              </div>
              <a href="#" className="button-icon w-inline-block"><img loading="lazy" src="/images/cart_icon.svg" alt="" className="image-11" /></a>
            </div>
          </div>
        </div>
        {/* --- Повторить product-item-search для остальных карточек --- */}
        <div className="w-layout-hflex product-item-search">
          <div className="w-layout-hflex flex-block-81">
            <div className="w-layout-hflex info-block-search-copy">
              <div className="w-layout-hflex raiting"><img src="/images/Star-1.svg" loading="lazy" alt="" className="image-8" />
                <div className="text-block-22">4,8</div>
              </div>
              <div className="pcs-search">444 шт</div>
              <div className="pcs-search">5 дней</div>
            </div>
            <div className="w-layout-hflex info-block-product-card-search">
              <div className="w-layout-hflex item-recommend"><img src="/images/ri_refund-fill.svg" loading="lazy" alt="" /></div>
              <div className="text-block-25">Рекомендуем</div>
            </div>
            <div className="price">от 17 323 ₽</div>
          </div>
          <div className="w-layout-hflex add-to-cart-block">
            <div className="w-layout-hflex flex-block-82">
              <div className="w-layout-hflex pcs">
                <div className="minus-plus"><img src="/images/minus_icon.svg" loading="lazy" alt="" /></div>
                <div className="input-pcs">
                  <div className="text-block-26">1</div>
                </div>
                <div className="minus-plus"><img src="/images/plus_icon.svg" loading="lazy" alt="" /></div>
              </div>
              <a href="#" className="button-icon w-inline-block"><img loading="lazy" src="/images/cart_icon.svg" alt="" className="image-11" /></a>
            </div>
          </div>
        </div>
        {/* ... остальные product-item-search ... */}
      </div>
      <div className="w-layout-hflex show-more-search">
        <div className="text-block-27">Ещё предложения от 4726 руб и 5 дней</div><img src="/images/arrow_drop_down.svg" loading="lazy" alt="" />
      </div>
    </div>
  </>
);

export default CoreProductCard; 