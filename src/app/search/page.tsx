'use client';

import { useSearchParams } from 'next/navigation';
import SearchResults from '../../components/SearchResults';
import { Suspense } from 'react';

function SearchContent() {
  // Получаем параметры поиска из URL
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return <SearchResults query={query} />;
}

export default function SearchPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div>Загрузка результатов поиска...</div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
}
