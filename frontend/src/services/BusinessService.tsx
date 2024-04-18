import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { BusinessPost } from "../business";

const api = "http://localhost:5037/api/Business/CreateByBusinessId/";

export const businessCreateAPI = async (id: string) => {
  try {
    const data = await axios.post<BusinessPost>(api + id);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const businessDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<BusinessPost>(api + `?id=${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
}