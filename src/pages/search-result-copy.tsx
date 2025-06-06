import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SearchResultCopy() {
  return (
    <>
      <Head>
        <title>Search Result Copy</title>
        <meta name="description" content="Search Result Copy" />
      </Head>
      <Header />
      {/* Вставь сюда содержимое <body> из search-result-copy.html, преобразовав в JSX. Все пути к картинкам и svg поменяй на /images/... */}
      {/* Пример: <img src="/images/logo.svg" ... /> */}
      {/* Сохрани все классы для стилей. */}
      {/* TODO: Перевести формы и интерактив на React позже */}
      <Footer />
    </>
  );
} 