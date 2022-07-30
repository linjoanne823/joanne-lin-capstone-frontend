import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantList.scss";
import Dropdown from 'react-dropdown';



const RestaurantList = () => {
  const presetCategories = ["Vegan", "Gluten-Free", "Vegetarian"];
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState([]);

  const getRestaurants = () => {

    const fetchSetOfCategories = (businesses) => {
      //set automatically eliminates duplicates
      const categories = new Set();
      businesses.forEach((business) => {
        //loops through all businesses and in each business
        //loops through all the categories
        business.categories.forEach((category) => {
          if (!presetCategories.includes(category.title))
            //this excludes the preset ones
            categories.add(category.title); //and only adds those not in preset
        });
      });
      return [...categories].sort(); //will convert Set back into an array and sort it alphabetically
    };

    const data = JSON.stringify({
      term: "restaurant",
      location: location,
      categories: dietaryRestriction,
    });

    const config = {
      method: "POST",
      url: "http://localhost:8080/restaurants/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data.search.business);
        setRestaurants(response.data.search.business);
        setCategories(fetchSetOfCategories(response.data.search.business));
        console.log(categories);
      })
      .catch((error) => {
        console.log(error);
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

  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDietaryRestriction(e.target.value);
  };

  const handleSelectCategories = (e) => {
    e.preventDefault();
    return setSelectCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRestaurants();
  };

  console.log(categories);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelectDietaryRestriction}>
          <option>Choose Dietary Restriction</option>
          <option value="gluten_free">Gluten-Free</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
        <input
          type="text"
          placeholder="Enter a different city"
          onChange={handleLocationChange}
        ></input>
      </form>
      <button onClick={handleSubmit}>Search</button>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelectCategories}>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </form>
      <button onClick={handleSubmit}>Filter</button>
      {restaurants
        .filter((restaurant) => {
          return restaurant.categories.some((category) => {
            return category.title === selectCategory || selectCategory === "";
          });
        })
        .map((restaurant) => {
          return (
            <div className="restaurants" key={restaurant.id}>
              <img src={restaurant.photos} className="restaurants__image"></img>
              <h3>Restaurant Name: {restaurant.name}</h3>
              <h3>City: {restaurant.location.city}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default RestaurantList;
