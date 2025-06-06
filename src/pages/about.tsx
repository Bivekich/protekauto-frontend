import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import CatalogInfoHeader from "@/components/CatalogInfoHeader";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import AboutIntro from "@/components/about/AboutIntro";
import AboutOffers from "@/components/about/AboutOffers";
import AboutProtekInfo from "@/components/about/AboutProtekInfo";
import AboutHelp from "@/components/about/AboutHelp";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>

        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <Header />
      <CatalogInfoHeader
        title="О компании"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "О компании" }
        ]}
      />
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-hflex flex-block-67">
            <AboutIntro />
            <AboutOffers />
            <AboutProtekInfo />
            <AboutHelp />
          </div>
        </div>
      </section>
      <section className="section-3">
        <CatalogSubscribe />
      </section>
      <Footer />
      <MobileMenuBottomSection />
      <style jsx>{`
        .text-block-36 { font-size: 14px; }
        .submit-button.w-button { font-size: 16px; }
        .heading-14 { font-size: 20px; }
        .heading-13 { font-size: 24px; }
        .text-block-37 { font-size: 14px; }
        .text-block-38 { font-size: 14px; }
        .text-block-19 { font-size: 16px; }
      `}</style>
    </>
  );
} 