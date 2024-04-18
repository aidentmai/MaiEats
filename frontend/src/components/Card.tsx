import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Business } from "../business";
import { businessCreateAPI } from "../services/BusinessService";
import { FavoritesGet } from "../favorites";
import { toast } from "react-toastify";

type CardProps = {
  business: Business;
  favorite: FavoritesGet;
  onFavoritesCreate?: (id: number) => void;
  onFavoritesDelete?: (id: number) => void;
  updateResults?: () => void;
};

const Card = ({
  business,
  favorite,
  onFavoritesCreate,
  onFavoritesDelete,
  updateResults
}: CardProps) => {
  const location = useLocation();

  

  const handleClick = async () => {
    if (location.pathname === "/search") {
      const searchResults = JSON.parse(localStorage.getItem("searchResults"));
      console.log("Search Results", searchResults)
      
      searchResults.map((results: Business) => {
        if(results.id === business.id) {
          console.log("result id here", results.id)
          console.log("business id here", business.id)
          results.isSaved = true;
        }
      })
      
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
      
      console.log("Search", searchResults)
      
      if (business.isSaved) {
        toast.warning("Business is already saved to favorites", {
          position: "bottom-right",
        });
      }
      

      console.log(business.isSaved)

      const response = await businessCreateAPI(business.id);
      console.log("RESPONSE HERE:", response);

      const idNumber = parseInt(response!.data.id);

      console.log(favorite)

      const isIdInFavorites = favorite.some((fav) => {
        const isIdMatch = fav.businessId === business.id;
        console.log("FAV ID HERE", fav.businessId);
        return isIdMatch;
      });

      console.log("IS ID IN FAVORITES", isIdInFavorites);

      if (!isIdInFavorites) {
        onFavoritesCreate!(idNumber);
        console.log(idNumber);
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
      {location.pathname === "/search" ? (
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
      ) : null}
    </>
  );
};

export default Card;
