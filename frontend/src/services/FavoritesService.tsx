import axios from "axios";
import { FavoritesGet, FavoritesPost } from "../favorites";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5037/api/favorite/";

// export interface SearchResponse {
//   data: FavoritesGet[];
// }

// export const searchBusinesses = async (term: string, location: string) => {
//   try{
//     const apiKey = "PvYvKkzDP20vn5X1nIeMzZeZaaEmWHZh2lpbcrFJ7qxkE82Ph5iGyFjOLgipemTzYaMLa4j6RX7G8lqUoG7fbdqUjyVpqDkWYI3AItwmRjKr22jczqS3FB1H6fYNZnYx";
//     const data = await axios.get<SearchResponse>(`http://localhost:5037/api/Business/Search?term=${term}&location=${location}&apikey=${apiKey}`);
//     return data;
//   } catch (error) {
//     if(axios.isAxiosError(error)){
//       console.log("error message", error.message)
//       return error.message
//     } else {
//       console.log("unexpected error", error)
//       return "An unexpected error occurred"
//     }
//   }
// }

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
