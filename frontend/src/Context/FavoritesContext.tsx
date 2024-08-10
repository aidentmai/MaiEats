import { createContext, useState } from "react";
import { ReactNode } from "react";
import { FavoritesGet } from "../favorites";

type FavoriteContextType = {
  favorites: FavoritesGet[];
  addFavorite: (business: FavoritesGet) => void;
  removeFavorite: (id: number) => void;
};
type Props = {
  children: ReactNode;
};

const FavoritesContext = createContext<FavoriteContextType>(
  {} as FavoriteContextType
);

const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<FavoritesGet[]>([]);

  const addFavorite = (favorite: FavoritesGet) => {
    setFavorites((prevFavorites) => {
      // Check if the favorite already exists
      if (prevFavorites.some((fav) => fav.id === favorite.id)) {
        return prevFavorites; // Return the existing favorites if duplicate is found
      }
      return [...prevFavorites, favorite]; // Add the new favorite if no duplicate is found
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== id)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites: favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
