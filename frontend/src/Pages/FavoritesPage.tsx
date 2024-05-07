import { useContext, useEffect } from "react";
import Card from "../components/Card";
import { favoritesDeleteAPI, favoritesGetAPI } from "../services/FavoritesService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { FavoritesContext } from "../Context/FavoritesContext";
import { FavoritesGet } from "../favorites";

const FavoritesPage = () => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const getFavorites = async () => {
      const res = await favoritesGetAPI();
      console.log("FAVORITES RESPONSE", res!.data);
      res!.data.forEach((favorite: FavoritesGet) => addFavorite(favorite));
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
          removeFavorite(id);
        }
      })
      .catch(() => {
        toast.warning("Failed to remove from favorites", {
            position: "bottom-right",
          });
      });
  };

  return (
    <div>
      <Navbar />
      {favorites.length === 0 ? (
        <div>
          <h1 className="text-3xl text-center mt-8">No favorites saved</h1>
        </div>
      ) : (
        favorites.map((favorite, index) => (
          <Card
            key={index}
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
