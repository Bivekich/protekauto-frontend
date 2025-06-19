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
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage);

  // Проверяем что artId валидный
  const shouldFetch = enabled && artId && artId.trim() !== '';

  const { data, loading, error } = useQuery<PartsAPIMainImageData, PartsAPIMainImageVariables>(
    GET_PARTSAPI_MAIN_IMAGE,
    {
      variables: { artId: artId || '' },
      skip: !shouldFetch,
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
      onCompleted: (data) => {
        const url = data?.partsAPIMainImage;
        if (url && url !== null) {
          setImageUrl(url);
        } else {
          setImageUrl(fallbackImage);
        }
      },
      onError: (error) => {
        setImageUrl(fallbackImage);
      }
    }
  );

  return {
    imageUrl,
    isLoading: loading,
    error: !!error
  };
}; 