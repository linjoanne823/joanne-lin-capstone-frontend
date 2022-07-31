import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./RecipeDetails.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import LikeButton from "../LikeButton/LikeButton";

const RecipeDetails = (props) => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const getSelectRecipe = () => {
    axios.get(`http://localhost:8080/recipes/${recipeId}`).then((response) => {
      setRecipeDetails(response.data);
      console.log(recipeDetails);
    });
  };

  useEffect(() => {
    getSelectRecipe();
    console.log(recipeDetails);
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {Object.keys(recipeDetails).length > 0 ? (
        <div>
          <button onClick={() => navigate(-1)} className="recipe__back-button">
            ↩{" "}
          </button>
          <img src={recipeDetails.image} className="recipe__image"></img>
          <div className="recipe__text">
            <LikeButton />
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
              <ul>
                {recipeDetails.extendedIngredients.map((element) => {
                  return <li className="recipe__text"> {element.original}</li>;
                })}
              </ul>
            ) : null}

            {showInstructions ? (
              <ol>
                {recipeDetails.analyzedInstructions[0].steps.map((element) => {
                  return (
                    <li key={element.step.number} className="recipe__text">
                      {element.step}
                    </li>
                  );
                })}
              </ol>
            ) : null}
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>

    // <Modal
    //   onClick={() => {
    //     props.history.push(props.location.pathname); //push a new route and ref current location
    //   }}
    // >
    //   Recipe Modal
    // </Modal>
  );
};

export default RecipeDetails;
