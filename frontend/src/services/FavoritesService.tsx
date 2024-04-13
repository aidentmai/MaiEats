import axios from "axios";
import { FavoritesGet, FavoritesPost } from "../Models/Favorites";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5037/api/favorites/";

export const favoritesAddAPI = async (id: number) => {
  try {
    const data = await axios.post<FavoritesPost>(api + `?id=${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const favoritesDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<FavoritesPost>(api + `?id=${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const favoritesGetAPI = async () => {
  try {
    const data = await axios.get<FavoritesGet[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};
