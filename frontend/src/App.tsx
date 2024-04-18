import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/UseAuth";
import { Outlet } from "react-router";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { SearchProvider } from "./Context/SearchContext";

function App() {
  return (
    <>
      <UserProvider>
        <SearchProvider>
          <FavoritesProvider>
            <Outlet />
            <ToastContainer />
          </FavoritesProvider>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

export default App;
