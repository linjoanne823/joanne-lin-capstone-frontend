import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantList.scss";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const getRestaurants = () => {
    axios
      .get("http://localhost:8080/restaurants/test")
      .then((response) => {
        return setRestaurants(response.data.businesses);
      })
      .catch((error) => {
        return console.log(error);
      });
  };
  useEffect(() => {
    getRestaurants();
  }, []);
  console.log(restaurants);
  return (
    <div>
      {restaurants.map((restaurant) => {
        return (
          <div className="restaurants">
            <img
              src={restaurant.image_url}
              className="restaurants__image"
            ></img>
            <h3>{restaurant.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantList;
