import { Link } from "react-router-dom";
import { UseAuth } from "../Context/UseAuth";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UseSearch } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [term, setTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  const { user, logout, isLoggedIn } = UseAuth();
  const { setResults } = UseSearch();
  const navigate = useNavigate();

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (term !== "" && location !== "") {
      axios
        .get("http://localhost:5037/api/Business/Search", {
          params: {
            term: term,
            location: location,
          },
        })
        .then(({ data }) => {
          data.businesses.map((business) => {
            business.isSaved = false;
            console.log("Business", business);
            return business;
          });
          setResults(data.businesses);
          // Save search results to localStorage
          localStorage.setItem(
            "searchResults",
            JSON.stringify(data.businesses)
          );
          navigate("/search");
        })
        .catch((err) => {
          console.error("there was a problem: ", err);
        });
    }
  };

  return (
    <>
      <div className="h-[100px] max-w-[1200px] mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold ml-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600  inline-block">
            MaiEats
          </h1>
        </Link>
        <div className="flex items-center">
          <form
            className="flex border-gray-300 shadow-lg rounded-l-lg overflow-hidden h-full"
            onSubmit={(e) => handleSearch(e)}
          >
            <input
              type="search"
              className="w-full p-4 text-sm bg-gray-50 outline-none box-border"
              placeholder="Search businesses..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <div className="h-auto border border-gray-300"></div>
            <input
              type="search"
              className="w-full p-4 text-sm bg-gray-50 outline-none"
              placeholder="city, state, zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="h-full items-stretch">
              <button
                type="submit"
                className="flex h-full p-5 text-sm bg-red-500 shadow-lg rounded-r-lg overflow-hidden"
              >
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {isLoggedIn() ? (
          // <div className="hidden lg:flex items-center space-x-6 text-back">
          //   <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
          //   <a
          //     onClick={logout}
          //     className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
          //     hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 dark:shadow-lg
          //     dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          //   >
          //     Logout
          //   </a>
          // </div>
          <div>
            <button
              id="dropdownDividerButton"
              data-dropdown-toggle="dropdownDivider"
              className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={() => setDropDownVisible(!dropDownVisible)}
              onBlur={() => setTimeout(() => setDropDownVisible(false), 200)}
            >
              Welcome, {user?.userName}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdownDivider"
              className={`z-10 absolute ${
                dropDownVisible ? "" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600} `}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                <li>
                  <a
                    href="favorites"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    My Favorites
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <a
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Log Out
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-darkBlue">
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
                           hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 dark:shadow-lg 
                           dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
