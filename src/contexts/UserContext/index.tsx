import { createContext, useState } from "react";
import { AppContextType, ProductsArray, CategoriesArray } from "@/models/types";
import { Film } from "@/models/types";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
type UserContextType = {
  handleFavorite: (film: Film) => void;
  favorites: Film[];
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Film[]>([]);

  const handleFavorite = (film: Film) => {
    if (favorites.find((f) => f.id === film.id)) {
      setFavorites(favorites.filter((f) => f.id !== film.id));
    } else {
      setFavorites([...favorites, film]);
    }
    console.log("Favorites", favorites);
  };

  console.log("Favorites", favorites);

  return (
    <UserContext.Provider value={{ handleFavorite, favorites }}>
      {children}
    </UserContext.Provider>
  );
};
