import Header from "@/components/Header";
import Head from "next/head";
import Footer from "@/components/Footer";
import CartInfo from "@/components/CartInfo";
import CartList from "@/components/CartList";
import CartSummary from "@/components/CartSummary";
import CartRecommended from "../components/CartRecommended";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";

export default function CartPage() {
  return (
    <><Head>
        <title>Cart</title>
        <meta name="description" content="Cart" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>

      <CartInfo />

      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex cart-list">
            <div className="w-layout-hflex core-product-card">
                <CartList />
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