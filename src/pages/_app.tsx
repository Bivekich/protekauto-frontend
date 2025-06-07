// import "@/styles/globals.css"; 
import "@/styles/normalize.css";
import "@/styles/webflow.css";
import "@/styles/protekproject.webflow.css";
import "@/styles/my.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/webflow.js" strategy="afterInteractive" />
    </>
  );
}
