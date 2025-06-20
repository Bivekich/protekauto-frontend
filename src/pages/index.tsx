import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import HeroSlider from "@/components/index/HeroSlider";
import CatalogSection from "@/components/index/CatalogSection";
import AvailableParts from "@/components/index/AvailableParts";
import NewsAndPromos from "@/components/index/NewsAndPromos";
import AboutHelp from "@/components/about/AboutHelp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Protek</title>
        <meta name="description" content="Protek" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <HeroSlider />
      <CatalogSection />
      <div className="w-layout-blockcontainer container w-container">
      <AboutHelp />
      </div>
      <AvailableParts />
      <NewsAndPromos />
      <section className="section-3">
        <CatalogSubscribe />
      </section>
      <Footer />
      <MobileMenuBottomSection />
    </>
  );
}
