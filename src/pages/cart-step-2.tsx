import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CartStep2() {
  return (
    <>
      <Head>
        <title>Cart Step 2</title>
        <meta name="description" content="Cart Step 2" />
      </Head>
      <Header />
      {/* Вставь сюда содержимое <body> из cart-step-2.html, преобразовав в JSX. Все пути к картинкам и svg поменяй на /images/... */}
      {/* Пример: <img src="/images/logo.svg" ... /> */}
      {/* Сохрани все классы для стилей. */}
      {/* TODO: Перевести формы и интерактив на React позже */}
      <Footer />
    </>
  );
} 