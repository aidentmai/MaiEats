import axios from "axios";
import { BusinessSearch } from "../business";

export type SearchResponse = {
  data: BusinessSearch[];
};

export const searchBusinesses = async () => {
  try {
    const response = await axios.get<SearchResponse>(
      `http://localhost:5037/api/Business/Search`,
      {
        params: {
          term: "coffee",
          location: "San Francisco"
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error has occurred.";
    }
  }
};
