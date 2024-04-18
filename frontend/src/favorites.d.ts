import { Business } from "./business";

export type Location = {
  address1: string;
  city: string;
  state: string;
  zip_code: string;
}

export type FavoritesGet = {
  some(arg0: (fav: any) => void): unknown;
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
  imageUrl: string;
  business: Business
};

export type FavoritesPost = {
  id: number;
};
