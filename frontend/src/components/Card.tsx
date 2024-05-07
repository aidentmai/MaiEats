import { useLocation } from "react-router-dom";
import { Business } from "../business";
import { businessCreateAPI } from "../services/BusinessService";
import { FavoritesGet } from "../favorites";
import { toast } from "react-toastify";

type CardProps = {
  business: Business;
  favorite: FavoritesGet[];
  onFavoritesCreate?: (id: number) => void;
  onFavoritesDelete?: (id: number) => void;
  updateResults?: () => void;
};

const Card = ({
  business,
  favorite,
  onFavoritesCreate,
  onFavoritesDelete,
  updateResults,
}: CardProps) => {
  const location = useLocation();

  const handleClick = async () => {
    if (location.pathname === "/search") {
      // Get search results from localStorage
      const searchResults = JSON.parse(
        localStorage.getItem("searchResults") || ""
      );

      // Update isSaved property of business object
      searchResults.map((results: Business) => {
        if (results.id === business.id) {
          results.isSaved = true;
        }
      });

      // Save updated search results to localStorage
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
      updateResults!();

      if (business.isSaved) {
        favorite.map((fav) => {
          if (fav.businessId === business.id) {
            onFavoritesDelete!(fav.id);
            searchResults.map((results: Business) => {
              if (results.id === business.id) {
                results.isSaved = false;
                localStorage.setItem(
                  "searchResults",
                  JSON.stringify(searchResults)
                );
                updateResults!();
              }
            });
            console.log("searchResults after deleting", searchResults);
          }
        });
        return;
      }

      console.log(searchResults);

      const response = await businessCreateAPI(business.id);
      console.log("RESPONSE HERE:", response);

      const idNumber = parseInt(response!.data.id);

      const isIdInFavorites = favorite.some((fav) => {
        return fav.businessId === business.id;
      });

      console.log("IS ID IN FAVORITES", isIdInFavorites);

      if (!isIdInFavorites) {
        onFavoritesCreate!(idNumber);
        console.log(isIdInFavorites);
      }
    }
    if (location.pathname === "/favorites") {
      console.log(favorite.id);
      onFavoritesDelete!(favorite.id);
    }
  };

  // console.log(business)
  // console.log(business.location.address1)

  return (
    <>
      {location.pathname === "/search" && (
        <div
          className="card card-side bg-base-100 shadow-xl flex flex-col items-center justify-evenly border-gray-200 rounded-lg 
   md:flex-row  mt-9 mb-9 p-6 max-w-[1200px] mx-auto overflow-auto"
        >
          <figure>
            <img
              className="w-64 h-64 rounded-tr-[10px] rounded-br-[10px]"
              src={business.image_url}
              alt=""
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{business.name}</h2>
            <p>{business.location.address1}</p>
            <p>
              {business.location.city} {", "} {business.location.state}{" "}
              {business.location.zip_code}
            </p>
            <div className="card-actions justify-end">
              {location.pathname === "/search" ? (
                <button
                  className={
                    business.isSaved
                      ? "btn w-36 bg-red-500 text-white hover:bg-red-800 "
                      : "btn bg-blue-500 text-white hover:bg-blue-800"
                  }
                  onClick={handleClick}
                >
                  {business.isSaved ? "Remove" : "Save to favorites"}
                </button>
              ) : location.pathname === "/favorites" ? (
                <button
                  className="btn w-36 bg-red-500 hover:bg-red-800 text-white"
                  onClick={handleClick}
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {location.pathname === "/favorites" && (
        <div>
          <div
            className="card card-side bg-base-100 shadow-xl flex flex-col items-center justify-evenly border-gray-200 rounded-lg 
     md:flex-row  mt-9 mb-9 p-6 max-w-[1200px] mx-auto overflow-auto"
          >
            <figure>
              <img
                className="w-64 h-64 rounded-tr-[10px] rounded-br-[10px]"
                src={favorite.image_url}
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{favorite.businessName}</h2>
              <p>{favorite.address}</p>
              <p>
                {favorite.city} {", "} {favorite.state} {favorite.zipCode}
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn w-36 bg-red-500 hover:bg-red-800 text-white"
                  onClick={handleClick}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {location.pathname === "/search" ? (
        <div
          className="card card-side bg-base-100 shadow-xl flex flex-col items-center justify-evenly border-gray-200 rounded-lg 
     md:flex-row  mt-9 mb-9 p-6 max-w-[1200px] mx-auto overflow-auto"
        >
          <figure>
            <img
              className="w-64 h-64 rounded-tr-[10px] rounded-br-[10px]"
              src={business.image_url}
              alt=""
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{business.name}</h2>
            <p>{business.location.address1}</p>
            <p>
              {business.location.city} {", "} {business.location.state}{" "}
              {business.location.zip_code}
            </p>
            <div className="card-actions justify-end">
              {location.pathname === "/search" ? (
                <button
                  className={
                    business.isSaved
                      ? "btn w-36 bg-red-500 text-white hover:bg-red-800 "
                      : "btn bg-blue-500 text-white hover:bg-blue-800"
                  }
                  onClick={handleClick}
                >
                  {business.isSaved ? "Remove" : "Save to favorites"}
                </button>
              ) : location.pathname === "/favorites" ? (
                <button
                  className="btn w-36 bg-red-500 hover:bg-red-800 text-white"
                  onClick={handleClick}
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : location.pathname === "/favorites" ? (
        <div>
          <div
            className="card card-side bg-base-100 shadow-xl flex flex-col items-center justify-evenly border-gray-200 rounded-lg 
     md:flex-row  mt-9 mb-9 p-6 max-w-[1200px] mx-auto overflow-auto"
          >
            <figure>
              <img
                className="w-64 h-64 rounded-tr-[10px] rounded-br-[10px]"
                src={favorite.imageUrl}
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{favorite.businessName}</h2>
              <p>{favorite.address}</p>
              <p>
                {favorite.city} {", "} {favorite.state} {favorite.zipCode}
              </p>
              <div className="card-actions justify-end">
                {location.pathname === "/search" ? (
                  <button
                    className={
                      business.isSaved
                        ? "btn w-36 bg-red-500 text-white hover:bg-red-800 "
                        : "btn bg-blue-500 text-white hover:bg-blue-800"
                    }
                    onClick={handleClick}
                  >
                    {business.isSaved ? "Remove" : "Save to favorites"}
                  </button>
                ) : location.pathname === "/favorites" ? (
                  <button
                    className="btn w-36 bg-red-500 hover:bg-red-800 text-white"
                    onClick={handleClick}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
    </>
  );
};

export default Card;
