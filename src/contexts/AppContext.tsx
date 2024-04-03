import { createContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";

export const AppContext = createContext<AppContextType>({} as AppContextType);
type AppContextType = {
  lang: CountryTranslation;
  setLang: (lang: CountryTranslation) => void;
};

interface CountryTranslation {
  value: string;
  label: string;
}
type AppProviderProps = {
  children: React.ReactNode;
};

const allTranslations: CountryTranslation[] = [
  { value: "en-US", label: "English" },
  { value: "fr-FR", label: "Français" },
  { value: "es-ES", label: "Español" },
];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<CountryTranslation>(allTranslations[0]);
  const { data: session, status } = useSession();

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
