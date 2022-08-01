import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeList.scss";
import LikeButton from "../LikeButton/LikeButton";
import UseModal from "../Modal/UseModal";
import RecipeDetails from "../RecipeDetails/RecipeDetails";

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  const [noRecipesFound, setNoRecipesFound] = useState(false);

  const buildQueryString = () => {
    let queryString = "";
    if (diet) queryString += `diet=${diet}&`;

    if (intolerances) queryString += `intolerances=${intolerances}&`;

    if (cuisine) queryString += `cuisine=${cuisine}`;

    return queryString;
  };

  const getRecipes = () => {
    axios
      .get(`http://localhost:8080/recipes/?${buildQueryString()}`)
      .then((response) => {
        setNoRecipesFound(response.data.results.length === 0);
        return setRecipes(response.data.results);
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);
  console.log(recipes);

  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDiet(e.target.value);
  };

  const handleSelectAllergies = (e) => {
    e.preventDefault();
    return setIntolerances(e.target.value);
  };

  const handleSelectCuisine = (e) => {
    e.preventDefault();
    return setCuisine(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The diet is " + diet);
    getRecipes();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelectDietaryRestriction}>
          <option>Choose Dietary Restriction</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Ketogenic">Ketogenic</option>
          <option value="Pescetarian">Pescetarian</option>
          <option value="Paleo">Paleo</option>
        </select>

        <select onChange={handleSelectAllergies}>
          <option>Choose Allergies</option>
          <option value="Peanut">Peanut</option>
          <option value="Treenut">Treenut</option>
          <option value="Dairy">Dairy</option>
          <option value="Egg">Egg</option>
          <option value="Gluten">Gluten</option>
          <option value="Grain">Grain</option>
          <option value="Sesame">Sesame</option>
          <option value="Shellfish">Shellfish</option>
          <option value="Seafood">Seafood</option>
          <option value="Soy">Soy</option>
        </select>
        <select onChange={handleSelectCuisine}>
          <option>Choose Cuisine</option>
          <option value="African">African</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Cajun">Cajun</option>
          <option value="Chinese">Chinese</option>
          <option value="French">French</option>
        </select>
      </form>

      <button onClick={handleSubmit}>Submit</button>
      <div className="recipes">
        {noRecipesFound ? "Oh nuu :/" :
          recipes.map((recipe, i) => {
            return (
              <div
                className="recipes__card"
                key={recipe.id}
                style={{ backgroundImage: `url(${recipe.image})` }}
                onClick={() => setActiveModalIndex(i)}
              >
                {activeModalIndex === i && (
                  <UseModal closeModal={setActiveModalIndex}>
                    {<RecipeDetails recipeId={recipe.id} />}
                  </UseModal>
                )}
                <LikeButton />
                <p className="recipes__text">{recipe.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecipeList;
