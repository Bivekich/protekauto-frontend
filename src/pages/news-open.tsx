import CatalogSubscribe from "@/components/CatalogSubscribe";
import Header from "@/components/Header";
import Head from "next/head";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import InfoNewsOpen from "@/components/news-open/InfoNewsOpen";
import ContentNews from "@/components/news-open/ContentNews";
import NewsCard from "@/components/news/NewsCard";

export default function NewsOpen() {
  return (
    <>
      <Head>
        <title>news open</title>
        <meta content="news open" property="og:title" />
        <meta content="news open" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/protekproject.webflow.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <InfoNewsOpen />
        <section className="main">
          <div className="w-layout-blockcontainer container w-container">
            <div className="w-layout-hflex flex-block-67">
              <div className="w-layout-vflex flex-block-72">
                <div className="w-layout-vflex flex-block-97">
                    <ContentNews />
                </div>
                <div className="w-layout-vflex lastnews">
                <NewsCard
                  key={1}
                  title="Kia Syros будет выделяться необычным стилем"
                  description="Компания Kia готова представить новый кроссовер Syros"
                  category="Новости компании"
                  date="17.12.2024"
                  image="/images/news_img.png"
                />
                <NewsCard
                  key={2}
                  title="Kia Syros будет выделяться необычным стилем"
                  description="Компания Kia готова представить новый кроссовер Syros"
                  category="Новости компании"
                  date="17.12.2024"
                  image="/images/news_img.png"
                />
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