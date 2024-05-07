import { createContext, useState } from "react";
import { ReactNode } from "react";
import { FavoritesGet } from "../favorites";

type FavoriteContextType = {
    favorites: FavoritesGet[];
    addFavorite: (business: FavoritesGet) => void;
    removeFavorite: (id: number) => void;
}
type Props = {
    children: ReactNode;
};

const FavoritesContext = createContext<FavoriteContextType>({} as FavoriteContextType);


const FavoritesProvider = ({ children }: Props) => {
    const [favorites, setFavorites] = useState<FavoritesGet[]>([]);

    const addFavorite = (business: FavoritesGet) => {
        setFavorites((prevFavorites) => [...prevFavorites, business]);
    };

    const removeFavorite = (id: number) => {
        setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== id));
    }

    return (
        <FavoritesContext.Provider value={{ favorites: favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export { FavoritesContext, FavoritesProvider };