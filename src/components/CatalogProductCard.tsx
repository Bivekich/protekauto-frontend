import Link from "next/link";
import React from "react";

interface CatalogProductCardProps {
  image: string;
  discount: string;
  price: string;
  oldPrice: string;
  title: string;
  brand: string;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({
  image,
  discount,
  price,
  oldPrice,
  title,
  brand,
}) => {
  console.log(`🖼️ CatalogProductCard: image URL = "${image}" для товара "${title}"`);
  
  return (
    <div className="w-layout-vflex flex-block-15-copy">
      <Link href="/card" className="card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="div-block-4">
          <img src={image} loading="lazy" width={210} height={190} alt="" className="image-5" />
          <div className="text-block-7">{discount}</div>
        </div>
        <div className="div-block-3">
          {/* Показываем блок цены только если цена не пустая */}
          {price && (
            <div className="w-layout-hflex flex-block-16">
              <div className="text-block-8">{price}</div>
              <div className="text-block-9">{oldPrice}</div>
            </div>
          )}
          <div className="text-block-10">{title}</div>
          <div className="text-block-11">{brand}</div>
        </div>
      </Link>
      <Link href="/cart" className="link-block-4-copy w-inline-block">
        <div className="div-block-25">
          <div className="icon-setting w-embed">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1998 22.2C8.8798 22.2 7.81184 23.28 7.81184 24.6C7.81184 25.92 8.8798 27 10.1998 27C11.5197 27 12.5997 25.92 12.5997 24.6C12.5997 23.28 11.5197 22.2 10.1998 22.2ZM3 3V5.4H5.39992L9.71977 14.508L8.09982 17.448C7.90783 17.784 7.79984 18.18 7.79984 18.6C7.79984 19.92 8.8798 21 10.1998 21H24.5993V18.6H10.7037C10.5357 18.6 10.4037 18.468 10.4037 18.3L10.4397 18.156L11.5197 16.2H20.4594C21.3594 16.2 22.1513 15.708 22.5593 14.964L26.8552 7.176C26.9542 6.99286 27.004 6.78718 26.9997 6.57904C26.9955 6.37089 26.9373 6.16741 26.8309 5.98847C26.7245 5.80952 26.5736 5.66124 26.3927 5.55809C26.2119 5.45495 26.0074 5.40048 25.7992 5.4H8.05183L6.92387 3H3ZM22.1993 22.2C20.8794 22.2 19.8114 23.28 19.8114 24.6C19.8114 25.92 20.8794 27 22.1993 27C23.5193 27 24.5993 25.92 24.5993 24.6C24.5993 23.28 23.5193 22.2 22.1993 22.2Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        <div className="text-block-6">Купить</div>
      </Link>
    </div>
  );
};

export default CatalogProductCard; 