import { Link } from "react-router-dom";
import { UseAuth } from "../Context/UseAuth";

const Navbar = () => {
  const { user, logout, isLoggedIn } = UseAuth();
  return (
    <>
      <div className="h-[100px] max-w-[1200px] mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold ml-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600  inline-block">
            MaiEats
          </h1>
        </Link>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
            <a
              onClick={logout}
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
              hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 dark:shadow-lg 
              dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </a>
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
