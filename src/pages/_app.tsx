import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { AppContext, AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { useContext } from "react";
import { UserProvider } from "@/contexts/UserContext";

const App = ({ Component, pageProps }: AppProps) => {
  const { lang } = useContext(AppContext);
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <AppProvider>
          <UserProvider>
            <Header />
            <div className="md:pt-20 flex min-h-screen flex-col justify-between w-full">
              <Component {...pageProps} />
            </div>
          </UserProvider>
        </AppProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(App);
