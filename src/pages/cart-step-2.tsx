import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import CartRecommended from "../components/CartRecommended";
import CartInfo2 from "../components/CartInfo2";
import CartList2 from "../components/CartList2";
import CartSummary from "../components/CartSummary";
import MobileMenuBottomSection from "../components/MobileMenuBottomSection";

export default function CartStep2() {
  return (
    <>
      <Head>
        <title>Cart Step 2</title>
        <meta name="description" content="Cart Step 2" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <Header />
      <CartInfo2 />
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex cart-list">
            <div className="w-layout-hflex core-product-card">
              <CartList2 />
              <CartSummary />
            </div>
            <CartRecommended />
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