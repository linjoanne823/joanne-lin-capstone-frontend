import axios from "axios";
import React, { useState, useEffect } from "react";
import UseModal from "../Modal/UseModal";
import RecipeDetails from "../RecipeDetails/RecipeDetails";

const FavouriteRecipes = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(-1);

  const getFavouriteRecipes = () => {
    axios
      .get("http://localhost:8080/recipes/favourites/recipes")
      .then((response) => {
        setFavouriteRecipes(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    getFavouriteRecipes();
  }, []);

  return (
    <div>
      {favouriteRecipes.map((recipe, i) => {
        return (
          <div key={recipe.id} onClick={() => setActiveModalIndex(i)}>
            {activeModalIndex === i && (
              <UseModal closeModal={setActiveModalIndex}>
                {<RecipeDetails recipeId={recipe.id} />}
              </UseModal>
            )}
            <img src={recipe.image} style={{ width: "300px" }}></img>
            <p>{recipe.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteRecipes;
