import React, { useState } from "react";
import FavouriteRecipes from "../FavouriteRecipes/FavouriteRecipes";
import FavouriteRestaurants from "../FavouriteRestaurants/FavouriteRestaurants";
import { Box, Typography } from "@mui/material";

const FavouritesSection = () => {
  const [showRecipes, setShowRecipes] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
      <Box sx={{ width: "40vw" }}>
        <Typography
          variant="h6"
          onClick={() => {
            setShowRecipes(!showRecipes);
            setShowRestaurants(!showRestaurants);
          }}
        >
          <Box sx={{ fontWeight: "600", textDecoration: "underline" }}>
            Favourite Recipes
          </Box>
        </Typography>
        {showRecipes && <FavouriteRecipes />}
      </Box>
      <Box sx={{ width: "40vw" }}>
        <Typography
          variant="h6"
          onClick={() => {
            setShowRestaurants(!showRestaurants);
            setShowRecipes(!showRecipes);
          }}
        >
          <Box sx={{ fontWeight: "600", textDecoration: "underline" }}>
            Favourite Restaurants
          </Box>
        </Typography>
        {showRestaurants && <FavouriteRestaurants />}
      </Box>
    </Box>
  );
};

export default FavouritesSection;
