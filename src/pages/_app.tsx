import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { AppContext, AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Modal from "@/components/Modal";
import { useContext } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { isModal } = useContext(AppContext);
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <AppProvider>
          <Header />
          {/* <Navigation /> */}
          <div className="pt-32 flex min-h-screen flex-col justify-between container mx-auto">
            <Component {...pageProps} />
            <Modal />
          </div>
        </AppProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
