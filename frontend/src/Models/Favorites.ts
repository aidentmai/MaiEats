export type FavoritesGet = {
  id: number;
  businessName: string;
  businessAddress: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  category: string;
  prioritylevel: string;
};

export type FavoritesPost = {
    id: number;
};
