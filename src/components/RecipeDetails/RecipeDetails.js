import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Modal from "../Modal/Modal";
import axios from "axios";

const RecipeDetails = (props) => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [show, setShow] = useState(false);

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
          <img src={recipeDetails.image}></img>
          <h2>{recipeDetails.title}</h2>
          <p>Servings: serves {recipeDetails.servings}</p>
          <p>Ready in: {recipeDetails.readyInMinutes} minutes</p>
          <button onClick={() => setShow(!show)}>Instructions</button>

          {show ? (
            <ol>
              {recipeDetails.analyzedInstructions[0].steps.map(
                (element, index) => {
                  return <li key={index}>{element.step}</li>;
                }
              )}
            </ol>
          ) : null}
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
