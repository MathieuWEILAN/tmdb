import { createContext, useEffect, useState } from "react";
import {
  MovieDetails,
  TVShowDetails,
  PersonType,
  TypeOfObj,
} from "@/models/types";
import { useSession } from "next-auth/react";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
type UserContextType = {
  handleFavorite: any;
  favorites: MovieDetails[] | TVShowDetails[] | PersonType[];
  setFavorites: (
    items: MovieDetails[] | TVShowDetails[] | PersonType[]
  ) => void;
  addFavorite: (e: Event, item: any, type: TypeOfObj) => void;
  deleteFavorite: (e: Event, item: any, type: TypeOfObj) => void;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<
    MovieDetails[] | TVShowDetails[] | PersonType[]
  >([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      console.log("not connected");
      return;
    }
    const fetchFavorites = async () => {
      const response = await fetch("/api/getUser", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites);
      } else {
        console.error(
          "Erreur lors de la récupération des favoris",
          response.statusText
        );
      }
    };
    fetchFavorites();
  }, [session]);

  const addFavorite = async (e: Event, item: any, type: TypeOfObj) => {
    e.preventDefault();
    if (!session) {
      console.log("not connected");
      return;
    }
    const response = await fetch("/api/addFav", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id, // Assurez-vous que ceci correspond à l'ID de l'utilisateur connecté
        itemId: item.id,
        itemTitle: item.title,
        itemType: type,
        itemImage: item.poster_path,
      }),
    });
    const data = await response.json();
    console.log("USER CONTEXT ADD =>", data);
    setFavorites(data);
  };

  const deleteFavorite = async (
    e: Event,
    item: any,
    type: TypeOfObj,
    idItem: number
  ) => {
    e.preventDefault();
    if (!session) {
      console.log("not connected");
      return;
    }
    console.log("FRONT DELETE", idItem);
    const response = await fetch("/api/deleteFav", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id, // Assurez-vous que ceci correspond à l'ID de l'utilisateur connecté
        itemId: idItem,
      }),
    });
    const data = await response.json();
    console.log("DELETED CONTEXT", data);
    setFavorites(data);
  };

  return (
    <UserContext.Provider
      value={{
        addFavorite,
        favorites,
        setFavorites,
        deleteFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
