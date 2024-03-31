import { createContext, useState } from "react";
export const AppContext = createContext<AppContextType>({} as AppContextType);
type AppContextType = {
  lang: CountryTranslation;
  setLang: (lang: CountryTranslation) => void;
};

interface CountryTranslation {
  id: string;
  country: string;
}
type AppProviderProps = {
  children: React.ReactNode;
  lang: CountryTranslation;
};

const allTranslations = [
  { id: "en-US", country: "USA" },
  { id: "en-GB", country: "United Kingdom" },
  { id: "fr-FR", country: "France" },
  { id: "de-DE", country: "Germany" },
  { id: "es-ES", country: "Spain" },
  { id: "it-IT", country: "Italy" },
  { id: "ru-RU", country: "Russia" },
  { id: "ja-JP", country: "Japan" },
  { id: "zh-CN", country: "China" },
  { id: "ar-SA", country: "Saudi Arabia" },
];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<CountryTranslation>(allTranslations[0]);

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
