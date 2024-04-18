import { createContext, useState } from "react";
import { ReactNode } from "react";
import { Business } from "../business";

type FavoriteContextType = {
    favorites: Business[];
    addFavorite: (business: Business) => void;
}

const FavoritesContext = createContext<FavoriteContextType>({} as FavoriteContextType);

type Props = {
    children: ReactNode;
};

const FavoritesProvider = ({ children }: Props) => {
    const [favorites, setFavorites] = useState<Business[]>([]);

    const addFavorite = (business: Business) => {
        setFavorites((prevFavorites) => [...prevFavorites, business]);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export { FavoritesContext, FavoritesProvider };