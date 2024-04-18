import { useEffect, useState } from "react";
import Card from "../components/Card";
import { FavoritesGet } from "../favorites";
import { favoritesDeleteAPI, favoritesGetAPI } from "../services/FavoritesService";
import { toast } from "react-toastify";
import { businessDeleteAPI } from "../services/BusinessService";
import Navbar from "../components/Navbar";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoritesGet[]>([]);

  useEffect(() => {
    const getFavorites = async () => {
      const res = await favoritesGetAPI();
      setFavorites(res!.data);
    };

    getFavorites();
  }, []);

  const onFavoritesDelete = (id: number) => {
    favoritesDeleteAPI(id)
      .then((response) => {
        if (response?.status === 200) {
          toast.success("Removed from favorites", {
            position: "bottom-right",
          });
          setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== id));
        }
      })
      .catch(() => {
        toast.warning("Failed to remove from favorites", {
            position: "bottom-right",
          });
      });
    
      businessDeleteAPI(id)
  };

  console.log(favorites)

  return (
    <div>
      <Navbar />
      {favorites.length === 0 ? (
        <h1>No favorites saved</h1>
      ) : (
        favorites.map((favorite) => (
          <Card
            key={favorite.id}
            business={favorite.business}
            favorite={favorite}
            onFavoritesDelete={onFavoritesDelete}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
