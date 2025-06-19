import React, { memo } from 'react';
import CatalogProductCard from './CatalogProductCard';
import { useArticleImage } from '@/hooks/useArticleImage';
import { PartsAPIArticle } from '@/types/partsapi';

interface ArticleCardProps {
  article: PartsAPIArticle;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = memo(({ article, index }) => {
  // Используем хук для получения изображения
  const { imageUrl, isLoading, error } = useArticleImage(article.artId, {
    fallbackImage: '/images/image-10.png',
    enabled: !!article.artId
  });

  // Формируем название товара
  const title = [
    article.artSupBrand || 'N/A',
    article.artArticleNr || 'N/A',
  ].filter(Boolean).join(', ');

  const brand = article.artSupBrand || 'Unknown';

  return (
    <CatalogProductCard
      image={imageUrl}
      discount="Новинка"
      price=""
      oldPrice=""
      title={title}
      brand={brand}
      articleNumber={article.artArticleNr}
      brandName={article.artSupBrand}
      artId={article.artId}
    />
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard; 