import { createContext, useState } from "react";
import { AppContextType, ProductsArray, CategoriesArray } from "@/models/types";
import { Film } from "@/models/types";
export const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [filmSelected, setFilmSelected] = useState<null | Film>(null);
  const [cart, setCart] = useState<Film[]>([]);

  return (
    <AppContext.Provider
      value={{
        isModal,
        setIsModal,
        filmSelected,
        setFilmSelected,
        cart,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
