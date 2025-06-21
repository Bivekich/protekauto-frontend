import React, { memo, useState, useEffect } from 'react';
import CatalogProductCard from './CatalogProductCard';
import CatalogProductCardSkeleton from './CatalogProductCardSkeleton';
import { useArticleImage } from '@/hooks/useArticleImage';
import { useCatalogPrices } from '@/hooks/useCatalogPrices';
import { PartsAPIArticle } from '@/types/partsapi';

interface ArticleCardProps {
  article: PartsAPIArticle;
  index: number;
  onVisibilityChange?: (index: number, isVisible: boolean) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = memo(({ article, index, onVisibilityChange }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Используем хук для получения изображения
  const { imageUrl, isLoading: imageLoading, error } = useArticleImage(article.artId, {
    fallbackImage: '/images/image-10.png',
    enabled: !!article.artId
  });

  // Проверяем и очищаем данные артикула и бренда
  const articleNumber = article.artArticleNr?.trim();
  const brandName = article.artSupBrand?.trim();

  // Используем хук для получения цен только если есть и артикул, и бренд
  const { getPriceData, addToCart } = useCatalogPrices();
  const shouldFetchPrices = articleNumber && brandName && articleNumber !== '' && brandName !== '';
  const priceData = shouldFetchPrices ? getPriceData(articleNumber, brandName) : { minPrice: null, cheapestOffer: null, isLoading: false, hasOffers: false };

  // Определяем, должен ли отображаться товар
  useEffect(() => {
    if (!shouldFetchPrices) {
      // Если нет данных для поиска, не показываем товар
      setShouldShow(false);
      setIsChecking(false);
      onVisibilityChange?.(index, false);
      console.log('❌ ArticleCard: скрываем товар без данных:', { articleNumber, brandName });
      return;
    }

    if (priceData.isLoading) {
      // Если данные загружаются, ждем
      setIsChecking(true);
      return;
    }

    // Данные загружены - проверяем результат
    if (priceData.hasOffers) {
      setShouldShow(true);
      setIsChecking(false);
      onVisibilityChange?.(index, true);
      console.log('✅ ArticleCard: показываем товар с предложениями:', { articleNumber, brandName, hasPrice: !!priceData.minPrice });
    } else {
      setShouldShow(false);
      setIsChecking(false);
      onVisibilityChange?.(index, false);
      console.log('❌ ArticleCard: скрываем товар без предложений:', { articleNumber, brandName });
    }
  }, [shouldFetchPrices, priceData.isLoading, priceData.hasOffers, articleNumber, brandName, priceData.minPrice, index, onVisibilityChange]);

  // Показываем скелетон если данные загружаются или проверяются
  if (isChecking || (shouldShow && (priceData.isLoading || imageLoading))) {
    return <CatalogProductCardSkeleton />;
  }

  // Не отображаем ничего если товар не должен показываться
  if (!shouldShow) {
    return null;
  }

  // Формируем название товара
  const title = [
    brandName || 'N/A',
    articleNumber || 'N/A',
  ].filter(part => part !== 'N/A').join(', ');

  const brand = brandName || 'Unknown';

  // Формируем цену для отображения
  let priceText = '';
  if (priceData.isLoading) {
    priceText = 'Загрузка...';
  } else if (priceData.minPrice && priceData.minPrice > 0) {
    priceText = `от ${priceData.minPrice.toLocaleString('ru-RU')} ₽`;
  } else {
    priceText = 'По запросу';
  }

  // Обработчик добавления в корзину
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!shouldFetchPrices) {
      alert('Недостаточно данных для добавления товара в корзину');
      return;
    }
    
    await addToCart(articleNumber!, brandName!);
  };

  return (
    <CatalogProductCard
      image={imageUrl}
      discount="Новинка"
      price={priceText}
      oldPrice=""
      title={title}
      brand={brand}
      articleNumber={articleNumber}
      brandName={brandName}
      artId={article.artId}
      onAddToCart={handleAddToCart}
    />
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard; 