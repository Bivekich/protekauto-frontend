import React from "react";
import { useFavorites } from "@/contexts/FavoritesContext";

const FavoriteInfo = () => {
  const { favorites } = useFavorites();
  
  const getCountText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${count} товаров`;
    }
    
    if (lastDigit === 1) {
      return `${count} товар`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${count} товара`;
    } else {
      return `${count} товаров`;
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
            <a href="#" className="link-block-2 w-inline-block">
              <div>Избранное</div>
            </a>
          </div>
          <div className="w-layout-hflex flex-block-8">
            <div className="w-layout-hflex flex-block-10">
              <h1 className="heading">Избранное</h1>
              <div className="text-block-4">
                {favorites.length > 0 
                  ? `Вы добавили ${getCountText(favorites.length)} в избранное`
                  : 'Нет избранных товаров'
                }
              </div>
            </div>
            <div className="w-layout-hflex flex-block-11">
              <img src="/images/qwestions.svg" loading="lazy" alt="" className="image-4" />
              <div className="text-block-5">Как пользоваться избранным?</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoriteInfo; 