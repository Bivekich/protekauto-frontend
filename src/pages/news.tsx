import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import InfoNews from "@/components/news/InfoNews";
import NewsMenu from "@/components/news/NewsMenu";
import NewsCard from "@/components/news/NewsCard";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";

export default function News() {
  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="News" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />  
      </Head>
      <Header />
      <InfoNews />
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex">
            <NewsMenu />
            <div className="w-layout-hflex main-news">
              {Array(12).fill(0).map((_, i) => (
                <NewsCard
                  key={i}
                  title="Kia Syros будет выделяться необычным стилем"
                  description="Компания Kia готова представить новый кроссовер Syros"
                  category="Новости компании"
                  date="17.12.2024"
                  image="/images/news_img.png"
                />
              ))}
              <div className="w-layout-hflex pagination">
                  <a href="#" className="button_strock w-button">Показать ещё</a>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="section-3">
        <CatalogSubscribe />
      </section>
      <Footer />
      <MobileMenuBottomSection />
    </>
  );
} 