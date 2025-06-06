import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OrderConfirmation() {
  return (
    <>
      <Head>
        <title>Order Confirmation</title>
        <meta name="description" content="Order Confirmation" />
      </Head>
      <Header />
      {/* Вставь сюда содержимое <body> из order-confirmation.html, преобразовав в JSX. Все пути к картинкам и svg поменяй на /images/... */}
      {/* Пример: <img src="/images/logo.svg" ... /> */}
      {/* Сохрани все классы для стилей. */}
      {/* TODO: Перевести формы и интерактив на React позже */}
      <Footer />
    </>
  );
} 