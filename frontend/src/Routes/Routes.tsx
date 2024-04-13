import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import SearchPage from "../Pages/SearchPage";
import FavoritesPage from "../Pages/FavoritesPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage />},
            { path: "login", element: <LoginPage />},
            { path: "register", element: <RegisterPage />},
            { path: "search", element: <ProtectedRoute><SearchPage /></ProtectedRoute>},
            { path: "favorites", element: <ProtectedRoute><FavoritesPage /></ProtectedRoute>},
        ]
    }
])