import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import CartRecommended from "@/components/CartRecommended";
import InfoCard from "@/components/card/InfoCard";  
import ProductImageGallery from "@/components/card/ProductImageGallery";
import ProductSortHeader from "@/components/card/ProductSortHeader";
import ProductList from "@/components/card/ProductList";
import ShowMoreOffers from "@/components/card/ShowMoreOffers";
import ProductCharacteristics from "@/components/card/ProductCharacteristics";
import ProductDescriptionTabs from "@/components/card/ProductDescriptionTabs";

export default function CardPage() {
  return (
    <>
      <Head>
        <title>Card</title>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
  </Head>
  <Header />
  <InfoCard />
  <section className="main">
    <div className="w-layout-blockcontainer container w-container">
      <div className="w-layout-vflex flex-block-14">
        <div className="w-layout-hflex core-product-card-copy">
          <ProductImageGallery />
          <div className="w-layout-vflex flex-block-48">
            <ProductSortHeader />
            <ProductList />
            <ShowMoreOffers />
            <div className="w-layout-vflex description-item">
              <ProductDescriptionTabs />
              <ProductCharacteristics />
            </div>
          </div>
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