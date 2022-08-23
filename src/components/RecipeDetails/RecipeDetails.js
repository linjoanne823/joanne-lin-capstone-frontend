import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./RecipeDetails.scss";
import { Typography, Button, Box } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import LikeButton from "../LikeButton/LikeButtonRecipes";
import { UserContext } from "../../contexts/UserContext";
import config from "../../config";

const RecipeDetails = (props) => {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const { userId } = useContext(UserContext);

  const getSelectRecipe = () => {
    axios
      .get(
        `${config.backend_url}:8080/recipes/${props.recipeId}?userId=${userId}`
      )
      .then((response) => {
        setRecipeDetails(response.data);
      });
  };

  useEffect(() => {
    if (props.favouriteRecipeDetails) {
      setRecipeDetails(props.favouriteRecipeDetails);
      //if the recipe is favourited, then update recipe details
      //to the favourited recipe details
    } else {
      getSelectRecipe();
      //if not, just return the regular recipe details
    }
  }, {}); //it's an object because there is just one

  const navigate = useNavigate();

  const handleLikeRecipes = () => {
    axios.post(
      `${config.backend_url}:8080/recipes/favourites`,
      {
        recipeDetails,
        userId: userId,
      },
      {
        "Content-Type": "application/json",
      }
    );
  };

  const handleUnlikeRecipes = () => {
    const recipeId = recipeDetails.recipe_id;
    axios.delete(
      `${config.backend_url}:8080/recipes/favourites/${recipeId}?userId=${userId}`
    );
  };

  return (
    <div>
      {Object.keys(recipeDetails).length > 0 ? (
        <Box sx={{ height: "60vh" }}>
          <img src={recipeDetails.image} className="recipe__image"></img>
          <div className="recipe__text">
            <LikeButton
              handleLike={handleLikeRecipes}
              handleUnlike={handleUnlikeRecipes}
              recipeDetails={recipeDetails}
            />
            <h2>{recipeDetails.title}</h2>

            <p>Servings: serves {recipeDetails.servings} people</p>
            <p>Ready in: {recipeDetails.readyInMinutes} minutes</p>

            <Box>
              <Button onClick={() => setShowIngredients(!showIngredients)}>
                Ingredients
              </Button>
            </Box>

            {showIngredients ? (
              <Typography>
                {recipeDetails.ingredients.toString().split(",").join("\n").split('\n').map(str=><li>{str}</li>)}
              </Typography>
            ) : null}
            <Button onClick={() => setShowInstructions(!showInstructions)}>
              Instructions
            </Button>

            {showInstructions ? (
              <>{recipeDetails.instructions}</>
            ) : //   <ol>
            //     {recipeDetails.analyzedInstructions[0].steps.map((element) => {
            //       return (
            //         <li key={element.step.number} className="recipe__text">
            //           {element.step}
            //         </li>
            //       );
            //     })}
            //   </ol>
            null}
          </div>
        </Box>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
