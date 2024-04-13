import { useLocation } from "react-router-dom";

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ business }) => {
  const location = useLocation();

  console.log(business);
  return (
    <>
      <div
        className="flex flex-col items-center justify-evenly bg-white border border-gray-200 rounded-lg 
     md:flex-row  mt-9 mb-9 p-6 max-w-[1200px] mx-auto"
        style={{ maxHeight: "300px", minHeight: "300px", width: "95%" }}
      >
        <div style={{ width: "33%", height: "100%" }}>
          <img
            // className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={business.image_url}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
              {business.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {business.location.address1}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {business.location.city}
              {", "}
              {business.location.state} {business.location.zip_code}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
          </div>
        </div>
        <div>
          {location.pathname === "/search" ? (
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
          bg-cyan-500 rounded-lg hover:bg-cyan-800"
            >
              Save to favorites
            </a>
          ) : location.pathname === "/favorites" ? (
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
              bg-red-500 rounded-lg hover:bg-red-800"
            >
              Remove
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Card;
