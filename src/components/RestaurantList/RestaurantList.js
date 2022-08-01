import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantList.scss";
import Dropdown from "react-dropdown";
import { convertLength } from "@mui/material/styles/cssUtils";
import LikeButton from "../LikeButton/LikeButton";
import UseModal from "../Modal/UseModal";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";

const RestaurantList = () => {
  const presetCategories = ["Vegan", "Gluten-Free", "Vegetarian"];
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(-1);

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
      location: location || "Vancouver",
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
      <div className="restaurants">
        {restaurants
          .filter((restaurant) => {
            return restaurant.categories.some((category) => {
              return category.title === selectCategory || selectCategory === "";
            });
          })
          .map((restaurant, i) => {
            return (
              <div
                className="restaurants__card"
                key={restaurant.id}
                style={{
                  backgroundImage: `url(${restaurant.photos})`,
                  backgroundSize: "18.125rem 12.5rem",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => setActiveModalIndex(i)}
              >
                {activeModalIndex === i && (
                  <UseModal closeModal={setActiveModalIndex}>
                    {
                      <RestaurantDetails
                        name={restaurant.name}
                        photo={restaurant.photos}
                        price={restaurant.price}
                        rating={restaurant.rating}
                        location={restaurant.location.address1}
                        reviewText={restaurant.reviews[0].text}
                        categories={restaurant.categories
                          .map((element) => element.title)
                          .join(" / ")}
                      />
                    }
                  </UseModal>
                )}
                <LikeButton />
                <p className="restaurants__text">{restaurant.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RestaurantList;
