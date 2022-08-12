import axios from "axios";
import React, { useState, useEffect } from "react";
import UseModal from "../Modal/UseModal";
import RecipeDetails from "../RecipeDetails/RecipeDetails";

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
    <div>
      {favouriteRecipes.map((recipe, i) => {
        return (
          <div key={recipe.id} onClick={() => setActiveModalIndex(i)}>
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
            <img src={recipe.photo} style={{ width: "300px" }}></img>
            <p>{recipe.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteRecipes;
