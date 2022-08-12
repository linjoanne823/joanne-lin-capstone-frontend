import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./RecipeDetails.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import LikeButton from "../LikeButton/LikeButtonRecipes";

const RecipeDetails = (props) => {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [userId, setUserId] = useState(1);

  const getSelectRecipe = () => {
    axios
      .get(`http://localhost:8080/recipes/${props.recipeId}?userId=${userId}`)
      .then((response) => {
        setRecipeDetails(response.data);
        // console.log(recipeDetails);
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
    console.log(recipeDetails);
  }, {}); //it's an object because there is just one

  const navigate = useNavigate();

  const handleLikeRecipes = () => {
    axios.post(
      "http://localhost:8080/recipes/favourites",
      {
        recipeDetails,
        userId: 1,
      },
      {
        "Content-Type": "application/json",
      }
    );
  };

  const handleUnlikeRecipes = () => {
    axios.delete(
      "http://localhost:8080/recipes/favourites",
      {
        data: {
          recipeDetails,
          userId: 1,
        },
      },
      {
        "Content-Type": "application/json",
      }
    );
  };

  return (
    <div>
      {Object.keys(recipeDetails).length > 0 ? (
        <div>
          <button onClick={() => navigate(-1)} className="recipe__back-button">
            ↩{" "}
          </button>
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
            {console.log(recipeDetails)}
            <Box>
              <ButtonGroup>
                <Button onClick={() => setShowIngredients(!showIngredients)}>
                  Ingredients
                </Button>
                <Button onClick={() => setShowInstructions(!showInstructions)}>
                  Instructions
                </Button>
              </ButtonGroup>
            </Box>
            {showIngredients ? (
              <>{recipeDetails.ingredients}</>
            ) : //   <ul>
            //     {recipeDetails.extendedIngredients.map((element) => {
            //       return <li className="recipe__text"> {element.original}</li>;
            //     })}
            //   </ul>
            null}

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
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
