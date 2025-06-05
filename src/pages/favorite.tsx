import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Favorite() {
  return (
    <>
      <Head>
        <title>Favorite</title>
        <meta name="description" content="Favorite" />
      </Head>
      <Header />
      {/* Вставь сюда содержимое <body> из favorite.html, преобразовав в JSX. Все пути к картинкам и svg поменяй на /images/... */}
      {/* Пример: <img src="/images/logo.svg" ... /> */}
      {/* Сохрани все классы для стилей. */}
      {/* TODO: Перевести формы и интерактив на React позже */}
      <Footer />
    </>
  );
} 