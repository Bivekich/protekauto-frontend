import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DetailSku() {
  return (
    <>
      <Head>
        <title>Detail SKU</title>
        <meta name="description" content="Detail SKU" />
      </Head>
      <Header />
      {/* Вставь сюда содержимое <body> из detail_sku.html, преобразовав в JSX. Все пути к картинкам и svg поменяй на /images/... */}
      {/* Пример: <img src="/images/logo.svg" ... /> */}
      {/* Сохрани все классы для стилей. */}
      {/* TODO: Перевести формы и интерактив на React позже */}
      <Footer />
    </>
  );
} 