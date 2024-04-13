import { useState } from "react";
import Card from "../components/Card";
import {
  SearchResponse,
  searchBusinesses,
} from "../services/FrontendAPIService";
import axios from "axios";

const SearchPage = () => {
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = (e) => {
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
          setResults(data);
          console.log("DATA OVER HEARE", data);
        })
        .catch((err) => {
          console.error("there was a problem: ", err);
        });
    }
  };

  // const handleSearch = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const data = await searchBusinesses(query);
  //   setResults(data);
  // };
  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={(e) => handleSearch(e)}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg 
                  bg-gray-50"
            placeholder="Search restaurants, cafes, and more..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg 
                  bg-gray-50"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      {results?.businesses?.map((business, index) => (
        <Card key={index} business={business} />
      ))}
    </>
  );
};

export default SearchPage;
