import React, { memo, useMemo } from 'react';
import CatalogProductCard from './CatalogProductCard';
import { useArticleImage } from '@/hooks/useArticleImage';
import { PartsAPIArticle } from '@/types/partsapi';

interface ArticleCardProps {
  article: PartsAPIArticle;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = memo(({ article, index }) => {
  console.log(`🎨 ArticleCard render для artId: ${article.artId}`);
  const { imageUrl, isLoading } = useArticleImage(article.artId);

  // Мемоизируем формирование названия товара
  const title = useMemo(() => {
    return [
      article.artSupBrand || 'N/A',
      article.artArticleNr || 'N/A',
      article.productGroup ? `- ${article.productGroup}` : ''
    ].filter(Boolean).join(' ');
  }, [article.artSupBrand, article.artArticleNr, article.productGroup]);

  return (
    <CatalogProductCard
      key={`${article.artId}_${index}`}
      image={imageUrl}
      discount="" // Пока без скидок
      price="" // Цена скрыта // price="Уточнить цену" // Цена уточняется через Laximo
      oldPrice=""
      title={title}
      brand={article.artSupBrand || 'N/A'}
    />
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard; 