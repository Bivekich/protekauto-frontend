import * as React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSidebar from '@/components/ProfileSidebar';
import CatalogSubscribe from '@/components/CatalogSubscribe';
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import LKMenu from '@/components/LKMenu';
import ProfileOrdersMain from '@/components/profile/ProfileOrdersMain';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Head from "next/head";




const ProfileOrdersPage = () => {
  return (
    <div className="page-wrapper">
            <Head>
        <title>ProfileOrders</title>
        <meta content="ProfileOrders" property="og:title" />
        <meta content="ProfileOrders" property="twitter:title" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <ProfileInfo />
      <div className="flex flex-col pt-10 pb-16 max-md:px-5">
        
        <div className="flex relative gap-8 items-start self-stretch max-md:gap-5 max-sm:flex-col max-sm:gap-4 justify-center mx-auto max-w-[1580px] w-full h-full">
          <LKMenu />
          <ProfileOrdersMain />
        </div>
      </div>
      <section className="section-3">
        <CatalogSubscribe />
      </section>
      <MobileMenuBottomSection />
      <Footer />
    </div>
  );
};

export default ProfileOrdersPage;
