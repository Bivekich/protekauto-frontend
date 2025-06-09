import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import InfoWholesale from "@/components/wholesale/InfoWholesale";
import DescWholesale from "@/components/wholesale/DescWholesale";
import WhyWholesale from "@/components/wholesale/WhyWholesale";
import ServiceWholesale from "@/components/wholesale/ServiceWholesale";
import HowToBuy from "@/components/wholesale/HowToBuy";
import Help from "@/components/Help";


export default function Wholesale() {
  return (
    <>
      <Head>
        <title>wholesale</title>
        <meta content="wholesale" property="og:title" />
        <meta content="wholesale" property="twitter:title" />
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
      <Header />
      <InfoWholesale />
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-hflex flex-block-67">
            <DescWholesale />
            <WhyWholesale />
            <ServiceWholesale />
            <HowToBuy />
            <Help />
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