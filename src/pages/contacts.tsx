import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import InfoContacts from "@/components/contacts/InfoContacts";
import MapContacts from "@/components/contacts/MapContacts";
import OrderContacts from "@/components/contacts/OrderContacts";
import LegalContacts from "@/components/contacts/LegalContacts";

const Contacts = () => (
  <>
        <Head>
        <title>Contacts</title>
        <meta name="description" content="Contacts" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
        </Head>
        <InfoContacts />
    <section className="main">
      <div className="w-layout-blockcontainer container w-container">
        <div className="w-layout-hflex flex-block-67">
          <div className="w-layout-vflex flex-block-72">
            <div className="w-layout-vflex flex-block-97">
                <OrderContacts />
                <LegalContacts />
            </div>
            <MapContacts />
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

export default Contacts; 