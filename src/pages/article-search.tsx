import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import { DOC_FIND_OEM } from "@/lib/graphql";
import { LaximoDocFindOEMResult } from "@/types/laximo";

const ArticleSearchPage = () => {
  const router = useRouter();
  const { article } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (article && typeof article === 'string') {
      setSearchQuery(article.trim().toUpperCase());
    }
  }, [article]);

  const { data, loading, error } = useQuery(DOC_FIND_OEM, {
    variables: {
      oemNumber: searchQuery
    },
    skip: !searchQuery,
    errorPolicy: 'all'
  });

  const handleFindOffers = (articleNumber: string, brand: string) => {
    // Переходим на страницу поиска предложений
    router.push(`/search-result?article=${encodeURIComponent(articleNumber)}&brand=${encodeURIComponent(brand)}`);
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Поиск деталей по артикулу {searchQuery} - Protek</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Поиск деталей по артикулу...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const result: LaximoDocFindOEMResult | null = data?.laximoDocFindOEM || null;
  const hasResults = result && result.details && result.details.length > 0;

  return (
    <>
      <Head>
        <title>Поиск деталей по артикулу {searchQuery} - Protek</title>
        <meta name="description" content={`Результаты поиска деталей по артикулу ${searchQuery}`} />
      </Head>
      <Header />
      
      <main className="min-h-screen bg-gray-50 pt-20">
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="text-sm text-gray-500">
                <a href="/" className="text-gray-500 hover:text-gray-700">Главная</a>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Поиск деталей по артикулу</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-red-800">Ошибка поиска</h3>
                  <p className="text-red-700 mt-1">Произошла ошибка при поиске деталей. Попробуйте еще раз.</p>
                </div>
              </div>
            </div>
          )}

          {!hasResults && !loading && !error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-yellow-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Детали не найдены</h3>
              <p className="text-yellow-700 mb-4">
                По артикулу <span className="font-mono font-semibold">{searchQuery}</span> детали не найдены.
              </p>
              <p className="text-sm text-yellow-600">
                Попробуйте изменить запрос или проверьте правильность написания артикула.
              </p>
            </div>
          )}

          {hasResults && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Поиск деталей по артикулу: {searchQuery}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Выберите нужную деталь
                </p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {result.details.map((detail, index) => (
                  <div key={detail.detailid || index}>
                    <button
                      onClick={() => handleFindOffers(detail.formattedoem || detail.oem, detail.manufacturer)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors block"
                    >
                      <div className="text-blue-600 hover:text-blue-800 font-medium">
                        {detail.manufacturer}: {detail.formattedoem || detail.oem} {detail.name}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <MobileMenuBottomSection />
    </>
  );
};

export default ArticleSearchPage;