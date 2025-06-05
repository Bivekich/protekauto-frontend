import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Cart() {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart" />
      </Head>
      <Header />
      {/* Вставь сюда содержимое <body> из cart.html, преобразовав в JSX. Все пути к картинкам и svg поменяй на /images/... */}
      {/* Пример: <img src="/images/logo.svg" ... /> */}
      {/* Сохрани все классы для стилей. */}
      {/* TODO: Перевести формы и интерактив на React позже */}
      <Footer />
    </>
  );
} 