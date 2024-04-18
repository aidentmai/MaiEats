interface Location {
  address1: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface Business {
  id: string;
  name: string;
  location: Location;
  image_url: string;
  isSaved: boolean;
}

export type BusinessPost = {
  id: string;
  idNumber: number;
};
