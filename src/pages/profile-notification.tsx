import * as React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSidebar from '@/components/ProfileSidebar';
import CatalogSubscribe from '@/components/CatalogSubscribe';
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import LKMenu from '@/components/LKMenu';
import NotificationMane from '@/components/profile/NotificationMane';



const ProfileNotificationPage = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="flex relative flex-col gap-10 items-end self-stretch px-32 pt-10 pb-16">
        <div className="flex relative gap-8 items-start self-stretch max-md:gap-5 max-sm:flex-col max-sm:gap-4">
          <LKMenu />
          <NotificationMane />
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

export default ProfileNotificationPage;
