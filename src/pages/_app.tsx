import "@/styles/globals.css"; 
import "@/styles/normalize.css";
import "@/styles/webflow.css";
import "@/styles/protekproject.webflow.css";
import "@/styles/my.css";
import "@/styles/maintenance.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo';
import React, { useEffect, useState } from "react";
import MaintenanceMode from '@/components/MaintenanceMode';

export default function App({ Component, pageProps }: AppProps) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем переменную окружения или localStorage для режима обслуживания
    const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    const savedAuth = typeof window !== 'undefined' ? localStorage.getItem('maintenance_authenticated') : null;
    
    setIsMaintenanceMode(maintenanceMode);
    setIsAuthenticated(savedAuth === 'true');
    setIsLoading(false);

    if (!maintenanceMode || savedAuth === 'true') {
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
    }
  }, []);

  const handlePasswordCorrect = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('maintenance_authenticated', 'true');
    }
    setIsAuthenticated(true);
  };

  // Показываем загрузку во время проверки на сервере
  if (isLoading) {
    return null;
  }

  // Показываем заглушку если включен режим обслуживания и пользователь не аутентифицирован
  if (isMaintenanceMode && !isAuthenticated) {
    return <MaintenanceMode onPasswordCorrect={handlePasswordCorrect} />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <Script src="/js/webflow.js" strategy="beforeInteractive" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        strategy="afterInteractive"
      />
    </ApolloProvider>
  );
}
