import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PARTSAPI_MAIN_IMAGE } from '@/lib/graphql';
import { PartsAPIMainImageData, PartsAPIMainImageVariables } from '@/types/partsapi';

interface UseArticleImageOptions {
  enabled?: boolean;
  fallbackImage?: string;
}

interface UseArticleImageReturn {
  imageUrl: string;
  isLoading: boolean;
  error: boolean;
}

export const useArticleImage = (
  artId: string | undefined | null,
  options: UseArticleImageOptions = {}
): UseArticleImageReturn => {
  const { enabled = true, fallbackImage = '/images/image-10.png' } = options;
  const mountedRef = useRef(true);
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage);

  // Проверяем что artId валидный
  const shouldFetch = enabled && artId && artId.trim() !== '';

  const { data, loading, error } = useQuery<PartsAPIMainImageData, PartsAPIMainImageVariables>(
    GET_PARTSAPI_MAIN_IMAGE,
    {
      variables: { artId: artId || '' },
      skip: !shouldFetch,
      errorPolicy: 'ignore',
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: false,
    }
  );

  useEffect(() => {
    if (!mountedRef.current) return;

    if (data?.partsAPIMainImage && data.partsAPIMainImage.trim() !== '') {
      const imageUrlFromAPI = data.partsAPIMainImage;
      console.log(`✅ Устанавливаем изображение для ${artId}:`, imageUrlFromAPI);
      setImageUrl(imageUrlFromAPI);
    } else if (!loading && shouldFetch) {
      console.log(`⚠️ Изображение не найдено для ${artId}, используем fallback`);
      setImageUrl(fallbackImage);
    }
  }, [data, loading, fallbackImage, artId, shouldFetch]);

  // Cleanup при размонтировании
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    imageUrl,
    isLoading: Boolean(loading && shouldFetch),
    error: !!error
  };
}; 