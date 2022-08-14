import axios from "axios";
import React, { useState, useEffect } from "react";
import UseModal from "../Modal/UseModal";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

const FavouriteRecipes = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(-1);

  const getFavouriteRecipes = () => {
    axios
      .get(`http://localhost:8080/recipes/favourites/?userId=${1}`)
      .then((response) => {
        setFavouriteRecipes(response.data);
      });
  };

  useEffect(() => {
    getFavouriteRecipes();
  }, []);

  return (
    <ImageList
      sx={{
        mb: 8,
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))!important",
      }}
    >
      {favouriteRecipes.map((recipe, i) => {
        return (
          <ImageListItem key={recipe.id} onClick={() => setActiveModalIndex(i)}>
            {activeModalIndex === i && (
              <UseModal closeModal={setActiveModalIndex}>
                {
                  <RecipeDetails
                    recipeId={recipe.id}
                    favouriteRecipeDetails={recipe}
                  />
                }
              </UseModal>
            )}
            <img
              src={`${recipe.photo}?w=400&fit=crop&auto=format`}
              srcSet={`${recipe.photo}?w=400&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
            />
            <ImageListItemBar title={recipe.name}></ImageListItemBar>
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default FavouriteRecipes;
