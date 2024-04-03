import { createContext, useState } from "react";
import { MovieDetails, TVShowDetails, PersonType } from "@/models/types";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
type UserContextType = {
  handleFavorite: any;
  favorites: MovieDetails[] | TVShowDetails[] | PersonType[];
  setFavorites: (
    items: MovieDetails[] | TVShowDetails[] | PersonType[]
  ) => void;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<
    MovieDetails[] | TVShowDetails[] | PersonType[]
  >([]);

  const handleFavorite = (item: MovieDetails | TVShowDetails | PersonType) => {
    if (favorites.find((f) => f.id === item.id)) {
      setFavorites(favorites.filter((f) => f.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <UserContext.Provider value={{ handleFavorite, favorites, setFavorites }}>
      {children}
    </UserContext.Provider>
  );
};
