import "@/styles/globals.css"; 
import "@/styles/normalize.css";
import "@/styles/webflow.css";
import "@/styles/protekproject.webflow.css";
import "@/styles/my.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo';
import React, { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    function setBodyPadding() {
      const header = document.querySelector("header.section-4");
      if (header && header instanceof HTMLElement) {
        document.body.style.paddingTop = header.offsetHeight + "px";
      }
    }
    setBodyPadding();
    window.addEventListener("resize", setBodyPadding);

    // Скрытие контейнера навигации при скролле
    function handleScroll() {
      const navContainer = document.querySelector(".w-layout-blockcontainer.container.nav.w-container");
      if (navContainer && navContainer instanceof HTMLElement) {
        if (window.scrollY > 0) {
          navContainer.classList.add("hide-top-head");
        } else {
          navContainer.classList.remove("hide-top-head");
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", setBodyPadding);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/webflow.js" strategy="afterInteractive" />
    </ApolloProvider>
  );
}
