// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="min-h-screen bg-gray-100">
      <Component {...pageProps} />
    </main>
  );
}