import React, { useState, useEffect } from "react";
import axios from "axios";

const FavouriteRestaurants = () => {
  const [favouriteRestaurants, setFavouriteRestaurants] = useState([]);
  const getFavouriteRestaurants = () => {
    axios
      .get("http://localhost:8080/restaurants/favourites")
      .then((response) => {
        setFavouriteRestaurants(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    getFavouriteRestaurants();
  }, []);
  return (
    <div>
      {favouriteRestaurants.map((element) => {
        return (
          <div>
            <img src={element.photo} style={{ width: "300px" }}></img>
            <p>{element.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteRestaurants;
