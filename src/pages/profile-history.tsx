import * as React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogSubscribe from '@/components/CatalogSubscribe';
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import LKMenu from '@/components/LKMenu';
import ProfileHistoryMain from '@/components/profile/ProfileHistoryMain';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Head from "next/head";


    
const ProfileHistoryPage = () => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (!menuRef.current) return;
    const updateHeight = () => {
      setMenuHeight(menuRef.current?.offsetHeight);
    };
    updateHeight();
    const observer = new window.ResizeObserver(updateHeight);
    observer.observe(menuRef.current);
    window.addEventListener('resize', updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <>
      <Head>
        <title>ProfileHistory</title>
        <meta content="ProfileHistory" property="og:title" />
        <meta content="ProfileHistory" property="twitter:title" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <div className="page-wrapper h-full flex flex-col flex-1">
        <ProfileInfo />
        <div className="flex flex-col pt-10 pb-16 max-md:px-5 h-full flex-1">
        <div className="flex relative gap-8 items-start self-stretch max-md:gap-5 max-sm:flex-col max-sm:gap-4 justify-center mx-auto min-h-[526px] max-w-[1580px] w-full h-full">
            <LKMenu ref={menuRef} />
            <ProfileHistoryMain />
          </div>
        </div>
        <section className="section-3">
          <CatalogSubscribe />
        </section>
        <MobileMenuBottomSection />
        <Footer />
      </div>
    </>
  );
}; 


export default ProfileHistoryPage;
