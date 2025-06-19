import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import { DOC_FIND_OEM } from "@/lib/graphql";
import { LaximoDocFindOEMResult } from "@/types/laximo";

const InfoArticleSearch = () => (
  <section className="section-info">
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <a href="/" className="link-block w-inline-block">
            <div>Главная</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="#" className="link-block-2 w-inline-block">
            <div>Поиск деталей по артикулу</div>
          </a>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">Поиск деталей по артикулу</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
);

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
    router.push(`/search-result?article=${encodeURIComponent(articleNumber)}&brand=${encodeURIComponent(brand)}`);
  };

  const result: LaximoDocFindOEMResult | null = data?.laximoDocFindOEM || null;
  const hasResults = result && result.details && result.details.length > 0;

  return (
    <>
      <Head>
        <title>Поиск деталей по артикулу {searchQuery} - Protek</title>
        <meta name="description" content={`Результаты поиска деталей по артикулу ${searchQuery}`} />
      </Head>
      <InfoArticleSearch />
      <div className="page-wrapper bg-[#F5F8FB] min-h-screen">
        <div className="flex flex-col px-32 pt-10 pb-16 max-md:px-5">
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[1200px]">
              {loading && (
                <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center justify-center min-h-[300px]">
                  <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-red-600 mb-6"></div>
                  <p className="text-lg text-gray-600">Поиск деталей по артикулу...</p>
                </div>
              )}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-2xl shadow p-10 mb-6">
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
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow p-10 text-center">
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
                <div className="bg-white rounded-2xl shadow p-10">
                  <div className="border-b border-gray-200 pb-4">
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
      <div className="self-stretch my-auto  font-bold leading-snug text-gray-950 max-md:w-full hover:text-[#EC1C24] transition-colors">
        {detail.manufacturer}: {detail.formattedoem || detail.oem} {detail.name}
      </div>
    </button>
  </div>
))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <MobileMenuBottomSection />
        <Footer />
      </div>
    </>
  );
};

export default ArticleSearchPage;