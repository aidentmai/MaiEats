import { Business } from "./business";

export type FavoritesGet = {
  id: int;
  businessId: string;
  businessName: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  category: string;
  prioritylevel: string;
  image_url: string;
  business: Business
};

export type FavoritesPost = {
  id: number;
};
