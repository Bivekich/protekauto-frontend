import React from "react";

const ProductBuyBlock = () => {
  return (
    <div className="w-layout-hflex add-to-cart-block-copy">
      <div className="pcs-card">232 шт</div>
      <div className="price opencard">17 323 ₽</div>
      <div className="w-layout-hflex pcs-copy">
        <div className="minus-plus">
          <img loading="lazy" src="images/minus_icon.svg" alt="" />
        </div>
        <div className="input-pcs">
          <div className="text-block-26">1</div>
        </div>
        <div className="minus-plus">
          <img loading="lazy" src="images/plus_icon.svg" alt="" />
        </div>
      </div>
      <a href="#" className="button-icon w-inline-block">
        <img loading="lazy" src="images/cart_icon.svg" alt="" className="image-11" />
      </a>
    </div>
  );
};

export default ProductBuyBlock; 