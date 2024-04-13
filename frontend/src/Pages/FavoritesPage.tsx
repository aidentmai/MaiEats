import { useState } from "react";
import Card from "../components/Card";
import { string } from "yup";



const FavoritesPage = () => {
  const [favorites, setFavorites] = useState();
  return (
    <div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default FavoritesPage;
