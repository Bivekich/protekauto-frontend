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
import React, { useState } from "react";
import MaintenanceMode from '@/components/MaintenanceMode';
import { CartProvider } from '@/contexts/CartContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import Layout from "@/components/Layout";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    const savedAuth = typeof window !== 'undefined' ? localStorage.getItem('maintenance_authenticated') : null;
    setIsMaintenanceMode(maintenanceMode);
    setIsAuthenticated(savedAuth === 'true');
    setIsLoading(false);
  }, []);

  const handlePasswordCorrect = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('maintenance_authenticated', 'true');
    }
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return null;
  }

  if (isMaintenanceMode && !isAuthenticated) {
    return <MaintenanceMode onPasswordCorrect={handlePasswordCorrect} />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <FavoritesProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Script src="/js/webflow.js" strategy="beforeInteractive" />
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
            strategy="afterInteractive"
          />
        </CartProvider>
      </FavoritesProvider>
    </ApolloProvider>
  );
}
