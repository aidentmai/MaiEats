import { useContext, useEffect } from "react";
import Card from "../components/Card";
import { FavoritesGet } from "../favorites";
import {
  favoritesAddAPI,
  favoritesDeleteAPI,
  favoritesGetAPI,
} from "../services/FavoritesService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { UseSearch } from "../Context/SearchContext";
import { FavoritesContext } from "../Context/FavoritesContext";

const SearchPage = () => {
  const { results, setResults } = UseSearch();
  // const [favorites, setFavorites] = useState<FavoritesGet[] | null>([]);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  
  useEffect(() => {
    getFavorites();
    // Retrieve search results from localStorage when component mounts
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  const getFavorites = () => {
    favoritesGetAPI()
      .then((response) => {
        if (response?.data) {
          response.data.forEach((favorite: FavoritesGet) => addFavorite(favorite));
        }
      })
      .catch((e) => {
        toast.warning("Failed to retrieve favorites", {
          position: "bottom-right",
        });
      });
  };

  const onFavoritesCreate = async (id: number) => {
    // Check if business already exists in favorites
    if (favorites.some((fav) => fav.id === id)) {
      toast.warning("Business already saved to favorites", {
        position: "bottom-right",
      });
      return;
    }
    favoritesAddAPI(id)
      .then((response) => {
        if (response?.status === 204) {
          toast.success("Saved to favorites", {
            position: "bottom-right",
          });
          getFavorites(); // Update favorites list
        }
      })
      .catch((e) => {
        toast.warning("Failed to save to favorites", {
          position: "bottom-right",
        });
      });
  };

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
      .catch((e) => {
        toast.warning("Failed to remove from favorites", {
          position: "bottom-right",
        });
      });
  };

  const updateResults = () => {
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  };

  console.log("fav array", favorites);

  return (
    <>
      <Navbar />
      <div className="">
        {results?.map((business) => (
          <Card
            key={business.id}
            business={business}
            favorite={favorites}
            onFavoritesCreate={onFavoritesCreate}
            onFavoritesDelete={onFavoritesDelete}
            updateResults={updateResults}
          />
        ))}
      </div>
    </>
  );
};
export default SearchPage;
