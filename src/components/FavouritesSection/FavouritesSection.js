import React, { useState } from "react";
import FavouriteRecipes from "../FavouriteRecipes/FavouriteRecipes";
import FavouriteRestaurants from "../FavouriteRestaurants/FavouriteRestaurants";
import "./FavouritesSection.scss";

const FavouritesSection = () => {
  const [showRecipes, setShowRecipes] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(false);
  return (
    <div className="favourites-section">
      <div className="favourites-section__inner-container">
        <h2
          className="favourites-section__title"
          onClick={() => {
            setShowRecipes(!showRecipes);
            setShowRestaurants(!showRestaurants);
          }}
        >
          Fav Recipes
        </h2>
        {showRecipes && <FavouriteRecipes />}
      </div>
      <div className="favourites-section__inner-container">
        <h2
          className="favourites-section__title"
          onClick={() => {
            setShowRestaurants(!showRestaurants);
            setShowRecipes(!showRecipes);
          }}
        >
          Fav Restaurants
        </h2>
        {showRestaurants && <FavouriteRestaurants />}
      </div>
    </div>
  );
};

export default FavouritesSection;
