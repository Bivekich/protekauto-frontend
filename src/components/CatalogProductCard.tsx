import Link from "next/link";
import React from "react";
import { useFavorites } from "@/contexts/FavoritesContext";

interface CatalogProductCardProps {
  image: string;
  discount: string;
  price: string;
  oldPrice: string;
  title: string;
  brand: string;
  articleNumber?: string;
  brandName?: string;
  artId?: string;
  productId?: string;
  offerKey?: string;
  currency?: string;
  onAddToCart?: (e: React.MouseEvent) => void | Promise<void>;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({
  image,
  discount,
  price,
  oldPrice,
  title,
  brand,
  articleNumber,
  brandName,
  artId,
  productId,
  offerKey,
  currency = 'RUB',
  onAddToCart,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Создаем ссылку на card с параметрами товара
  const cardUrl = articleNumber && brandName 
    ? `/card?article=${encodeURIComponent(articleNumber)}&brand=${encodeURIComponent(brandName)}${artId ? `&artId=${artId}` : ''}`
    : '/card'; // Fallback на card если нет данных

  // Проверяем, есть ли товар в избранном
  const isItemFavorite = isFavorite(productId, offerKey, articleNumber, brandName || brand);

  // Обработчик клика по сердечку
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Извлекаем цену как число
    const numericPrice = parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

    if (isItemFavorite) {
      // Создаем ID для удаления
      const id = `${productId || offerKey || ''}:${articleNumber}:${brandName || brand}`;
      removeFromFavorites(id);
    } else {
      // Добавляем в избранное
      addToFavorites({
        productId,
        offerKey,
        name: title,
        brand: brandName || brand,
        article: articleNumber || '',
        price: numericPrice,
        currency,
        image
      });
    }
  };

  // Обработчик клика по кнопке "Купить"
  const handleBuyClick = (e: React.MouseEvent) => {
    if (onAddToCart) {
      onAddToCart(e);
    } else {
      // Fallback - переходим на страницу товара
      window.location.href = cardUrl;
    }
  };

  return (
    <div className="w-layout-vflex flex-block-15-copy" data-article-card="visible">
      <div className="favcardcat" onClick={handleFavoriteClick} style={{ cursor: 'pointer' }}>
        <div className="icon-setting w-embed">
          <svg width="currentwidth" height="currentheight" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5996 3.5C15.8107 3.5 17.5 5.1376 17.5 7.19629C17.5 8.46211 16.9057 9.65758 15.7451 11.0117C14.8712 12.0314 13.7092 13.1034 12.3096 14.3311L10.833 15.6143L10.832 15.6152L10 16.3369L9.16797 15.6152L9.16699 15.6143L7.69043 14.3311C6.29084 13.1034 5.12883 12.0314 4.25488 11.0117C3.09428 9.65758 2.50003 8.46211 2.5 7.19629C2.5 5.1376 4.18931 3.5 6.40039 3.5C7.6497 3.50012 8.85029 4.05779 9.62793 4.92188L10 5.33398L10.3721 4.92188C11.1497 4.05779 12.3503 3.50012 13.5996 3.5Z" fill="currentColor" ></path>
          </svg>
        </div>
      </div>
      
      {/* Делаем картинку и контент кликабельными для перехода на card */}
      <Link href={cardUrl} className="div-block-4" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={image} loading="lazy" width="Auto" height="Auto" alt="" className="image-5" />
        <div className="text-block-7">{discount}</div>
      </Link>
      
      <Link href={cardUrl} className="div-block-3" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="w-layout-hflex flex-block-16">
          <div className="text-block-8">{price}</div>
          <div className="text-block-9">{oldPrice}</div>
        </div>
        <div className="text-block-10">{title}</div>
        <div className="text-block-11">{brand}</div>
      </Link>
      
      {/* Обновляем кнопку купить */}
      <div className="catc w-inline-block" onClick={handleBuyClick} style={{ cursor: 'pointer' }}>
        <div className="div-block-25">
          <div className="icon-setting w-embed">
            <svg width="currentWidht" height="currentHeight" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1998 22.2C8.8798 22.2 7.81184 23.28 7.81184 24.6C7.81184 25.92 8.8798 27 10.1998 27C11.5197 27 12.5997 25.92 12.5997 24.6C12.5997 23.28 11.5197 22.2 10.1998 22.2ZM3 3V5.4H5.39992L9.71977 14.508L8.09982 17.448C7.90783 17.784 7.79984 18.18 7.79984 18.6C7.79984 19.92 8.8798 21 10.1998 21H24.5993V18.6H10.7037C10.5357 18.6 10.4037 18.468 10.4037 18.3L10.4397 18.156L11.5197 16.2H20.4594C21.3594 16.2 22.1513 15.708 22.5593 14.964L26.8552 7.176C26.9542 6.99286 27.004 6.78718 26.9997 6.57904C26.9955 6.37089 26.9373 6.16741 26.8309 5.98847C26.7245 5.80952 26.5736 5.66124 26.3927 5.55809C26.2119 5.45495 26.0074 5.40048 25.7992 5.4H8.05183L6.92387 3H3ZM22.1993 22.2C20.8794 22.2 19.8114 23.28 19.8114 24.6C19.8114 25.92 20.8794 27 22.1993 27C23.5193 27 24.5993 25.92 24.5993 24.6C24.5993 23.28 23.5193 22.2 22.1993 22.2Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        <div className="text-block-6">Купить</div>
      </div>
    </div>
  );
};

export default CatalogProductCard; 