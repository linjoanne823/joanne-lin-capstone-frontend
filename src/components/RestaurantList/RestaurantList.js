import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantList.scss";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState("");
  const getRestaurants = () => {
    axios
      .get(`http://localhost:8080/restaurants/test?location=${location}`)
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

  const handleLocationChange = (e) => {
    e.preventDefault();
    return setLocation(e.target.value);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    getRestaurants();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a different city"
          onChange={handleLocationChange}
        ></input>
        {location}
      </form>
      {restaurants
        .filter((restaurant) => {
          return restaurant.location.city === location;
        })
        .map((restaurant) => {
          return (
            <div className="restaurants" key={restaurant.id}>
              <img
                src={restaurant.image_url}
                className="restaurants__image"
              ></img>
              <h3>Restaurant Name: {restaurant.name}</h3>
              <h3>City: {restaurant.location.city}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default RestaurantList;
