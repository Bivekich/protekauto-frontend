import * as React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogSubscribe from '@/components/CatalogSubscribe';
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import LKMenu from '@/components/LKMenu';
import ProfileRequisitiesMain from '@/components/profile/ProfileRequisitiesMain';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Head from "next/head";


    
const ProfileRequisitiesPage = () => {
  return (
    <div className="page-wrapper">
            <Head>
        <title>ProfileRequisities</title>
        <meta content="ProfileRequisities" property="og:title" />
        <meta content="ProfileRequisities" property="twitter:title" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <ProfileInfo />
      <div className="flex flex-col pt-10 pb-16 max-md:px-5">
        
      <div className="flex relative gap-8 items-start self-stretch max-md:gap-5 max-sm:flex-col max-sm:gap-4 justify-center mx-auto max-w-[1580px] w-full h-full">
          <LKMenu />
          <ProfileRequisitiesMain />
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

export default ProfileRequisitiesPage;
