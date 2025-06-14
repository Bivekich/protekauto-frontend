import React from "react";

interface BestPriceCardProps {
  rating: string;
  title: string;
  description: string;
  price: string;
  delivery: string;
  stock: string;
}

const BestPriceCard: React.FC<BestPriceCardProps> = ({ rating, title, description, price, delivery, stock }) => (
  <div className="w-layout-vflex flex-block-44">
    <h3 className="heading-8-copy">Самая низкая цена</h3>
    <div className="w-layout-vflex flex-block-37">
      <div className="w-layout-vflex flex-block-40">
        <div className="w-layout-hflex flex-block-45">
          <div className="w-layout-hflex raiting">
            <img src="/images/Star-1.svg" loading="lazy" alt="" className="image-8" />
            <div className="text-block-22">{rating}</div>
          </div>
          <div className="w-layout-hflex flex-block-39">
            <h4 className="heading-9">{title}</h4>
            <div className="text-block-21">{description}</div>
          </div>
        </div>
        <div className="heading-9-copy">{price}</div>
      </div>
      <div className="div-block-16"></div>
      <div className="w-layout-hflex flex-block-43">
        <div className="w-layout-hflex flex-block-78">
          <div className="w-layout-hflex flex-block-80">
            <div className="w-layout-vflex">
              <div className="text-block-23">Срок</div>
              <div className="text-block-24">{delivery}</div>
            </div>
            <div className="w-layout-vflex">
              <div className="text-block-23">Наличие</div>
              <div className="text-block-24">{stock}</div>
            </div>
          </div>
          <div className="w-layout-hflex pcs-re">
            <div className="minus-plus">
              <img src="/images/minus_icon.svg" loading="lazy" alt="" />
            </div>
            <div className="input-pcs">
              <div className="text-block-26">1</div>
            </div>
            <div className="minus-plus">
              <img src="/images/plus_icon.svg" loading="lazy" alt="" />
            </div>
          </div>
        </div>
        <div className="w-layout-hflex flex-block-42">
          <a href="#" className="link-block-4-copy w-inline-block">
            <div className="div-block-25">
              <div className="icon-setting w-embed">
                <svg width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.1998 22.2C8.8798 22.2 7.81184 23.28 7.81184 24.6C7.81184 25.92 8.8798 27 10.1998 27C11.5197 27 12.5997 25.92 12.5997 24.6C12.5997 23.28 11.5197 22.2 10.1998 22.2ZM3 3V5.4H5.39992L9.71977 14.508L8.09982 17.448C7.90783 17.784 7.79984 18.18 7.79984 18.6C7.79984 19.92 8.8798 21 10.1998 21H24.5993V18.6H10.7037C10.5357 18.6 10.4037 18.468 10.4037 18.3L10.4397 18.156L11.5197 16.2H20.4594C21.3594 16.2 22.1513 15.708 22.5593 14.964L26.8552 7.176C26.9542 6.99286 27.004 6.78718 26.9997 6.57904C26.9955 6.37089 26.9373 6.16741 26.8309 5.98847C26.7245 5.80952 26.5736 5.66124 26.3927 5.55809C26.2119 5.45495 26.0074 5.40048 25.7992 5.4H8.05183L6.92387 3H3ZM22.1993 22.2C20.8794 22.2 19.8114 23.28 19.8114 24.6C19.8114 25.92 20.8794 27 22.1993 27C23.5193 27 24.5993 25.92 24.5993 24.6C24.5993 23.28 23.5193 22.2 22.1993 22.2Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="text-block-6">Купить</div>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default BestPriceCard; 