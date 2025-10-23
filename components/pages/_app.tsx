// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="container py-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}