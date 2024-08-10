import { useContext, useEffect } from "react";
import Card from "../components/Card";
import { favoritesDeleteAPI, favoritesGetAPI } from "../services/FavoritesService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { FavoritesContext } from "../Context/FavoritesContext";
import { FavoritesGet } from "../favorites";
import { useLocation } from "react-router";

const FavoritesPage = () => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const location = useLocation();

  const getFavorites = async () => {
    try {
      const res = await favoritesGetAPI();
      console.log("FAVORITES RESPONSE", res!.data);
      res!.data.forEach((favorite: FavoritesGet) => addFavorite(favorite));
    } catch {
      toast.warning("Failed to retrieve favorites", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    getFavorites();
  }, [location.pathname]);

  const onFavoritesDelete = async (id: number) => {
    try {
      const response = await favoritesDeleteAPI(id);
      if (response?.status === 200) {
        toast.success("Removed from favorites", {
          position: "bottom-right",
        });
        removeFavorite(id);
        console.log(id)

        // Update search results in local storage
        const storedResults = JSON.parse(localStorage.getItem("searchResults") || "[]");
        storedResults.forEach((business: any) => {
          if (business.businessId === id) {
            console.log(business.id);
            business.isSaved = false;
          }
        });
        localStorage.setItem("searchResults", JSON.stringify(storedResults));

      }
    } catch {
      toast.warning("Failed to remove from favorites", {
        position: "bottom-right",
      });
    }
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
            updateResults={() => {}}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
