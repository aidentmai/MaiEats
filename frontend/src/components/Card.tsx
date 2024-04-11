import { useLocation } from "react-router-dom";

const Card = () => {
  const location = useLocation();
  return (
    <>
      <div
        className="flex flex-col items-center justify-evenly bg-white border border-gray-200 rounded-lg 
     md:flex-row  mt-9 mb-9 ml-14 mr-14 p-6"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="/docs/images/blog/image-4.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">Restaurant</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
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
    </>
  );
};

export default Card;
