import Link from "next/link";
import React, { useState, useCallback, useEffect } from "react";

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
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  // Сброс состояния при изменении изображения
  useEffect(() => {
    setHasImageError(false);
    setIsImageLoading(true);
  }, [image]);
  
  const handleImageError = useCallback(() => {
    setHasImageError(true);
    setIsImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
    setHasImageError(false);
  }, []);

  // Определяем финальный URL изображения
  const finalImageUrl = hasImageError ? '/images/image-10.png' : image;
  
  const searchResultUrl = (articleNumber && brandName) 
    ? `/search-result?article=${encodeURIComponent(articleNumber)}&brand=${encodeURIComponent(brandName)}&artId=${artId || ''}`
    : '/card'; // Fallback URL

  return (
    <div className="w-layout-vflex flex-block-15-copy">
      <Link href={searchResultUrl} className="card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="div-block-4">
          <div className="relative">
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={finalImageUrl} 
              loading="lazy" 
              width={210} 
              height={190} 
              alt={title}
              className="image-5"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ 
                opacity: isImageLoading ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          </div>
          {discount && <div className="text-block-7">{discount}</div>}
        </div>
        <div className="div-block-3">
          <div className="text-block-10">{title}</div>
          <div className="text-block-11">{brand}</div>
        </div>
      </Link>
      <Link href={searchResultUrl} className="link-block-4-copy w-inline-block">
        <div className="div-block-25">
          <div className="icon-setting w-embed">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="text-block-6">Узнать цену</div>
      </Link>
    </div>
  );
};

export default CatalogProductCard; 