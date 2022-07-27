import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [cuisine, setCuisine] = useState("");

    const buildQueryString = () => {
        let queryString = "";
        if (diet)
            queryString += `diet=${diet}&`
        
        if (intolerances)
            queryString += `intolerances=${intolerances}&`;

        if(cuisine)
            queryString += `cuisine=${cuisine}`;
        
        return queryString

    }

  const getRecipes = () => {
    axios
      .get(
        `http://localhost:8080/recipes/?${buildQueryString()}`
      )
      .then((response) => {
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

  const handleSelectAllergies =(e)=>{
      e.preventDefault();
      return setIntolerances(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The diet is " + diet)
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
        </select>

        <select onChange={handleSelectAllergies}>
            <option>Choose Allergies</option>
            <option value ="Peanut">Peanut</option>
            <option value ="Treenut">Treenut</option>
            <option value ="Dairy">Dairy</option>
            <option value ="Egg">Egg</option>
            <option value="Gluten">Gluten</option>
            <option value="Grain">Grain</option>
            <option value="Sesame">Sesame</option>
            <option value="Shellfish">Shellfish</option>
            <option value="Seafood">Seafood</option>
            <option value="Soy">Soy</option>
        </select>
      </form>
      <button onClick={handleSubmit}>Submit</button>
      {recipes
        // .filter((restaurant) => {
        //   return restaurant.location.city === location;
        // })
        .map((recipe) => {
          return (
            <div className="restaurants" key={recipe.id}>
              <img src={recipe.image} className="restaurants__image"></img>
              <h3>{recipe.title}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default RecipeList;
