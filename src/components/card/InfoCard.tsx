import React from "react";
import { useFavorites } from "@/contexts/FavoritesContext";

interface InfoCardProps {
  brand?: string;
  articleNumber?: string;
  name?: string;
  productId?: string;
  offerKey?: string;
  price?: number;
  currency?: string;
  image?: string;
}

export default function InfoCard({ 
  brand, 
  articleNumber, 
  name, 
  productId, 
  offerKey, 
  price = 0, 
  currency = 'RUB', 
  image 
}: InfoCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Проверяем, есть ли товар в избранном
  const isItemFavorite = isFavorite(productId, offerKey, articleNumber, brand);

  // Обработчик клика по сердечку
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isItemFavorite) {
      // Создаем ID для удаления
      const id = `${productId || offerKey || ''}:${articleNumber}:${brand}`;
      removeFromFavorites(id);
    } else {
      // Добавляем в избранное
      addToFavorites({
        productId,
        offerKey,
        name: name || "Название товара",
        brand: brand || "БРЕНД",
        article: articleNumber || "АРТИКУЛ",
        price,
        currency,
        image
      });
    }
  };

  return (
    <section className="section-info">
      <div className="w-layout-blockcontainer container info w-container">
        <div className="w-layout-vflex flex-block-9">
          <div className="w-layout-hflex flex-block-7">
            <a href="/" className="link-block w-inline-block">
              <div>Главная</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="/catalog" className="link-block w-inline-block">
              <div>Каталог</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block w-inline-block">
              <div>Автозапчасти</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block-2 w-inline-block">
              <div>{name || "Деталь"} </div>
            </a>
          </div>
          <div className="w-layout-hflex flex-block-bi">
            <div className="w-layout-hflex headingbi">
              <h1 className="heading-bi">{name || "Название товара"} {brand || "БРЕНД"}</h1>
              <div className="div-block-127">
                <div className="icon-setting w-embed">
                  <svg width="currentwidth" height="currentheight" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M15 25L13.405 23.5613C7.74 18.4714 4 15.1035 4 10.9946C4 7.6267 6.662 5 10.05 5C11.964 5 13.801 5.88283 15 7.26703C16.199 5.88283 18.036 5 19.95 5C23.338 5 26 7.6267 26 10.9946C26 15.1035 22.26 18.4714 16.595 23.5613L15 25Z" 
                      fill={isItemFavorite ? "#e53935" : "currentColor"}
                      style={{ color: isItemFavorite ? "#e53935" : undefined }}
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-layout-hflex rightbi">
              <div className="text-block-5-copy">{brand || "БРЕНД"} <strong className="bold-text">{articleNumber || "АРТИКУЛ"}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 